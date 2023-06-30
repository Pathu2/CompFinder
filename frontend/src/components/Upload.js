import React, { useState } from 'react';

const ImageForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSave = () => {
    if (!window.indexedDB || !window.localStorage) {
      // IndexedDB or Local Storage not supported
      console.error('IndexedDB or Local Storage is not supported.');
      return;
    }

    // Store the image data in IndexedDB or Local Storage
    if (window.indexedDB) {
      // Save in IndexedDB
      const request = window.indexedDB.open('ImageDataDB', 1);

      request.onerror = (event) => {
        console.error('Error opening IndexedDB:', event.target.errorCode);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('ImageData', { autoIncrement: true });

        objectStore.add(selectedFile);
      };

      request.onsuccess = () => {
        console.log('Image data saved in IndexedDB.');
      };
    } else {
      // Save in Local Storage
      localStorage.setItem('ImageData', JSON.stringify(selectedFile));
      console.log('Image data saved in Local Storage.');
    }
  };

  React.useEffect(() => {
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSave}>Save</button>
      {imageUrl && <img src={imageUrl} alt="Saved Image" />}
    </div>
  );
};

export default ImageForm;