import { Link } from "react-router-dom";
import { ShieldCheck, Users, Lock, LayoutDashboard } from "lucide-react";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Secure <span className="text-blue-600">User Management</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <Lock className="text-blue-600 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">JWT Security</h3>
          <p className="text-gray-600">
            Tokens are stored securely and verified on every request to protect
            your data.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <LayoutDashboard className="text-blue-600 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">Admin Control</h3>
          <p className="text-gray-600">
            Admins can manage user statuses and roles through a dedicated
            dashboard.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <Users className="text-blue-600 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">Profile Management</h3>
          <p className="text-gray-600">
            Users can update their personal information and passwords
            seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
