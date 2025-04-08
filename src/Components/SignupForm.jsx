// SignupForm.js
import React, { useState } from "react";
import { useSignupMutation } from "../redux/apiSlice";

const SignupForm = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [signup, { isLoading, error }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signup({ name, email, password }).unwrap();
      onClose();
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-black border-2 text-white py-2 rounded-lg hover:bg-white hover:border-2 hover:text-black transition"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      {error && (
        <p className="text-red-500 mt-2 text-center">
          {error.data?.error || "Signup failed. Please try again."}
        </p>
      )}
      <div className="mt-4 text-center">
        Already have an account?{" "}
        <button
          className="text-blue-500 hover:underline"
          onClick={onSwitchToLogin}
        >
          Log In
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

export default SignupForm;
