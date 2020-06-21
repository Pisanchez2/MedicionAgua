import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert, Nav, Navbar, NavDropdown, FormControl } from 'react-bootstrap';
import Plot from 'react-plotly.js';

const GraphT = (props) =>{

    const{medi,fmed} = props;

    var lgmedi = medi.length;

    return (

        <div>
        <Plot
        data={[
          {
            x: fmed,
            y: medi,
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
            range: [(medi[1]-medi[1]*0.05) , (medi[lgmedi-1]+medi[lgmedi-1]*0.02) ],
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