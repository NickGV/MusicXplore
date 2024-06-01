import{ useState } from 'react';
import SearchIcon from '@mui/icons-material/Search.js';

import './SearchBar.css'

export const SearchBar = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__input-container">
      <SearchIcon className='search-bar__icon'/>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="search-bar__input"
        />
      </div>
    </form>
  );
}


