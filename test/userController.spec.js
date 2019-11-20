const chai= require('chai')
const chaiHttp =require('chai-http')
const chaiAsPromised = require('chai-as-promised')
//import sinon from 'sinon';
const jwt = require('jsonwebtoken')
const server = require('../server')
const User = require('../models/users')

process.env.NODE_ENV = 'test';

chai.use( chaiHttp );
chai.use( chaiAsPromised );
chai.should();

    

describe('Users CRUD', () => {

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

    it( 'It should throw an error', done => {
      const stub = sinon.stub( User, 'create' );
      stub.throws();
  
      User.create( { firstName: 'Jefferson', lastName: 'Welbeck' } ).fetch().then( user => {
        const data = user.toJSON();
  
        chai.request( server )
          .post( `/signup` )
          .send( {
            email: 'iyzekkummy29@gmail.com',
            password: 'teamMag'
          } )
          .end( ( error, response ) => {
            response.should.have.status( 422 );
            response.body.should.have.property( 'message' );
  
            stub.restore();
            done();
          } );
      } ).catch( error => {
        done();
      } );
    } );
  
});
