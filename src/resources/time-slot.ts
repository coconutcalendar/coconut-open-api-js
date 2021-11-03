import { AxiosInstance } from 'axios';

import { Resource } from '../index';
import Conditional, { ConditionalResource } from './conditional';

export interface TimeSlotFilter {
  end?: string;
  exclusion?: number;
  invite_only_resources?: boolean,
  location?: number;
  method?: number;
  services?: number | number[];
  start?: string;
  timezone?: string;
  locales?: string[];
  user?: number;
  user_category?: number;
  users?: number | number[];
  visibility?: number;
}

export interface TimeSlotParameters {
  additional_staff_id?: number | number[];
  end?: string;
  exclusion?: number;
  invite_only_resources?: number,
  location_id?: number;
  meeting_method?: number;
  service_id?: number | number[];
  staff_category_id?: number;
  staff_id?: number;
  start?: string;
  supported_locales?: string[];
  timezone?: string;
  visibility?: number;
}

export interface TimeSlotResource extends Resource, ConditionalResource {
  at(location: number): this;

  attendedBy(users: number | number[]): this;

  between(start: string, end: string): this;

  by(user: number): this;

  excluding(exclusion: number): this;

  for(services: number | number[]): this;

  in(timezone: string): this;

  method(method: number): this;

  supporting(locales: string[]): this;

  visibility(visibility: number): this;

  withInviteOnly(inviteOnlyResources?: boolean): this;

  withinUserCategory(userCategory: number | string): this;
}

export default class TimeSlot extends Conditional implements TimeSlotResource {
  protected client: AxiosInstance;
  protected filters: TimeSlotFilter;

  constructor(client: AxiosInstance) {
    super();

    this.client = client;
    this.filters = {};
  }

  public at(location: number): this {
    this.filters.location = location;

    return this;
  }

  public attendedBy(users: number | number[]): this {
    this.filters.users = users;

    return this;
  }

  public between(start: string, end: string): this {
    this.filters.start = start;
    this.filters.end = end;

    return this;
  }

  public by(user: number): this {
    this.filters.user = user;

    return this;
  }

  public excluding(exclusion: number): this {
    this.filters.exclusion = exclusion;

    return this;
  }

  public for(services: number | number[]): this {
    this.filters.services = services;

    return this;
  }

  public async get(): Promise<any> {
    const params: TimeSlotParameters = {
      end: this.filters.end,
      location_id: this.filters.location,
      service_id: this.filters.services,
      start: this.filters.start,
    };

    if (this.filters.exclusion) {
      params.exclusion = this.filters.exclusion;
    }

    if (this.filters.invite_only_resources) {
      params.invite_only_resources = Number(this.filters.invite_only_resources);
    }

    if (this.filters.locales) {
      params.supported_locales = this.filters.locales;
    }

    if (this.filters.method) {
      params.meeting_method = this.filters.method;
    }

    if (this.filters.timezone) {
      params.timezone = this.filters.timezone;
    }

    if (this.filters.user) {
      params.staff_id = this.filters.user;
    }

    if (this.filters.user_category) {
      params.staff_category_id = this.filters.user_category;
    }

    if (this.filters.users) {
      params.additional_staff_id = this.filters.users;
    }

    if (this.filters.visibility) {
      params.visibility = this.filters.visibility;
    }

    return await this.client.get('times', { params });
  }

  public in(timezone: string): this {
    this.filters.timezone = timezone;

    return this;
  }

  public method(method: number): this {
    this.filters.method = method;

    return this;
  }

  public supporting(locales: string[]): this {
    this.filters.locales = locales;

    return this;
  }

  public visibility(visibility: number): this {
    this.filters.visibility = visibility;

    return this;
  }

  public withInviteOnly(inviteOnlyResources: boolean = true): this {
    this.filters.invite_only_resources = inviteOnlyResources;

    return this;
  }

  public withinUserCategory(userCategory: number): this {
    this.filters.user_category = userCategory;

    return this;
  }
}
