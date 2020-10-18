import { google } from '@google-cloud/language/build/protos/protos';

export interface IDocument extends google.cloud.language.v1.IDocument {}

export interface IAnalyzeSentimentResponse
  extends google.cloud.language.v1.IAnalyzeSentimentResponse {}

export interface IAnalyzeSentimentRequest
  extends google.cloud.language.v1.IAnalyzeSentimentRequest {}
