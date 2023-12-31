import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Addevent() {
  const nagivate = useNavigate();
  const params = useParams("");
  const [event, setevent] = useState("");
  const [entryFee, setentryFee] = useState("");
  const [MaxMem, setMaxMem] = useState("");
  const [address, setaddress] = useState("");
  const [discription, setDiscription] = useState("");
  // const [image, setImage] = useState(null);
  // const userID = JSON.parse(localStorage.getItem('user'))._id;
  useEffect(()=>{
    getevent();
  },[])
  const getevent=()=>{
    fetch(`http://localhost:3000/update/${params.id}`,{
      method:"GET"
    ,
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    .then((result)=>{
      if (result) {
        result = result.json()
        .then((result)=>{
          setevent(result.event);
          setMaxMem(result.MaxMem);
          setaddress(result.address);
          setDiscription(result.discription);
          setentryFee(result.entryFee);
        });
      }
    });
  }
  // const handlefile=(e)=>{
  //   const file = e.target.files[0];
  //   setImage(file);
  // }
  const submitted = () =>{
      fetch(`http://localhost:3000/update/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({event, entryFee, MaxMem, address, discription}), 
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
      })
      .then((result)=>result.json)
      .then((result)=>{
        console.log(result);
        nagivate('/event');
        alert("Upadated Successfully");
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
          value={event}
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
          value={MaxMem}
          onChange={(e)=>{
            setMaxMem(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formGroupExampleInput3">address</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput3"
          placeholder="Enter address"
          value={address}
          onChange={(e)=>{
            setaddress(e.target.value)
          }}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="formGroupExampleInput4">Entry Fee</label>
        <input
          type="text"
          className="form-control my-1"
          id="formGroupExampleInput4"
          placeholder="Enter Entry Fee"
          value={entryFee}
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
          value={discription}
          onChange={(e)=>{
            setDiscription(e.target.value)
          }}
        ></textarea>
      </div>
      {/* <div className="form-group my-3">
        <label htmlFor="exampleFormControlFile1">Image</label>
        <input
          type="file"
          className="form-control my-1"
          id="exampleFormControlFile1"
          style={{ width: "auto" }}
          onChange={handlefile}
        />
      </div> */}
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
