import { ClientConfig } from 'pg';

export default interface DatabaseConfigFactory {

  create(): Promise<ClientConfig>;
}
