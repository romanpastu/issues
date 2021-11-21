/* eslint-disable camelcase */
import React, { MouseEventHandler } from 'react';
import './search.css';

type IProps = {
    search: MouseEventHandler<HTMLButtonElement>,
    searchInput: any;
}

const Search: React.FC<IProps> = ({ searchInput, search }) => {
  return (
        <div className='searchContainer'>
            {searchInput} <button className='custom-btn btn-1' onClick={search}>Search</button>
        </div>
  );
};

export default Search;
