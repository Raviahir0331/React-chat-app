import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    if(formData.email && formData.password && formData.name ==""){
      alert('please fill all the data')
    }
    axios.post("http://localhost:4000/api/register", formData)
    .then(() => {
      toast.success(`Thank You!`);
      navigate('/',{replace:true})
      
    });

    e.preventDefault();
  
    // Handle form submission
    // console.log("Form submitted:", formData);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:4000/api/auth/facebook';
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 relative overflow-hidden">
      <div className="relative w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
         Registation Here
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="email"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Email or Phone"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              Register
            </button>
          </div>
          <div className="flex justify-between items-center">
            <button onClick={handleGoogleLogin} className="w-1/2 py-2 px-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-500 mr-2">
              <i className="fab fa-google"></i> Google
            </button>
            <button onClick={handleFacebookLogin} className="w-1/2 py-2 px-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-500 ml-2">
              <i className="fab fa-facebook"></i> Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
