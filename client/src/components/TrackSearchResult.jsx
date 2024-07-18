/* eslint-disable react/prop-types */
const TrackSearchResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };
  return (
    <div
      className="flex items-center m-2 gap-2 cursor-pointer max-w-md ml-12 md:ml-20 lg:ml-96 bg-gray-100 rounded-md"
      onClick={handlePlay}
    >
      <img
        src={track.albumImg}
        style={{ height: "48px", width: "48px", borderRadius: "0.6rem" }}
        alt={track.title}
      />
      <div>
        <div>{track.title}</div>
        <div className="text-gray-500 text-sm">{track.artist}</div>
      </div>
    </div>
  );
};

export default TrackSearchResult;
