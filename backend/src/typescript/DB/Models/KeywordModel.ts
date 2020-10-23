import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IKeyword } from '../Tables';
import GameKeywordModel from './GameKeyword';
import GameModel from './GameModel';

class KeywordModel extends Model implements IKeyword {
	public id!: number;

	public name!: string;
}

KeywordModel.init(
	{
		name: Sequelize.STRING,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'keywords',
	}
);
KeywordModel.belongsToMany(GameModel, {
	through: GameKeywordModel,
	sourceKey: 'id_keyword',
});
export default KeywordModel;
