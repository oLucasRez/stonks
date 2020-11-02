/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameStoryline } from '../typescript/database/AssociativeTables';

type GameStorylineCreationAttributes = Optional<
	IGameStoryline,
	'id'
>;

class GameStorylineModel extends Model<
	IGameStoryline,
	GameStorylineCreationAttributes
> {
	public id!: number;

	public id_storyline!: number;

	public id_token!: number;

	public weight!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_storyline: DataTypes.NUMBER,
				id_game: DataTypes.NUMBER,
				weight: DataTypes.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_storylines',
				modelName: 'GameStorylineModel',
			}
		);
	}

	static associate(database: Sequelize): void {}
}
export default GameStorylineModel;
