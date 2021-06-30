const Router = require('express');
const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const subjectRouter = require('./subjectRouter');
const testRouter = require('./testRouter');
const testingRouter = require('./testingRoutes');

const router = new Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/subject', subjectRouter);
router.use('/test', testRouter);
router.use('/testing', testingRouter);

module.exports = router;
