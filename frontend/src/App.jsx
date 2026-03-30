import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TV from "./pages/TV";
import Bookmarks from "./pages/Bookmarks";
import { BookmarkProvider } from "./hooks/useBookmark";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <BookmarkProvider>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv" element={<TV />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
          </main>
        </div>
      </BookmarkProvider>
    </BrowserRouter>
  );
}

export default App;