const RECIPES = [
    {
        id: 1,
        title: 'Pumpkin Pie',
        author: 1,
        timeToCook: '30min',
        preparationTime: '40min',
        seasonal: ['Autumn'],
        difficulty: 'Intermediate',
        type: 'Dessert',
        category: ['Sweet'],
        servingPortions: 8,
        ingredients: [
            { name: 'pumpkin', quantity: '400', units: 'gram' },
            { name: 'flour', quantity: '300', units: 'gram' },
            { name: 'sugar', quantity: '300', units: 'gram' },
            { name: 'milk', quantity: '100', units: 'ml' },
            { name: 'vanilla', quantity: '10', units: 'gram' },
            { name: 'walnuts', quantity: '100', units: 'gram' }
        ],
        steps: [
            { number: 1, description: 'bla bla bla 1' },
            { number: 2, description: 'bla bla bla 2' },
            { number: 3, description: 'bla bla bla 3' },
            { number: 4, description: 'bla bla bla 4' },
            { number: 5, description: 'bla bla bla 5' },
        ]
    },
    {
        id: 2,
        title: 'Baked Salmon',
        author: 3,
        timeToCook: '20min',
        preparationTime: '20min',
        seasonal: ['Spring', 'Summer'],
        difficulty: 'Easy',
        type: 'Main',
        category: ['Fish', 'Mediterranean'],
        servingPortions: 1,
        ingredients: [
            { name: 'salmon', quantity: '125', units: 'gram' },
            { name: 'potatoes', quantity: '200', units: 'gram' },
            { name: 'salt', quantity: '1', units: 'tbsp' },
            { name: 'pepper', quantity: '1', units: 'tbsp' },
            { name: 'lemon', quantity: '1', units: 'pc' }
        ],
        steps: [
            { number: 1, description: 'bla bla bla 1' },
            { number: 2, description: 'bla bla bla 2' },
            { number: 3, description: 'bla bla bla 3' }
        ]
    }
]


const getAll = (req, res, next) => {
    res.status(200).json(RECIPES);
};

exports.getAll = getAll;