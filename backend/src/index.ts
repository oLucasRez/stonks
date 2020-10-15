import 'dotenv/config';

import App from './server';

import IGDBApi from './services/igdb';
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
