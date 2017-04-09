const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sendatask';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE users(name VARCHAR(20), username VARCHAR(20) PRIMARY KEY, email VARCHAR(40) not null, password VARCHAR(20) not null)');
query.on('end', () => { client.end(); });