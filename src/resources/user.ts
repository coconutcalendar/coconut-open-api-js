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
  category?: number | string;
  invite_only_resources?: boolean;
  location?: number | string;
  location_category?: number | string;
  lobby_location_id?: number | string;
  without_remote_staff_only?: boolean;
  method?: number;
  resource?: string;
  services?: number | number[] | string | string[];
  user?: number | string;
}

export interface UserParameters {
  assignments?: boolean;
  category?: number | string;
  client_view_meeting_method?: number;
  invite_only_resources?: number;
  location?: number | string;
  location_category?: number | string;
  lobby_location_id?: number | string;
  without_remote_staff_only_at_location?: number | string;
  meeting_method?: number;
  province?: string;
  resource?: string;
  service?: number | number[] | string | string[];
  user?: number | string;
}

export interface UserResource extends Pageable, ConditionalResource {
  assigned(assigned: boolean): this;

  at(location: number | string): this;

  find(user: number | string): this;

  located(details: LocatableUserParameters): this;

  performing(services: number | number[] | string | string[]): this;

  supporting(method: number): this;

  through(resource: string): this;

  withInviteOnly(inviteOnlyResources?: boolean): this;

  withinLocationCategory(locationCategory?: number | string): this;

  withinUserCategory(category?: number | string): this;

  availableInLobby(lobbyLocationId: number | string): this;

  withoutRemoteStaffOnly(withoutRemoteStaffOnly?: boolean): this;
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

  public withInviteOnly(inviteOnlyResources: boolean = true): this {
    this.filters.invite_only_resources = inviteOnlyResources;

    return this;
  }

  public withinLocationCategory(locationCategory: number | string): this {
    this.filters.location_category = locationCategory;

    return this;
  }

  public withinUserCategory(category: number | string): this {
    this.filters.category = category;

    return this;
  }

  public withoutRemoteStaffOnly(withoutRemoteStaffOnly: boolean = true): this {
    this.filters.without_remote_staff_only = withoutRemoteStaffOnly;

    return this;
  }

  public availableInLobby(lobbyLocationId: number | string): this {
    this.filters.lobby_location_id = lobbyLocationId;
  
    return this;
  }

  protected params(): UserParameters {
    const params: UserParameters = {};

    if (typeof this.filters.assigned !== 'undefined') {
      params.assignments = this.filters.assigned;
    }

    if (typeof this.filters.category !== 'undefined') {
      params.category = this.filters.category;
    }

    if (this.filters.invite_only_resources) {
      params.invite_only_resources = Number(this.filters.invite_only_resources);
    }

    if (typeof this.filters.location !== 'undefined') {
      params.location = this.filters.location;
    }

    if (typeof this.filters.location_category !== 'undefined') {
      params.location_category = this.filters.location_category;
    }

    if (typeof this.filters.lobby_location_id !== 'undefined') {
      params.lobby_location_id = this.filters.lobby_location_id;
    }

    if (typeof this.filters.method !== 'undefined') {
      params.client_view_meeting_method = this.filters.method;
      params.meeting_method = this.filters.method;
    }

    if (typeof this.filters.region !== 'undefined') {
      params.province = this.filters.region;
    }

    if (typeof this.filters.resource !== 'undefined') {
      params.resource = this.filters.resource;
    }

    if (typeof this.filters.services !== 'undefined') {
      params.service = this.filters.services;
    }

    if (typeof this.filters.user !== 'undefined') {
      params.user = this.filters.user;
    }

    if (
      typeof this.filters.location !== 'undefined' && 
      this.filters.without_remote_staff_only === true
    ) {
      params.without_remote_staff_only_at_location = this.filters.location;
    }

    return params;
  }
}
