import Sequelize, { Model, Optional } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameStoryline } from '../AssociativeTables';

type GameStorylineCreationAttributes = Optional<
	IGameStoryline,
	'id'
>;

class GameStorylineModel extends Model<
	IGameStoryline,
	GameStorylineCreationAttributes
> {
	public id!: number;

	public id_storyline!: number;

	public id_game!: number;

	public weight!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				id_storyline: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
				weight: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_storylines',
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
export default GameStorylineModel;
