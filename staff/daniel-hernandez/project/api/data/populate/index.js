import 'dotenv/config';

import { resolve, dirname } from 'path';
import { readdir, unlink, rename, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import exec from './utils/exec-promisified.js';
import { homedir } from 'os';

import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import puppeteer, { TimeoutError } from 'puppeteer';
import open from 'open';

import { searchYoutube, getInfo } from './if.js';
import { ConnectionError, FetchError, InvalidArgumentError, SystemError } from 'com/errors.js';
import { User, Album, Track } from '../index.js';

const { SP_CLIENT_SECRET, SP_CLIENT_ID, SP_REDIRECT_URI, YT_API_KEY3, POPULATED_ACCOUNTS_PASSWORD, DEV_PASSWORD, MONGO_TEST_URI, MONGO_URI, TRACK_DIR } = process.env;

// Sorry to the future people that have to improve this. :^)
// This is the minimum working product populate script. This will get improved.

async function start() {
   const api = express();

   api.get('/login', (_, res) => {
      res.redirect(`https://accounts.spotify.com/authorize?${new URLSearchParams({ response_type: 'code', client_id: SP_CLIENT_ID, scope: 'user-library-read', redirect_uri: SP_REDIRECT_URI })}`);
   });

   api.get('/callback', async (req, res) => {
      const response = await fetch('https://accounts.spotify.com/api/token', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${SP_CLIENT_ID}:${SP_CLIENT_SECRET}`).toString('base64')}`
         },
         body: new URLSearchParams({ code: req.query.code, redirect_uri: SP_REDIRECT_URI, grant_type: 'authorization_code' })
      });

      const data = await response.json();
      res.send('Spotify authentication complete. :3');

      await getLikedInformation(data.access_token);
   });

   api.listen(8888, () => {
      open(`http://localhost:8888/login`);
   });
}

// info from bread.dev account
async function getLikedInformation(accessToken) {
   let url = 'https://api.spotify.com/v1/me/tracks?limit=50';
   const albums = {};

   while (url) {
      const res = await fetch(url, {
         headers: { Authorization: `Bearer ${accessToken}` }
      });

      const data = await res.json();

      if (!data || !data.items) {
         throw new InvalidArgumentError('No data or items found in the response');
      }

      for (const item of data.items) {
         if (albums[item.track.album.id]) continue;

         const aRes = await fetch(`https://api.spotify.com/v1/albums/${item.track.album.id}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
         });

         const aData = await aRes.json();
         if (!aData) throw new SystemError(`No album data found for "${item.track.album.id}"`);

         const _res = await fetch(`https://api.spotify.com/v1/artists/${item.track.artists[0].id}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
         });

         const _data = await _res.json();
         const genres = _data.genres || [];

         // TODO: Get artists: bio && profileImage
         albums[item.track.album.id] = {
            name: aData.name,
            type: aData.tracks.items.length <= 1 ? 'single' : 'album',
            artists: aData.artists.map(artist => artist.name),
            releaseDate: aData.release_date,
            coverArt: aData.images.length > 0 ? aData.images[0].url : '',
            genre: genres[0] || 'Unknown',
            tracks: aData.tracks.items.map(track => ({
               name: track.name,
               addedBy: null,
               artists: track.artists.map(artist => artist.name),
               duration: Math.floor(track.duration_ms / 1000),
               genre: genres[0] || 'Unknown',
               releaseDate: aData.release_date,
               coverArt: aData.images.length > 0 ? aData.images[0].url : '',
               lyrics: '',
               spId: track.id
            }))
         };
      }

      url = data.next;
   }

   await downloadAndPopulate(Object.values(albums));
}

async function downloadAndPopulate(albums) {
   // try {
   //    // Downloads and converts tracks to mp3 and names them to their spId in the output folder
   //    await downloadTracks(albums);
   //    console.log('Finished downloading songs from bread.dev');
   // } catch (e) {
   //    throw new SystemError(`Failed to download tracks: ${e.message}`);
   // }
   // WARN: Do one or the other to avoid problems / make a copy of output in case something goes wrong and you need to retry.
   // for (const album of albums) {
   //    try {
   //       // Populates database with the formatted album information and renames and moves the spId tracks from output to this databases ids and into the tracks directory
   //       await populateDatabase(album);
   //    } catch (e) {
   //       throw new SystemError(`Failed to populate database: ${e.message}`);
   //    }
   // }
   // console.log('Finished populating database with the downloaded songs from bread.dev');
}

