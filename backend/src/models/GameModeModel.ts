import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameMode } from '../typescript/database/Tables';

type GameModeCreationAttributes = Optional<IGameMode, 'id'>;

class GameModeModel extends Model<
	IGameMode,
	GameModeCreationAttributes
> {
	public id!: number;

	public name!: string;

	public slug!: string;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: DataTypes.STRING,
				slug: DataTypes.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_mode',
				modelName: 'GameModeModel',
			}
		);
	}

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameGameModeModel,
			foreignKey: 'id_game_mode',
		});
	}
}
export default GameModeModel;
