import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Allowed admin emails
  const allowedAdmins = [
    "blueimpulseemployer@gmail.com",
    "admin2@gmail.com",
  ];

  // ✅ Handle Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user?.email && allowedAdmins.includes(user.email)) {
        // Save login persistence
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminEmail", user.email);

        alert("Welcome, Admin!");
        navigate("/admin-dashboard");
      } else {
        alert("Access denied. Unauthorized email.");
        await signOut(auth);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-[90%] max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Admin Login
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Only authorized admin accounts can access the dashboard.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-lg font-medium transition-all shadow-md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 bg-white rounded-full"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
