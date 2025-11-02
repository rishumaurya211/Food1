import { sendEmail } from "../controlers/emailService.js";  // ✅ Correct


require("dotenv").config();

orderRouter.post("/order-success", async (req, res) => {
    console.log("🔍 Order success route hit");  // Debugging log

    const { email, orderId, totalAmount } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required!" });
    }

    try {
        console.log(`📩 Sending email to: ${email}, Order ID: ${orderId}, Amount: ₹${totalAmount}`);

        await sendEmail(email, orderId, totalAmount);

        console.log("✅ Email sent successfully!");
        res.status(200).json({ message: `Order confirmed! Email sent to ${email}` });
    } catch (error) {
        console.error("❌ Error processing order:", error);
        res.status(500).json({ message: "Failed to confirm order", error: error.message });
    }
});
