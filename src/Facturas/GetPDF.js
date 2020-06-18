import logo2 from '../Assets/Images/LogoPDF.png';
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font  } from '@react-pdf/renderer';

import { Table, TableHeader , TableCell, TableBody,DataTableCell} from '@david.kucsai/react-pdf-table'

const GetPDF = (props) => {

    const { numsocio, socio, date, mz, lt, ced ,mes, valconsumido, valcostoagua ,valrecaudacion , valalcantarillado, valtotal , valanterior, valactual} = props;

    return (

        <Document>
            <Page style={styles.body}>

                <Image style={styles.image} src={logo2} />
                <Text style={styles.header} fixed>
                    JUNTA ADMINISTRADORA DE AGUA POTABLE Y SANEAMIENTO
        </Text>
                <Text style={styles.header} fixed>
                    BARRIO DR. SANTIAGO ROLDOS AGUILERA
        </Text>
                <Text style={styles.header} fixed>
                    Resolucion No.SENAGUA.29-2016 - 2017/02/20
        </Text>
                <Text style={styles.header}>
                    Dir. Panamericana Sur Km.0                                     COMPROBANTE DE PAGO
        </Text>
                <Text style={styles.header}>
                    Cutuglagua-Mejia                                                                                             No.
        </Text>


                <Text style={styles.title}>COMPROBANTE DE PAGO</Text>
                <Text style={styles.author}>Consumidor:  {socio}                                No. {numsocio}</Text>
                <Text style={styles.author}>Fecha:   {date}                              Mz: {mz}                     Lt: {lt} </Text>
                <Text style={styles.author}>Lectura Anterior:    {valanterior}           Lectura Actual:   {valactual}             </Text>

                <Table
                    data={[
                        { descripcion: " " + mes, cantidad: valconsumido, valor: valcostoagua },
                        { descripcion: " ", cantidad: " ", valor: " " },
                        { descripcion: " ", cantidad: " ", valor: " " },
                        { descripcion: " ", cantidad: " ", valor: " " },
                        { descripcion: " ", cantidad: " ", valor: " " },
                        { descripcion: " ", cantidad: " ", valor: " " },
                        { descripcion: "RECAUDACION", cantidad: " ", valor: valrecaudacion },
                        { descripcion: "ALCANTARILLADO", cantidad: " ", valor: valalcantarillado },
                        { descripcion: "MULTAS POR MORA Y RECONEXION", cantidad: " ", valor: " " }, //MULTAS AQUI
                        { descripcion: "MULTAS DE: Asambleas [ ] Mingas [ ] Otros [ ]", cantidad: " ", valor: " " },
                        { descripcion: "MEDIDORES: Cambio [ ] Nueva Ins. [ ]", cantidad: " ", valor: " " },
                        { descripcion: " Guarde este documento es importante para usted. este documento no es válido sin sello ni firma", cantidad: "VALOR TOTAL $", valor: valtotal },
        
                    ]}
                >
                    <TableHeader>
                        <TableCell>
                            DESCRIPCION
                        </TableCell>
                        <TableCell weighting={0.35}>
                            CANTIDAD m3
                        </TableCell>
                        <TableCell weighting={0.35}>
                            VALOR $
                        </TableCell >    
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.descripcion} />
                        <DataTableCell weighting={0.35} getContent={(r) => r.cantidad} />
                        <DataTableCell weighting={0.35} getContent={(r) => r.valor} />
                    </TableBody>
                </Table>
                <Text style={styles.author}>        </Text>
                <Text style={styles.author}>REVISADO POR:             </Text>
                <Text style={styles.author}>______________________             </Text>
                <Text style={styles.author}>TESORERO          </Text>

                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
}

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'Oswald'
    },
    author: {
        fontSize: 13,
        textAlign: 'justify',
        marginBottom: 10,


    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 25,
        marginHorizontal: 460,
        height: '50',
        width: '100',
        position: 'absolute',
        display: 'block',

    },
    header: {
        fontSize: 10,
        marginBottom: 10,
        textAlign: 'center',
        color: 'grey',
        marginRight: 30
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});



export default GetPDF;