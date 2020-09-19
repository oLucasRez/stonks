import 'dotenv/config';

import App from './server';
import IGDBApi from './services/igdb';

const server = App.getInstance();
const IGDB = IGDBApi.getInstance();

server.get('/', async (_, response) => {
  const { data } = await IGDB.post('/games', 'fields name; limit 10;');

  return response.send(data);
});

server.listen(4000);
