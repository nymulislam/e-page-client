"use client";

import { useState, useEffect } from "react";
import { Search, Trash2, Shield, User as PenTool } from "lucide-react";
import { Select, ListBox } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { BiBookReader } from "react-icons/bi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// যে এডমিনের রোল চেঞ্জ করা যাবে না
const PROTECTED_ADMIN_EMAIL = "admin@example.com";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await authClient.admin.listUsers({
          query: {
            sortBy: "createdAt",
            sortDirection: "desc",
          },
        });
        if (data?.users) {
          setUsers(data.users);
        } else if (error) {
          toast.error("Failed to load users list");
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
        toast.error("Error fetching users data");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = async (targetUser, newRole) => {
    if (!newRole) return;

    // মেইন এডমিনের রোল পরিবর্তন করা সম্পূর্ণ বন্ধ
    if (targetUser.email === PROTECTED_ADMIN_EMAIL) {
      toast.error("Main Admin's role cannot be changed!");
      return;
    }

    const previousUsers = [...users];

    // Optimistic UI update
    setUsers(prev =>
      prev.map(u =>
        u.id === targetUser.id ? { ...u, role: newRole } : u
      )
    );

    try {
      await authClient.admin.setRole({
        userId: targetUser.id,
        role: newRole,
      });
      toast.success("User role updated successfully!");
    } catch (error) {
      console.error("Failed to update role", error);
      setUsers(previousUsers); // Rollback on error
      toast.error("Failed to update user role.");
    }
  };

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this user deletion!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#78350f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete user",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
      }
    });

    if (!result.isConfirmed) return;

    const previousUsers = [...users];
    setUsers(prev => prev.filter(u => u.id !== userId));

    try {
      await authClient.admin.removeUser({
        userId: userId,
      });
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user", error);
      setUsers(previousUsers); // Rollback on error
      toast.error("Failed to delete user.");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold"><Shield size={14} /> Admin</span>;
      case 'writer':
        return <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold"><PenTool size={14} /> Writer</span>;
      default:
        return <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md bg-amber-100/70 text-amber-900 text-xs font-semibold"><BiBookReader size={14} /> Reader</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif text-amber-950">Manage Users</h1>
          <p className="text-sm text-amber-900/60">View and update user roles or remove accounts.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-900/40" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-amber-900/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-sm w-full sm:w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-50/50 border-b border-amber-900/10 text-amber-950/70 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/5">
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="p-4">
                      <div className="h-4 bg-amber-100 rounded w-3/4"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-amber-100 rounded w-1/2"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-6 bg-amber-100 rounded-md w-20"></div>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-3">
                      <div className="h-9 bg-amber-100 rounded-lg w-32"></div>
                      <div className="h-9 bg-amber-100 rounded-lg w-9"></div>
                    </td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const isProtectedAdmin = user.email === PROTECTED_ADMIN_EMAIL;

                  return (
                    <tr key={user.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-amber-950">{user.name}</p>
                      </td>
                      <td className="p-4 text-sm text-amber-900/70">{user.email}</td>
                      <td className="p-4">{getRoleBadge(user.role)}</td>
                      <td className="p-4 flex items-center justify-end gap-3">

                        {/* Protected Select Component */}
                        <Select
                          className={`w-32 bg-transparent p-0 border-none min-h-0 ${
                            isProtectedAdmin ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          aria-label="Change role"
                          value={user.role || "reader"}
                          isDisabled={isProtectedAdmin}
                          onChange={(newRole) => handleRoleChange(user, newRole)}
                        >
                          <Select.Trigger className="w-full px-3 py-1.5 bg-[#FDFBF7] border border-amber-900/15 rounded-lg text-xs font-medium text-amber-950 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 transition-all flex items-center justify-between cursor-pointer disabled:cursor-not-allowed">
                            <Select.Value />
                            <Select.Indicator className="text-amber-900/50" />
                          </Select.Trigger>
                          <Select.Popover className="bg-white border border-amber-900/15 rounded-xl shadow-xl mt-1 p-1 z-50">
                            <ListBox>
                              <ListBox.Item
                                id="reader"
                                textValue="Reader"
                                className="px-3 py-2 text-xs text-amber-950 hover:bg-amber-50 rounded-lg cursor-pointer transition-colors flex items-center justify-between outline-none"
                              >
                                Reader
                                <ListBox.ItemIndicator className="text-amber-800" />
                              </ListBox.Item>
                              <ListBox.Item
                                id="writer"
                                textValue="Writer"
                                className="px-3 py-2 text-xs text-amber-950 hover:bg-amber-50 rounded-lg cursor-pointer transition-colors flex items-center justify-between outline-none"
                              >
                                Writer
                                <ListBox.ItemIndicator className="text-amber-800" />
                              </ListBox.Item>
                              <ListBox.Item
                                id="admin"
                                textValue="Admin"
                                className="px-3 py-2 text-xs text-amber-950 hover:bg-amber-50 rounded-lg cursor-pointer transition-colors flex items-center justify-between outline-none"
                              >
                                Admin
                                <ListBox.ItemIndicator className="text-amber-800" />
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>

                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-amber-900/50">
                    No users found matching &quot;{searchQuery}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}