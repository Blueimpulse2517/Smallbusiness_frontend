import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from '../firebase';

const AdminDashboard: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [reelUrl, setReelUrl] = useState<string>('');

  const handleImageUpload = async () => {
    if (!image) return;

    const storageRef = ref(storage, `hotelImages/${image.name}`);
    await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'images'), { url });
    alert('Image uploaded successfully.');
  };

  const handleReelSubmit = async () => {
    if (!reelUrl) return;

    await addDoc(collection(db, 'reels'), { url: reelUrl });
    alert('Reel URL added.');
    setReelUrl('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

        {/* Image Upload Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Upload Hotel Image</h3>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mb-4"
          />
          <button
            onClick={handleImageUpload}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
          >
            Upload Image
          </button>
        </div>

        {/* Reel URL Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Post Instagram Reel (URL)</h3>
          <input
            type="text"
            value={reelUrl}
            onChange={(e) => setReelUrl(e.target.value)}
            placeholder="Paste Instagram reel URL"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button
            onClick={handleReelSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition"
          >
            Add Reel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

