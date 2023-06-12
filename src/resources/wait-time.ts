import { AxiosInstance } from 'axios';

import Conditional from './conditional';

export interface WaitTimeParameters {
  location?: string | number;
  limit?: number;
  page?: number;
}

export interface WaitTimeResource {
  at(location: string | number): this;
  on(page: number): this;
  take(limit: number): this;
}

export default class WaitTime extends Conditional implements WaitTimeResource {
  protected client: AxiosInstance;
  protected limit: number | null;
  protected location: string | number | null;
  protected page: number | null;

  constructor(client: AxiosInstance) {
    super();

    this.client = client;
    this.limit = null;
    this.location = null;
    this.page = null;
  }

  public at(location: string | number): this {
    this.location = location;

    return this;
  }

  public async get(): Promise<any> {
    const params: WaitTimeParameters = {};
    let location: string | number = '';

    if (this.location != null) {
      location = this.location;
    }

    if (this.limit) {
      params.limit = this.limit;
    }

    if (this.page) {
      params.page = this.page;
    }

    return await this.client.get(location ? `wait-time-average/${location}` : 'wait-time-average', { params });
  }

  public on(page: number): this {
    this.page = page;

    return this;
  }

  public take(limit: number): this {
    this.limit = limit;

    return this;
  }
}
