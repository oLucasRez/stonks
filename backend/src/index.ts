import 'dotenv/config';

import App from './server';

async function runServer() {
  const server = await App.getInstance();

  const { IGDBApi } = App;

  server.get('/', async (_, response) => {
    const { data } = await IGDBApi.post('/games', 'fields name; limit 10;');

    return response.send(data);
  });

  server.listen(4000, () => console.log('[SERVER]: ON'));
}

runServer();
