import Sequelize, { Model, Optional } from 'sequelize';
import { IGameKeyword } from '../AssociativeTables';

type GameKeywordCreationAttributes = Optional<
	IGameKeyword,
	'id'
>;

class GameKeywordModel extends Model<
	IGameKeyword,
	GameKeywordCreationAttributes
> {
	public id!: number;

	public id_keyword!: number;

	public id_game!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				id_keyword: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_keywords',
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
export default GameKeywordModel;
