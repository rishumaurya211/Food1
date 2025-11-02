import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { Headers: { token } }
    );
    setData(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((items, index) => {
                  if (index === order.items.length - 1) {
                    return items.name + " x " + items.quantity;
                  } else {
                    return items.name + " x " + items.quantity + "";
                  }
                })}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span>
                  & @x23425b;
                  <b>{order.status}</b>
                </span>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
