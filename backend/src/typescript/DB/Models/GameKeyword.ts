import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
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
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_keyword: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_keywords',
				modelName: 'GameKeywordModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {}
}
export default GameKeywordModel;
