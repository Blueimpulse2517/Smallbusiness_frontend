import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, User, Mail, ChevronDown } from 'lucide-react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomType: '', // Default selected
  });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  
  // If check-in date is changed, reset check-out date if it's before the new check-in date
  if (name === 'checkIn' && formData.checkOut && value > formData.checkOut) {
    setFormData(prev => ({ ...prev, [name]: value, checkOut: '' }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

  const baseUrl = "http://localhost:5000";
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate dates
    if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
      alert("❌ Check-out date must be after check-in date. Please select valid dates.");
      return;
    }
    
    // Create booking message
    const bookingMessage = `
🏨 HOTEL BOOKING CONFIRMATION 🏨

Dear ${formData.fullName},

Room booking initiated, Hotel will call back to confirm Availability

📋 BOOKING DETAILS:
• Name: ${formData.fullName}
• Email: ${formData.email}
• Check-in Date: ${formData.checkIn}
• Check-out Date: ${formData.checkOut}
• Room Type: ${formData.roomType}

We look forward to welcoming you to our hotel!

Best regards,
Hotel Management Team
    `;
    
    const emailData = {
      email: formData.email,
      subject: "Hotel Booking Confirmation",
      message: bookingMessage,
      bookingDetails: {
        fullName: formData.fullName,
        email: formData.email,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        roomType: formData.roomType
      }
    };
    
    try {
      const res = await fetch(`${baseUrl}/email/handleSubmit`, {
        method: "POST",
        body: JSON.stringify(emailData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      
      const responseData = await res.json();
      
      if (res.status >= 200 && res.status < 300) {
        if (responseData.customerEmailSent && responseData.adminEmailSent) {
          alert("🎉 Booked Successfully! 🎉\n\n✅ Confirmation email sent to you\n✅ Owner notification sent\n\nYour booking has been confirmed!");
        } else if (responseData.customerEmailSent) {
          alert("🎉 Booked Successfully! 🎉\n\n✅ Confirmation email sent to you\n⚠️ Owner notification failed - please contact hotel directly\n\nYour booking has been confirmed!");
        } else if (responseData.adminEmailSent) {
          alert("🎉 Booked Successfully! 🎉\n\n⚠️ Confirmation email failed - please check your email address\n✅ Owner has been notified\n\nYour booking has been confirmed!");
        } else {
          alert("🎉 Booked Successfully! 🎉\n\n⚠️ Email notifications failed - please contact hotel directly\n\nYour booking has been confirmed!");
        }
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          checkIn: '',
          checkOut: '',
          roomType: '',
        });
      } else {
        alert(`❌ Error submitting booking: ${responseData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert("Error submitting booking. Please check your connection and try again.");
    }
  };

  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Book Your Stay
        </h2>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="checkIn"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    id="checkOut"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-blue-800 mb-1">📅 Date Selection Guidelines:</p>
              <ul className="text-blue-700 space-y-1">
                <li>• Check-in date must be today or in the future</li>
                <li>• Check-out date must be after check-in date</li>
                <li>• Past dates are automatically disabled</li>
              </ul>
            </div> */}

            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <div className="relative">
                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 appearance-none bg-white text-gray-900"
                >
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Luxury Suite</option>
                  <option value="presidential">Presidential Suite</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
