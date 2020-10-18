import 'dotenv/config';

import App from './server';

import IGDBApi from './services/IGDB';
import SteamApi from './services/SteamApi';
import MongoConnect from './services/MongoDB';
import NLPApi from './services/NLPApi';

import { GameModel } from './interfaces/IGDB/Game/game.model';
import { IGameDocument } from './interfaces/IGDB/Game/game.types';
import { IDocument } from './interfaces/GCP/Language';

async function runServer() {
  const server = await App.getInstance();

  // var mongoConnect : MongoConnect = new MongoConnect();
  // MongoConnect.getInstance();

  server.post('/igdb/game', async (_, response) => {
    MongoConnect.connect();
    const game = response.req?.body;

    try {
      await GameModel.create(game);
      console.log(
        `[SERVER]: Created game summary: ${game.summary} and storyline ${game.storyline}`
      );
      MongoConnect.disconnect();
      return response.sendStatus(200);
    } catch (err) {
      console.log(err);
      return response.sendStatus(400);
    }
  });

  server.post('/igdb/minegame', async (_, response) => {
    MongoConnect.connect();
    const IGDBInstance = await IGDBApi.getInstance();
    const { data } = await IGDBInstance.post(
      '/games',
      'fields name, summary, storyline; where storyline != null; limit 500;'
    );

    data.forEach(async (gameData: IGameDocument) => {
      await GameModel.create(gameData);
      console.log(`[SERVER]: created game data name = ${gameData.name}`);
    });
  });

  server.get('/igdb', async (_, response) => {
    const IGDBInstance = await IGDBApi.getInstance();

    const { data } = await IGDBInstance.post('/games', 'fields *; limit 10;');

    return response.send(data);
  });

  server.get('/nlp', async (_, response) => {
    const NLPInstance = NLPApi.getInstance();

    const text =
      'Michael Joseph Jackson (August 29, 1958 – June 25, 2009) was an American singer, songwriter, and dancer. Dubbed the "King of Pop", he is regarded as one of the most significant cultural figures of the 20th century. Through stage and video performances, he popularized complicated dance techniques such as the moonwalk, to which he gave the name. His sound and style have influenced artists of various genres, and his contributions to music, dance, and fashion, along with his publicized personal life, made him a global figure in popular culture for over four decades. Jackson is the most awarded artist in the history of popular music.';

    const document: IDocument = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const [annotation] = await NLPInstance.annotateText({
      document,
      features: {
        classifyText: true,
        extractDocumentSentiment: true,
        extractEntities: true,
        extractEntitySentiment: true,
      },
    });

    response.send({
      annotation,
    });
  });

  server.get('/steam', async (_, response) => {
    const value = await SteamApi.getGamePrice('218620');

    return response.send({ price: value });
  });

  server.listen(4000, () => console.log('[SERVER]: ON'));
}

runServer();
