import { useState } from 'react';

import { SongItem  } from '../Song/SongItem';
import './SearchResults.css'
import { GridView, ViewList, ViewListOutlined, FormatListBulleted } from '@mui/icons-material';

export const SearchResults = () => {
  const [viewType, setViewType] = useState('list');
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
      <div className={`songs-container ${viewType === 'grid' ?'grid': 'list'} `}>
        <SongItem viewType={viewType}/>
        <SongItem viewType={viewType}/>
      
      </div>
    </section>
  );
}