async function downloadTracks(albums) {
   for (const album of albums) {
      console.log(`Downloading album ${album.name}`);
      for (const track of album.tracks) {
         if (await fileExists(`${resolve(dirname(fileURLToPath(import.meta.url)), './output')}/${track.spId}`)) {
            console.log(`Track "${track.name}" already exists, skipping download.`);
            continue;
         }

         try {
            // Construct a query with the track title and artist names separated by a comma
            const query = `${track.name} ${track.artists.map(artist => artist).join(', ')}`;

            // Search youtube to get videos that match the query (public yt api)
            const videos = await searchYoutube(query, YT_API_KEY3);
            if (videos.length === 0) throw new FetchError(`No videos found for ${query}`);

            // Get information on the selected video streaming data (internal yt api)
            const info = await getInfo(videos[0].videoId);
            const audio = info.streamingData.adaptiveFormats.find(f => f.mimeType.includes('audio/mp4') && f.quality === 'tiny');
            if (!audio) throw new SystemError(`Media link not found for ${videos[0].videoId} at tiny`);

            // Use puppeteer to download the video audio (when trying to read the stream YouTube detects this and terminates your stream near the end)
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page._client().send('Page.setDownloadBehavior', {
               behavior: 'allow',
               downloadPath: resolve(dirname(fileURLToPath(import.meta.url)), './output')
            });

            await page.goto(audio.url, { waitUntil: 'domcontentloaded' });
            await delay(2500);

            await page.waitForSelector('video[name="media"]');
            const element = await page.$('[name="media"]');
            if (element) {
               await page.evaluate(e => {
                  e.pause();
               }, element);

               await element.click();

               for (let i = 0; i < 5; i++) {
                  await page.keyboard.press('Tab');
                  await delay(500);
               }

               for (let i = 0; i < 2; i++) {
                  await page.keyboard.press('Enter');
                  await delay(500);
               }

               // Close page to trigger download in bigger files (30mins +)
               await delay(1000);
               await page.close();

               const { path, file } = await isFileDownloaded([resolve(dirname(fileURLToPath(import.meta.url)), './output'), resolve(homedir(), 'Downloads')]);
               await browser.close();

               // Convert mp4 file to an mp3
               // Could use a ffmpeg library
               await exec(`ffmpeg -i "${path}/${file}" -vn -ar 44100 -ac 2 -b:a 192k -f mp3 "${resolve(dirname(fileURLToPath(import.meta.url)), './output')}/${track.spId}"`);

               // Remove the mp4
               await unlink(`${path}/${file}`);
            }
         } catch (e) {
            throw new SystemError(`Failed to download track: ${track.name}: ${e.message}`);
         }
      }
   }
}

