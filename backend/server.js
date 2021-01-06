const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connectDb = require('./config/db');
const errorMiddleware = require('./middlewares/error');
const dotenv = require('dotenv');

//Handle Uncaught Exceptions`

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server');
  process.exit(1);
});

dotenv.config({ path: 'backend/config/config.env' });

//import route files
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

//Connect to Db
connectDb();

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mounting Routes Middleware
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', authRoutes);

//Error Handler
app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(
    `Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  )
);
