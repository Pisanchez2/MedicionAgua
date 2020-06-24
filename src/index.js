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