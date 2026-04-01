import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { BookmarkProvider } from "./hooks/useBookmark";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TV from "./pages/TV";
import Bookmarks from "./pages/Bookmarks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BookmarkProvider>
          <Routes>
            {/* public auth pages — no navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* main app pages — with navbar */}
            <Route path="/*" element={
              <div className="app-layout">
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tv" element={<TV />} />
                    <Route path="/bookmarks" element={
                      <ProtectedRoute>
                        <Bookmarks />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
              </div>
            } />
          </Routes>
        </BookmarkProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;