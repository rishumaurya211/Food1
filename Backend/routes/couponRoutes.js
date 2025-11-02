import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define Coupon Schema
const couponSchema = new mongoose.Schema({
    code: { type: String, unique: true },
    discountType: String,
    discountValue: Number,
    expiry: Date,
    isActive: Boolean,
});

// Prevent OverwriteModelError
const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

// 🎯 Apply Coupon API
router.post("/apply", async (req, res) => {
    const { couponCode, cartTotal } = req.body;

    try {
        const coupon = await Coupon.findOne({ code: couponCode, isActive: true });

        if (!coupon) {
            return res.status(400).json({ success: false, message: "Invalid or expired coupon" });
        }

        // Check expiry date
        if (new Date(coupon.expiry) < new Date()) {
            return res.status(400).json({ success: false, message: "Coupon has expired" });
        }

        let discount = 0;
        if (coupon.discountType === "percentage") {
            discount = (cartTotal * coupon.discountValue) / 100;
        } else if (coupon.discountType === "fixed") {
            discount = coupon.discountValue;
        }

        const newTotal = Math.max(cartTotal - discount, 0);

        res.json({ success: true, discount, newTotal });
    } catch (error) {
        console.error("Error applying coupon:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router;
