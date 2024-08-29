import 'dotenv/config';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User } from '../../../../data/index.js';
import { ContentError, DuplicityError, MatchError } from 'com/errors.js';
import createUser from '../../../../logic/users/createUser.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('createUser', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await User.deleteMany());

   it('succeeds when the user is created', async () => {
      await expect(createUser('Shinji', 'Ikari', 'shinji@ikari.com', 'eva01', '123123123', '123123123')).to.be
         .fulfilled;

      const user = await User.findOne({ email: 'shinji@ikari.com' });
      expect(user).to.not.be.null;
      expect(user.name).to.equal('Shinji');
      expect(user.surname).to.equal('Ikari');
      expect(user.email).to.equal('shinji@ikari.com');
      expect(user.username).to.equal('eva01');
      expect(await bcryptjs.compare('123123123', user.password)).to.be.true;
   });

   it('fails when the username already exists', async () => {
      const hash = await bcryptjs.hash('123123123', 8);
      await User.create({
         name: 'Asuka',
         surname: 'Soryu',
         email: 'asuka@soryu.com',
         username: 'eva02',
         password: hash
      });

      await expect(
         createUser('Asuka', 'Clone', 'asuka@clone.com', 'eva02', '123123123', '123123123')
      ).to.be.rejectedWith(DuplicityError, 'Username or email already exist');
   });

   it('fails when the email already exists', async () => {
      const hash = await bcryptjs.hash('123123123', 8);
      await User.create({
         name: 'Asuka',
         surname: 'Soryu',
         email: 'asuka@soryu.com',
         username: 'eva02',
         password: hash
      });

      await expect(
         createUser('Asuka', 'Clone', 'asuka@soryu.com', 'eva_2', '123123123', '123123123')
      ).to.be.rejectedWith(DuplicityError, 'Username or email already exist');
   });

   it('fails when all the fields are empty', () => {
      expect(() => createUser()).to.throw(ContentError, 'All fields are required');
   });

   it('fails when the name is invalid', () => {
      expect(() => {
         createUser('123', 'Surname', 'email@email.com', 'Username', '123123123', '123123123');
      }).to.throw(ContentError, 'Name is not valid');
   });

   it('fails when the surname is invalid', () => {
      expect(() => {
         createUser('Name', '123', 'email@email.com', 'Username', '123123123', '123123123');
      }).to.throw(ContentError, 'Surname is not valid');
   });

   it('fails when the email is invalid', () => {
      expect(() => {
         createUser('Name', 'Surname', 'emailemailcom', 'Username', '123123123', '123123123');
      }).to.throw(ContentError, 'Email is not valid');
   });

   it('fails when the username is invalid', () => {
      expect(() => {
         createUser('Name', 'Surname', 'email@email.com', ')(*&!@)', '123123123', '123123123');
      }).to.throw(ContentError, 'Username is not valid');
   });

   it('fails when the password is invalid', () => {
      expect(() => {
         createUser('Name', 'Surname', 'email@email.com', 'Username', '123123', '123123123');
      }).to.throw(ContentError, 'Password is not valid');
   });

   it("fails when the passwords don't match", () => {
      expect(() => {
         createUser('Name', 'Surname', 'email@email.com', 'Username', '1231231231', '123123123');
      }).to.throw(MatchError, "Passwords don't match");
   });

   after(async () => {
      await User.deleteMany();
      await mongoose.disconnect();
   });
});
