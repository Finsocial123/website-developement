import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserUpdatePage = () => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  return (
    <div className="h-[700px] dark:bg-black bg-white flex justify-center items-center  ">
        <div className=" dark:bg-black dark:text-white text-black bg-white p-3 rounded-lg shadow-md w-[500px] md:border-opacity-50 mt-1  border-2 border-teal-500/20 hover:scale-105 hover:shadow-3xl hover:shadow-teal-500/30
                    hover:border-teal-500/60 hover:z-10 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-center">Update Profile Details</h2>
          
          {/* Avatar Upload Section */}
          <div className="flex items-center justify-center mb-4 px-8 space-x-10">
            <div className="relative w-20 h-20 mb-2">
              <img
                src={selectedImage || "./10.webp"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-gray-700"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300 text-sm"
              >
                Browse
              </label>
              {selectedImage && (
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-sm text-gray-400 hover:text-white transition duration-300"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
              <input
                required
                type="text"
                placeholder='Enter Name'
                className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder='Enter your email'
                readOnly
                className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder='Enter phone number'
                className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition duration-300"
            >
              Save
            </button>
          </form>

          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Delete Profile</h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="delete-profile"
                className="text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="delete-profile" className="text-sm">I agree to delete my profile</label>
            </div>
            <button
              className="w-full bg-red-600 text-white py-2 rounded-md mt-4 hover:bg-red-800 transition duration-300"
            >
              Delete
            </button>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-6 w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
    </div>
  )
}

export default UserUpdatePage