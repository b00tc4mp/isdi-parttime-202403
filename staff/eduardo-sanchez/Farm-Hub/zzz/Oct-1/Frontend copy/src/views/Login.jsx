import { useNavigate, Link } from 'react-router-dom';

import logic from '../logic';

import Field from '../components/core/Field/Field';
import Button from '../components/core/Button/Button';
import Title from '../components/core/Title/Title';

import { SystemError } from 'com/errors';

import useContext from '../useContext';

import './Login.css';

export const Login = () => {
    const { alert } = useContext();

    const navigate = useNavigate();

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const username = form.username.value;
        const password = form.password.value;

        try {
            logic
                .loginUser(username, password)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    if (error instanceof SystemError) {
                        alert(error.message);

                        return;
                    }
                    alert('Invalid credentials');
                });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <Title className="text-4xl text-green-300">Farm-Hub</Title>

            <form className="LoginForm" onSubmit={handleLoginSubmit}>
                <Title>Login</Title>

                <Field id="username" type="text" placeholder="username">
                    Username
                </Field>

                <Field id="password" type="password" placeholder="password">
                    Password
                </Field>

                <Button type="submit">Login</Button>
            </form>
            <Link className="Link" to="/register">
                Register
            </Link>
        </div>
    );
};
