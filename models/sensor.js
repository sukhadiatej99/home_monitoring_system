const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Code Schema
const ReadingSchema = Schema({
  temperature: { 
    type: String, 
    required: true
  },
  gas:{
    type: String,
    required: true
  },
  light:{
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
},
{
	collection: 'reading'
});
  

const Code = module.exports = mongoose.model('Reading', ReadingSchema);
