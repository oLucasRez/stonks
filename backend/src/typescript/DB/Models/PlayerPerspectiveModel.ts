import sequelize from 'sequelize';
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
				id: sequelize.NUMBER,
				name: Sequelize.STRING,
				slug: Sequelize.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'player_perspectives',
			}
		);
	}

	static associate(models: any): void {
		this.belongsToMany(models.GameModel, {
			through: models.GamePlayerPerspectiveModel,
			sourceKey: 'id_player_perspective',
		});
	}
}

export default PlayerPerspectiveModel;
