/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, track }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [track]);

  if (!accessToken) return null;

  return (
    <div>
      <SpotifyPlayer
        play={play}
        // This callback function gets called whenever we the state of the player changes.
        // To synchronize the 'play' state with the state of the player we set the play to false whenever the state of the player is paused.
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        showSaveIcon
        token={accessToken}
        uris={track.uri ? [track.uri] : []} // Player takes in an array of uris. We pass in the uri of our choosen track
        styles={{
          sliderColor: "#1D6FA9",
          bgColor: "#EEEEEE",
          color: "#A91D3A",
        }}
      />
    </div>
  );
};

export default Player;
