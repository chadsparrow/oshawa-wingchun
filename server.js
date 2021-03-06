const path = require('path');
const express = require('express');
require('express-async-errors'); // handle all async promise rejections and uncaught exception errors without requiring trycatch blocks

// set up app config env variables
require('dotenv').config({ path: './config/config.env' });

const app = express();

require('./startup/db')();

// Security and sanitization module imports
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const morgan = require('morgan');

// console colors
const colors = require('colors');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Consume express and mongo sanitizations and security modules
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// brute force protection - 1000 requests per 10 mins
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000
});
app.use(limiter);

// allow json request bodies & urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup static folder
app.use(express.static(path.join(__dirname, 'static')));

// handle all uncaught exceptions
process.on('uncaughtException', ex => {
  console.error(ex.message.red.bold.inverse, ex);
  process.exit(1);
});

// throw an exception to uncaught exception handler above if unhandled promise rejectoin is encountered
process.on('unhandledRejection', ex => {
  throw ex;
});

// Check if env variable for JWT_PRIVATE_KEY is set
if (!process.env.JWT_PRIVATE_KEY) {
  console.error('FATAL ERROR: JWT_PRIVATE_KEY is not defined. Process Exiting...'.red.bold.inverse);
  process.exit(1);
}

// send requests to route handlers
require('./startup/routes')(app);

// configure backend server port
const PORT = process.env.PORT || 5000;

// configure server
const server = app.listen(PORT, () =>
  console.log(
    `Server listening on port: ${PORT} - Environment: ${process.env.NODE_ENV}`.yellow.bold.underline
  )
);

module.exports = server;
