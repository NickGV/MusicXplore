import { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search.js";
import { MusicContext } from "../../context/MusicContext";
import "./SearchBar.css";
import { search } from "../../api/spotifyService";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { handleResults, setIsLoading } = useContext(MusicContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (query.length > 0) {
      setIsLoading(true);
      const data = await search(query, "track,playlist");
      setIsLoading(false);
      handleResults(data);
      navigate("/"); 
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__input-container">
        <SearchIcon className="search-bar__icon" />
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
};
