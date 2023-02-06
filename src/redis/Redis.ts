import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL;

class Redis<T> {
  private client = createClient({
    url: REDIS_URL
  });

  key: string;
  isConnected = false;

  constructor(key: string) {
    this.key = key;
  }

  async disconnect() {
    await this.client.disconnect();
  }

  async getValues(): Promise<T[]> {
    await this.checkConnection();

    const res = (await this.client.get(this.key)) as string;
    const arr = (await JSON.parse(res)) as T[];

    return arr;
  }

  async addValue(data: T): Promise<boolean> {
    const res = await this.checkConnection();

    const currentState = await this.getValues();
    return (await this.setValues([...currentState, data])) && res;
  }

  async setValues(data: T[]): Promise<boolean> {
    const res = await this.checkConnection();

    return !!(await this.client.set(this.key, JSON.stringify(data))) && res;
  }

  // private
  private async checkConnection(): Promise<boolean> {
    if (!this.isConnected) {
      return (await this.connect());
    }

    return true;
  }

  private async connect(): Promise<boolean> {
    try {
      await this.client.connect().then(async () => {
        this.isConnected = true;
        await this.initValues();
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  private async initValues() {
    const res = await this.getValues();
    
    if (res === undefined || res === null) {
      await this.setValues([]);
    }
  }
}

export default Redis;
