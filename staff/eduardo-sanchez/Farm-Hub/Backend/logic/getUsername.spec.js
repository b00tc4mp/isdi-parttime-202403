import 'dotenv/config';
import mongoose, { Types } from 'mongoose';

import bcrypt from 'bcryptjs';

import getUsername from './getUsername.js';
import { User, Ad } from '../data/index.js';
import { NotFoundError, ContentError } from 'com/errors.js';

import { expect } from 'chai';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('logic - getUsername', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on getting Username from an existing user', () =>
        bcrypt
            .hash('123123123', 8)
            .then((hash) =>
                Promise.all([
                    User.create({
                        name: 'Li',
                        surname: 'Nux',
                        email: 'li@nux.com',
                        username: 'linux',
                        password: hash,
                    }),
                    User.create({
                        name: 'Soy',
                        surname: 'Untest',
                        email: 'soy@untest.com',
                        username: 'soyuntest',
                        password: hash,
                    }),
                ])
            )

            .then(([user, targetUser]) => getUsername(user.id, targetUser.id))
            .then((targetUser) => {
                expect(targetUser).to.be.an('object');
                expect(targetUser.name).to.equal('Soy');
                expect(targetUser.surname).to.equal('Untest');
                expect(targetUser.email).to.equal('soy@untest.com');
                expect(targetUser.username).to.equal('soyuntest');
                expect(targetUser.username).to.be.a('string');
                expect(targetUser).to.have.property('password');
            }));

    it('fails on non-existing user', () => {
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
            .then((targetUser) =>
                getUsername(new ObjectId().toString(), targetUser.id)
            )
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('user not found');
            });
    });

    it('fails on non-existing targetUser', () => {
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
            .then((user) => getUsername(user.id, new ObjectId().toString()))
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('targetUser not found');
            });
    });

    it('fails on invalid userId', () => {
        let errorThrown;

        try {
            getUsername('invalid-id', new ObjectId().toString());
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('userId is not valid');
        }
    });

    it('fails on invalid targetUserId', () => {
        let errorThrown;

        try {
            getUsername(new ObjectId().toString(), 'invalid-id');
        } catch (error) {
            errorThrown = error;
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError);
            expect(errorThrown.message).to.equal('targetUserId is not valid');
        }
    });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});
