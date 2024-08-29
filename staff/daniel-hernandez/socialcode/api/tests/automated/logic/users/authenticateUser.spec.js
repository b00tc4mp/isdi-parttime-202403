import 'dotenv/config';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User } from '../../../../data/index.js';
import { ContentError, CredentialError } from 'com/errors.js';
import authenticateUser from '../../../../logic/users/authenticateUser.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('authenticateUser', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await User.deleteMany());

   it('succeeds when the user already exists', async () => {
      const hash = await bcryptjs.hash('123123123', 8);
      await User.create({
         name: 'Rei',
         surname: 'Ayanami',
         email: 'rei@ayanami.com',
         username: 'eva00',
         password: hash
      });

      await expect(authenticateUser('eva00', '123123123')).to.eventually.be.a('string').and.have.lengthOf(24);
   });

   it('fails when the user does not exist', async () => {
      await expect(authenticateUser('nonexistent', '123123123')).to.be.rejectedWith(CredentialError, 'user not found');
   });

   it('fails when the password is incorrect', async () => {
      const hash = await bcryptjs.hash('123123123', 8);
      await User.create({
         name: 'Rei',
         surname: 'Ayanami',
         email: 'rei@ayanami.com',
         username: 'eva00',
         password: hash
      });

      await expect(authenticateUser('eva00', 'wrongpassword')).to.be.rejectedWith(CredentialError, 'wrong password');
   });

   it('fails when the username is invalid', () => {
      expect(() => authenticateUser(123123123, '123123123')).to.throw(ContentError, 'Username is not valid');
   });

   it('fails when the password is invalid', () => {
      expect(() => authenticateUser('someone', '1231231')).to.throw(ContentError, 'Password is not valid');
   });

   after(async () => {
      await User.deleteMany();
      await mongoose.disconnect();
   });
});
