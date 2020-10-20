let conn;

(async () => {
    connect();
    //funções para usar....
  })();


function connect() {
    let { Client } = require('pg');
    conn = new Client({
      host: 'stonks-database.c8v7ftrxiwwr.us-east-1.rds.amazonaws.com',
      database: 'stonks_database',
      user: 'stonks',
      password: 'stonksmamadinha69420',
      port: 5432,
    });
    conn.connect();
  }