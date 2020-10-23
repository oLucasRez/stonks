import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IStoryline } from '../Tables';
import GameModel from './GameModel';
import GameStorylineModel from './GameStorylineModel';

class StorylineModel extends Model implements IStoryline {
	public id!: number;

	public token!: number;
}

StorylineModel.init(
	{
		token: Sequelize.NUMBER,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'storylines',
	}
);
StorylineModel.belongsToMany(GameModel, {
	through: GameStorylineModel,
	sourceKey: 'id_storyline',
});
export default StorylineModel;
