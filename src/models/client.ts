import { ModelInterface } from '../index';
import Answer, { AnswerModel } from './answer';
import Model from './model';
import { ResponseModel } from './response';

export interface ClientModel extends ModelInterface {
  answers(answers: AnswerModel | AnswerModel[]): this;

  messagable(messageable: boolean): this;

  named(first: string, last: string): this;

  provided(notes: string): this;

  reachable(details: ReachableDetailParameters): this;

  speaks(language: string): this;

  transform(): object;
}

export interface ClientAttributes {
  attributes?: object;
  type: string;
  receive_sms?: boolean;
}

export interface ClientParameters {
  first_name: string | null;
  last_name: string | null;
  notes?: string;
  lang?: string;
  cell_phone?: string;
  email: string | null;
  answers?: AnswerModel[] | [];
  receive_sms: boolean;
}

export interface ReachableDetailParameters {
  cell_phone?: string;
  email: string;
}

export default class Client extends Model implements ClientModel {
  protected attributes: ClientParameters;
  protected receiveSms = false;

  constructor() {
    super();

    this.attributes = {
      email: null,
      first_name: null,
      last_name: null,
      receive_sms: false,
    };
  }

  public answers(answers: AnswerModel | AnswerModel[]): this {
    this.attributes.answers = Array.isArray(answers) ? answers : [answers];

    return this;
  }

  public messagable(messageable: boolean = true): this {
    this.attributes.receive_sms = messageable;

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

  public speaks(language: string): this {
    this.attributes.lang = language;

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

    return parameters;
  }

  protected parameters(): ClientAttributes {
    const attributes: object = {
      cell_phone: this.attributes.cell_phone,
      email: this.attributes.email,
      first_name: this.attributes.first_name,
      lang: this.attributes.lang,
      last_name: this.attributes.last_name,
      notes: this.attributes.notes,
    };

    Object.keys(attributes).forEach(key => {
      const value = (attributes as any)[key];

      if (value === undefined || value === null) {
        delete (attributes as any)[key];
      }
    });

    const parameters: ClientAttributes = {
      type: 'client',
    };

    if (this.attributes.receive_sms) {
      parameters.receive_sms = this.receiveSms;
    }

    if (Object.keys(attributes).length > 0) {
      parameters.attributes = attributes;
    }

    return parameters;
  }
}
