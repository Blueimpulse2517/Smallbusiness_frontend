import React from 'react'
import { room1, room2 } from './roomImages'


const Rooms = () => {
  const rooms = [
    {
      id: 1,
      image: room1,
      title: 'Deluxe Room',
      description: 'Comfortable and spacious with modern amenities'
    },
    {
      id: 2,
      image: room2,
      title: 'Luxury Suite',
      description: 'Premium experience with stunning views'
    }
  ];

  return (
    <section id="rooms" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-10 sm:mb-12">
          Hotel Rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {rooms.map((room) => (
            <div key={room.id} className="group cursor-pointer transition-transform duration-300">
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-60 sm:h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{room.title}</h3>
                    <p className="text-sm sm:text-base">{room.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Rooms
