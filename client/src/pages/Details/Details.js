const Details = () => {

    const recipe = {
        id: 1,
        title: 'Pumpkin Pie',
        preparationTime: '1 Hour',
        timeToCook: '20 Minutes',
        servingPortions: 8,
        imageUrl: './images/pumpkin-pie.jpg',
        type: 'Dessert',
        seasonal: ['Fall'],
        difficulty: ['Intermediate'],
        category: ['Sweet'],
        ingredients: [
            { id: 1, name: 'pumpkin', quantity: '500', units: 'gram' },
            { id: 2, name: 'egs', quantity: '2', units: 'pieces' },
            { id: 3, name: 'sugar', quantity: '300', units: 'gram' },
            { id: 4, name: 'flour', quantity: '500', units: 'gram' },
            { id: 5, name: 'milk', quantity: '150', units: 'ml' },
            { id: 6, name: 'vanila', quantity: '10', units: 'gram' },
        ],
        steps: [
            { id: 1, title: 'First step', description: 'Bla bla ajskfkasfhgkasksajfkjashfkashfk' },
            { id: 2, title: 'Second step', description: 'Bla bla ajskfkasfhgkasksajfkjashfkashfk' },
            { id: 3, title: 'Third step', description: 'Bla bla ajskfkasfhgkasksajfkjashfkashfk' },
        ]
    }

    const {
        title,
        preparationTime,
        timeToCook,
        ingredients,
        servingPortions,
        imageUrl,
        steps,
        type,
        difficulty,
        category,
        seasonal
    } = recipe;

    const labels = [type, ...category, ...difficulty, ...seasonal];

    return (
        <div className='container app-page'>

            <div className='container recipe-header'>
                <h2>{title}</h2>
                <div className='labels'>
                    {labels.map(l => <span key={l} className='badge rounded-pill bg-primary label'>{l}</span>)}
                </div>
                <span>Preparation time: {preparationTime}</span>
                <span>Time to cook: {timeToCook}</span>
            </div>

            <div className='container recipe-ingredients'>
                <h2>{servingPortions}</h2>
                <ul className='ingredients'>
                    {ingredients.map(i =>
                        <li key={i.id} className='ingredient'>
                            {i.name}: {i.quantity} {i.units}
                        </li>
                    )}
                </ul>
            </div>

            <img src={imageUrl} alt='' />

            <div className='container steps'>

                <div className="accordion">
                    {steps.map((step, i) =>
                        <Step
                            key={step.id}
                            number={i}
                            title={step.title}
                            description={step.description}
                        />
                    )}
                </div>
            </div>

        </div>
    );
}

const Step = ({
    id,
    number,
    title,
    description
}) => {
    return (
        <div className='accordion-item' id={id}>
            <h2 className='accordion-header' id={`step-title-${id}`}>
                <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#step-description-${id}`}
                    aria-expanded='true'
                    aria-controls={`step-description-${id}`}
                >
                    Step #{number}: {title}
                </button>
            </h2>
            <div
                id={`step-description-${id}`}
                className='accordion-collapse collapse show'
                aria-labelledby={`step-title-${id}`}
            >
                <div className='accordion-body'>
                    {description}
                </div>
            </div>
        </div>
    );
}


export default Details;