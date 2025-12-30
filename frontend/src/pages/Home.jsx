import { Link } from "react-router-dom";
import { ShieldCheck, Users, Lock, LayoutDashboard } from "lucide-react";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Secure <span className="text-blue-400">User Management</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          A robust Full-Stack solution featuring JWT authentication, role-based
          access control, and a modern React dashboard.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-slate-700 text-blue-400 border border-slate-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-600 transition"
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
          <Lock className="text-blue-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">JWT Security</h3>
          <p className="text-slate-300">
            Tokens are stored securely and verified on every request to protect
            your data.
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
          <LayoutDashboard className="text-blue-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">Admin Control</h3>
          <p className="text-slate-300">
            Admins can manage user statuses and roles through a dedicated
            dashboard.
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition">
          <Users className="text-blue-400 mb-4" size={32} />
          <h3 className="text-xl font-bold text-white mb-2">
            Profile Management
          </h3>
          <p className="text-slate-300">
            Users can update their personal information and passwords
            seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
