const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    recipes: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Recipe' }]
});

module.exports = mongoose.model('User', userSchema);