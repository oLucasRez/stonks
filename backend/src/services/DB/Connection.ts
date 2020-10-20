//(async () => {
//    connect();
//funções para usar....
//  })();

class Connection {
	private conn: any;
	// public async insert(): Promise<void> {
	// 	this.connect();
	// 	await this.insert();
	//   await this.showRows();
	// }
	public connect(): void {
		let { Client } = require('pg');
		this.conn = new Client({
			host: process.env.PG_HOST,
			database: process.env.PG_DB,
			user: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			port: 5432,
		});
		this.conn.connect();
	}
	public async insert(
		table: string,
		params: string,
		values: string
	): Promise<void> {
		this.connect();
		let { rows } = await this.conn.query(
			`insert into ${table} (${params}) values (${values}) returning *`
		);
		console.log(`Rows inserted: ${rows.length}`);
	}
	async showRows(table: string) {
		this.connect();
		let { rows } = await this.conn.query(
			`select * from ${table}`
		);
		for (const row of rows) {
			console.log(row);
		}
	}
	async delete(table: string, where: string) {
		this.connect();
		let { rows } = await this.conn.query(
			`delete from ${table} where ${where}`
		);
	}
}
export default Connection;
