import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User } from '../../../../data/index.js';
import { InvalidArgumentError, SystemError } from 'com/errors.js';
import checkEmail from '../../../../services/auth/checkEmail.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('checkEmail', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await User.deleteMany());

   it('succeeds when it returns true when the user exists', async () => {
      const hash = await bcrypt.hash('NeonGenesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(checkEmail(user.email)).to.eventually.be.true;
   });

   it("succeeds when it returns false when the user doesn't exist", async () => {
      await expect(checkEmail('asuka@soryu.com')).to.eventually.be.false;
   });

   it('fails with SystemError on database error', async () => {
      const findOne = User.findOne;
      User.findOne = () => {
         throw new Error('Database connection error');
      };

      await expect(checkEmail('valid@email.com')).to.be.rejectedWith(SystemError, 'Database connection error');

      User.findOne = findOne;
   });

   it('fails when the input is not provided', () => {
      expect(() => checkEmail()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the email proveded is invalid', () => {
      expect(() => checkEmail('invalid email')).to.throw(InvalidArgumentError, 'Invalid email');
   });

   after(async () => {
      await User.deleteMany();
      await mongoose.disconnect();
   });
});
