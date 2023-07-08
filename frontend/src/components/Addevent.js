import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Addevent() {
  
  const navigate = useNavigate();
  const [event, setevent] = useState("");
  const [entryFee, setentryFee] = useState("");
  const [MaxMem, setMaxMem] = useState("");
  const [address, setaddress] = useState("");
  const [discription, setDiscription] = useState("");
  const [image, setImage] = useState(null);
  const userID = JSON.parse(localStorage.getItem('user'))._id;
  // const handlefile=(e)=>{
  //   const file = e.target.files[0];
  //   setImage(file);
  // }
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitted = () => {
    const imgData = new FormData();
    imgData.append('file', selectedFile);
    imgData.append('upload_preset', 'compfinder');
    imgData.append('cloud_name', 'dy9zqmjrq');
  
    fetch('https://api.cloudinary.com/v1_1/dy9zqmjrq/image/upload', {
      method: 'POST',
      body: imgData
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const imageUrl = res.secure_url;
  
        const formData = new FormData();
        formData.append('event', event);
        formData.append('MaxMem', MaxMem);
        formData.append('address', address);
        formData.append('entryFee', entryFee);
        formData.append('userID', userID);
        formData.append('discription', discription);
        formData.append('image', imageUrl);
  
        fetch('http://localhost:3000/add-event', {
          method: 'POST',
          body: formData,
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
          .then((result) => {
            console.log(result);
            navigate('/event');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
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
            setevent(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formGroupExampleInput2">Max Members</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput2"
          placeholder="Enter Max Members"
          onChange={(e)=>{
            setMaxMem(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formGroupExampleInput3">Address</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput3"
          placeholder="Enter Address"
          onChange={(e)=>{
            setaddress(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formGroupExampleInput4">Entry Fee(per person)</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput4"
          placeholder="Enter Entry Fee"
          onChange={(e)=>{
            setentryFee(e.target.value)
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

export default Addevent;
