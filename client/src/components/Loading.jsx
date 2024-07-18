import LoadingGIF from "../assets/loading_gif.gif";
const Loading = () => {
  return (
    <div className="my-36 max-w-md ml-12 md:ml-20 lg:ml-96 h-screen">
      <img src={LoadingGIF} alt="" />
    </div>
  );
};

export default Loading;
