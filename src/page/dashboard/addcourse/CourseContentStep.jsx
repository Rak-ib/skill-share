import  { useState } from 'react';

const CourseContentStep = ({
  sections: initialSections,
  handleSectionChange,
  uploadToCloudinary,
  nextStep,
  prevStep,
}) => {
  const [localSections, setLocalSections] = useState(() => 
    Array.isArray(initialSections) && initialSections.length ? initialSections : []
  );
  
  const [uploadStatus, setUploadStatus] = useState({
    video: { progress: null, error: null },
    thumbnail: { progress: null, error: null },
  });

  // Section management
  const addSection = () => {
    setLocalSections(prev => [
      ...prev,
      { 
        title: '', 
        description: '', 
        videos: [] 
      }
    ]);
  };

  const removeSection = (index) => {
    setLocalSections(prev => prev.filter((_, i) => i !== index));
  };

  // Video management
  const addVideo = (sectionIndex) => {
    setLocalSections(prev => {
      const updated = [...prev];
      updated[sectionIndex] = {
        ...updated[sectionIndex],
        videos: [
          ...(updated[sectionIndex].videos || []),
          {
            title: '',
            description: '',
            url: '',
            duration: '',
            thumbnail: '',
          }
        ]
      };
      return updated;
    });
  };

  const removeVideo = (sectionIndex, videoIndex) => {
    setLocalSections(prev => {
      const updated = [...prev];
      updated[sectionIndex] = {
        ...updated[sectionIndex],
        videos: updated[sectionIndex].videos.filter((_, i) => i !== videoIndex)
      };
      return updated;
    });
  };

  // Field handlers
  const handleSectionFieldChange = (sectionIndex, field, value) => {
    setLocalSections(prev => {
      const updated = [...prev];
      updated[sectionIndex] = {
        ...updated[sectionIndex],
        [field]: value
      };
      return updated;
    });
  };

  const handleVideoFieldChange = (sectionIndex, videoIndex, field, value) => {
    setLocalSections(prev => {
      const updated = [...prev];
      updated[sectionIndex] = {
        ...updated[sectionIndex],
        videos: updated[sectionIndex].videos.map((video, i) => 
          i === videoIndex ? { ...video, [field]: value } : video
        )
      };
      return updated;
    });
  };

  // File upload handlers
  const handleVideoUpload = async (file, sectionIndex, videoIndex) => {
    try {
      setUploadStatus(prev => ({
        ...prev,
        video: { progress: 'uploading', error: null }
      }));
      
      const url = await uploadToCloudinary(file, 'video');
      
      setLocalSections(prev => {
        const updated = [...prev];
        updated[sectionIndex] = {
          ...updated[sectionIndex],
          videos: updated[sectionIndex].videos.map((video, i) => 
            i === videoIndex ? { ...video, url } : video
          )
        };
        return updated;
      });

      setUploadStatus(prev => ({
        ...prev,
        video: { progress: 'complete', error: null }
      }));
    } catch (error) {
      setUploadStatus(prev => ({
        ...prev,
        video: { progress: 'error', error: error.message }
      }));
    }
  };

  const handleThumbnailUpload = async (file, sectionIndex, videoIndex) => {
    try {
      setUploadStatus(prev => ({
        ...prev,
        thumbnail: { progress: 'uploading', error: null }
      }));
      
      const url = await uploadToCloudinary(file, 'image');
      
      setLocalSections(prev => {
        const updated = [...prev];
        updated[sectionIndex] = {
          ...updated[sectionIndex],
          videos: updated[sectionIndex].videos.map((video, i) => 
            i === videoIndex ? { ...video, thumbnail: url } : video
          )
        };
        return updated;
      });

      setUploadStatus(prev => ({
        ...prev,
        thumbnail: { progress: 'complete', error: null }
      }));
    } catch (error) {
      setUploadStatus(prev => ({
        ...prev,
        thumbnail: { progress: 'error', error: error.message }
      }));
    }
  };

  // Save and continue
  const saveAndContinue = () => {
    // Validate sections
    if (localSections.length === 0) {
      alert('Please add at least one section');
      return;
    }

    // Validate videos in each section
    for (const section of localSections) {
      if (!section.videos || section.videos.length === 0) {
        alert(`Section "${section.title || 'Untitled'}" has no videos. Please add at least one video.`);
        return;
      }
    }

    handleSectionChange(localSections);
    nextStep();
  };

  return (
    <div className="min-w-[50vw] space-y-6">
      <h2 className="text-xl font-semibold mb-4">Course Content</h2>

      {localSections.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <button 
            onClick={addSection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Add First Section
          </button>
        </div>
      ) : (
        localSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Section {sectionIndex + 1}: {section.title || 'Untitled Section'}
              </h3>
              <button
                onClick={() => removeSection(sectionIndex)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove Section
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => handleSectionFieldChange(sectionIndex, 'title', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={section.description}
                  onChange={(e) => handleSectionFieldChange(sectionIndex, 'description', e.target.value)}
                  className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="text-md font-medium mb-3">Videos</h4>

                {section.videos?.length === 0 ? (
                  <p className="text-sm text-gray-500 mb-3">No videos added yet</p>
                ) : (
                  section.videos.map((video, videoIndex) => (
                    <div key={videoIndex} className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">
                          Video {videoIndex + 1}: {video.title || 'Untitled Video'}
                        </h5>
                        <button
                          onClick={() => removeVideo(sectionIndex, videoIndex)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Video
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Video Title
                          </label>
                          <input
                            type="text"
                            value={video.title}
                            onChange={(e) => handleVideoFieldChange(sectionIndex, videoIndex, 'title', e.target.value)}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={video.description}
                            onChange={(e) => handleVideoFieldChange(sectionIndex, videoIndex, 'description', e.target.value)}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Video File
                          </label>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => e.target.files[0] && 
                              handleVideoUpload(e.target.files[0], sectionIndex, videoIndex)}
                            className="block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-md file:border-0
                              file:text-sm file:font-semibold
                              file:bg-blue-50 file:text-blue-700
                              hover:file:bg-blue-100"
                          />
                          {uploadStatus.video.progress === 'uploading' && (
                            <p className="mt-1 text-sm text-blue-600">Uploading video...</p>
                          )}
                          {uploadStatus.video.progress === 'error' && (
                            <p className="mt-1 text-sm text-red-600">{uploadStatus.video.error}</p>
                          )}
                          {video.url && (
                            <p className="mt-1 text-sm text-green-600">Video uploaded successfully</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thumbnail
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => e.target.files[0] && 
                                handleThumbnailUpload(e.target.files[0], sectionIndex, videoIndex)}
                              className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                            {video.thumbnail && (
                              <img 
                                src={video.thumbnail} 
                                alt="Thumbnail preview" 
                                className="h-12 w-12 object-cover rounded"
                              />
                            )}
                          </div>
                          {uploadStatus.thumbnail.progress === 'uploading' && (
                            <p className="mt-1 text-sm text-blue-600">Uploading thumbnail...</p>
                          )}
                          {uploadStatus.thumbnail.progress === 'error' && (
                            <p className="mt-1 text-sm text-red-600">{uploadStatus.thumbnail.error}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration (minutes)
                          </label>
                          <input
                            type="number"
                            value={video.duration}
                            onChange={(e) => handleVideoFieldChange(sectionIndex, videoIndex, 'duration', e.target.value)}
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}

                <button
                  onClick={() => addVideo(sectionIndex)}
                  className="mt-2 flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Video
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {localSections.length > 0 && (
        <button
          onClick={addSection}
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Another Section
        </button>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={saveAndContinue}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CourseContentStep;