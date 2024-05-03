import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { PaginatedList } from 'react-paginated-list'
import Nav from 'react-bootstrap/Nav';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
import PremblyLogo from '../../../../../../assets/upLogo.png'
import { ActiveTag, FailedTag, imgUrl, InactiveTag, SuccessTag } from '../../../../../utils'
import Cookies from 'js-cookie'


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
    response_header_text: {
        fontSize: '10px',
        marginTop: '10px',
    },
    response_header_two: {
        fontSize: '14px',
    },
    response_header_text_two: {
        fontSize: '10px',
        backgroundColor: '#ABF5D1',
        color: '#006644',
        paddingHorizontal: 20,
        borderRadius: 10,
        // marginTop: '10px'
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


const PDFComponent = ({ idData }) => {
    let hostName = Cookies.get('hostName') || ''
    let passLogo = PremblyLogo || ''
    let verifyType = 'individual'
   
    if (verifyType === 'individual') {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.topHeader_logo_individual}>
                        <Image style={styles.logo_header_individual} src={passLogo} />
                    </View>
                    <View style={styles.response_header_individual}>
                        <Text style={styles.response_header_two}>
                            {/* {individual_channel[channel] || channel} */}
                        </Text>
                        <Text style={styles.response_header_text_two}>Successful</Text>
                    </View>

                    {(Array.isArray(idData) && idData.length > 0)
                    ? idData?.map((res, index) => (
                        <View style={styles.check_details} key={index}>
                            <View style={styles.check_details_banner}>
                                <View style={styles.check_details_banner_left}></View>
                                <View style={styles.check_details_banner_right}>
                                    <Text style={styles.check_details_banner_header}>
                                        {res?.endpoint}
                                    </Text>
                                    <Text style={styles.check_details_banner_header}>
                                        {Object.keys(res)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.check_details_response_wrapper}>
                            <View style={styles.check_details_response_container}>
                                {Object.entries(res).map(([key, val]) => {
                                    // Checking if the value is an array
                                    if (Array.isArray(val)) {
                                    return val.map((item, index) => (
                                        // Using React components instead of HTML elements
                                        Object.entries(item).map(([key, val]) => {
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
                                            if ((typeof val === 'object') && (key === "data")) {
                                                return (
                                                    <>
                                                        {Object?.entries(val)?.map(([dataKey, dataVal]) => (
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
                                    })
                                    ));
                                    } else {
                                    // Render the non-array value
                                    return (
                                       <h1></h1>
                                    );
                                    }
                                })}
                                   
                                </View>
                            </View>
                        </View>
                    ))
                    : ''}

                    <View style={styles.footer_alt}>
                        <Text style={styles.disclaimer}>
                            DISCLAMER The records contained in this reports are compiled from
                            various databases that may only be updated infrequently, and therefore,
                            may not have the most current information. This report is not intended
                            to serve as recommendation of whether to hire the candidate
                            investigated. This report is submitted in strict confidence and except
                            where required by law, no information provided in our reports may be
                            revealed directly or indirectly to any person except to those whose
                            official duties require them to pass this report on in relation to which
                            the report was requested by the client. Payarena Verification Service 
                            neither warrants, vouches for, or authenticates the reliability of the
                            information contained herein that the records are accurately reported as
                            they were found at the source as of the date and time of this report,
                            whether on a computer information system, retrieved by manual search, or
                            telephonic interviews. The information provided herein shall not be
                            construed to constitute a legal opinion; rather it is a compilation of
                            public records and/or data for your review. Payarena Verification Service
                            shall not be liable for any losses or injuries now or in the future
                            resulting from or relating to the information provided herein. The
                            recommended searches provided on our website should not serve as legal
                            advice for your background investigation. You should always seek legal
                            advice from your attorney. The recommended searches are provided to help
                            orient you to searches you may want to consider for a particular job
                            classification. We will work with you to create a background
                            investigation specific to your industry needs.
                        </Text>
                        <View style={styles.footer_wrapper}>
                            <View style={styles.footer_container}>
                                <Text style={styles.company_details_footer_text}>
                                    Secured and powered by
                                </Text>
                                <Image style={styles.logo} src={passLogo} />
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        )
    }
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.top_wrapper}>
                    <View style={styles.top_header_left}>
                        <View style={styles.topHeader_container}>
                            <View style={styles.topHeader}>
                                <Text style={styles.headerText}>Company Name:</Text>
                                <Text style={styles.headerText_alt}>
                                    {idData?.name ||
                                        idData?.company ||
                                        idData?.company_name ||
                                        idData[0]?.name ||
                                        '-'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.topHeader_container}>
                            <View style={styles.topHeader}>
                                <Text style={styles.headerText}>Report Date:</Text>
                                <Text style={styles.headerText_alt}>
                                    {new Date().toDateString()}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.topHeader_logo}>
                        <Image style={styles.logo_header} src={passLogo} />
                    </View>
                </View>
                <View style={styles.response_header}>
                    <Text style={styles.response_header_one}>VERIFICATION RESPONSE</Text>
                    <Text style={styles.response_header_text}>
                        Verification Status: <Text style={styles.status}>Successful</Text>
                    </Text>
                </View>

                <View style={styles.company_details}>
                    <Text style={styles.company_details_text}> Details</Text>
                    {!Array.isArray(idData)
                        ? Object?.entries(idData).map((v) => {
                              return (
                                  // eslint-disable-next-line no-lone-blocks
                                  v[0] !== 'file_base64' &&
                                  typeof v[1] === 'string' && (
                                      <View style={styles.test}>
                                          <Text style={styles.company_details_subtitle_right}>
                                              {v[0]?.replace(/_/g, ' ')}
                                          </Text>
                                          <Text style={styles.company_details_subtitle_left}>
                                              {v[1] ? v[1] : 'Not available'}
                                          </Text>
                                      </View>
                                  )
                              )
                          })
                        : Array?.isArray(idData) &&
                          idData.map((v, index) => {
                              return (
                                  // eslint-disable-next-line no-lone-blocks
                                  // v[0] !== 'file_base64' && typeof v[1] === 'string' && (
                                  Object.entries(v).map(([key, value]) =>
                                      typeof value === 'object' ? (
                                          value?.map((vt) => <Text></Text>)
                                      ) : (
                                          <View style={styles.test}>
                                              <Text style={styles.company_details_subtitle_right}>
                                                  {key}
                                              </Text>
                                              <Text style={styles.company_details_subtitle_left}>
                                                  {value ? value : 'Not available'}
                                              </Text>
                                          </View>
                                      )
                                  )
                               )
                            })}
                </View>
                {idData?.directors && Object?.values(idData?.directors)?.length && (
                    <View style={styles.company_details}>
                        <Text style={styles.company_details_text}>
                            Share Holding and Directorship
                        </Text>
                        <View style={styles.company_details_record_header}>
                            <Text style={styles.company_details_record_header_text}>NAME</Text>
                            <Text style={styles.company_details_record_header_text}>
                                DESCRIPTION
                            </Text>
                            <Text style={styles.company_details_record_header_text}>ADDRESS</Text>
                            <Text style={styles.company_details_record_header_text}>
                                NATIONALITY
                            </Text>
                            <Text style={styles.company_details_record_header_text}>SHARES</Text>
                            <Text style={styles.company_details_record_header_text}>
                                TYPE OF SHARES PERCENTAGE
                            </Text>
                        </View>
                        {Object?.values(idData?.directors).map((director) => {
                            return (
                                <View style={styles.company_details_record_header}>
                                    <Text style={styles.company_details_record_header_text}>
                                        {director?.name || 'N/A'}
                                    </Text>
                                    <Text style={styles.company_details_record_header_text}>
                                        {director?.description || 'N/A'}
                                    </Text>
                                    <Text style={styles.company_details_record_header_text}>
                                        {director?.address || 'N/A'}
                                    </Text>
                                    <Text style={styles.company_details_record_header_text}>
                                        {director?.nationality || 'N/A'}
                                    </Text>
                                    <Text style={styles.company_details_record_header_text}>
                                        {director?.shares || 'N/A'}
                                    </Text>
                                    <Text style={styles.company_details_record_header_text}>
                                        {director?.percentage || 'N/A'}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                )}

                <View style={styles.footer_alt}>
                    <Text style={styles.disclaimer}>
                        DISCLAMER The records contained in this reports are compiled from various
                        databases that may only be updated infrequently, and therefore, may not have
                        the most current information. This report is not intended to serve as
                        recommendation of whether to hire the candidate investigated. This report is
                        submitted in strict confidence and except where required by law, no
                        information provided in our reports may be revealed directly or indirectly
                        to any person except to those whose official duties require them to pass
                        this report on in relation to which the report was requested by the client.
                        Payarena Verification Service neither warrants, vouches for, or authenticates
                        the reliability of the information contained herein that the records are
                        accurately reported as they were found at the source as of the date and time
                        of this report, whether on a computer information system, retrieved by
                        manual search, or telephonic interviews. The information provided herein
                        shall not be construed to constitute a legal opinion; rather it is a
                        compilation of public records and/or data for your review. Payarena Verification Service
                        shall not be liable for any losses or injuries now or
                        in the future resulting from or relating to the information provided herein.
                        The recommended searches provided on our website should not serve as legal
                        advice for your background investigation. You should always seek legal
                        advice from your attorney. The recommended searches are provided to help
                        orient you to searches you may want to consider for a particular job
                        classification. We will work with you to create a background investigation
                        specific to your industry needs.
                    </Text>
                    <View style={styles.footer_wrapper}>
                        <View style={styles.footer_container}>
                            <Text style={styles.company_details_footer_text}>
                                Secured and powered by
                            </Text>
                            <Image style={styles.logo} src={passLogo} />
                        </View> 
                    </View>
                </View>
            </Page>
        </Document>
    )
}


export default function CommercialCreditBereauAdvance(props) {
    const [responseData, setResponseData] = useState(props?.data)
    const [idData, setIdData] = useState({})
    const [idDataKeys, setIdDataKeys] = useState([])
    const [openDirectors, setOpenDirectors] = useState(false)
    const [openDataChild, setOpenDataChild] = useState(false)
    const [dataChild, setDataChild] = useState("")

    useEffect(() => {
        if (responseData?.response_code === "00") {
            setIdData(getIdData(responseData))
            if (typeof getIdData(responseData) === "object") {
                setIdDataKeys(Object.keys(getIdData(responseData)))
            }
        }
    }, [])

   

    let getResponseImg = () => {
        var data = getIdData(responseData);
        if (data?.hasOwnProperty("image")) {
            return data.image;
        }
        if (data?.hasOwnProperty("base64Image")) {
            return data.base64Image;
        }
        if (data?.hasOwnProperty("photo")) {
            return data.photo;
        }
        if (data?.hasOwnProperty("Photo")) {
            return data.Photo;
        }
        return null
    }

    let getIdData = (data) => {
        if (data?.hasOwnProperty("bvn_data")) {
            return data.bvn_data
        }
        if (data?.hasOwnProperty("nin_data")) {
            return data?.nin_data
        }
        if (data?.hasOwnProperty("frsc_data")) {
            return data?.frsc_data
        }
        if (data?.hasOwnProperty("cac_data")) {
            return data?.cac_data
        }
        if (data?.hasOwnProperty("account_data")) {
            return data?.account_data
        }
        if (data?.hasOwnProperty("data")) {
            return data?.data
        }
        return {}
    }

    let getKeyLabel = (data) => {
        var formattedText = ""
        for (var i = 0, len = data.length; i < len; i++) {
            if (i === 0) {
                formattedText += data.charAt(0).toUpperCase()
                continue
            }
            if ((i !== 0) && (data.charAt(i) === data.charAt(i).toUpperCase())) {
                formattedText += " " + data.charAt(i).toUpperCase()
                continue
            }
            formattedText += data.charAt(i)
        }
        return formattedText
    }
    return (
    <div className="px-2">
        <div className="text-center mb-3">
            <h5>{props?.data?.endpoint?.name}</h5>
            <small className="">Verification Status: </small>
            {responseData?.response_code === "00" ?
                <>
                    <SuccessTag /><br />
                </>
                :
                <>
                    <FailedTag /><br />
                </>
            }
        </div>
        {(!getResponseImg() || getResponseImg()?.length < 10) ? "" :
            <div className="text-center">
                {responseData?.response_code === "00" ?
                    <img className="response-img" alt="dashboard-user"
                        src={imgUrl(getResponseImg())}
                    />
                    :
                    ""
                }
            </div>
        }

        {responseData?.response_code === "00" ?
            <>
                {
                    <>
                        {idDataKeys?.indexOf("directors") !== -1 &&
                         <div className="text-center mt-4">
                         <Nav variant="pills" defaultActiveKey={0} className='response-tab-menu' onSelect={(e) => setOpenDirectors(e == 0 ? false : true)}>
                         <Nav.Item>
                           <Nav.Link eventKey={0} as={'div'}>Document Info</Nav.Link>
                         </Nav.Item>
                         <Nav.Item>
                           <Nav.Link eventKey={1} as={'div'}>Directors Info</Nav.Link>
                         </Nav.Item>
                       </Nav>
                       </div>
                        }
                         {idData &&
                            // props?.channel !== 'ADDRESS_NG' &&
                            // props?.channel !== 'ADDRESS_NG_STATUS' &&
                            // props?.channel !== 'PEZESHA_PETASCORE_SYNC' &&
                            Object.keys(idData).length !== 0 ? (
                                <PDFDownloadLink
                                    className="d-flex align-items-center btn btn-deep-green mx-auto my-3 px-3"
                                    style={{ width: 'fit-content' }}
                                    document={
                                        <PDFComponent
                                            idData={idData}
                                            // verifyType={props?.verifyType}
                                            // channel={props?.channel}
                                        />
                                    }
                                    fileName={`${
                                        idData?.company ||
                                        idData?.name ||
                                        idData?.company_name ||
                                        'download'
                                    }.pdf`}>
                                    {({ blob, url, loading, error }) =>
                                        loading ? 'Loading document...' : `Download report`
                                    }
                                </PDFDownloadLink>
                            ) : (
                                ''
                            )}
                        <div className='row justify-content-between mt-3'>
                            {!openDirectors && idDataKeys?.map((key, index) => {
                                if (typeof idData[key] !== "object") {
                                    return (
                                        <span className={(index + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={index} style={{ borderBottom: "1px solid #ddd", paddingBottom: "0px", marginBottom: "0px" }}>
                                            {((key !== "photo") && (key !== "Photo") && (key !== "image") && (key !== "base64Image") && (key !== "signature") && (key !== "directors")  && (key !== "expirationDate") && (key !== "service_provider")) &&
                                                <>
                                                    {/* {console.log(typeof idData[key])} */}
                                                    <small>{getKeyLabel(key)?.replace(/_/g, " ")}</small>
                                                    <p>{(idData[key] || 'Not Available')}</p>
                                                    {/* {typeof idData[key] === "object" ? "" : */}
                                                    {/* <p>{idData[key] || (idData[key]?.replace("null", '""') || 'Not Available')}</p> */}
                                                    {/* } */}
                                                </>
                                            }

                                            {key === "signature" &&
                                                <>
                                                    <small>{getKeyLabel(key)}</small> <br />
                                                    {key === "signature" ?
                                                        <img style={{ width: "50px" }} src={idData[key]} alt='' />
                                                        :
                                                        <p>{'Not Available'}</p>
                                                    }
                                                </>
                                            }

                                            {key === "expirationDate" &&
                                                <>
                                                    {/* {console.log(idData["documentStatus"])} */}
                                                    {/* <small>{getKeyLabel(key)}</small> <br /> */}
                                                    <p>
                                                        <span className={`${idData["documentStatus"] === "EXPIRED" ? "text-danger" : ""}`}>
                                                            {(idData[key] || 'Not Available')}
                                                        </span>
                                                    </p>
                                                </>
                                            }

                                            {(key === "directors" || key === "service_provider") && <> </>}
                                        </span>
                                    )
                                }
                                else {
                                    return (
                                        <span className={(key === "0" || key === "1" || key === "2" || key === "3") && (key !== "directors" || key !== "signature" || key !== "PerformanceSummary" || key !== "expirationDate" || key !== "service_provider") ? "col-md-12 py-1" : ((index + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end")}
                                            key={index} style={{ borderBottom: `${(key === "0" || key === "1" || key === "2" || key === "3") && (key !== "directors" || key !== "signature" || key !== "PerformanceSummary" || key !== "expirationDate" || key !== "service_provider") ? "" : "1px solid #ddd"}`, paddingBottom: "0px", marginBottom: "0px" }}
                                        >
                                            <>
                                                {(idData[key]?.length < 1) ?
                                                    <>
                                                        <small>{getKeyLabel(key)?.replace(/_/g, " ")}</small>
                                                        <p>Not Available</p>
                                                    </>
                                                    :
                                                    <>
                                                        {(key === "0" || key === "1" || key === "2" || key === "3") && (key !== "directors" || key !== "signature" || key !== "PerformanceSummary" || key !== "expirationDate" || key !== "service_provider") ?
                                                            <div className='row'>
                                                                {Object?.keys(idData[key])?.map((val, k) => {
                                                                    return (
                                                                        // <span className={(k + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={k} style={{ borderBottom: "1px solid #ddd", paddingBottom: "0px", marginBottom: "0px" }}>
                                                                        <span className="col-md-12 py-1" key={k} style={{ borderBottom: "1px solid #ddd", paddingBottom: "0px", marginBottom: "0px" }}>
                                                                            {/* <small>{getKeyLabel(val)?.replace(/_/g, " ")}</small> */}

                                                                            {(idData[key][val] && idData[key][val]?.length < 1) ?
                                                                            <></>
                                                                                // <p>{`${idData[key][val]}` || "Not Available"}</p>
                                                                                :
                                                                                <div className='row'>
                                                                                    {Object?.keys(idData[key][val])?.map((nestVal) => {
                                                                                        if (typeof idData[key][val][nestVal] === "object") {
                                                                                            return (
                                                                                                <>
                                                                                                    {Object?.keys(idData[key][val][nestVal])?.map((newNestVal, n) => {
                                                                                                        return (
                                                                                                            <span className={(n + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={n} style={{ borderBottom: "1px solid #ddd", paddingBottom: "0px", marginBottom: "0px" }}>
                                                                                                                <small>{getKeyLabel(newNestVal)?.replace(/_/g, " ")}</small>
                                                                                                                <p>{`${idData[key][val][nestVal][newNestVal]}` || "Not Available"}</p>
                                                                                                            </span>
                                                                                                        )
                                                                                                    })}
                                                                                                </>
                                                                                            )
                                                                                        }
                                                                                    })}
                                                                                </div>
                                                                            }
                                                                        </span>
                                                                    )
                                                                })}
                                                            </div>
                                                            :
                                                            <>
                                                                <div className={`d-flex ${(index + 1) % 2 === 1 ? "justify-content-md-start" : "justify-content-md-end pt-2"}`}>
                                                                    <small>{getKeyLabel(key).replace(/_/g, " ")}</small>
                                                                    {(openDataChild && dataChild === getKeyLabel(key)) ?
                                                                        <i className="ri-arrow-up-s-line ri-lg ms-3"
                                                                            style={{ cursor: "pointer" }}
                                                                            onClick={() => {
                                                                                setOpenDataChild(false)
                                                                                setDataChild("")
                                                                            }}
                                                                        />
                                                                        :
                                                                        <i className="ri-arrow-down-s-line ri-lg ms-3"
                                                                            style={{ cursor: "pointer" }}
                                                                            onClick={() => {
                                                                                setOpenDataChild(true)
                                                                                setDataChild(getKeyLabel(key))
                                                                            }}
                                                                        />
                                                                    }
                                                                </div>

                                                                {(openDataChild && dataChild === getKeyLabel(key)) &&
                                                                    <div>
                                                                        {idData[key] && Object?.keys(idData[key])?.map(val => {
                                                                            if ((idData[key][val]?.length === undefined) && (typeof idData[key][val] === "object")) {
                                                                                idData[key][val] && Object?.keys(idData[key][val])?.map(newVal => (
                                                                                    <>
                                                                                        <small>{getKeyLabel(newVal)?.replace(/_/g, " ")}</small>
                                                                                        <p>{`${(idData[key][val][newVal])}` || "Not Available"}</p>
                                                                                    </>
                                                                                ))
                                                                            }
                                                                            else {
                                                                                return (
                                                                                    <>
                                                                                        <small>{getKeyLabel(val)?.replace(/_/g, " ")}</small>
                                                                                        {/* <p>{`${(idData[key][val])}` || "Not Available"}</p> */}

                                                                                        {(idData[key][val] && idData[key][val]?.length < 1) ?
                                                                                            <p>{`${idData[key][val]}` || "Not Available"}</p>
                                                                                            :
                                                                                            <div className='row'>
                                                                                                {idData[key][val] && Object?.keys(idData[key][val])?.map((nestVal) => {
                                                                                                    if (typeof idData[key][val][nestVal] === "object") {
                                                                                                        return (
                                                                                                            <>
                                                                                                                {idData[key][val][nestVal] && Object?.keys(idData[key][val][nestVal])?.map((newNestVal, n) => {
                                                                                                                    return (
                                                                                                                        <span className={(n + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={n} style={{ borderBottom: "1px solid #ddd", paddingBottom: "0px", marginBottom: "0px" }}>
                                                                                                                            <small>{getKeyLabel(newNestVal)?.replace(/_/g, " ")}</small>
                                                                                                                            <p>{`${idData[key][val][nestVal][newNestVal]}` || "Not Available"}</p>
                                                                                                                        </span>
                                                                                                                    )
                                                                                                                })}
                                                                                                            </>
                                                                                                        )
                                                                                                    }
                                                                                                })}
                                                                                            </div>
                                                                                        }
                                                                                    </>
                                                                                )
                                                                            }
                                                                        })}
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                }

                                            </>
                                        </span>
                                    )
                                    // }
                                }
                            })}
                        </div>
                        {(openDirectors && idDataKeys?.filter(dir => (dir === "directors")).length > 0) &&
                            <PaginatedList
                                list={idData["directors"]}
                                itemsPerPage={1}
                                useMinimalControls={true}
                                leftMargin={1}
                                rightMargin={1}
                                nextText={'Next'}
                                prevText={'Previous'}
                                displayRange={2}
                                breakText={'...'}
                                breakClass={'pagination-break'}
                                renderList={(list) => (
                                    <>
                                        {list.map((value, index) => (
                                            <div key={index}>
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Fullname</small>
                                                        <p>{`${value?.firstname} ${value?.otherName} ${value?.surname}`}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Gender</small>
                                                        <p>{value?.gender || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Date of Birth</small>
                                                        <p>{moment(value?.dateOfBirth).format("MMMM Do YYYY, h:mm") || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Email</small>
                                                        <p>{value?.email || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Phone Number</small>
                                                        <p>{value?.phoneNumber || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Address</small>
                                                        <p>{value?.address || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>City</small>
                                                        <p>{value?.city || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>LGA</small>
                                                        <p>{value?.lga || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>State</small>
                                                        <p>{value?.state || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Postcode</small>
                                                        <p>{value?.postcode || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Country</small>
                                                        <p>{value?.countryFk?.name || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Nationality</small>
                                                        <p>{value?.nationality || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Identity Number</small>
                                                        <p>{value?.identityNumber || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Accreditation Number</small>
                                                        <p>{value?.accreditationnumber || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Occupation</small>
                                                        <p>{value?.occupation || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Date of Appointment</small>
                                                        <p>{moment(value?.dateOfAppointment).format("MMMM Do YYYY, h:mm") || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Shares Alloted</small>
                                                        <p>{value?.numSharesAlloted || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Type of Shares</small>
                                                        <p>{value?.typeOfShares || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Affiliate</small>
                                                        <p>{value?.affiliateTypeFk?.name || "Not Available"}</p>
                                                    </span>
                                                    <span className="col-md-6 text-md-end">
                                                        <small>Affiliate Description</small>
                                                        <p>{value?.affiliateTypeFk?.description || "Not Available"}</p>
                                                    </span>
                                                </div><hr />
                                                <div className='row justify-content-between'>
                                                    <span className="col-md-6">
                                                        <small>Status</small>
                                                        <p>{value?.status === "ACTIVE" ? <ActiveTag /> : <InactiveTag />}</p>
                                                    </span>
                                                </div><hr />
                                            </div>

                                        ))}
                                    </>
                                )}
                            />
                        }
                    </>
                }
            </>
            : <h5 className="text-center mt-5">{responseData.message}</h5>
        }
    </div>
);
}
