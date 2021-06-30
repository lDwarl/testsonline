const { ERRORS } = require('../../utils/errors');
const Test = require('../../models/Test');

module.exports = async (req, res) => {
    const {id} = req.params;

    if (!id) {
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

        await test.remove();

        res.status(200).json({
            success: true,
            removedId: id
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
}
