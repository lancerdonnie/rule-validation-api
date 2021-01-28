import agent from './app.test';

describe('Validation-test failed', () => {
  test('string validation fail 1', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: '',
        rule: {
          field: 'jid',
          condition: 'eq',
          condition_value: 'jide',
        },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('failed validation.');
        expect(res.body.status).toBe('error');
        expect(res.body.data.validation.error).toBe(true);
      });
    done();
  });
  test('string validation fail 2', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: 'james',
        rule: {
          field: 'james',
          condition: 'contains',
          condition_value: 'game',
        },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('failed validation.');
        expect(res.body.status).toBe('error');
        expect(res.body.data.validation.error).toBe(true);
      });
    done();
  });
  test('Array validation fail 1', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: ['james', 'jude'],
        rule: {
          field: 'james',
          condition: 'contains',
          condition_value: 'game',
        },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('failed validation.');
        expect(res.body.status).toBe('error');
        expect(res.body.data.validation.error).toBe(true);
      });
    done();
  });
  test('Object validation fail 1', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: { a: {} },
        rule: {
          field: 'a',
          condition: 'contains',
          condition_value: 'h',
        },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('failed validation.');
        expect(res.body.status).toBe('error');
        expect(res.body.data.validation.error).toBe(true);
      });
    done();
  });
  test('Object validation fail 2', async (done) => {
    await agent
      .post('/validate-rule')
      .send({
        data: { a: { b: 'having' } },
        rule: {
          field: 'a.b',
          condition: 'contains',
          condition_value: 'have',
        },
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toContain('failed validation.');
        expect(res.body.status).toBe('error');
        expect(res.body.data.validation.error).toBe(true);
      });
    done();
  });
});
