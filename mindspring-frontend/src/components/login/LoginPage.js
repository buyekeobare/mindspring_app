import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";


const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/features")
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred.");
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="text"
            placeholder="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-third-color"
              required
            />
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-third-color"
              required
            /> 
          <button type="submit" className="w-full py-2 bg-third-color text-white rounded-lg hover:bg-fourth-color transition">Login

          </button>
        </form>
        
      </div>
    </div>
  );
};
export default LoginPage;