import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const CreateRecipe = () => {

    const auth = useContext(AuthContext);

    return (
        <div className='container app-page'>
            This is the CreateRecipe Page: {auth.userId}
        </div>
    );
}

export default CreateRecipe;