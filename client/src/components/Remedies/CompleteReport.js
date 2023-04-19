import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Document, Page, Text, View, Image, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import bgReport from '../Reports/bgReport.jpg';

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#e5e6e8",
        color: "black",
        position: "relative",
    },
    section: {
        margin: 10,
        padding: 5,
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    image: {
        objectFit: 'cover',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        width: '100%'
    },
    rowView: {
        display: 'flex',
        flexDirection: 'col',
        borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: "left",
        fontSize: "12"
    }
});

function CompleteReport() {
    const member_id = window.member_id;
    const remedies = window.remedies;
    const remedyName = window.remedyName;
    const [avoids, updateAvoids] = useState([]);
    // const arr = useRef();

    useEffect(() => {
        try {
            axios.post('http://localhost:5000/avoids', { member_id }).then((data) => {
                console.log(data.data);
                updateAvoids([...data.data])

            }).catch(err => {
                console.log(err);
            })
        }
        catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div>
            <PDFViewer style={styles.viewer} >
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text style={{ color: 'green', fontSize: '26' }}>RevitaliZe</Text>
                            <Image style={styles.image} src={bgReport} alt="images" />
                        </View>

                        <View style={styles.section}>
                            <Text style={{ color: 'green', fontSize: '18' }}>Avoid intake of</Text>
                            <View style={styles.rowView}>
                                <Text style={{ fontSize: '14' }}>Fruits</Text>
                                {avoids.map((avoid) => (
                                    <Text>{avoid.fruits}</Text>
                                ))}
                            </View>

                            <View style={styles.rowView}>
                                <Text style={{ fontSize: '14' }}>Vegetables</Text>
                                {avoids.map((avoid) => (
                                    <Text>{avoid.vegetables}</Text>
                                ))}
                            </View>

                             <View style={styles.rowView}>
                                <Text style={{ fontSize: '14' }}>Nuts</Text>
                                {avoids.map((avoid) => (
                                    <Text>{avoid.nuts}</Text>
                                ))}
                            </View>
                            
                        </View>

                        <View style={styles.section}>
                            <Text style={{ color: 'green', fontSize: '18' }}>Suggested Remedies</Text>
                            {remedyName.map((rem) => (
                                <View >
                                    <View style={styles.rowView}>
                                        <Text style={{ color: 'black', fontSize: '14' }}>{rem}</Text>
                                        <br />
                                        <Text>{remedies[rem]}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div >
    )
}

export default CompleteReport
