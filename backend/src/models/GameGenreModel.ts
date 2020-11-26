/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameGenre } from '../typescript/database/AssociativeTables';

type GameGenreCreationAttributes = Optional<IGameGenre, 'id'>;

class GameGenreModel extends Model<
	IGameGenre,
	GameGenreCreationAttributes
> {
	public id!: number;

	public id_genre!: number;

	public id_game!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				id_genre: DataTypes.NUMBER,
				id_game: DataTypes.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_genres',
				modelName: 'GameGenreModel',
			}
		);
	}

	static associate(database: Sequelize): void {}
}

export default GameGenreModel;
