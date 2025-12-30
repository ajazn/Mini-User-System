import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import { Users, UserX, UserCheck, Shield } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.data.users);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      // This sends a request to the backend: PATCH /api/users/ID
      const res = await API.patch(`/users/${userId}`, {
        active: !currentStatus,
      });

      if (res.data.status === "success") {
        toast.success(
          `User is now ${!currentStatus ? "Active" : "Deactivated"}`
        );

        // This line updates the UI immediately without needing to refresh the page
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId ? { ...u, active: !currentStatus } : u
          )
        );
      }
    } catch (err) {
      console.error("Update Error:", err.response);
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-slate-300">
        Loading Dashboard...
      </div>
    );

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden max-w-5xl mx-auto">
      <div className="bg-slate-900 p-6 flex items-center justify-between text-white border-b border-slate-700">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shield /> Admin User Management
        </h2>
        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
          {users.length} Users Found
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-700 border-b border-slate-600">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-200">
                User Details
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-200">
                Role
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-200">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-700/50 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-white">{u.fullName}</div>
                  <div className="text-sm text-slate-400">{u.email}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded uppercase font-bold text-[10px] ${
                      u.role === "admin"
                        ? "bg-purple-500/30 text-purple-300"
                        : "bg-slate-600 text-slate-200"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.active
                        ? "bg-green-500/30 text-green-300"
                        : "bg-red-500/30 text-red-300"
                    }`}
                  >
                    {u.active ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleUserStatus(u._id, u.active)}
                    className={`flex items-center gap-1 text-sm font-bold transition ${
                      u.active
                        ? "text-red-400 hover:text-red-300"
                        : "text-green-400 hover:text-green-300"
                    }`}
                  >
                    {u.active ? (
                      <>
                        <UserX size={16} /> Deactivate
                      </>
                    ) : (
                      <>
                        <UserCheck size={16} /> Activate
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
