import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Log, Track, User, Album } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, SystemError } from 'com/errors.js';
import getRecentPlays from '../../../../services/track/getRecentPlays.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('getRecentPlays', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([User.deleteMany(), Log.deleteMany(), Track.deleteMany()]));

   it('succeeds when it returns recently played tracks and logs it correctly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const [track1, track2] = await Track.create([
         { name: 'summertime_2007', addedBy: user.id, duration: 138.6, artists: [user.id] },
         { name: 'tokyo_night', addedBy: user.id, duration: 142.1, artists: [user.id] }
      ]);

      const album = await Album.create({
         name: 'frankcj',
         type: 'album',
         artists: [user.id],
         releaseDate: new Date(2024, 7, 12),
         tracks: [track1.id, track2.id]
      });

      track1.album = album.id;
      track2.album = album.id;
      await Track.bulkSave([track1, track2]);

      const now = new Date();
      await Log.create([
         { user: user.id, track: track1.id, type: constants.PLAYED_TRACK, createdAt: now },
         { user: user.id, track: track2.id, type: constants.PLAYED_TRACK, createdAt: new Date(now.getTime() + 1000) }
      ]);

      const result = await getRecentPlays(user.id);

      expect(result.tracks[0]).to.deep.equal({
         id: track2.id,
         album: { name: 'frankcj', id: album.id },
         name: 'tokyo_night',
         artists: [{ id: user.id, username: 'eva02' }],
         duration: '142.1',
         coverArt: ''
      });

      expect(result.tracks[1]).to.deep.equal({
         id: track1.id,
         album: { id: album.id, name: 'frankcj' },
         name: 'summertime_2007',
         artists: [{ id: user.id, username: 'eva02' }],
         duration: '138.6',
         coverArt: ''
      });
   });

   it('returns empty array when no recent plays are found', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const result = await getRecentPlays(user.id);
      expect(result).to.have.property('tracks').that.has.a.lengthOf(0);
   });

   it('returns a empty object for missing album (there should be no track wihout a album)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const [track1, track2] = await Track.create([
         { name: 'summertime_2007', addedBy: user.id, duration: 138.6, artists: [user.id] },
         { name: 'tokyo_night', addedBy: user.id, duration: 142.1, artists: [user.id] }
      ]);

      const now = new Date();
      await Log.create([
         { user: user.id, track: track1.id, type: constants.PLAYED_TRACK, createdAt: now },
         { user: user.id, track: track2.id, type: constants.PLAYED_TRACK, createdAt: new Date(now.getTime() + 1000) }
      ]);

      const result = await getRecentPlays(user.id);

      expect(result.tracks[0]).to.deep.equal({
         id: track2.id,
         album: {},
         name: 'tokyo_night',
         artists: [{ id: user.id, username: 'eva02' }],
         duration: '142.1',
         coverArt: ''
      });

      expect(result.tracks[1]).to.deep.equal({
         id: track1.id,
         album: {},
         name: 'summertime_2007',
         artists: [{ id: user.id, username: 'eva02' }],
         duration: '138.6',
         coverArt: ''
      });
   });

   it('fails when the user does not exist', async () => {
      await expect(getRecentPlays('66b2cebc5621e4111875102c')).to.be.rejectedWith(CredentialError, 'User does not exist');
   });

   it('fails with SystemError on database error during user search', async () => {
      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(getRecentPlays('66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Fetching recent plays failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database error during recent search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const aggregate = Log.aggregate;
      Log.aggregate = () => {
         throw new Error('Database connection error');
      };

      await expect(getRecentPlays(user.id)).to.be.rejectedWith(SystemError, 'Fetching recent plays failed: Database connection error');

      Log.aggregate = aggregate;
   });

   it('fails when the user id is not provided', () => {
      expect(() => getRecentPlays()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the user id is invalid', () => {
      expect(() => getRecentPlays('123972346289862398625')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Log.deleteMany(), Track.deleteMany()]);
      await mongoose.disconnect();
   });
});
