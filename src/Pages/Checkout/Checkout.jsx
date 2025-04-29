import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  IoLocationOutline,
  IoCashOutline,
  IoCardOutline,
} from "react-icons/io5";

const DELIVERY_RATES = {
  Dhaka: 120,
  Chattogram: 100,
  Others: 150,
};

const Checkout = () => {
  const cartIds = useSelector((state) => state.cart.ids) || [];
  const cartEntities = useSelector((state) => state.cart.entities) || {};

  const cartItems = cartIds.map((id) => cartEntities[id]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [location, setLocation] = useState("Dhaka");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const deliveryFee = DELIVERY_RATES[location] || DELIVERY_RATES.Others;
  const total = subtotal + deliveryFee;

  const handleLocationChange = (e) => setLocation(e.target.value);
  const handlePaymentChange = (e) => setPaymentMethod(e.target.value);

  const handlePlaceOrder = () => {
    // TODO: integrate with order API
    alert(
      `Order placed! Payment: ${
        paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"
      }, Delivery to: ${location}.`
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Billing & Payment Form */}
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Billing Details</h2>

        <div>
          <label className="block text-sm font-medium mb-1 items-center">
            <IoLocationOutline className="mr-2 text-xl" /> Delivery Location
          </label>
          <select
            className="w-full border-gray-300 rounded p-2"
            value={location}
            onChange={handleLocationChange}
          >
            {Object.keys(DELIVERY_RATES).map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Payment Method</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={handlePaymentChange}
                className="form-radio"
              />
              <IoCashOutline className="ml-2 text-2xl" />
              <span className="ml-2">Cash on Delivery</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentChange}
                className="form-radio"
              />
              <IoCardOutline className="ml-2 text-2xl" />
              <span className="ml-2">Card Payment</span>
            </label>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <div className="space-y-4 max-h-64 overflow-auto">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
