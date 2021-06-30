const { ERRORS } = require('../../utils/errors');
const { Types } = require('mongoose');
const Testing = require('../../models/Testing');

module.exports = async (req, res) => {
    try {
        const testing = await Testing.aggregate([
            { $lookup: {
                    from: 'tests',
                    localField: 'test',
                    foreignField: '_id',
                    as: 'testData'
            }},
            { $unwind: { path: "$testData", preserveNullAndEmptyArrays: true }},
            { $lookup: {
                    from: 'subjects',
                    localField: 'subject',
                    foreignField: '_id',
                    as: 'subjectData'
            }},
            { $unwind: { path: "$subjectData", preserveNullAndEmptyArrays: true }},
        ]);

        res.status(200).json({
            success: true,
            testing: testing
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
};
