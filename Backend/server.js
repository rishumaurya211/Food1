import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import couponRoutes from "./routes/couponRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js";


import dotenv from "dotenv";
dotenv.config();


// app config

const app = express()
const port = 8000

// middleware
// to pass the data from fonternd to backend pass through json
app.use(express.json())
app.use(cors())// we can access backend to frontend


// db connection

connectdb()

// api end points

app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order/", orderRouter)
app.use("/api/coupons", couponRoutes)
app.use("/api/payment", paymentRoutes);


app.post("/api/order/place", async (req, res) => {
    try {
        const { address, items, amount } = req.body;

        // Save order details in DB
        const newOrder = await Order.create({ address, items, amount });

        // Generate Razorpay Order ID
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `order_rcptid_${newOrder._id}`,
        });

        res.json({
            success: true,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
        });
    } catch (error) {
        console.error("Order Placement Error:", error);
        res.status(500).json({ success: false, message: "Failed to place order" });
    }
});


app.get("/", (req, res) => {
    res.send("API Working")
})// request the data from server 

app.listen(port, () => {// to start the server 
    console.log(`Server stated on http://localhost:${port}`);
})

// mongodb+srv://mauryarishu211:20135111@cluster0.nds8w.mongodb.net/?