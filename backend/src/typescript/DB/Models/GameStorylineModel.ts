import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameStoryline } from '../AssociativeTables';

class GameStorylineModel
	extends Model
	implements IGameStoryline {
	public id!: number;

	public id_game!: number;

	public id_storyline!: number;

	public weight!: number;
}

GameStorylineModel.init(
	{
		weight: Sequelize.NUMBER,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_storylines',
	}
);

export default GameStorylineModel;
