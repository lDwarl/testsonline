const Router = require('express');
const controller = require('../controllers/admin');
const router = new Router();

router.post('/create', controller.createAdmin);

module.exports = router;
