/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameTheme } from '../typescript/database/AssociativeTables';

type GameGenreCreationAttributes = Optional<IGameTheme, 'id'>;

class GameThemeModel extends Model<
	IGameTheme,
	GameGenreCreationAttributes
> {
	public id!: number;

	public id_theme!: number;

	public id_game!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				id_theme: DataTypes.NUMBER,
				id_game: DataTypes.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_themes',
				modelName: 'GameThemeModel',
			}
		);
	}

	static associate(database: Sequelize): void {}
}

export default GameThemeModel;
