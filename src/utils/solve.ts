import type { TypedRequest, TypedResponse } from '../types';
import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';

export default (req: TypedRequest, res: TypedResponse, next: NextFunction) => {
  // const { error } = requestSchema.validate(req.body);

  // if (error) {
  //   return res.status(400).json({
  //     data: null,
  //     message: error.message,
  //     status: 'error',
  //   });
  // }

  next();
};
