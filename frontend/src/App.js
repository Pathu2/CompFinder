import "./App.css";
import Nav from "./components/Nav";
import Foot from "./components/foot";
import Signup from "./components/signup";
import PrivateComponent from "./components/PrivateComponent";
import Addproduct from "./components/Addproduct";
import Login from "./components/login";
import Product from "./components/Product";
import Update from "./components/Update";
import Pro from "./components/Pro";

import { BrowserRouter,  Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route element={<PrivateComponent />}>
      <Route path = "/" element={<h1>Home ho bhai</h1>}/>
      <Route path = "/product" element={<Product />}/>
      <Route path = "/update/:id" element={<Update />}/>
      <Route path = "/product/:id" element={<Pro />}/>
      <Route path = "/add-product" element={<Addproduct />}/>
      <Route path = "/logout" element={<h1>logout ho bhai</h1>}/>
      </Route>
      <Route path = "/signup" element={<Signup />}/>
      <Route path = "/login" element={<Login />}/>
    </Routes>
    
    </BrowserRouter>
    
    </div>
  );
}

export default App;
