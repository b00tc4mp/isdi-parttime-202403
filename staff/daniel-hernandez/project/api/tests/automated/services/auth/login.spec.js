import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Log, User } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, SystemError } from 'com/errors.js';
import login from '../../../../services/auth/login.js';
import log from '../../../../services/log.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('login', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([User.deleteMany(), Log.deleteMany()]));

   it('succeeds when the user exists, the password is correct and is logged correctly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(login('asuka@soryu.com', 'Neon-Genesis02')).to.eventually.be.a('string').and.have.lengthOf(24);

      const logEntry = await expect(Log.findOne({ type: constants.LOGGED_IN })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry).to.have.property('type').that.equals(constants.LOGGED_IN);
   });

   it("fails when the user doesn't exist", async () => {
      await expect(login('asuka@soryu.com', 'Neon-Genesis02')).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it('fails when the password is incorrect', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(login('asuka@soryu.com', 'Neon-Genesis03')).to.be.rejectedWith(CredentialError, 'Wrong password');
   });

   it('fails with SystemError on database failure', async () => {
      const findOne = User.findOne;
      User.findOne = () => {
         throw new Error('Database connection error');
      };

      await expect(login('asuka@soryu.com', 'Neon-Genesis02')).to.be.rejectedWith(SystemError, 'Login failed: Database connection error');

      User.findOne = findOne;
   });

   it('fails with SystemError on bcrypt error', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const bcryptCompare = bcrypt.compare;
      bcrypt.compare = () => {
         throw new Error('bcrypt error');
      };

      await expect(login('asuka@soryu.com', 'Neon-Genesis02')).to.be.rejectedWith(SystemError, 'Login failed: bcrypt error');

      bcrypt.compare = bcryptCompare;
   });

   it('fails if all fields are empty', () => {
      expect(() => login()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when when the email field is empty', () => {
      expect(() => login('', 'Neon-Genesis02')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when when the password field is empty', () => {
      expect(() => login('asuka@soryu.com', '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the email is invalid', () => {
      expect(() => login('asuka@soryu', 'Neon-Genesis02')).to.throw(InvalidArgumentError, 'Invalid email');
   });

   it('fails when the password is invalid', () => {
      expect(() => login('asuka@soryu.com', 'NeonGenesis02')).to.throw(InvalidArgumentError, 'Invalid password');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Log.deleteMany()]);
      await mongoose.disconnect();
   });
});
