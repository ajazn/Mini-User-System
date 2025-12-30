import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { User, Lock, Save } from "lucide-react";

const Profile = () => {
  const { user, login } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [aiInsights, setAiInsights] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAIRequest = async () => {
    setIsAiLoading(true);
    try {
      const res = await API.get("/users/ai-summary");
      setAiInsights(res.data.data);
      toast.success("AI Profile generated!");
    } catch (err) {
      toast.error("AI Simulation failed");
    } finally {
      setIsAiLoading(false);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      // We'll use the /updateMe endpoint we created in the backend
      const res = await API.patch("/users/updateMe", { fullName, password });

      // Update the local auth state with new user data
      login(res.data.data.user, localStorage.getItem("token"));
      toast.success("Profile updated successfully!");
      setPassword(""); // Clear password field
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-slate-800 border border-slate-700 rounded-xl shadow-xl">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-4">
        <div className="bg-blue-500/20 p-3 rounded-full">
          <User className="text-blue-400" size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Account Settings</h2>
          <p className="text-slate-400">{user?.email}</p>
        </div>
      </div>

      {/* --- AI SECTION START --- */}
      <div className="mb-8 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2">
            <span className="text-lg">✨</span> AI Profile Simulation
          </h3>
          <button
            type="button"
            onClick={handleAIRequest}
            disabled={isAiLoading}
            className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isAiLoading ? "Simulating..." : "Generate AI Bio"}
          </button>
        </div>

        {aiInsights ? (
          <div className="space-y-3 animate-in fade-in duration-500">
            <p className="text-sm text-gray-700 leading-relaxed italic">
              "{aiInsights.summary}"
            </p>
            <div className="flex flex-wrap gap-2">
              {aiInsights.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-white border border-blue-200 text-blue-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-gray-500">
            Click to generate an AI-powered professional summary and tags based
            on your role.
          </p>
        )}
      </div>
      {/* --- AI SECTION END --- */}

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            New Password (leave blank to keep current)
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
            <input
              type="password"
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
