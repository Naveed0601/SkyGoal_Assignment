const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  s_no: { type: Number, unique: true },
  name_of_customer: { type: String },
  email: { type: String },
  mobile_number: { type: String, unique: true },
  dob: { type: Date },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
});

CustomerSchema.index({ email: 1, mobile_number: 1 });

const Customer =  mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
