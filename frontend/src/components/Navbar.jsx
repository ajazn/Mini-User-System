import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, ShieldCheck, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 shadow-lg border-b border-slate-700 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold text-blue-400 flex items-center gap-2 hover:text-blue-300 transition"
      >
        <ShieldCheck size={28} />
        <span className="tracking-tight">AuthSystem</span>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            {/* ADMIN ONLY LINK: Only visible if user.role is 'admin' */}
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-slate-300 hover:text-blue-400 font-semibold transition"
              >
                <LayoutDashboard size={18} />
                <span>Admin Panel</span>
              </Link>
            )}

            {/* Profile Link */}
            <Link
              to="/profile"
              className="flex items-center gap-1 text-slate-300 hover:text-blue-400 font-medium transition"
            >
              <User size={18} />
              <span>{user.fullName}</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-400 hover:text-red-300 font-medium transition pl-2 border-l border-slate-600"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            {/* Guest Links */}
            <Link
              to="/login"
              className="text-slate-300 hover:text-blue-400 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg font-medium"
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
