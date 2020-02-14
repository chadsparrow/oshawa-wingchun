const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  validateBody: schema => {
    return async (req, res, next) => {
      try {
        const value = await schema.validateAsync(req.body);
        req.valid = value;
        next();
      } catch (err) {
        return res.status(400).send(err);
      }
    };
  },
  schemas: {
    loginSchema: Joi.object({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required()
        .min(8)
        .max(25)
    })
  }
};
