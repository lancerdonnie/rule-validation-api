import type { Request } from 'express';
import type { TypedResponse } from '../types';

import { Router } from 'express';

const router = Router();

router.get('/', (_: Request, res: TypedResponse) =>
  res.json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Adedeji Babajide Ifeoluwa',
      github: '@lancerdonnie',
      email: 'jideadedejifirst@gmail.com',
      mobile: '08118161237',
      twitter: '@lancer_donnie',
    },
  })
);

export default router;
