/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGameKeyword } from '../typescript/database/AssociativeTables';

type GameKeywordCreationAttributes = Optional<
	IGameKeyword,
	'id'
>;

class GameKeywordModel extends Model<
	IGameKeyword,
	GameKeywordCreationAttributes
> {
	public id!: number;

	public id_keyword!: number;

	public id_game!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				id_keyword: DataTypes.NUMBER,
				id_game: DataTypes.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_keywords',
				modelName: 'GameKeywordModel',
			}
		);
	}

	static associate(database: Sequelize): void {}
}
export default GameKeywordModel;
