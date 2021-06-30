const { ERRORS } = require('../../utils/errors');
const Subject = require('../../models/Subject');

module.exports = async (req, res) => {
    try {
        const subjects = await Subject.find();

        res.status(200).json({
           success: true,
           subjects
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
}
