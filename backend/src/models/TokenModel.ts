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

	public token!: string;

	public type!: string;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
				},
				token: DataTypes.STRING,
				type: DataTypes.STRING,
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
			through: database.models.GameTokenModel,
			foreignKey: 'id_token',
		});
	}
}

export default TokenModel;
