import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Log, User, Playlist, Track, Album } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, SystemError, NotFoundError } from 'com/errors.js';
import getPlaylistInfo from '../../../../services/playlist/getPlaylistInfo.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('getPlaylistInfo', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([Log.deleteMany(), User.deleteMany(), Playlist.deleteMany(), Track.deleteMany(), Album.deleteMany()]));

   it('succeeds when the playlist exists, is public, and is logged correctly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, profileImage: 'http' });

      const [track1, track2] = await Promise.all([
         await Track.create({
            name: 'Brand New Dance',
            addedBy: user._id,
            artists: [user._id],
            duration: 195.6,
            genre: 'Hip Hop',
            releaseDate: new Date(2024, 7, 12)
         }),
         await Track.create({
            name: 'Aftermath (The Intro)',
            addedBy: user._id,
            artists: [user._id],
            duration: 150.6,
            genre: 'Hip Hop',
            releaseDate: new Date(1996, 11, 26)
         })
      ]);

      const playlist = await Playlist.create({
         name: 'A Playlist',
         description: 'A great playlist',
         public: true,
         owner: user._id,
         tracks: [track1._id, track2._id],
         followers: 10,
         coverArt: 'http'
      });

      const album = await Album.create({
         name: 'The Death of Slim Shady (Coup De Grace)',
         type: 'album',
         artists: [user._id],
         releaseDate: new Date(2024, 7, 12),
         tracks: [track1._id, track2._id]
      });

      track1.album = album._id;
      track2.album = album._id;
      await Promise.all([track1.save(), track2.save()]);

      const result = await expect(getPlaylistInfo(user.id, playlist.id)).to.be.fulfilled.and.eventually.be.a('object');

      expect(result).to.deep.equal({
         id: playlist.id,
         name: playlist.name,
         description: playlist.description,
         public: playlist.public,
         coverArt: playlist.coverArt,
         owner: {
            id: user.id,
            username: user.username,
            profileImage: user.profileImage
         },
         tracks: [
            {
               id: track1.id,
               name: track1.name,
               artists: [{ id: user.id, username: user.username }],
               duration: track1.duration.toString(),
               coverArt: track1.coverArt,
               album: {
                  id: album.id,
                  name: album.name
               }
            },
            {
               id: track2.id,
               name: track2.name,
               artists: [{ id: user.id, username: user.username }],
               duration: track2.duration.toString(),
               coverArt: track2.coverArt,
               album: {
                  id: album.id,
                  name: album.name
               }
            }
         ],
         isFollowed: false,
         followers: playlist.followers.toString()
      });

      const logEntry = await expect(Log.findOne({ type: constants.VIEWED_USER_PLAYLISTS })).to.eventually.be.a('object');
      expect(logEntry).to.exist;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.VIEWED_USER_PLAYLISTS);
      expect(logEntry.playlist.toString()).to.equal(playlist.id);
   });

   it('includes correct isFollowed status when user follows the playlist', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash, profileImage: 'http' });

      const [track1, track2] = await Promise.all([
         await Track.create({
            name: 'Brand New Dance',
            addedBy: user._id,
            artists: [user._id],
            duration: 195.6,
            genre: 'Hip Hop',
            releaseDate: new Date(2024, 7, 12)
         }),
         await Track.create({
            name: 'Aftermath (The Intro)',
            addedBy: user._id,
            artists: [user._id],
            duration: 150.6,
            genre: 'Hip Hop',
            releaseDate: new Date(1996, 11, 26)
         })
      ]);

      const playlist = await Playlist.create({
         name: 'A Playlist',
         description: 'A great playlist',
         public: true,
         owner: user._id,
         tracks: [track1._id, track2._id],
         followers: 10,
         coverArt: 'http'
      });

      const album = await Album.create({
         name: 'The Death of Slim Shady (Coup De Grace)',
         type: 'album',
         artists: [user._id],
         releaseDate: new Date(2024, 7, 12),
         tracks: [track1._id, track2._id]
      });

      user.followingPlaylists.push(playlist._id);
      track1.album = album._id;
      track2.album = album._id;
      await Promise.all([track1.save(), track2.save(), user.save()]);

      const result = await expect(getPlaylistInfo(user.id, playlist.id)).to.be.fulfilled.and.eventually.be.a('object');

      expect(result).to.deep.equal({
         id: playlist.id,
         name: playlist.name,
         description: playlist.description,
         public: playlist.public,
         coverArt: playlist.coverArt,
         owner: {
            id: user.id,
            username: user.username,
            profileImage: user.profileImage
         },
         tracks: [
            {
               id: track1.id,
               name: track1.name,
               artists: [{ id: user.id, username: user.username }],
               duration: track1.duration.toString(),
               coverArt: track1.coverArt,
               album: {
                  id: album.id,
                  name: album.name
               }
            },
            {
               id: track2.id,
               name: track2.name,
               artists: [{ id: user.id, username: user.username }],
               duration: track2.duration.toString(),
               coverArt: track2.coverArt,
               album: {
                  id: album.id,
                  name: album.name
               }
            }
         ],
         isFollowed: true,
         followers: playlist.followers.toString()
      });

      const logEntry = await expect(Log.findOne({ type: constants.VIEWED_USER_PLAYLISTS })).to.eventually.be.a('object');
      expect(logEntry).to.exist;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.VIEWED_USER_PLAYLISTS);
      expect(logEntry.playlist.toString()).to.equal(playlist.id);
   });

   it("fails when the user doesn't exist", async () => {
      await expect(getPlaylistInfo('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102a')).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it('fails when the playlist is private', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const playlist = await Playlist.create({
         name: 'A Private Playlist',
         description: 'A private playlist',
         public: false,
         owner: user._id,
         tracks: [],
         followers: 0
      });

      await expect(getPlaylistInfo(user.id, playlist.id)).to.be.rejectedWith(NotFoundError, 'Playlist not found or not public');
   });

   it("fails when the playlist doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(getPlaylistInfo(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(NotFoundError, 'Playlist not found or not public');
   });

   it('fails with SystemError on database failiure when fetching user', async () => {
      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(getPlaylistInfo(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Fetching playlist info failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database failiure when fetching playlist', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const findOne = Playlist.findOne;
      Playlist.findOne = () => {
         throw new Error('Database connection error');
      };

      await expect(getPlaylistInfo(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Fetching playlist info failed: Database connection error');

      Playlist.findOne = findOne;
   });

   it('fails when userId is invalid', () => {
      expect(() => getPlaylistInfo('66b2cebc5621e4111875102X', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when playlistId is invalid', () => {
      expect(() => getPlaylistInfo('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102X')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when userId and playlistId are missing', () => {
      expect(() => getPlaylistInfo()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   after(async () => {
      await Promise.all([Log.deleteMany(), User.deleteMany(), Playlist.deleteMany(), Track.deleteMany(), Album.deleteMany()]);
      await mongoose.disconnect();
   });
});
