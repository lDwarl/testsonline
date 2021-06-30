const { ERRORS } = require('../../utils/errors');
const { Types } = require('mongoose');
const Testing = require('../../models/Testing');

module.exports = async (req, res) => {
    const {id} = req.params;
    const userData = req.user;
    const { questionWithAnswer } = req.body;

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

        testing.studentAnswers.push(questionWithAnswer);
        testing.save();

        const testingData = await Testing.aggregate([
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

        res.status(200).json({
            success: true,
            testing: testingData[0]
        });
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
};
