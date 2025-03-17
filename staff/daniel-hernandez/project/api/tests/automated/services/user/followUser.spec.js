import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User, Log } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import followUser from '../../../../services/user/followUser.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('followUser', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([User.deleteMany(), Log.deleteMany()]));

   it('succeeds when the user is followed and logged accordingly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);

      await expect(followUser(user1.id, user2.id)).to.be.fulfilled;

      const [updatedUser1, updatedUser2] = await Promise.all([User.findById(user1.id), User.findById(user2.id)]);
      expect(updatedUser1).to.have.property('following').that.includes(user2.id);
      expect(updatedUser2).to.have.property('followers').that.includes(user1.id);

      const logEntry = await expect(Log.findOne({ user: user1.id, type: constants.FOLLOWED_USER })).to.eventually.be.a('object');
      expect(logEntry).to.not.be.null;
      expect(logEntry.user.toString()).to.equal(user1.id);
      expect(logEntry.type).to.equal(constants.FOLLOWED_USER);
      expect(logEntry.targetUser.toString()).to.equal(user2.id);
   });

   it('succeeds when the user is unfollowed and logged accordingly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);
      await Promise.all([User.findByIdAndUpdate(user1.id, { $push: { following: user2.id } }), User.findByIdAndUpdate(user2.id, { $push: { followers: user1.id } })]);

      await expect(followUser(user1.id, user2.id)).to.be.fulfilled;

      const [updatedUser1, updatedUser2] = await Promise.all([User.findById(user1.id), User.findById(user2.id)]);
      expect(updatedUser1).to.have.property('following').that.does.not.include(user2.id);
      expect(updatedUser2).to.have.property('followers').that.does.not.include(user1.id);

      const logEntry = await expect(Log.findOne({ user: user1.id, type: constants.UNFOLLOWED_USER })).to.eventually.be.a('object');
      expect(logEntry).to.not.be.null;
      expect(logEntry.user.toString()).to.equal(user1.id);
      expect(logEntry.type).to.equal(constants.UNFOLLOWED_USER);
      expect(logEntry.targetUser.toString()).to.equal(user2.id);
   });

   it("fails when the user doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user2 = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(followUser('66b2cebc5621e4111875102c', user2.id)).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it("fails when the target user doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user1 = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });

      await expect(followUser(user1.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(NotFoundError, "Target user doesn't exist");
   });

   it('fails when the user tries to follow themselves', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(followUser(user.id, user.id)).to.be.rejectedWith(InvalidArgumentError, 'You cannot follow yourself !');
   });

   it('fails with SystemError on database failure during user search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);

      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(followUser(user1.id, user2.id)).to.be.rejectedWith(SystemError, 'Follow failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database failure during target user search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);

      const findById = User.findById;
      let findByIdCallCount = 0;
      User.findById = function (id) {
         findByIdCallCount++;
         if (findByIdCallCount === 2) {
            throw new Error('Database connection error');
         }

         return findById.call(this, id);
      };

      await expect(followUser(user1.id, user2.id)).to.be.rejectedWith(SystemError, 'Follow failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database failure during follow update', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);

      const updateOne = User.updateOne;
      User.updateOne = () => {
         throw new Error('Database connection error');
      };

      await expect(followUser(user1.id, user2.id)).to.be.rejectedWith(SystemError, 'Failed to follow user: Database connection error');

      User.updateOne = updateOne;
   });

   it('fails when all fields are empty', () => {
      expect(() => followUser('', '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the user id is missing', () => {
      expect(() => followUser('', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the target user id is missing', () => {
      expect(() => followUser('66b2cebc5621e4111875102c', '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the user id is invalid', () => {
      expect(() => followUser('66b2cebc5621e4111875102cx', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the target user id is invalid', () => {
      expect(() => followUser('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102cx')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Log.deleteMany()]);
      await mongoose.disconnect();
   });
});
