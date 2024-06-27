import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  // Define the background color as a JavaScript object
  const backgroundColor = {
    backgroundColor: "black",
  };

  return (
    <form className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search…'
        style={backgroundColor}
        className='input input-bordered rounded-full text-white'
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
};

export default SearchInput;
