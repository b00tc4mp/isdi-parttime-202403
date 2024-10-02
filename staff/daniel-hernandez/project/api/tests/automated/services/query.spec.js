import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Log, Album, Playlist, Track, User } from '../../../data/index.js';
import { CredentialError, InvalidArgumentError, SystemError } from 'com/errors.js';
import query from '../../../services/query.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;
// TODO: Consider adding performance tests

// Function to create(fake) data because I ain't writing all that every time 💀
const createData = async () => {
   // Create valid hashed passwords
   const [passwordHash1, passwordHash2] = await Promise.all([await bcrypt.hash('Password1!', 8), await bcrypt.hash('Password2@', 8)]);

   // Create users
   const [user1, user2] = await Promise.all([
      await User.create({
         username: 'eminem',
         email: 'slim@shady.com',
         passwordHash: passwordHash1
      }),
      await User.create({
         username: 'drdre',
         email: 'dre@beats.com',
         passwordHash: passwordHash2
      })
   ]);

   // Update user1 with a new follower
   user1.followers = [user2._id];
   await user1.save();

   // Create tracks
   const [track1, track2, track3] = await Promise.all([
      await Track.create({
         name: 'Brand New Dance',
         addedBy: user1._id,
         artists: [user1._id],
         duration: 195.6,
         genre: 'Hip Hop',
         releaseDate: new Date(2024, 7, 12)
      }),
      await Track.create({
         name: 'Aftermath (The Intro)',
         addedBy: user2._id,
         artists: [user2._id],
         duration: 150.6,
         genre: 'Hip Hop',
         releaseDate: new Date(1996, 11, 26)
      }),
      await Track.create({
         name: 'East Coast/West Coast Killas',
         addedBy: user2._id,
         artists: [user2._id],
         duration: 272.4,
         genre: 'Hip Hop',
         releaseDate: new Date(1996, 11, 26)
      })
   ]);

   // Update user1 with a new liked track
   user1.likedTracks = [track3._id];
   await user1.save();

   // Create albums
   const [album1, album2] = await Promise.all([
      await Album.create({
         name: 'The Death of Slim Shady (Coup De Grace)',
         type: 'album',
         artists: [user1._id],
         releaseDate: new Date(2024, 7, 12),
         tracks: [track1._id]
      }),
      await Album.create({
         name: 'Dr. Dre Presents',
         type: 'album',
         artists: [user2._id],
         releaseDate: new Date(1996, 11, 26),
         tracks: [track2._id, track3._id]
      })
   ]);

   // Update tracks with the album ids
   track1.album = album1._id;
   track2.album = album2._id;
   track3.album = album2._id;
   await Promise.all([track1.save(), track2.save(), track3.save()]);

   // Create playlists
   const [playlist1, playlist2] = await Promise.all([
      await Playlist.create({
         name: 'Eminem Hits',
         description: 'All-time hits by Eminem',
         public: true,
         owner: user1._id,
         tracks: [track1._id]
      }),
      await Playlist.create({
         name: 'Dr. Dre Classics',
         description: 'Classic tracks by Dr. Dre',
         public: true,
         owner: user2._id,
         tracks: [track2._id, track3._id]
      })
   ]);

   const queryString = 'dre';
   return { user1, user2, track1, track2, track3, album1, album2, playlist1, playlist2, queryString };
};

