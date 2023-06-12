const mongoose = require('mongoose');

// Event Schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Barat', 'Waleema', 'Mehandi', 'Birthday'],
    required: true
  },
  guests:{
    type: String,
  },
  budget:{
    type: String,
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;