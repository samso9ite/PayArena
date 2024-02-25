import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
import pelezaLogo from '../../../../assets/logo-peleza.png'
import BackgroundCheckLogo from '../../../../assets/backgroundCheck.png'
import avatar from '../../../../assets/avatar.png'
import qrcode from '../../../../assets/peleze_qr.png'

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        padding: 10,
    },
    top_header_container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topHeader_logo: {
        width: '250px',
        height: '50px',
    },
    logo_header: {
        width: '250px',
        height: '50px',
        objectFit: 'contain',
    },
    logo_header_individual: {
        width: '100px',
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    reference_number: {
        fontSize: '10px',
    },
    reference_date: {
        fontSize: '10px',
        fontWeight: 'extrabold',
        fontFamily: 'Helvetica-Bold',
    },
    check_details: {
        marginTop: 10,
    },
    check_details_banner: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    check_details_banner_left: {
        width: '2%',
        backgroundColor: '#003E51',
        paddingVertical: 10,
    },
    check_details_banner_right: {
        width: '98%',
        backgroundColor: '#003E51',
        color: '#fff',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    check_details_banner_header: {
        fontSize: '10px',
    },
    check_details_response_wrapper: {
        marginTop: 8,
        marginBottom: 8,
    },
    check_details_response_container: {
        backgroundColor: '#DBF0EE',
        flexDirection: 'column',
    },
    detail_container: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottom: '.1px solid #C0C9D8',
    },
    check_details_response_left: {
        fontSize: '10px',
        fontWeight: 'light',
        fontStyle: 'normal',
        width: '40%',
    },
    check_details_response_right: {
        width: '55%',
        wordWrap:"break-word",
        fontSize: '10px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontFamily: 'Helvetica-Bold',
    },
    details_face_recognition: {
        width: '30px',
        height: '30px',
    },
    facial_recognition_wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 10,
        gap: 5,
        textAlign: 'center',
    },
    facial_recognition_title: {
        fontSize: '10px',
    },
    footer_alt: {
        width: '100%',
        textAlign: 'center',
    },
    company_details_footer_text: {
        fontSize: '8px',
        textAlign: 'center',
        padding: 3,
    },
    logo: {
        width: '10%',
    },
    disclaimer: {
        fontSize: '8px',
        textAlign: 'left',
        marginVertical: 5,
        lineHeight: 1.4,
    },
    footer_wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30,
        textAlign: 'center',
    },
    footer_container: {
        width: '50%',
        marginHorizontal: 'auto',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    qrcode: {
        fontSize: '10px',
        fontWeight: 'light',
    },
    qrcode_logo: {
        width: '100px',
        height: '100px',
        objectFit: 'contain',
    },
})

