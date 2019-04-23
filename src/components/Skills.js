import React, { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import "./Skills.css";


export default class Skills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "",
            amount: this.props.amount
        };
    }

    static setBarValue(){
    }


    render() {
        const style = {width: this.state.amount + '%'};

        //Metodo que retorna
        return (
            <div className="col-12 card-skill-container">
            <div className="row justify-content-start align-items-center">

                <div className="col-4 align-self-center"> <p>{this.props.type}</p> </div>

                <div className="col-8 align-self-center">
                    <div className="card-skill-meter">
                        <div className="meter" style={style}></div>
                    </div>
                </div>

            </div>
        </div>
        );
    }
}


