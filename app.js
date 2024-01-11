const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const bookRoutes=require('./routes/book');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});
app.use(bodyParser.json()); //application/json
app.use('/',bookRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log('Server started ...');
    });
  })
  .catch((err) => {
    console.log(err);
  });
