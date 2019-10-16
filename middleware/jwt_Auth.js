import jwt from 'jsonwebtoken';
import { User } from '../models/users';

export default function ( req, res, next ) {
  const token = req.headers['x-access-token'];
  if ( !token ) {
    return res.status( 403 ).send( { message: 'No token provided.' } );
  }
  jwt.verify( token, process.env.SECRET_KEY, async ( decodeError, decoded ) => {
    if ( decodeError ) {
      return res.status( 500 ).send( { message: 'Failed to authenticate token.' } );
    }
    try {
      req.user = await User.findById( decoded );
    } catch ( error ) {
      return res.status( 404 ).send( { message: error.message } );
    }
    next();
  } );
}
