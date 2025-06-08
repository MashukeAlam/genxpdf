import React from "react";
import TopBar from "./TopBar";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <>
    <TopBar />
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {user ? (
          <div className="space-y-3">
            <img
              src={user.image}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>User not logged in.</p>
        )}
      </div>
    </div>
    </>
  );
} 