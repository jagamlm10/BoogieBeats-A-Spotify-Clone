import SearchBar from './SearchBar';
import Logo from '../assets/logo.png'

// eslint-disable-next-line react/prop-types
const Navbar = ({ value, setValue }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 text-blue-500">
              <img src={Logo} className="h-10 w-12 rounded-md"  alt="" />
            </a>
          </div>
          <div className="flex-1 flex justify-center">
            <SearchBar value={value} setValue={setValue} />
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="/services" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Services</a>
            <a href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
