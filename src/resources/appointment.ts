import { AxiosInstance } from 'axios';

import { Resource } from '../index';
import { AttendeeModel } from '../models/attendee';
import Conditional, { ConditionalResource } from './conditional';

export interface AppointmentFilter {
  invitation?: number;
  locale?: string | null;
  location?: number;
  matchers?: AppointmentMatcherParameters;
  method?: number;
  notifications?: AppointmentNotificationParameters;
  services?: number | number[];
  start?: string;
  timezone?: string;
  user?: number;
  users?: number | number[];
}

export interface UtmParameters {
  campaign?: string;
  content?: string;
  medium?: string;
  source?: string;
  term?: string;
}

export interface AppointmentMatcherParameters {
  code: string;
  id: string | number;
}

export interface AppointmentNotificationParameters {
  client?: boolean;
  user?: boolean;
}

export interface AppointmentParameters {
  data: {
    attributes?: {
      invitation_id: number | null;
      location_id: number | undefined;
      meeting_method?: number;
      service_id: number | number[] | undefined;
      staff_id: number | null;
      start: string | undefined;
      supported_locale: string | null;
      timezone?: string;
      additional_staff_id?: number | number[],
    };
    relationships: {
      attendees: {
        data: object[];
      };
    };
    type: string;
  };
  meta?: {
    booker?: number;
    notify?: {
      client?: boolean;
      user?: boolean;
    };
    utm?: {
      campaign?: string;
      content?: string;
      source?: string;
      medium?: string;
      term?: string;
    };
  };
}

export interface RescheduleParameters {
  data: {
    attributes: {
      start: string | undefined;
      timezone?: string;
    };
    id: number;
    type: string;
  };
  meta?: {
    notify?: {
      client?: boolean;
      user?: boolean;
    };
  };
}

interface AddSingleAttendeeParameter {
  attributes: {
    email: string;
    first_name: string;
    last_name: string;
  };
  type: string;
}

export interface AddAttendeeParameters {
  data: AddSingleAttendeeParameter[];
  meta?: {
    booker?: number;
    notify?: {
      client?: boolean;
      user?: boolean;
    };
  }
}

export interface AppointmentResource extends Resource, ConditionalResource {
  actingAs(identifier: number): this;

  add(appointment: number): Promise<any>;

  at(location: number): this;

  attendedBy(users: number | number[]): this;

  book(): Promise<any>;

  by(user: number): this;

  cancel(appointment: number, attendee: number, code: string): Promise<any>;

  for(services: number | number[]): this;

  in(timezone: string): this;

  matching(matchers: AppointmentMatcherParameters): this;

  method(method: number): this;

  notify(notifications: AppointmentNotificationParameters): this;

  reschedule(appointment: number): Promise<any>;

  starting(start: string): this;

  supporting(locale: string | null): this;

  via(invitation: number): this;

  with(attendees: AttendeeModel | AttendeeModel[]): this;
}

export interface Utm {
  campaign(campaign: string): this;

  content(content: string): this;

  medium(medium: string): this;

  source(source: string): this;

  term(term: string): this;
}

export interface AppointmentRelationship {
  attendees: AttendeeModel[] | [];
}

export interface AppointmentMeta {
  booker?: number;
}

export default class Appointment extends Conditional implements AppointmentResource, Utm {
  protected client: AxiosInstance;
  protected filters: AppointmentFilter;
  protected meta: AppointmentMeta;
  protected relationships: AppointmentRelationship;
  protected utm: UtmParameters;

  constructor(client: AxiosInstance) {
    super();

    this.client = client;
    this.filters = {};
    this.meta = {};
    this.relationships = {
      attendees: [],
    };
    this.utm = {};
  }

  public actingAs(identifier: number): this {
    this.meta.booker = identifier;

    return this;
  }

  public async add(appointment: number): Promise<any> {
    return await this.client.put(`appointments/${appointment}/attendees`, this.addParams(), {
      headers: {
        'Content-Type': 'application/json; ext=bulk',
      },
    });
  }

  public at(location: number): this {
    this.filters.location = location;

    return this;
  }

  public attendedBy(users: number | number[]): this {
    this.filters.users = users;

    return this;
  }

  public async book(): Promise<any> {
    return await this.client.post('appointments', this.params());
  }

  public by(user: number): this {
    this.filters.user = user;

    return this;
  }

  public campaign(campaign: string): this {
    this.utm.campaign = campaign;

    return this;
  }

  public async cancel(appointment: number, attendee: number, code: string): Promise<any> {
    return await this.client.delete(`appointments/${appointment}/${attendee}`, {
      data: this.params(),
      params: { code },
    });
  }

  public content(content: string): this {
    this.utm.content = content;

    return this;
  }

