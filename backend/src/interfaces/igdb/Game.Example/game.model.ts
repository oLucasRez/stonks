
import { model } from "mongoose";
import { IGameDocument } from "./Game.types";
import GameSchema from "./Game.Schema";

export const GameModel = model<IGameDocument>("game", GameSchema);