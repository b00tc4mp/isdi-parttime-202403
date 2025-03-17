import 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User, Log, Playlist } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import followPlaylist from '../../../../services/playlist/followPlaylist.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('followPlaylist', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([User.deleteMany(), Log.deleteMany(), Playlist.deleteMany()]));

   it('succeeds when the playlist is followed and logged accordingly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const playlist = await Playlist.create({ name: 'Neon', owner: user._id, tracks: [], coverArt: 'htt' });

      await expect(followPlaylist(user.id, playlist.id)).to.be.fulfilled;

      const [updatedUser, updatedPlaylist] = await Promise.all([User.findById(user.id), Playlist.findById(playlist.id)]);
      expect(updatedUser).to.have.property('followingPlaylists').that.includes(playlist.id);
      expect(updatedPlaylist).to.have.property('followers').that.equals(1);

      const logEntry = await expect(Log.findOne({ user: user.id, type: constants.FOLLOWED_PLAYLIST })).to.eventually.be.a('object');
      expect(logEntry).to.exist;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.FOLLOWED_PLAYLIST);
      expect(logEntry.playlist.toString()).to.equal(playlist.id);
   });

   it('succeeds when the playlist is unfollowed and logged accordingly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const playlist = await Playlist.create({ name: 'Neon', owner: user._id, tracks: [], followers: 3, coverArt: 'htt' });

      user.followingPlaylists = [playlist._id];
      await user.save();

      await expect(followPlaylist(user.id, playlist.id)).to.be.fulfilled;

      const [updatedUser, updatedPlaylist] = await Promise.all([User.findById(user.id), Playlist.findById(playlist.id)]);
      expect(updatedUser).to.have.property('followingPlaylists').that.does.not.include(playlist.id);
      expect(updatedPlaylist).to.have.property('followers').that.equals(2);

      const logEntry = await expect(Log.findOne({ user: user.id, type: constants.UNFOLLOWED_PLAYLIST })).to.eventually.be.a('object');
      expect(logEntry).to.exist;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.UNFOLLOWED_PLAYLIST);
      expect(logEntry.playlist.toString()).to.equal(playlist.id);
   });

   it("fails when the user doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const playlist = await Playlist.create({ name: 'Neon', owner: user._id, tracks: [], coverArt: 'htt' });

      await expect(followPlaylist('66b2cebc5621e4111875102c', playlist.id)).to.be.rejectedWith(CredentialError, 'User does not exist');
   });

   it('fails when the playlist does not exist', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });

      await expect(followPlaylist(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(NotFoundError, 'Playlist does not exist');
   });

   it('fails when the playlist to be followed it not public', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const playlist = await Playlist.create({ name: 'Neon', public: false, owner: user._id, tracks: [], coverArt: 'htt' });

      await expect(followPlaylist(user.id, playlist.id)).to.be.rejectedWith(CredentialError, 'Cannot follow a private playlist');
   });

   it('fails with SystemError on database failiure during user search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });

      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(followPlaylist(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Follow failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database failiure during playlist search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });

      const findById = Playlist.findById;
      Playlist.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(followPlaylist(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Follow failed: Database connection error');

      Playlist.findById = findById;
   });

   it('fails with SystemError on database failiure during follow update (user)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const playlist = await Playlist.create({ name: 'Neon', owner: user._id, tracks: [], coverArt: 'htt' });

      const updateOne = User.updateOne;
      User.updateOne = () => {
         throw new Error('Database connection error');
      };

      await expect(followPlaylist(user.id, playlist.id)).to.be.rejectedWith(SystemError, 'Failed to follow playlist: Database connection error');

      User.updateOne = updateOne;
   });

   it('fails with SystemError on database failiure during follow update (playlist)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash });
      const playlist = await Playlist.create({ name: 'Neon', owner: user._id, tracks: [], coverArt: 'htt' });

      const updateOne = Playlist.updateOne;
      Playlist.updateOne = () => {
         throw new Error('Database connection error');
      };

      await expect(followPlaylist(user.id, playlist.id)).to.be.rejectedWith(SystemError, 'Failed to follow playlist: Database connection error');

      Playlist.updateOne = updateOne;
   });

   it('fails when all fields are empty', () => {
      expect(() => followPlaylist()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the user id is missing', () => {
      expect(() => followPlaylist(null, 'playlistid')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the playlist id is missing', () => {
      expect(() => followPlaylist('userid', null)).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the user id is invalid', () => {
      expect(() => followPlaylist('66b2cebc5621e4111875102cx', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the playlist id is invalid', () => {
      expect(() => followPlaylist('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102cx')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Playlist.deleteMany(), Log.deleteMany()]);
      await mongoose.disconnect();
   });
});
