import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  localStorage.removeItem("authToken");
    navigate("/");

  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to login page
  };

  const handleCancel = () => {
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="relative">
      {showPopup && (
        <div className="fixed inset-0 bg-[#0B192C] flex justify-center items-center">
          <div className=" bg-white p-6  rounded-3xl w-80">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-end space-x-4">
              <span onClick={handleLogout} className="text-red-500 cursor-pointer font-semibold">
                Log Out
              </span>
              <span onClick={handleCancel} className="text-gray-500 cursor-pointer font-semibold dark:text-white">
                Cancel
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
