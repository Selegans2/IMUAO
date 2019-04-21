import React, { Component } from 'react';
import './App.css';
import Loadable from "react-loadable";
import * as firebase from 'firebase'; 
//Lo que hace es que permite definir al App.js cuales son las rutas por donde se va a mover el usuario
import {HashRouter, Route, Switch} from "react-router-dom";


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDX3XfOXAfEbLOyXY-khxYBlcMD3996XE0",
  authDomain: "imuao-administrador.firebaseapp.com",
  databaseURL: "https://imuao-administrador.firebaseio.com",
  projectId: "imuao-administrador",
  storageBucket: "imuao-administrador.appspot.com",
  messagingSenderId: "1000065554199"
};
firebase.initializeApp(config);
//export default firebase;


const loading = () => <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;

//Se definene las paginas
const Login = Loadable({
  loader: () => import('./views/Login'),
  loading
});

const Home = Loadable({
  loader: () => import('./views/Home'),
  loading
});







class App extends Component {

  //Primero se defininen cuales son nuestras rutas
  render() {
    return (

      //Aqui existen las rutas para poder moverme
      <HashRouter>
        <Switch>
          <Route exact path="/Login" name="Login - IMUAO" component={Login}/> 
          <Route exact path="/Home" name="Home Page" component={Home}/>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
