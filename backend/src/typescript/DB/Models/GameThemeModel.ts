import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameTheme } from '../AssociativeTables';

class GameThemeModel extends Model implements IGameTheme {
	public id!: number;

	public id_theme!: number;

	public id_game!: number;
}

GameThemeModel.init(
	{},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_themes',
	}
);

export default GameThemeModel;
