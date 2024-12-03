import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Authentication from "./components/Authentication";
import User from "./components/Users";
import NoPage from "./components/Nopage";
import reportWebVitals from './reportWebVitals';
import EditUser from './components/EditUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />}>
          </Route>
          <Route path="/Users" element={<User />}>
          </Route>
          <Route path="/profile" element={<EditUser />}>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
