 //Index con rutas protegidas

 import React from 'react';
 import ReactDOM from 'react-dom';
 import { Route, BrowserRouter, Switch } from 'react-router-dom';
 import './index.css';
 import App from './Pages/App';
 import Home from './Pages/Home';
 import PDFactura from './Facturas/PDFactura'
 import ProtectedRoute from './Components/ProtectedRoute';
 import * as serviceWorker from './serviceWorker';
  
 ReactDOM.render((
     <BrowserRouter>
          <Switch>
              <Route exact path="/" component={App} />
              <ProtectedRoute path="/Home" component={Home} />
             <ProtectedRoute path="/Factura" component={PDFactura} />
             <ProtectedRoute component={Home} />
          </Switch>
     </BrowserRouter>
  ), document.getElementById('root'));
 
 // If you want your app to work offline and load faster, you can change
 // unregister() to register() below. Note this comes with some pitfalls.
 // Learn more about service workers: https://bit.ly/CRA-PWA
 serviceWorker.unregister();

/*
//Index con permiso para todo

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Pages/App';
import Home from './Pages/Home';
import Login from './Pages/Login';
import * as serviceWorker from './serviceWorker';

import { Route, Link, BrowserRouter as Router ,Redirect} from 'react-router-dom'
import PDFactura from './Facturas/PDFactura'


const routing =(

  <Router>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/Login" component={Login} />
    <Route path="/Home" component={Home} />
    <Route path="/Factura" component={PDFactura} />
  </div>
</Router>
  
  
  )
  
  ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

*/


/*  //Index Normal
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Pages/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
