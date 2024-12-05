const Customer = require('../models/User');

const UploadCustomerDetails = async(req , res) => {
    try {
        const { s_no, name_of_customer, email, mobile_number, dob } = req.body;
    
        if (!name_of_customer || !email || !mobile_number) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
    
        const newCustomer = new Customer({
          s_no,
          name_of_customer,
          email,
          mobile_number,
          dob,
          created_at: new Date(),
          modified_at: new Date(),
        });
    
        await newCustomer.save();
    
        return res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

const GetCustomerDetails = async(req , res) => {
  const { page = 1, limit = 10, search, filterField, filterValue } = req.query;

  const query = {};
  if (search) {
    query.$or = [
      { name_of_customer: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  if (filterField && filterValue) {
    query[filterField] = filterValue;
  }

  try {
    const customers = await Customer.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalRecords = await Customer.countDocuments(query);

    res.json({
      customers,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
}

module.exports = {UploadCustomerDetails , GetCustomerDetails};