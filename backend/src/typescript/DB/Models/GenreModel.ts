import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGenre } from '../Tables';
import GameGenreModel from './GameGenreModel';
import GameModel from './GameModel';

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
GenreModel.belongsToMany(GameModel, {
	through: GameGenreModel,
	sourceKey: 'id_genre',
});
export default GenreModel;
