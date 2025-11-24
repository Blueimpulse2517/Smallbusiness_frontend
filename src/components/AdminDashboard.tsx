import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Upload, Trash2, X } from "lucide-react";

const MAX_IMAGE_SIZE_MB = 1.5;
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const AdminDashboard: React.FC = () => {
  const [reelUrl, setReelUrl] = useState<string>("");
  const [currentRoomImage, setCurrentRoomImage] = useState<string | null>(null);
  const [currentDishImage, setCurrentDishImage] = useState<string | null>(null);

  const navigate = useNavigate();

  // Load current images on mount
  useEffect(() => {
    const loadCurrentImages = () => {
      const replacedRooms: { [key: number]: string } = JSON.parse(
        localStorage.getItem("replacedRoomImages") || "{}"
      );
      const replacedDishes: { [key: number]: string } = JSON.parse(
        localStorage.getItem("replacedDishImages") || "{}"
      );
      
      setCurrentRoomImage(replacedRooms[0] || null);
      setCurrentDishImage(replacedDishes[0] || null);
    };

    loadCurrentImages();

    // Listen for updates
    const handleStorageChange = () => {
      loadCurrentImages();
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('roomsUpdated', handleStorageChange);
    window.addEventListener('dishesUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('roomsUpdated', handleStorageChange);
      window.removeEventListener('dishesUpdated', handleStorageChange);
    };
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  // ✅ Go Back (stay logged in)
  const handleGoBack = () => {
    navigate("/");
  };

  // ✅ Upload Room Image (replaces slot 0)
  const handleRoomImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > MAX_IMAGE_SIZE) {
      alert(`Room image exceeds ${MAX_IMAGE_SIZE_MB} MB.`);
      if (event.target) {
        event.target.value = "";
      }
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      // Load current replacements
      const replacedRooms: { [key: number]: string } = JSON.parse(
        localStorage.getItem("replacedRoomImages") || "{}"
      );
      
      // Replace slot 0 (first room)
      replacedRooms[0] = base64String;
      localStorage.setItem("replacedRoomImages", JSON.stringify(replacedRooms));
      
      // Update UI immediately
      setCurrentRoomImage(base64String);
      
      // Trigger event for Rooms component to update
      window.dispatchEvent(new Event('roomsUpdated'));
      
      alert("Room image uploaded and replaced successfully!");
      
      // Reset the input
      if (event.target) {
        event.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  // ✅ Upload Dish Image (replaces slot 0)
  const handleDishImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > MAX_IMAGE_SIZE) {
      alert(`Dish image exceeds ${MAX_IMAGE_SIZE_MB} MB.`);
      if (event.target) {
        event.target.value = "";
      }
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      // Load current replacements
      const replacedDishes: { [key: number]: string } = JSON.parse(
        localStorage.getItem("replacedDishImages") || "{}"
      );
      
      // Replace slot 0 (first dish)
      replacedDishes[0] = base64String;
      localStorage.setItem("replacedDishImages", JSON.stringify(replacedDishes));
      
      // Update UI immediately
      setCurrentDishImage(base64String);
      
      // Trigger event for Dishes component to update
      window.dispatchEvent(new Event('dishesUpdated'));
      
      alert("Dish image uploaded and replaced successfully!");
      
      // Reset the input
      if (event.target) {
        event.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  // ✅ Post Instagram Reel
  const handleReelSubmit = () => {
    if (!reelUrl.trim()) return alert("Please enter a valid Instagram reel URL!");
    const stored = JSON.parse(localStorage.getItem("reelUrls") || "[]");
    localStorage.setItem("reelUrls", JSON.stringify([...stored, reelUrl]));
    alert("Reel URL added successfully!");
    setReelUrl("");
  };

  // ✅ Delete room image (resets slot 0 to default)
  const handleDeleteRoom = () => {
    if (!window.confirm("Are you sure you want to reset the room image to default?")) return;
    
    const replacedRooms: { [key: number]: string } = JSON.parse(
      localStorage.getItem("replacedRoomImages") || "{}"
    );
    delete replacedRooms[0];
    localStorage.setItem("replacedRoomImages", JSON.stringify(replacedRooms));
    
    setCurrentRoomImage(null);
    window.dispatchEvent(new Event('roomsUpdated'));
    alert("Room image reset to default successfully!");
  };

  // ✅ Delete dish image (resets slot 0 to default)
  const handleDeleteDish = () => {
    if (!window.confirm("Are you sure you want to reset the dish image to default?")) return;
    
    const replacedDishes: { [key: number]: string } = JSON.parse(
      localStorage.getItem("replacedDishImages") || "{}"
    );
    delete replacedDishes[0];
    localStorage.setItem("replacedDishImages", JSON.stringify(replacedDishes));
    
    setCurrentDishImage(null);
    window.dispatchEvent(new Event('dishesUpdated'));
    alert("Dish image reset to default successfully!");
  };

  // ✅ Delete reel URLs
  const handleDeleteReels = () => {
    if (!window.confirm("Are you sure you want to delete all reel URLs?")) return;
    localStorage.removeItem("reelUrls");
    alert("Reel URLs deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8 relative">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800">
            Admin Dashboard
          </h2>
          <div className="flex gap-2">
            <button
              onClick={handleGoBack}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
            >
              Go Back
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Upload Room Images */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-indigo-700">
            Upload Room Image
          </h3>
          
          {/* Current Image Preview */}
          {currentRoomImage && (
            <div className="relative mb-4 inline-block">
              <img
                src={currentRoomImage}
                alt="Current room"
                className="w-full max-w-xs h-48 object-cover rounded-lg shadow-md border-2 border-indigo-200"
              />
              <button
                onClick={handleDeleteRoom}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-all"
                title="Reset to default"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex items-center justify-center gap-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-lg transition text-sm font-medium shadow-md">
              <Upload className="w-4 h-4" />
              <span>Upload File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleRoomImageUpload}
                className="hidden"
              />
            </label>
            {currentRoomImage && (
              <button
                onClick={handleDeleteRoom}
                className="w-full sm:w-auto bg-gradient-to-r from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600 text-white py-2 px-4 rounded-lg shadow-md text-sm font-medium transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Reset to Default
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: Uploading a new image will replace the current room image (first slot).
          </p>
        </div>

        {/* Upload Dish Images */}
        <div className="mb-8 border-b pb-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-green-700">
            Upload Dish Image
          </h3>
          
          {/* Current Image Preview */}
          {currentDishImage && (
            <div className="relative mb-4 inline-block">
              <img
                src={currentDishImage}
                alt="Current dish"
                className="w-full max-w-xs h-48 object-cover rounded-lg shadow-md border-2 border-green-200"
              />
              <button
                onClick={handleDeleteDish}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-lg transition-all"
                title="Reset to default"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex items-center justify-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg transition text-sm font-medium shadow-md">
              <Upload className="w-4 h-4" />
              <span>Upload File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleDishImageUpload}
                className="hidden"
              />
            </label>
            {currentDishImage && (
              <button
                onClick={handleDeleteDish}
                className="w-full sm:w-auto bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white py-2 px-4 rounded-lg shadow-md text-sm font-medium transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Reset to Default
              </button>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: Uploading a new image will replace the current dish image (first slot).
          </p>
        </div>

        {/* Post Instagram Reels */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-purple-700">
            Post Instagram Reel (URL)
          </h3>
          <input
            type="text"
            value={reelUrl}
            onChange={(e) => setReelUrl(e.target.value)}
            placeholder="Paste Instagram reel URL"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReelSubmit}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg transition text-sm"
            >
              Add Reel
            </button>
            <button
              onClick={handleDeleteReels}
              className="w-full sm:w-auto bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white py-2 px-3 rounded-full shadow-md text-xs sm:text-sm font-medium transition-transform transform hover:scale-105"
            >
              ✕ Delete All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";

// const MAX_IMAGE_SIZE_MB = 1.5;
// const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;

// const AdminDashboard: React.FC = () => {
//   const [roomImage, setRoomImage] = useState<File | null>(null);
//   const [dishImage, setDishImage] = useState<File | null>(null);
//   const [reelUrl, setReelUrl] = useState<string>("");

//   const navigate = useNavigate();

//   // ✅ Logout
//   const handleLogout = async () => {
//     await signOut(auth);
//     localStorage.removeItem("isAdmin");
//     navigate("/");
//   };

//   // ✅ Go Back (stay logged in)
//   const handleGoBack = () => {
//     navigate("/");
//   };

//   // ✅ Upload Room Image
//   const handleRoomImageUpload = () => {
//     if (!roomImage) return alert("Please select a room image!");
//     if (roomImage.size > MAX_IMAGE_SIZE)
//       return alert(`Room image exceeds ${MAX_IMAGE_SIZE_MB} MB.`);
// const reader = new FileReader();
// reader.onloadend = () => {
//   const base64String = reader.result as string;
//   const storedImages = JSON.parse(localStorage.getItem("roomImages") || "[]");
//   const updated = [...storedImages, base64String];
//   localStorage.setItem("roomImages", JSON.stringify(updated));
//   alert("Room image uploaded successfully!");
// };
// reader.readAsDataURL(roomImage);
//     // const reader = new FileReader();
//     // reader.onload = () => {
//     //   const stored = JSON.parse(localStorage.getItem("roomImages") || "[]");
//     //   localStorage.setItem("roomImages", JSON.stringify([...stored, reader.result]));
//     //   alert("Room image uploaded successfully!");
//     //   setRoomImage(null);
//     // };
//     // reader.readAsDataURL(roomImage);
//   };

//   // ✅ Upload Dish Image
//   const handleDishImageUpload = () => {
//     if (!dishImage) return alert("Please select a dish image!");
//     if (dishImage.size > MAX_IMAGE_SIZE)
//       return alert(`Dish image exceeds ${MAX_IMAGE_SIZE_MB} MB.`);
// const reader = new FileReader();
// reader.onloadend = () => {
//   const base64String = reader.result as string;
//   const storedImages = JSON.parse(localStorage.getItem("dishImages") || "[]");
//   const updated = [...storedImages, base64String];
//   localStorage.setItem("dishImages", JSON.stringify(updated));
//   alert("Dish image uploaded successfully!");
// };
// reader.readAsDataURL(dishImage);
//     // const reader = new FileReader();
//     // reader.onload = () => {
//     //   const stored = JSON.parse(localStorage.getItem("dishImages") || "[]");
//     //   localStorage.setItem("dishImages", JSON.stringify([...stored, reader.result]));
//     //   alert("Dish image uploaded successfully!");
//     //   setDishImage(null);
//     // };
//     // reader.readAsDataURL(dishImage);
//   };

//   // ✅ Post Instagram Reel
//   const handleReelSubmit = () => {
//     if (!reelUrl.trim()) return alert("Please enter a valid Instagram reel URL!");
//     const stored = JSON.parse(localStorage.getItem("reelUrls") || "[]");
//     localStorage.setItem("reelUrls", JSON.stringify([...stored, reelUrl]));
//     alert("Reel URL added successfully!");
//     setReelUrl("");
//   };

//   // ✅ Delete uploaded data
//   const handleDelete = (key: string) => {
//     localStorage.removeItem(key);
//     alert(`${key.replace("Images", "").replace("Urls", "")} deleted successfully!`);
//     window.location.reload();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-6 flex flex-col items-center">
//       <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8 relative">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
//           <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800">
//             Admin Dashboard
//           </h2>
//           <div className="flex gap-2">
//             <button
//               onClick={handleGoBack}
//               className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
//             >
//               Go Back
//             </button>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {/* Upload Room Images */}
//         <div className="mb-8 border-b pb-6">
//           <h3 className="text-lg sm:text-xl font-semibold mb-3 text-indigo-700">
//             Upload Room Image
//           </h3>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setRoomImage(e.target.files?.[0] || null)}
//             className="block w-full text-sm border border-gray-300 rounded-lg p-2 mb-3"
//           />
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleRoomImageUpload}
//               className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-lg transition text-sm"
//             >
//               Upload
//             </button>
//             <button
//               onClick={() => handleDelete("roomImages")}
//               className="w-full sm:w-auto bg-gradient-to-r from-rose-400 to-red-500 hover:from-rose-500 hover:to-red-600 text-white py-2 px-3 rounded-full shadow-md text-xs sm:text-sm font-medium transition-transform transform hover:scale-105"
//             >
//               ✕ Delete All
//             </button>
//           </div>
//         </div>

//         {/* Upload Dish Images */}
//         <div className="mb-8 border-b pb-6">
//           <h3 className="text-lg sm:text-xl font-semibold mb-3 text-green-700">
//             Upload Dish Image
//           </h3>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setDishImage(e.target.files?.[0] || null)}
//             className="block w-full text-sm border border-gray-300 rounded-lg p-2 mb-3"
//           />
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleDishImageUpload}
//               className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-lg transition text-sm"
//             >
//               Upload
//             </button>
//             <button
//               onClick={() => handleDelete("dishImages")}
//               className="w-full sm:w-auto bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white py-2 px-3 rounded-full shadow-md text-xs sm:text-sm font-medium transition-transform transform hover:scale-105"
//             >
//               ✕ Delete All
//             </button>
//           </div>
//         </div>

//         {/* Post Instagram Reels */}
//         <div className="mb-4">
//           <h3 className="text-lg sm:text-xl font-semibold mb-3 text-purple-700">
//             Post Instagram Reel (URL)
//           </h3>
//           <input
//             type="text"
//             value={reelUrl}
//             onChange={(e) => setReelUrl(e.target.value)}
//             placeholder="Paste Instagram reel URL"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 text-sm"
//           />
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={handleReelSubmit}
//               className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg transition text-sm"
//             >
//               Add Reel
//             </button>
//             <button
//               onClick={() => handleDelete("reelUrls")}
//               className="w-full sm:w-auto bg-gradient-to-r from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 text-white py-2 px-3 rounded-full shadow-md text-xs sm:text-sm font-medium transition-transform transform hover:scale-105"
//             >
//               ✕ Delete All
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
