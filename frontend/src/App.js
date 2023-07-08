import "./App.css";
import Nav from "./components/Nav";
import Foot from "./components/foot";
import Signup from "./components/signup";
import PrivateComponent from "./components/PrivateComponent";
import Addevent from "./components/Addevent";
import Login from "./components/login";
import Event from "./components/Event";
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
      <Route path = "/event" element={<Event />}/>
      
      <Route path = "/update/:id" element={<Update />}/>
      <Route path = "/details/:id" element={<Pro />}/>
      <Route path = "/add-event" element={<Addevent />}/>
      
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
