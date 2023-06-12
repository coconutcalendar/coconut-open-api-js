import { ModelInterface } from '../index';
import { AnswerModel } from './answer';
import Model from './model';
import { ResponseModel } from './response';

export interface AttendeeModel extends ModelInterface {
  alias(alias: string | number): this;

  answers(answers: AnswerModel | AnswerModel[]): this;

  as(identifier: number): this;

  located(details: LocatableDetailParameters): this;

  messagable(messageable: boolean): this;

  named(first: string, last: string): this;

  provided(notes: string): this;

  reachable(details: ReachableDetailParameters): this;

  speaks(language: string): this;

  transform(): object;
}

export interface AttendeeAttributes {
  attributes?: object;
  id?: number;
  type: string;
}

export interface AttendeeParameters {
  alias?: string | number;
  address?: string;
  answers?: AnswerModel[] | [];
  cell_phone?: string;
  city?: string;
  country?: string;
  email: string | null;
  first_name: string | null;
  identifier: number | null;
  last_name: string | null;
  language?: string;
  messagable?: boolean;
  notes?: string;
  phone?: string;
  postcode?: string;
  recaptcha_token?: string | null;
  region?: string;
  responses?: ResponseModel[] | [];
  timezone?: string;
  work_phone?: string;
}

export interface LocatableDetailParameters {
  address?: string;
  city?: string;
  country?: string;
  postcode?: string;
  region?: string;
  timezone?: string;
}

export interface ReachableDetailParameters {
  cell_phone?: string;
  email: string;
  phone?: string;
  work_phone?: string;
}

export default class Attendee extends Model implements AttendeeModel {
  protected attributes: AttendeeParameters;

  constructor() {
    super();

    this.attributes = {
      email: null,
      first_name: null,
      identifier: null,
      last_name: null,
    };
  }

  public alias(alias: string | number): this {
    this.attributes.alias = alias;

    return this;
  }

  public answers(answers: AnswerModel | AnswerModel[]): this {
    this.attributes.answers = Array.isArray(answers) ? answers : [answers];

    return this;
  }

  public as(identifier: number): this {
    this.attributes.identifier = identifier;

    return this;
  }

  public located(details: LocatableDetailParameters): this {
    this.attributes = { ...this.attributes, ...details };

    return this;
  }

  public messagable(messageable: boolean = true): this {
    this.attributes.messagable = messageable;

    return this;
  }

  public named(first: string, last: string): this {
    this.attributes.first_name = first;
    this.attributes.last_name = last;

    return this;
  }

  public provided(notes: string): this {
    this.attributes.notes = notes;

    return this;
  }

  public reachable(details: ReachableDetailParameters): this {
    this.attributes = { ...this.attributes, ...details };

    return this;
  }

  public responses(responses: ResponseModel | ResponseModel[]): this {
    this.attributes.responses = Array.isArray(responses) ? responses : [responses];

    return this;
  }

  public speaks(language: string): this {
    this.attributes.language = language;

    return this;
  }

  public transform(): object {
    let parameters: object = this.parameters();
    const answers = this.attributes.answers || [];

    if (answers.length > 0) {
      parameters = {
        ...parameters,
        relationships: {
          answers: {
            data: (answers as AnswerModel[]).map((answer: AnswerModel) => answer.transform()),
          },
        },
      };
    }

    const responses = this.attributes.responses || [];

    if (responses.length > 0) {
      parameters = {
        ...parameters,
        relationships: {
          responses: {
            data: (responses as ResponseModel[]).map((response: ResponseModel) => response.transform()),
          },
        },
      };
    }

    return parameters;
  }

  protected parameters(): AttendeeAttributes {
    const attributes: object = {
      address: this.attributes.address,
      cell_phone: this.attributes.cell_phone,
      city: this.attributes.city,
      country: this.attributes.country,
      email: this.attributes.email,
      external_id: this.attributes.alias,
      first_name: this.attributes.first_name,
      lang: this.attributes.language,
      last_name: this.attributes.last_name,
      notes: this.attributes.notes,
      phone: this.attributes.phone,
      prov_state: this.attributes.region,
      receive_sms: this.attributes.messagable,
      timezone: this.attributes.timezone,
      work_phone: this.attributes.work_phone,
      zip_postal: this.attributes.postcode,
    };

    Object.keys(attributes).forEach(key => {
      const value = (attributes as any)[key];

      if (value === undefined || value === null) {
        delete (attributes as any)[key];
      }
    });

    const parameters: AttendeeAttributes = {
      type: 'attendees',
    };

    if (this.attributes.identifier) {
      parameters.id = this.attributes.identifier;
    }

    if (Object.keys(attributes).length > 0) {
      parameters.attributes = attributes;
    }

    return parameters;
  }
}
