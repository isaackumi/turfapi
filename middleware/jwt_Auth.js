const jwt = require('jsonwebtoken');
const User  = require('../models/users');

module.exports = function ( req, res, next ) {
  const token = req.headers['x-access-token'];
  if ( !token ) {
    return res.status( 403 ).send( { message: 'No token provided.' } );
  }
  // eslint-disable-next-line no-undef
  jwt.verify( token, , async ( decodeError, decoded ) => {
    if ( decodeError ) {
      return res.status( 500 ).send( { message: 'Failed to authenticate token.' } );
    }
    try {
      // define findById in user model
      req.user = await User.findById( decoded );
    } catch ( error ) {
      return res.status( 404 ).send( { message: error.message } );
    }
    next();
  } );
}



