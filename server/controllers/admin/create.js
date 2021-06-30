const { ERRORS } = require('../../utils/errors');
const bcrypt = require('bcrypt');
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
        const candidate = await Admin.findOne({ email });

        if (candidate) {
            return res.status(409).json({
                error: true,
                message: ERRORS.USER_ALREADY_EXIST
            });
        }

        const hashPassword = await bcrypt.hash(password.toString(), 5);
        const admin = await Admin.create({ email, password: hashPassword });

        res.status(200).json({
            success: true,
            admin
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
};
