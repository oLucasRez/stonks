import Sequelize, { Model, Optional } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGamePlayerPerspective } from '../AssociativeTables';

type GamePlayerPerspectiveCreationAttributes = Optional<
	IGamePlayerPerspective,
	'id'
>;

class GamePlayerPerspectiveModel extends Model<
	IGamePlayerPerspective,
	GamePlayerPerspectiveCreationAttributes
> {
	public id!: number;

	public id_player_perspective!: number;

	public id_game!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				id_player_perspective: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_player_perspectives',
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
export default GamePlayerPerspectiveModel;
