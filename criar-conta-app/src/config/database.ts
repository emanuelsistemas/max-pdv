import { Pool } from 'pg';

export const pool = new Pool({
  host: 'dev.maxpdv.appbr.io',
  port: 5432,
  database: 'maxpdv',
  user: 'postgres',
  password: 'Vs949207@#$'
});
