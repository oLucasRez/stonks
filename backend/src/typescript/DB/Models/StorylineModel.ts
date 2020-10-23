import Sequelize, { Model, Optional } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IStoryline } from '../Tables';
import GameModel from './GameModel';
import GameStorylineModel from './GameStorylineModel';

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
				id: Sequelize.NUMBER,
				token: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'storylines',
			}
		);
	}

	static associate(models: any): void {
		this.belongsToMany(models.GameModel, {
			through: models.GameStorylineModel,
			sourceKey: 'id_storyline',
		});
	}
}

export default StorylineModel;
