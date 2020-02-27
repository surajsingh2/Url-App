import React from "react";

import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Login to Use this App</h1>
    
    <Link to={'/app'} >APP</Link>

    <p className="lead">
      This Application Shorten Url's
    </p>
  </div>
);

export default Hero;
