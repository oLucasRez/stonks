import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IStoryline } from '../Tables';

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

export default StorylineModel;
