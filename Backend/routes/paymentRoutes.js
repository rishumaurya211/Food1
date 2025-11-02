// import express from "express";
// import Razorpay from "razorpay";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// // ✅ Initialize Router
// const router = express.Router();

// // ✅ Initialize Razorpay with API Keys
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ✅ Create an order
// router.post("/create-order", async (req, res) => {
//     try {
//         console.log("Request body:", req.body);

//         if (!req.body.amount) {
//             return res.status(400).json({ message: "Amount is required" });
//         }

//         const options = {
//             amount: req.body.amount * 100,
//             currency: "INR",
//             receipt: `order_rcptid_${Date.now()}`,
//         };

//         console.log("Creating order with options:", options);

//         const order = await razorpay.orders.create(options);

//         console.log("Razorpay Order Response:", order);
//         res.json(order);
//     } catch (error) {
//         console.error("Error creating Razorpay order:", error);
//         res.status(500).json({ message: "Error creating order", error });
//     }
// });
// export default router;
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const router = express.Router();

// 🔹 Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🔹 Create an Order
router.post("/create-order", async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `order_rcptid_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Error creating order", error });
    }
});

// 🔹 Verify Payment
router.post("/verify", async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const secret = process.env.RAZORPAY_KEY_SECRET;

        // Generate HMAC signature
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature === razorpay_signature) {
            return res.json({ success: true, message: "Payment verified" });
        } else {
            return res.status(400).json({ success: false, message: "Signature mismatch" });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
});

export default router;
