import type { TypedRequest, TypedResponse } from '../types';

import { Router } from 'express';
import validate from '../utils/validate';
import { conditions, splitMax } from '../utils/util';

const router = Router();

router.post('/', validate, (req: TypedRequest, res: TypedResponse) => {
  const data = req.body.data;
  const { field, condition, condition_value } = req.body.rule;
  const nestedFields = splitMax(field);

  if (data instanceof Array) {
    if (nestedFields.length > 1)
      return res.status(400).json({
        message: `field ${field[0]} is missing from data.`,
        status: 'error',
        data: null,
      });

    if (!data.includes(nestedFields[0]))
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
  }

  if (typeof data === 'object') {
    const nest1 = data[nestedFields[0]]?.[nestedFields[1]];
    const nest2 = data[nestedFields[0]];

    if (
      (nestedFields.length > 1 && nest1 === undefined) ||
      (nestedFields.length === 1 && nest2 === undefined)
    )
      return res.status(400).json({
        message: `field ${field} is missing from data.`,
        status: 'error',
        data: null,
      });

    if (nest1 !== undefined) {
      if (!conditions[condition](nest1, condition_value)) {
        return res.status(400).json({
          message: `field ${field} failed validation.`,
          status: 'error',
          data: {
            validation: {
              error: true,
              field: field,
              field_value: nest1,
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
            field_value: nest1,
            condition: condition,
            condition_value: condition_value,
          },
        },
      });
    } else {
      if (!conditions[condition](nest2, condition_value)) {
        return res.status(400).json({
          message: `field ${nestedFields[0]} failed validation.`,
          status: 'error',
          data: {
            validation: {
              error: true,
              field: field,
              field_value: nest2,
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
            field_value: nest2,
            condition: condition,
            condition_value: condition_value,
          },
        },
      });
    }
  } else {
    if (nestedFields.length > 1) {
      return res.status(400).json({
        message: `field ${nestedFields[0]} is missing from data.`,
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
});

export default router;
