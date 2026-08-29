"use client";

import { useState } from "react";
import { Search, Trash2, Shield, User as UserIcon, PenTool } from "lucide-react";
import { Select, ListBox } from "@heroui/react";

// Mock Data
const initialUsers = [
  { id: 1, name: "Naimul Islam", email: "naimul@example.com", role: "admin" },
  { id: 2, name: "John Doe", email: "john@example.com", role: "writer" },
  { id: 3, name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: 4, name: "Ahsan Habib", email: "ahsan@example.com", role: "user" },
];

export default function ManageUsers() {
  const [users, setUsers] = useState(initialUsers);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold"><Shield size={14} /> Admin</span>;
      case 'writer':
        return <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold"><PenTool size={14} /> Writer</span>;
      default:
        return <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold"><UserIcon size={14} /> User</span>;
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
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-amber-950">{user.name}</p>
                  </td>
                  <td className="p-4 text-sm text-amber-900/70">{user.email}</td>
                  <td className="p-4">{getRoleBadge(user.role)}</td>
                  <td className="p-4 flex items-center justify-end gap-3">
                    {/* ✅ Updated Select with Role options */}
                    <Select
                      className="w-36"
                      aria-label="Change role"
                      value={user.role}
                      onChange={(newRole) => {
                        setUsers(prev =>
                          prev.map(u =>
                            u.id === user.id ? { ...u, role: newRole } : u
                          )
                        );
                      }}
                      variant="secondary"
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="user" textValue="User">
                            User
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="writer" textValue="Writer">
                            Writer
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="admin" textValue="Admin">
                            Admin
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete User">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}