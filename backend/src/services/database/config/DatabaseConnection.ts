// eslint-disable-next-line import/no-unresolved
import { Sequelize } from 'sequelize';

import DatabaseProperties from './DatabaseProperties';

class Connection {
	public connectionSequelize!: Sequelize;

	constructor() {
		this.init();
	}

	init(): void {
		this.connectionSequelize = new Sequelize(DatabaseProperties);
	}
}

const database = new Connection();

export default database;
