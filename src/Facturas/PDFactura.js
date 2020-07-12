import React, { Component } from 'react';
import fire from '../config/Fire';
import firebase from 'firebase';
import { Row, Col, Form, Button, Alert, Nav, Navbar, NavDropdown, FormControl } from 'react-bootstrap';
import logo2 from '../Assets/Images/LogoBSRJA.png';
import '../Components/StyleComp.css';
import GetPDF from './GetPDF'
import { PDFViewer } from '@react-pdf/renderer';
import moment from 'moment';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'


class PDFactura extends Component {
    constructor(props) {
        super(props);
        this.miaref = React.createRef();
        // this.logout = this.logout.bind(this);
        this.numsocio = null;
        this.mesbuscar = null; //para buscar facturas
        this.aniobuscar = null;// para buscar facturas
        this.mesbuscaranterior = null; //para buscar facturas
        this.aniobuscaranterior = null;// para buscar facturas
        this.permbus = true; //para habilitar el boton de buscar    
        this.vvconsumido = null;
       
        this.state = {
            numsocio: null,
            socio: null,
            lt: null,
            mz: null,
            ced: null,
            n_habitantes: null,
            mensaje: null,
            valanterior: null,
            valactual: null,
            valconsumido: null,
            date: '', // para la factura pdf
            mes: '', //para la factura pdf 
            data: null,
            valcostoagua: null,
            valrecaudacion: null,
            valalcantarillado: null,
            valtotal: null,

        };

    }

    logout() {
        fire.auth().signOut();
        localStorage.clear();
    }

