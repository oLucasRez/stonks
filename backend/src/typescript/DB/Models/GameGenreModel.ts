import Sequelize, { Model, Optional } from 'sequelize';
import { IGameGenre } from '../AssociativeTables';

type GameGenreCreationAttributes = Optional<IGameGenre, 'id'>;

class GameGenreModel extends Model<
	IGameGenre,
	GameGenreCreationAttributes
> {
	public id!: number;

	public id_genre!: number;

	public id_game!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				id_genre: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_genres',
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

export default GameGenreModel;
