import type { TypedRequest, TypedResponse } from '../types';
import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';

const ruleSchema = Joi.object({
  field: Joi.string().required(),
  condition: Joi.string()
    .valid('eq', 'neq', 'gt', 'gte', 'contains')
    .required(),
  condition_value: Joi.string().required(),
}).required();

const requestSchema = Joi.object({
  rule: ruleSchema,
  data: [
    Joi.string().required(),
    Joi.array().required(),
    Joi.object().required(),
  ],
});

export default (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
  const { error } = requestSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      data: null,
      message: error.message,
      status: 'error',
    });
  }

  next();
};
