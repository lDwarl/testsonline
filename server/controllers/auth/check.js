const { ERRORS } = require('../../utils/errors');
const generateJWT = require('../../helpers/generateJWT');
const Admin = require('../../models/Admin');

module.exports = async (req, res) => {
    try {
        const user = await Admin.findById(req.user._id);

        if (!user) {
            return res.status(500).json({
                error: true,
                message: ERRORS.USER_NOT_FOUND
            });
        }

        const token = generateJWT(req.user._id, req.user.email);

        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
};
