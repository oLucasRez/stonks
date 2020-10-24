import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IStoryline } from '../typescript/database/Tables';

type storylineCreationAttributes = Optional<IStoryline, 'id'>;

class StorylineModel extends Model<
	IStoryline,
	storylineCreationAttributes
> {
	public id!: number;

	public token!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				token: DataTypes.NUMBER,
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

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameStorylineModel,
		});
	}
}

export default StorylineModel;
