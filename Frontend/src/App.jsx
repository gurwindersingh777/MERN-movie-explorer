import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NormalLayout from "./layouts/NormalLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { Toaster } from "./components/ui/sonner";
import MediaDetails from "./pages/MediaDetails";
import Search from "./pages/Search";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import WatchLater from "./pages/WatchLater";
import Genre from "./pages/Genre";
import GenrePage from "./pages/GenrePage";
import MediaPage from "./pages/MediaPage";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Protected routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>      
              <Route path="/" element={<Home />} />   
              <Route path="/movies" element={<Movies />} />   
              <Route path="/tv" element={<TvShows />} />   
              <Route path="/genre" element={<Genre />} />   
              <Route path="/genre/:media_type/:genre_name/:genre_id" element={<GenrePage />} />   
              <Route path="/media/:category/:media_type/:time_window?" element={<MediaPage />} />   
              <Route path="/watchlater" element={<WatchLater/>} />   
              <Route path="/favorite" element={<Favorites/>} />   
              <Route path="/profile" element={<Profile/>} />   
              <Route path="/media-details/:media_type/:id" element={<MediaDetails/>} /> 
              <Route path="/search/:q" element={<Search/>} /> 
            </Route>

          {/* Public routes */}          
            <Route element={<NormalLayout />}>
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            </Route>

        </Routes>     
      </BrowserRouter>
      <Toaster/>
    </>
  );
}

export default App;
