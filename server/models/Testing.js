const { Schema, model, Types } = require('mongoose');

const testingSchema = new Schema({
    userName: { type: String, required: true },
    subject: { type: Types.ObjectId, required: true },
    test: { type: Types.ObjectId, required: true },
    mark: { type: Object, default: {} },
    // mark be like
    // {
    //  testCount: count of test when student do it
    //  correctCount: count of correct student test
    //  markInPercent: percent of correct answers
    // }
    studentAnswers: { type: Array, default: [] },
}, { versionKey: false });

module.exports = model('Testing', testingSchema);
