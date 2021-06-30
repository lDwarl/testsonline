const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
}, { versionKey: false });

module.exports = model('Admin', adminSchema);
