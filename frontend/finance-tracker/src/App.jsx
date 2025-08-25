import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
}from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/userContext";
import {Toaster} from 'react-hot-toast';
const App=()=>{
  return (
    <UserProvider>
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />

        </Routes>
      </Router>
    </div>

    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize:'13px'
      },
    }}/>

    

    </UserProvider>
  )
}
const Root=()=>{
  //Check if token exists in localStorage
  const isAuthenticated=!!localStorage.getItem('token');

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}

export default App;

/*NOTES:*/

/*
<Router> (aliased from BrowserRouter) wraps your app and enables client-side routing using the browser’s history API.
<Routes> is a container for all your route definitions.
<Route path="/" element={<Root />} /> defines a route: when the URL path is exactly /, the Root component will be rendered.
The entire routing setup is wrapped in a <div> for layout or styling purposes.
*/

/*Double eclamation marks (!!) are used to convert a value to a boolean:
"foo"      // Evaluates to "foo".
!"foo"     // Evaluates to false.
!!"foo"    // Evaluates to true.
*/

// | Component       | Purpose                                                       |
// | --------------- | ------------------------------------------------------------- |
// | BrowserRouter | Wraps your entire app to enable routing using browser history   |
// | Routes        | Wraps all your <Route> components                               |
// | Route         | Defines a single route (path + component)                       |
// | Navigate      | Redirects to another route programmatically or conditionally    |