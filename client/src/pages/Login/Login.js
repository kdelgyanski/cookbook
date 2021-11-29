import React from 'react';
import { TextField } from '../../components'

const Login = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = e => {
        e.preventDefault();

        // TODO: send request to login

        setUsername('');
        setPassword('');
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