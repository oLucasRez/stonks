import { Document } from "mongoose";
import { IGameDocument } from "./game.types";

export async function getBySummary(this: IGameDocument): Promise<Document[]> {
  return this.model("game").find({ summary: this.summary });
}