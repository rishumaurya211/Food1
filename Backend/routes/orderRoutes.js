import express from "express";
import { placeorder, userOrder, verifyOrder } from "../controlers/orderController.js";
import { sendEmail } from "../controlers/emailService.js"; // ✅ Import sendEmail
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeorder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrder);

// ✅ Order Success - Send Email Notification
orderRouter.post("/order-success", async (req, res) => {
    const { email, orderId, totalAmount } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required!" });
    }

    try {
        await sendEmail(email, orderId, totalAmount);
        res.status(200).json({ message: `Order confirmed! Email sent to ${email}` });
    } catch (error) {
        console.error("❌ Error processing order:", error);
        res.status(500).json({ message: "Failed to confirm order" });
    }
});

export default orderRouter;
