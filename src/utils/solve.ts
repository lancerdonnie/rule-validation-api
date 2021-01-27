import type { TypedRequest, TypedResponse } from '../types';
import { NextFunction, Response, Request } from 'express';

const splitMax = (str: string): string[] => {
  return str.split('.');
};

export default (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
  const conditions = {
    eq: (d: any, v: any) => d === v,
    neq: (d: any, v: any) => d !== v,
    gt: (d: any, v: any) => d > v,
    gte: (d: any, v: any) => d >= v,
    contains: (d: any[] | string, v: any) => d.includes(v),
  };

  const data = req.body.data;
  const { field, condition, condition_value } = req.body.rule;

  const nested = splitMax(field);

  if (data instanceof Array) {
    if (nested.length > 1)
      return res.status(400).json({
        message: `field ${field[0]} is missing from data.`,
        status: 'error',
        data: null,
      });
    if (!data.includes(nested[0]))
      return res.status(400).json({
        message: `field ${field} is missing from data.`,
        status: 'error',
        data: null,
      });
    if (!conditions[condition](field, condition_value)) {
      return res.status(400).json({
        message: `field ${field} failed validation.`,
        status: 'error',
        data: {
          validation: {
            error: true,
            field: field,
            field_value: '',
            condition: condition,
            condition_value: condition_value,
          },
        },
      });
    }
    return res.json({
      message: `field ${field} successfully validated.`,
      status: 'success',
      data: {
        validation: {
          error: false,
          field: field,
          field_value: '',
          condition: condition,
          condition_value: condition_value,
        },
      },
    });
  } else if (typeof data === 'object') {
    if (!data[nested[0]])
      return res.status(400).json({
        message: `field ${nested[0]} is missing from data.`,
        status: 'error',
        data: null,
      });
    if (nested.length > 1 && !data[nested[0]][nested[1]])
      return res.status(400).json({
        message: `field ${field} is missing from data.`,
        status: 'error',
        data: null,
      });
    if (
      condition === 'contains' ||
      !conditions[condition](field, condition_value)
    ) {
      return res.status(400).json({
        message: `field ${field} failed validation.`,
        status: 'error',
        data: {
          validation: {
            error: true,
            field: field,
            field_value: '',
            condition: condition,
            condition_value: condition_value,
          },
        },
      });
    }
    return res.json({
      message: `field ${field} successfully validated.`,
      status: 'success',
      data: {
        validation: {
          error: false,
          field: field,
          field_value: '',
          condition: condition,
          condition_value: condition_value,
        },
      },
    });
  } else {
    if (nested.length > 1) {
      return res.status(400).json({
        message: `field ${nested[0]} is missing from data.`,
        status: 'error',
        data: null,
      });
    }
    if (!conditions[condition](field, condition_value)) {
      return res.status(400).json({
        message: `field ${field} failed validation.`,
        status: 'error',
        data: {
          validation: {
            error: true,
            field: field,
            field_value: '',
            condition: condition,
            condition_value: condition_value,
          },
        },
      });
    }
    return res.json({
      message: `field ${field} successfully validated.`,
      status: 'success',
      data: {
        validation: {
          error: false,
          field: field,
          field_value: '',
          condition: condition,
          condition_value: condition_value,
        },
      },
    });
  }
};
