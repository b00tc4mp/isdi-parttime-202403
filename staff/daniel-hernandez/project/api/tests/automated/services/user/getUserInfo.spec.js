import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User, Log, Track, Album, Playlist } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import getUserInfo from '../../../../services/user/getUserInfo.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('getUserInfo', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([User.deleteMany(), Log.deleteMany(), Track.deleteMany(), Album.deleteMany(), Playlist.deleteMany()]));

   it('succeeds when it returns user info with popular and recent tracks, albums and playlists', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);

      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, followers: [], following: [] })]);
      user2.followers = [user1._id];
      user2.following = [user1._id];
      await user2.save();

      const now = new Date();
      const [track1, track2] = await Promise.all([Track.create({ name: 'Track 1', addedBy: user2.id, artists: [user2.id], duration: 200, createdAt: now }), Track.create({ name: 'Track 2', addedBy: user2.id, artists: [user2.id], duration: 180, createdAt: new Date(now.getTime() + 1000) })]);

      const [album, playlist, playlist2] = await Promise.all([
         Album.create({ name: 'Album', type: 'single', tracks: [track1.id], artists: [user2.id] }),
         Playlist.create({ name: 'Playlist', public: true, owner: user2.id, tracks: [track1._id, track2._id], followers: 10 }),
         Playlist.create({ name: 'Playlist', public: false, owner: user2.id, tracks: [track2._id, track1._id], followers: 0 })
      ]);

      track1.album = album._id;
      track2.album = album._id;
      await Promise.all([track1.save(), track2.save()]);

      await Promise.all([Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track1.id })]);

      const userInfo = await expect(getUserInfo(user1.id, user2.id)).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(userInfo).to.have.property('username').that.equals(user2.username);
      expect(userInfo).to.have.property('followers').that.equals(user2.followers.length.toString());
      expect(userInfo).to.have.property('following').that.equals(user2.following.length.toString());
      expect(userInfo).to.have.property('isFollowed').that.equals(user2.followers.includes(user1._id));
      expect(userInfo).to.have.property('id').that.equals(user2.id);
      expect(userInfo).to.have.property('profileImage').that.equals(user2.profileImage);

      expect(userInfo).to.have.nested.property('tracks.popular').that.is.an('array').with.lengthOf(2);
      expect(userInfo.tracks.popular[0]).to.include({ name: 'Track 2', duration: '180', plays: '2', id: track2.id, coverArt: '' });
      expect(userInfo.tracks.popular[0].artists).to.be.an('array').with.lengthOf(1);
      expect(userInfo.tracks.popular[0].artists[0]).to.include({ username: 'eva02', id: user2.id });
      expect(userInfo.tracks.popular[0].album).to.include({ name: 'Album', id: album.id });

      expect(userInfo.tracks.popular[1]).to.include({ name: 'Track 1', duration: '200', plays: '1', id: track1.id, coverArt: '' });
      expect(userInfo.tracks.popular[1].artists).to.be.an('array').with.lengthOf(1);
      expect(userInfo.tracks.popular[1].artists[0]).to.include({ username: 'eva02', id: user2.id });
      expect(userInfo.tracks.popular[1].album).to.include({ name: 'Album', id: album.id });

      expect(userInfo).to.have.nested.property('tracks.recent').that.is.an('array').with.lengthOf(2);
      expect(userInfo.tracks.recent[0]).to.include({ name: 'Track 2', duration: '180', id: track2.id, coverArt: '' });
      expect(userInfo.tracks.recent[0].artists).to.be.an('array').with.lengthOf(1);
      expect(userInfo.tracks.recent[0].artists[0]).to.include({ username: 'eva02', id: user2.id });
      expect(userInfo.tracks.recent[0].album).to.include({ name: 'Album', id: album.id });

      expect(userInfo.tracks.recent[1]).to.include({ name: 'Track 1', duration: '200', id: track1.id, coverArt: '' });
      expect(userInfo.tracks.recent[1].artists).to.be.an('array').with.lengthOf(1);
      expect(userInfo.tracks.recent[1].artists[0]).to.include({ username: 'eva02', id: user2.id });
      expect(userInfo.tracks.recent[1].album).to.include({ name: 'Album', id: album.id });

      expect(userInfo.tracks.popular.map(track => track.plays)).to.eql(['2', '1']);
      expect(userInfo.tracks.recent.map(track => track.id)).to.eql([track2.id, track1.id]);

      expect(userInfo).to.have.property('albums').that.is.an('array').with.lengthOf(1);
      expect(userInfo.albums[0]).to.include({ name: 'Album', id: album.id, coverArt: '' });
      expect(userInfo.albums[0].artists[0]).to.include({ username: 'eva02', id: user2.id });

      expect(userInfo).to.have.property('playlists').that.is.an('array').with.lengthOf(1);
      expect(userInfo.playlists).to.not.deep.include({
         name: 'Playlist',
         id: playlist2.id
      });
      expect(userInfo.playlists[0]).to.include({
         name: 'Playlist',
         id: playlist.id,
         followers: '10',
         duration: '380',
         tracks: '2'
      });
      expect(userInfo.playlists[0].owner).to.include({ username: 'eva02', id: user2.id });

      const logEntry = await expect(Log.findOne({ type: constants.VIEWED_USER_PROFILE })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.VIEWED_USER_PROFILE);
      expect(logEntry.targetUser.toString()).to.equal(user2.id);
   });

   it('returns empty arrays for users with no playlists, albums, or tracks', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, followers: [], following: [] })]);
      user2.following = [user1._id];
      await user2.save();

      const userInfo = await expect(getUserInfo(user1.id, user2.id)).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(userInfo).to.have.property('username').that.equals(user2.username);
      expect(userInfo).to.have.property('followers').that.equals(user2.followers.length.toString());
      expect(userInfo).to.have.property('following').that.equals(user2.following.length.toString());
      expect(userInfo).to.have.property('isFollowed').that.equals(user2.followers.includes(user1._id));
      expect(userInfo).to.have.property('id').that.equals(user2.id);
      expect(userInfo).to.have.property('profileImage').that.equals(user2.profileImage);

      expect(userInfo).to.have.property('playlists').that.is.an('array').with.lengthOf(0);
      expect(userInfo).to.have.property('albums').that.is.an('array').with.lengthOf(0);
      expect(userInfo).to.have.nested.property('tracks.popular').that.is.an('array').with.lengthOf(0);
      expect(userInfo).to.have.nested.property('tracks.recent').that.is.an('array').with.lengthOf(0);
   });

   it("fails when the user doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(getUserInfo('66b2cebc5621e4111875102c', user.id)).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it("fails when the target user doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(getUserInfo(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(NotFoundError, "Target user doesn't exist");
   });

   it('fails with SystemError on database error during user search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(getUserInfo(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Fetching user info failed: Database connection error');

      User.findById = findById;
   });

   // TODO:
   it('fails with SystemError on database error during target user search', async () => {});

   it('fails with SystemError on database error during aggregation (user)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);

      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, followers: [], following: [] })]);
      user2.followers = [user1._id];
      user2.following = [user1._id];
      await user2.save();

      const now = new Date();
      const track1 = await Track.create({ name: 'Track 1', addedBy: user2.id, artists: [user2.id], duration: 200, createdAt: now });
      const track2 = await Track.create({ name: 'Track 2', addedBy: user2.id, artists: [user2.id], duration: 180, createdAt: new Date(now.getTime() + 1000) });

      const [album, playlist, playlist2] = await Promise.all([
         Album.create({ name: 'Album', type: 'single', tracks: [track1.id], artists: [user2.id] }),
         Playlist.create({ name: 'Playlist', public: true, owner: user2.id, tracks: [track1._id, track2._id], followers: 10 }),
         Playlist.create({ name: 'Playlist', public: false, owner: user2.id, tracks: [track2._id, track1._id], followers: 0 })
      ]);

      track1.album = album._id;
      await track1.save();

      track2.album = album._id;
      await track2.save();

      await Promise.all([Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user2.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track1.id })]);

      const aggregate = User.aggregate;
      User.aggregate = () => {
         throw new Error('Database connection error (u)');
      };

      await expect(getUserInfo(user1.id, user2.id)).to.be.rejectedWith(SystemError, 'Fetching user info failed: Database connection error (u)');

      User.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (track)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);

      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, followers: [], following: [] })]);
      user2.followers = [user1._id];
      user2.following = [user1._id];
      await user2.save();

      const now = new Date();
      const track1 = await Track.create({ name: 'Track 1', addedBy: user2.id, artists: [user2.id], duration: 200, createdAt: now });
      const track2 = await Track.create({ name: 'Track 2', addedBy: user2.id, artists: [user2.id], duration: 180, createdAt: new Date(now.getTime() + 1000) });

      const [album, playlist, playlist2] = await Promise.all([
         Album.create({ name: 'Album', type: 'single', tracks: [track1.id], artists: [user2.id] }),
         Playlist.create({ name: 'Playlist', public: true, owner: user2.id, tracks: [track1._id, track2._id], followers: 10 }),
         Playlist.create({ name: 'Playlist', public: false, owner: user2.id, tracks: [track2._id, track1._id], followers: 0 })
      ]);

      track1.album = album._id;
      await track1.save();

      track2.album = album._id;
      await track2.save();

      await Promise.all([Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user2.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track1.id })]);

      const aggregate = Track.aggregate;
      Track.aggregate = () => {
         throw new Error('Database connection error (t)');
      };

      await expect(getUserInfo(user1.id, user2.id)).to.be.rejectedWith(SystemError, 'Fetching user info failed: Database connection error (t)');

      Track.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (album)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);

      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, followers: [], following: [] })]);
      user2.followers = [user1._id];
      user2.following = [user1._id];
      await user2.save();

      const now = new Date();
      const track1 = await Track.create({ name: 'Track 1', addedBy: user2.id, artists: [user2.id], duration: 200, createdAt: now });
      const track2 = await Track.create({ name: 'Track 2', addedBy: user2.id, artists: [user2.id], duration: 180, createdAt: new Date(now.getTime() + 1000) });

      const [album, playlist, playlist2] = await Promise.all([
         Album.create({ name: 'Album', type: 'single', tracks: [track1.id], artists: [user2.id] }),
         Playlist.create({ name: 'Playlist', public: true, owner: user2.id, tracks: [track1._id, track2._id], followers: 10 }),
         Playlist.create({ name: 'Playlist', public: false, owner: user2.id, tracks: [track2._id, track1._id], followers: 0 })
      ]);

      track1.album = album._id;
      await track1.save();

      track2.album = album._id;
      await track2.save();

      await Promise.all([Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user2.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track1.id })]);

      const aggregate = Album.aggregate;
      Album.aggregate = () => {
         throw new Error('Database connection error (a)');
      };

      await expect(getUserInfo(user1.id, user2.id)).to.be.rejectedWith(SystemError, 'Fetching user info failed: Database connection error (a)');

      Album.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (playlist)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);

      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, followers: [], following: [] })]);
      user2.followers = [user1._id];
      user2.following = [user1._id];
      await user2.save();

      const now = new Date();
      const track1 = await Track.create({ name: 'Track 1', addedBy: user2.id, artists: [user2.id], duration: 200, createdAt: now });
      const track2 = await Track.create({ name: 'Track 2', addedBy: user2.id, artists: [user2.id], duration: 180, createdAt: new Date(now.getTime() + 1000) });

      const [album, playlist, playlist2] = await Promise.all([
         Album.create({ name: 'Album', type: 'single', tracks: [track1.id], artists: [user2.id] }),
         Playlist.create({ name: 'Playlist', public: true, owner: user2.id, tracks: [track1._id, track2._id], followers: 10 }),
         Playlist.create({ name: 'Playlist', public: false, owner: user2.id, tracks: [track2._id, track1._id], followers: 0 })
      ]);

      track1.album = album._id;
      await track1.save();

      track2.album = album._id;
      await track2.save();

      await Promise.all([Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user2.id, type: constants.PLAYED_TRACK, track: track2.id }), Log.create({ user: user1.id, type: constants.PLAYED_TRACK, track: track1.id })]);

      const aggregate = Playlist.aggregate;
      Playlist.aggregate = () => {
         throw new Error('Database connection error (p)');
      };

      await expect(getUserInfo(user1.id, user2.id)).to.be.rejectedWith(SystemError, 'Fetching user info failed: Database connection error (p)');

      Playlist.aggregate = aggregate;
   });

   it('fails when all fields are empty', () => {
      expect(() => getUserInfo('', '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when not provided with a user id', () => {
      expect(() => getUserInfo('', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when not provided with a target user id', () => {
      expect(() => getUserInfo('66b2cebc5621e4111875102c', '').to.throw(InvalidArgumentError, 'All inputs are required'));
   });

   it('fails when the user id is invalid', () => {
      expect(() => getUserInfo('66b2cebc5621e4111875102X', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the target user id is invalid', () => {
      expect(() => getUserInfo('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102X')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Log.deleteMany(), Track.deleteMany(), Album.deleteMany(), Playlist.deleteMany()]);
      await mongoose.disconnect();
   });
});
