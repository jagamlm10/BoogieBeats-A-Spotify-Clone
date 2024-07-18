import { FaSearch } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ value, setValue }) => {
  return (
    <form className="relative w-full max-w-lg">
      <input
        value={value}
        type="text"
        name="query"
        className="w-full px-4 py-2 pr-12 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        placeholder="Search for Songs/Artists"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="absolute top-0 right-0 flex items-center justify-center h-full px-3 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:bg-blue-700"
      >
        <FaSearch className="w-4 h-4 text-white hover:text-gray-300" />
      </button>
    </form>
  );
};

export default SearchBar;
