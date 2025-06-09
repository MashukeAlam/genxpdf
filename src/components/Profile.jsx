import React, { useState } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { homePath } from "../common/breadcrumb_paths";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL;

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [name, setName] = useState(user?.name || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("fields", JSON.stringify({ name }));

    try {
      const res = await fetch(`${API_BASE}/user_update`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log("Profile update response:", data);
      if (data.status) {
        const updatedUser = { ...user, name };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  const handleChangePassword = async () => {
    const formData = new FormData();
    formData.append("old_password", oldPassword);
    formData.append("password", newPassword);
    formData.append("password_confirmation", confirmPassword);

    try {
      const res = await fetch(`${API_BASE}/change_password`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log("Change password response:", data);
      if (data.status) {
        alert("Password changed successfully");
      } else {
        alert(data.message || "Failed to change password");
      }
    } catch (err) {
      console.error(err);
      alert("Error changing password");
    }
  };

  return (
    <>
      <TopBar breadcrumb={true} breadcrumbPaths={[...homePath, { label: "My Files", href: "/myfiles" }]} />
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          {user ? (
            <div className="space-y-4">
              <img
                src={user.image}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  value={user.email}
                  disabled
                  className="mt-1 block w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
                />
              </div>
              <button
                onClick={handleUpdateProfile}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Update Profile
              </button>

              <hr className="my-4" />

              <h3 className="text-lg font-semibold">Change Password</h3>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="block w-full border px-3 py-2 rounded mb-2"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full border px-3 py-2 rounded mb-2"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full border px-3 py-2 rounded mb-4"
              />
              <button
                onClick={handleChangePassword}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Change Password
              </button>
            </div>
          ) : (
            <p>User not logged in.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
