/* eslint-disable no-bitwise */
import NLPApi from '../../../services/NLPApi';
import { ITokenRaw } from '../../../typescript/services/GCP/ITokenRaw';

import { IDocument } from '../../../typescript/services/GCP/Language';

const NLP = NLPApi.getInstance().getAPI();

class GameNLPHelper {
	public static async getTokensAndWeight(
		text: string
	): Promise<ITokenRaw[]> {
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

		const rawTokens: ITokenRaw[] = [];

		entities?.forEach((entity) => {
			const { name, type, salience } = entity;

			if (name && salience) {
				rawTokens.push({
					token: name,
					weight: salience,
					type: type as string,
				});
			}
		});

		return rawTokens;
	}
}

export default GameNLPHelper;
