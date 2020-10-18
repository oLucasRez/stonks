import { LanguageServiceClient } from '@google-cloud/language';

import Service from '../classes/abstract/ABService';

import { ILanguageServiceClient } from '../typescript/services/GCP/Language';

class NLPApi extends Service<ILanguageServiceClient> {
	private constructor() {
		super();

		this.createClientInstance();
	}

	getAPI = (): ILanguageServiceClient => this.api;

	public static getInstance(): NLPApi {
		if (!NLPApi.instance) {
			NLPApi.instance = new NLPApi();
		}

		return NLPApi.instance;
	}

	private createClientInstance(): void {
		this.api = new LanguageServiceClient();
	}
}

export default NLPApi;
