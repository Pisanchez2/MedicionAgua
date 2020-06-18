import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert, Nav, Navbar, NavDropdown, FormControl } from 'react-bootstrap';
import Plot from 'react-plotly.js';

const GraphT = (props) =>{

    const{medi,fmed} = props;

    return (

        <div>
        <Plot
        data={[
          {
            x: fmed,
            y: medi,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
        layout={ {width: 780, height: 380, title: 'Mediciones Acumuladas', margin: {
            l: 60,
            r: 20,
            b: 60,
            t: 40,
            pad: 3
          },
          xaxis: {
            title: {
              text: 'Tiempo',
              font: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#7f7f7f'
              }
            },
          },yaxis: {
            title: {
              text: 'm3',
              font: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#7f7f7f'
              }
            }
          }} }
         />

        </div>
    );


}
 export  default GraphT;