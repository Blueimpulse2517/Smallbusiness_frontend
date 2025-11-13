import React, { useEffect, useState } from "react";

interface Dish {
  id: number;
  image: string;
  title: string;
  description: string;
}

const Dishes: React.FC = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    // Default sample dishes
    const initialDishes: Dish[] = [
      {
        id: 1,
        image:
          "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/01/16-Traditional-Rajasthani-Dishes-You-Cant-Miss.jpg",
        title: "Gourmet Breakfast",
        description: "Start your day with our signature breakfast platter",
      },
      {
        id: 2,
        image:
          "https://www.swantour.com/blogs/wp-content/uploads/2019/02/Foods-of-Rajasthan-1.jpg",
        title: "Fine Dining Experience",
        description: "Exquisite cuisine crafted by our expert chefs",
      },
    ];

    // ✅ Load dishes uploaded by admin from localStorage
    const storedDishImages: string[] = JSON.parse(
      localStorage.getItem("dishImages") || "[]"
    );

    const adminDishes: Dish[] = storedDishImages.map((img, index) => ({
      id: initialDishes.length + index + 1,
      image: img,
      title: `Chef’s Special ${index + 1}`,
      description: "Uploaded by admin",
    }));

    setDishes([...initialDishes, ...adminDishes]);
  }, []);

  return (
    <section id="dishes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Special Dishes
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {dishes.map((dish) => (
            <div key={dish.id} className="group cursor-pointer">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dishes;
