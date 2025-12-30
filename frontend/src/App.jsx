import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
// import AdminDashboard from './pages/AdminDashboard'; // We will create this next

function App() {
  const { user, loading } = useAuth();

  // Show a clean loading screen while checking if the user is logged in
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes: Redirect to profile if already logged in */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/profile" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/profile" />}
            />

            {/* Private Route: Only for logged-in users */}
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />

            {/* Admin Route: Only for users with role 'admin' */}
            {/* <Route 
              path="/admin" 
              element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/profile" />} 
            /> 
            */}

            {/* Default Redirects */}
            <Route
              path="/"
              element={<Navigate to={user ? "/profile" : "/login"} />}
            />
            <Route
              path="*"
              element={
                <div className="text-center mt-20 text-2xl">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
