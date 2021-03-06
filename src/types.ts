import type { Response, Request } from 'express';

export interface IResponse {
  message: string;
  status: 'success' | 'error';
  data: {} | null;
}

export type TypedResponse = Omit<Response, 'json'> & {
  json(data: IResponse): Response;
};

export interface TypedRequest extends Request {
  body: IBody;
}

export interface IBody {
  rule: {
    field: string;
    condition: 'eq' | 'neq' | 'gt' | 'gte' | 'contains';
    condition_value: string;
  };
  data:
    | {
        [key: string]: any;
      }
    | any[]
    | string;
}
