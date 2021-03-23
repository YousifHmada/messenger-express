const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const ERRORS = require('../utils/errors/messages.js');

chai.should();
chai.use(chaiHttp);

describe('/POST auth/register', () => {
  it('it should return 201', (done) => {
    chai
      .request(app)
      .post('/auth/register/')
      .send({
        username: 'hello',
        email: `hello+${new Date().getTime()}@test.com`,
        password: '123456',
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it('it should return 4xx with an error', (done) => {
    chai
      .request(app)
      .post('/auth/register/')
      .send({
        username: 'hello',
        email: `hello+${new Date().getTime()}@test.com`,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql(ERRORS.REQUIRED_PASSWORD);
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});
