import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Event() {
  const [events, setevents] = useState([]);

  const getevents = () => {
    fetch("http://localhost:3000/getAll",{
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
      .then((result) => {
        result = result.json().then((result) => {
          
          setevents(result);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getevents();
  }, []);
  /*The reason to add the blank array at the end is that to avoid rerendering
    of the page when the changes are done on the page itself.*/
  // console.log(events);

  // const deleted = (_id) => {
  //   fetch(`http://localhost:3000/getAll/${_id}`, {
  //     method: "DELETE",
    
  //     headers: {
  //       authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
  //     }
  //   }).then((result) => {
  //     if (result) {
  //       alert("DELETED SUCCESSFULLY");
  //     }
  //   });
  // };

  const handlesearch = (e) => {
    if (e.target.value) {
      fetch(`http://localhost:3000/search/${e.target.value}`, {
        method: "GET",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      }).then((result) => {
        if (result) {
          result.json().then((result) => {
            setevents(result);
          });
        } else {
          setevents(null);
        }
      });
    }
    else
    {
      getevents();
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search"
        onChange={handlesearch}
      />
      {events.length?(
        events.map((item, index) => (
          <div
            key={index}
            className="card mb-3 my-3" /*style={{'max-width': '540px'}}*/
          >
            <div className="row g-0">
              <div className="col-md-4">
                {<img
                  src={item.image}
                  className="img-fluid rounded-start"
                  alt="kuch toh hai"
                />}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.event}</h5>
                  <p className="card-text">Entry Fee: {item.entryFee}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Max Members: {item.MaxMem}
                    </small>
                  </p>
                  <button type="button" className="btn btn-primary mx-">
                    <Link className="links" to={"/details/" + item._id}>
                      See More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )))
      :(<h3>No result</h3>)}
    </div>
  );
}

export default Event;
