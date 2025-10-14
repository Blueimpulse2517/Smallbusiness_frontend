import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const ADMIN_EMAIL = "admin@gmail.com"; // Replace with actual admin Gmail

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email === ADMIN_EMAIL) {
        navigate('/admin-dashboard');
      } else {
        alert('Access denied. Only admin can log in.');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        style={{ backgroundImage: `url('/assets/room_image1.jpg')` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Login Card */}
      <div className="relative z-10">
        <div className="bg-white bg-opacity-90 shadow-2xl rounded-xl p-8 max-w-md w-full text-center border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h2>
          <p className="text-sm text-gray-600 mb-6">
            Manage hotel reels, gallery updates & more
          </p>
          <button
            onClick={handleLogin}
            className="bg-[#e1306c] hover:bg-[#c1275e] text-white font-semibold py-2 px-6 rounded-full transition duration-300"
          >
            Login with Gmail
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
