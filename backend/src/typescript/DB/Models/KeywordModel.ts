import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
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
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: Sequelize.STRING,
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

	static associate(database: Sequelize.Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameKeywordModel,
		});
	}
}

export default KeywordModel;
