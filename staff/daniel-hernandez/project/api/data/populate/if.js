// Calls YouTube's public API for a list of video details
export async function searchYoutube(query, key) {
   const YT_URL = 'https://www.googleapis.com/youtube/v3/search';
   // const MUSIC_CATEGORY_ID = 10; // Category ID for music on YouTube

   try {
      // const url = `${YT_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=${MUSIC_CATEGORY_ID}&key=${key}`;
      const url = `${YT_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${key}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
         throw new Error(data.error.message);
      }

      return data.items.map(video => ({
         title: video.snippet.title,
         description: video.snippet.description,
         publishedAt: video.snippet.publishedAt,
         channelTitle: video.snippet.channelTitle,
         videoId: video.id.videoId,
         url: `https://www.youtube.com/watch?v=${video.id.videoId}`
      }));
   } catch (error) {
      if (error.message && error.message.includes('quotaExceeded')) {
         throw new Error('Quota exceeded');
      } else {
         throw error;
      }
   }
}

// Magic o_0 (Gets info on a specific YouTube video by calling YouTube's internal API)
export async function getInfo(videoId) {
   // hard-coded from https://github.com/yt-dlp/yt-dlp/blob/master/yt_dlp/extractor/youtube.py
   const apiKey = 'AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc';

   const headers = {
      'X-YouTube-Client-Name': '5',
      'X-YouTube-Client-Version': '19.09.3',
      Origin: 'https://www.youtube.com',
      'User-Agent': 'com.google.ios.youtube/19.09.3 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)',
      'content-type': 'application/json'
   };

   const b = {
      context: {
         client: {
            clientName: 'IOS',
            clientVersion: '19.09.3',
            deviceModel: 'iPhone14,3',
            userAgent: 'com.google.ios.youtube/19.09.3 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)',
            hl: 'en',
            timeZone: 'UTC',
            utcOffsetMinutes: 0
         }
      },
      videoId,
      playbackContext: { contentPlaybackContext: { html5Preference: 'HTML5_PREF_WANTS' } },
      contentCheckOk: true,
      racyCheckOk: true
   };

   const r = await fetch(`https://www.youtube.com/youtubei/v1/player?key${apiKey}&prettyPrint=false`, {
      method: 'POST',
      body: JSON.stringify(b),
      headers
   });

   const d = await r.json();
   return d;
}
