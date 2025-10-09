import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const handleSubmit = expressAsyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing request body" });
  }

  const { email, subject, message, bookingDetails } = req.body;

  if (!email || !subject || !message || !bookingDetails) {
    return res.status(400).json({ message: "Missing required booking data" });
  }

  console.log(email, subject, message, bookingDetails);

  if (!process.env.SMTP_MAIL || !process.env.ADMIN_EMAIL) {
    console.error("Missing email configuration in environment variables");
    return res.status(500).json({
      message: "Email configuration error. Please check server settings.",
    });
  }

  const customerMailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    text: message,
  };

  const customerName = bookingDetails?.fullName || (email ? email.split("@")[0] : "Customer");

  const adminMailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `${customerName} has booked with the booking details`,
    text: `📋 BOOKING DETAILS:
• Name: ${bookingDetails?.fullName || "N/A"}
• Email: ${email}
• Check-in Date: ${bookingDetails?.checkIn || "N/A"}
• Check-out Date: ${bookingDetails?.checkOut || "N/A"}
• Room Type: ${bookingDetails?.roomType || "N/A"}

Please check your booking system for more details.`,
  };

  let customerEmailSent = false;
  let adminEmailSent = false;
  let errors = [];

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(customerMailOptions, (error, info) => {
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

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(adminMailOptions, (error, info) => {
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

  if (customerEmailSent && adminEmailSent) {
    res.status(200).json({
      message: "Both confirmation and notification emails sent successfully!",
      customerEmailSent: true,
      adminEmailSent: true,
    });
  } else if (customerEmailSent) {
    res.status(200).json({
      message:
        "Confirmation email sent, but owner notification failed. Please check email settings.",
      customerEmailSent: true,
      adminEmailSent: false,
      errors,
    });
  } else if (adminEmailSent) {
    res.status(200).json({
      message:
        "Owner notification sent, but customer confirmation failed. Please check email settings.",
      customerEmailSent: false,
      adminEmailSent: true,
      errors,
    });
  } else {
    res.status(500).json({
      message: "Failed to send emails. Please check email configuration.",
      customerEmailSent: false,
      adminEmailSent: false,
      errors,
    });
  }
});
