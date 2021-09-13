import { AxiosInstance } from 'axios';

import Conditional from './conditional';

export interface WaitTimeParameters {
  location?: string | number;
  limit?: number;
  page?: number;
}

export interface WaitTimeResource {
    on(page: number): this;
    take(limit: number): this;
    at(location: string | number): this;
}

export default class WaitTime extends Conditional implements WaitTimeResource {
  protected client: AxiosInstance;
  protected location: string | number | null;
  protected page: number | null;
  protected limit: number | null;

  constructor(client: AxiosInstance) {
    super();

    this.client = client;
    this.location = null;
    this.page = null;
    this.limit = null;
  }

  public async get(): Promise<any> {
    let params: WaitTimeParameters = {};
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

    return await this.client.get(`wait-time-average/${location}`, { params });
  }

  public at(location: string | number): this {
    this.location = location;

    return this;
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
