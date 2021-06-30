const { Schema, model, Types } = require('mongoose');

const testSchema = new Schema({
    name: { type: String, required: true },
    subject: { type: Types.ObjectId, required: true },
    questions: {type: Array, default: []}
}, { versionKey: false });

module.exports = model('Test', testSchema);
