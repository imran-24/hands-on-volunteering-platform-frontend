import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className='relative w-full'>
      <input
        placeholder='Search'
        className='placeholder:text-neutral-500 w-full lg:w-1/2 p-2.5 pl-10 rounded-xl text-sm ring-1 ring-neutral-200 focus-visible:ring-neutral-400 focus-visible:outline-none text-neutral-800 bg-neutral-100'
      />
      <div className='absolute top-1/2 left-2 -translate-y-1/2'>
        <Search className='size-5 text-neutral-400' />
      </div>
    </div>
  );
};

export default SearchBar;
