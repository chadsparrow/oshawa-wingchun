module.exports = {
  getIndex: async (req, res, next) => {
    try {
      return res.status(200).send({ message: 'Hello World' });
    } catch (err) {
      console.error(err);
    }
  }
};
