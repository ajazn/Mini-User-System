import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-bold">
        Loading...
      </div>
    );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar /> {/* Navbar stays at the top of all pages */}
        <Routes>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/profile" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/profile" />}
          />

          <Route
            path="/profile"
            element={
              user ? (
                <div className="p-10 text-2xl">
                  Welcome to your Profile, {user.fullName}!
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
