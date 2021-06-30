const { ERRORS } = require('../../utils/errors');
const Subject = require('../../models/Subject');

module.exports = async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.status(404).json({
            error: true,
            message: ERRORS.SUBJECT_NOT_FOUND
        });
    }

    try {
        const subject = await Subject.findById(id);

        if (!subject) {
            return res.status(404).json({
                error: true,
                message: ERRORS.SUBJECT_NOT_FOUND
            });
        }

        await subject.remove();

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
