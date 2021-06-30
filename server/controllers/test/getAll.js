const { ERRORS } = require('../../utils/errors');
const Test = require('../../models/Test');

module.exports = async (req, res) => {
    try {
        const tests = await Test.aggregate([
            { $lookup: {
                    from: 'subjects',
                    localField: 'subject',
                    foreignField: '_id',
                    as: 'subjectData'
            }},
            { $unwind: { path: "$subjectData", preserveNullAndEmptyArrays: true }}
        ]);

        res.status(200).json({
            success: true,
            tests
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
}
