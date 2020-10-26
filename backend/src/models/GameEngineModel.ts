import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameEngine } from '../typescript/database/Tables';

type GameEngineCreationAttributes = Optional<IGameEngine, 'id'>;

class GameEngineModel extends Model<
	IGameEngine,
	GameEngineCreationAttributes
> {
	public id!: number;

	public name!: string;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: DataTypes.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_engines',
				modelName: 'GameEngineModel',
			}
		);
	}
	
	static associate(database: Sequelize.Sequelize): void {
		// this.belongsTo(database.models.GameModel, {
		// 	foreignKey: 'id_game_engine',
		// }); upstream/backend:backend/src/models/GameEngineModel.ts
	}
}
export default GameEngineModel;
