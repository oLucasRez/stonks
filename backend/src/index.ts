import 'dotenv/config';

import App from './server';
import IGDBTheme from './classes/calls/IGDBTheme';
import IGDBGameEngine from './classes/calls/IGDBGameEngine';
import IGDBKeyword from './classes/calls/IGDBKeyword';
import IGDBGenres from './classes/calls/IGDBGenres';
import IGDBPlayerPerspective from './classes/calls/IGDBPlayerPerspective';
import IGDBGameMode from './classes/calls/IGDBGameMode';

async function runServer() {
	const server = await App.getInstance();

	server.listen(4000, () => console.log('[SERVER]: ON'));
}

runServer();

const ThemeCall = new IGDBTheme();
const GameEngineCall = new IGDBGameEngine();
const KeywordCall = new IGDBKeyword();
const GenreCall = new IGDBGenres();
const PlayerPerspectiveCall = new IGDBPlayerPerspective();
const GameModeCall = new IGDBGameMode();

async function makeCall() {
	// eslint-disable-next-line no-await-in-loop
	await ThemeCall.call();
	await GameEngineCall.call();
	await KeywordCall.call();
	await GenreCall.call();
	await PlayerPerspectiveCall.call();
	await GameModeCall.call();
}

makeCall();
