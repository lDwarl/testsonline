const { ERRORS } = require('../../utils/errors');
const Test = require('../../models/Test');

module.exports = async (req, res) => {
    const {id} = req.params;
    const { question, answers } = req.body;
    // answers is array of obj like { answer: ... , isTrue: true/false }

    if (!id || !question || !answers) {
        return res.status(400).json({
            error: true,
            message: ERRORS.BAD_REQUEST
        });
    }

    try {
        const test = await Test.findById(id);

        if (!test) {
            return res.status(404).json({
                error: true,
                message: ERRORS.TEST_NOT_FOUND
            });
        }

        test.questions.push({
           question,
           answers
        });

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
