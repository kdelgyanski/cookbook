import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../../components'
import Page from '../Page';

import * as authService from '../../services/authService';

import AuthContext from '../../context/AuthContext';

import './Login.css';

const Login = () => {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();

        if (isLoginMode) {
            const login = async () => {
                try {
                    const responseData = await authService.login(username, password);

                    setUsername('');
                    setPassword('');

                    auth.login(responseData.userId, responseData.username, responseData.token);

                    navigate(`/${responseData.userId}/my-kitchen`);
                } catch (err) {
                    console.error(err);
                    setError(err.message);
                }
            }

            login();
        } else {
            const signUp = async () => {
                try {
                    const responseData = await authService.signUp(username, email, password);

                    setUsername('');
                    setEmail('');
                    setPassword('');

                    auth.login(responseData.userId, responseData.username, responseData.token);

                    navigate('/');
                } catch (err) {
                    console.error(err);
                    setError(err.message);
                }
            }

            signUp();
        }
    }

    return (
        <Page
            className='login-page'
            error={error}
            onErrorClose={() => setError(null)}
        >
            <form
                id='app-form'
                className='app-form'
                onSubmit={handleSubmit}
            >
                <TextField
                    id={'login-username'}
                    label='Username'
                    onChange={setUsername}
                >
                    {username}
                </TextField>
                {!isLoginMode && <TextField
                    id={'login-email'}
                    label='E-Mail'
                    onChange={setEmail}
                >
                    {email}
                </TextField>}
                <TextField
                    id={'login-password'}
                    label='Password'
                    type='password'
                    onChange={setPassword}
                >
                    {password}
                </TextField>
                <div className='buttons'>
                    <button
                        className='btn btn-primary'
                        disabled={isLoginMode ? username === '' || password === '' : username === '' || password === '' || email === ''}
                    >
                        {isLoginMode ? 'Login' : 'Sign Up'}
                    </button>
                    <button
                        type='button'
                        id='switch-mode'
                        className='btn btn-primary'
                        onClick={() => setIsLoginMode(oldState => !oldState)}
                    >
                        Switch Mode
                    </button>
                </div>
            </form>
        </Page>
    );
}

export default Login;