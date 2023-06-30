import React, {useState, useEffect} from "react";
import { useNavigate} from "react-router-dom";

function Login() {
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
    const submitted=()=>{
        console.log({email, password});
        fetch("http://localhost:3000/login", {
            method: "post", 
            headers: {
                'Content-Type': 'application/JSON',
            },
            body: JSON.stringify({email, password}),
        })
        .then((result)=>
            result.json())
        .then((result)=>{
            console.log(result);
            nagivate('/');
            localStorage.setItem("user", JSON.stringify(result));
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    const reset =()=>{
        setEmail("");
        setPassword("");
    }
  return (
    <form className="container">
      <div className="mb-3 my-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
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

export default Login;
