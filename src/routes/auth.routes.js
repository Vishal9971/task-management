const router = require('express').Router();
const {register,login,logout} = require('../controllers/auth.controller');
const {loginLimiter} = require('../middlewares/rateLimit.middleware');
const role = require('../middlewares/role.middleware');

router.post('/register',register);
router.post('/login',loginLimiter,login);
router.post('/logout',logout);

module.exports=router;