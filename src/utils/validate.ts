import type { TypedRequest, TypedResponse, IBody } from '../types';
import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const ruleSchema = Joi.object({
  field: Joi.string().allow('').required(),
  condition: Joi.string()
    .valid('eq', 'neq', 'gt', 'gte', 'contains')
    .required(),
  condition_value: Joi.string().allow('').required(),
})
  .required()
  .messages({
    'object.base': 'rule should be an {{#type}}.',
    'any.required': '{{#label}} is required.',
  });

const requestSchema = Joi.object({
  rule: ruleSchema,
  data: [
    Joi.string()
      .allow('')
      .required()
      .messages({ 'any.required': '{{#label}} is required.' }),
    Joi.array().required(),
    Joi.object().required(),
  ],
});

export default (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
  const { error } = requestSchema.validate(req.body, options);

  if (error) {
    // console.log(error.details[0]);
    return res.status(400).json({
      data: null,
      message: error.message,
      status: 'error',
    });
  }

  next();
};
