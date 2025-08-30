import { useState } from "react";
import toast from 'react-hot-toast';
import { adminApi } from '../services/Api';

const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    FullName: "",
    role: "User"
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await adminApi.post('/auth/signup', formData);

      if (response.data.status === "success") {
        toast.success(response.data.message || "Registration successful!");
        onSwitchToLogin();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm dark:bg-black/60" ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg p-8 w-full max-w-md modal-pop border border-black dark:border-gray-700 hover:shadow-xl z-10">
        <h3 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">Register</h3>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="FullName"
            placeholder="Your Full Name..."
            value={formData.FullName}
            onChange={handleChange}
            className="w-full h-[50px] bg-[#f0f2f3] dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg pl-3.5"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email..."
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[50px] bg-[#f0f2f3] dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg pl-3.5"
          />
          <input
            type="password"
            name="password"
            placeholder="Choose Password..."
            value={formData.password}
            onChange={handleChange}
            className="w-full h-[50px] bg-[#f0f2f3] dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg pl-3.5"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] bg-[#007580] dark:bg-[#0f9ca4] rounded-lg text-white font-semibold"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <button
            type="button"
            className="w-full h-[50px] border border-[#ccc] dark:border-gray-600 rounded-lg text-black dark:text-white font-medium flex justify-center items-center gap-2 hover:shadow-md transition"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        </form>

        <p
          onClick={onSwitchToLogin}
          className="text-center mt-4 text-[#007580] dark:text-[#34d4db] cursor-pointer"
        >
          Already have an account? Login
        </p>

        <p
          onClick={onClose}
          className="text-center mt-2 text-gray-500 dark:text-gray-400 underline cursor-pointer"
        >
          Close
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;

