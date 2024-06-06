import { useState } from 'react';

import { SongItem  } from '../Song/SongItem';
import {search} from '../../api/spotifyService'
import './SearchResults.css'
import { GridView,  FormatListBulleted } from '@mui/icons-material';

export const SearchResults = () => {
  const [viewType, setViewType] = useState('list');
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await search('kballero', 'track,playlist,artist');
    setResults(data);
  };

  return (
    <section className='results'>
      <div className='results__header'>
        <h1 className='results__title'>Results</h1>
        <div className='results__views-btn'>
          <button type='button' onClick={() => setViewType('list')}>
            <FormatListBulleted   className='results__button-icon'  />
          </button>
          <button type='button' onClick={() => setViewType('grid')}>
            <GridView className='results__button-icon' />
          </button>
        </div>
      </div>
      
      <button onClick={handleSearch}>click</button>
      <div>
        <ul>
          <li>
            <a href="#tracks">Tracks</a>
          </li>
          <li>
            <a href="#playlists">Playlist</a>
          </li>
          <li>
            <a href="#artists">Artists</a>
          </li>
        </ul>
        {results && (
          <div>
            <h2>Tracks</h2>
            <div className={`songs-container ${viewType === 'grid' ?'grid': 'list'}`} id='tracks'>
              {results.tracks.items.map((item) => (
                <SongItem viewType={viewType} key={item.id} name={item.name} artists={item.artists}/>
              ))}
            </div>
            <h2>Playlists</h2>
            <div id='playlists'>
              {results.playlists.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </div>
            <h2>Artists</h2>
            <div id='artists'>
              {results.artists.items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
