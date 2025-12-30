import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // Import Signup
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
      <Routes>
        {/* If logged in, redirect away from login/signup */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/profile" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/profile" />}
        />

        {/* Placeholder for Profile */}
        <Route
          path="/profile"
          element={
            user ? (
              <div className="p-10">Welcome, {user.fullName}!</div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
