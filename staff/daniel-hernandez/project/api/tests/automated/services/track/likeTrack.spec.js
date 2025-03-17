import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Track, User, Log } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import constants from 'com/constants.js';
import likeTrack from '../../../../services/track/likeTrack.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('likeTrack', () => {
   before(async () => mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([User.deleteMany(), Track.deleteMany(), Log.deleteMany()]));

   it('succeeds when it likes a track (adds it to users likedTracks) and logs it successfully', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);
      const track = await Track.create({ name: 'summertime_2007', addedBy: user1.id, duration: 138.6 });

      await likeTrack(user2.id, track.id);

      const updatedUser = await User.findById(user2.id);
      expect(updatedUser.likedTracks).to.include(track.id);

      const logEntry = await Log.findOne({ user: user2.id, type: constants.LIKED_TRACK });
      expect(logEntry.user.toString()).to.equal(user2.id);
      expect(logEntry.type).to.equal(constants.LIKED_TRACK);
      expect(logEntry.track.toString()).to.equal(track.id);
   });

   it('succeeds when it dislikes a track (removes it from users likedTracks) and logs it successfully', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user1 = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const track = await Track.create({ name: 'summertime_2007', addedBy: user1.id, duration: 138.6 });

      const user2 = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, likedTracks: [track.id] });

      await likeTrack(user2.id, track.id);

      const updatedUser = await User.findById(user2.id);
      expect(updatedUser.likedTracks).to.not.include(track.id);

      const logEntry = await Log.findOne({ user: user2.id, type: constants.DISLIKED_TRACK });
      expect(logEntry.user.toString()).to.equal(user2.id);
      expect(logEntry.type).to.equal(constants.DISLIKED_TRACK);
      expect(logEntry.track.toString()).to.equal(track.id);
   });

   it('fails if the user does not exist', async () => {
      await expect(likeTrack('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102c')).to.be.rejectedWith(CredentialError, 'User does not exist');
   });

   it('fails when the target track does not exist', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });

      await expect(likeTrack(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(NotFoundError, 'Target track does not exist');
   });

   it("fails when the user who added the track isn't found", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const track = await Track.create({ name: 'summertime_2007', addedBy: '66b2cebc5621e4111875102c', duration: 138.6 });

      await expect(likeTrack(user.id, track.id)).to.be.rejectedWith(NotFoundError, 'User who added the track not found');
   });

   it('fails when the owner (addedBy) tries to like their own track', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const track = await Track.create({ name: 'summertime_2007', addedBy: user.id, duration: 138.6 });

      await expect(likeTrack(user.id, track.id)).to.be.rejectedWith(InvalidArgumentError, 'You cannot like your own track');
   });

   it('fails with SystemError on database error during user search', async () => {
      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(likeTrack('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Liking the track failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database error during track search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });

      const findById = Track.findById;
      Track.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(likeTrack(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Failed to like track: Database connection error');

      Track.findById = findById;
   });

   it('fails with SystemError on database error during like status search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);
      const track = await Track.create({ name: 'summertime_2007', addedBy: user1.id, duration: 138.6 });

      const exists = User.exists;
      User.exists = () => {
         throw new Error('Database connection error');
      };

      await expect(likeTrack(user2.id, track.id)).to.be.rejectedWith(SystemError, 'Failed to check if user has liked track: Database connection error');

      User.exists = exists;
   });

   it('fails with SystemError on database error during like status update', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);
      const track = await Track.create({ name: 'summertime_2007', addedBy: user1.id, duration: 138.6 });

      const updateOne = User.updateOne;
      User.updateOne = () => {
         throw new Error('Database connection error');
      };

      await expect(likeTrack(user2.id, track.id)).to.be.rejectedWith(SystemError, 'Failed to like track: Database connection error');

      User.updateOne = updateOne;
   });

   it('fails when inputs are not provided', () => {
      expect(() => likeTrack()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when user id is invalid', () => {
      expect(() => likeTrack('asdfsdfs', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the track id is invalid', () => {
      expect(() => likeTrack('66b2cebc5621e4111875102c', 'asdfasdfasdf')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Track.deleteMany(), Log.deleteMany()]);
      await mongoose.disconnect();
   });
});
