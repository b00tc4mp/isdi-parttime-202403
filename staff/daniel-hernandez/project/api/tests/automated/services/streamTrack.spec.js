import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'path';
import { Track, User, Log } from '../../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import streamTrack from '../../../services/streamTrack.js';
import constants from 'com/constants.js';

// WARN: Change TRACK_DIR to test with the test track directory to not work with "production" data
const { MONGO_TEST_URI, TRACK_DIR } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('streamTrack', () => {
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

   it('succeeds when it returns a readable stream when not provided with a range and is logged correctly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track_2024', duration: 60 });

      await writeFile(testTrackPath, 'a'.repeat(1000), 'utf8');

      const streamInfo = await expect(streamTrack(user.id, track.id)).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(streamInfo).to.have.property('contentRange').that.equals('bytes 0-999/1000');
      expect(streamInfo).to.have.property('contentLength').that.equals(1000);
      expect(streamInfo).to.have.property('contentType').that.equals('audio/mpeg');
      expect(streamInfo).to.have.property('stream').that.is.an('object');

      const logEntry = await expect(Log.findOne({ type: constants.PLAYED_TRACK })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry).to.have.property('type').that.equals(constants.PLAYED_TRACK);
      expect(logEntry.track.toString()).to.equal(track.id);
   });

   it('succeeds when it returns a readable stream when provided with start and end range and is logged correctly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track_2024', duration: 60 });

      await writeFile(testTrackPath, 'a'.repeat(1500), 'utf8');

      const streamInfo = await expect(streamTrack(user.id, track.id, 'bytes=0-500')).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(streamInfo).to.have.property('contentRange').that.equals('bytes 0-500/1500');
      expect(streamInfo).to.have.property('contentLength').that.equals(501);
      expect(streamInfo).to.have.property('contentType').that.equals('audio/mpeg');
      expect(streamInfo).to.have.property('stream').that.is.an('object');

      const logEntry = await expect(Log.findOne({ type: constants.PLAYED_TRACK })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry).to.have.property('type').that.equals(constants.PLAYED_TRACK);
      expect(logEntry.track.toString()).to.equal(track.id);
   });

   it('succeeds when it returns a readable stream when provided with only a start range and is logged correctly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track_2024', duration: 60 });

      await writeFile(testTrackPath, 'a'.repeat(750), 'utf8');

      const streamInfo = await expect(streamTrack(user.id, track.id, 'bytes=200-')).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(streamInfo).to.have.property('contentRange').that.equals('bytes 200-749/750');
      expect(streamInfo).to.have.property('contentLength').that.equals(550);
      expect(streamInfo).to.have.property('contentType').that.equals('audio/mpeg');
      expect(streamInfo).to.have.property('stream').that.is.an('object');

      const logEntry = await expect(Log.findOne({ type: constants.PLAYED_TRACK })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry).to.have.property('type').that.equals(constants.PLAYED_TRACK);
      expect(logEntry.track.toString()).to.equal(track.id);
   });

   it('succeeds when it returns a readable stream when provided with only a end range and is logged correctly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track_2024', duration: 60 });

      await writeFile(testTrackPath, 'a'.repeat(921), 'utf8');

      const streamInfo = await expect(streamTrack(user.id, track.id, 'bytes=-211')).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(streamInfo).to.have.property('contentRange').that.equals('bytes 710-920/921');
      expect(streamInfo).to.have.property('contentLength').that.equals(211);
      expect(streamInfo).to.have.property('contentType').that.equals('audio/mpeg');
      expect(streamInfo).to.have.property('stream').that.is.an('object');

      const logEntry = await expect(Log.findOne({ type: constants.PLAYED_TRACK })).to.be.fulfilled.and.to.eventually.be.a('object');
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry).to.have.property('type').that.equals(constants.PLAYED_TRACK);
      expect(logEntry.track.toString()).to.equal(track.id);
   });

   it("fails when the user doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track_2024', duration: 60 });

      await expect(streamTrack('66b2cebc5621e4111875102c', track.id)).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it('fails when the track is not found', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(streamTrack(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(NotFoundError, 'Track not found');
   });

   it('fails when the track file is not found', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track_2024', duration: 60 });

      await expect(streamTrack(user.id, track.id)).to.be.rejectedWith(NotFoundError, 'Track file not found');
   });

   it('fails when the range exceeds the file size', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track_2024', duration: 60 });

      await writeFile(testTrackPath, 'a'.repeat(900), 'utf8');

      await expect(streamTrack(user.id, track.id, 'bytes=0-1000')).to.be.rejectedWith(InvalidArgumentError, 'Range exceeds file size');
   });

   it('fails with SystemError on database error during user search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(streamTrack(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Streaming the track failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database error during track search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });
      const track = await Track.create({ _id: testTrackId, addedBy: user.id, name: 'test_track_2024', duration: 60 });

      const findById = Track.findById;
      Track.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(streamTrack(user.id, track.id)).to.be.rejectedWith(SystemError, 'Streaming the track failed: Database connection error');

      Track.findById = findById;
   });

   it('fails when all fields are empty', () => {
      expect(() => streamTrack('', '')).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when not provided with a user id', () => {
      expect(() => streamTrack('', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, '');
   });

   it('fails when not provided with a track id', () => {
      expect(() => streamTrack('66b2cebc5621e4111875102c', '')).to.throw(InvalidArgumentError, '');
   });

   it('fails when the user id is invalid', () => {
      expect(() => streamTrack('66b2cebc5621e4111875102X', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the track id is invalid', () => {
      expect(() => streamTrack('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102X')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the range is provided but incorrect (number)', () => {
      expect(() => streamTrack('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102c', 200)).to.throw(InvalidArgumentError, 'Invalid range format');
   });

   it('fails when the range is provided but incorrect (Range start value)', () => {
      expect(() => streamTrack('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102c', 'bytes=undefined-200')).to.throw(InvalidArgumentError, 'Invalid range start value');
   });

   it('fails when the range is provided but incorrect (Range end value)', () => {
      expect(() => streamTrack('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102c', 'bytes=0-undefined')).to.throw(InvalidArgumentError, 'Invalid range end value');
   });

   it('fails when the range is provided but incorrect !(Range >= 0)', () => {
      expect(() => streamTrack('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102c', 'bytes=-1-100')).to.throw(InvalidArgumentError, 'Invalid range format');
   });

   it('fails when the range is provided but incorrect (Range start value > Range end value)', () => {
      expect(() => streamTrack('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102c', 'bytes=200-100')).to.throw(InvalidArgumentError, 'Invalid range. End value must be >= start value');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Track.deleteMany(), Log.deleteMany()]);

      try {
         await rm(testTrackPath, { force: true });
      } catch {}

      await mongoose.disconnect();
   });
});