  public for(services: number | number[]): this {
    this.filters.services = services;

    return this;
  }

  public async get(): Promise<any> {
    return await this.client.get('appointments', {
      params: this.filters.matchers,
    });
  }

  public in(timezone: string): this {
    this.filters.timezone = timezone;

    return this;
  }

  public matching(matchers: AppointmentMatcherParameters): this {
    this.filters.matchers = matchers;

    return this;
  }

  public medium(medium: string): this {
    this.utm.medium = medium;

    return this;
  }

  public method(method: number): this {
    this.filters.method = method;

    return this;
  }

  public notify(notifications: AppointmentNotificationParameters): this {
    this.filters.notifications = notifications;

    return this;
  }

  public async reschedule(appointment: number): Promise<any> {
    return await this.client.patch(`appointments/${appointment}`, this.rescheduleParams(appointment));
  }

  public starting(start: string): this {
    this.filters.start = start;

    return this;
  }

  public source(source: string): this {
    this.utm.source = source;

    return this;
  }

  public supporting(locale: string | null): this {
    this.filters.locale = locale;

    return this;
  }

  public term(term: string): this {
    this.utm.term = term;

    return this;
  }

  public via(invitation: number): this {
    this.filters.invitation = invitation;

    return this;
  }

  public with(attendees: AttendeeModel | AttendeeModel[]): this {
    this.relationships.attendees = Array.isArray(attendees) ? attendees : [attendees];

    return this;
  }

  protected addParams(): AddAttendeeParameters {
    const params: AddAttendeeParameters = {
      data: this.transformAttendees(),
    };

    if (this.meta.booker) {
      params.meta = {
        booker: this.meta.booker,
      };
    }

    if (this.filters.notifications) {
      params.meta = {
        ...params.meta,
        notify: this.filters.notifications,
      };
    }

    return params;
  }

  protected hasUtm(): boolean {
    return !!(this.utm.campaign)
        || !!(this.utm.content)
        || !!(this.utm.medium)
        || !!(this.utm.source)
        || !!(this.utm.term);
  }

  protected params(): AppointmentParameters | object {
    if (this.relationships.attendees.length === 0) {
      return {};
    }

    let params: AppointmentParameters = {
      data: {
        relationships: {
          attendees: {
            data: this.transformAttendees(),
          },
        },
        type: 'appointments',
      },
    };

    if (this.filters.location || this.filters.services || this.filters.start) {
      params.data.attributes = {
        invitation_id: null,
        location_id: this.filters.location,
        service_id: this.filters.services,
        staff_id: null,
        start: this.filters.start,
        supported_locale: this.filters.locale || null,
      };

      if (this.filters.user) {
        params.data.attributes.staff_id = this.filters.user;
      }

      if (this.filters.users) {
        params.data.attributes.additional_staff_id = this.filters.users;
      }

      if (this.filters.invitation) {
        params.data.attributes.invitation_id = this.filters.invitation;
      }

      if (this.filters.method) {
        params.data.attributes.meeting_method = this.filters.method;
      }

      if (this.filters.timezone) {
        params.data.attributes.timezone = this.filters.timezone;
      }
    }

    if (this.filters.notifications) {
      params = {
        ...params,
        meta: {
          notify: this.filters.notifications,
        },
      };
    }

    if (this.hasUtm()) {
      params = {
        ...params,
        meta: {
          ...params.meta,
          utm: {
            ...this.utm.campaign && {campaign: this.utm.campaign},
            ...this.utm.content && {content: this.utm.content},
            ...this.utm.medium && {medium: this.utm.medium},
            ...this.utm.source && {source: this.utm.source},
            ...this.utm.term && {term: this.utm.term},
          },
        },
      };
    }

    if (this.meta.booker) {
      params = {
        ...params,
        meta: {
          ...params.meta,
          booker: this.meta.booker,
        }
      }
    }

    return params;
  }

  protected rescheduleParams(appointment: number): RescheduleParameters | object {
    let params: RescheduleParameters = {
      data: {
        attributes: {
          start: this.filters.start,
        },
        id: appointment,
        type: 'appointments',
      },
    };

    if (this.filters.timezone) {
      params.data.attributes.timezone = this.filters.timezone;
    }

    if (this.filters.notifications) {
      params = {
        ...params,
        meta: {
          notify: this.filters.notifications,
        },
      };
    }

    return params;
  }

  protected transformAttendees(): AddSingleAttendeeParameter[] {
    return (this.relationships.attendees as AttendeeModel[]).map(
        (attendee: AttendeeModel): AddSingleAttendeeParameter => {
          return (attendee.transform() as AddSingleAttendeeParameter);
        }
    );
  }
}
