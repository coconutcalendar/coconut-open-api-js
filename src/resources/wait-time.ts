import { AxiosInstance } from 'axios';

import { Filterable } from '../index';
import Conditional from './conditional';

export interface WaitTimeParameters {
}

export interface WaitTimeResource {
    on(page: number): this;
    take(limit: number): this;
}

export default class WaitTime extends Conditional implements WaitTimeResource {
  protected client: AxiosInstance;
  protected location_id: string | number | null;
  protected page: number | null;
  protected limit: number | null;

  constructor(client: AxiosInstance) {
    super();

    this.client = client;
    this.location_id = null;
    this.page = null;
    this.limit = null;
  }

  public async get(): Promise<any> {
    let params: Filterable<WaitTimeParameters> = {};
    let location_id: string | number = '';

    if (this.location_id != null) {
        location_id = this.location_id;
    }

    if (this.limit) {
      params.limit = this.limit;
    }

    if (this.page) {
      params.page = this.page;
    }

    return await this.client.get(`wait-time-average/${location_id}`.replace(/\/$/, ''), { params });
  }

  public at(location_id: string | number): this {
    this.location_id = location_id;

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
