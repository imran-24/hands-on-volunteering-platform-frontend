import SearchBar from "./search-bar";

const Header = () => {
  return (
    <div className='w-full h-20 px-2 lg:px-0 sticky top-0 z-10 bg-white'>
      <div className='relative h-full flex items-center '>
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
