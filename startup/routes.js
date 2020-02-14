const error = require('../middleware/error');

module.exports = function(app) {
  app.use('/api/v1', require('../routes/index'));

  app.use(function(req, res, next) {
    return res.status(404).send({ message: `Route ${req.url} not found.` });
  });
  app.use(error);
};
