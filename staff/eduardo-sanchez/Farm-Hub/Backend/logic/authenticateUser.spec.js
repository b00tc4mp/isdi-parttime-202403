import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { expect } from 'chai';

import { User } from '../data/index.js';
import authenticateUser from './authenticateUser.js';
import { CredentialsError, ContentError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;

describe('authenticateUser', () => {
    before(() =>
        mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany())
    );

    beforeEach(() => User.deleteMany());

    it('succeeds on existing user', () =>
        bcrypt
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
            .then(() => authenticateUser('linux', '123123123'))
            .then((userId) => {
                expect(userId).to.be.a.string;
                expect(userId).to.have.lengthOf(24);
            }));

    it('fails on non-existing user', () => {
        let errorThrown;

        return authenticateUser('notregisteredUser', '123123123')
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError);
                expect(errorThrown.message).to.equal('user not found');
            });
    });

    it('fails on existing user by wrong password', () => {
        let errorThrown;

        return bcrypt
            .hash('234234234', 8)
            .then((hash) =>
                User.create({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash,
                })
            )
            .then(() => authenticateUser('linux', '123123123'))
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(CredentialsError);
                expect(errorThrown.message).to.equal('Wrong password');
            });
    });

    it('fails on invalid username', () => {
        let errorThrown;

        try {
            authenticateUser(1234567890, '123123123');
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
            authenticateUser('someuser', '123');
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('password is not valid');
        }
    });

    after(() => User.deleteMany().then(() => mongoose.disconnect()));
});
