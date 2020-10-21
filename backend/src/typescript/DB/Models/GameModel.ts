import sequelize from 'sequelize';
import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGame } from '../Tables';

class GameModel extends Model implements IGame {
	public id!: number;
	public id_game_engine!: number;
	public age_rating!: number;
	public time_to_beat!: number;
	public follows!: number;
	public hype!: number;
	public total_rating!: number;
	public total_rating_count!: number;
	public price!: number;
	public name!: string;
	public slug!: string;
	public storyline!: string;
	public summary!: string;
	public release_date!: Date;
}

GameModel.init(
	{
		age_rating: Sequelize.NUMBER,
		time_to_beat: Sequelize.NUMBER,
		follows: Sequelize.NUMBER,
		hype: Sequelize.NUMBER,
		total_rating: Sequelize.NUMBER,
		total_rating_count: Sequelize.NUMBER,
		price: Sequelize.NUMBER,
		name: Sequelize.STRING,
		slug: Sequelize.STRING,
		storyline: Sequelize.STRING,
		summary: Sequelize.STRING,
		release_date: Sequelize.DATE,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game',
	}
);

export default GameModel;
