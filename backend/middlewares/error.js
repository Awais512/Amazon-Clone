const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    error.message = err.message;

    //Wrong Mongoose Object Id Error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling Mongoose Validation Error

    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((value) => value.message);
      err = new ErrorHandler(message, 400);
    }

    //Handling mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicates resource value Entered`;
      error = new ErrorHandler(message, 400);
    }

    //Handling wrong jwt error
    if (err.name === 'JsonWebTokenError') {
      const message = 'Jsonwebtoken is invalid! Try again';
      err = new ErrorHandler(message, 400);
    }

    //Handling wrong jwt expire
    if (err.name === 'TokenExpireError') {
      const message = 'Jsonwebtoken is expired! Try again';
      err = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
};
