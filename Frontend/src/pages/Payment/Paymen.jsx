import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSlip = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Extract parameters from URL
  const orderDetails = {
    firstName: searchParams.get("firstname"),
    lastName: searchParams.get("lastname"),
    email: searchParams.get("email"),
    street: searchParams.get("street"),
    city: searchParams.get("city"),
    state: searchParams.get("state"),
    zipCode: searchParams.get("zipcode"),
    phone: searchParams.get("phone"),
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", width: "300px" }}>
      <h2>Payment Slip</h2>
      <p><strong>Name:</strong> {orderDetails.firstName} {orderDetails.lastName}</p>
      <p><strong>Email:</strong> {orderDetails.email}</p>
      <p><strong>Address:</strong> {orderDetails.street}, {orderDetails.city}, {orderDetails.state} - {orderDetails.zipCode}</p>
      <p><strong>Phone:</strong> {orderDetails.phone}</p>
      <button onClick={() => window.print()}>Print Slip</button>
    </div>
  );
};

export default PaymentSlip;
