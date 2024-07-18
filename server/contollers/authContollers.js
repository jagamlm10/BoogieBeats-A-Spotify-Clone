const SpotifyWebApi = require("spotify-web-api-node");

/*
-> From the SpotifyWebApi we get the data. The tokens are present in this data, along with expiresIn and expiresAt.
-> In case of request made from , tokens present in response.data
-> Axios payload present in the request.body
*/

// Send the auth url so that user can navigate and grant permission
const url = async (req, res, next) => {
  const scope = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
  ].join("%20");
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&scope=${scope}`;
  res.json({ authUrl });
};

// Get the authorization code we got from spotify after the user granted us permission.
// Use this code to get the access token.
const callback = async (req, res, next) => {
  try {
    const { code } = req.body;
    const credentials = {
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    };
    const spotifyApi = new SpotifyWebApi(credentials);

    spotifyApi
      .authorizationCodeGrant(code)
      .then((data) => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
        });
        // res.json({ accessToken: data.body?.access_token });
      })
      .catch((e) => {
        console.log("during access", e);
        res.json(e.body.error_description);
      });
  } catch (error) {
    // console.log(error.body);
    res.json(error.body.error_description);
  }
};

// Refresh access token
const refresh = async (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken,
  };
  const spotifyApi = new SpotifyWebApi(credentials);

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log("Token refreshed successfully..");
      res.json({ accessToken: data.body.access_token });
    })
    .catch((e) => {
      console.log("during refresh", e);
      res.json(e.body.error_description);
    });
};

module.exports = { url, callback, refresh };

/* ============================================ ROUGH WORK ======================================== */
// streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state

//   const scopes = [
//     "streaming",
//     "user-read-email",
//     "user-read-private",
//     "user-library-read",
//     "user-library-modify",
//     "user-read-playback-state",
//     "user-modify-playback-state",
//   ];
//   const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     redirectUri: redirectUri,
//   });

//   const authUrl = spotifyApi.createAuthorizeURL(scopes);
