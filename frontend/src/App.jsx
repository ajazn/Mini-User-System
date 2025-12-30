import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

// Components
import Navbar from "./components/Navbar";

function App() {
  const { user, loading } = useAuth();

  // Prevents "flickering" while checking the login token
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        {/* Main Content Area */}
        <main className="grow">
          <Routes>
            {/* 1. Public Route: Anyone can see this */}
            <Route path="/" element={<Home />} />

            {/* 2. Auth Routes: Redirect to profile if user is already logged in */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/profile" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/profile" />}
            />

            {/* 3. Protected Route: Only for logged-in users */}
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />

            {/* 4. Admin Route: Only for users with 'admin' role */}
            <Route
              path="/admin"
              element={
                user?.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/profile" />
                )
              }
            />

            {/* 5. Catch-all: Redirect unknown URLs to Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Simple Footer */}
        <footer className="bg-white border-t border-gray-100 py-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} UserSystem Project. All rights
          reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
