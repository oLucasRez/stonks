import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { ITheme } from '../Tables';
import GameModel from './GameModel';
import GameThemeModel from './GameThemeModel';

class ThemeModel extends Model implements ITheme {
	public id!: number;

	public name!: string;

	public slug!: string;
}

ThemeModel.init(
	{
		name: Sequelize.STRING,
		slug: Sequelize.STRING,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'themes',
	}
);
ThemeModel.belongsToMany(GameModel, {
	through: GameThemeModel,
	sourceKey: 'id_theme',
});
export default ThemeModel;
