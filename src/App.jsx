import "./App.css";
import { Player } from "./components/Player/Player";
import { MainSeccion } from "./components/MainSeccion/MainSeccion";
import { SearchBar } from "./components/Search/SearchBar";
import { MusicProvider } from "./context/MusicProvider";
import { PlayerProvider } from "./context/PlayerProvider";

function App() {
  return (
    <>
      <MusicProvider>
        <PlayerProvider>
          <header className="header">
            <h1 className="header__title">MusicXplore</h1>
            <SearchBar />
          </header>
          <MainSeccion />
          <Player /> 
        </PlayerProvider>
      </MusicProvider>
    </>
  );
}

export default App;
