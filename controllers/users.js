module.exports = {
  login: async (req, res, next) => {
    try {
      console.log('Got to Login!');
      res.send(req.valid);
    } catch (err) {
      console.error(err);
    }
  }
};
