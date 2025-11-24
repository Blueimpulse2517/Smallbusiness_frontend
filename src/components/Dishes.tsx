import React, { useEffect, useState, useRef } from "react";
import { Save, Trash2, Upload } from "lucide-react";

interface Dish {
  id: number;
  image: string;
  title: string;
  description: string;
  isAdminUploaded?: boolean;
  imageIndex?: number;
}

const MAX_IMAGE_SIZE_MB = 1.5;
const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;

const Dishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminStatus);

    // Load dishes function
    const loadDishes = () => {
      // Default sample dishes
      const initialDishes: Dish[] = [
        {
          id: 1,
          image:
            "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/01/16-Traditional-Rajasthani-Dishes-You-Cant-Miss.jpg",
          title: "Gourmet Breakfast",
          description: "Start your day with our signature breakfast platter",
          isAdminUploaded: false,
        },
        {
          id: 2,
          image:
            "https://www.swantour.com/blogs/wp-content/uploads/2019/02/Foods-of-Rajasthan-1.jpg",
          title: "Fine Dining Experience",
          description: "Exquisite cuisine crafted by our expert chefs",
          isAdminUploaded: false,
        },
      ];

      // ✅ Load replaced dish images from localStorage
      const replacedDishes: { [key: number]: string } = JSON.parse(
        localStorage.getItem("replacedDishImages") || "{}"
      );

      // Apply replacements to specific slots
      const updatedDishes = initialDishes.map((dish, index) => {
        if (replacedDishes[index] !== undefined) {
          return {
            ...dish,
            image: replacedDishes[index],
            isAdminUploaded: true,
            imageIndex: index,
          };
        }
        return dish;
      });

      setDishes(updatedDishes);
    };

    loadDishes();

    // Listen for storage changes to update when images are added/deleted
    const handleStorageChange = () => {
      loadDishes();
    };
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom events (for same-window updates)
    window.addEventListener('dishesUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('dishesUpdated', handleStorageChange);
    };
  }, []);

  // Handle saving new image (replaces the specific slot)
  const handleSaveImage = (dishIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
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
      
      // Load current dish replacements
      const replacedDishes: { [key: number]: string } = JSON.parse(
        localStorage.getItem("replacedDishImages") || "{}"
      );
      
      // Replace the specific dish at dishIndex
      replacedDishes[dishIndex] = base64String;
      localStorage.setItem("replacedDishImages", JSON.stringify(replacedDishes));
      
      // Reload dishes
      const initialDishes: Dish[] = [
        {
          id: 1,
          image:
            "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/01/16-Traditional-Rajasthani-Dishes-You-Cant-Miss.jpg",
          title: "Gourmet Breakfast",
          description: "Start your day with our signature breakfast platter",
          isAdminUploaded: false,
        },
        {
          id: 2,
          image:
            "https://www.swantour.com/blogs/wp-content/uploads/2019/02/Foods-of-Rajasthan-1.jpg",
          title: "Fine Dining Experience",
          description: "Exquisite cuisine crafted by our expert chefs",
          isAdminUploaded: false,
        },
      ];

      // Apply replacements
      const updatedDishes = initialDishes.map((dish, idx) => {
        if (replacedDishes[idx] !== undefined) {
          return {
            ...dish,
            image: replacedDishes[idx],
            isAdminUploaded: true,
            imageIndex: idx,
          };
        }
        return dish;
      });

      setDishes(updatedDishes);
      
      // Trigger custom event for same-window updates
      window.dispatchEvent(new Event('dishesUpdated'));
      
      // Reset input
      if (event.target) {
        event.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle deleting image (resets to default)
  const handleDeleteImage = (dishIndex: number) => {
    if (!window.confirm("Are you sure you want to reset this image to default?")) return;

    const replacedDishes: { [key: number]: string } = JSON.parse(
      localStorage.getItem("replacedDishImages") || "{}"
    );
    delete replacedDishes[dishIndex];
    localStorage.setItem("replacedDishImages", JSON.stringify(replacedDishes));

    // Reload dishes
    const initialDishes: Dish[] = [
      {
        id: 1,
        image:
          "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/01/16-Traditional-Rajasthani-Dishes-You-Cant-Miss.jpg",
        title: "Gourmet Breakfast",
        description: "Start your day with our signature breakfast platter",
        isAdminUploaded: false,
      },
      {
        id: 2,
        image:
          "https://www.swantour.com/blogs/wp-content/uploads/2019/02/Foods-of-Rajasthan-1.jpg",
        title: "Fine Dining Experience",
        description: "Exquisite cuisine crafted by our expert chefs",
        isAdminUploaded: false,
      },
    ];

    // Apply remaining replacements
    const updatedDishes = initialDishes.map((dish, index) => {
      if (replacedDishes[index] !== undefined) {
        return {
          ...dish,
          image: replacedDishes[index],
          isAdminUploaded: true,
          imageIndex: index,
        };
      }
      return dish;
    });

    setDishes(updatedDishes);
    
    // Trigger custom event for same-window updates
    window.dispatchEvent(new Event('dishesUpdated'));
    
    alert("Image reset to default successfully!");
  };

  return (
    <section id="dishes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Special Dishes
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {dishes.map((dish) => (
            <div key={dish.id} className="group transition-transform duration-300">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{dish.title}</h3>
                    <p className="text-sm">{dish.description}</p>
                  </div>
                </div>
              </div>
              {/* Instagram-style action buttons below image */}
              {isAdmin && (
                <div className="flex items-center justify-center gap-3 mt-3 px-2">
                  {/* Save button with upload icon - replaces this specific image slot */}
                  <label className="flex items-center gap-1.5 cursor-pointer text-green-600 hover:text-green-700 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSaveImage(dish.id - 1, e)}
                      className="hidden"
                      ref={(el) => {
                        if (el) fileInputRefs.current[dish.id] = el;
                      }}
                    />
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Save</span>
                  </label>
                  {/* Delete button - only for replaced images (reset to default) */}
                  {dish.isAdminUploaded && dish.imageIndex !== undefined && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteImage(dish.id - 1);
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

export default Dishes;


// import React, { useEffect, useState } from "react";

// interface Dish {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
// }

// const Dishes: React.FC = () => {
//   const [dishes, setDishes] = useState<Dish[]>([]);

//   useEffect(() => {
//     // Default sample dishes
//     const initialDishes: Dish[] = [
//       {
//         id: 1,
//         image:
//           "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/01/16-Traditional-Rajasthani-Dishes-You-Cant-Miss.jpg",
//         title: "Gourmet Breakfast",
//         description: "Start your day with our signature breakfast platter",
//       },
//       {
//         id: 2,
//         image:
//           "https://www.swantour.com/blogs/wp-content/uploads/2019/02/Foods-of-Rajasthan-1.jpg",
//         title: "Fine Dining Experience",
//         description: "Exquisite cuisine crafted by our expert chefs",
//       },
//     ];

//     // ✅ Load dishes uploaded by admin from localStorage
//     const storedDishImages: string[] = JSON.parse(
//       localStorage.getItem("dishImages") || "[]"
//     );

//     const adminDishes: Dish[] = storedDishImages.map((img, index) => ({
//       id: initialDishes.length + index + 1,
//       image: img,
//       title: `Chef’s Special ${index + 1}`,
//       description: "Uploaded by admin",
//     }));

//     setDishes([...initialDishes, ...adminDishes]);
//   }, []);

//   return (
//     <section id="dishes" className="py-20 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
//           Special Dishes
//         </h2>

//         <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           {dishes.map((dish) => (
//             <div key={dish.id} className="group cursor-pointer">
//               <div className="relative overflow-hidden rounded-xl shadow-lg">
//                 <img
//                   src={dish.image}
//                   alt={dish.title}
//                   className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                   <div className="text-center text-white">
//                     <h3 className="text-xl font-bold mb-2">{dish.title}</h3>
//                     <p className="text-sm">{dish.description}</p>
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

// export default Dishes;
