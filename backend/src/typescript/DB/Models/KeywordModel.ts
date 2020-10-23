import Sequelize, { Model, Optional } from 'sequelize';
import { IKeyword } from '../Tables';

type KeywordCreationAttributes = Optional<IKeyword, 'id'>;

class KeywordModel extends Model<
	IKeyword,
	KeywordCreationAttributes
> {
	public id!: number;

	public name!: string;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				name: Sequelize.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'keywords',
			}
		);
	}

	static associate(models: any): void {
		this.belongsToMany(models.GameModel, {
			through: models.GameKeywordModel,
			sourceKey: 'id_keyword',
		});
	}
}

export default KeywordModel;
