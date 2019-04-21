import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
/*import "./Card.css";*/


export default class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            img: ""
        };
    }

    render() {

        //Metodo que retorna
        return (
            <div className="col-4 work" onClick={() => this.props.func(this.props.url)}>
                <div className="row justify-content-center align-items-center no-margin">
                    <div className="col-12 align-self-center text-center no-padding">
                        <div className="card-portoflio-image">
                            <img src="img/uao.png"></img>
                        </div>
                    </div>

                    <div className="col-12 align-self-center text-left no-padding card-portfolio-info">
                        <p className="font-weight-bolder">{this.props.name}</p>
                        <p>{this.props.type}</p>
                    </div>
                </div>
            </div>
        );
    }
}
