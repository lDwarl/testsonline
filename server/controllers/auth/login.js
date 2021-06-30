const { ERRORS } = require('../../utils/errors');
const bcrypt = require('bcrypt');
const generateJWT = require('../../helpers/generateJWT');
const Admin = require('../../models/Admin');

module.exports = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: ERRORS.BAD_REQUEST
        });
    }

    try {
        const user = await Admin.findOne({email}).select('+password');

        if (!user) {
            return res.status(404).json({
                error: true,
                message: ERRORS.USER_NOT_FOUND
            });
        }

        const comparePassword = await bcrypt.compare(password.toString(), user.password);

        if (!comparePassword) {
            return res.status(400).json({
                error: true,
                message: ERRORS.BAD_PASSWORD
            });
        }

        const token = generateJWT(user._id, user.email);

        const responseUser = await Admin.findById(user._id);

        res.status(200).json({
            success: true,
            token,
            user: responseUser
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
};
