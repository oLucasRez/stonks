import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IToken } from '../typescript/database/Tables';

type TokenCreationAttributes = Optional<IToken, 'id'>;

class TokenModel extends Model<IToken, TokenCreationAttributes> {
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
				tableName: 'token',
				modelName: 'TokenModel',
			}
		);
	}

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameSummaryModel,
		});
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameStorylineModel,
		});
	}
}

export default TokenModel;
