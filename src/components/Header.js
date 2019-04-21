import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./Header.css";


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: ""
        };
    }

    //render es un metodo que si debe retornar un html
    render() {

        //Metodo que retorna
        return (
            <div className="col-12" id="nav-top-bar">

                <div className="row justify-content-center">

                    <div className="w-100 create-space"></div>

                    <div className="col-1" id="home-search-container">
                        <img src="img/Logo.png" className="rounded float-left img-fluid" id="home-search-logo"></img>
                    </div>

                    <div className="col-8">
                        <img src="icons/search.png" id="search-bar-icon" className="img-fluid"></img>
                        <input type="text" id="search-bar" placeholder="Explorar.."></input>
                    </div>

                    <div className="col-3" id="home-profile">
                        <div className="row justify-content-start align-items-center">

                            <div className="col-lg-7 col-md-3 float-left align-self-center no-padding no-margin" id="home-profile-container">
                                <div className="float-right">
                                    <img src="img/Mes.jpg" className="float-left" id="home-profile-img"></img>
                                </div>

                            </div>

                            <div className="col-lg-5 col-md-8 text-right" id="home-profile-description">
                                <p className="font-weight-bold no-margin">{this.props.name}</p>
                                <p className="no-margin">{this.props.type}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}