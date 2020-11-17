import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IKeyword } from '../typescript/database/Tables';

type KeywordCreationAttributes = Optional<IKeyword, 'id'>;

class KeywordModel extends Model<
	IKeyword,
	KeywordCreationAttributes
> {
	public id!: number;

	public name!: string;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				name: DataTypes.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'keywords',
				modelName: 'KeywordModel',
			}
		);
	}

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameKeywordModel,
			foreignKey: 'id_keyword',
		});
	}
}

export default KeywordModel;
