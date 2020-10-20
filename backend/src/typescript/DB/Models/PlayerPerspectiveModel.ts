import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IPlayerPerspective } from '../Tables';

class PlayerPerspectiveModel
	extends Model
	implements IPlayerPerspective {
	public id!: number;

	public name!: string;

	public slug!: string;
}

PlayerPerspectiveModel.init(
	{
		name: Sequelize.STRING,
		slug: Sequelize.STRING,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'player_perspective',
	}
);

export default PlayerPerspectiveModel;
