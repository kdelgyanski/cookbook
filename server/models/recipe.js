const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authorId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    image: { type: String, required: false },
    timeToCook: { type: Number, required: true },
    preparationTime: { type: Number, required: true },
    servingPortions: { type: Number, required: true },
    course: { type: String, enum: ['main', 'soup', 'salad', 'dessert'], required: true },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        units: { type: String, enum: ['gram', 'kilogram', 'milliliter', 'liter', 'tbsp', 'tsp', 'to taste', 'pieces'], required: true }
    }],
    steps: [{ type: String, required: true }],
    difficulty: { type: String, enum: ['easy', 'intermediate', 'advanced'], required: true },
    seasonal: [{ type: String, enum: ['spring', 'summer', 'autumn', 'winter'], required: false }],
    category: [{
        type: String, enum: [
            'pork',
            'chicken',
            'fish',
            'beef',
            'vegetarian',
            'vegan',
            'sweet',
            'asian',
            'mediterranean'
        ],
        required: false
    }],
});

module.exports = mongoose.model('Recipe', recipeSchema);