import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
/*import "./Scard.css";*/


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            img: ""
        };
    }

    //render es un metodo que si debe retornar un html
    render() {

        //Metodo que retorna
        return (

            <div className="col-4">
                <div className="small-card-base" onClick={() => this.props.func(this.props.state, this.props.id)}>
                    <img className="small-card-profile-image" src={this.props.img}></img>

                    <div className="row align-items-end justify-content-center">
                        <div className="col-12 small-card-name">
                            <p>{this.props.name}</p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}