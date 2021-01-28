import type { NextFunction, Request } from 'express';
import type { TypedResponse } from './types';

import express, { json } from 'express';
import cors from 'cors';

import rootController from './controllers/rootController';
import validateController from './controllers/validateController';

const app = express();

app.use(json());

app.use((err: Error, req: Request, res: TypedResponse, next: NextFunction) => {
  if (err) {
    return res.status(400).json({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null,
    });
  }
  next();
});

app.use(
  cors({
    methods: ['GET', 'POST'],
  })
);

app.use('/', rootController);
app.use('/validate-rule', validateController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server is running'));

export default app;
