import { AxiosInstance } from 'axios';

import { IncludableParameters } from '../index';
import { AttendeeModel } from '../models/attendee';
import { PreferenceModel } from '../models/preference';
import Conditional, { ConditionalResource } from './conditional';

export interface WaitListAttributes {
  notes?: string;
}

export interface WaitListParameters {
  data: {
    attributes: {
      details?: string;
    };
    relationships: {
      client?: {
        data: object;
      };
      location?: {
        data: {
          id: string;
          type: string;
        };
      };
      preferences?: {
        data: object[];
      };
      service?: {
        data: {
          id: string;
          type: string;
        };
      };
      user?: {
        data: {
          id: string;
          type: string;
        };
      };
    };
    type: string;
  };
}

export interface WaitListRelationship {
  attendee?: AttendeeModel;
  location?: number | string;
  preferences?: PreferenceModel | PreferenceModel[];
  service?: number | string;
  user?: number | string;
}

export interface WaitListResource extends ConditionalResource {
  add(): Promise<any>;

  at(location: number | string): this;

  belonging(client: number | string): this;

  find(list: number | string): Promise<any>;

  for(attendee: AttendeeModel): this;

  include(includes: string): this;

  prefers(preferences: PreferenceModel | PreferenceModel[]): this;

  provided(notes: string): this;

  remove(list: number | string): Promise<any>;

  seeking(service: number | string): this;

  update(list: number | string): Promise<any>;

  with(user: number | string): this;
}

export interface WaitListUrlParameters {
  client?: number | string;
  include?: string;
}

export default class WaitList extends Conditional implements WaitListResource {
  protected attributes: WaitListAttributes;
  protected client: AxiosInstance;
  protected parameters: WaitListUrlParameters;
  protected relationships: WaitListRelationship;

  constructor(client: AxiosInstance) {
    super();

    this.attributes = {};
    this.client = client;
    this.parameters = {};
    this.relationships = {};
  }

  public async add(): Promise<any> {
    return await this.client.post('requests', this.params());
  }

  public at(location: number | string): this {
    this.relationships.location = location;

    return this;
  }

  public belonging(client: number | string): this {
    this.parameters.client = client;

    return this;
  }

  public async find(list: number | string): Promise<any> {
    const params: IncludableParameters = {};
    const { client, include } = this.parameters;

    if (include) {
      params.include = include;
    }

    return await this.client.get(`clients/${client}/requests/${list}`, { params });
  }

  public for(attendee: AttendeeModel): this {
    this.relationships.attendee = attendee;

    return this;
  }

  public include(includes: string): this {
    this.parameters.include = includes;

    return this;
  }

  public prefers(preferences: PreferenceModel | PreferenceModel[]): this {
    this.relationships.preferences = Array.isArray(preferences) ? preferences : [preferences];

    return this;
  }

  public provided(notes: string): this {
    this.attributes.notes = notes;

    return this;
  }

  public async remove(list: number | string): Promise<any> {
    const { client } = this.parameters;

    return await this.client.delete(`clients/${client}/requests/${list}`);
  }

  public seeking(service: number | string): this {
    this.relationships.service = service;

    return this;
  }

  public async update(list: number | string): Promise<any> {
    const { client } = this.parameters;

    return await this.client.patch(`clients/${client}/requests/${list}`, this.params());
  }

  public with(user: number | string): this {
    this.relationships.user = user;

    return this;
  }

  protected params(): WaitListParameters {
    const params: WaitListParameters = {
      data: {
        attributes: {},
        relationships: {},
        type: 'requests',
      },
    };

    if (this.relationships.attendee) {
      const attendee = (this.relationships.attendee as AttendeeModel).transform();

      params.data.relationships.client = {
        data: {
          ...attendee,
          type: 'clients',
        },
      };
    }
    if (this.relationships.location) {
      params.data.relationships.location = {
        data: {
          id: String(this.relationships.location),
          type: 'locations',
        },
      };
    }

    if (this.relationships.preferences) {
      const preferences = (this.relationships.preferences as PreferenceModel[]).map(
        (preference: PreferenceModel): object => {
          return preference.transform();
        },
      );

      params.data.relationships.preferences = {
        data: preferences,
      };
    }

    if (this.relationships.service) {
      params.data.relationships.service = {
        data: {
          id: String(this.relationships.service),
          type: 'services',
        },
      };
    }

    if (this.attributes.notes) {
      params.data.attributes.details = this.attributes.notes;
    }

    if (this.relationships.user) {
      params.data.relationships.user = {
        data: {
          id: String(this.relationships.user),
          type: 'users',
        },
      };
    }

    return params;
  }
}
