const { ERRORS } = require('../../utils/errors');
const Subject = require('../../models/Subject');
const Admin = require('../../models/Admin');

module.exports = async (req, res) => {
    const { name } = req.body;

    if (!name) {
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

        const subject = await Subject.create({name});

        res.status(200).json({
            success: true,
            subject
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
}
