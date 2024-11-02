import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { expect } from 'chai';

import { User } from '../data/index.js';

import registerUser from './registerUser.js';
import { ContentError, DuplicityError, MatchError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;

describe('registerUser', () => {
    before(() =>
        mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany())
    );

    beforeEach(() => User.deleteMany());

    it('succeeds on new user', () =>
        registerUser(
            'Li',
            'Nux',
            'li@nux.com',
            'linux',
            '123123123',
            '123123123'
        )
            .then(() => User.findOne())
            .then((user) => {
                expect(user.name).to.equal('Li');
                expect(user.surname).to.equal('Nux');
                expect(user.email).to.equal('li@nux.com');
                expect(user.username).to.equal('linux');

                return bcrypt.compare('123123123', user.password);
            })
            .then((match) => expect(match).to.be.true));

    it('fails on existing user', () => {
        let errorThrown;

        return bcrypt
            .hash('123123123', 8)
            .then((hash) =>
                User.create({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash,
                })
            )
            .then(() =>
                registerUser(
                    'Li',
                    'Nux',
                    'li@nux.com',
                    'linux',
                    '123123123',
                    '123123123'
                )
            )
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError);
                expect(errorThrown.message).to.equal('User already exists');
            });
    });

    it('fails on invalid name', () => {
        let errorThrown;
        try {
            registerUser(
                1111,
                'Nux',
                'li@nux.com',
                'linux',
                '123123123',
                '123123123'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('name is not valid');
        }
    });

    it('fails on invalid surname', () => {
        let errorThrown;
        try {
            registerUser(
                'Li',
                1111,
                'li@nux.com',
                'linux',
                '123123123',
                '123123123'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('surname is not valid');
        }
    });

    it('fails on invalid email', () => {
        let errorThrown;
        try {
            registerUser(
                'Li',
                'Nux',
                'linux.com',
                'linux',
                '123123123',
                '123123123'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('email is not valid');
        }
    });

    it('fails on invalid username', () => {
        let errorThrown;
        try {
            registerUser(
                'Li',
                'Nux',
                'li@nux.com',
                1111,
                '123123123',
                '123123123'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('username is not valid');
        }
    });

    it('fails on invalid password', () => {
        let errorThrown;
        try {
            registerUser(
                'Li',
                'Nux',
                'li@nux.com',
                'linux',
                111111111,
                '123123123'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('password is not valid');
        }
    });

    it('fails on non-matching password repeat', () => {
        let errorThrown;
        try {
            registerUser(
                'Li',
                'Nux',
                'li@nux.com',
                'linux',
                '123123123',
                '111111111'
            );
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError);
            expect(errorThrown.message).to.equal("passwords don't match");
        }
    });

    after(() => User.deleteMany().then(() => mongoose.disconnect()));
});
