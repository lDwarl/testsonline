const { Schema, model } = require('mongoose');

const subjectSchema = new Schema({
    name: { type: String, required: true}
}, { versionKey: false });

module.exports = model('Subject', subjectSchema);
