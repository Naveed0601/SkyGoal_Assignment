require('dotenv').config();
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Customer = require('../models/User');

mongoose.connect(process.env.MONGO_URL, { 
  dbName: "customer-manager", 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    generateFakeCustomers();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const generateFakeCustomers = async () => {
  const customers = [];
  const batchSize = 10000;  
  let lastSNo = await Customer.findOne({}, { s_no: 1 }).sort({ s_no: -1 });
  let currentSNo = lastSNo ? lastSNo.s_no + 1 : 1;

  const totalRecords = 1000000;  

  for (let i = currentSNo; i < currentSNo + totalRecords; i++) {
    customers.push({
      s_no: i,
      name_of_customer: faker.person.fullName(),
      email: faker.internet.email(),
      mobile_number: faker.phone.number(),
      dob: faker.date.past(40),
      created_at: new Date(),
      modified_at: new Date(),
    });

    if (customers.length === batchSize || i === currentSNo + totalRecords - 1) {
      try {
        const data = await Customer.insertMany(customers, { ordered: false, timeout: 60000 });
        console.log(`${i} records inserted`);
      } catch (err) {
        console.error("Error inserting batch:", err.message || err);
      }
      customers.length = 0;  
    }
  }
  console.log('Data generation complete');
};
