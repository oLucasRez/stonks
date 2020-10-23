import Sequelize, { Model, Optional } from 'sequelize';
import { IGameMode } from '../Tables';

type GameModeCreationAttributes = Optional<IGameMode, 'id'>;

class GameModeModel extends Model<
	IGameMode,
	GameModeCreationAttributes
> {
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
				tableName: 'game_mode',
			}
		);
	}

	static associate(models: any): void {
		this.belongsToMany(models.GameModel, {
			through: models.GameGameModeModel,
			sourceKey: 'id_game_mode',
		});
	}
}
export default GameModeModel;
