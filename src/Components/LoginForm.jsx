// LoginForm.js
import React, { useState } from "react";
import { useLoginMutation } from "../redux/apiSlice";

const LoginForm = ({ onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black border-2 text-white py-2 rounded-lg hover:bg-white hover:border-2 hover:text-black transition"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-2 text-center">
          {error.data?.error || "Login failed. Please try again."}
        </p>
      )}
      <div className="mt-4 text-center">
        Don’t have an account?{" "}
        <button
          className="text-blue-500 hover:underline"
          onClick={onSwitchToSignup}
        >
          Sign Up
        </button>
      </div>
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={onClose}
      >
        ✖
      </button>
    </div>
  );
};

export default LoginForm;
