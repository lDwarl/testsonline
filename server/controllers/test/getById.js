const { ERRORS } = require('../../utils/errors');
const { Types } = require('mongoose');
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
        const test = await Test.aggregate([
            { $match: { _id: Types.ObjectId(id) }},
            { $lookup: {
                    from: 'subjects',
                    localField: 'subject',
                    foreignField: '_id',
                    as: 'subjectData'
            }},
            { $unwind: { path: "$subjectData", preserveNullAndEmptyArrays: true }}
        ]);

        if (!test) {
            return res.status(404).json({
                error: true,
                message: ERRORS.TEST_NOT_FOUND
            });
        }

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
