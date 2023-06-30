import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Addproduct() {
  const nagivate = useNavigate();
  const params = useParams("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [discription, setDiscription] = useState("");
  // const [image, setImage] = useState(null);
  // const userID = JSON.parse(localStorage.getItem('user'))._id;
  useEffect(()=>{
    getproduct();
  },[])
  const getproduct=()=>{
    fetch(`http://localhost:3000/update/${params.id}`,{
      method:"GET"
    })
    .then((result)=>{
      if (result) {
        result = result.json()
        .then((result)=>{
          setName(result.name);
          setCategory(result.category);
          setCompany(result.company);
          setDiscription(result.discription);
          setPrice(result.price);
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
        body: JSON.stringify({name, price, category, company, discription}), 
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result)=>result.json)
      .then((result)=>{
        console.log(result);
        nagivate('/product');
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
          value={name}
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
          value={category}
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
          value={company}
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
          value={price}
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

export default Addproduct;
