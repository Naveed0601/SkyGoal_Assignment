const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
  mongoose.connect(process.env.MONGO_URL, {
    dbName: "customer-manager",
    })  
    .then(() => {
      console.log("DataBase is Connected");
    })
    .catch(() => {
      console.log("Some Error occur");
    });
};

module.exports = dbConnection;
