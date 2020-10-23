import sequelize from 'sequelize';
import Sequelize, { Model, Optional } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameGameMode } from '../AssociativeTables';
import GameModel from './GameModel';
import GameModeModel from './GameModeModel';

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

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				id_game_mode: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_mode_game',
			}
		);
	}

	// static associate(models: any): void {
	// 	this.belongsToMany(models.GameModel, {
	// 		through: models.GameGameModeModel,
	// 		sourceKey: 'id_game_mode',
	// 	});
	// }
}

export default GameGameModeModel;
