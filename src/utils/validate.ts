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
// .error((err) => {
//   console.log(err[0]);
//   return new Error('blabla');
// });

const requestSchema = Joi.object({
  rule: ruleSchema,
  data: [
    Joi.string().required(),
    Joi.array().required(),
    Joi.object().required(),
  ],
});

export default (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
  // const { error } = requestSchema.validate(req.body);

  // if (error) {
  //   console.log(error.details[0]);
  //   return res.status(400).json({
  //     data: null,
  //     message: error.message,
  //     status: 'error',
  //   });
  // }

  const body = req.body;
  if (!body.data) {
    return res.status(400).json({
      data: null,
      message: 'data is required.',
      status: 'error',
    });
  }
  if (!body.rule) {
    return res.status(400).json({
      data: null,
      message: 'rule is required.',
      status: 'error',
    });
  }

  next();
};
