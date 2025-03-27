// utils/cloudinary.js
export const uploadToCloudinary = async (file, type = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kcig1ito'); // Your upload preset
    formData.append('cloud_name', 'dcao1wljw'); // Your cloud name
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcao1wljw/${type}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };