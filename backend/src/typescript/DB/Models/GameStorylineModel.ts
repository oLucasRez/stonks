import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
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
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_storyline: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
				weight: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_storylines',
				modelName: 'GameStorylineModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {}
}
export default GameStorylineModel;
