/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import useAuth from "../customHooks/useAuth";
import Navbar from "../components/Navbar";
import TrackSearchResult from "../components/TrackSearchResult";
import Player from "../components/Player";
import axios from "axios";
import Loading from "../components/Loading";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code); // Get the accesToken using the authorization code
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // This choose track gets called when a searched track gets clicked.
  // It sets the current track a.k.a playingTrack to the track that was clickde on.
  const chooseTrack = (playingTrack) => {
    setPlayingTrack(playingTrack);
    setSearch("");
    setLyrics("");
  };

  // Method to fetch the lyrics
  const fetchLyrics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/songs/get_lyrics",
        {
          params: {
            track: playingTrack.title,
            artist: playingTrack.artist,
          },
        }
      );
      const data = response.data;
      // console.log(data);
      setLyrics(data.lyrics);
    } catch (error) {
      setLyrics(error.response.data.lyrics);
    }
  };

  // Method to fetch the search results
  const fetchSearches = async (songArtistSearch, cancel) => {
    // If the request is canceled then dont do anything
    if (cancel) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/songs/search",
        {
          accessToken: accessToken,
          search: songArtistSearch,
        }
      );
      // console.log(response.data);
      setSearchResults(response.data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.results);
    }
  };

  // This useEffect keeps the playing track up to date
  useEffect(() => {
    if (!playingTrack) return;

    fetchLyrics();
  }, [playingTrack]);

  // This useEffect fetches search results as soon as search changes
  useEffect(() => {
    if (!accessToken) return;
    // if the search is empty or the search only contains whitespaces then setSearchResults to []
    if (!search || search.trim() == "") {
      setSearchResults([]);
      return;
    }

    let cancel = false;
    fetchSearches(search, cancel);
    // The idea behind cancel is that, everytime the search changes too many request get fired to the server for search results.
    // This cancel helps in canceling few of the requests, by setting cancel = true in the cleanup function. By this, the function gets stopped before more serch results are fetched.
    return () => (cancel = true);
  }, [search]);

  return (
    <div
      className="container flex flex-col"
      style={{ height: "100vh"}}
    >
      <Navbar value={search} setValue={setSearch} />
      {/* Search Track Results  */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex-grow mt-2 mb-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => {
            // List of the search results. Clicking on one of the tracks will set the playingTrack to its uri.
            // Then this track is ready to be played in the player.
            return (
              <TrackSearchResult
                key={track.uri}
                track={track}
                chooseTrack={chooseTrack}
              />
            );
          })}
          {/* Lyrics  */}
          {searchResults.length === 0 && (
            <div
              className="max-w-md ml-12 md:ml-20 lg:ml-96"
              style={{ whiteSpace: "pre" }}
            >
              {lyrics}
            </div>
          )}
        </div>
      )}
      {/* Player  */}
      <div>
        {/* The Player component expects an array of uris its supposed to play.
            We initially set it to an empty array so as to not play any track.
            In the searchTrackResults, when a song is clicked, the cooseTrack funtion gets called,
            which in turn sets the playingTrack to the track that was clicked in search results.
            After the playingTrack value gets set to the track that was clicked, the player starts playing track based on the logic thats inside it. */}
        <Player accessToken={accessToken} track={playingTrack} />
      </div>
    </div>
  );
};

export default Dashboard;

/*=================================== ROUGH WORK======================================== */

// ======================== FOR fetching accesToken ========================

// const [tokenInfo, setTokenInfo] = useState({});

// const fetchToken = async () => {
//   await axios
//     .post("http://localhost:3000/api/auth/callback", {
//       code,
//     })
//     .then((res) => setTokenInfo(res.data.tokenInfo))
//     .catch((e) => console.log(e));
// };

// useEffect(() => {
//   fetchToken();
// }, []);

// console.log(tokenInfo);

// ============= For fetching searches ======================

// const spotifyApi = new SpotifyWebApi({
//   clientId: CLIENT_ID
//   clientSecret: CLIENT_SECRET,
// });

// useEffect(() => {
//   if (!accessToken) return;
//   spotifyApi.setAccessToken(accessToken);
// }, [accessToken]);

// spotifyApi.searchTracks(search).then((res) => {
//   if (cancel) return;
//   setSearchResults(
//     // Loop over the response and get the trackname,artist,uri and albumimage
//     res.body.tracks.items.map((track) => {
//       // This function finds the smallest image among all the album images
//       const smallestImage = track.album.images.reduce((smallest, image) => {
//         if (image.height < smallest.height) return image;
//         return smallest;
//       }, track.album.images[0]);
//       // Getting the artist, title, and uri for everytrack
//       return {
//         artist: track.artists[0].name,
//         title: track.name,
//         uri: track.uri,
//         albumImg: smallestImage.url,
//       };
//     })
//   );
//   // console.log(res.body.tracks.items);
// });
