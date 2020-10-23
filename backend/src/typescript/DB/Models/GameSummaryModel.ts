import Sequelize, { Model, Optional } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameSummary } from '../AssociativeTables';

type GameSummaryCreationAttributes = Optional<
	IGameSummary,
	'id'
>;

class GameSummaryModel extends Model<
	IGameSummary,
	GameSummaryCreationAttributes
> {
	public id!: number;

	public id_summary!: number;

	public id_game!: number;

	public weight!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				id_summary: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
				weight: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_summarys',
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
export default GameSummaryModel;
