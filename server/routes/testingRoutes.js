const Router = require('express');
const controller = require('../controllers/testing');
const StudentAuthMiddleware = require('../middlewares/StudentAuthMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const router = new Router();

router.get('/', AuthMiddleware, controller.getAll);
router.post('/', controller.create);
router.get('/:id', StudentAuthMiddleware, controller.getById);
router.put('/:id', StudentAuthMiddleware, controller.edit);
router.get('/end/:id', StudentAuthMiddleware, controller.endTest);

module.exports = router;
