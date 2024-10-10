

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Body/login/Login';
import {Register} from './components/Body/register/Register'; 
import { Body } from "./components/Body/Body";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/tasks" element={<Body />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

