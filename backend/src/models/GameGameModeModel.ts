/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameGameMode } from '../typescript/database/AssociativeTables';

type GameGameModeCreationAttributes = Optional<
	IGameGameMode,
	'id'
>;

class GameGameModeModel extends Model<
	IGameGameMode,
	GameGameModeCreationAttributes
> {
	public id!: number;

	public id_game_mode!: number;

	public id_game!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				id_game_mode: DataTypes.NUMBER,
				id_game: DataTypes.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_mode_game',
				modelName: 'GameGameModeModel',
			}
		);
	}

	static associate(database: Sequelize): void {}
}

export default GameGameModeModel;
