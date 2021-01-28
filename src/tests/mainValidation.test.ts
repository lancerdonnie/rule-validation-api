import agent from './app.test';

describe('Main Validation errors', () => {
  test('empty object gives error', async (done) => {
    await agent
      .post('/validate-rule')
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('is required.');
        expect(res.body.status).toBe('error');
        expect(res.body.data).toBe(null);
      });
    done();
  });

  test('rule not provided', async (done) => {
    await agent
      .post('/validate-rule')
      .send({ data: [] })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('rule is required.');
        expect(res.body.status).toBe('error');
        expect(res.body.data).toBe(null);
      });
    done();
  });

  test('data not provided', async (done) => {
    await agent
      .post('/validate-rule')
      .send({ rule: {} })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('data is required.');
        expect(res.body.status).toBe('error');
        expect(res.body.data).toBe(null);
      });
    done();
  });

  test('data having wrong type', async (done) => {
    await agent
      .post('/validate-rule')
      .send({ data: 8, rule: {} })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('data must be one of');
        expect(res.body.status).toBe('error');
        expect(res.body.data).toBe(null);
      });
    done();
  });

  test('rule having wrong type', async (done) => {
    await agent
      .post('/validate-rule')
      .send({ data: {}, rule: 4 })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('rule should be an object.');
        expect(res.body.status).toBe('error');
        expect(res.body.data).toBe(null);
      });
    done();
  });

  test('rule having wrong type', async (done) => {
    await agent
      .post('/validate-rule')
      .send({ data: {}, rule: {} })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('rule.');
        expect(res.body.status).toBe('error');
        expect(res.body.data).toBe(null);
      });
    done();
  });

  test('rule.field having wrong type', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: {},
        rule: { field: 9, condition: 'eq', condition_value: 8 },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('rule.field should be a string.');
      });
    done();
  });

  test('rule.condition having wrong type', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: {},
        rule: { field: 'a', condition: 'equ', condition_value: 8 },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain(
          'rule.condition must be one of [eq, neq, gt, gte, contains]'
        );
      });
    done();
  });

  test('data missing 1', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: {},
        rule: { field: 'a', condition: 'contains', condition_value: {} },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('is missing from data.');
      });
    done();
  });

  test('data missing 2', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: ['b', 'c'],
        rule: {
          field: 'a',
          condition: 'contains',
          condition_value: 'a',
        },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('is missing from data.');
      });
    done();
  });

  test('data missing 3', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: { a: {} },
        rule: {
          field: 'a.b',
          condition: 'contains',
          condition_value: 'a',
        },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('is missing from data.');
        expect(res.body.status).toBe('error');
        expect(res.body.data).toBe(null);
      });
    done();
  });

  test('data missing 4', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        rule: {
          field: '5',
          condition: 'contains',
          condition_value: 'rocinante',
        },
        data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('is missing from data.');
        expect(res.body.status).toBe('error');
        expect(res.body.data).toBe(null);
      });
    done();
  });
});
