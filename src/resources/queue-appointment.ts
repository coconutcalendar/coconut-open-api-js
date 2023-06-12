import { AxiosInstance } from 'axios';

import { ClientModel } from '../models/client';
import Conditional, { ConditionalResource } from './conditional';

export interface QueueAppointmentFilter {
  location?: number;
  method?: number;
  service?: number;
  through?: number;
  user?: number;
}

export interface UtmParameters {
  campaign?: string;
  content?: string;
  medium?: string;
  source?: string;
  term?: string;
}

export interface QueueAppointmentParameters {
  data: {
    attributes: {
      booked_through?: number,
      service_id?: number,
      location_id?: number,
      meeting_method?: number,
      notes?: string,
      workflow_id?: number,
      campaign?: string,
      content?: string,
      source?: string,
      medium?: string,
      term?: string,
    },
    relationships: {
      client: {
        data: object,
      },
    },
  },
}

export interface QueueAppointmentResource extends ConditionalResource {
  at(location: number): this;

  by(user: number): this;

  for(services: number | number[]): this;

  method(method: number): this;

  through(origin: number): this;

  with(client: ClientModel): this;
}

export interface Utm {
  campaign(campaign: string): this;

  content(content: string): this;

  medium(medium: string): this;

  source(source: string): this;

  term(term: string): this;
}

export interface QueueAppointmentRelationship {
  client: {
    data: ClientModel | null
  }
}

export interface QueueAppointmentMeta {
  booker?: number;
}

export default class QueueAppointment extends Conditional implements QueueAppointmentResource, Utm {
  protected client: AxiosInstance;
  protected filters: QueueAppointmentFilter;
  protected meta: QueueAppointmentMeta;
  protected relationships: QueueAppointmentRelationship;
  protected utm: UtmParameters;

  constructor(client: AxiosInstance) {
    super();

    this.client = client;
    this.filters = {};
    this.meta = {};
    this.relationships = {
      client: {
        data: null,
      }
    };
    this.utm = {};
  }

  public at(location: number): this {
    this.filters.location = location;

    return this;
  }

  public by(user: number): this {
    this.filters.user = user;

    return this;
  }

  public for(service: number): this {
    this.filters.service = service;

    return this;
  }

  public method(method: number): this {
    this.filters.method = method;

    return this;
  }

  public through(origin: number): this {
    this.filters.through = origin;

    return this
  }

  public with(client: ClientModel): this {
    this.relationships.client.data = client;

    return this;
  }

  public campaign(campaign: string): this {
    this.utm.campaign = campaign;

    return this;
  }

  public content(content: string): this {
    this.utm.content = content;

    return this;
  }

  public medium(medium: string): this {
    this.utm.medium = medium;

    return this;
  }

  public source(source: string): this {
    this.utm.source = source;

    return this;
  }

  public term(term: string): this {
    this.utm.term = term;

    return this;
  }

  public async book(): Promise<any> {
    return await this.client.post('queue-appointments', this.params());
  }

  protected hasUtm(): boolean {
    return !!(this.utm.campaign)
        || !!(this.utm.content)
        || !!(this.utm.medium)
        || !!(this.utm.source)
        || !!(this.utm.term);
  }

  protected params(): QueueAppointmentParameters | object {
    if (this.relationships.client.data === null) {
      return {};
    }

    let params: QueueAppointmentParameters = {
      data: {
        attributes: {
          booked_through: this.filters.through,
          service_id: this.filters.service,
          location_id: this.filters.location,
          meeting_method: this.filters.method,
          notes: '',
        },
        relationships: {
          client: {
            data: this.relationships.client.data.transform(),
          },
        },
      },
    };

    if (this.filters.location && this.filters.service) {
      if (this.filters.method) {
        params.data.attributes.meeting_method = this.filters.method;
      }

      if (this.filters.through) {
        params.data.attributes.booked_through = this.filters.through;
      }
    }

    if (this.hasUtm()) {
      params = {
        ...params,
        ...this.utm.campaign && {campaign: this.utm.campaign},
        ...this.utm.content && {content: this.utm.content},
        ...this.utm.medium && {medium: this.utm.medium},
        ...this.utm.source && {source: this.utm.source},
        ...this.utm.term && {term: this.utm.term},
      };
    }

    return params;
  }
}