import { AxiosInstance } from 'axios';

import { combine } from '../helpers/filters';
import { Filterable, Pageable } from '../index';
import Conditional, { ConditionalResource } from './conditional';

type LocatableUserDetail = 'region';

export interface LocatableUserParameters {
  [key: string]: any;
  region?: string;
}

export interface UserFilter {
  [key: string]: any;
  assigned?: boolean;
  services?: number | number[] | string | string[];
  location?: number | string;
  resource?: string;
  user?: number | string;
  method?: number;
}

export interface UserParameters {
  assignments?: boolean;
  client_view_meeting_method?: number;
  service?: number | number[] | string | string[];
  location?: number | string;
  province?: string;
  resource?: string;
  user?: number | string;
  meeting_method?: number;
}

export interface UserResource extends Pageable, ConditionalResource {
  assigned(assigned: boolean): this;

  at(location: number | string): this;

  find(user: number | string): this;

  located(details: LocatableUserParameters): this;

  performing(services: number | number[] | string | string[]): this;

  supporting(method: number): this;

  through(resource: string): this;
}

export default class User extends Conditional implements UserResource {
  protected client: AxiosInstance;
  protected filters: UserFilter;
  protected page: number | null;
  protected sortable: string | null;
  protected limit: number | null;

  constructor(client: AxiosInstance) {
    super();

    this.client = client;
    this.filters = {};
    this.page = null;
    this.sortable = null;
    this.limit = null;
  }

  public assigned(assigned: boolean = true): this {
    this.filters.assigned = assigned;

    return this;
  }

  public at(location: number | string): this {
    this.filters.location = location;

    return this;
  }

  public find(user: number | string): this {
    this.filters.user = user;

    return this;
  }

  public located(details: LocatableUserParameters): this {
    const keys = Object.keys(details) as LocatableUserDetail[];

    keys.map(key => {
      this.filters[key] = details[key];
    });

    return this;
  }

  public async get(): Promise<any> {
    const parameters = this.params();
    let params: Filterable<UserParameters> = {};

    if (Object.keys(parameters).length) {
      params = combine(params, parameters);
    }

    if (this.limit) {
      params.limit = this.limit;
    }

    if (this.page) {
      params.page = this.page;
    }

    if (this.sortable) {
      params.sort = this.sortable;
    }

    return await this.client.get('users', { params });
  }

  public on(page: number): this {
    this.page = page;

    return this;
  }

  public performing(services: number | number[] | string | string[]): this {
    this.filters.services = services;

    return this;
  }

  public sortBy(sortable: string): this {
    this.sortable = sortable;

    return this;
  }

  public supporting(method: number): this {
    this.filters.method = method;

    return this;
  }

  public through(resource: string): this {
    this.filters.resource = resource;

    return this;
  }

  public take(limit: number): this {
    this.limit = limit;

    return this;
  }

  protected params(): UserParameters {
    const params: UserParameters = {};

    if (typeof this.filters.assigned !== 'undefined') {
      params.assignments = this.filters.assigned;
    }

    if (typeof this.filters.services !== 'undefined') {
      params.service = this.filters.services;
    }

    if (typeof this.filters.location !== 'undefined') {
      params.location = this.filters.location;
    }

    if (typeof this.filters.region !== 'undefined') {
      params.province = this.filters.region;
    }

    if (typeof this.filters.method !== 'undefined') {
      params.client_view_meeting_method = this.filters.method;
      params.meeting_method = this.filters.method;
    }

    if (typeof this.filters.resource !== 'undefined') {
      params.resource = this.filters.resource;
    }

    if (typeof this.filters.user !== 'undefined') {
      params.user = this.filters.user;
    }

    return params;
  }
}
