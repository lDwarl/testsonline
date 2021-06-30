const Router = require('express');
const controller = require('../controllers/test');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const router = new Router();

router.post('/', AuthMiddleware, controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', AuthMiddleware, controller.edit);
router.delete('/:id', AuthMiddleware, controller.remove);

router.post('/question/:id', AuthMiddleware, controller.addQuestion);
router.put('/question/:id', AuthMiddleware, controller.removeQuestion);

module.exports = router;
