import 'dotenv/config';

import App from './server';

import IGDBApi from './services/igdb';
import { quickstart } from './services/nlp';
import SteamApi from './services/steam';

async function runServer() {
  const server = await App.getInstance();

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

quickstart();

runServer();
