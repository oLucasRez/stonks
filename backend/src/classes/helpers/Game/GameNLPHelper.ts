import NLPApi from '../../../services/NLPApi';

import { IDocument } from '../../../typescript/services/GCP/Language';

const NLP = NLPApi.getInstance().getAPI();

class GameNLPHelper {
	private static tokenToId(token: string): number {
		let id = 0;

		for (let i = 0; i < token.length; i += 1) {
			id += token.charCodeAt(i);
		}

		return id;
	}

	public static async getTokensAndWeight(
		text: string
	): Promise<Map<number, number>> {
		const document: IDocument = {
			content: text,
			type: 'PLAIN_TEXT',
		};

		const entityResult = await NLP.analyzeEntities({
			document,
			encodingType: 'UTF8',
		});

		const [result] = entityResult;

		const { entities } = result;

		const dictionary = new Map<number, number>();

		entities?.forEach((entity) => {
			const { name, type, salience } = entity;

			if (name && salience) {
				const tokenId = GameNLPHelper.tokenToId(name + type);

				dictionary.set(tokenId, salience);
			}
		});

		return dictionary;
	}
}

export default GameNLPHelper;
