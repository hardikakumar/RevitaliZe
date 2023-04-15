import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import bgReport from './bgReport.jpg';

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#e5e6e8",
        color: "black",
        position: "relative",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    image: {
        objectFit: 'cover',
        position: 'absolute', zIndex: -1, top: 0, width: '100%'
    },
    rowView: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: "center",
        fontSize: "12"
    }
});


function DownloadReport() {
    const record = window.record;

    return (
        <div>
            <PDFViewer style={styles.viewer} >
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text style={{ color: 'green', fontSize: '26' }}>RevitaliZe</Text>
                            <Text style={{ color: 'black', fontSize: '18' }}>Dosha Reports</Text>
                            <Image style={styles.image} src={bgReport} alt="images" />
                        </View>


                        <br />
                        <View style={styles.rowView}>
                            <Text style={{ width: `${100 / 4}%` }}>Date</Text>
                            <Text style={{ width: `${100 / 4}%` }}>Vata</Text>
                            <Text style={{ width: `${100 / 4}%` }}>Pitta</Text>
                            <Text style={{ width: `${100 / 4}%` }}>Kapha</Text>
                        </View>

                        {record.map((rowData) => <>
                            <View style={styles.rowView}>
                                <Text style={{ width: `${100 / 4}%` }}>{rowData.date.split(' ')[0]}, {rowData.date.split(' ').slice(1, 4).join(' ')}</Text>
                                <Text style={{ width: `${100 / 4}%` }}>{rowData.vatta}</Text>
                                <Text style={{ width: `${100 / 4}%` }}>{rowData.pitta}</Text>
                                <Text style={{ width: `${100 / 4}%` }}>{rowData.kapha}</Text>
                            </View>
                        </>)}


                    </Page>
                </Document>
            </PDFViewer>
        </div>
    )
}

export default DownloadReport