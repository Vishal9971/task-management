const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ownership = require('../middlewares/ownership.middleware');
const task = require('../controllers/task.controller');
const { generalLimiter, adminLimiter } = require('../middlewares/rateLimit.middleware');

router.use(generalLimiter);
router.use(auth);
router.post('/', role('ADMIN', 'MANAGER'), task.createTask);
router.get('/', task.getTasks);
router.put('/:id', role('ADMIN', 'MANAGER'), task.updateTask);
router.delete('/:id', ownership, task.deleteTask);
router.put('/:id/assign', adminLimiter, role('ADMIN', 'MANAGER'), task.assignTask);

module.exports = router;


