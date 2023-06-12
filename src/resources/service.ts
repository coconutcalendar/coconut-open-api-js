import { AxiosInstance } from 'axios';

import { combine } from '../helpers/filters';
import { Filterable, Pageable } from '../index';
import Conditional, { ConditionalResource } from './conditional';

type LocatableServiceDetail = 'region';

export interface LocatableServiceParameters {
  [key: string]: any;
  region?: string;
}

export interface ServiceFilter {
  [key: string]: any;
  assigned?: boolean;
  category?: number | string;
  group?: number;
  invitable?: number;
  invite_only_resources?: boolean;
  location?: number | string;
  location_category?: number | string;
  method?: number;
  preferred?: number;
  resource?: string;
  user?: number | string;
  user_category?: number | string;
}

export interface ServiceParameters {
  assignments?: number;
  category?: number | string;
  client_view_meeting_method?: number;
  group?: number;
  invite_only?: number;
  invite_only_resources?: number;
  location?: number | string;
  location_category?: number | string;
  preferred?: number;
  province?: string;
  resource?: string;
  user?: number | string;
  user_category?: number | string;
}

export interface ServiceResource extends Pageable, ConditionalResource {
  assigned(assigned: boolean): this;

  at(location: number | string): this;

  by(user: number | string): this;

  group(): this;

  in(category: number | string): this;

  individual(): this;

  invitable(): this;

  located(details: LocatableServiceParameters): this;

  preferred(): this;

  supporting(method: number): this;

  through(resource: string): this;

  withInviteOnly(inviteOnlyResources?: boolean): this;

  withinLocationCategory(locationCategory: number | string): this;

  withinUserCategory(userCategory: number | string): this;
}

export default class Service extends Conditional implements ServiceResource {
  protected client: AxiosInstance;
  protected filters: ServiceFilter;
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

  public by(user: number | string): this {
    this.filters.user = user;

    return this;
  }

  public async get(): Promise<any> {
    const parameters = this.params();
    let params: Filterable<ServiceParameters> = {};

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

    return await this.client.get('services', { params });
  }

  public group(): this {
    this.filters.group = 1;

    return this;
  }

  public in(category: number | string): this {
    this.filters.category = category;

    return this;
  }

  public individual(): this {
    this.filters.group = 0;

    return this;
  }

  public invitable(): this {
    this.filters.invitable = 1;

    return this;
  }

  public located(details: LocatableServiceParameters): this {
    const keys = Object.keys(details) as LocatableServiceDetail[];

    keys.map(key => {
      this.filters[key] = details[key];
    });

    return this;
  }

  public preferred(): this {
    this.filters.preferred = 1;

    return this;
  }

  public on(page: number): this {
    this.page = page;

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

  public take(limit: number): this {
    this.limit = limit;

    return this;
  }

  public through(resource: string): this {
    this.filters.resource = resource;

    return this;
  }

  public withInviteOnly(inviteOnlyResources: boolean = true): this {
    this.filters.invite_only_resources = inviteOnlyResources;

    return this;
  }

  public withinLocationCategory(locationCategory: number | string): this {
    this.filters.location_category = locationCategory;

    return this;
  }

  public withinUserCategory(userCategory: number | string): this {
    this.filters.user_category = userCategory;

    return this;
  }

  protected params(): ServiceParameters {
    const params: ServiceParameters = {};

    if (typeof this.filters.assigned !== 'undefined') {
      params.assignments = Number(this.filters.assigned);
    }

    if (typeof this.filters.category !== 'undefined') {
      params.category = this.filters.category;
    }

    if (typeof this.filters.group !== 'undefined') {
      params.group = this.filters.group;
    }

    if (typeof this.filters.invitable !== 'undefined') {
      params.invite_only = this.filters.invitable;
    }

    if (this.filters.invite_only_resources) {
      params.invite_only_resources = Number(this.filters.invite_only_resources);
    }

    if (typeof this.filters.location !== 'undefined') {
      params.location = this.filters.location;
    }

    if (typeof this.filters.method !== 'undefined') {
      params.client_view_meeting_method = this.filters.method;
    }

    if (typeof this.filters.preferred !== 'undefined') {
      params.preferred = this.filters.preferred;
    }

    if (typeof this.filters.region !== 'undefined') {
      params.province = this.filters.region;
    }

    if (typeof this.filters.resource !== 'undefined') {
      params.resource = this.filters.resource;
    }

    if (typeof this.filters.user !== 'undefined') {
      params.user = this.filters.user;
    }

    if (typeof this.filters.location_category !== 'undefined') {
      params.location_category = this.filters.location_category;
    }

    if (typeof this.filters.user_category !== 'undefined') {
      params.user_category = this.filters.user_category;
    }

    return params;
  }
}
