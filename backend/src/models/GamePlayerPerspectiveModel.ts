/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGamePlayerPerspective } from '../typescript/database/AssociativeTables';

type GamePlayerPerspectiveCreationAttributes = Optional<
	IGamePlayerPerspective,
	'id'
>;

class GamePlayerPerspectiveModel extends Model<
	IGamePlayerPerspective,
	GamePlayerPerspectiveCreationAttributes
> {
	public id!: number;

	public id_player_perspective!: number;

	public id_game!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				id_player_perspective: DataTypes.NUMBER,
				id_game: DataTypes.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_player_perspectives',
				modelName: 'GamePlayerPerspectiveModel',
			}
		);
	}

	static associate(database: Sequelize): void {}
}
export default GamePlayerPerspectiveModel;
