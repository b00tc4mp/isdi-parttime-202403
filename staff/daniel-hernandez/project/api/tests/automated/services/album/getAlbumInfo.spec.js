import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Log, User, Album, Track } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, NotFoundError, SystemError } from 'com/errors.js';
import getAlbumInfo from '../../../../services/album/getAlbumInfo.js';
import constants from 'com/constants.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('getAlbumInfo', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([Log.deleteMany(), User.deleteMany(), Album.deleteMany(), Track.deleteMany()]));

   it('succeeds when the album exists and is logged correctly', async () => {
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

      const result = await expect(getAlbumInfo(user.id, album.id)).to.be.fulfilled.and.eventually.be.a('object');
      expect(result).to.deep.equal({
         id: album.id,
         name: album.name,
         type: album.type,
         artists: [{ id: user.id, username: user.username }],
         releaseDate: album.releaseDate.toISOString(),
         coverArt: album.coverArt,
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
         ]
      });

      const logEntry = await expect(Log.findOne({ type: constants.VIEWED_USER_CREATED_ALBUMS })).to.eventually.be.a('object');
      expect(logEntry).to.exist;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.VIEWED_USER_CREATED_ALBUMS);
      expect(logEntry.album.toString()).to.equal(album.id);
   });

   it("fails when the user doesn't exist", async () => {
      await expect(getAlbumInfo('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102a')).to.be.rejectedWith(CredentialError, "User doesn't exist");
   });

   it("fails when the album doesn't exist", async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(getAlbumInfo(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(NotFoundError, 'Album not found');
   });

   it('fails with SystemError on database failiure when fetching user', async () => {
      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(getAlbumInfo(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Fetching album info failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database failiure when fetching album', async () => {
      const findById = Album.findById;
      Album.findById = () => {
         throw new Error('Database connection error');
      };

      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      await expect(getAlbumInfo(user.id, '66b2cebc5621e4111875102c')).to.be.rejectedWith(SystemError, 'Fetching album info failed: Database connection error');

      Album.findById = findById;
   });

   it('fails when the userId is invalid', () => {
      expect(() => getAlbumInfo('66b2cebc5621e4111875102X', '66b2cebc5621e4111875102c')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when the albumId is invalid', () => {
      expect(() => getAlbumInfo('66b2cebc5621e4111875102c', '66b2cebc5621e4111875102X')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   it('fails when userId and albumId are not provided', () => {
      expect(() => getAlbumInfo()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   after(async () => {
      await Promise.all([Log.deleteMany(), User.deleteMany(), Album.deleteMany(), Track.deleteMany()]);
      await mongoose.disconnect();
   });
});
