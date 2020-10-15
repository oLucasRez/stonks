import 'dotenv/config';

import App from './server';

import IGDBApi from './services/igdb';
import SteamApi from './services/steam';
import MongoConnect from './services/mongo';
import { GameModel } from './interfaces/igdb/Game.Example/game.model';

async function runServer() {
  const server = await App.getInstance();
  
  // var mongoConnect : MongoConnect = new MongoConnect();
  // MongoConnect.getInstance();

  server.post('/igdb/game', async (_, response) => {
    MongoConnect.connect();
    const game = response.req?.body;

    try {
      await GameModel.create(game);
      console.log(`Created game summary: ${game.summary} and stroyline ${game.storyline}`);
      MongoConnect.disconnect();
      return response.sendStatus(200);
    } catch(err) {
      console.log(err);
      return response.sendStatus(400);
    }
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

runServer();
