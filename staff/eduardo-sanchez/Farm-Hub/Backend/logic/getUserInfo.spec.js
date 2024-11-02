import 'dotenv/config';
import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

import { expect } from 'chai';
import { Ad, User } from '../data/index.js';
import getUserInfo from './getUserInfo.js';
import { NotFoundError, ContentError, CredentialsError } from 'com/errors.js';

const { MONGODB_URL_TEST } = process.env;
const { ObjectId } = Types;

describe('getUserInfo', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    );

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]));

    it('succeeds on getting user info', () => {
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
            .then((user) => getUserInfo(user.id))
            .then((user) => {
                expect(user).to.be.an('object');
                expect(user).to.have.property('name', 'Li');
                expect(user).to.have.property('surname', 'Nux');
                expect(user).to.have.property('email', 'li@nux.com');
                expect(user).to.have.property('username', 'linux');
            });
    });

    it('fails on non-existing user', () => {
        let errorThrown;

        return getUserInfo(new ObjectId().toString())
            .catch((error) => (errorThrown = error))
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError);
                expect(errorThrown.message).to.equal('user not found');
            });
    });

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
});
