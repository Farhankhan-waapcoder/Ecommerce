import { useState } from "react";

const ForgotPasswordModal = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Simulate password reset
    setSubmitted(true);
  };

return (
  <div className="z-50 fixed inset-0 flex items-center justify-center">
    {/* Blurred Background */}
    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

    {/* Modal Content */}
    <div className="relative bg-white dark:bg-gray-900 rounded-lg p-8 w-full max-w-md border border-black dark:border-gray-700 transition-shadow duration-300 hover:shadow-xl modal-pop z-10">
      <h3 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
        Forgot Password
      </h3>

      {!submitted ? (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] bg-[#f0f2f3] dark:bg-gray-800 dark:text-white rounded-lg pl-3.5"
          />
          <button
            type="submit"
            className="w-full h-[50px] bg-[#007580] hover:bg-[#005f66] dark:bg-[#00a0ad] dark:hover:bg-[#007580] rounded-lg text-white font-semibold"
          >
            Reset Password
          </button>
        </form>
      ) : (
        <p className="text-center text-green-600 dark:text-green-400 font-medium">
          If the email exists, password reset instructions will be sent.
        </p>
      )}

      <p
        onClick={onSwitchToLogin}
        className="text-center mt-4 text-[#007580] dark:text-[#00c4d6] cursor-pointer"
      >
        Back to Login
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

export default ForgotPasswordModal;
