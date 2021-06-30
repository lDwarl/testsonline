const { ERRORS } = require('../../utils/errors');
const generateJWT = require('../../helpers/generateJWT');
const { Types } = require('mongoose');
const Testing = require('../../models/Testing');

module.exports = async (req, res) => {
    const { name: userName, subject, test} = req.body;

    if (!userName || !subject || !test) {
        return res.status(400).json({
           error: true,
           message: ERRORS.BAD_REQUEST
        });
    }

    try {
        const candidate = await Testing.findOne({ userName, subject, test });

        if (candidate) {
            return res.status(400).json({
                error: true,
                message: ERRORS.USER_ALREADY_TAKEN_TEST
            });
        }

        const testing = await Testing.create({ userName, subject, test });

        const token = generateJWT(testing._id, null, true, {
           userName,
           subject,
           test
        });

        const testingData = await Testing.aggregate([
            { $match: { _id: Types.ObjectId(testing._id) }},
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
           testing: testingData[0],
           token
        });
    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            error: true,
            message: ERRORS.SOMETHING_WAS_WRONG
        });
    }
};
