import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");

  const allowedAdmins = [
    "blueimpulseemployer@gmail.com",
    "itwalkintest1@gmail.com",
    "hotelvinttagepark777@gmail.com",
    "bluenetwrk@gmail.com",
  ];

  // STEP 1: Check email locally first
  const startGoogleLogin = async () => {
    if (!allowedAdmins.includes(emailInput)) {
      alert("Email not recognized as admin.");
      return;
    }

    // STEP 2: Now launch Google login restricted to this email
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: emailInput,
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user?.email === emailInput) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminEmail", user.email);

        alert("Welcome, Admin!");
        navigate("/admin-dashboard");
      } else {
        alert("Google account mismatch. Access denied.");
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

        <input
          type="email"
          placeholder="Enter admin email"
          className="w-full px-4 py-3 border rounded-lg mb-4"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />

        <button
          onClick={startGoogleLogin}
          className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-lg font-medium transition-all shadow-md"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 bg-white rounded-full"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// import { auth } from "../firebase";

// const AdminLogin: React.FC = () => {
//   const navigate = useNavigate();

//   // ✅ Allowed admin emails
//   const allowedAdmins = [
//     "blueimpulseemployer@gmail.com",
//     "admin2@gmail.com",
//     "itwalkintest1@gmail.com",

//   ];

//   // ✅ Handle Google Login
//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       if (user?.email && allowedAdmins.includes(user.email)) {
//         // Save login persistence
//         localStorage.setItem("isAdmin", "true");
//         localStorage.setItem("adminEmail", user.email);

//         alert("Welcome, Admin!");
//         navigate("/admin-dashboard");
//       } else {
//         alert("Access denied. Unauthorized email.");
//         await signOut(auth);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-[90%] max-w-md">
//         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//           Admin Login
//         </h2>
//         <p className="text-gray-500 mb-6 text-sm">
//           Only authorized admin accounts can access the dashboard.
//         </p>

//         <button
//           onClick={handleGoogleLogin}
//           className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-lg font-medium transition-all shadow-md"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-5 h-5 bg-white rounded-full"
//           />
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
