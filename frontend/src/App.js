import "./App.css";
import Nav from "./components/Nav";
import Foot from "./components/foot";
import Signup from "./components/signup";
import PrivateComponent from "./components/PrivateComponent";
import Addevent from "./components/Addevent";
import Login from "./components/login";
import Event from "./components/Event";
import Update from "./components/Update";
import View from "./components/View";

import { BrowserRouter,  Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route element={<PrivateComponent />}>
      <Route path = "/event" element={<Event />}/>
      
      <Route path = "/update/:id" element={<Update />}/>
      <Route path = "/details/:id" element={<View />}/>
      <Route path = "/add-event" element={<Addevent />}/>
      
      <Route path = "/logout" element={<h1>logout</h1>}/>
      </Route>
      <Route path = "/" element={<Signup />}/>
      <Route path = "/signup" element={<Signup />}/>
      <Route path = "/login" element={<Login />}/>
    </Routes>
    
    </BrowserRouter>
    
    </div>
  );
}

export default App;
