import React from 'react'
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

    useEffect(() => {
        try {
            axios.post('http://localhost:5000/avoids', { member_id}).then((data) => 
            {
                console.log(data.data);
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
                            {remedyName.map((rem) => (
                                <View >
                                    <View style={styles.rowView}>
                                        <Text style={{ color: 'black', fontSize: '14' }}>{rem}</Text>
                                        <br />
                                        {/* </View>
                                <View style={styles.rowView}> */}
                                        <Text>{remedies[rem]}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        <View style={styles.section}>
                            <Text style={{ color: 'green', fontSize: '18' }}>Suggested Remedies</Text>
                            {remedyName.map((rem) => (
                                <View >
                                    <View style={styles.rowView}>
                                        <Text style={{ color: 'black', fontSize: '14' }}>{rem}</Text>
                                        <br />
                                        {/* </View>
                                <View style={styles.rowView}> */}
                                        <Text>{remedies[rem]}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* {record.map((rowData) => <>
                            <View style={styles.rowView}>
                                <Text style={{ width: `${100 / 4}%` }}>{rowData.date.split(' ')[0]}, {rowData.date.split(' ').slice(1, 4).join(' ')}</Text>
                                <Text style={{ width: `${100 / 4}%` }}>{rowData.vatta}</Text>
                                <Text style={{ width: `${100 / 4}%` }}>{rowData.pitta}</Text>
                                <Text style={{ width: `${100 / 4}%` }}>{rowData.kapha}</Text>
                            </View>
                        </>)} */}


                    </Page>
                </Document>
            </PDFViewer>
        </div >
    )
}

export default CompleteReport
