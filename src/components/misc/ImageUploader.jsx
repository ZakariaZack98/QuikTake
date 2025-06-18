import React, { useRef } from 'react';
import { uploadFilesToCloudinary } from '../../utils/uploadFile.utils';

export function ImageUploader() {
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files) {
      console.log('Selected file:', files);
      const secureUrls = await uploadFilesToCloudinary(files);
      console.log('secure urls: ', secureUrls)
    }
  };

  return (
    <div>
      <div 
        onClick={handleDivClick}
        style={{
          border: '2px dashed #ccc',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer'
        }}
      >
        Click here to upload an image
      </div>
      
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
}