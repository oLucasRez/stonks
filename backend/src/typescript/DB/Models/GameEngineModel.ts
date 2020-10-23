import Sequelize, { Model, Optional } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameEngine } from '../Tables';

type GameEngineCreationAttributes = Optional<IGameEngine, 'id'>;

class GameEngineModel extends Model<
	IGameEngine,
	GameEngineCreationAttributes
> {
	public id!: number;

	public name!: string;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				name: Sequelize.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_engines',
			}
		);
	}

	static associate(models: any): void {
		this.belongsTo(models.GameModel, {
			foreignKey: 'id_game_engine',
		});
	}
}
export default GameEngineModel;
