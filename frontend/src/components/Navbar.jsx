import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, ShieldCheck } from "lucide-react"; // Icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-bold text-blue-600 flex items-center gap-2"
      >
        <ShieldCheck size={28} />
        <span>UserSystem</span>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* Show Admin Dashboard link only if user is an admin */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Admin Panel
              </Link>
            )}

            <Link
              to="/profile"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <User size={18} />
              <span>{user.fullName}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
