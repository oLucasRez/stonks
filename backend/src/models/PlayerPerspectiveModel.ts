import {
	Model,
	Optional,
	Sequelize,
	DataTypes,
} from 'sequelize';

import { IPlayerPerspective } from '../typescript/database/Tables';

type PlayerPerspectiveModelCreationAttributes = Optional<
	IPlayerPerspective,
	'id'
>;

class PlayerPerspectiveModel extends Model<
	IPlayerPerspective,
	PlayerPerspectiveModelCreationAttributes
> {
	public id!: number;

	public name!: string;

	public slug!: string;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: DataTypes.STRING,
				slug: DataTypes.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'player_perspectives',
				modelName: 'PlayerPerspectiveModel',
			}
		);
	}

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GamePlayerPerspectiveModel,
			foreignKey: 'id_player_perspective',
		});
	}
}

export default PlayerPerspectiveModel;
