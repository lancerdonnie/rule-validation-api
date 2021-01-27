import type { Request } from 'express';
import type { TypedResponse } from '../types';
import { Router } from 'express';
import validate from '../utils/validate';
import solve from '../utils/solve';

const router = Router();

router.post('/', validate, solve, (_: Request, res: TypedResponse) =>
  res.json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {},
  })
);

export default router;
