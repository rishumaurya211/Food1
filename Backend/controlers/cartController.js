// import userModel from "../models/userModel.js"

// // add item to user cart

// const addToCart = async (req, res) => {
//     try {
//         let userData = await userModel.findOne({ _id: req.body.userId })
//         let cartData = await userData.cartData;

//         if (!cartData[req.body.itemId]) {
//             cartData[req.body.itemId] = 1;
//         }
//         else {
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findById(req.body.userId, { cartData });
//         res.json({ success: true, message: "Added to Cart" })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }


// // remove item from user Cart

// const removeFromCart = async (req, res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData;
//         if (cartData[req.body.itemId] > 0) {
//             cartData[req.body.itemId] -= 1
//         }
//         await userModel.findById(req.body.userId, { cartData })
//         res.json({ success: true, message: "Remoeved From Cart" })

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "False" })
//     }
// }

// // fetch user Cart Data 

// const getCart = async (req, res) => {
// try {
//     let userData = await userModel.findById(req.body.userId);
//     let cartData = await userData.cartData
//     res.json({success:true,cartData})
// } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
// }

// }

// export { addToCart, removeFromCart, getCart };
import userModel from "../models/userModel.js";

// ➤ Add item to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find user
        const userData = await userModel.findById(userId);
        if (!userData) return res.status(404).json({ success: false, message: "User not found" });

        // Initialize cartData if empty
        let cartData = userData.cartData || {};

        // Add item to cart
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // ✅ Update the database
        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

        res.json({ success: true, message: "Added to Cart", cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error while adding to cart" });
    }
};


// ➤ Remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) return res.json({ success: false, message: "User not found" });

        let cartData = userData.cartData || {};

        // Ensure item exists before reducing quantity
        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] <= 0) delete cartData[req.body.itemId]; // Remove item if quantity is 0
        }

        // Save changes
        userData.cartData = cartData;
        await userData.save();

        res.json({ success: true, message: "Removed from Cart", cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while removing from cart" });
    }
};

// ➤ Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        if (!userData) return res.json({ success: false, message: "User not found" });

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error while fetching cart" });
    }
};

export { addToCart, removeFromCart, getCart };
