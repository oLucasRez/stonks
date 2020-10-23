import Sequelize, { Model, Optional } from 'sequelize';
import { ITheme } from '../Tables';

type ThemeCreationAttributes = Optional<ITheme, 'id'>;

class ThemeModel extends Model<ITheme, ThemeCreationAttributes> {
	public id!: number;

	public name!: string;

	public slug!: string;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				name: Sequelize.STRING,
				slug: Sequelize.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'themes',
			}
		);
	}

	static associate(models: any): void {
		this.belongsToMany(models.GameModel, {
			through: models.GameThemeModel,
			sourceKey: 'id_theme',
		});
	}
}

export default ThemeModel;
