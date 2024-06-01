import { useState } from 'react'
import './QueueItem.css'
import { PlaylistAdd, PlayArrow, Stop, Favorite, FavoriteBorder } from '@mui/icons-material';
import images from '../../assets/images.jpg'



export const QueueItem = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
        <div className={`song-queue ${isPlaying ? 'song-queue--active' : ''}`}   onClick={()=>setIsPlaying(!isPlaying)}>

          <div className='song-queue__details'>
            <img src={images} alt="" className='song-queue__img' />
            <div>
              <h2 className='song-queue__title'>Soulful rhythms</h2>
              <div className='song-queue__description'>
                <p className='song-queue__author'>soul</p>
                <span className='song-queue__duration'>3 min 30 sec</span>
              </div>
            </div>
          </div>
          <div className='song-queue__buttons'>
            <button type='button' className='song-queue__button'>
            <PlaylistAdd  />
            </button>
            <button type='button' className='song-queue__button' onClick={() => setIsFavorite(!isFavorite)}>
              {isFavorite ? <Favorite  /> : <FavoriteBorder  />}
            </button>
            <button type='button' className='song-queue__button' onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Stop  /> : <PlayArrow  />}
            </button>
          </div>
        </div>
  );
}
