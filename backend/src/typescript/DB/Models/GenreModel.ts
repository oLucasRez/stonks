import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGenre } from '../Tables';

class GenreModel extends Model implements IGenre {
	public id!: number;

	public name!: string;

	public slug!: string;
}

GenreModel.init(
	{
		name: Sequelize.STRING,
		slug: Sequelize.STRING,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'genres',
	}
);

export default GenreModel;
