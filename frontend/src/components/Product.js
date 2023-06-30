import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);

  const getproducts = () => {
    fetch("http://localhost:3000/getAll")
      .then((result) => {
        result = result.json().then((result) => {
          setProducts(result);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getproducts();
  }, []);
  /*The reason to add the blank array at the end is that to avoid rerendering
    of the page when the changes are done on the page itself.*/
  // console.log(products);

  const deleted = (_id) => {
    fetch(`http://localhost:3000/getAll/${_id}`, {
      method: "DELETE",
    }).then((result) => {
      if (result) {
        alert("DELETED SUCCESSFULLY");
      }
    });
  };

  const handlesearch = (e) => {
    if (e.target.value) {
      fetch(`http://localhost:3000/search/${e.target.value}`, {
        method: "GET",
      }).then((result) => {
        if (result) {
          result.json().then((result) => {
            setProducts(result);
          });
        } else {
          setProducts(null);
        }
      });
    }
    else
    {
      getproducts();
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search Karle"
        onChange={handlesearch}
      />
      {products.length?(
        products.map((item, index) => (
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
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.discription}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      Last updated 3 mins ago
                    </small>
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => deleted(item._id)}
                  >
                    Delete
                  </button>
                  <button type="button" className="btn btn-primary mx-3">
                    <Link className="links" to={"/update/" + item._id}>
                      Update
                    </Link>
                  </button>
                  <button type="button" className="btn btn-primary mx-">
                    <Link className="links" to={"/product/" + item._id}>
                      See More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )))
      :(<h3>Nahi hai kuch aaisa</h3>)}
    </div>
  );
}

export default Product;
