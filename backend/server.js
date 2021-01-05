const app = require('./app');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });

//import route files
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mounting Routes Middleware
app.use('/api/v1/products', productRoutes);

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  )
);
