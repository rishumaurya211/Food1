import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const email = searchParams.get("email");

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/orders/userorders",
        { userId: orderId }
      );
      setOrderDetails(response.data.data[0]); // Get order details
    } catch (error) {
      setError("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>🎉 Order Confirmation</h2>
      {loading ? (
        <p>Loading order details...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div>
          <p>
            <strong>Order ID:</strong> {orderDetails._id}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{orderDetails.amount}
          </p>
          <p>
            <strong>Payment Status:</strong> ✅ Paid
          </p>
          <p>
            <strong>Delivery Address:</strong> {orderDetails.address}
          </p>
          <h3>🛒 Order Items:</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>
            📩 A confirmation email has been sent to <strong>{email}</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
