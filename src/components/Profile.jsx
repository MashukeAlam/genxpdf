import React, { useState } from "react";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { homePath } from "../common/breadcrumb_paths";
import { useEffect } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE = import.meta.env.VITE_BACKEND_API_BASE_URL;

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [name, setName] = useState(user?.name || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pages, setPages] = useState(null);
  
    useEffect(() => {
      if (localStorage.getItem('access_token')) {
        setPages(JSON.parse(localStorage.getItem("user_data")).pages);
      }
    }, [pages]);

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
      <div className="bg-[url('assets/images/header/banner-bg.svg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-6 lg:p-8 overflow-hidden">
        <TopBar pages={pages} breadcrumb={true} breadcrumbPaths={[...homePath, { label: "My Files", href: "/myfiles" }]} />
        <div className="flex-grow w-full max-w-3xl bg-white/80 backdrop-blur-md border border-blue-200/30 rounded-2xl shadow-lg p-6 lg:p-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Profile</h2>
          {user ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  src={user.image}
                  alt="User Avatar"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-blue-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-900 mb-1">Email</label>
                  <input
                    value={user.email}
                    disabled
                    className="w-full border border-blue-300 rounded-lg px-4 py-2.5 bg-gray-100 cursor-not-allowed text-gray-500"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  Update Profile
                </button>
              </div>
              <hr className="my-6 border-blue-100/50" />
              <h3 className="text-xl font-semibold text-blue-900">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full border border-blue-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-blue-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-blue-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center">User not logged in.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}