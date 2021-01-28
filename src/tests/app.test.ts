import app from '../index';
import request from 'supertest';

const agent = request(app);

// afterEach(async () => {
//   await app..close();
// });

describe('Home route works', () => {
  test('Home route github username starting with @', async (done) => {
    const res = await agent.get('/');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.github).toMatch(/^@?/);
    done();
  });
});

// test('Bad json returns error', async () => {
//   const res = await agent
//     .post('/validate-rule')
//     .send({
//       data: 'pqr:{"abc":"abc",}',
//     })
//     .type('json')
//     .expect(400);
//   expect(res.body.message).toEqual({
//     message: 'Invalid JSON payload passed.',
//     status: 'error',
//     data: null,
//   });
// });

export default agent;
