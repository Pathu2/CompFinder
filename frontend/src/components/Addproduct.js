import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Addproduct() {
  
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [discription, setDiscription] = useState("");
  const [image, setImage] = useState(null);
  const userID = JSON.parse(localStorage.getItem('user'))._id;
  // const handlefile=(e)=>{
  //   const file = e.target.files[0];
  //   setImage(file);
  // }
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
  const submitted = ()=>{
    console.log({name, price, category, company, discription, image});
    handleSave();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('company', company);
    formData.append('price', price);
    formData.append('userID', userID);
    formData.append('discription', discription);
    formData.append('image', imageUrl);  
    fetch("http://localhost:3000/add-product",{
      method: "POST",
      body: formData
    })
    .then((result)=>{
      console.log(result);
      navigate('/product');
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <form className="container my-5">
      <div className="form-grou3">
        <label htmlFor="formGroupExampleInput">Name</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput"
          placeholder="Enter name"
          onChange={(e)=>{
            setName(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formGroupExampleInput2">Category</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput2"
          placeholder="Enter Category"
          onChange={(e)=>{
            setCategory(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formGroupExampleInput3">Company</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput3"
          placeholder="Enter Company"
          onChange={(e)=>{
            setCompany(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formGroupExampleInput4">Price</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput4"
          placeholder="Enter Price"
          onChange={(e)=>{
            setPrice(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="exampleFormControlTextarea1">Discription</label>
        <textarea
          className="form-control my-1"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={(e)=>{
            setDiscription(e.target.value)
          }}
        ></textarea>
      </div>
      {/*<div className="form-group my-3">
        <label htmlFor="exampleFormControlFile1">Image</label>
        <input
          type="file"
          className="form-control my-1"
          id="exampleFormControlFile1"
          style={{ width: "auto" }}
          onChange={handlefile}
        />
        </div>*/}
      <div >
      <input  type="file" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Saved Image" />}
    </div>
      <button
        type="button"
        className="btn btn-primary my-3"
        onClick={submitted}
      >
        Submit
      </button>
      <button
        type="button"
        className="btn btn-primary my-3 mx-3"
        //onClick={reset}
      >
        Reset
      </button>
    </form>
  );
}

export default Addproduct;
