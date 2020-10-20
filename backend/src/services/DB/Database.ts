module.exports = {
	dialect: 'postgres',
	host: process.env.PG_HOST,
	database: process.env.PG_DB,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	port: 5432,
	define: {
		timestamps: true,
	},
};
