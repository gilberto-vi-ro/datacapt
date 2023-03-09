import React, { Component } from "react";
import { Button } from "reactstrap";
import { Navigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar/Navbar.js";

//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      data: JSON.parse(localStorage.getItem("userData")),
      errMsg:"",
    };
  }

  
  render() {
    const user = this.state.data;
    
    return (

      <>
        <Navbar />
        <div className="body-container">
              Hola home
        </div>
      </>
    );
    
    
  }
}