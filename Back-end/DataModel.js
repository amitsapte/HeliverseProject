

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  avatar: String,
  domain: String,
  available: Boolean
});

const DataModel = mongoose.model('DataModel', dataSchema,"users");

module.exports = DataModel;
