import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (email, orderId, totalAmount) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // Your Gmail
      pass: process.env.EMAIL_PASSWORD, // Use App Password (Not your real password)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Order Confirmation - Food Delivery 🍕",
    html: `
      <h2>🎉 Order Confirmed! 🎉</h2>
      <p>Thank you for your order! Your payment was successful.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Total Amount Paid:</strong> ₹${totalAmount / 100}</p>
      <p>We appreciate your trust in us. Your food will be delivered soon! 🍽️</p>
      <p>Best Regards, <br> Food Delivery Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to: ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Email sending failed!");
  }
};
