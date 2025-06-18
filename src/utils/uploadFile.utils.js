/**
 * TODO: Upload one or more files to Cloudinary and returns an array of secure URLs.
 * @param {File[]} files - Array of files to upload.
 * @returns {Promise<string[]>} - Array of secure URLs.
 */
export async function uploadFilesToCloudinary(files) {
  const url = 'https://api.cloudinary.com/v1_1/dubcsgtfg/upload';
  const uploadPreset = 'quiktake';

  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Cloudinary upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  });

  return Promise.all(uploadPromises);
}