import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { ITheme } from '../typescript/database/Tables';

type ThemeCreationAttributes = Optional<ITheme, 'id'>;

class ThemeModel extends Model<ITheme, ThemeCreationAttributes> {
	public id!: number;

	public name!: string;

	public slug!: string;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: DataTypes.STRING,
				slug: DataTypes.STRING,
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

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameThemeModel,
			foreignKey: 'id_theme',
		});
	}
}

export default ThemeModel;
