const { User } = require('../models/users');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.valid;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).send({ message: 'Email or Password Invalid' });

      const isMatch = await user.isValidPassword(password);
      if (!isMatch) return res.status(401).send({ message: 'Email or Password Invalid' });

      // Generate Token
      return res.status(200).send({ message: 'Logged In!' });
    } catch (err) {
      console.error(err);
    }
  },
  register: async (req, res, next) => {
    try {
      const { email, password } = req.valid;
      let user = await User.findOne({ email });
      if (user) return res.status(400).send({ message: 'User already registered' });

      const newUser = await User.create({ email, password });

      // Generate token
      return res.status(201).send({ message: 'User registered', data: newUser });
    } catch (err) {
      console.error(err);
    }
  }
};
