import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IKeyword } from '../Tables';

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

export default KeywordModel;
