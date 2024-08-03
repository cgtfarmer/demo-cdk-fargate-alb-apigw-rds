import { ClientConfig } from 'pg';
import EnvironmentAccessor from '../accessor/environment-accessor';

export default class LocalDatabaseConfigFactory {

  private readonly environmentAccessor: EnvironmentAccessor;

  constructor(environmentAccessor: EnvironmentAccessor) {
    this.environmentAccessor = environmentAccessor;
  }

  public async create() {
    const host = this.environmentAccessor.get('DB_HOST');
    const username = this.environmentAccessor.get('DB_USERNAME');
    const password = this.environmentAccessor.get('DB_PASSWORD');
    const port = this.environmentAccessor.get('DB_PORT');
    const database = this.environmentAccessor.get('DB_DATABASE');

    const dbConfig: ClientConfig = {
      host: host,
      user: username,
      password: password,
      port: Number.parseInt(port),
      database: database,
      ssl: false,
    };

    return dbConfig;
  }
}
