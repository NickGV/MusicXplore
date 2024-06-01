import './NavBar.css'

import {Search, LibraryMusic, FavoriteBorder} from '@mui/icons-material'

export const NavBar = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-bar__links">
        <li className="nav-bar__link"><Search/>Discover</li>
        <li className="nav-bar__link"><LibraryMusic/>Library</li>
        <li className="nav-bar__link"><FavoriteBorder/>Favorites</li>
      </ul>
    </nav>
  )
}
