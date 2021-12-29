import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// createConnection();

export default async (host = 'db_postgres'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
