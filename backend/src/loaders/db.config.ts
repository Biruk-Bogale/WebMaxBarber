/* eslint-disable @typescript-eslint/no-explicit-any */

//  Generalized Database Functions with Connection Pool, Error Handling, and Transaction Management
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import config from '../config/config.js';
import logger from '../config/logger.js';

//  * Database connection configuration
const dbConfig = {
  user: config.database.db_user,
  host: config.database.db_host,
  database: config.database.db_name,
  password: config.database.db_pass,
  port: config.database.db_port,
  ssl: { rejectUnauthorized: false },

  max: 50, // Adjust based on traffic and DB server capacity
  idleTimeoutMillis: 30000, // close idle clients after 30s
  connectionTimeoutMillis: 10000, // timeout for new connections
};

//  * a PostgreSQL connection pool
//  * Pool manages multiple DB connections efficiently
const pool = new Pool(dbConfig);

//  * Check database connection
//  * Used on app startup to ensure DB is reachable

async function checkConnection(): Promise<void> {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect(); // get connection from pool

    logger.info('PostgreSQL connected successfully');
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Error connecting to the database:', err.message);
    } else {
      logger.error('Unknown error connecting to the database:', err);
    }
    throw err; // Rethrow error for application-level handling
  } finally {
    if (client) client.release(); // Always release client back to pool
  }
}

//  * General query function , Used for all raw SQL queries
async function query<T extends QueryResultRow = any>(
  sql: string,
  params: any[] = [],
): Promise<T[]> {
  try {
    const result: QueryResult<T> = await pool.query(sql, params);
    return result.rows;
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Error executing query:', err.message, { sql, params });
    } else {
      logger.error('Unknown error executing query:', err);
    }
    throw err;
  }
}

// Begin a transaction by acquiring a connection from the pool
async function beginTransaction(): Promise<PoolClient> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    return client;
  } catch (err) {
    client.release();

    if (err instanceof Error) {
      logger.error('Error beginning transaction:', err.message);
    } else {
      logger.error('Unknown error beginning transaction:', err);
    }

    throw err;
  }
}

// Commit a transaction
async function commitTransaction(client: PoolClient): Promise<void> {
  try {
    await client.query('COMMIT'); // Commit the transaction
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Error committing transaction:', err.message);
    } else {
      logger.error('Unknown error committing transaction:', err);
    }
    throw err; // Re-throw error for further handling
  } finally {
    client.release(); // Release the connection after commit
  }
}

// Rollback a transaction
async function rollbackTransaction(client: PoolClient): Promise<void> {
  try {
    await client.query('ROLLBACK'); // Rollback the transaction
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Error rolling back transaction:', err.message);
    } else {
      logger.error('Unknown error rolling back transaction:', err);
    }
    throw err; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client after rollback
  }
}

// Gracefully shutdown the connection pool on termination signal (e.g., SIGINT)
// Ensure `SIGINT` listener is added only once
const gracefulShutdown = async () => {
  logger.info('Closing PostgreSQL connection pool...');
  try {
    await pool.end();
    logger.info('PostgreSQL connection pool closed.');
  } catch (err) {
    if (err instanceof Error) {
      logger.error('Error closing connection pool:', err.message);
    } else {
      logger.error('Unknown error closing connection pool:', err);
    }
  } finally {
    process.exit(0);
  }
};

if (!process.listenerCount('SIGINT')) {
  process.on('SIGINT', gracefulShutdown);
  process.on('SIGTERM', gracefulShutdown);
}

export default {
  query,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
  checkConnection,
};
