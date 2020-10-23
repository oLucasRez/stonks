import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { IGenre } from '../Tables';

type GenreCreationAttributes = Optional<IGenre, 'id'>;

class GenreModel extends Model<IGenre, GenreCreationAttributes> {
	public id!: number;

	public name!: string;

	public slug!: string;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				slug: Sequelize.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'genres',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameGenreModel,
		});
	}
}

export default GenreModel;
