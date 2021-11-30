import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, ErrorModal } from '../../components'

import * as authService from '../../services/authService';

import AuthContext from '../../context/AuthContext';

const Login = () => {

    const auth = React.useContext(AuthContext);

    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isLoginMode, setIsLoginMode] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSubmit = e => {
        e.preventDefault();

        if (isLoginMode) {
            const login = async () => {
                try {
                    const responseData = await authService.login(username, password);

                    setUsername('');
                    setPassword('');

                    auth.login(responseData.userId, responseData.token);

                    navigate('/');
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

                    auth.login(responseData.userId, responseData.token);

                    navigate('/');
                } catch (err) {
                    console.error(err);
                    setError(err.message);
                }
            }

            signUp();
        }
    }

    const switchModeHandler = () => {
        setIsLoginMode(oldState => !oldState);
    };

    return (
        <div className='container app-page'>
            {error && <ErrorModal message={error} onClose={() => setError(null)} />}
            <form id='app-form' onSubmit={handleSubmit}>
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
                <button
                    className='btn btn-primary'
                    disabled={isLoginMode ? username === '' || password === '' : username === '' || password === '' || email === ''}
                >
                    {isLoginMode ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <button
                id='switch-mode'
                className='btn btn-primary'
                onClick={switchModeHandler}
            >
                Switch Mode
            </button>
        </div>
    );
}

export default Login;