import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function View() {
  const [details, setdetails] = useState("");
  const [author, setauthor] = useState("");
  const [nivedanUsers, setNivedanUsers] = useState([]);
  const [accUsers, setaccUsers] = useState([]);
  const [currPro, setcurrPro] = useState("");
  const [notmore, setnotmore] = useState(false);
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

  const handlerequest = (_id) => {
    const addname = JSON.parse(localStorage.getItem("user")).name;
    const addemail = JSON.parse(localStorage.getItem("user")).email;
    const addID = JSON.parse(localStorage.getItem("user"))._id;
    fetch(`http://localhost:3000/request/${_id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addname, addemail, addID }),
    })
      .then((result) => {
        console.log(result);
        alert("Request Successfully");
        setnotmore(true);
        getEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const revertrequest = (_id) => {
    const revertuserid = JSON.parse(localStorage.getItem("user"))._id;
    fetch(`http://localhost:3000/revert/${_id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ revertuserid }),
    })
      .then((result) => {
        console.log(result);
        alert("Revert Successfully");
        getEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleaccept = (_id, acceptname, acceptemail, acceptuserid) => {
    fetch(`http://localhost:3000/accept/${_id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ acceptname, acceptemail, acceptuserid }),
    })
      .then((result) => {
        console.log(result);
        getEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (_id, removename, removeemail, removeuserid) => {
    fetch(`http://localhost:3000/remove/${_id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ removename, removeemail, removeuserid }),
    })
      .then((result) => {
        console.log(result);
        getEvent();
        console.log(accUsers.length);
        console.log(nivedanUsers.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const currentuser = JSON.parse(localStorage.getItem("user"))._id;
  const check = (currentuser) => {
    const foundElement = nivedanUsers.find(
      (element) => element.userid === currentuser
    );
    if (foundElement) {
      return false;
    } else {
      return true;
    }
  };

  const handlecomplete = (_id) => {
    const result = window.confirm("Do you want to proceed?");
    if (result) {
      const headers = ["Name", "Email"]; // Add more columns as needed
      const data = accUsers.map((user) => [user.name, user.email]); // Modify the properties as per your array structure

      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

      const excelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelFile], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "array_data.xlsx");

     
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
    }
    else
    {
      return;
    }
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
              {check(currentuser) ? (
                <>
                  <h2 style={{ textAlign: "left" }}>
                    Want to be part of the team
                  </h2>
                  <div className="card-body">
                    <button
                      className="btn btn-primary text-white text-right"
                      onClick={() => handlerequest(details._id)}
                      disabled={notmore}
                    >
                      Request
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h4 style={{ textAlign: "left" }}>Already Requested</h4>
                  <div className="card-body">
                    <button
                      className="btn btn-primary text-white text-right"
                      onClick={() => revertrequest(details._id)}
                    >
                      Revert
                    </button>
                  </div>
                </>
              )}
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
                        onClick={() =>
                          handleaccept(
                            details._id,
                            user.name,
                            user.email,
                            user.userid
                          )
                        }
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
                        onClick={() =>
                          handleremove(
                            details._id,
                            user.name,
                            user.email,
                            user.userid
                          )
                        }
                      >
                        Remove
                      </button>
                    </>
                  ))}
                </ul>
                <button
                  className="btn btn-primary"
                  disabled={details.MaxMem < accUsers.length}
                  onClick={()=>handlecomplete(details._id)}
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

export default View;
