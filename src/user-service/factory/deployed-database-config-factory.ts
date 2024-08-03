import { ClientConfig } from 'pg';
import EnvironmentAccessor from '../accessor/environment-accessor';
import DbSecret from '../dto/db-secret';
import DatabaseConfigFactory from './database-config-factory';

export default class DeployedDatabaseConfigFactory implements DatabaseConfigFactory {

  private readonly environmentAccessor: EnvironmentAccessor;

  constructor(environmentAccessor: EnvironmentAccessor) {
    this.environmentAccessor = environmentAccessor;
  }

  public async create() {
    const host = this.environmentAccessor.get('DB_HOST');
    const port = this.environmentAccessor.get('DB_PORT');
    const database = this.environmentAccessor.get('DB_DATABASE');

    const dbSecretString = this.environmentAccessor.get('DB_SECRET');

    const dbSecret: DbSecret = JSON.parse(dbSecretString);

    const dbConfig: ClientConfig = {
      host: host,
      user: dbSecret.username,
      password: dbSecret.password,
      port: Number.parseInt(port),
      database: database,
      ssl: true,
    };

    return dbConfig;
  }
}
