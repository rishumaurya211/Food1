// import React, { useEffect, useState } from "react";
// import "./Order.css";
// import { assets } from "../../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Order = ({ url }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     try {
//       const response = await axios.get(url + "/api/order/list");
//       if (response.data.success) {
//         setOrders(response.data.data);
//         console.log(response.data.data);
//       } else {
//         toast.error("Error fetching orders");
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       toast.error("Failed to fetch orders");
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, []); // Run only on component mount

//   return (
//     <div className="order add">
//       <h3>Order Page</h3>
//       <div className="order-list">
//         {orders.map((order, index) => (
//           <div key={index} className="order-item">
//             <img src={assets.parcel_icon} alt="Parcel Icon" />
//             <div>
//               <p className="order-item-food">
//                 {order.items.map((item, itemIndex) =>
//                   itemIndex === order.items.length - 1
//                     ? `${item.name} x${item.quantity}`
//                     : `${item.name} x${item.quantity}, `
//                 )}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Order;
import React, { useState } from "react";
import "./Order.css";
import { assets } from "../../assets/assets";

const Order = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      items: [
        { name: "Burger", quantity: 2 },
        { name: "Pizza", quantity: 1 },
      ],
      status: "Processing",
    },
    {
      id: 2,
      items: [
        { name: "Pasta", quantity: 1 },
        { name: "Fries", quantity: 3 },
      ],
      status: "Delivered",
    },
    {
      id: 3,
      items: [
        { name: "Sandwich", quantity: 2 },
        { name: "Soda", quantity: 2 },
      ],
      status: "On the way",
    },
  ]);

  return (
    <div className="order-container">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-item">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) =>
                    index === order.items.length - 1
                      ? `${item.name} x${item.quantity}`
                      : `${item.name} x${item.quantity}, `
                  )}
                </p>
                <p className="order-status">Status: {order.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No orders placed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
