const express = require('express');
const router = express.Router();

const auth =require('../middlewares/auth.middleware');
const analyticsController = require('../controllers/analytics.controller');
const role = require('../middlewares/role.middleware');

router.use(auth);

router.get('/tasks',role('ADMIN')
  ,analyticsController.getTaskAnalytics);

module.exports = router;