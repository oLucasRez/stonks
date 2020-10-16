import { IGameDocument, IGameModel } from "./game.types";

export async function findOneOrCreate(
  this: IGameModel,
  gameId: Number,
  storyline: String,
  summary: String
): Promise<IGameDocument> {
  const record = await this.findOne({ gameId });
  if (record) {
    return record;
  } else {
    return this.create({ gameId, summary, storyline });
  }
}