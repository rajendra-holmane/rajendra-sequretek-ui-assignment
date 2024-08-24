import React, { useState, ChangeEvent } from 'react';
import './FileUpload.scss';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert('Please select a valid image file.');
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <div className="file-upload">
      {preview ? (
        <img className="preview" src={preview} alt="Preview" />
      ) : (
        <div className="upload-container">
          <img src="/Assets/images/upload-icon.svg" alt="Upload Icon" />
          <h3>Upload your photo</h3>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
      />
    </div>
  );
};

export default FileUpload;
