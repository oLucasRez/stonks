import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { IStoryline } from '../Tables';

type storylineCreationAttributes = Optional<IStoryline, 'id'>;

class StorylineModel extends Model<
	IStoryline,
	storylineCreationAttributes
> {
	public id!: number;

	public token!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				token: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'storylines',
				modelName: 'StorylineModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameStorylineModel,
		});
	}
}

export default StorylineModel;
