const { ERRORS } = require('../../utils/errors');
const { Types } = require('mongoose');
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
        const testing = await Testing.aggregate([
            { $match: {
                _id: Types.ObjectId(id),
                subject: Types.ObjectId(userData.subject),
                test: Types.ObjectId(userData.test),
                userName: userData.userName
            }},
            { $lookup: {
                from: 'tests',
                localField: 'test',
                foreignField: '_id',
                as: 'testData'
            }},
            { $unwind: { path: "$testData", preserveNullAndEmptyArrays: true }}
        ]);

        if (!testing.length) {
            return res.status(404).json({
                error: true,
                message: ERRORS.TESTING_NOT_FOUND
            });
        }

        res.status(200).json({
            success: true,
            testing: testing[0]
        });
    } catch (e) {
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
};
