import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert, Nav, Navbar, NavDropdown, FormControl } from 'react-bootstrap';
import Plot from 'react-plotly.js';

const GraphM = (props) =>{

    const{vcon,fmed} = props;
    var na= vcon.toString().slice();
    var res = na.split(",");
    let maxvcon = Math.max.apply(Math,res);

    return (

        <div>
        <Plot
        data={[
          {
            x: fmed,
            y: vcon,
            type: 'bar',
            mode: 'lines+markers',
            textposition: 'auto',
            marker: {
              color: 'rgb(158,202,225)',
              opacity: 0.6,
              line: {
                color: 'rgb(8,48,107)',
                width: 1.5
              }
            }
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
            autorange: true,
            title: {
              text: 'Tiempo',
              font: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            range: [0 , (maxvcon+(maxvcon*0.2)) ],
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
 export  default GraphM;