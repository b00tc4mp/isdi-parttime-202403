const types = ['targetUser', 'track', 'playlist', 'album', 'query', 'targetId'];
const queryTypes = ['user', 'track', 'playlist', 'album'];
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;
const LOGGED_IN = 'logged_in';
const LOGGED_OUT = 'logged_out';
const REGISTERED = 'registered';
const SEARCHED = 'searched';
const LIKED_TRACK = 'liked_track';
const DISLIKED_TRACK = 'disliked_track';
const REQUESTED_TRACK = 'requested_track';
const CREATED_TRACK = 'created_track';
const EDITED_TRACK = 'edited_track';
const REMOVED_TRACK = 'removed_track';
const PLAYED_TRACK = 'played_track';
const PAUSED_TRACK = 'paused_track';
const SKIPPED_TRACK = 'skipped_track';
const REWOUND_TRACK = 'rewound_track';
const LOOPED_TRACK = 'looped_track';
const SHUFFLED_TRACK = 'shuffled_track';
const DOWNLOADED_TRACK = 'downloaded_track';
const ADJUSTED_VOLUME = 'adjusted_volume';
const CREATED_PLAYLIST = 'created_playlist';
const EDITED_PLAYLIST = 'edited_playlist';
const ADDED_TO_PLAYLIST = 'added_to_playlist';
const REMOVED_FROM_PLAYLIST = 'removed_from_playlist';
const FOLLOWED_USER = 'followed_user';
const UNFOLLOWED_USER = 'unfollowed_user';
const FOLLOWED_PLAYLIST = 'followed_playlist';
const UNFOLLOWED_PLAYLIST = 'unfollowed_playlist';
const FOLLOWED_ALBUM = 'followed_album';
const UNFOLLOWED_ALBUM = 'unfollowed_album';
const SYNCED_OFFLINE_TRACKS = 'synced_offline_tracks';
const MANAGED_OFFLINE_STORAGE = 'managed_offline_storage';
const SHARED_TRACK = 'shared_track';
const SHARED_PLAYLIST = 'shared_playlist';
const VIEWED_USER_PLAYLISTS = 'viewed_user_playlists';
const VIEWED_USER_FOLLOWERS = 'viewed_user_followers';
const VIEWED_USER_FOLLOWING = 'viewed_user_following';
const VIEWED_USER_LIKED_TRACKS = 'viewed_user_liked_tracks';
const VIEWED_USER_CREATED_PLAYLISTS = 'viewed_user_created_playlists';
const VIEWED_USER_CREATED_TRACKS = 'viewed_user_created_tracks';
const VIEWED_USER_CREATED_ALBUMS = 'viewed_user_created_albums';

export default {
   types,
   queryTypes,
   DEFAULT_LIMIT,
   MAX_LIMIT,
   LOGGED_IN,
   LOGGED_OUT,
   REGISTERED,
   SEARCHED,
   LIKED_TRACK,
   DISLIKED_TRACK,
   REQUESTED_TRACK,
   CREATED_TRACK,
   EDITED_TRACK,
   REMOVED_TRACK,
   PLAYED_TRACK,
   PAUSED_TRACK,
   SKIPPED_TRACK,
   REWOUND_TRACK,
   LOOPED_TRACK,
   SHUFFLED_TRACK,
   DOWNLOADED_TRACK,
   ADJUSTED_VOLUME,
   CREATED_PLAYLIST,
   EDITED_PLAYLIST,
   ADDED_TO_PLAYLIST,
   REMOVED_FROM_PLAYLIST,
   FOLLOWED_USER,
   UNFOLLOWED_USER,
   FOLLOWED_PLAYLIST,
   UNFOLLOWED_PLAYLIST,
   FOLLOWED_ALBUM,
   UNFOLLOWED_ALBUM,
   SYNCED_OFFLINE_TRACKS,
   MANAGED_OFFLINE_STORAGE,
   SHARED_TRACK,
   SHARED_PLAYLIST,
   VIEWED_USER_PLAYLISTS,
   VIEWED_USER_FOLLOWERS,
   VIEWED_USER_FOLLOWING,
   VIEWED_USER_LIKED_TRACKS,
   VIEWED_USER_CREATED_PLAYLISTS,
   VIEWED_USER_CREATED_TRACKS,
   VIEWED_USER_CREATED_ALBUMS
};
