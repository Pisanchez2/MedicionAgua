import React, { Component } from 'react';
import fire from '../config/Fire';
import firebase from 'firebase';
import Login from './Login';
import { Row, Col, Form, Button, Alert, Nav, Navbar, NavDropdown, FormControl } from 'react-bootstrap';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'

import Plot from 'react-plotly.js';
import logo2 from '../Assets/Images/LogoBSRJA.png';
import GraphT from '../Components/Graficas/GraphT';
import GraphM from '../Components/Graficas/GraphM';
import '../Components/StyleComp.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.miaref = React.createRef();
        this.refnom = React.createRef();
        this.refced = React.createRef();
        this.refmz = React.createRef();
        this.reflt = React.createRef();
        this.refnh = React.createRef();
        this.refgrap = React.createRef();
        this.logout = this.logout.bind(this);
        this.numsocio = null;
        this.state = { value: '' };
        this.onChange = this.onChange.bind(this);

        this.state = {
            numsocio: null,
            socio: null,
            lt: null,
            mz: null,
            ced: null,
            n_habitantes: null,
            mensaje: null,
            data: null,
            datacon: null
        };

    }

    logout() {
        fire.auth().signOut();
        localStorage.clear(); 
    }
    _update_nombre = (e) => {
        this.setState({ socio: e.target.value })
    }
    _update_cedula = (e) => {
        this.setState({ ced: e.target.value })
    }
    _update_mz = (e) => {
        this.setState({ mz: e.target.value })
    }
    _update_lt = (e) => {
        this.setState({ lt: e.target.value })
    }
    _update_n_habitantes = (e) => {
        this.setState({ n_habitantes: e.target.value })
    }

    render() {

        //OBTENER MEDICIONES

        if (this.state.data === null || this.state.datacon === null) {
            var medi = 0;
            var fmed = 0;
            var vcon = 0;
        } else {
            var medi = this.state.data.map((val, i) => {
                return val.medicion
            })

            var fmed = this.state.data.map((val, i) => {
                return val.fecha_Medicion
            })

            var vcon = this.state.datacon.map((val, i) => {
                return val.Consumido_m3
            })
        }

        return (
            <div>
                <Navbar bg="primary" variant="dark" expand="lg">
                    <Navbar.Brand href="/Home"><img
                        src={logo2}
                        width="140"
                        height="60"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/Home">Inicio</Nav.Link>
                            <Nav.Link href="/Factura">Factura</Nav.Link>
                        </Nav>
                        <Link to="/">                        
                        <Button onClick={this.logout} variant="outline-info">  Salir </Button>
                        </Link>
                    </Navbar.Collapse>
                </Navbar>

                {this.state.mensaje === null ? <div> </div> : <Alert variant="success">
                    {this.state.mensaje}
                </Alert>}

                <div className="inputdos">
                    <div >
                        <Form >
                            <Form.Group as={Row} controlId="IngresoSocio">
                                <Form.Label column sm="3">
                                    Numero de Socio:
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Control value={this.state.value} onChange={this.onChange} type="input" placeholder="Ingrese Num. Socio" name="numsocio" ref={this.miaref} />
                                </Col>
                                <Col sm="1.5">
                                    <Button disabled={!this.state.value} variant="secondary" onClick={(e) => { this.clicked(); }}>
                                        Buscar</Button>
                                </Col>
                                <Col sm="1">
                                    <Button disabled={!this.state.value} class="btnact"><i class="fa fa-save" onClick={(e) => { this.changeText(); }}></i></Button>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="IngresoNombreSocio">
                                <Form.Label column sm="3">
                                    Nombre:
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control disabled={!this.state.value} type="input" onChange={this._update_nombre} value={this.state.socio} ref={this.refnom} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="IngresoCedulaSocio">
                                <Form.Label column sm="3">
                                    Cedula:
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Control disabled={!this.state.value} type="input" onChange={this._update_cedula} value={this.state.ced} ref={this.refced} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="IngresoMz">
                                <Form.Label column sm="3">
                                    Mz:
                                </Form.Label>

                                <Col sm="6">
                                    <Form.Control disabled={!this.state.value} type="input" onChange={this._update_mz} value={this.state.mz} ref={this.refmz} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="IngresoLt">
                                <Form.Label column sm="3">
                                    Lt:
                                </Form.Label>

                                <Col sm="6">
                                    <Form.Control disabled={!this.state.value} type="input" onChange={this._update_lt} value={this.state.lt} ref={this.reflt} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="Ingreson_habitantes">
                                <Form.Label column sm="3">
                                    No. Habitantes:
                                </Form.Label>

                                <Col sm="6">
                                    <Form.Control disabled={!this.state.value} type="input" onChange={this._update_n_habitantes} value={this.state.n_habitantes} ref={this.refnh} />
                                </Col>
                            </Form.Group>
                        </Form>

                    </div>
                </div>

                <div className="grafica" ref={this.refgrap}>


                    <GraphT medi={medi} fmed={fmed} />
                    <GraphM vcon={vcon} fmed={fmed} />

                </div>

            </div>
        );

    }

    //Funcion para actualizar el usuario
    changeText() {

        const reff1 = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child("nombre")
        reff1.set(this.refnom.current.value);

        const reff2 = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child("cedula")
        reff2.set(this.refced.current.value);

        const reff3 = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child("mz")
        reff3.set(this.refmz.current.value);

        const reff4 = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child("lt")
        reff4.set(this.reflt.current.value);

        const reff5 = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child("n_habitantes")
        reff5.set(this.refnh.current.value);

        this.setState({ mensaje: "Socio Actualizado" })
    }

    //Funciones para consultar la informacion del usuario (clicked, consulta, obtdata)
    clicked() {
        this.numsocio = this.miaref.current.value;
        this.consulta()
        this.obtdata()
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    async consulta() {
        const reffnom = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child('nombre')
        reffnom.on('value', (snapshot) => {
            this.setState({
                socio: snapshot.val()
            })
            console.log("NOMBRE SOCIO ", this.state.socio)
        })

        const refflt = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child('lt')
        refflt.on('value', (snapshot) => {
            this.setState({
                lt: snapshot.val()
            })
        })

        const reffmz = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child('mz')
        reffmz.on('value', (snapshot) => {
            this.setState({
                mz: snapshot.val()
            })
        })

        const reffced = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child('cedula')
        reffced.on('value', (snapshot) => {
            this.setState({
                ced: snapshot.val()
            })
        })

        const reffnh = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child('n_habitantes')
        reffnh.on('value', (snapshot) => {
            this.setState({
                n_habitantes: snapshot.val()
            })
        })

    }

    // obtener la data de la base de datos para plotear las mediciones.

    async obtdata() {

        const reffobtmed = firebase.database().ref().child('Medidas').child("" + this.numsocio + "").child("Mediciones").child("2020")
        const reffobtcon = firebase.database().ref().child('Consumo').child("" + this.numsocio + "").child('Valores').child("2020")

        reffobtmed.on('value', (snapshot) => {
            this.setState({
                data: snapshot.val()
            })
            console.log("DATA ", this.state.data)
        })

        reffobtcon.on('value', (snapshot) => {
            this.setState({
                datacon: snapshot.val()
            })
        })
    }


}

export default Home;

