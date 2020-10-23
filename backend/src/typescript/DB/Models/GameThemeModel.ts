import Sequelize, { Model, Optional } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameTheme } from '../AssociativeTables';

type GameGenreCreationAttributes = Optional<IGameTheme, 'id'>;

class GameThemeModel extends Model<
	IGameTheme,
	GameGenreCreationAttributes
> {
	public id!: number;

	public id_theme!: number;

	public id_game!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				id_theme: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_themes',
			}
		);
	}

	// static associate(models: any): void {
	// 	this.belongsToMany(models.GameModel, {
	// 		through: models.GameGenreModel,
	// 		sourceKey: 'id_genre',
	// 	});
	//}
}

export default GameThemeModel;
