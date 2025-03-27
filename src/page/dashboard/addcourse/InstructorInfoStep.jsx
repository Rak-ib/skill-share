import  { useState } from 'react';

const InstructorInfoStep = ({
  formData,
  handleInstructorChange,
  handleSocialLinkChange,
  handleInstructorImageUpload,
  addInstructor,
  removeInstructor,
  nextStep,
  prevStep,
}) => {
  const [uploadStatus, setUploadStatus] = useState({
    image: { progress: null, error: null },
  });

  const handleImageUpload = async (file, index) => {
    try {
      setUploadStatus({ ...uploadStatus, image: { progress: 'uploading', error: null } });
      await handleInstructorImageUpload(file, index);
      setUploadStatus({ ...uploadStatus, image: { progress: 'complete', error: null } });
    } catch (error) {
      setUploadStatus({ ...uploadStatus, image: { progress: 'error', error: error.message } });
    }
  };

  return (
    <div className="min-w-[50vw] space-y-6">
      <h2 className="text-xl font-semibold mb-4">Instructor Information</h2>

      {formData.instructors.map((instructor, index) => (
        <div key={index} className="border p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Instructor {index + 1}</h3>
            {formData.instructors.length > 1 && (
              <button
                onClick={() => removeInstructor(index)}
                className="text-red-600 text-sm"
              >
                Remove Instructor
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Instructor Image Upload */}
            <div className="col-span-2">
              <label className="block mb-2">Profile Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleImageUpload(e.target.files[0], index);
                    }
                  }}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {instructor.image && (
                  <img 
                    src={instructor.image} 
                    alt="Instructor preview" 
                    className="h-16 w-16 rounded-full object-cover"
                  />
                )}
              </div>
              {uploadStatus.image.progress === 'uploading' && (
                <p className="mt-1 text-sm text-blue-600">Uploading image...</p>
              )}
              {uploadStatus.image.progress === 'error' && (
                <p className="mt-1 text-sm text-red-600">{uploadStatus.image.error}</p>
              )}
            </div>

            {/* Instructor Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={instructor.name}
                onChange={(e) => handleInstructorChange(index, e)}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile
              </label>
              <input
                type="number"
                name="mobile"
                placeholder="01....."
                value={instructor.mobile}
                onChange={(e) => handleInstructorChange(index, e)}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="...@mail.com"
                value={instructor.email}
                onChange={(e) => handleInstructorChange(index, e)}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                placeholder="10+ years of experience in..."
                value={instructor.bio}
                onChange={(e) => handleInstructorChange(index, e)}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                required
              />
            </div>

            {/* Social Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter URL (optional)
              </label>
              <input
                type="url"
                name="twitter"
                placeholder="https://twitter.com/username"
                value={instructor.social_links.twitter}
                onChange={(e) => handleSocialLinkChange(index, e)}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn URL (optional)
              </label>
              <input
                type="url"
                name="linkedin"
                placeholder="https://linkedin.com/in/username"
                value={instructor.social_links.linkedin}
                onChange={(e) => handleSocialLinkChange(index, e)}
                className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addInstructor}
        className="flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Another Instructor
      </button>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InstructorInfoStep;