async function populateDatabase(album) {
   let dev;
   try {
      dev = await User.findOne({ username: 'developer' });

      if (!dev) {
         dev = await User.create({ username: 'developer', passwordHash: await bcrypt.hash(DEV_PASSWORD, 8), email: 'dev@e.c' });
      }
   } catch {
      throw new SystemError("Couldn't initialize dev account");
   }

   try {
      const existingAlbum = await Album.findOne({ name: album.name, releaseDate: album.releaseDate });
      if (existingAlbum) {
         console.log(`Album "${album.name}" already exists in the database, skipping...`);
         return;
      }

      // Find or create artists
      const artistIds = [];
      for (const _artist of album.artists) {
         // Replace invalid characters
         let validUsername = _artist
            .toLowerCase()
            .replace(/[^a-z0-9._]/g, '_') // Replace invalid characters with underscores
            .replace(/([._])\1+/g, '$1'); // Replace consecutive dots or underscores

         // Enforce length limits
         validUsername = validUsername.length > 13 ? validUsername.slice(0, 13) : validUsername;
         if (validUsername.length < 3) {
            validUsername = validUsername.padEnd(3, '123');
         }

         // Ensure the username starts and ends with an alphanumeric character
         validUsername = validUsername.replace(/^[._]+|[._]+$/g, ''); // Remove starting or ending dots/underscores
         if (validUsername.length < 3) {
            validUsername = 'user_' + validUsername.padEnd(3, '123'); // Ensure minimum length
         }

         // Ensure the username fits the regex length requirements
         while (!/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{3,13}[a-zA-Z0-9]$/.test(validUsername)) {
            validUsername = validUsername + '1';
         }

         let artist = await User.findOne({ username: validUsername });

         if (!artist) {
            artist = new User({
               username: validUsername,
               email: `${validUsername}@e.com`,
               passwordHash: await bcrypt.hash(POPULATED_ACCOUNTS_PASSWORD, 8)
            });
            await artist.save();
         }

         artistIds.push(artist._id);
      }

      // Create album document
      const _album = new Album({
         name: album.name,
         type: album.type,
         artists: artistIds,
         releaseDate: album.releaseDate,
         coverArt: album.coverArt
      });
      await _album.save();

      // Create track documents
      const trackIds = [];
      for (const _track of album.tracks) {
         const existingTrack = await Track.findOne({ name: _track.name, releaseDate: _track.releaseDate });
         if (existingTrack) {
            console.log(`Track "${_track.name}" already exists in the database, skipping...`);
            trackIds.push(existingTrack._id);
            continue;
         }

         const trackArtistIds = [];
         for (let trackArtistName of _track.artists) {
            // Apply same transformation logic for track artists
            let validUsername = trackArtistName
               .toLowerCase()
               .replace(/[^a-z0-9._]/g, '_')
               .replace(/([._])\1+/g, '$1');

            validUsername = validUsername.length > 13 ? validUsername.slice(0, 13) : validUsername;
            if (validUsername.length < 3) {
               validUsername = validUsername.padEnd(3, '123');
            }

            validUsername = validUsername.replace(/^[._]+|[._]+$/g, '');
            if (validUsername.length < 3) {
               validUsername = 'user_' + validUsername.padEnd(3, '123');
            }

            while (!/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{3,13}[a-zA-Z0-9]$/.test(validUsername)) {
               validUsername = validUsername + '1';
            }

            let trackArtist = await User.findOne({ username: validUsername });

            if (!trackArtist) {
               trackArtist = new User({
                  username: validUsername,
                  email: `${validUsername}@e.com`,
                  passwordHash: await bcrypt.hash(POPULATED_ACCOUNTS_PASSWORD, 8)
               });
               await trackArtist.save();
            }

            trackArtistIds.push(trackArtist._id);
         }

         const track = new Track({
            name: _track.name,
            addedBy: dev._id,
            artists: trackArtistIds,
            album: _album._id,
            duration: _track.duration,
            genre: _track.genre || album.genre,
            releaseDate: _track.releaseDate,
            coverArt: _track.coverArt || album.coverArt,
            lyrics: _track.lyrics
         });
         await track.save();
         trackIds.push(track._id);

         await delay(500);
         try {
            await rename(`${resolve(dirname(fileURLToPath(import.meta.url)), './output')}/${_track.spId}`, `${TRACK_DIR}/${track._id}`);
            console.log(`Renamed file from "${_track.spId}" to "${track._id}"`);
         } catch (e) {
            throw new SystemError(`Failed to rename file ${_track.name}`);
         }
      }

      _album.tracks = trackIds;
      await _album.save();

      console.log(`Album "${album.name}" and its tracks have been populated successfully`);
   } catch (e) {
      throw new SystemError(`${album.name} : ${e.message}`);
   }
}

// FIX: 24 hour timeout is incorrect lol
async function isFileDownloaded(directories, timeout = 86400000) {
   const start = Date.now();
   while (Date.now() - start < timeout) {
      for (const directory of directories) {
         const files = await readdir(directory);
         const file = files.find(f => f.endsWith('.mp4') && f.startsWith('videoplayback'));

         if (file) return { path: directory, file };
      }
   }
   throw new TimeoutError('Download timed out');
}

async function delay(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

async function fileExists(filePath) {
   try {
      await stat(filePath);
      return true;
   } catch {
      return false;
   }
}

(async () => {
   try {
      await mongoose.connect(MONGO_URI);
   } catch (e) {
      throw new ConnectionError(`Mongoose connection failed: ${e.message}`);
   }

   try {
      await start();
   } catch (e) {
      throw new SystemError(`Script failed: ${e.message}`);
   }
})();

process.on('SIGINT', async () => {
   await mongoose.disconnect();
   process.exit(0);
});
