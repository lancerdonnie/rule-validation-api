import express, { json } from 'express';
import cors from 'cors';

// controllers
import rootController from './controllers/rootController';
import validateController from './controllers/validateController';

const app = express();

app.use(json());
app.use(
  cors({
    methods: ['GET', 'POST'],
  })
);

app.use('/', rootController);
app.use('/validate-rule', validateController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server is running'));
