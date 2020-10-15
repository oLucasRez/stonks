import { Document, Model } from "mongoose";

export interface IGame {
    gameId: Number,
    summary: String,
    storyline: String
}
export interface IGameDocument extends IGame, Document {
    getBySummary: (this: IGameDocument) => Promise<Document[]>;
}

export interface IGameModel extends Model<IGameDocument> {
    findOneOrCreate: (
        this: IGameModel,
        {
            summary,
            storyline
        } : { summary: string; storyline: string }
     ) => Promise<IGameDocument>;
}