const Router = require('express');
const controller = require('../controllers/auth');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
const router = new Router();

router.post('/', controller.login);
router.post('/check', AuthMiddleware, controller.checkAuth);

module.exports = router;
