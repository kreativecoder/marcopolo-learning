const express = require('express');
const logger = require('morgan');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const usersRouter = require('./routes/users');

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use(logger('dev'));

mongoose
    .connect(
        process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("MongoDB successfully connected."))
    .catch(err => console.log(err));

app.use('/api/v1/users', usersRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
