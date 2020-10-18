import { Schema } from 'mongoose';
import { findOneOrCreate } from './game.statics';
import { getBySummary } from './game.methods';

const GameSchema = new Schema({
  gameId: Number,
  name: String,
  summary: String,
  storyline: String,
});

GameSchema.statics.findOneOrCreate = findOneOrCreate;

GameSchema.methods.getBySummary = getBySummary;

export default GameSchema;
