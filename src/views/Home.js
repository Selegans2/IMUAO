import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./Home.css";
import firebase from 'firebase';
import { oyeme } from '../components/Skills';


//Componentes
import Header from '../components/Header';
import Scard from '../components/Scard';
import Card from '../components/Card';
import Portfolio from '../components/Portfolio';
import Skill from '../components/Skills';

//Variables y metodos Globales
var database = firebase.database();


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [], //Es el Json que va a llegar
            Skills: [],
            Works: [],
            keys: {},
            info: [],
            dataCount: "",

            hideMainInfo: false,
            hideSkills: true,
            hidePortfolio: true,
            hideCardOptions: true,

            currentUser: "",
            currentData: {
                code: "",
                email: "",
                lastname: "",
                name: "Selecciona una Card"
            }
        };
    }

    showInfo = event => {
        var me = this;
        me.props.history.push('/Home');
    }



    displayMainCard(e, number) {
        //Activa el objeto de main card       
        if (number == 1) {
            e.setState({ hideMainInfo: true });
            e.setState({ hideSkills: true });
            e.setState({ hidePortfolio: true });
            e.setState({ hideCardOptions: true });
        } else if (number == 2) {
            e.setState({ hideMainInfo: false });
            e.setState({ hidePortfolio: false });
            e.setState({ hideSkills: true });
        } else if (number == 3) {
            e.setState({ hideMainInfo: false });
            e.setState({ hidePortfolio: true });
            e.setState({ hideSkills: false });
        } else {
            e.setState({ hideCardOptions: false });
        }
    }



    componentDidMount() {
        var component = this;
        this.displayMainCard(this, 1);


        const data = firebase.database().ref("users").orderByKey();
        data.on("value", snapshot => {

            const tempData = {};
            const tempSkills = {};
            const tempWorks = {};
            const tempKeys = {};

            //Se hace un ciclo por todos los usuarios
            snapshot.forEach(function (childSnapshot) {

                //Quien es el papa del dato
                var key = childSnapshot.key;
                tempKeys[key] = key;
                component.setState({ keys: tempKeys });
                console.log("Key: " + key);



                //Los valores de los datos
                var childData = childSnapshot.val();
                console.log(childData);


                var childSkills = childSnapshot.child("skills/").val(); // "last"
                tempSkills[key] = childSkills;
                component.setState({ Skills: tempSkills });



                var childWorks = childSnapshot.child("portfolio/").val(); // "last"
                tempWorks[key] = childWorks;
                component.setState({ Works: tempWorks });


                //Se llena el arreglo con los datos
                tempData[key] = childData;
                var values = snapshot.val();
                component.setState({ data: tempData });
            });

            //Se cuenta la cantidad de datos
            //const count = Object.keys(values).length; //=> Metodo para contar la cantidad de un array
            const count = snapshot.numChildren();
            this.setState({ dataCount: count });
        });
    }


    
    selectCard(e, value) {
        e.setState({ currentUser: value });
        console.log("Card seleccionada: " + value);

        var ex = {};
        ex = (e.state.data && Object.keys(e.state.data).map((i) => {
            if (i === value) {
                return e.state.data[i];
            }
        }));

        e.setState({ currentData: ex[0] });
        console.log(e.state.currentData.name);
    }



    renderSmallCards() {
        //Se sacan las llaves de todos los usuarios, es decir, el identificador
        var worksKeys = [""];
        worksKeys = (this.state.keys && Object.keys(this.state.keys).map((i) => {
            return this.state.keys[i];
        }));

        var usersNames = [""];
        usersNames = (this.state.data && Object.keys(this.state.data).map((i) => {
            return this.state.data[i].name + " " + this.state.data[i].lastname;
        }));

        //Crea las tarjetas con el nombre de usuario
        const movieItems = [];
        for (var i = 0; i < 4; i++) {
            // Verifica que hayan los resultados necesarios
            if (this.state.dataCount > i) {
                movieItems.push(<Scard func={this.selectCard} state={this} name={usersNames[i]} id={worksKeys[i]} key={worksKeys[i]} />);
            }
        }
        return movieItems;
    }


    renderSkils() {
        var me = this;
        const movieItems = [];

        (this.state.Skills[this.state.currentUser] && Object.keys(this.state.Skills[this.state.currentUser]).map((i) => {
            return (movieItems.push(<Skill type={i} amount={this.state.Skills[this.state.currentUser][i]} key={i} />));
        }));

        return movieItems;
    }


    renderWorks() {
        var me = this;
        var worksKeys = [];
        const movieItems = [];


        worksKeys = (this.state.Works[this.state.currentUser] && Object.keys(this.state.Works[this.state.currentUser]).map((i) => {
            return this.state.Works[this.state.currentUser][i];
        }));

        (worksKeys && Object.keys(worksKeys).map((i) => {
            return (movieItems.push(<Portfolio func={this.openWork} state={this} name={worksKeys[i].name} type={worksKeys[i].type} url={worksKeys[i].url} key={i} />));
        }));

        return movieItems;
    }
    

    openWork(url) {
        var win = window.open(url, '_blank');
        win.focus();
      }



    //render es un metodo que si debe retornar un html
    render() {

        const MainCardstyle = this.state.hideMainInfo ? {} : { display: 'none' };
        const PortfolioCardstyle = this.state.hideSkills ? {} : { display: 'none' };
        const SkillsCardstyle = this.state.hidePortfolio ? {} : { display: 'none' };
        const CardOptionsStyle = this.state.hideCardOptions ? {} : { display: 'none' };

        //console.log(this.state.data['12345678'].code);

        //Metodo que retorna
        return (
            <div className="container-fluid">

                <div className="row justify-content-center">

                    {/* Componente Header */}
                    <Header name={"Miguel A. Mejia"} type={"2146050"} />
                    <div className="col-12" id="total-search">  <p>Se encontraron {this.state.dataCount} resultado(s).</p>  </div>

                    {/* <------- Component Big Card ---------->*/}
                    <div className="w-100"></div>
                    <div className="col-lg-3 col-md-5">



                        <div id="card-base">

                            <div className="no-margin no-padding" style={MainCardstyle}>
                                <Card func={this.displayMainCard} state={this} name={this.state.currentData.name + " " + this.state.currentData.lastname} code={this.state.currentData.code} phone={this.state.currentData.phone} email={this.state.currentData.email} img="img/Me.jpg" />
                            </div>

                            <img id="card-profile-image" src="img/Mes.jpg"></img>


                            <div className="row align-items-end justify-content-center" style={CardOptionsStyle}>

                                <div className="col-12 float-left" id="card-info-back">
                                    <button type="button" className="no-button-style" onClick={() => this.displayMainCard(this, 1)}>
                                        <div> <img src="icons/left-arrow.png"></img></div>
                                    </button>
                                </div>
                                <div className="col-12" id="card-info-name">
                                    <p>{this.state.currentData.name + " " + this.state.currentData.lastname}</p>
                                    <p id="card-info-job"> Game Designer </p>
                                </div>
                                <div className="col-12" id="card-options">
                                    <div className="row justify-content-around align-items-center text-center">
                                        <div className="col-6 text-center">
                                            <button type="button" onClick={() => this.displayMainCard(this, 2)} className="card-options-buttons" id="card-option-skills">Habilidades</button>
                                        </div>

                                        <div className="col-6 text-center">
                                            <button type="button" onClick={() => this.displayMainCard(this, 3)} className="card-options-buttons" id="card-option-portfolio">Portafolio</button>
                                        </div>
                                    </div>
                                </div>


                                {/* <------------------------------ All Works ----------------------------->*/}
                                <div className="col-12" id="card-portfolio" style={SkillsCardstyle}>
                                    <div className="row justify-content-center align-items-center text-center">

                                        <div className="col-12 text-left font-weight-bolder">
                                            <p>Portafolio</p>
                                        </div>

                                        <div className="col-12">
                                            <div className="row justify-content-start align-items-center">

                                                {/*<Portfolio name="Knee Socks" type="UI/UX" />
                                                <Portfolio name="Knee Socks" type="UI/UX" />
                                                <Portfolio name="Knee Socks" type="UI/UX" />*/}

                                                {this.renderWorks()}
                                            </div>
                                        </div>


                                        <div className="w-100"></div>
                                        <div className="col-9 text-center font-italic no-margin">
                                            <a href="">Ver mas trabajos</a>
                                        </div>

                                    </div>
                                </div>
                                {/* <------------------------------ All Works ----------------------------->*/}


                                {/* <------------------------------ All Skills ----------------------------->*/}
                                <div className="col-12" id="card-skills" style={PortfolioCardstyle}>
                                    <div className="row justify-content-center align-items-center text-center">

                                        <div className="col-12 text-left font-weight-bolder">
                                            <p>Habilidades</p>
                                        </div>

                                        <div className="col-12">
                                            <div className="row justify-content-start align-items-center">

                                                {/*<Skill type="Python" amount='10' />
                                                <Skill type="Unity" amount='30' />
                                                <Skill type="Oppaimon" amount='90' />*/}
                                                {this.renderSkils()}

                                            </div>
                                        </div>


                                        <div className="w-100"></div>
                                        <div className="col-10 text-center font-italic card-skill-phrase">
                                            <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.."</p>
                                        </div>

                                    </div>
                                </div>
                                {/* <------------------------------ All Skills ----------------------------->*/}

                            </div>
                        </div>



                    </div>



                    {/* <------- Component Small Cards ---------->*/}
                    <div className="col-lg-9 col-md-7">
                        <div className="row justify-content-left">

                            {this.renderSmallCards()}

                        </div>
                    </div>





                </div>
            </div>
        );
    }
}
