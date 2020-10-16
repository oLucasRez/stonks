import { LanguageServiceClient } from '@google-cloud/language';
import { LanguageServiceClient as ILanguageServiceClient } from '@google-cloud/language/build/src/v1';

class NLPApi {
  private static instance: ILanguageServiceClient;

  public static getInstance(): ILanguageServiceClient {
    if (!this.instance) {
      this.createClientInstance();
    }

    return this.instance;
  }

  private static createClientInstance(): void {
    this.instance = new LanguageServiceClient();
  }
}

export default NLPApi;
