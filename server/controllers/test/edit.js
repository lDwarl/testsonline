const { ERRORS } = require('../../utils/errors');
const Test = require('../../models/Test');
const Admin = require('../../models/Admin');

module.exports = async (req, res) => {
    const {id} = req.params;
    const updateParams = req.body;

    if (!id) {
        return res.status(400).json({
            error: true,
            message: ERRORS.BAD_REQUEST
        });
    }

    try {
        const user = await Admin.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                error: true,
                message: ERRORS.USER_NOT_FOUND
            });
        }

        const test = await Test.findById(id);

        if (!test) {
            return res.status(404).json({
                error: true,
                message: ERRORS.TEST_NOT_FOUND
            });
        }

        for(let param in updateParams) {
            test[param] = updateParams[param];
        }

        await test.save();

        res.status(200).json({
            success: true,
            test
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
}
