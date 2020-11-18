/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameSummary } from '../typescript/database/AssociativeTables';

type GameSummaryCreationAttributes = Optional<
	IGameSummary,
	'id'
>;

class GameSummaryModel extends Model<
	IGameSummary,
	GameSummaryCreationAttributes
> {
	public id!: number;

	public id_token!: number;

	public id_game!: number;

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
				weight: DataTypes.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_summarys',
				modelName: 'GameSummaryModel',
			}
		);
	}

	static associate(database: Sequelize): void {}
}
export default GameSummaryModel;
