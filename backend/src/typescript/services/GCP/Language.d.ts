/* eslint-disable @typescript-eslint/no-empty-interface */
import { google } from '@google-cloud/language/build/protos/protos';
import { LanguageServiceClient } from '@google-cloud/language/build/src/v1';

export declare interface IDocument
	extends google.cloud.language.v1.IDocument {}

export declare interface IAnalyzeSentimentResponse
	extends google.cloud.language.v1.IAnalyzeSentimentResponse {}

export declare interface IAnalyzeSentimentRequest
	extends google.cloud.language.v1.IAnalyzeSentimentRequest {}

export declare interface ILanguageServiceClient
	extends LanguageServiceClient {}
