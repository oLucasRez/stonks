import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { ITheme } from '../Tables';

type ThemeCreationAttributes = Optional<ITheme, 'id'>;

class ThemeModel extends Model<ITheme, ThemeCreationAttributes> {
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
				tableName: 'themes',
				modelName: 'ThemeModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameThemeModel,
		});
	}
}

export default ThemeModel;
