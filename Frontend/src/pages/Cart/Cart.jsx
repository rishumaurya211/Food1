// import React from "react";
// import "./Cart.css";
// import { useState, useContext } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
//     useContext(StoreContext);
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const [error, setError] = useState("");

//   const applyCoupon = async () => {
//     setError(""); // Clear previous errors
//     if (!couponCode) {
//       setError("Please enter a coupon code.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/coupons/apply",
//         {
//           couponCode,
//           cartTotal: getTotalCartAmount(),
//         }
//       );

//       if (response.data.success) {
//         setDiscount(response.data.discount);
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       setError("Failed to apply coupon.");
//     }
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="cart">
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item, index) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div>
//                 <div className="cart-items-title cart items-item">
//                   <img src={item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>${item.price * cartItems[item._id]}</p>
//                   <p onClick={() => removeFromCart(item._id)} className="cross">
//                     x
//                   </p>
//                 </div>
//                 <hr />
//               </div>
//             );
//           }
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>SubTotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery</p>
//               <p>${2}</p>
//             </div>
//             <hr />
//             <div className="couponDiscount">
//               <p>Discount</p>
//             </div>
//             <hr />

//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount() + 2}</b>
//             </div>
//           </div>
//           <button onClick={() => navigate("/order")}>
//             PROCEED TO CHECK OUT
//           </button>
//         </div>
//         {/* <div className="cart-promo-code">
//           <div>
//             <p>If you have a promo code ,Enter it here</p>
//             <div className="cart-promode-input">
//               <input type="text" placeholder="promo code" />
//               <button>Submit</button>
//             </div>
//           </div>
//         </div> */}
//         <div className="cart-promo-code">
//           <div>
//             <p>If you have a promo code, enter it here</p>
//             <div className="cart-promode-input">
//               <input
//                 type="text"
//                 placeholder="Promo Code"
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value)}
//               />
//               <button onClick={applyCoupon}>Submit</button>
//             </div>
//             {error && <p className="error-message">{error}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useState, useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  // Initialize Toast Notifications

  const applyCoupon = async () => {
    setError(""); // Clear previous errors
    if (!couponCode) {
      setError("Please enter a coupon code.");
      toast.warn("Please enter a coupon code! ⚠️", { autoClose: 2000 }); // Notify user
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/coupons/apply",
        {
          couponCode,
          cartTotal: getTotalCartAmount(),
        }
      );

      if (response.data.success) {
        setDiscount(response.data.discount);
        toast.success(
          `Coupon Applied! Discount: ₹${response.data.discount} 🎉`,
          { autoClose: 2500 }
        ); // Success notification
      } else {
        setError(response.data.message);
        setDiscount(0);
        toast.error(response.data.message, { autoClose: 2500 }); // Error notification
      }
    } catch (error) {
      setError("Failed to apply coupon.");
      setDiscount(0);
      toast.error("Failed to apply coupon! ❌", { autoClose: 2500 });
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.info("Item removed from cart 🗑️", { autoClose: 1500 }); // Notify user
  };

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => handleRemove(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className="cart-total-details">
                  <p>Discount</p>
                  <p>- ₹{discount}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Delivery</p>
              <p>₹{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{Math.max(getTotalCartAmount() - discount + 2, 0)}</b>
            </div>
          </div>
          <button
            onClick={() =>
              navigate("/order", { state: { discount, couponCode } })
            }
          >
            PROCEED TO CHECK OUT
          </button>
        </div>

        {/* Coupon Code Section */}
        <div className="cart-promo-code">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promode-input">
              <input
                type="text"
                placeholder="Promo Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon}>Submit</button>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Cart;
