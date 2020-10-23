import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
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
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_genre: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_genres',
				modelName: 'GameGenreModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {}
}

export default GameGenreModel;
