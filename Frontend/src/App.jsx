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

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Protected routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>      
              <Route path="/" element={<Home />} />   
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