describe('query', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => {
      await Promise.all([User.deleteMany(), Track.deleteMany(), Playlist.deleteMany(), Album.deleteMany(), Log.deleteMany()]);
   });

   it('succeeds when it performs a correct query to the database with all query types specified and is logged correctly', async () => {
      const data = await createData();

      const queryData = await expect(query(data.user1.id, data.queryString, ['user', 'track', 'album', 'playlist'])).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('tracks').with.length(2);
      expect(queryData.tracks[0]).to.have.property('name').that.equals(data.track3.name);
      expect(queryData.tracks[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.tracks[0]).to.have.property('duration').that.equals(data.track3.duration.toString());
      expect(queryData.tracks[0]).to.have.property('album').that.deep.includes({ name: data.album2.name, id: data.album2.id });
      expect(queryData.tracks[0]).to.have.property('id').that.equals(data.track3.id);

      expect(queryData.tracks[1]).to.have.property('name').that.equals(data.track2.name);
      expect(queryData.tracks[1]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.tracks[1]).to.have.property('duration').that.equals(data.track2.duration.toString());
      expect(queryData.tracks[1]).to.have.property('album').that.deep.includes({ name: data.album2.name, id: data.album2.id });
      expect(queryData.tracks[1]).to.have.property('id').that.equals(data.track2.id);

      expect(queryData).to.have.property('users').with.length(1);
      expect(queryData.users[0]).to.have.property('username').that.equals(data.user2.username);
      expect(queryData.users[0]).to.have.property('id').that.equals(data.user2.id);

      expect(queryData).to.have.property('playlists').with.length(1);
      expect(queryData.playlists[0]).to.have.property('name').that.equals(data.playlist2.name);
      expect(queryData.playlists[0]).to.have.property('owner').that.deep.includes({ username: data.user2.username, id: data.user2.id });
      expect(queryData.playlists[0]).to.have.property('id').that.equals(data.playlist2.id);

      expect(queryData).to.have.property('albums').with.length(2);
      expect(queryData.albums[0]).to.have.property('name').that.equals(data.album2.name);
      expect(queryData.albums[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.albums[0]).to.have.property('id').that.equals(data.album2.id);

      expect(queryData.albums[1]).to.have.property('name').that.equals(data.album1.name);
      expect(queryData.albums[1]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user1.username, id: data.user1.id });
      expect(queryData.albums[1]).to.have.property('id').that.equals(data.album1.id);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(data.queryString);
   });

   it('succeeds when it performs a correct query to the database with no query types specified and is logged correctly', async () => {
      const data = await createData();

      const queryData = await expect(query(data.user1.id, data.queryString, [])).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('results').with.length(6);

      expect(queryData.results[0]).to.have.property('name').that.equals(data.track3.name);
      expect(queryData.results[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.results[0]).to.have.property('duration').that.equals(data.track3.duration.toString());
      expect(queryData.results[0]).to.have.property('album').that.deep.includes({ name: data.album2.name, id: data.album2.id });
      expect(queryData.results[0]).to.have.property('id').that.equals(data.track3.id);
      expect(queryData.results[0]).to.have.property('relevance').that.equals('-26');

      expect(queryData.results[1]).to.have.property('name').that.equals(data.playlist2.name);
      expect(queryData.results[1]).to.have.property('owner').that.deep.includes({ username: data.user2.username, id: data.user2.id });
      expect(queryData.results[1]).to.have.property('id').that.equals(data.playlist2.id);
      expect(queryData.results[1]).to.have.property('relevance').that.equals('-21');

      expect(queryData.results[2]).to.have.property('name').that.equals(data.album2.name);
      expect(queryData.results[2]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.results[2]).to.have.property('id').that.equals(data.album2.id);
      expect(queryData.results[2]).to.have.property('relevance').that.equals('-21');

      expect(queryData.results[3]).to.have.property('username').that.equals(data.user2.username);
      expect(queryData.results[3]).to.have.property('id').that.equals(data.user2.id);
      expect(queryData.results[3]).to.have.property('relevance').that.equals('-18');

      expect(queryData.results[4]).to.have.property('name').that.equals(data.track2.name);
      expect(queryData.results[4]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.results[4]).to.have.property('duration').that.equals(data.track2.duration.toString());
      expect(queryData.results[4]).to.have.property('album').that.deep.includes({ name: data.album2.name, id: data.album2.id });
      expect(queryData.results[4]).to.have.property('id').that.equals(data.track2.id);
      expect(queryData.results[4]).to.have.property('relevance').that.equals('-16');

      expect(queryData.results[5]).to.have.property('name').that.equals(data.album1.name);
      expect(queryData.results[5]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user1.username, id: data.user1.id });
      expect(queryData.results[5]).to.have.property('id').that.equals(data.album1.id);
      expect(queryData.results[5]).to.have.property('relevance').that.equals('-1');

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(data.queryString);
   });

   it('succeeds when it performs a correct query to the database with specific query types and is logged correctly', async () => {
      const data = await createData();

      const queryData = await expect(query(data.user1.id, data.queryString, ['track', 'playlist'])).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('tracks').with.length(2);
      expect(queryData.tracks[0]).to.have.property('name').that.equals(data.track3.name);
      expect(queryData.tracks[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.tracks[0]).to.have.property('duration').that.equals(data.track3.duration.toString());
      expect(queryData.tracks[0]).to.have.property('album').that.deep.includes({ name: data.album2.name, id: data.album2.id });
      expect(queryData.tracks[0]).to.have.property('id').that.equals(data.track3.id);

      expect(queryData.tracks[1]).to.have.property('name').that.equals(data.track2.name);
      expect(queryData.tracks[1]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.tracks[1]).to.have.property('duration').that.equals(data.track2.duration.toString());
      expect(queryData.tracks[1]).to.have.property('album').that.deep.includes({ name: data.album2.name, id: data.album2.id });
      expect(queryData.tracks[1]).to.have.property('id').that.equals(data.track2.id);

      expect(queryData).to.have.property('playlists').with.length(1);
      expect(queryData.playlists[0]).to.have.property('name').that.equals(data.playlist2.name);
      expect(queryData.playlists[0]).to.have.property('owner').that.deep.includes({ username: data.user2.username, id: data.user2.id });
      expect(queryData.playlists[0]).to.have.property('id').that.equals(data.playlist2.id);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(data.queryString);
   });

   it('succeeds when it performs a correct query to the database with specific query types and is logged correctly', async () => {
      const data = await createData();

      const queryData = await expect(query(data.user1.id, data.queryString, ['user', 'album'])).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('users').with.length(1);
      expect(queryData.users[0]).to.have.property('username').that.equals(data.user2.username);
      expect(queryData.users[0]).to.have.property('id').that.equals(data.user2.id);

      expect(queryData).to.have.property('albums').with.length(2);
      expect(queryData.albums[0]).to.have.property('name').that.equals(data.album2.name);
      expect(queryData.albums[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.albums[0]).to.have.property('id').that.equals(data.album2.id);

      expect(queryData.albums[1]).to.have.property('name').that.equals(data.album1.name);
      expect(queryData.albums[1]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user1.username, id: data.user1.id });
      expect(queryData.albums[1]).to.have.property('id').that.equals(data.album1.id);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(data.queryString);
   });

   it('succeeds when it performs a correct query to the database with specific query types and a limit and is logged correctly', async () => {
      const data = await createData();

      const queryData = await expect(query(data.user1.id, data.queryString, ['track', 'user', 'playlist', 'album'], 1, 1)).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('tracks').with.length(1);
      expect(queryData.tracks[0]).to.have.property('name').that.equals(data.track3.name);
      expect(queryData.tracks[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.tracks[0]).to.have.property('duration').that.equals(data.track3.duration.toString());
      expect(queryData.tracks[0]).to.have.property('album').that.deep.includes({ name: data.album2.name, id: data.album2.id });
      expect(queryData.tracks[0]).to.have.property('id').that.equals(data.track3.id);

      expect(queryData).to.have.property('users').with.length(1);
      expect(queryData.users[0]).to.have.property('username').that.equals(data.user2.username);
      expect(queryData.users[0]).to.have.property('id').that.equals(data.user2.id);

      expect(queryData).to.have.property('playlists').with.length(1);
      expect(queryData.playlists[0]).to.have.property('name').that.equals(data.playlist2.name);
      expect(queryData.playlists[0]).to.have.property('owner').that.deep.includes({ username: data.user2.username, id: data.user2.id });
      expect(queryData.playlists[0]).to.have.property('id').that.equals(data.playlist2.id);

      expect(queryData).to.have.property('albums').with.length(1);
      expect(queryData.albums[0]).to.have.property('name').that.equals(data.album2.name);
      expect(queryData.albums[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.albums[0]).to.have.property('id').that.equals(data.album2.id);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(data.queryString);
   });

   it('succeeds when it performs a correct query to the database with specific query types and a limit and is logged correctly', async () => {
      const data = await createData();

      const queryData = await expect(query(data.user1.id, data.queryString, ['track', 'user', 'playlist', 'album'], 1, 1)).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('tracks').with.length(1);
      expect(queryData.tracks[0]).to.have.property('name').that.equals(data.track3.name);
      expect(queryData.tracks[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.tracks[0]).to.have.property('duration').that.equals(data.track3.duration.toString());
      expect(queryData.tracks[0]).to.have.property('album').that.deep.includes({ name: data.album2.name, id: data.album2.id });
      expect(queryData.tracks[0]).to.have.property('id').that.equals(data.track3.id);

      expect(queryData).to.have.property('users').with.length(1);
      expect(queryData.users[0]).to.have.property('username').that.equals(data.user2.username);
      expect(queryData.users[0]).to.have.property('id').that.equals(data.user2.id);

      expect(queryData).to.have.property('playlists').with.length(1);
      expect(queryData.playlists[0]).to.have.property('name').that.equals(data.playlist2.name);
      expect(queryData.playlists[0]).to.have.property('owner').that.deep.includes({ username: data.user2.username, id: data.user2.id });
      expect(queryData.playlists[0]).to.have.property('id').that.equals(data.playlist2.id);

      expect(queryData).to.have.property('albums').with.length(1);
      expect(queryData.albums[0]).to.have.property('name').that.equals(data.album2.name);
      expect(queryData.albums[0]).to.have.property('artists').with.length(1).to.deep.include({ username: data.user2.username, id: data.user2.id });
      expect(queryData.albums[0]).to.have.property('id').that.equals(data.album2.id);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(data.queryString);
   });

   it('succeeds when it performs a correct query to the database with specific query types, a limit, a page and is logged correctly', async () => {
      const data = await createData();

      const queryData = await expect(query(data.user1.id, data.queryString, ['track', 'user', 'playlist', 'album'], 1, 3)).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('tracks').with.length(0);
      expect(queryData).to.have.property('users').with.length(0);
      expect(queryData).to.have.property('playlists').with.length(0);
      expect(queryData).to.have.property('albums').with.length(0);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(data.queryString);
   });

   it('handles special characters in the query string correctly when types are specified', async () => {
      const data = await createData();

      const specialCharQueryString = '!@#$%^&*()_+=-[]{}|;:,.<>?/';

      const queryData = await expect(query(data.user1.id, specialCharQueryString, ['track', 'playlist'])).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('tracks').with.length(0);
      expect(queryData).to.have.property('playlists').with.length(0);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED, query: specialCharQueryString })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(specialCharQueryString);
   });

   it('handles special characters in the query string correctly when types are not specified', async () => {
      const data = await createData();

      const specialCharQueryString = '!@#$%^&*()_+=-[]{}|;:,.<>?/';

      const queryData = await expect(query(data.user1.id, specialCharQueryString, [])).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.not.have.property('users');
      expect(queryData).to.not.have.property('tracks');
      expect(queryData).to.not.have.property('playlists');
      expect(queryData).to.not.have.property('albums');
      expect(queryData).to.have.property('results').with.length(0);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED, query: specialCharQueryString })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(specialCharQueryString);
   });

   it('handles special characters in the query string correctly when types are not specified', async () => {
      const data = await createData();

      const specialCharQueryString = '!@#$%^&*()_+=-[]{}|;:,.<>?/';

      const queryData = await expect(query(data.user1.id, specialCharQueryString, ['user', 'track', 'playlist', 'album'])).to.be.fulfilled.and.to.eventually.be.a('object');

      expect(queryData).to.have.property('users').with.length(0);
      expect(queryData).to.have.property('tracks').with.length(0);
      expect(queryData).to.have.property('playlists').with.length(0);
      expect(queryData).to.have.property('albums').with.length(0);

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED, query: specialCharQueryString })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(data.user1.id);
      expect(logEntry).to.have.property('type').that.equals(constants.SEARCHED);
      expect(logEntry).to.have.property('query').that.equals(specialCharQueryString);
   });

   it("fails when the user doesn't exist", async () => {
      await expect(query('66b2cebc5621e4111875102c', 'dr dre', [])).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it('fails with SystemError on database error during user search', async () => {
      const data = await createData();

      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(query(data.user1.id, 'dr dre', [])).to.be.rejectedWith(SystemError, 'Query failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database error during aggregation (user)', async () => {
      const data = await createData();

      const aggregate = User.aggregate;
      User.aggregate = () => {
         throw new Error('Database connection error (u)');
      };

      await expect(query(data.user1.id, 'dr dre', ['user'])).to.be.rejectedWith(SystemError, 'Query failed: Database connection error (u)');

      User.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (track)', async () => {
      const data = await createData();

      const aggregate = Track.aggregate;
      Track.aggregate = () => {
         throw new Error('Database connection error (t)');
      };

      await expect(query(data.user1.id, 'dr dre', ['track'])).to.be.rejectedWith(SystemError, 'Query failed: Database connection error (t)');

      Track.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (playlist)', async () => {
      const data = await createData();

      const aggregate = Playlist.aggregate;
      Playlist.aggregate = () => {
         throw new Error('Database connection error (p)');
      };

      await expect(query(data.user1.id, 'dr dre', ['playlist'])).to.be.rejectedWith(SystemError, 'Query failed: Database connection error (p)');

      Playlist.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (album)', async () => {
      const data = await createData();

      const aggregate = Album.aggregate;
      Album.aggregate = () => {
         throw new Error('Database connection error (a)');
      };

      await expect(query(data.user1.id, 'dr dre', ['album'])).to.be.rejectedWith(SystemError, 'Query failed: Database connection error (a)');

      Album.aggregate = aggregate;
   });

   it('fails when all fields are empty', () => {
      expect(() => query('', '', undefined, null, null)).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when not provided with a user id', () => {
      expect(() => query('', 'dr dre')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when not provided with a query', () => {
      expect(() => query('66b2cebc5621e4111875102c', null)).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when provided with a undefined/null type array', () => {
      expect(() => query('66b2cebc5621e4111875102c', 'dr dre', null)).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when provided with a undefined/null limit', () => {
      expect(() => query('66b2cebc5621e4111875102c', 'dr dre', [], null, 1)).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when provided with an undefined/null page', () => {
      expect(() => query('66b2cebc5621e4111875102c', 'dr dre', [], 1, null)).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the user id is invalid', () => {
      expect(() => query('66b2cebc5621e4111875102X', 'dr dre')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the query is invalid', () => {
      expect(() => query('66b2cebc5621e4111875102c', 123)).to.throw(InvalidArgumentError, 'Query must be a non-empty string');
   });

   it('fails when the array of types is invalid (obj)', () => {
      expect(() => query('66b2cebc5621e4111875102c', 'dr dre', {})).to.throw(InvalidArgumentError, 'Expected an array of query types');
   });

   it('fails when the array of types is invalid (set)', () => {
      expect(() => query('66b2cebc5621e4111875102c', 'dr dre', new Set())).to.throw(InvalidArgumentError, 'Expected an array of query types');
   });

   it('fails when the type in the types array is invalid', () => {
      expect(() => query('66b2cebc5621e4111875102c', 'dr dre', ['INVALID_TYPE'])).to.throw(InvalidArgumentError, 'Invalid query type within array');
   });

   it('fails when the limit is invalid', () => {
      expect(() => query('66b2cebc5621e4111875102c', 'dr dre', [], 'INVALID_LIMIT')).to.throw(InvalidArgumentError, 'Invalid limit');
   });

   it('fails when the page is invalid', () => {
      expect(() => query('66b2cebc5621e4111875102c', 'dr dre', [], 1, 'INVALID_PAGE')).to.throw(InvalidArgumentError, 'Invalid page');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Track.deleteMany(), Playlist.deleteMany(), Album.deleteMany(), Log.deleteMany()]);
      await mongoose.disconnect();
   });
});
