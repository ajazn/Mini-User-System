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
      await API.patch(`/users/${userId}`, { active: !currentStatus });
      toast.success("User status updated");
      fetchUsers(); // Refresh the list
    } catch (err) {
      toast.error("Action failed");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading Dashboard...</div>;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gray-800 p-6 flex items-center justify-between">
        <h2 className="text-white text-xl font-bold flex items-center gap-2">
          <Shield /> Admin User Management
        </h2>
        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          {users.length} Total Users
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                User
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
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{u.fullName}</div>
                  <div className="text-sm text-gray-500">{u.email}</div>
                </td>
                <td className="px-6 py-4 capitalize">{u.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
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
                    className={`flex items-center gap-1 text-sm font-medium ${
                      u.active ? "text-red-600" : "text-green-600"
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
