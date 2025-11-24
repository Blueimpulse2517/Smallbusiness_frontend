import React, { useEffect, useState, useRef } from "react";
import { room1, room2 } from "./roomImages";
import { Save, Trash2, Upload } from "lucide-react";

interface Room {
  id: number;
  image: string;
  title: string;
  description: string;
  isAdminUploaded?: boolean;
  imageIndex?: number;
}

const MAX_IMAGE_SIZE_MB = 1.5;
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    // Load rooms function
    const loadRooms = () => {
      // Default static rooms
      const initialRooms: Room[] = [
        {
          id: 1,
          image: room1,
          title: "Deluxe Room",
          description: "Comfortable and spacious with modern amenities",
          isAdminUploaded: false,
        },
        {
          id: 2,
          image: room2,
          title: "Luxury Suite",
          description: "Premium experience with stunning views",
          isAdminUploaded: false,
        },
      ];

      // ✅ Load replaced room images from localStorage
      const replacedRooms: { [key: number]: string } = JSON.parse(
        localStorage.getItem("replacedRoomImages") || "{}"
      );

      // Apply replacements to specific slots
      const updatedRooms = initialRooms.map((room, index) => {
        if (replacedRooms[index] !== undefined) {
          return {
            ...room,
            image: replacedRooms[index],
            isAdminUploaded: true,
            imageIndex: index,
          };
        }
        return room;
      });

      setRooms(updatedRooms);
    };

    loadRooms();

    // Listen for storage changes to update when images are added/deleted
    const handleStorageChange = () => {
      loadRooms();
    };
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom events (for same-window updates)
    window.addEventListener('roomsUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('roomsUpdated', handleStorageChange);
    };
  }, []);

  // Handle saving new image (replaces the specific slot)
  const handleSaveImage = (roomIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert(`Image exceeds ${MAX_IMAGE_SIZE_MB} MB.`);
      if (event.target) {
        event.target.value = "";
      }
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      // Load current room replacements
      const replacedRooms: { [key: number]: string } = JSON.parse(
        localStorage.getItem("replacedRoomImages") || "{}"
      );
      
      // Replace the specific room at roomIndex
      replacedRooms[roomIndex] = base64String;
      localStorage.setItem("replacedRoomImages", JSON.stringify(replacedRooms));
      
      // Reload rooms
      const initialRooms: Room[] = [
        {
          id: 1,
          image: room1,
          title: "Deluxe Room",
          description: "Comfortable and spacious with modern amenities",
          isAdminUploaded: false,
        },
        {
          id: 2,
          image: room2,
          title: "Luxury Suite",
          description: "Premium experience with stunning views",
          isAdminUploaded: false,
        },
      ];

      // Apply replacements
      const updatedRooms = initialRooms.map((room, idx) => {
        if (replacedRooms[idx] !== undefined) {
          return {
            ...room,
            image: replacedRooms[idx],
            isAdminUploaded: true,
            imageIndex: idx,
          };
        }
        return room;
      });

      setRooms(updatedRooms);
      
      // Trigger custom event for same-window updates
      window.dispatchEvent(new Event('roomsUpdated'));
      
      // Reset input
      if (event.target) {
        event.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle deleting image (resets to default)
  const handleDeleteImage = (roomIndex: number) => {
    if (!window.confirm("Are you sure you want to reset this image to default?")) return;

    const replacedRooms: { [key: number]: string } = JSON.parse(
      localStorage.getItem("replacedRoomImages") || "{}"
    );
    delete replacedRooms[roomIndex];
    localStorage.setItem("replacedRoomImages", JSON.stringify(replacedRooms));

    // Reload rooms
    const initialRooms: Room[] = [
      {
        id: 1,
        image: room1,
        title: "Deluxe Room",
        description: "Comfortable and spacious with modern amenities",
        isAdminUploaded: false,
      },
      {
        id: 2,
        image: room2,
        title: "Luxury Suite",
        description: "Premium experience with stunning views",
        isAdminUploaded: false,
      },
    ];

    // Apply remaining replacements
    const updatedRooms = initialRooms.map((room, index) => {
      if (replacedRooms[index] !== undefined) {
        return {
          ...room,
          image: replacedRooms[index],
          isAdminUploaded: true,
          imageIndex: index,
        };
      }
      return room;
    });

    setRooms(updatedRooms);
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new Event('roomsUpdated'));
    
    alert("Image reset to default successfully!");
  };

  return (
    <section id="rooms" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-10 sm:mb-12">
          Hotel Rooms
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                      {room.title}
                    </h3>
                    <p className="text-sm sm:text-base">{room.description}</p>
                  </div>
                </div>
              </div>
              {/* Instagram-style action buttons below image */}
              {isAdmin && (
                <div className="flex items-center justify-center gap-3 mt-3 px-2">
                  {/* Save button with upload icon - replaces this specific image slot */}
                  <label className="flex items-center gap-1.5 cursor-pointer text-indigo-600 hover:text-indigo-700 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSaveImage(room.id - 1, e)}
                      className="hidden"
                      ref={(el) => {
                        if (el) fileInputRefs.current[room.id] = el;
                      }}
                    />
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Save</span>
                  </label>
                  {/* Delete button - only for replaced images (reset to default) */}
                  {room.isAdminUploaded && room.imageIndex !== undefined && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteImage(room.id - 1);
                      }}
                      className="flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors"
                      title="Reset to default"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium">Delete</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;

// import React, { useEffect, useState } from "react";
// import { room1, room2 } from "./roomImages";

// interface Room {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
// }

// const Rooms: React.FC = () => {
//   const [rooms, setRooms] = useState<Room[]>([]);

//   useEffect(() => {
//     // Default static rooms
//     const initialRooms: Room[] = [
//       {
//         id: 1,
//         image: room1,
//         title: "Deluxe Room",
//         description: "Comfortable and spacious with modern amenities",
//       },
//       {
//         id: 2,
//         image: room2,
//         title: "Luxury Suite",
//         description: "Premium experience with stunning views",
//       },
//     ];

//     // ✅ Load admin-uploaded room images from localStorage
//     const storedRoomImages: string[] = JSON.parse(
//       localStorage.getItem("roomImages") || "[]"
//     );

//     const adminRooms: Room[] = storedRoomImages.map((img, index) => ({
//       id: initialRooms.length + index + 1,
//       image: img,
//       title: `Guest Room ${index + 1}`,
//       description: "Uploaded by admin",
//     }));

//     setRooms([...initialRooms, ...adminRooms]);
//   }, []);

//   return (
//     <section id="rooms" className="py-16 sm:py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-10 sm:mb-12">
//           Hotel Rooms
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
//           {rooms.map((room) => (
//             <div
//               key={room.id}
//               className="group cursor-pointer transition-transform duration-300"
//             >
//               <div className="relative overflow-hidden rounded-xl shadow-lg">
//                 <img
//                   src={room.image}
//                   alt={room.title}
//                   className="w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                   <div className="text-center text-white px-4">
//                     <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
//                       {room.title}
//                     </h3>
//                     <p className="text-sm sm:text-base">{room.description}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Rooms;
