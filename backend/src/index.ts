import 'dotenv/config';

import App from './server';

import IGDBApi from './services/igdb';
import SteamApi from './services/steam';
import MongoConnect from './services/mongo';
import { GameModel } from './interfaces/igdb/Game.Example/game.model';
import { IGameDocument } from './interfaces/igdb/Game.Example/game.types';

async function runServer() {
  const server = await App.getInstance();
  
  // var mongoConnect : MongoConnect = new MongoConnect();
  // MongoConnect.getInstance();

  server.post('/igdb/game', async (_, response) => {
    MongoConnect.connect();
    const game = response.req?.body;

    try {
      await GameModel.create(game);
      console.log(`[SERVER]: Created game summary: ${game.summary} and storyline ${game.storyline}`);
      MongoConnect.disconnect();
      return response.sendStatus(200);
    } catch(err) {
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

  server.get('/steam', async (_, response) => {
    const value = await SteamApi.getGamePrice('218620');

    return response.send({ price: value });
  });

  server.listen(4000, () => console.log('[SERVER]: ON'));
}

async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = 'Hello, world!';

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({ document: document });
  const sentiment = result.documentSentiment;

  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}

quickstart();

runServer();
