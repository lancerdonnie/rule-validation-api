import agent from './app.test';

describe('Validation-test success', () => {
  test('string validation success 1', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: '',
        rule: {
          field: 'tools',
          condition: 'eq',
          condition_value: 'tools',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toContain('successfully validated.');
        expect(res.body.status).toBe('success');
        expect(res.body.data.validation.error).toBe(false);
      });
    done();
  });
  test('string validation success 2', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: '',
        rule: {
          field: 'tools',
          condition: 'contains',
          condition_value: 'tool',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toContain('successfully validated.');
        expect(res.body.status).toBe('success');
        expect(res.body.data.validation.error).toBe(false);
      });
    done();
  });
  test('string validation success 3', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: '',
        rule: {
          field: 'tool',
          condition: 'neq',
          condition_value: 'tools',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toContain('successfully validated.');
        expect(res.body.status).toBe('success');
        expect(res.body.data.validation.error).toBe(false);
      });
    done();
  });
  test('Array validation success 1', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: ['total', 'everything'],
        rule: {
          field: 'everything',
          condition: 'eq',
          condition_value: 'everything',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toContain('successfully validated.');
        expect(res.body.status).toBe('success');
        expect(res.body.data.validation.error).toBe(false);
      });
    done();
  });
  test('Array validation success 2', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: ['9', 'everything'],
        rule: {
          field: '9',
          condition: 'neq',
          condition_value: 9,
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toContain('successfully validated.');
        expect(res.body.status).toBe('success');
        expect(res.body.data.validation.error).toBe(false);
      });
    done();
  });
  test('Object validation success 1', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: { a: 20 },
        rule: {
          field: 'a',
          condition: 'gte',
          condition_value: '20',
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toContain('successfully validated.');
        expect(res.body.status).toBe('success');
        expect(res.body.data.validation.error).toBe(false);
      });
    done();
  });
  test('Object validation success 2', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: { a: 20, b: { c: true } },
        rule: {
          field: 'b.c',
          condition: 'eq',
          condition_value: true,
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.message).toContain('successfully validated.');
        expect(res.body.status).toBe('success');
        expect(res.body.data.validation.error).toBe(false);
      });
    done();
  });
});
