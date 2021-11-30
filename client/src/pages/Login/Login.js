import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../../components'

import * as authService from '../../services/authService';

import AuthContext from '../../context/AuthContext';

const Login = () => {

    const auth = React.useContext(AuthContext);

    const navigate = useNavigate();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const login = async () => {
            try {
                await authService.login(username, password);

                setUsername('');
                setPassword('');

                auth.login(username);

                navigate('/');
            } catch (err) {
                console.error(err);
            }
        }

        login();
    }

    return (
        <div className='container app-page'>
            <form id='app-form' onSubmit={handleSubmit}>
                <TextField
                    id={'login-username'}
                    label='Username'
                    onChange={setUsername}
                >
                    {username}
                </TextField>
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
                    disabled={username === '' || password === ''}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;