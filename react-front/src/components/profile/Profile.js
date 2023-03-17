import "./Profile.css";
import c from "../../const.json";
import Navbar from "../home/navbar/Navbar.js";
import UploadImages from "./UploadImages.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from "react";
import axios from "axios";




//https://reactstrap.github.io/?path=/docs/components-navbar--props
export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this._parent = this.props._parent;
    this.pwdRef = React.createRef("pwdRef");
    this.confirmPwdRef = React.createRef("confirmPwdRef");
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.state = {
      edit: false,
      showConfirmPwd: false,
      redirect: false,
      isLoading: false,
      classNameAlert:"",
      msg: "",

      id: this.userData.id_usuario,
      img: this.userData.img,
      name: this.userData.nombre,
      lastName: this.userData.apellido,
      email: this.userData.email,
      pwd: "default",
      confirmPwd: "default",
      lastTime:this.userData.ultima_vez,
      
    };
    
  }
  

  handlerBtnEdit = ()=>{
    this.setState({
      edit : !this.state.edit,
      showConfirmPwd : false,
      pwd: "default",
      confirmPwd: "default",
    })
    this.pwdRef.current.style = null;
    this.confirmPwdRef.current.style = null;
    this.setState({ msg: ""});
  }

  verifyPassword = ()=>{
    if (this.state.pwd !== this.state.confirmPwd){
      this.pwdRef.current.style.border = '1px solid red';
      this.confirmPwdRef.current.style.border =  '1px solid red';
      this.setState({ 
        classNameAlert: "alert alert-danger mt-1",
        msg: "Passwords do not match",
      });
      return false;
    }else{
      this.pwdRef.current.style = null;
      this.confirmPwdRef.current.style = null;
      this.setState({ msg: ""});
    }
    return true;
  }

  showConfirmPwd = () => {
    if(!this.state.showConfirmPwd){
      this.setState({
        showConfirmPwd : true,
        pwd: "",
        confirmPwd: "",
      });
    }
  }
  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
  };

  onSubmitHandler = (e) => {
    this.setState({ msg: ""});
    if(!this.verifyPassword())
        return;

    e.preventDefault();
    this.setState({ isLoading: true });
    this._parent.showLoading();

    axios.put(c.baseUrlApi+"profile-update/", this.state)
      .then((response) => {
        //  console.log(response);
        this._parent.hideLoading();

        this.setState({ 
          classNameAlert: 
                        response.data.status==="success"? "alert alert-success mt-1":"alert alert-danger mt-1",
          msg: response.data.message,
          isLoading: false
        });

        localStorage.setItem("userData", JSON.stringify(response.data.data));

      }).catch((error) => {
        //  console.log(error);
        this._parent.hideLoading();
        this.setState({ isLoading: false, msg: error.message});
      });
  };

  
  render() {
    const user = this.state.data;
    var classNameInput = this.state.edit ? 'input-profile bordered' : 'input-profile';
    var DisabledInput = this.state.edit ? false : true;
    var HideComponents = this.state.edit ? false : true;
    var HideConfirmPwd = this.state.edit&&this.state.showConfirmPwd ? false : true;

    const {
      msg,
      classNameAlert,
    } = this.state;

   
    
    return (

      <>
        <Navbar />
        <div className="body-container">
          <section className="vh-100-80px">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-lg-8 mb-4 mb-lg-0">
                  <div className="card mb-3" style={{"borderRadius": "1rem","border": "none"}}>
                    <div className="row g-0">
                      <div className="col-md-4 gradient-custom text-center mytext-light rounded-l">
                        <UploadImages data={this.state}/>
                        <h5>{this.state.name}</h5>
                        <p>{this.state.lastName}</p>
                        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerBtnEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                      </div>
                      <div className="col-md-8 bg-color rounded-r">
                        <div className="card-body p-4  mytext-dark">
                          <div className="row-info">
                              <h5 className="">Informacion de sesion</h5>
                              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={()=>this.handlerBtnEdit()} style={{"cursor": "hand","fontSize": "25px"}}/>
                          </div>
                          <hr className="mt-0 mb-4"/>
                          <div className="row pt-1" hidden={HideComponents}>
                            <div className="col-md-6 mb-3">
                              <h6>Name</h6>
                              <input className={classNameInput} name="name" value={this.state.name} onChange={this.onChangehandler} disabled={DisabledInput}/>
                            </div>
                            <div className="col-md-6 mb-3" >
                              <h6>Last Name</h6>
                              <input className={classNameInput} name="lastName" value={this.state.lastName} onChange={this.onChangehandler} disabled={DisabledInput}/>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Email</h6>
                              <input className={classNameInput} name="email" value={this.state.email} onChange={this.onChangehandler} disabled={DisabledInput}/>
                            </div>
                            <div className="col-md-6 mb-3">
                              <h6>Ultima vez</h6>
                              <input className={classNameInput} name="lastTime" value={this.state.lastTime} onChange={this.onChangehandler} disabled/>
                            </div>
                          </div>
                          <div className="row pt-1">
                            <div className="col-md-6 mb-3">
                              <h6>Contraseña</h6>
                              <input ref={this.pwdRef} type="password" className={classNameInput} name="pwd" value={this.state.pwd} onChange={this.onChangehandler} disabled={DisabledInput} 
                              onKeyUp={()=>this.verifyPassword()} 
                              onClick={()=>this.showConfirmPwd()}
                              />
                            </div>
                            <div className="col-md-6 mb-3" hidden={HideConfirmPwd}>
                              <h6>Confirmar Contraseña</h6>
                              <input ref={this.confirmPwdRef} type="password" className={classNameInput} name="confirmPwd" value={this.state.confirmPwd} onChange={this.onChangehandler} disabled={DisabledInput}
                              onKeyUp={()=>this.verifyPassword()} 
                              />
                            </div>
                          </div>
                          <button className="text-center btn btn-profile w-100" onClick={this.onSubmitHandler} hidden={HideComponents}>Guardar</button>
                          {msg && (
                              <div className={classNameAlert} role="alert">
                              {msg}
                              </div> 
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
    
    
  }
}