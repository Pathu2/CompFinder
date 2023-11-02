import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nagivate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth)
    {
      nagivate('/');
    }
  })
  const submitted = () => {
    console.log({ name }, { email }, { password });
    /*fetch("http://localhost:3000/get-all")
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });*/
    /*We used fetch function here to get the data from the server when we hit submit */

    /*******Fetch for post**********/
    fetch("http://localhost:3000/new-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      /*Why we need headers */
      body: JSON.stringify({name,email,password}),
      /*why we need to use JSON.stringify*/
      /*We need to use this because we want to send the data in json format
        and the body of the fetch accepts the string...therefore we need to convert json
        to string using stringify*/
        /*Also dont send the elements individually, make the object and then send it.*/
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);
        nagivate('/event');
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <form className="container" >
      <div className="mb-3 my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Name
        </label>
        <input
          type="name"
          className="form-control"
          id="exampleFormControlInput1"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput2"
          name="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <label htmlFor="inputPassword5" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="inputPassword5"
        className="form-control"
        name="password"
        aria-labelledby="passwordHelpBlock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div id="passwordHelpBlock" className="form-text">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
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
        onClick={reset}
      >
        Reset
      </button>
    </form>
  );
}

export default Signup;
