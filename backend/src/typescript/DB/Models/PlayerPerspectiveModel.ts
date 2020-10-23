import sequelize, { DataTypes } from 'sequelize';
import Sequelize, { Model, Optional } from 'sequelize';
import { IPlayerPerspective } from '../Tables';

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

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				slug: Sequelize.STRING,
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

	static associate(database: Sequelize.Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GamePlayerPerspectiveModel,
		});
	}
}

export default PlayerPerspectiveModel;
