
import { model } from "mongoose";
import { IGameDocument } from "./game.types";
import GameSchema from "./game.schema";

export const GameModel = model<IGameDocument>("game", GameSchema);