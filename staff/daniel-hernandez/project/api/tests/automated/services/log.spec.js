import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Log, User, Track, Playlist, Album } from '../../../data/index.js';
import { CredentialError, InvalidArgumentError, SystemError } from 'com/errors.js';
import log from '../../../services/log.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('log', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([Log.deleteMany(), User.deleteMany(), Track.deleteMany(), Playlist.deleteMany(), Album.deleteMany()]));

   it('succeeds when logging a valid action with a target user', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const [user1, user2] = await Promise.all([User.create({ username: 'eva01', email: 'shinji@ikari.com', passwordHash: hash }), User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash })]);

      await expect(log(user1.id, constants.FOLLOWED_USER, user2.id, constants.types[0])).to.be.fulfilled;

      const logEntry = await expect(Log.findOne({ type: constants.FOLLOWED_USER })).to.eventually.be.a('object');
      expect(logEntry).to.not.be.null;
      expect(logEntry.user.toString()).to.equal(user1.id);
      expect(logEntry.type).to.equal(constants.FOLLOWED_USER);
      expect(logEntry.targetUser.toString()).to.equal(user2.id);
   });

   it('succeeds when logging a valid action with a track target', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ name: 'summertime_2007', addedBy: user.id, duration: 138.6 });

      await expect(log(user.id, constants.CREATED_TRACK, track.id, constants.types[1])).to.be.fulfilled;

      const logEntry = await expect(Log.findOne({ type: constants.CREATED_TRACK })).to.eventually.be.a('object');
      expect(logEntry).to.not.be.null;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.CREATED_TRACK);
      expect(logEntry.track.toString()).to.equal(track.id);
   });

   it('succeeds when logging a valid action with a playlist target', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const playlist = await Playlist.create({ name: 'Neon Genesis', owner: user.id });

      await expect(log(user.id, constants.CREATED_PLAYLIST, playlist.id, constants.types[2])).to.be.fulfilled;

      const logEntry = await expect(Log.findOne({ type: constants.CREATED_PLAYLIST })).to.eventually.be.a('object');
      expect(logEntry).to.not.be.null;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.CREATED_PLAYLIST);
      expect(logEntry.playlist.toString()).to.equal(playlist.id);
   });

   it('succeeds when logging a valid action with a album target', async () => {
      const hash = await bcrypt.hash('!1slimmY567876', 8);
      const user = await User.create({ username: 'eminem', email: 'slim@shady.com', passwordHash: hash });
      const track = await Track.create({ name: 'Brand New Dance', addedBy: user.id, artists: [user.id], duration: 195.6 });
      const album = await Album.create({ name: 'The Death of Slim Shady (Coup De Grace)', artists: [user.id], releaseDate: new Date(2024, 6, 12), tracks: [track.id], type: 'album' });

      await expect(log(user.id, constants.FOLLOWED_ALBUM, album.id, constants.types[3])).to.be.fulfilled;

      const logEntry = await expect(Log.findOne({ type: constants.FOLLOWED_ALBUM })).to.eventually.be.a('object');
      expect(logEntry).to.not.be.null;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.FOLLOWED_ALBUM);
      expect(logEntry.album.toString()).to.equal(album.id);
   });

   it('succeeds when logging a valid action with a query target', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(log(user.id, constants.SEARCHED, null, null, 'summertime_2007')).to.be.fulfilled;

      const logEntry = await expect(Log.findOne({ type: constants.SEARCHED })).to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.SEARCHED);
      expect(logEntry.query).to.equal('summertime_2007');
   });

   it('succeeds when logging a valid action without a target id or target type', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(log(user.id, constants.MANAGED_OFFLINE_STORAGE)).to.be.fulfilled;

      const logEntry = await expect(Log.findOne({ type: constants.MANAGED_OFFLINE_STORAGE })).to.eventually.be.a('object');
      expect(logEntry).to.not.be.null;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.MANAGED_OFFLINE_STORAGE);
   });

   it("fails when the user doesn't exist", async () => {
      await expect(log('66b2cebc5621e4111875102c', constants.SYNCED_OFFLINE_TRACKS)).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it('fails when not provided the query string with a query target', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      expect(() => log(user.id, constants.SEARCHED)).to.throw(InvalidArgumentError, 'No query provided');
   });

   it('fails when the query is invalid', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      expect(() => log(user.id, constants.SEARCHED, null, null, 1)).to.throw(InvalidArgumentError, 'Query must be a non-empty string');
   });

   it('fails with SystemError on database failiure during user search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const findOne = User.findOne;
      User.findOne = () => {
         throw new Error('Database connection error');
      };

      await expect(log(user.id, constants.SYNCED_OFFLINE_TRACKS)).to.be.rejectedWith(SystemError, 'Log failed: Database connection error');

      User.findOne = findOne;
   });

   it('fails with SystemError on database failiure during log creation', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const save = Log.prototype.save;
      Log.prototype.save = () => {
         throw new Error('Database connection error');
      };

      await expect(log(user.id, constants.MANAGED_OFFLINE_STORAGE)).to.be.rejectedWith(SystemError, 'Log creation failed: Database connection error');

      Log.prototype.save = save;
   });

   it('fails when all fields are empty', () => {
      expect(() => log('', '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when not provided with a user id', () => {
      expect(() => log('', constants.MANAGED_OFFLINE_STORAGE)).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when not provided with a type', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      expect(() => log(user.id, '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the user id is invalid', () => {
      expect(() => log('66b2cebc5621e4111875102X', constants.MANAGED_OFFLINE_STORAGE)).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the type is invalid', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      expect(() => log(user.id, 'INVALID_TYPE')).to.throw(InvalidArgumentError, 'Invalid log type');
   });

   it('fails when provided all but the target id', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      expect(() => log(user.id, constants.CREATED_TRACK, '', constants.types[1])).to.throw(InvalidArgumentError, 'No targetType or targetId');
   });

   it('fails when provided all but the target type', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ name: 'summertime_2007', addedBy: user.id, duration: 138.6 });

      expect(() => log(user.id, constants.CREATED_TRACK, track.id, '')).to.throw(InvalidArgumentError, 'No targetType or targetId');
   });

   it('fails when the target id is invalid', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      expect(() => log(user.id, constants.CREATED_TRACK, 1, constants.types[1])).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the target type is invalid', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ name: 'summertime_2007', addedBy: user.id, duration: 138.6 });

      expect(() => log(user.id, constants.CREATED_TRACK, track.id, 'invalid_type')).to.throw(InvalidArgumentError, 'Invalid target type');
   });

   after(async () => {
      await Promise.all([Log.deleteMany(), User.deleteMany(), Track.deleteMany(), Playlist.deleteMany(), Album.deleteMany()]);
      await mongoose.disconnect();
   });
});
