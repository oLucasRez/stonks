import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGenre } from '../typescript/database/Tables';

type GenreCreationAttributes = Optional<IGenre, 'id'>;

class GenreModel extends Model<IGenre, GenreCreationAttributes> {
	public id!: number;

	public name!: string;

	public slug!: string;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: DataTypes.STRING,
				slug: DataTypes.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'genres',
				modelName: 'GenreModel',
			}
		);
	}

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameGenreModel,
			foreignKey: 'id_genre',
		});
	}
}

export default GenreModel;
