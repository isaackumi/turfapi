const chai= require('chai')
const chaiHttp =require('chai-http')
const chaiAsPromised = require('chai-as-promised')
//import sinon from 'sinon';
const jwt = require('jsonwebtoken')
const server = require('../app')
const User = require('../models/users')

process.env.NODE_ENV = 'test';

chai.use( chaiHttp );
chai.use( chaiAsPromised );
chai.should();

    

describe('Users CRUD', () => {

    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });

    it('should create a user ', done => {
      chai.request(server)
      .post('/signup')
      .send({
          username:'isaackumi',
          email:'isaac.kumi@ashesi.edu.gh',
          password:'pressOne'
      })
      .end( (error,response)=>{
        response.should.have.status(200);

        done();
    
      });
    });

    it('should fetch all users', (done) => {
      
    });

    it('should fetch a user', (done) => {
      
    });

    it('should update a user', (done) => {
      
    });

    it('should delete a user', (done) => {
      
    });
  
});
