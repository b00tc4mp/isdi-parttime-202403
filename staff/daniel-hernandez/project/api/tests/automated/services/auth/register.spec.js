import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User, Log } from '../../../../data/index.js';
import { DuplicateEntryError, InvalidArgumentError, SystemError } from 'com/errors.js';
import register from '../../../../services/auth/register.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('register', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([User.deleteMany(), Log.deleteMany()]));

   it('succeeds when the user exists after registering and is logged correctly', async () => {
      await expect(register('asuka@soryu.com', 'Neon-Genesis02', 'eva02')).to.be.fulfilled;

      const user = await expect(User.findOne({ email: 'asuka@soryu.com' })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(user).to.have.property('email').that.equals('asuka@soryu.com');
      expect(user).to.have.property('username').that.equals('eva02');
      await expect(bcrypt.compare('Neon-Genesis02', user.passwordHash)).to.eventually.be.true;

      const logEntry = await expect(Log.findOne({ type: constants.REGISTERED })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry).to.have.property('type').that.equals(constants.REGISTERED);
   });

   it('fails when the user already exists (email)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      await User.create({ email: 'asuka@soryu.com', passwordHash: hash, username: 'eva02' });

      await expect(register('asuka@soryu.com', 'Neon-Genesis02', 'Evangelion_02')).to.be.rejectedWith(DuplicateEntryError, 'User already exists');
   });

   it('fails when the user already exists (username)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      await User.create({ email: 'asuka@soryu.com', passwordHash: hash, username: 'eva02' });

      await expect(register('asuka@langley.com', 'Neon-Genesis02', 'eva02')).to.be.rejectedWith(DuplicateEntryError, 'User already exists');
   });

   it('fails with SystemError on database failiure during user search', async () => {
      const findOne = User.findOne;
      User.findOne = () => {
         throw new Error('Database connection error');
      };

      await expect(register('asuka@soryu.com', 'Neon-Genesis02', 'eva02')).to.be.rejectedWith(SystemError, 'Register failed: Database connection error');

      User.findOne = findOne;
   });

   it('fails with SystemError on database failure during user creation', async () => {
      const create = User.create;
      User.create = () => {
         throw new Error('Database connection error');
      };

      await expect(register('asuka@soryu.com', 'Neon-Genesis02', 'eva02')).to.be.rejectedWith(SystemError, 'Register failed: Database connection error');

      User.create = create;
   });

   it('fails with SystemError on bcrypt failure', async () => {
      const bcryptHash = bcrypt.hash;
      bcrypt.hash = () => {
         throw new Error('bcrypt error');
      };

      await expect(register('asuka@soryu.com', 'Neon-Genesis02', 'eva02')).to.be.rejectedWith(SystemError, 'Register failed: bcrypt error');

      bcrypt.hash = bcryptHash;
   });

   it('fails when all fields are empty', () => {
      expect(() => register()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the email field is empty', () => {
      expect(() => register('', 'Neon-Genesis02', 'eva02')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the password field is empty', () => {
      expect(() => register('asuka@soryu.com', '', 'eva02')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the username field is empty', () => {
      expect(() => register('asuka@soryu.com', 'Neon-Genesis02', '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the email is invalid', () => {
      expect(() => register('asuka@langley', 'Neon-Genesis02', 'eva02')).to.throw(InvalidArgumentError, 'Invalid email');
   });

   it('fails when the password is invalid', () => {
      expect(() => register('asuka@langley.com', 'NeonGenesis02.', 'eva02')).to.throw(InvalidArgumentError, 'Invalid password');
   });

   it('fails when the username is invalid', () => {
      expect(() => register('asuka@soryu.com', 'Neon-Genesis02', 'eva-02')).to.throw(InvalidArgumentError, 'Invalid username');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Log.deleteMany()]);
      await mongoose.disconnect();
   });
});
