const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  nameOfFacility: {
    type: String,
    
  },
  
  price: {
    type: Number,
    default:0.00
    
  },
  date: {
    type: Date,
    default:Date.now
   
  },
  location:{
    type:String
  }
});

module.exports = mongoose.model('Asset', eventSchema);
