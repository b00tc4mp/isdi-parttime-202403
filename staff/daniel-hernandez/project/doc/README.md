# < BMP ([bread's, baker] music player)>

BMP is a minimalistic music player made in react native.

## Functionality

**User**

-  Search tracks
-  Like track
-  Create track
-  Edit track
-  Remove track
-  Play track
-  Pause track
-  Skip track
-  Rewind track
-  Loop track
-  Shuffle tracks
-  Download track
-  Adjust volume
-  Create playlist
-  Edit playlist
-  Add track to playlist
-  Remove track from playlist
-  Follow user
-  Sync offline tracks
-  Manage offline storage
-  Share tracks
-  Share playlists
-  View users playlists

**Anonymous user**

-  Search tracks
-  Play track
-  Pause track
-  Skip track
-  Rewind track
-  Loop track
-  Shuffle tracks
-  Adjust volume
-  Manage offline storage

## Version 0.1

**User**

-  Display lyrics
-  Show artist information
-  Show album information
-  Rate tracks to improve recommendations
-  Get recommendations
-  Browse recommendations

## UI Design

<!-- Add brief description and design goals -->
<!-- finish figma wireframe / design 30% -->

**_[< figma design >](https://www.figma.com/design/bqz9Li4Bc52inExtdoB248/BMP-wireframe?node-id=0-1&t=VEYcDps9vwzUtj2g-1)_**

**Design Goals:**

-  Minimalistic and user-friendly interface
-  Seamless navigation and interaction
-  High performance and responsiveness

## Features

#### Listen to Music

-  Goal: Play tracks from their library or streaming service
-  Functionality: Browse library, select tracks, play/pause, skip, rewind, adjust volume, and create playlists

#### Manage Music Library

-  Goal: Organize their music collection
-  Functionality: Add/remove tracks, create/edit playlists, edit track metadata (title, artist, album), and search for tracks

## Additional Features (Version 0.1)

#### Discover New Music

-  Goal: Find new tracks and artists
-  Functionality: Browse/get recommendations, add new tracks to their library

#### Offline Playback

-  Goal: Listen to music without an internet connection
-  Functionality: Download tracks for offline playback, manage offline storage, and sync offline tracks

#### Social Sharing

-  Goal: Share music with friends and see what others are listening to
-  Functionality: Share tracks or playlists, follow users, and view users' playlists

#### Personalized Recommendations

-  Goal: Get personalized track and playlist recommendations
-  Functionality: Receive daily/weekly recommendations based on listening history and track rating to improve recommendations

#### Lyrics and Track Information

-  Goal: View lyrics and information about the currently playing track
-  Functionality: Display lyrics, show artist information, and provide album details

## Technical

### Core Data Models

#### User

-  id: UUID
-  username: String
-  email: String
-  passwordHash: String
-  bio: String
-  profileImage: String
-  createdAt: Date
-  updatedAt: Date
-  likedTracks: [Track.id] // References to Track
-  following: [User.id]
-  settings:
   -  theme: String
   -  notifications: Boolean

#### Track

-  id: UUID
-  title: String
-  artist: User.id // Reference to User \*\* Additional Feature
-  album: Album.id // Reference to Album \*\* Additional Feature
-  duration: Number
-  genre: String
-  releaseDate: Date
-  coverArt: String
-  lyrics: String
-  createdAt: Date
-  updatedAt: Date

#### Playlist

-  id: UUID
-  name: String
-  description: String
-  createdBy: User.id // Reference to User
-  tracks: [Track.id] // References to Tracks
-  createdAt: Date
-  updatedAt: Date

#### Album

-  id: UUID
-  title: String
-  artist: User.id // Reference to User
-  releaseDate: Date
-  coverArt: String
-  createdAt: Date
-  updatedAt: Date
-  tracks: [Track.id] // References to Track

#### Log

-  id: UUID
-  user: User.id // Reference to User
-  type: String // e.g, played, liked, shared
-  track: Track.id // Reference to Track (if applicable)
-  createdAt: Date
