import React, {Component} from "react";
import "./Login.css";
import * as firebase from "firebase";

export default class Login extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            errorLogin: ""
        };
        this.email = React.createRef();
        this.password = React.createRef();
    }

    handleSubmit = event => {
        console.log("shupalaaa");
        var me = this;
        console.log(me.state.email);
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(function(firebaseUser) {
            console.log("Exito", firebaseUser);
            me.props.history.push("/home");
          })
          .catch(function(error) {
            var errorMessage = error.message;
            me.setState({errorLogin: errorMessage});
            console.log("Error", errorMessage);
          });
      };


      handleChange = event => {
        console.log(this.state.password + "----" + this.state.email);
          this.setState({ email: this.email.current.value });
          this.setState({ password: this.password.current.value});
    };
    
    /*handleSubmit = event =>{
        var me = this;
        me.props.history.push('/Home');
    }*/

    //render es un metodo que si debe retornar un html
    render(){
        //Metodo que retorna
        return(
            <div id="Login-section"> 

                <span id="Form-title"> Login </span>

                <form id="Form-section" onSubmit={this.handleSubmit}>
                    <div id="Login-username">
                        <input type="text" placeholder="Username" id="username" ref={this.email} value={this.props.email} onChange={this.handleChange}  required/>
                    </div>

                    <div id="Login-password">
                        <input type="password" placeholder="Password" ref={this.password} value={this.props.password} onChange={this.handleChange} required/>
                        <a href="" id="Forgot-help">{this.state.errorLogin}</a>
                    </div>

                    <input type="submit" className="button button-block" value="Login"/>
                </form>
                
                <a href="" id="Forgot-help">Forgot Username/Password?</a>
                

            </div>
        );
    }
}