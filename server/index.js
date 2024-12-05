const express = require('express');
const cors = require("cors");
const dbConnection = require('./DataBase/dbConnection');
const router = require('./router/UploadRouter')

const app = express();

require('dotenv').config();
app.use(cors(
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use('/' , router);

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
