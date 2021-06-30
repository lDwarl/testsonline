const { ERRORS } = require('../../utils/errors');
const Test = require('../../models/Test');
const { Types } = require('mongoose');

module.exports = async (req, res) => {
    const { subject, name } = req.body;

    if (!subject) {
        return res.status(400).json({
            error: true,
            message: ERRORS.BAD_REQUEST
        });
    }

    try {
        const test = await Test.create({subject, name});

        const testData = await Test.aggregate([
            { $match: { _id: Types.ObjectId(test._id) }},
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
            test: testData[0]
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
}
