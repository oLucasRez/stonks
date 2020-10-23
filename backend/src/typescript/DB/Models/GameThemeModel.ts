import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
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
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_theme: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_themes',
				modelName: 'GameThemeModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {}
}

export default GameThemeModel;
