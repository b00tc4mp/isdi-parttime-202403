import signIn from './auth/signIn';
import signUp from './auth/signUp';
import signOut from './auth/signOut';
import checkEmail from './auth/checkEmail';

import search from './search';
import { storage } from './storage.js';

import { playback } from './playback';
import player from './player.js';

export { signIn, signUp, signOut, checkEmail, search, storage, playback, player };

export default {
   signIn,
   signUp,
   signOut,
   checkEmail,
   search,
   storage,
   playback,
   player
};
