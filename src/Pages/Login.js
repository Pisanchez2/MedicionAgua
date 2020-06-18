import React, { Component } from 'react';
import fire from '../config/Fire';
import logo from '../Assets/Images/LogoCutuglagua.png';
import logo2 from '../Assets/Images/LogoBSRJA.png';
import '../Components/StyleComp.css';
import './Login.css';

class Login extends Component {
    constructor(props) {
      super(props);
      this.login = this.login.bind(this);
      this.handleChange = this.handleChange.bind(this);
      //this.signup = this.signup.bind(this);
      this.state = {
        email: '',
        password: ''
      };
    }
  
    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }
  
    login(e) {
      e.preventDefault();
      fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).catch((error) => {
          console.log(error);
        });
    }
  
   /* signup(e){
      e.preventDefault();
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      }).then((u)=>{console.log(u)})
      .catch((error) => {
          console.log(error);
        })
    }*/
    render() {
      return (
          
        <div className="col-md-6"
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            textAlign: "center",
            marginTop: "9% ",
            
            
          }}
        >
       
          <form>
           <div>
           <img src={logo} className="App-logo" alt="logo" />
           </div>    

           <img src={logo2} className="photo" alt="logo2" />
            <div class="form-group" >
              <label className="uspass">Correo Electrónico</label>
              <input  value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" class="form-text text-muted"> </small>
            </div>
            <div class="form-group">
              <label className="uspass">Contraseña</label>
              <input  value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
            
          </form>
        
        </div>
       
      );
    }
  }
  export default Login;

  //<button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>