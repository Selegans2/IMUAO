import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import Home from "../views/Home"
/*import "./Card.css";*/


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            code: "",
            phone: "",
            email: "",
            img: ""
        };
    }


    //render es un metodo que si debe retornar un html
    render() {

        //Metodo que retorna
        return (

            <div id="card-base">
                {/*<img id="card-profile-image" src={this.props.img}></img>*/}

                <div className="row align-items-end justify-content-center">
                    <div className="col-12" id="card-name">
                        <p>{this.props.name}</p>
                    </div>

                    <div className="col-12" id="card-contact">

                        <div className="row justify-content-end">
                            <div className="col-12">
                                <div className="card-contact-info"> <p>{this.props.code}</p> </div>
                            </div>

                            <div className="col-12">
                                <div className="card-contact-info"> <p>{this.props.phone}</p> </div>
                            </div>

                            <div className="col-12">
                                <div className="card-contact-info"> <p>{this.props.email}</p> </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-2 align-self-end" id="card-button-front">
                        <button className="no-button-style"  onClick={() => this.props.func(this.props.state, 2)}>
                            <div> <img src="icons/expand-button.png"></img></div>
                     </button>
                    </div>
                    
                </div>
            </div>

        );
    }
}