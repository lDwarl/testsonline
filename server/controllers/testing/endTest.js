const { ERRORS } = require('../../utils/errors');
const Testing = require('../../models/Testing');

module.exports = async (req, res) => {
    const {id} = req.params;
    const userData = req.user;

    if (!id) {
        return res.status(400).json({
            error: true,
            message: ERRORS.BAD_REQUEST
        });
    }

    try {
        const testing = await Testing.findOne({ _id: id, subject: userData.subject, test: userData.test, userName: userData.userName });

        if (!testing) {
            return res.status(404).json({
                error: true,
                message: ERRORS.TESTING_NOT_FOUND
            });
        }

        const { studentAnswers } = testing;
        const correctAnswers = studentAnswers.filter(ans => ans.answer.isTrue);
        const correctInPercent = 100 / studentAnswers.length * correctAnswers.length;

        testing.mark = {
            correctInPercent,
            correctAnswers: correctAnswers.length,
            testCount: studentAnswers.length
        };

        await testing.save();

        res.status(200).json({
            success: true,
        });
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
};
