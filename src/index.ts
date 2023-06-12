import { AxiosInstance } from 'axios';

import { default as AxiosClient } from './client';
import Days from './constants/days';
import MeetingMethods from "./constants/meeting-methods";
import Notifications from './constants/notifications';
import Origins from './constants/origins';
import Visibilities from "./constants/visibilities";
import Answer from './models/answer';
import Attendee from './models/attendee';
import Client from './models/client';
import Preference from './models/preference';
import Response from './models/response';
import Appointment, { AppointmentResource } from './resources/appointment';
import QueueAppointment, { QueueAppointmentResource } from './resources/queue-appointment';
import Form, { FormResource } from './resources/form';
import Location, { LocationResource } from './resources/location';
import Question, { QuestionResource } from './resources/question';
import Service, { ServiceResource } from './resources/service';
import Setting from './resources/setting';
import TimeSlot, { TimeSlotResource } from './resources/time-slot';
import Timezone, { TimezoneResource } from './resources/timezone';
import User, { UserResource } from './resources/user';
import WaitList, { WaitListResource } from './resources/wait-list';
import WaitTime, { WaitTimeResource } from './resources/wait-time';

export interface Filterable<T> {
  filter?: T;
  limit?: number;
  page?: number;
  sort?: string;
}

export interface IncludableParameters {
  include?: string;
}

export interface ModelInterface {
  getAttributes(): object;
}

export interface Pageable extends Sortable {
  on(page: number): this;

  take(limit: number): this;
}

export interface Resource {
  get(): Promise<any>;
}

export interface Sortable extends Resource {
  sortBy(sortable: string): this;
}

export { Answer, Attendee, Client, Days, MeetingMethods, Notifications, Origins, Preference, Response, Visibilities };

export class OpenApi {
  protected appointment: AppointmentResource;
  protected queueAppointment: QueueAppointmentResource;
  protected form: FormResource;
  protected client: AxiosInstance;
  protected domain?: string;
  protected list: WaitListResource;
  protected location: LocationResource;
  protected question: QuestionResource;
  protected service: ServiceResource;
  protected setting: Resource;
  protected slot: TimeSlotResource;
  protected timezone: TimezoneResource;
  protected user: UserResource;
  protected waitTime: WaitTimeResource;

  constructor(domain?: string) {
    this.client = AxiosClient(domain);
    this.domain = domain;
    this.appointment = new Appointment(this.client);
    this.queueAppointment = new QueueAppointment(this.client);
    this.form = new Form(this.client);
    this.list = new WaitList(this.client);
    this.location = new Location(this.client);
    this.question = new Question(this.client);
    this.service = new Service(this.client);
    this.setting = new Setting(this.client);
    this.slot = new TimeSlot(this.client);
    this.timezone = new Timezone(this.client);
    this.user = new User(this.client);
    this.waitTime = new WaitTime(this.client);
  }

  public appointments(): AppointmentResource {
    return this.appointment;
  }

  public queueAppointments(): QueueAppointmentResource {
    return this.queueAppointment;
  }

  public forms(): FormResource {
    return this.form;
  }

  public locale(locale: string): this {
    this.client.defaults.params = { lang: locale };
    this.client.defaults.headers.common['Accept-Language'] = locale;

    return this;
  }

  public lists(): WaitListResource {
    return this.list;
  }

  public locations(): LocationResource {
    return this.location;
  }

  public questions(): QuestionResource {
    return this.question;
  }

  public services(): ServiceResource {
    return this.service;
  }

  public settings(): Resource {
    return this.setting;
  }

  public slots(): TimeSlotResource {
    return this.slot;
  }

  public timezones(): TimezoneResource {
    return this.timezone;
  }

  public users(): UserResource {
    return this.user;
  }

  public waitTimes(): WaitTimeResource {
    return this.waitTime;
  }
}