// const BackgroundCheckReport = ({ data }: { data: any }) => {
const BackgroundCheckReport = (props: any) => {

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* <View>
                    <Text>Uber</Text>
                </View> */}
                <View style={styles.top_header_container}>
                    <View style={styles.topHeader_logo}>
                        <Image style={styles.logo_header} src={BackgroundCheckLogo} />
                    </View>
                    <View>
                        <Image style={styles.logo_header_individual} src={pelezaLogo} />
                    </View>
                </View>

                <View>
                    <Text style={styles.reference_number}>Reference Number: PSL VC 0007</Text>
                    {/* <Text style={styles.reference_date}>11th Dec 2023</Text> */}
                    <Text style={styles.reference_date}>{getDate()}</Text>
                </View>


                <View style={styles.check_details}>
                    <View style={styles.check_details_banner}>
                        <View style={styles.check_details_banner_left}></View>
                        <View style={styles.check_details_banner_right}>
                            <Text style={styles.check_details_banner_header}>
                                Summary
                            </Text>
                        </View>
                    </View>
                    <View style={styles.check_details_response_wrapper}>
                        <View style={styles.check_details_response_container}>
                            <View style={styles.detail_container}>
                                <Text style={styles.check_details_response_left}>
                                    Candidate Full Name
                                </Text>
                                <Text style={styles.check_details_response_right}>
                                    {`${props?.summary?.first_name} ${props?.summary?.last_name}`}
                                </Text>
                            </View>
                            <View style={styles.detail_container}>
                                <Text style={styles.check_details_response_left}>
                                    Candidate Email
                                </Text>
                                <Text style={styles.check_details_response_right}>
                                    {props?.summary?.email}
                                </Text>
                            </View>
                            <View style={styles.detail_container}>
                                <Text style={styles.check_details_response_left}>
                                    Candidate Phone Number
                                </Text>
                                <Text style={styles.check_details_response_right}>
                                    {props?.summary?.phone_number}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {(Array.isArray(props?.data) && props?.data?.length > 0)
                    ? props?.data?.map((res: any, index: any) => (
                        <View style={styles.check_details} key={index}>
                            <View style={styles.check_details_banner}>
                                <View style={styles.check_details_banner_left}></View>
                                <View style={styles.check_details_banner_right}>
                                    <Text style={styles.check_details_banner_header}>
                                        {res?.endpoint}
                                    </Text>
                                    <Text style={styles.check_details_banner_header}>
                                        Verified
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.check_details_response_wrapper}>
                                <View style={styles.check_details_response_container}>

                                    {Object?.entries(res?.data)?.map(([key, val]: any) => {
                                        if ((typeof val === 'string') && (val?.length < 500)) {
                                            return (
                                                <View style={styles.detail_container}>
                                                    <Text style={styles.check_details_response_left}>
                                                        {key?.replace(/_/g, ' ')}
                                                    </Text>

                                                    <Text style={styles.check_details_response_right}>
                                                        {(val === "active" && key === "status") ? "No reported offenses. No Trial Results" : (val || "Not Available")}
                                                        {/* {val} */}
                                                    </Text>
                                                    {/* {Array.isArray(val) ? (
                                                        val?.map((recognition) => (
                                                            <View
                                                                style={styles.facial_recognition_wrapper}>
                                                                <Image
                                                                    src={avatar}
                                                                    style={
                                                                        styles.details_face_recognition
                                                                    }
                                                                />
                                                                <Text
                                                                    style={
                                                                        styles.facial_recognition_title
                                                                    }>
                                                                    {recognition?.replace(/_/g, ' ')}
                                                                </Text>
                                                            </View>
                                                        ))
                                                    ) : (
                                                        <Text style={styles.check_details_response_right}>
                                                            {val}
                                                        </Text>
                                                    )} */}
                                                </View>
                                            )
                                        }
                                        // if ((typeof val === 'string') && (val?.length > 500) && (key !== "signature")) {
                                        //     return (
                                        //         <View style={styles.detail_container}>
                                        //             <View
                                        //                 style={styles.facial_recognition_wrapper}>
                                        //                 <Image
                                        //                     src={val}
                                        //                     style={
                                        //                         styles.details_face_recognition
                                        //                     }
                                        //                 />
                                        //                 <Text
                                        //                     style={
                                        //                         styles.facial_recognition_title
                                        //                     }>
                                        //                     {key?.replace(/_/g, ' ')}
                                        //                 </Text>
                                        //             </View>
                                        //         </View>
                                        //     )
                                        // }
                                        if ((typeof val === 'object') && (key === "data")) {
                                            return (
                                                <>
                                                    {Object?.entries(val)?.map(([dataKey, dataVal]: any) => (
                                                        <View style={styles.detail_container}>
                                                            <Text style={styles.check_details_response_left}>
                                                                {dataKey?.replace(/_/g, ' ')}
                                                            </Text>

                                                            <Text style={styles.check_details_response_right}>
                                                                {dataVal}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </>
                                            )
                                        }
                                    })}


                                    {Object?.entries(res?.data)?.map(([key, val]: any) => {

                                        if (typeof val === 'string' && val === "active" && key === "status") {
                                            return (
                                                <View style={styles.detail_container}>
                                                    <Text style={styles.check_details_response_left}>
                                                        Comments
                                                    </Text>

                                                    <View>
                                                        <Text style={styles.check_details_response_right}>

                                                            {res?.data["name"]} has been searched in the Criminal
                                                            Records Office database and has no known criminal record or
                                                            results of trial as confirmed by the Directorate of Criminal Investigations.
                                                        </Text>
                                                    </View>

                                                </View>
                                            )
                                        }
                                    })}
                                </View>
                            </View>
                        </View>
                    ))
                    : ''}

                <View style={styles.footer_alt}>
                    <Text style={styles.disclaimer}>
                        DISCLAIMER: The records contained in this reports are compiled from various
                        databases that may only be updated infrequently, and therefore, may not have
                        the most current information. This report is not intended to serve as
                        recommendation of whether to hire the candidate investigated. This report is
                        submitted in strict confidence and except where required by law, no
                        information provided in our reports may be revealed directly or indirectly
                        to any person except to those whose official duties require them to pass
                        this report on in relation to which the report was requested by the client.
                        Peleza International Limited/Prembly neither warrants, vouches for, or
                        authenticates the reliability of the information contained herein that the
                        records are accurately reported as they were found at the source as of the
                        date and time of this report, whether on a computer information system,
                        retrieved by manual search, or telephonic interviews. The information
                        provided herein shall not be construed to constitute a legal opinion; rather
                        it is a compilation of public records and/or data for your review. Peleza
                        International Limited shall not be liable for any losses or injuries now or
                        in the future resulting from or relating to the information provided herein.
                        The recommended searches provided on our website should not serve as legal
                        advice for your background investigation. You should always seek legal
                        advice from your attorney. The recommended searches are provided to help
                        orient you to searches you may want to consider for a particular job
                        classification. We will work with you to create a background investigation
                        specific to your industry needs.
                    </Text>
                    <View style={styles.footer_wrapper}>
                        <Text style={styles.qrcode}>QR code to visit webpage</Text>
                        <Image src={qrcode} style={styles.qrcode_logo} />
                        <View style={styles.footer_container}>
                            <Text style={styles.company_details_footer_text}>
                                Secured and powered by
                            </Text>
                            <Image style={styles.logo} src={pelezaLogo} />
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default BackgroundCheckReport