const express = require("express");
const {UploadCustomerDetails, GetCustomerDetails} = require("../controller/UploadCustomer");
const router = express.Router();

router.post('/customer' , UploadCustomerDetails);
router.get('/customerDetails' , GetCustomerDetails);

module.exports = router;