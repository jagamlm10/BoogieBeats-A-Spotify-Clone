const { default: axios } = require("axios");
const SpotifyApi = require("spotify-web-api-node");


// ========================= Get lyrics ===============================
// GET : /api/songs/get_lyrics 
// Parameters : TrackName and Artist
const getLyrics = async (req, res) => {
  try {
    const { track, artist } = req.query;
    console.log("Track:", track);
    console.log("Artist:", artist);

    const response = await axios.get(
      `https://api.lyrics.ovh/v1/${artist}/${track}`
    );
    const lyrics = response.data.lyrics;
    const newLyrics = lyrics.replace("Paroles de la chanson ", "");
    console.log(newLyrics);
    res.json({ lyrics: newLyrics });
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Status Code:", error.response.status);
      console.error("Response Data:", error.response.data);
      console.error("Response Headers:", error.response.headers);

      // Respond with a clear message based on the status code
      if (error.response.status === 404) {
        res.status(404).json({ lyrics: "Lyrics Not Found" });
      } else {
        res
          .status(error.response.status)
          .json({ lyrics: "An error occurred while fetching lyrics" });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request Data:", error.request);
      res
        .status(500)
        .json({ lyrics: "No response received from the lyrics API" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error Message:", error.message);
      res.status(500).json({ lyrics: "Error in setting up the request" });
    }
  }
};


// =================================== Search For Songs based on song/artist name ==============================
// POST : api/songs/search
// Payload : accessToken , Search string
const searchResults = async (req, res) => {
  try {
    const { accessToken, search } = req.body;
    // console.log(accessToken, search);

    // Setup the spotifyWebApi 
    const spotifyApi = new SpotifyApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });
    // Set the access token
    spotifyApi.setAccessToken(accessToken);

    const response = await spotifyApi.searchTracks(search); // Search for tracks based on artist/songs
    const items = response.body.tracks.items; // Extract tracks from the response

    // Filter the tracks according to the needs 
    const results = items.map((track) => {
      // Getting the smallest image among all the album images using reduce
      const smallestImage = track.album.images.reduce((smallest, image) => {
        if (image.height < smallest.height) return image;
        return smallest;
      }, track.album.images[0]);
      // Getting the artist, title, and uri for everytrack
      return {
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumImg: smallestImage.url,
      };
    });

    res.json({ results });
  } catch (error) {
    console.log(error);
    res.json({ results: error });
  }
};

module.exports = { getLyrics, searchResults };

/*===================================================ROUGH WORK ============================================= */
// const lyrics = await lyricsFinder(artist, track);
// if (lyrics) {
//   console.log("Lyrics found:", lyrics);
//   res.json({ lyrics });
// } else {
//   console.log("No Lyrics Found");
//   res.json({ lyrics: "No Lyrics Found" });
// }
