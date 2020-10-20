// eslint-disable-next-line import/no-unresolved
import Sequelize from 'sequelize';
import databaseConfig from './Config/database';

class Connection {
	public connectionSequelize: Sequelize.Sequelize;

	constructor() {
		this.init();
	}

	init(): void {
		this.connectionSequelize = new Sequelize.Sequelize(
			databaseConfig
		);
	}
}

const database: Connection = new Connection();

export default database;
