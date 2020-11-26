/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameToken } from '../typescript/database/AssociativeTables';

type GameTokenCreationAttributes = Optional<IGameToken, 'id'>;

class GameTokenModel extends Model<
	IGameToken,
	GameTokenCreationAttributes
> {
	public id!: number;

	public id_game!: number;

	public id_token!: number;

	public weight!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				id_token: DataTypes.NUMBER,
				id_game: DataTypes.NUMBER,
				type: {
					type: DataTypes.STRING,
					validate: {
						isIn: [['storyline', 'summary']],
					},
				},
				weight: DataTypes.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_tokens',
				modelName: 'GameTokenModel',
			}
		);
	}

	static associate(database: Sequelize): void {}
}
export default GameTokenModel;
