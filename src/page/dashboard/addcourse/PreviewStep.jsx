import React from 'react';
// import axios from 'axios';

const PreviewStep = ({ formData, prevStep, handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);

  const submitCourse = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      console.log("formData:",formData)
      // const response = await axios.post('http://localhost:5000/course/add', formData);
      // console.log('Course created:', response.data);
      handleSubmit();
    } catch (error) {
      console.error('Error submitting course:', error);
      setSubmitError(error.response?.data?.message || 'Failed to create course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-w-[50vw] space-y-6">
      <h2 className="text-xl font-semibold mb-4">Step 4: Preview and Publish</h2>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Course Header */}
        <div className="bg-blue-50 p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-800">{formData.title}</h3>
          <p className="text-gray-600 mt-2">{formData.description}</p>
          <div className="flex items-center mt-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {formData.level}
            </span>
            <span className="ml-2 text-sm text-gray-500">{formData.duration}</span>
          </div>
        </div>

        {/* Instructors */}
        <div className="p-6 border-b">
          <h4 className="text-lg font-medium mb-3">Instructors</h4>
          <div className="space-y-4">
            {formData.instructors.map((instructor, index) => (
              <div key={index} className="flex items-start">
                {instructor.image && (
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <h5 className="font-medium">{instructor.name}</h5>
                  <p className="text-sm text-gray-600">{instructor.bio}</p>
                  <div className="flex mt-2 space-x-3">
                    {instructor.social_links.twitter && (
                      <a href={instructor.social_links.twitter} className="text-blue-500 hover:text-blue-700">
                        Twitter
                      </a>
                    )}
                    {instructor.social_links.linkedin && (
                      <a href={instructor.social_links.linkedin} className="text-blue-500 hover:text-blue-700">
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <h4 className="text-lg font-medium mb-3">Course Content</h4>
          <div className="space-y-6">
            {formData.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h5 className="font-medium">
                    Section {sectionIndex + 1}: {section.title}
                  </h5>
                </div>
                <div className="divide-y">
                  {section.videos.map((video, videoIndex) => (
                    <div key={videoIndex} className="p-4 flex items-start">
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-16 w-28 object-cover rounded mr-4"
                        />
                      )}
                      <div className="flex-1">
                        <h6 className="font-medium">{video.title}</h6>
                        <p className="text-sm text-gray-600">{video.description}</p>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span>{video.duration} min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {submitError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        </div>
      )}

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
          onClick={submitCourse}
          disabled={isSubmitting}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Publishing...
            </>
          ) : (
            'Publish Course'
          )}
        </button>
      </div>
    </div>
  );
};

export default PreviewStep;