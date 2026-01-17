const express = require('express');
const router = express.Router();

const auth =require('../middlewares/auth.middleware');
const analyticsController = require('../controllers/analytics.controller');

router.use(auth);

router.get('/tasks',analyticsController.getTaskAnalytics);

module.exports = router;