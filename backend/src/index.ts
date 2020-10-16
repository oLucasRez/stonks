import 'dotenv/config';

import App from './server';

import IGDBApi from './services/IGDB';
import SteamApi from './services/SteamApi';
import MongoConnect from './services/MongoDB';
import { GameModel } from './interfaces/igdb/Game.Example/game.model';
import { IGameDocument } from './interfaces/igdb/Game.Example/game.types';
import NLPApi from './services/NLPApi';
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
    const {data} = await IGDBInstance.post('/games', 'fields name, summary, storyline; where storyline != null; limit 500;');

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
      'Misso é um agiota que está cansado de todas as pessoas que estão devendo a ele.';

    const document: IDocument = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const [result] = await NLPInstance.analyzeSentiment({ document: document });
    const sentiment = result.documentSentiment;

    response.send({
      text: document.content,
      sentiment,
    });
  });

  server.get('/steam', async (_, response) => {
    const value = await SteamApi.getGamePrice('218620');

    return response.send({ price: value });
  });

  server.listen(4000, () => console.log('[SERVER]: ON'));
}

runServer();
