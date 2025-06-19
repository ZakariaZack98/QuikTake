import React from 'react';

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex items-center w-full bg-white dark:text-white dark:bg-gray-800 text-sm">
      <svg
        className="w-5 h-5 text-gray-500 dark:bg-text-white mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        className="w-full focus:outline-none"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Search...'}
      />
    </div>
  );
};

export default SearchBox;
