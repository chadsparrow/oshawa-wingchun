require('dotenv').config();
const mongoose = require('mongoose');
const colors = require('colors');

module.exports = async function db() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  console.log(
    `API Server connected to MongoDB mode:(${process.env.NODE_ENV})...`.green.bold.underline
  );

  process.on('SIGINT', async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected due to app termination'.red.bold.underline);
    process.exit(0);
  });

  process.on('exit', async code => {
    await mongoose.disconnect();
    console.log(
      `MongoDB disconnected due to app termination with code: ${code}`.red.bold.underline
    );
    process.exit(0);
  });
};
