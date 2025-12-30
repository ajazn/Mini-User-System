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
    return <div className="text-center mt-10">Loading Dashboard...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-5xl mx-auto">
      <div className="bg-gray-900 p-6 flex items-center justify-between text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shield /> Admin User Management
        </h2>
        <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
          {users.length} Users Found
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                User Details
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-800">{u.fullName}</div>
                  <div className="text-sm text-gray-500">{u.email}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded uppercase font-bold text-[10px] ${
                      u.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      u.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {u.active ? "Active" : "Deactivated"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleUserStatus(u._id, u.active)}
                    className={`flex items-center gap-1 text-sm font-bold ${
                      u.active
                        ? "text-red-500 hover:text-red-700"
                        : "text-green-500 hover:text-green-700"
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
