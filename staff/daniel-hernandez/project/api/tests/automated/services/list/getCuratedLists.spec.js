import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Log, Playlist, Track, User } from '../../../../data/index.js';
import { CredentialError, InvalidArgumentError, SystemError } from 'com/errors.js';
import constants from 'com/constants.js';
import getCuratedLists from '../../../../services/list/getCuratedLists.js';

const { MONGO_TEST_URI } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('getCuratedLists', () => {
   before(async () => await mongoose.connect(MONGO_TEST_URI));

   beforeEach(async () => await Promise.all([User.deleteMany(), Playlist.deleteMany(), Track.deleteMany(), Log.deleteMany()]));

   it('succeeds when it returns curated lists and logs it correctly', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const [track1, track2, track3, track4] = await Track.insertMany([
         { name: 'Rock Track', genre: 'rock', duration: 180, addedBy: user.id, releaseDate: new Date('2023-01-01') },
         { name: 'Jazz Track', genre: 'jazz', duration: 210, addedBy: user.id, releaseDate: new Date('2023-01-02') },
         { name: 'Popular Rock', genre: 'rock', duration: 200, addedBy: user.id, releaseDate: new Date() }, // Recent
         { name: 'Latest Jazz', genre: 'jazz', duration: 220, addedBy: user.id, releaseDate: new Date() } // Recent
      ]);

      const [discoTrack1, discoTrack2] = await Track.insertMany([
         { name: 'New Rock', genre: 'rock', duration: 190, addedBy: user.id },
         { name: 'Fresh Jazz', genre: 'jazz', duration: 230, addedBy: user.id }
      ]);

      await Promise.all([
         User.findByIdAndUpdate(user.id, {
            $push: {
               likedTracks: { $each: [track1.id, track2.id] },
               followingPlaylists: []
            }
         }),

         Log.insertMany([
            ...Array(5)
               .fill()
               .map(() => ({
                  // Track3 played 5 times
                  user: user.id,
                  type: constants.PLAYED_TRACK,
                  track: track3.id
               })),
            ...Array(3)
               .fill()
               .map(() => ({
                  // Track4 played 3 times
                  user: user.id,
                  type: constants.PLAYED_TRACK,
                  track: track4.id
               }))
         ]),

         Playlist.insertMany([
            {
               name: 'Rock Mix',
               owner: user.id,
               tracks: [track1.id, track3.id],
               followers: 10
            },
            {
               name: 'Jazz Mix',
               owner: user.id,
               tracks: [track2.id, track4.id],
               followers: 15
            }
         ]).then(playlists =>
            User.findByIdAndUpdate(user.id, {
               $push: { followingPlaylists: playlists.map(p => p._id) }
            })
         )
      ]);

      const result = await getCuratedLists(user.id);

      expect(result).to.have.all.keys('mostPlayed', 'likedTracks', 'followedMix', 'discoverWeekly');

      expect(result.mostPlayed.tracks).to.have.lengthOf(2);
      expect(result.mostPlayed.tracks[0].id).to.equal(track3.id);
      expect(result.mostPlayed.tracks[1].id).to.equal(track4.id);

      expect(result.likedTracks.tracks).to.have.lengthOf(2);
      expect(result.likedTracks.tracks[0].id).to.equal(track1.id);
      expect(result.likedTracks.tracks[1].id).to.equal(track2.id);

      const followedTracks = [track1, track2, track3, track4].map(t => t.id);
      expect(result.followedMix.tracks.map(t => t.id)).to.have.members(followedTracks);

      const discoveryIds = result.discoverWeekly.tracks.map(t => t.id);
      expect(discoveryIds).to.include.members([discoTrack1.id, discoTrack2.id]);
      expect(discoveryIds).not.to.include.members([track1.id, track2.id]);

      const logEntry = await Log.findOne({ user: user.id, type: constants.VIEWED_CURATED_PLAYLISTS });
      expect(logEntry).to.exist;
      expect(logEntry.user.toString()).to.equal(user.id);
      expect(logEntry.type).to.equal(constants.VIEWED_CURATED_PLAYLISTS);
   });

   it('returns empty likedTracks when user has no liked tracks', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const result = await getCuratedLists(user.id);

      expect(result.likedTracks.tracks).to.be.empty;
   });

   it('returns empty followedMix when user has no followed playlists', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const result = await getCuratedLists(user.id);

      expect(result.followedMix.tracks).to.be.empty;
   });

   it('returns empty mostPlayed when user has no play history', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const result = await getCuratedLists(user.id);

      expect(result.mostPlayed.tracks).to.be.empty;
   });

   it('returns empty discoverWeekly when no new tracks are available', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const [track1, track2] = await Track.insertMany([
         { name: 'New Rock', genre: 'rock', duration: 190, addedBy: user.id },
         { name: 'Fresh Jazz', genre: 'jazz', duration: 230, addedBy: user.id }
      ]);

      await User.findByIdAndUpdate(user.id, { $push: { likedTracks: [track1.id, track2.id] } });

      const playlist = await Playlist.create({
         name: 'Mix',
         owner: user.id,
         tracks: [track1.id, track2.id],
         followers: 1
      });
      await User.findByIdAndUpdate(user.id, { $push: { followingPlaylists: playlist.id } });

      const result = await getCuratedLists(user.id);
      expect(result.discoverWeekly.tracks).to.be.empty;
   });

   it('followedMix contains unique tracks from followed playlists', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const [track1, track2] = await Track.insertMany([
         { name: 'New Rock', genre: 'rock', duration: 190, addedBy: user.id },
         { name: 'Fresh Jazz', genre: 'jazz', duration: 230, addedBy: user.id }
      ]);

      const playlist1 = await Playlist.create({
         name: 'Playlist1',
         owner: user.id,
         tracks: [track1.id, track2.id],
         followers: 1
      });
      const playlist2 = await Playlist.create({
         name: 'Playlist2',
         owner: user.id,
         tracks: [track2.id],
         followers: 1
      });

      await User.findByIdAndUpdate(user.id, { $push: { followingPlaylists: [playlist1.id, playlist2.id] } });

      const result = await getCuratedLists(user.id);
      expect(result.followedMix.tracks).to.have.lengthOf(2);
      expect(result.followedMix.tracks.map(t => t.id)).to.have.members([track1.id, track2.id]);
   });

   it('fails when the user does not exist', async () => {
      await expect(getCuratedLists('66b2cebc5621e4111875102c')).to.be.rejectedWith(CredentialError, 'User does not exist');
   });

   it('fails with SystemError on database error on user search', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const findById = User.findById;
      User.findById = () => {
         throw new Error('Database connection error');
      };

      await expect(getCuratedLists(user.id)).to.be.rejectedWith(SystemError, 'Getting curated lists failed: Database connection error');

      User.findById = findById;
   });

   it('fails with SystemError on database error during aggregation (most played tracks)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const aggregate = Log.aggregate;
      Log.aggregate = () => {
         throw new Error('Database connection error (l)');
      };

      await expect(getCuratedLists(user.id)).to.be.rejectedWith(SystemError, 'Failed to get curated lists: Database connection error (l)');

      Log.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (liked mix)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const aggregate = Track.aggregate;
      Track.aggregate = () => {
         throw new Error('Database connection error (t)');
      };

      await expect(getCuratedLists(user.id)).to.be.rejectedWith(SystemError, 'Failed to get curated lists: Database connection error (t)');

      Track.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (followed mix)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const aggregate = Playlist.aggregate;
      Playlist.aggregate = () => {
         throw new Error('Database connection error (p)');
      };

      await expect(getCuratedLists(user.id)).to.be.rejectedWith(SystemError, 'Failed to get curated lists: Database connection error (p)');

      Playlist.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (discovery, genre search)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const aggregate = Track.aggregate;
      let trackAggregateCallCount = 0;
      Track.aggregate = function (pipeline) {
         trackAggregateCallCount++;
         if (trackAggregateCallCount === 2) {
            throw new Error('Database connection error (dis, gs)');
         }

         return aggregate.call(this, pipeline);
      };

      await expect(getCuratedLists(user.id)).to.be.rejectedWith(SystemError, 'Discovery failed: Database connection error (dis, gs)');

      Track.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (discovery, main query)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const aggregate = Track.aggregate;
      let trackAggregateCallCount = 0;
      Track.aggregate = function (pipeline) {
         trackAggregateCallCount++;
         if (trackAggregateCallCount === 3) {
            throw new Error('Database connection error (dis, mq)');
         }

         return aggregate.call(this, pipeline);
      };

      await expect(getCuratedLists(user.id)).to.be.rejectedWith(SystemError, 'Discovery failed: Database connection error (dis, mq)');

      Track.aggregate = aggregate;
   });

   it('fails with SystemError on database error during aggregation (discovery, requery)', async () => {
      const hash = await bcrypt.hash('Neon-Genesis02', 8);
      const user = await User.create({ username: 'eva02', email: 'asuka@soryu.com', passwordHash: hash });

      const aggregate = Track.aggregate;
      let trackAggregateCallCount = 0;
      Track.aggregate = function (pipeline) {
         trackAggregateCallCount++;
         if (trackAggregateCallCount === 4) {
            throw new Error('Database connection error (dis, rq)');
         }

         return aggregate.call(this, pipeline);
      };

      await expect(getCuratedLists(user.id)).to.be.rejectedWith(SystemError, 'Discovery failed: Database connection error (dis, rq)');

      Track.aggregate = aggregate;
   });

   it('fails when not provided with inputs', () => {
      expect(() => getCuratedLists()).to.throw(InvalidArgumentError, 'All inputs are required');
   });

   it('fails when user id is invalid', () => {
      expect(() => getCuratedLists('invalid')).to.throw(InvalidArgumentError, 'Invalid ObjectId');
   });

   after(async () => {
      await Promise.all([User.deleteMany(), Playlist.deleteMany(), Track.deleteMany(), Log.deleteMany()]);
      await mongoose.disconnect();
   });
});
