const rateLimit  = require('express-rate-limit');
exports.loginLimiter = rateLimit({
  windowMs:15*60*1000,
  max:5,
  message:{
      message:'too many login attempts',
      error:true
    }
});

exports.generalLimiter = rateLimit({
  windowMs:15*60*1000,
  max:100,
  message:{
    message:'Too Many requests',
    error:true
  }
})

exports.adminLimiter = rateLimit({
  windowMs:15*60*1000,
  max:300,
  message:{
    message:'Too many admin requests',
    error:true
  }
})