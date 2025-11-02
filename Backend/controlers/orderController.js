import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import { sendEmail } from "../controlers/emailService.js";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});




// placing user order from frontend 

const placeorder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        // ✅ Create Order in MongoDB
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: false, // Default is unpaid
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // ✅ Create Razorpay Order
        const options = {
            amount: req.body.amount * 100, // Convert to paise
            currency: "INR",
            receipt: `order_${newOrder._id}`,
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            orderId: newOrder._id,
            razorpayOrderId: order.id,
            amount: options.amount,
            currency: options.currency,
        });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};

const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId, email } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            // ✅ Update order as paid
            const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });

            // ✅ Send email confirmation
            await sendEmail(email, updatedOrder._id, updatedOrder.amount);

            // ✅ Redirect user to order confirmation page
            res.json({
                success: true,
                message: "Payment Verified. Order confirmed!",
                orderId: updatedOrder._id,
                email: email,
            });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};



// userOrder for frontend

const userOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};


export {
    placeorder, verifyOrder, userOrder
}
export default userOrder

