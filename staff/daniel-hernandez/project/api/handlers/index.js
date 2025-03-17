import loginHandler from './auth/login.js';
import registerHandler from './auth/register.js';
import checkEmailHandler from './auth/checkEmail.js';

import logHandler from './log.js';
import queryHandler from './query.js';

import streamHandler from './stream.js';
import playerHandler from './player.js';

import followUserHandler from './user/followUser.js';
import getUserInfoHandler from './user/getUserInfo.js';

import getPlaylistInfoHandler from './playlist/getPlaylistInfo.js';
import followPlaylistHandler from './playlist/followPlaylist.js';

import getAlbumInfoHandler from './album/getAlbumInfo.js';

import getRecentPlaysHandler from './track/getRecentPlays.js';
import likeTrackHandler from './track/likeTrack.js';

import getCuratedListsHandler from './list/getCuratedLists.js';

export default {
   loginHandler,
   registerHandler,
   checkEmailHandler,

   logHandler,
   queryHandler,

   streamHandler,
   playerHandler,

   followUserHandler,
   getUserInfoHandler,

   getPlaylistInfoHandler,
   followPlaylistHandler,

   getAlbumInfoHandler,

   getRecentPlaysHandler,
   likeTrackHandler,

   getCuratedListsHandler
};
