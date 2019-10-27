const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  price: {
    type: Number,
    
  },
  date: {
    type: Date,
   
  },
  creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
});

module.exports = mongoose.model('Asset', eventSchema);
