import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as recipeService from '../../services/recipeService';

import AuthContext from '../../context/AuthContext';

import { Badge, ErrorModal, Modal } from '../../components';
import Ingredients from '../CreateRecipe/Ingredients';
import Steps from '../CreateRecipe/Steps';

import './Details.css';

import defaultImage from '../../assets/images/no_image.svg';

const Details = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [recipe, setRecipe] = React.useState(null);
    const [labels, setLabels] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const recipeId = useParams().id;

    React.useEffect(() => {
        const getRecipe = async () => {

            try {
                const response = await recipeService.getById(recipeId);
                setRecipe(response);
                setLabels([response.course, response.difficulty, ...response.category, ...response.seasonal]);
            } catch (err) {
                console.log(err);
            }

        };

        getRecipe();
    }, [recipeId]);

    const handleDelete = async () => {

        try {
            await recipeService.deleteRecipe(recipeId, auth.token);
            navigate(`/${auth.userId}/my-kitchen`);
        } catch (err) {
            setError(err.message);
        }

        setShowDeleteModal(false);

    };

    return (
        <>
            {showDeleteModal && <Modal
                id='delete-recipe-modal'
                className='delete-recipe-modal'
                title='Delete Recipe'
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            >
                <p>Are you sure you want to delete this recipe?</p>
            </Modal>}
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            {recipe && <div className='container details'>

                <div className='recipe-header'>
                    <div className='infos-container'>
                        <h2>{recipe.title}</h2>
                        <div className='labels'>
                            {labels.map((l, i) => <Badge key={i} >{l}</Badge>)}
                        </div>
                        <span>Preparation time: {recipe.preparationTime}</span>
                        <span>Time to cook: {recipe.timeToCook}</span>
                        <div className='recipe-ingredients'>
                            <h2>Serving portions: {recipe.servingPortions}</h2>
                            <Ingredients>{recipe.ingredients}</Ingredients>
                        </div>
                    </div>
                    <div className='image-container'>
                        <img
                            className='img-fluid preview-img'
                            src={recipe.image ? `http://localhost:8000/${recipe.image}` : defaultImage}
                            alt='Default'
                        />
                    </div>
                </div>

                <div className='recipe-steps'>
                    <Steps>{recipe.steps}</Steps>
                </div>

                {auth.userId === recipe.authorId && <button
                    type='button'
                    className='btn btn-primary delete-recipe-btn'
                    onClick={() => setShowDeleteModal(true)}
                >
                    Delete
                </button>}

                {auth.userId === recipe.authorId && <button
                    type='button'
                    className='btn btn-primary edit-recipe-btn'
                    onClick={() => {
                        navigate(`/edit-recipe/${recipe.id}`, { initialRecipe: recipe })
                        console.log('edit');
                    }}
                >
                    Edit
                </button>}

            </div>}
        </>
    );
};

export default Details;