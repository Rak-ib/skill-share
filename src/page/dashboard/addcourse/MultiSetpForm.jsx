import { useState } from 'react';
import axios from 'axios';
import BasicInfoStep from './BasicInfoStep';
import InstructorInfoStep from './InstructorInfoStep';
import CourseContentStep from './CourseContentStep';
import PreviewStep from './PreviewStep';

const MultiStepForm = ({application}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: application.courseTitle,
    description: application.courseDescription,
    banner: application.courseThumbnail,
    introductionVideo: application.demoVideo,
    syllabus: application.syllabus,
    duration: application.duration,
    category: '',
    level: '',
    language: '',
    startingDate:'',
    endingDate:'',
    price: application.price,
    user:application.user,
    currency: 'USD',
    instructors: [{
      name: '',
      bio: '',
      image: '',
      mobile: '',
      email: '',
      social_links: {
        twitter: '',
        linkedin: '',
      },
    }],
    sections: [],
  });

  // Cloudinary upload function
  const uploadToCloudinary = async (file, type = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kcig1ito');
    formData.append('cloud_name', 'dcao1wljw');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcao1wljw/${type}/upload`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  // Instructor image upload handler
  const handleInstructorImageUpload = async (file, index) => {
    try {
      const url = await uploadToCloudinary(file, 'image');
      const updatedInstructors = [...formData.instructors];
      updatedInstructors[index].image = url;
      setFormData(prev => ({ ...prev, instructors: updatedInstructors }));
    } catch (error) {
      console.error('Instructor image upload failed:', error);
      throw error;
    }
  };

  // Navigation
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInstructorChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedInstructors = [...prev.instructors];
      updatedInstructors[index] = { ...updatedInstructors[index], [name]: value };
      return { ...prev, instructors: updatedInstructors };
    });
  };

  const handleSocialLinkChange = (index, e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedInstructors = [...prev.instructors];
      updatedInstructors[index].social_links = {
        ...updatedInstructors[index].social_links,
        [name]: value
      };
      return { ...prev, instructors: updatedInstructors };
    });
  };

  const addInstructor = () => {
    setFormData(prev => ({
      ...prev,
      instructors: [
        ...prev.instructors,
        {
          name: '',
          bio: '',
          image: '',
          social_links: { twitter: '', linkedin: '' },
        },
      ],
    }));
  };

  const removeInstructor = (index) => {
    setFormData(prev => ({
      ...prev,
      instructors: prev.instructors.filter((_, i) => i !== index)
    }));
  };

  const handleSectionChange = (sections) => {
    setFormData(prev => ({ ...prev, sections }));
  };

  const handleSubmit = async () => {
    try {
      console.log("ooooooooooooooooooo",formData)
      const res=await axios.post('http://localhost:5000/courses/courses', formData,{withCredentials:true});
      console.log(res.data.message);
      alert('Course published successfully!');
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to publish course. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a New Course</h1>
      
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((stepNum) => (
          <div key={stepNum} className={`flex flex-col items-center ${step >= stepNum ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              step === stepNum ? 'border-blue-600 bg-blue-100' :
              step > stepNum ? 'border-green-500 bg-green-100' :
              'border-gray-300'
            }`}>
              {stepNum}
            </div>
            <span className="text-xs mt-1">
              {stepNum === 1 && 'Basic Info'}
              {stepNum === 2 && 'Instructors'}
              {stepNum === 3 && 'Content'}
              {stepNum === 4 && 'Preview'}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <BasicInfoStep formData={formData} handleChange={handleChange} nextStep={nextStep} />
      )}

      {step === 2 && (
        <InstructorInfoStep
          formData={formData}
          handleInstructorChange={handleInstructorChange}
          handleSocialLinkChange={handleSocialLinkChange}
          handleInstructorImageUpload={handleInstructorImageUpload}
          addInstructor={addInstructor}
          removeInstructor={removeInstructor}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 3 && (
        <CourseContentStep
          sections={formData.sections}
          handleSectionChange={handleSectionChange}
          uploadToCloudinary={uploadToCloudinary}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 4 && (
        <PreviewStep formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default MultiStepForm;