    render() {


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
                {this.state.mensaje === null ? <div> </div> : <Alert variant={this.state.status}>
                    {this.state.mensaje}
                </Alert>}
                <div className="inputtres">
                    <Form >
                        <Form.Group as={Row} >
                            <Form.Label column sm="2">
                                Numero de Socio:
                                </Form.Label>
                            <Col sm="2">
                                <Form.Control type="input" placeholder="Ingrese Num. Socio" name="numsocio" ref={this.miaref} onChange={(e) => { this.habilitar(); }} />
                            </Col>
                            <Form.Label column sm="1">
                                Año:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control as="select" id="OpcionAnio" defaultValue="2020" onChange={(e) => { this.habilitar(); }}>
                                    <option>2019</option>
                                    <option>2020</option>
                                </Form.Control>
                            </Col>
                            <Form.Label column sm="1">
                                Mes:
                            </Form.Label>
                            <Col sm="2">
                                <Form.Control as="select" defaultValue="0" id="OpcionMes" onChange={(e) => { this.habilitar(); }}>
                                    <option value="0" disabled >Selec. Mes</option>
                                    <option value="1">Enero</option>
                                    <option value="2">Febrero</option>
                                    <option value="3">Marzo</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Mayo</option>
                                    <option value="6">Junio</option>
                                    <option value="7">Julio</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Septiembre</option>
                                    <option value="10">Octubre</option>
                                    <option value="11">Noviembre</option>
                                    <option value="12">Diciembre</option>

                                </Form.Control>
                            </Col>

                            <Col sm="1.5">
                                <Button variant="secondary" onClick={(e) => { this.clicked(); }} disabled={this.permbus}>
                                    Buscar</Button>
                            </Col>

                        </Form.Group>
                    </Form>
                </div>

                <PDFViewer className="pdf">
                    <GetPDF numsocio={this.numsocio} socio={this.state.socio} date={this.state.date}
                        mz={this.state.mz} lt={this.state.lt} ced={this.state.ced} mes={this.state.mes} valactual={this.state.valactual}
                        valanterior={this.state.valanterior} valconsumido={this.state.valconsumido}
                        valcostoagua={this.state.valcostoagua} valalcantarillado={this.state.valalcantarillado} valrecaudacion={this.state.valrecaudacion}
                        valtotal= {this.state.valtotal} />
                </PDFViewer>

            </div>

        );
    }

    //Obtener anio y mes para buscar la factura correspondiente

    async habilitar() {
        var m = document.getElementById("OpcionMes");
        var mesbuscar = m.options[m.selectedIndex].value;
        if (mesbuscar === 0 || this.miaref.current.value === null || this.miaref.current.value === "") {
            this.permbus = true;
        } else {
            this.permbus = false;
        }
        this.obtdate();
    }

    async mesanio() {
        var m = document.getElementById("OpcionMes");
        var mesbuscar = m.options[m.selectedIndex].value;
        var a = document.getElementById("OpcionAnio");
        var aniobuscar = a.options[a.selectedIndex].text;
        this.aniobuscar = aniobuscar;
        this.mesbuscar = mesbuscar;
    }

    //obtener fecha

    obtdate() {
        var date2 = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var date = date2.toLocaleDateString("es-ES", options)
        this.setState({ date});
    }

    clicked() {
        this.numsocio = this.miaref.current.value;
        this.mesanio();
        this.consulta();
    }

    async consulta() {

        const mesi = new Date(Date.UTC(this.aniobuscar, this.mesbuscar - 1, 20, 3, 0, 0)); // fecha para la descripcion de la factura
        const options2 = { year: 'numeric', month: 'long' }
        var mes = mesi.toLocaleDateString("es-ES", options2)
        this.setState({ mes });

        const reffp = firebase.database().ref().child('Socio')
        reffp.on('value', (snapshot) => {
           
            if(snapshot.hasChild("" + this.numsocio + "")){
                this.setState({ mensaje: "Socio Existe" , status: "success"})
                this.setState({
                    socio: snapshot.child("" + this.numsocio + "").child('nombre').val(),
                    lt: snapshot.child("" + this.numsocio + "").child('lt').val(),
                    mz: snapshot.child("" + this.numsocio + "").child('mz').val(),
                    ced: snapshot.child("" + this.numsocio + "").child('cedula').val(),
                })
            }else{
                this.setState({ mensaje: "Socio NO Existe" , status: 'danger'})
            }

        })  

        //Obtener medicion actual y anterior

        const reffvac = firebase.database().ref().child('Medidas').child("" + this.numsocio + "").child('Mediciones').child("" + this.aniobuscar + "").child("" + this.mesbuscar + "").child("medicion")
        reffvac.on('value', (snapshot) => {
            this.setState({
                valactual: snapshot.val()
            })
        })

        if (this.mesbuscar === 1) {
            this.mesbuscaranterior = 12;
            this.aniobuscaranterior = this.aniobuscar - 1;
        }

        else {
            this.aniobuscaranterior = this.aniobuscar;
            this.mesbuscaranterior = this.mesbuscar - 1;
        }

        const reffvant = firebase.database().ref().child('Medidas').child("" + this.numsocio + "").child('Mediciones').child("" + this.aniobuscaranterior + "").child("" + this.mesbuscaranterior + "").child("medicion")
        reffvant.on('value', (snapshot) => {
            this.setState({
                valanterior: snapshot.val()
            })
        })

        const reffnh = firebase.database().ref().child('Socio').child("" + this.numsocio + "").child('n_habitantes')
        reffnh.on('value', (snapshot) => {
            this.setState({
                n_habitantes: snapshot.val()
            })
        })

        //Obtener valor consumido

        const reffvconsumido = firebase.database().ref().child('Consumo').child("" + this.numsocio + "").child("Valores").child("" + this.aniobuscar + "").child("" + this.mesbuscar + "").child("Consumido_m3")
        reffvconsumido.on('value', (snapshot) => {
            this.setState({
                valconsumido: snapshot.val()
            })
            this.vvconsumido = snapshot.val()

            //Obtener valores de tabla de consumo

            const reffcostoagua = firebase.database().ref().child('Costos').child("" + this.vvconsumido + "")
            reffcostoagua.on('value', (snapshot) => {
                this.setState({
                    valcostoagua: snapshot.child("costoagua").val().toFixed(2),
                    valalcantarillado: snapshot.child("alcantarillado").val().toFixed(2),
                    valrecaudacion: snapshot.child("recaudacion").val().toFixed(2),
                    valtotal: snapshot.child("total").val().toFixed(2)
                })
            })

        })



    }


}

export default PDFactura;