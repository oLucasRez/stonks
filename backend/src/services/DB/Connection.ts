import { Client, QueryResult } from 'pg';

class Connection {
	private conn!: Client;

	public connect(): void {
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
	): Promise<number> {
		this.connect();
		const { rows } = await this.conn.query(
			`insert into ${table} (${params}) values (${values}) returning *`
		);
		return rows.length;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async showRows(table: string): Promise<QueryResult<any>> {
		this.connect();
		const data = await this.conn.query(`select * from ${table}`);
		return data;
	}

	async delete(table: string, where: string): Promise<void> {
		this.connect();
	}
}
export default Connection;
