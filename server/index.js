require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db.js');
const fileUpload = require('express-fileupload');
const path = require('path');
const router = require('./routes/index.js');
require('./models/models.js');
const errorMiddlawere = require('./middleWare/ErrorMiddleWare');

const app = express(router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload({}));
app.use('/api', router);
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(errorMiddlawere);


const PORT = process.env.PORT || 4444;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log('server started on port:' + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
