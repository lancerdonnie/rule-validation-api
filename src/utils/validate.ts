import type { TypedRequest, TypedResponse } from '../types';
import Joi from 'joi';
import { NextFunction } from 'express';

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const ruleSchema = Joi.object({
  field: Joi.string().allow('').required().messages({
    'string.base': '{{#label}} should be a string.',
    'any.required': '{{#label}} is required.',
  }),
  condition: Joi.valid('eq', 'neq', 'gt', 'gte', 'contains').required(),
  condition_value: Joi.required().messages({
    'any.required': '{{#label}} is required.',
  }),
})
  .required()
  .messages({
    'object.base': 'rule should be an {{#type}}.',
    'any.required': '{{#label}} is required.',
  });

const requestSchema = Joi.object({
  data: Joi.alternatives()
    .try(Joi.string().allow(''), Joi.array(), Joi.object())
    .required()
    .messages({
      'any.required': '{{#label}} is required.',
    }),
  rule: ruleSchema,
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
