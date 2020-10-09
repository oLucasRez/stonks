import 'dotenv/config';

import App from './server';

async function runServer() {
  const server = await App.getInstance();

  const { IGDBApi, SteamApi } = App;

  server.get('/igdb', async (_, response) => {
    const { data } = await IGDBApi.post('/games', 'fields *; limit 10;');

    return response.send(data);
  });

  server.get('/steam', async (_, response) => {
    const { data } = await SteamApi.get('/appdetails', {
      params: { appids: 218620 },
    });

    return response.send(data);
  });

  server.listen(4000, () => console.log('[SERVER]: ON'));
}

runServer();
