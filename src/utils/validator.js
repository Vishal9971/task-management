const joi = require('joi');

exports.registerSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).pattern(/[A-Z]/).pattern(/[0-9]/).required(),
  roles: joi.string().valid('ADMIN', 'MANAGER', 'USER').optional(),
});