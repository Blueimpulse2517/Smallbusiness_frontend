const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const handleSubmit = expressAsyncHandler(async (req, res) => {
  const { email, subject, message, bookingDetails } = req.body;
  console.log(email, subject, message, bookingDetails);

  // Check if required environment variables are set
  if (!process.env.SMTP_MAIL || !process.env.ADMIN_EMAIL) {
    console.error("Missing email configuration in environment variables");
    return res.status(500).json({ 
      message: "Email configuration error. Please check server settings." 
    });
  }

  // Email to customer
  var customerMailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };

  // Extract customer name from booking details for admin notification
  const customerName = bookingDetails?.fullName || email.split('@')[0]; // Fallback to email username if name not available
  
  // Email to admin/owner
  var adminMailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `${customerName} has booked with the booking details`,
    text: `📋 BOOKING DETAILS:
• Name: ${bookingDetails?.fullName || 'N/A'}
• Email: ${email}
• Check-in Date: ${bookingDetails?.checkIn || 'N/A'}
• Check-out Date: ${bookingDetails?.checkOut || 'N/A'}
• Room Type: ${bookingDetails?.roomType || 'N/A'}

Please check your booking system for more details.`,
  };

  let customerEmailSent = false;
  let adminEmailSent = false;
  let errors = [];

  // Send email to customer
  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(customerMailOptions, function (error, info) {
        if (error) {
          console.log("Customer email error:", error);
          errors.push(`Customer email failed: ${error.message}`);
          reject(error);
        } else {
          console.log("Customer email sent successfully!");
          customerEmailSent = true;
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.error("Customer email error:", error);
  }

  // Send email to admin/owner
  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(adminMailOptions, function (error, info) {
        if (error) {
          console.log("Admin email error:", error);
          errors.push(`Admin email failed: ${error.message}`);
          reject(error);
        } else {
          console.log("Admin email sent successfully!");
          adminEmailSent = true;
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.error("Admin email error:", error);
  }

  // Return appropriate response based on email sending results
  if (customerEmailSent && adminEmailSent) {
    res.status(200).json({ 
      message: "Both confirmation and notification emails sent successfully!",
      customerEmailSent: true,
      adminEmailSent: true
    });
  } else if (customerEmailSent) {
    res.status(200).json({ 
      message: "Confirmation email sent, but owner notification failed. Please check email settings.",
      customerEmailSent: true,
      adminEmailSent: false,
      errors: errors
    });
  } else if (adminEmailSent) {
    res.status(200).json({ 
      message: "Owner notification sent, but customer confirmation failed. Please check email settings.",
      customerEmailSent: false,
      adminEmailSent: true,
      errors: errors
    });
  } else {
    res.status(500).json({ 
      message: "Failed to send emails. Please check email configuration.",
      customerEmailSent: false,
      adminEmailSent: false,
      errors: errors
    });
  }
});

module.exports = { handleSubmit };
