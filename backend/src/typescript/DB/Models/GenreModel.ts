import sequelize from 'sequelize';
import Sequelize, { Model, Optional } from 'sequelize';
import { IGenre } from '../Tables';

type GenreCreationAttributes = Optional<IGenre, 'id'>;

class GenreModel extends Model<IGenre, GenreCreationAttributes> {
	public id!: number;

	public name!: string;

	public slug!: string;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				name: Sequelize.STRING,
				slug: Sequelize.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'genres',
			}
		);
	}

	static associate(models: any): void {
		this.belongsToMany(models.GameModel, {
			through: models.GameGenreModel,
			sourceKey: 'id_genre',
		});
	}
}

export default GenreModel;
