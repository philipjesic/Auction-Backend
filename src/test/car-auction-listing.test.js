const {should} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Using 'Should' Assertion Style
chai.should();

// Use Http Protocol
chai.use(chaiHttp);

describe('Car Auction Listings API', () => {
  /**
     * Test GET
     */
  describe('GET /car-auction-listings', () => {
    it('It should get all the car auction listings with status 200', (done) => {
      chai.request(server)
          .get('/car-auction-listings')
          .end((err, response) => {
            if (err) {
              should.fail(`Error - ${err}`);
            }
            response.should.have.status(200);
            response.body.should.be.a('array');
            done();
          });
    });
  });

  /**
     * Test Get By ID
     */
  describe('GET /car-auction-listings?id=1', () => {
    it('It should get the car listing of id = 1 with status 200', (done) => {
      chai.request(server)
          .get('/car-auction-listings')
          .query({id: 1})
          .end((err, response)=>{
            if (err) {
              should.fail(`Error - ${err}`);
            }
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body[0].id.should.equal('1');
            response.body[0].make.should.equal('HONDA');
            response.body[0].model.should.equal('Civic');
            response.body[0].year.should.equal('2003');
            done();
          });
    });
  });


  /**
     * Test Post
     */
  describe('POST /car-auction-listings', () => {
    it('It should POST the car listing with status 200', (done) => {
      chai.request(server)
          .post('/car-auction-listings')
          .send({})
          .end((err, response)=>{
            if (err) {
              should.fail(`Error - ${err}`);
            }
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body[0].id.should.equal('1');
            response.body[0].make.should.equal('HONDA');
            response.body[0].model.should.equal('Civic');
            response.body[0].year.should.equal('2003');
            done();
          });
    });
  });

  /**
     * Test Put
     */

  /**
     * Test Delete
     */
});
