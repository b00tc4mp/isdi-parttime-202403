import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { mkdir, rm, writeFile } from 'fs/promises';
import jwt from '../../../utils/jsonwebtoken-promisified.js';
import path from 'path';
import { Track, User, Log } from '../../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import player from '../../../services/player.js';
import constants from 'com/constants.js';

const { API_URL, EXP_TIME, URL_SECRET } = process.env;

// WARN: Change TRACK_DIR to test with the test track directory to not work with "production" data
const { MONGO_TEST_URI, TRACK_DIR } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('player', () => {
   const testTrackId = new mongoose.Types.ObjectId().toString();
   const testTrackPath = path.join(TRACK_DIR, testTrackId);

   before(async () => {
      await mongoose.connect(MONGO_TEST_URI);
      await mkdir(TRACK_DIR, { recursive: true });
   });

   beforeEach(async () => {
      await Promise.all([User.deleteMany(), Track.deleteMany(), Log.deleteMany()]);

      try {
         await rm(testTrackPath, { force: true });
      } catch {}
   });

   it('succeeds when it returns player information and logs it successfully', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track', duration: 60 });

      await writeFile(testTrackPath, 'x'.repeat(1000), 'utf8');

      const playerInfo = await expect(player(user.id, track.id)).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(playerInfo).to.have.property('url').that.includes(`${API_URL}/api/v1/stream/${track.id}?token=`);
      expect(playerInfo).to.have.property('mimeType').that.equals('audio/mpeg');
      expect(playerInfo).to.have.property('duration').that.equals(60);
      expect(playerInfo).to.have.property('expiresIn').that.equals(EXP_TIME);

      const token = playerInfo.url.split('token=')[1];
      const decodedToken = await expect(jwt.verify(token, URL_SECRET)).to.be.fulfilled;
      expect(decodedToken).to.be.an('object');
      expect(decodedToken).to.have.property('sub').that.has.property('userId').that.equals(user.id);
      expect(decodedToken).to.have.property('sub').that.has.property('trackId').that.equals(track.id);
      expect(decodedToken).to.have.property('exp').that.is.a('number');

      const logEntry = await expect(Log.findOne({ type: constants.REQUESTED_TRACK })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry).to.have.property('type').that.equals(constants.REQUESTED_TRACK);
      expect(logEntry.track.toString()).to.equal(track.id);
   });

   it("fails when the user doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track', duration: 60 });

      await expect(player('66b2cebc5621e4111875102c', track.id)).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it('fails when the track is not found', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(player(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(NotFoundError, 'Track not found');
   });

   it('fails when the track file is not found', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track', duration: 60 });

      await expect(player(user.id, track.id)).to.be.rejectedWith(NotFoundError, 'Track file not found');
   });

   it('fails with SystemError on database error during user search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(player(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Fetching player information failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database error during track search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track', duration: 60 });

      const findById = Track.findById;
      Track.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(player(user.id, track.id)).to.be.rejectedWith(SystemError, 'Fetching player information failed: Database connection error');

      Track.findById = findById;
   });

   it('fails with SystemError on token creation error', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track', duration: 60 });

      await writeFile(testTrackPath, 'x'.repeat(1000), 'utf8');

      const sign = jwt.sign;
      jwt.sign = () => {
         throw new Error('Token creation error');
      };

      await expect(player(user.id, track.id)).to.be.rejectedWith(SystemError, 'Failed to create url token: Token creation error');

      jwt.sign = sign;
   });

   it('fails when all fields are empty', () => {
      expect(() => player()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when only provided with a user id', () => {
      expect(() => player('66b2cebc5621e4111875102c', '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when only provided with a track id', () => {
      expect(() => player('', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when the user id is invalid', () => {
      expect(() => player('66b2cebc5621e4111875102cX', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the track id is invalid', () => {
      expect(() => player('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102cX')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Track.deleteMany(), Log.deleteMany()]);

      try {
         await rm(testTrackPath, { force: true });
      } catch {}

      await mongoose.disconnect();
   });
});
