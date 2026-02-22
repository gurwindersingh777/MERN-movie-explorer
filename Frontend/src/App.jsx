import { Route, BrowserRouter, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NormalLayout from "./layouts/NormalLayout";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Protected routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>      
              <Route path="/" element={<Home />} />        
            </Route>

          {/* Public routes */}          
            <Route element={<NormalLayout />}>
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            </Route>

        </Routes>     
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
