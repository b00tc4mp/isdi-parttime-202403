import errors, { SystemError } from 'com/errors';
import validate from 'com/validate';

const registerUser = (
    name,
    surname,
    email,
    username,
    password,
    passwordRepeat
) => {
    validate.name(name);
    validate.name(surname, 'surname');
    validate.email(email);
    validate.username(username);
    validate.password(password);
    validate.passwordsMatch(password, passwordRepeat);

    const body = { name, surname, email, username, password, passwordRepeat };

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .catch(() => {
            throw new SystemError('server connection error');
        })
        .then((res) => {
            if (res.status === 201) {
                return;
            }

            return res
                .json()
                .catch(() => {
                    throw new SystemError('server connection error');
                })
                .then((body) => {
                    const { error, message } = body;

                    const constructor = errors[error];

                    throw new constructor(message);
                });
        });
};

export default registerUser;
