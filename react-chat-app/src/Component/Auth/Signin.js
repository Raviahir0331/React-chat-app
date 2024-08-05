import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const queryString = `?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}`;
    axios.get(`http://localhost:4000/api/login${queryString}`)
      .then((response) => {
       
        props.setUser(response.data.user)
        const username = response.data.user.username;
        if (username) {
          toast.success(`Welcome Back! ${username}`);
          navigate('/home', { replace: true });
        } else {
          toast.error('Failed to retrieve email from the response');
        }
      })
      .catch((error) => {
        console.log('Something went wrong', error);
        toast.error('Login failed');
      });
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:4000/api/auth/facebook';
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
      <div className="relative w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login Here</h2>
        
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Username Or Email
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
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
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
              type="button"
              onClick={()=>handleSubmit()}
              className="w-full py-2 px-4 bg-white text-gray-800 font-bold rounded-lg hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
            >
              Log In
            </button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-1/2 py-2 px-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-500 mr-2"
            >
              <i className="fab fa-google"></i> Google
            </button>
            <button onClick={handleFacebookLogin}
            className="w-1/2 py-2 px-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 focus:outline-none focus:bg-gray-500 ml-2">
              <i className="fab fa-facebook"></i> Facebook
            </button>
          </div>

        <button
          onClick={() => navigate('/signup')}
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default Signin;
