import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function Pro() {
  const [details, setdetails] = useState("");
  const [author, setauthor] = useState("");
  const [nivedanUsers, setNivedanUsers] = useState([]);
  const [accUsers, setaccUsers] = useState([]);
  const [currPro, setcurrPro] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    getAuthor();
  }, [details]);

  const getEvent = () => {
    fetch(`http://localhost:3000/details/${params.id}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          throw new Error("Failed to fetch event details");
        }
      })
      .then((data) => {
        setdetails(data);
        setNivedanUsers(data.nivedan);
        setaccUsers(data.acc);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const id = params.id;
  console.log(id);
  const getAuthor = () => {
    fetch(`http://localhost:3000/author/${details.userID}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          throw new Error("Failed to fetch author details");
        }
      })
      .then((data) => {
        setauthor(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleted = (_id) => {
    fetch(`http://localhost:3000/getAll/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    }).then((result) => {
      if (result) {
        alert("DELETED SUCCESSFULLY");
        navigate("/event");
      }
    });
  };

  const handlerequest = () => {
    const formdata = new FormData();
    formdata.append("name", JSON.parse(localStorage.getItem("user")).name);
    formdata.append("email", JSON.parse(localStorage.getItem("user")).email);
    fetch(`http://localhost:3000/request/${id}`, {
      method: "put",
    })
      .then(() => {
        getEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-20">
      <div className="row" style={{ marginTop: "15px", marginBottom: "15px" }}>
        <div className="col-7">
          <div className="card" style={{ width: "auto" }}>
            <img src={details.image} className="card-img-top" alt="..." />

            <div className="card-body">
              <h5 className="card-title">{details.event}</h5>
              <p className="card-text">{details.address}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Submitted by: {author.name}</li>
              <li className="list-group-item">{details.discription}</li>
              <li className="list-group-item">
                <b>Price:</b> {details.entryFee}
              </li>
              <li className="list-group-item">
                <b>Maximum Members:</b> {details.MaxMem}
              </li>
            </ul>
            {details.userID === JSON.parse(localStorage.getItem("user"))._id ? (
              <div className="d-flex">
                <Link
                  type="button"
                  className="btn btn-primary p-2 flex-fill"
                  to={"/update/" + details._id}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn btn-danger p-2 flex-fill"
                  onClick={() => deleted(details._id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="col-5 d-flex flex-column">
          {details.userID !== JSON.parse(localStorage.getItem("user"))._id ? (
            <>
              <h2 style={{ textAlign: "left" }}>Want to be part of the team</h2>
              <div className="card-body">
                <button
                  className="btn btn-primary text-white text-right"
                  onClick={handlerequest}
                >
                  Request
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="card-body">
                <h2>Requested Users:</h2>
                <ul style={{ maxHeight: "400px", overflow: "scroll" }}>
                  {nivedanUsers.map((user, index) => (
                    <>
                      <li key={index}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                      </li>
                      <button
                        className="btn btn-primary mb-2"
                        
                      >
                        Accept
                      </button>
                    </>
                  ))}
                </ul>
              </div>
              <div className="card-body">
                <h2>Accepted Users:</h2>
                <ul style={{ maxHeight: "400px", overflow: "scroll" }}>
                  {accUsers.map((user, index) => (
                    <>
                      <li key={index}>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                      </li>
                      <button
                        className="btn btn-danger mb-2"
                        
                      >
                        Remove
                      </button>
                    </>
                  ))}
                </ul>
                <button
                  className="btn btn-primary"
                  disabled={details.MaxMem !== accUsers.length}
                >
                  Complete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pro;
