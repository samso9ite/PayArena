import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { PaginatedList } from 'react-paginated-list'
import Nav from 'react-bootstrap/Nav'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
import { RootState } from '../../../../../redux/reducers'
import { ActiveTag, FailedTag, SuccessTag, imgUrl, InactiveTag } from '../../../../utils'
import QRcodeImage from '../../../../../assets/QRCode.png'
import ComplianceImage from '../../../../../assets/complianceImage.png'
import PremblyLogo from '../../../../../assets/logo.png'
import PelezaLogo from '../../../../../assets/pelezaLogo.png'
import Cookies from 'js-cookie'
// import moment from 'moment';
// import React, { useEffect, useState } from 'react';
// import { PaginatedList } from 'react-paginated-list';
// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
// import { ActiveTag, FailedTag, SuccessTag, imgUrl, InactiveTag } from '../../../../utils';
// import PremblyLogo from "../../../../../assets/logo-Prembly.png"

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E4E4E4',
        padding: 10,
    },
    top_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo_header: {
        width: '100%',
        height: '100px',
        objectFit: 'contain',
    },
    topHeader_logo: {
        width: '100px',
        height: '50px',
    },
    topHeader_logo_individual: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        height: '50px',
    },
    logo_header_individual: {
        width: '100px',
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    top_header_left: {
        width: '100%',
    },
    topHeader_container: {
        width: '100%',
        marginTop: 5,
    },
    topHeader: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    },
    headerText: {
        fontSize: '10px',
        paddingVertical: 2,
        width: '20%',
    },
    headerText_alt: {
        fontSize: '10px',
        paddingVertical: 2,
        fontWeight: 'bold',
        fontFamily: 'Helvetica-Bold',
    },
    response_header: {
        backgroundColor: '#003e51',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 25,
        marginTop: 10,
    },
    response_header_individual: {
        backgroundColor: '#003e51',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    response_header_one: {
        fontSize: '14px',
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
    individual_img: {
        width: '80px',
        height: '80px',
        borderRadius: '150px',
        marginVertical: 10,
        overflow: 'hidden',
    },
    individual_img_alt: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        // marginVertical: 10
    },
    individual_details: {},
    status: {
        backgroundColor: '#ABF5D1',
        color: '#006644',
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    company_details: {
        // backgroundColor: '#e6ecf7',
        paddingVertical: 10,
        paddingHorizontal: 2,
        textAlign: 'center',
    },
    company_details_text: {
        fontSize: '12px',
        padding: 10,
        fontWeight: 100,
        backgroundColor: '#003e51',
        color: '#fff',
        textAlign: 'center',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    company_details_section: {
        flexDirection: 'row',
        gap: 10,
        borderBottom: '.1px solid #C0C9D8',
        paddingVertical: 8,
        paddingHorizontal: 0,
        backgroundColor: '#e6ecf7',
    },
    company_details_section_alt: {
        flexDirection: 'row',
        gap: 10,
        borderBottom: '.1px solid #C0C9D8',
        paddingVertical: 8,
        paddingLeft: 160,
        backgroundColor: '#e6ecf7',
    },
    company_details_subtitle_right: {
        fontSize: '8px',
        // width: '20%',
        textAlign: 'right',
    },
    company_details_subtitle_right_inner: {
        fontSize: '8px',
        // width: '20%',
        // textAlign: 'right',
    },
    company_details_subtitle_right_alt: {
        fontSize: '8px',
        width: '40%',
        textAlign: 'right',
    },
    company_details_subtitle_right_alt_2: {
        fontSize: '8px',
        width: '50%',
        textAlign: 'right',
    },
    company_details_subtitle_left: {
        fontSize: '8px',
        width: '80%',
        textAlign: 'left',
        fontWeight: 'extrabold',
    },
    company_details_subtitle_right_two: {
        fontSize: '8px',
        width: '28%',
        textAlign: 'left',
        fontWeight: 'extrabold',
    },
    child_width: {
        fontSize: '8px',
        wordWrap:"break-word",
        width: "50%"
    },

    container: {
        position: 'relative',
      },
      text: {
        whiteSpace: 'nowrap',
      },
      overlappingText: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        padding: 5,
      },

    company_details_subtitle_left_two: {
        fontSize: '8px',
        width: '70%',
        textAlign: 'right',
        fontWeight: 'extrabold',
    },
    company_details_record_header: {
        flexDirection: 'row',
        gap: 10,
        borderBottom: '.1px solid #C0C9D8',
        padding: 10,
        backgroundColor: '#e6ecf7',
    },
    company_details_record_header_text: {
        fontSize: '8px',
        width: '20%',
        textAlign: 'left',
    },
    company_details_comment_text: {
        fontSize: '8px',
        textAlign: 'center',
        padding: 10,
    },
    compliance_image_wrapper: {
        width: '8%',
        flexDirection: 'row',
        gap: 10,
        marginTop: 50,
        marginHorizontal: 'auto',
    },
    compliance_image: {
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    footer_alt: {
        width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        textAlign: 'center',
    },
    company_details_footer_text: {
        fontSize: '8px',
        textAlign: 'center',
        padding: 3,
    },
    logo: {
        width: '35%',
        // objectFit: 'contain',
    },
    test: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        gap: 10,
        width: '100%',
        // margin: 'auto',
        textAlign: 'center',
        // backgroundColor: 'blue',
        // backgroundColor: '#003e51',
        backgroundColor: '#e6ecf7',
        borderBottom: '.1px solid #C0C9D8',
    },
    test_two: {
        backgroundColor: '#e7fff3',
        // flexDirection: 'row',
        alignItems: 'left',
        padding: 5,
        gap: 10,
        borderBottom: '.1px solid #C0C9D8',
    },
    test_two_copy: {
        backgroundColor: '#e7fff3',
        flexDirection: 'row',
        alignItems: 'left',
        padding: 5,
        gap: 10,
        borderBottom: '.1px solid #C0C9D8',
    },
    disclaimer: {
        fontSize: '8px',
        textAlign: 'left',
        marginVertical: 5,
        lineHeight: 1.4,
    },
    footer_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: '.1px solid #C0C9D8',
        width: '50%',
        marginTop: 20,
        // marginHorizontal: 'auto'
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
})

const individual_channel = {
    PASSPORT_KE: 'National Passport',
    NATIONAL_IDENTITY_KE: 'National Identity Number',
}

const PDFComponent = ({ idData, verifyType, channel }) => {
    let hostName = Cookies.get('hostName') || ''
    let passLogo = Cookies.get('logo') || ''
    let getKeyLabel = (data) => {
        var formattedText = ''
        for (var i = 0, len = data.length; i < len; i++) {
            if (i === 0) {
                formattedText += data.charAt(0).toUpperCase()
                continue
            }
            if (i !== 0 && data.charAt(i) === data.charAt(i).toUpperCase()) {
                formattedText += ' ' + data.charAt(i).toUpperCase()
                continue
            }
            formattedText += data.charAt(i)
        }
        return formattedText
    }
    if (verifyType === 'individual') {
        
        return (
            <Document>
                <Page size="A4" style={styles.page} wrap={false}>
                    <View style={styles.topHeader_logo_individual}>
                        {/* <Image style={styles.logo_header_individual} src={passLogo} /> */}
                        <Image style={styles.logo_header_individual} src={hostName == "Prembly" ? PremblyLogo : PelezaLogo} />
                    </View>
                    <View style={styles.response_header_individual}>
                        <Text style={styles.response_header_two}>
                            {individual_channel[channel] || channel}
                        </Text>
                        <Text style={styles.response_header_text_two}>Successful</Text>
                    </View>

                    <View style={styles.individual_details}>
                        {(idData?.base64Image || idData?.photo || idData?.Photo || idData?.Picture || idData?.picture) && (
                            <View style={styles.individual_img}>
                                <Image
                                    src={imgUrl(
                                        idData?.base64Image || idData?.photo || idData?.Photo || idData?.Picture || idData?.picture
                                    )}
                                    style={styles.individual_img_alt}
                                />
                            </View>
                        )}
                           {!Array.isArray(idData) &&
                            Object.entries(idData).map((v) => {
                                return (
                                    v[0] !== 'photo' &&
                                    v[0] !== 'Photo' &&
                                    v[0] !== 'signature' &&
                                    v[0] !== 'Signature' && 
                                    v[0] !== 'base64Image' && 
                                    (
                                        (typeof v[1] === "object"  && v[1]) ?
                                        Object.entries(v[1]).map(newVal => (
                                            <View key={newVal[0]}>
                                                
                                                {(typeof newVal[1] === "object") ?
                                                <>
                                                 <Text style={{fontSize:'8px', marginTop:"1%", marginBottom: "0.5%"}}> {newVal[0] !== null && getKeyLabel(newVal[0])}</Text>
                                                    {newVal[1] !== null && Object.entries(newVal[1]).map(innerNewVal => (
                                                        <View key={innerNewVal[0] !== null && innerNewVal[0]} style={styles.test_two}>
                                                           
                                                            {innerNewVal[1] !== null &&
                                                                (typeof innerNewVal[1] === "object") ?
                                                                    Object.entries(innerNewVal[1]).map(innerChildVal => (
                                                                      (innerChildVal[0] !== "calendarItemList") &&  <View key={innerChildVal[0]}  style={[styles.test_two, {flexDirection:'row'}]}>
                                                                            <Text  style={styles.company_details_subtitle_right_two}>
                                                                                { getKeyLabel(innerChildVal[0])?.replace(
                                                                                    /_/g,
                                                                                    ' '
                                                                                )}
                                                                            </Text>
                                                                            {
                                                                               (Array.isArray(innerChildVal[1])) 
                                                                                ?  
                                                                                    (Object.entries(innerChildVal[1]).map(([key, value]) => (
                                                                                        <>
                                                                                        { Object.entries(value).map(([key, newValUp]) => (
                                                                                                <Text style={[styles.child_width]}>
                                                                                                    {getKeyLabel(key)} :   {newValUp ? newValUp : '-'}
                                                                                                </Text>
                                                                                            ))
                                                                                        }
                                                                                        </>                                                                           )
                                                                                    ))
                                                                                : 
                                                                                
                                                                                    (typeof innerChildVal[1] == "object") 
                                                                                    ? 
                                                                                        Object.entries(innerChildVal[1]).map(deepNextedVal => (
                                                                                            <View key={deepNextedVal[0]}>
                                                                                                <Text  style={{fontSize:"8px"}}>
                                                                                                    {getKeyLabel(deepNextedVal[0])} : {deepNextedVal[1] ? deepNextedVal[1] : 'N/A' }
                                                                                                </Text>
                                                                                            </View>
                                                                                        )
                                                                                    )
                                                                                    :
                                                                                        <View > 
                                                                                            <Text style={styles.company_details_subtitle_right_two}> {innerChildVal[1] ? innerChildVal[1] : 'N/A'}</Text> 
                                                                                        </View>
                                                                            } 
                                                                            </View>
                                                                )) 
                                                                :   <View > 
                                                                        <Text style={styles.company_details_subtitle_right_two}>
                                                                            {getKeyLabel(innerNewVal[0])?.replace(
                                                                                    /_/g,
                                                                                    ' '
                                                                            )} 
                                                                        </Text>
                                                                        <Text style={[styles.company_details_subtitle_left_two,]}>
                                                                            {innerNewVal[1] ? innerNewVal[1] : 'N/A'}
                                                                        </Text>
                                                                        
                                                                    </View>
                                                            }
                                                        </View>
                                                    ))}
                                                    </>
                                                    :  <View  style={[styles.test_two]}> 
                                                            <Text style={styles.company_details_subtitle_right_two}>
                                                                {getKeyLabel(newVal[0])?.replace(
                                                                        /_/g,
                                                                        ' '
                                                                )} 
                                                            </Text>
                                                            <Text style={[styles.company_details_subtitle_left_two,]}>
                                                                {newVal[1] && newVal !== null ? newVal[1] : 'N/A'}
                                                            </Text>
                                                        </View>
                                                }
                                            </View>
                                        ))
                                        :
                                        <View key={v[0]}  style={[styles.test_two,]}>
                                             <Text style={styles.company_details_subtitle_right_two}>
                                               {getKeyLabel(v[0])?.replace(
                                                    /_/g,
                                                    ' '
                                                )} 
                                            </Text>
                                            <Text style={[styles.company_details_subtitle_left_two, {width:"30%"}]}>
                                                {v[1] ? v[1] : 'N/A'}
                                            </Text>
                                        </View>
                                    )
                                );
                            })
                        }

                                
                           
                        
                            
                    </View>

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
                            the report was requested by the client. {hostName} International Limited
                            neither warrants, vouches for, or authenticates the reliability of the
                            information contained herein that the records are accurately reported as
                            they were found at the source as of the date and time of this report,
                            whether on a computer information system, retrieved by manual search, or
                            telephonic interviews. The information provided herein shall not be
                            construed to constitute a legal opinion; rather it is a compilation of
                            public records and/or data for your review. {hostName} International Limited
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
                                <Image style={styles.logo} src={hostName == "Prembly" ? PremblyLogo : PelezaLogo} />
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        )
    }
    return (
        <Document>
            <Page size="A4" style={styles.page} wrap={false}>
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
                                        idData?.subscriber ||
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
                    <Text style={styles.company_details_text}>Company Registration Details</Text>
                    {!Array.isArray(idData)
                        ? Object?.entries(idData).map((v) => {
                              return (
                                
                                  v[0] !== 'file_base64' &&
                                  
                                    v[1] !== null && typeof v[1] === 'string' ? (
                                        <View style={styles.test}>
                                            <Text style={[styles.company_details_subtitle_right, {width:"30%"}]}>
                                            { getKeyLabel(v[0])?.replace(
                                                /_/g,
                                                ' '
                                            )}
                                            </Text>
                                            <Text style={[styles.company_details_subtitle_left, {width:"100%"}]}>
                                                {v[1] !== null ? v[1] : 'N/A'}
                                            </Text>
                                        </View>
                                    ) :
                                      <>
                                         <View style={styles.test}>
                                            <Text style={[styles.company_details_subtitle_right, {width:"30%", fontWeight:800}]}>
                                                { getKeyLabel(v[0])?.replace(
                                                    /_/g,
                                                    ' '
                                                )}
                                            </Text>
                                        </View> 

                                        {v[1] !== null && typeof v[1] === "object" && v[0] !== "directors" && ((
                                            Object.entries(v[1]).map(([key, value]) => (
                                            value !== null && typeof value == "object" 
                                                ?
                                                <>
                                                
                                                { isNaN(key) && <View style={styles.test}>
                                                    <Text style={[styles.company_details_subtitle_right, {width:"30%", fontWeight:800}]}>
                                                        { getKeyLabel(key)?.replace(
                                                            /_/g,
                                                            ' '
                                                        ) }
                                                    </Text>
                                                </View> }
                                                
                                                {Object.entries(value).map(([key, childVal]) => {
                                                    return (
                                                        <React.Fragment key={key} >
                                                            {childVal !== null && typeof childVal === "object" ? (
                                                                // If childVal is an object, render its key
                                                                
                                                                <Text style={[styles.company_details_subtitle_right_inner, { width: "30%", backgroundColor:"#e6ecf7"}]}>
                                                                    {getKeyLabel(key)?.replace(/_/g, ' ')} 
                                                                </Text>
                                                            ) : (
                                                                // If childVal is not an object, render the key-value pair directly
                                                                <View style={styles.test}>
                                                                    <Text style={[styles.company_details_subtitle_right, { width: "30%" }]}>
                                                                        {getKeyLabel(key)?.replace(/_/g, ' ')} 
                                                                    </Text>
                                                                    <Text style={[styles.company_details_subtitle_left, { width: "100%" }]}>
                                                                        {childVal ? childVal : 'N/A'}
                                                                    </Text>
                                                                </View>
                                                            )}
                                                            {/* Map over the entries of childVal and render JSX elements for each entry */}
                                                            {typeof childVal === "object" && childVal !== null && Object.entries(childVal).map(([subKey, subChildVal]) => (
                                                                <View style={styles.test} key={subKey}>
                                                                    <Text style={[styles.company_details_subtitle_right, { width: "30%" }]}>
                                                                        { isNaN(subKey) && getKeyLabel(subKey)?.replace(/_/g, ' ')}
                                                                    </Text>
                                                                    {/* Render JSX elements based on the type of subChildVal */}
                                                                    {typeof subChildVal === "object" ? (
                                                                        // If subChildVal is an object, map over its entries and render JSX elements for each entry
                                                                        Object.entries(subChildVal).map(([greatGrandChildKey, greatGrandChildVal]) => (
                                                                            <View style={[styles.test, {borderBottom:"none"}]} key={greatGrandChildKey}>
                                                                                <Text style={[styles.company_details_subtitle_left, { width: "100%" }]}>
                                                                                    {getKeyLabel(greatGrandChildKey)?.replace(/_/g, ' ')}: {greatGrandChildVal || 'N/A'}
                                                                                </Text>
                                                                            </View>
                                                                        ))
                                                                    ) : (
                                                                        // If subChildVal is not an object, render a Text component with its value
                                                                        <Text style={[styles.company_details_subtitle_left, { width: "100%" }]}>
                                                                            {subChildVal || 'N/A'}
                                                                        </Text>
                                                                    )}
                                                                </View>
                                                            ))}
                                                        </React.Fragment>
                                                    );
                                                })}

                                                </>
                                                :
                                                    <View style={styles.test}>
                                                        <Text style={[styles.company_details_subtitle_right, {width:"30%"}]}>
                                                            
                                                        </Text>
                                                        <Text style={[styles.company_details_subtitle_left, {width:"100%"}]}>
                                                            {(value || value !== null) ? value : 'N/A'}
                                                        </Text>
                                                    </View>
                                                
                                                )
                                            ))
                                        )}
                                      </>
                                      
                              )
                          })
                        : Array?.isArray(idData) &&
                          idData.map((v, index) => {
                              return (
                                 v !== null && Object.entries(v).map(([key, value]) =>
                                      value !== null && typeof value === 'object' ? (
                                          value?.map((vt) => <Text></Text>)
                                      ) : (
                                          <View style={styles.test}>
                                              <Text style={styles.company_details_subtitle_right}>
                                                  {key}
                                              </Text>
                                              <Text style={styles.company_details_subtitle_left}>
                                                  {value !== null ? value : 'N/A'}
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
                        { Object?.values(idData?.directors).map((director) => {
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
                        {hostName} International Limited neither warrants, vouches for, or authenticates
                        the reliability of the information contained herein that the records are
                        accurately reported as they were found at the source as of the date and time
                        of this report, whether on a computer information system, retrieved by
                        manual search, or telephonic interviews. The information provided herein
                        shall not be construed to constitute a legal opinion; rather it is a
                        compilation of public records and/or data for your review. {hostName}
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
                        <View style={styles.footer_container}>
                            <Text style={styles.company_details_footer_text}>
                                Secured and powered by
                            </Text>
                            <Image style={styles.logo} src={hostName == "Prembly" ? PremblyLogo : PelezaLogo} />
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export const ResponseVerificationComponent = (props) => {
    const [responseData, setResponseData] = useState(props?.data)
    const [idData, setIdData] = useState({})
    const [idDataKeys, setIdDataKeys] = useState([])
    const [openDirectors, setOpenDirectors] = useState(false)
    const [openDataChild, setOpenDataChild] = useState(false)
    const [dataChild, setDataChild] = useState('')

    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [pdfDataUri, setPdfDataUri] = useState(null)

    useEffect(() => {
        if (responseData?.response_code === '00') {
            setIdData(getIdData(responseData))
            if (typeof getIdData(responseData) === 'object') {
                setIdDataKeys(Object.keys(getIdData(responseData)))
            }
        }
    }, [])

    let getResponseImg = () => {
        var data = getIdData(responseData)
        if (data?.hasOwnProperty('image')) {
            return data.image
        }
        if (data?.hasOwnProperty('Picture')) {
            return data.Picture
        }
        if (data?.hasOwnProperty('base64Image')) {
            return data.base64Image
        } 
        if (data?.hasOwnProperty('base64Image')) {
            return data.base64Image
        }
        if (data?.hasOwnProperty('photo')) {
            return data.photo
        }
        if (data?.hasOwnProperty('Photo')) {
            return data.Photo
        }
        if (data?.hasOwnProperty('DriverImage')) {
            return data.DriverImage
        }
        
        return null
    }

    let getIdData = (data) => {
        if (data?.hasOwnProperty('bvn_data')) {
            return data.bvn_data
        }
        if (data?.hasOwnProperty('nin_data')) {
            return data?.nin_data
        }
        if (data?.hasOwnProperty('frsc_data')) {
            return data?.frsc_data
        }
        if (data?.hasOwnProperty('cac_data')) {
            return data?.cac_data
        }
        if (data?.hasOwnProperty('account_data')) {
            return data?.account_data
        }
        if (data?.hasOwnProperty('data')) {
            return data?.data
        }
        return {}
    }

    let getKeyLabel = (data) => {
        var formattedText = ''
        for (var i = 0, len = data.length; i < len; i++) {
            if (i === 0) {
                formattedText += data.charAt(0).toUpperCase()
                continue
            }
            if (i !== 0 && data.charAt(i) === data.charAt(i).toUpperCase()) {
                formattedText += ' ' + data.charAt(i).toUpperCase()
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
                {responseData?.response_code === '00' ? (
                    <>
                        <SuccessTag />
                        <br />
                    </>
                ) : (
                    <>
                        <FailedTag />
                        <br />
                    </>
                )}
            </div>
            {/* {responseData && (
                <div className='my-2'>
                    <PDFDownloadLink
                        document={<PDFComponent idData={idData} />}
                        fileName={`${idData?.company || idData?.name || idData?.company_name}.pdf`}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download'
                        }
                    </PDFDownloadLink>
                </div>
                )} 
            */}
            {!getResponseImg() || getResponseImg()?.length < 10 ? (
                ''
            ) : (
                <div className="text-center">
                    {responseData?.response_code === '00' ? (
                        <img
                            className="response-img"
                            alt="dashboard-user"
                            src={imgUrl(getResponseImg())}
                        />
                    ) : (
                        ''
                    )}
                </div>
            )}

            {responseData?.response_code === '00' ? (
                <>
                    {
                        <>
                            {idDataKeys?.indexOf('directors') !== -1 && (
                                <div className="text-center mt-4">
                                    <Nav
                                        variant="pills"
                                        defaultActiveKey={0}
                                        className="response-tab-menu"
                                        onSelect={(e) => setOpenDirectors(e == 0 ? false : true)}>
                                        <Nav.Item>
                                            <Nav.Link eventKey={0} as={'div'}>
                                                Document Info
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey={1} as={'div'}>
                                                Directors Info
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    {/* {props.channel === 'KENYA_BRS_DETAIL' && ( */}
                                    <div className="my-2">
                                        {/* <PDFDownloadLink
                                            document={<PDFComponent idData={idData} />}
                                            fileName={`${idData?.company || idData?.name || idData?.company_name}.pdf`}>
                                            {({ blob, url, loading, error }) =>
                                                loading ? 'Loading document...' : 'Download'
                                            }
                                        </PDFDownloadLink> */}
                                        {/* <p>some</p> */}
                                    </div>
                                    {/* )} */}
                                </div>
                            )}
                            {idData &&
                            props?.channel !== 'ADDRESS_NG' &&
                            props?.channel !== 'ADDRESS_NG_STATUS' &&
                            props?.channel !== 'PEZESHA_PETASCORE_SYNC' &&
                            props.channel !== 'VEHICLE-ID' && 
                            // props.channel !== 'KENYA_BRS_DETAIL' &&
                            Object.keys(idData).length !== 0 ? (
                                <PDFDownloadLink
                                    className="d-flex align-items-center btn btn-deep-green mx-auto my-3 px-3"
                                    style={{ width: 'fit-content' }}
                                    document={
                                        <PDFComponent
                                            idData={idData}
                                            verifyType={props?.verifyType}
                                            channel={props?.channel}
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
                            <div className="row justify-content-between mt-3">
                                {!openDirectors &&
                                    idDataKeys?.map((key, index) => {
                                        if (typeof idData[key] !== 'object') {
                                            return (
                                                <span
                                                    className={
                                                        (index + 1) % 2 === 1
                                                            ? 'col-md-6 py-1'
                                                            : 'col-md-6 text-md-end'
                                                    }
                                                    key={index}
                                                    style={{
                                                        borderBottom: '1px solid #ddd',
                                                        paddingBottom: '0px',
                                                        marginBottom: '0px',
                                                    }}>
                                                    {key !== 'photo' &&
                                                        key !== 'Photo' &&
                                                        key !== 'image' &&
                                                        key !== 'DriverImage' &&
                                                        key !== 'file_base64' &&
                                                        key !== 'base64Image' &&
                                                        key !== 'signature' &&
                                                        key !== 'Signature' &&
                                                        key !== 'directors' &&
                                                        key !== 'expirationDate' &&
                                                        key !== 'Picture' &&
                                                        key !== 'service_provider' && (
                                                            <>
                                                                <small>
                                                                    {getKeyLabel(key)?.replace(
                                                                        /_/g,
                                                                        ' '
                                                                    )}
                                                                </small>
                                                                <p>{idData[key] || '-'}</p>
                                                              
                                                            </>
                                                        )}

                                                    {key === 'signature' && (
                                                        <>
                                                            <small>{getKeyLabel(key)}</small> <br />
                                                            {key === 'signature' ? (
                                                                <img
                                                                    style={{ width: '50px' }}
                                                                    src={idData[key]}
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <p>{'N/A'}</p>
                                                            )}
                                                        </>
                                                    )}

                                                    {key === 'expirationDate' && (
                                                        <>
                                                            <small>{getKeyLabel(key)}</small> <br />
                                                            <p>
                                                                <span
                                                                    className={`${
                                                                        idData['documentStatus'] ===
                                                                        'EXPIRED'
                                                                            ? 'text-danger'
                                                                            : ''
                                                                    }`}>
                                                                    {idData[key] || 'N/A'}
                                                                </span>
                                                            </p>
                                                        </>
                                                    )}

                                                    {(key === 'directors' ||
                                                        key === 'service_provider') && <> </>
                                                    }
                                                </span>
                                            )
                                        } else {
                                            return (
                                                <span
                                                    className={
                                                        (key === '0' ||
                                                            key === '1' ||
                                                            key === '2' ||
                                                            key === '3') &&
                                                        (key !== 'directors' ||
                                                            key !== 'signature' ||
                                                            key !== 'Signature' ||
                                                            key !== 'PerformanceSummary' ||
                                                            key !== 'expirationDate' ||
                                                            key !== 'service_provider')
                                                            ? 'col-md-12 py-1'
                                                            : (index + 1) % 2 === 1
                                                            ? 'col-md-6 py-1'
                                                            : 'col-md-6 text-md-end'
                                                    }
                                                    key={index}
                                                    style={{
                                                        borderBottom: `${
                                                            (key === '0' ||
                                                                key === '1' ||
                                                                key === '2' ||
                                                                key === '3') &&
                                                            (key !== 'directors' ||
                                                                key !== 'signature' ||
                                                                key !== 'Signature' ||
                                                                key !== 'PerformanceSummary' ||
                                                                key !== 'expirationDate' ||
                                                                key !== 'service_provider')
                                                                ? ''
                                                                : '1px solid #ddd'
                                                        }`,
                                                        paddingBottom: '0px',
                                                        marginBottom: '0px',
                                                    }}>
                                                    <>
                                                        {idData[key]?.length < 1 ? (
                                                            <>
                                                                <small>
                                                                    {getKeyLabel(key)?.replace(
                                                                        /_/g,
                                                                        ' '
                                                                    )}
                                                                </small>
                                                                <p>N/A</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {(key === '0' ||
                                                                    key === '1' ||
                                                                    key === '2' ||
                                                                    key === '3') &&
                                                                (key !== 'directors' ||
                                                                    key !== 'signature' ||
                                                                    key !== 'Signature' ||
                                                                    key !== 'PerformanceSummary' ||
                                                                    key !== 'expirationDate' ||
                                                                    key !== 'service_provider') ? (
                                                                    <div className="row">
                                                                        {Object?.keys(
                                                                            idData[key]
                                                                        )?.map((val, k) => {
                                                                            return (
                                                                                <span className={(k + 1) % 2 === 1 ? 'col-md-6 py-1' : 'col-md-6 text-md-end'}
                                                                                    key={k} style={{ borderBottom: '1px solid #ddd', paddingBottom: '0px', marginBottom:'0px',}}>
                                                                                    <small>
                                                                                        {val !== null && getKeyLabel(val)?.replace( /_/g, ' ' )}
                                                                                    </small>
                                                                                    {typeof idData[key][val] == 'object' && idData[key][val] !== null  ?
                                                                                        Object.entries(idData[key][val])?.map(([newKey, newVal], index) => {
                                                                                            if (typeof newVal === 'object') {
                                                                                                return Object.entries(newVal).map(([childKey, childVal], childIndex) => (
                                                                                                    <React.Fragment key={childIndex}>
                                                                                                        <small>{getKeyLabel(childKey)?.replace(/_/g, " ")}</small>
                                                                                                        {typeof childVal === 'object' ?
                                                                                                            Object.entries(childVal).map(([grandChildKey, grandChildVal], grandChildIndex) => (
                                                                                                                <React.Fragment key={grandChildIndex}>
                                                                                                                    <small>{getKeyLabel(grandChildKey)?.replace(/_/g, " ")}</small>
                                                                                                                    {typeof grandChildVal === 'object' ?
                                                                                                                        Object.entries(grandChildVal).map(([greatGrandChildKey, greatGrandChildVal], greatGrandChildIndex) => (
                                                                                                                            <React.Fragment key={greatGrandChildIndex}>
                                                                                                                                <p>{getKeyLabel(greatGrandChildKey)?.replace(/_/g, " ")}: {`${greatGrandChildVal || '-'}`}</p>
                                                                                                                             </React.Fragment>
                                                                                                                        ))
                                                                                                                        :
                                                                                                                        <p>{`${grandChildVal || '-'}`}</p>
                                                                                                                    }
                                                                                                                </React.Fragment>
                                                                                                            ))
                                                                                                            :
                                                                                                            <p>{`${childVal || '-'}`}</p>
                                                                                                        }
                                                                                                    </React.Fragment>
                                                                                                ));
                                                                                            }
                                                                                            
                                                                                            else{
                                                                                               return <p key={index}>
                                                                                                    {`${newKey}: ${newVal}` || '-'}
                                                                                                </p>
                                                                                            }
                                                                                          
                                                                                        }
                                                                                        ) 
                                                                                        :
                                                                                        <p>
                                                                                            {`${idData[key][val]}` || '-'}
                                                                                        </p>
                                                                                    }
                                                                                   
                                                                                </span>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                    { getKeyLabel(
                                                                                    key
                                                                                ).replace(
                                                                                    /_/g,
                                                                                    ' '
                                                                                ) !== 'Directors' ? (
                                                                        <div
                                                                            className={`d-flex ${
                                                                                (index + 1) % 2 ===
                                                                                1
                                                                                    ? 'justify-content-md-start'
                                                                                    : 'justify-content-md-end pt-2'
                                                                            }`}>
                                                                            <small>
                                                                                {getKeyLabel(
                                                                                    key
                                                                                ).replace(
                                                                                    /_/g,
                                                                                    ' '
                                                                                )}
                                                                            </small>
                                                                            {openDataChild &&
                                                                            dataChild ===
                                                                                getKeyLabel(key) ? (
                                                                                <i
                                                                                    className="ri-arrow-up-s-line ri-lg ms-3"
                                                                                    style={{
                                                                                        cursor: 'pointer',
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        setOpenDataChild(
                                                                                            false
                                                                                        )
                                                                                        setDataChild(
                                                                                            ''
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            ) : (
                                                                                <i
                                                                                    className="ri-arrow-down-s-line ri-lg ms-3"
                                                                                    style={{
                                                                                        cursor: 'pointer',
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        setOpenDataChild(
                                                                                            true
                                                                                        )
                                                                                        setDataChild(
                                                                                            getKeyLabel(
                                                                                                key
                                                                                            )
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                                ) : '-'}

                                                                        {openDataChild &&
                                                                            dataChild ===
                                                                                getKeyLabel(
                                                                                    key
                                                                                ) && (
                                                                                <div>
                                                                                    {idData[key] &&
                                                                                        Object?.keys(idData[key])?.map((val) => {
                                                                                                if (
                                                                                                    idData[key][val] ?.length === undefined && typeof idData[key][val] === 'object'
                                                                                                ) {
                                                                                                    return  idData[key][val] && Object?.keys(idData[key][val])?.map((newVal) => {
                                                                                                        <small>
                                                                                                            {getKeyLabel(newVal)?.replace( /_/g, ' ' )}
                                                                                                        </small>
                                                                                                            return (typeof idData[key][val][newVal] === "object") ? 
                                                                                                            <>
                                                                                                                <small>
                                                                                                                    {newVal !== null && getKeyLabel(newVal)?.replace( /_/g, ' ' )} <br />
                                                                                                                </small>
                                                                                                               
                                                                                                                </>
                                                                                                                :<>
                                                                                                                    <small>
                                                                                                                        {getKeyLabel(newVal)?.replace( /_/g, ' ' )}
                                                                                                                    </small>
                                                                                                                    <p>
                                                                                                                        {`${idData[key][val][newVal]}` || '-'}
                                                                                                                    </p>
                                                                                                                </>
                                                                                                        }
                                                                                                    )
                                                                                                } else {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <small>
                                                                                                                {getKeyLabel(val )?.replace( /_/g, ' ' )} 
                                                                                                            </small>
                                                                                                            {getKeyLabel( val) === 'Individual _image' || getKeyLabel(val) === 'Residence _image' ||
                                                                                                            getKeyLabel( val ) === 'Signature' ? ( <img  src={ idData[key][val]} alt="preview" 
                                                                                                            style={{ height: '', objectFit: 'cover', }} />) : 
                                                                                                            ( typeof idData[key][val] === "object") ? 
                                                                                                             (idData[key][val].length > 0 ) ?
                                                                                                              Object?.keys(idData[key][val])?.map(newVal => {
                                                                                                                if(!Array.isArray(newVal) && typeof idData[key][val][newVal] === "object"){
                                                                                                                   return (Object.entries(idData[key][val][newVal]).map(([innerKey, innerValue]) => (
                                                                                                                    <div key={innerKey}>
                                                                                                                        <small>
                                                                                                                            {getKeyLabel(innerKey)?.replace(/_/g, " ")}
                                                                                                                        </small>
                                                                                                                      
                                                                                                                        {Array.isArray(innerValue) ?  
                                                                                                                          Object.entries(innerValue).map(([key, value]) => (
                                                                                                                            Object.entries(value).map(([key, newVal]) => (
                                                                                                                                <p key={key}>
                                                                                                                                    {`${key}: ${newVal}` || "Shale"}
                                                                                                                                </p>
                                                                                                                                  ))
                                                                                                                              ))
                                                                                                                        : 
                                                                                                                         <p>{`${JSON.stringify(innerValue).replace(/[\{\}"]/g, "")}` || "N/A"}</p>
                                                                                                                        }
                                                                                                                        
                                                                                                                      </div>
                                                                                                                  )))
                                                                                                                   
                                                                                                                }else{ 
                                                                                                                    return(
                                                                                                                        <>
                                                                                                                           <small>
                                                                                                                                {getKeyLabel(newVal)?.replace(/_/g, " ")}
                                                                                                                            </small>
                                                                                                                            <p>{`${idData[key][val][newVal]}` || "N/A"}</p>
                                                                                                                        </>
                                                                                                                    )
                                                                                                                }
                                                                                                              
                                                                                                        }) : <p>
                                                                                                                    {`${idData[key][val]}` ||
                                                                                                                        '-'}
                                                                                                                        
                                                                                                                </p>
                                                                                                        : 
                                                                                                            
                                                                                                            (
                                                                                                                <p>
                                                                                                                    {`${idData[key][val]}` ||
                                                                                                                        '-'}
                                                                                                                        
                                                                                                                </p>
                                                                                                            )}
                                                                                                        </>
                                                                                                    )
                                                                                                }
                                                                                            }
                                                                                        )}
                                                                                </div>
                                                                            )}
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </>
                                                </span>
                                            )
                                            // }
                                        }
                                    })}
                            </div>
                            {openDirectors &&
                                idDataKeys?.filter((dir) => dir === 'directors').length > 0 && (
                                    <PaginatedList
                                        list={idData['directors']}
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
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>Fullname</small>
                                                                <p>
                                                                    {value?.name ||
                                                                        `${value?.firstname} ${value?.otherName} ${value?.surname}`}
                                                                </p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Gender</small>
                                                                <p>{value?.gender || '-'}</p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>Date of Birth</small>
                                                                <p>
                                                                    {/* {moment(
                                                                        value?.dateOfBirth
                                                                    ).format(
                                                                        'MMMM Do YYYY, h:mm'
                                                                    ) || '-'} */}
                                                                    {'-'}
                                                                </p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Email</small>
                                                                <p>{value?.email || '-'}</p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>Phone Number</small>
                                                                <p>{value?.phoneNumber || '-'}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Address</small>
                                                                <p>{value?.address || '-'}</p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>City</small>
                                                                <p>{value?.city || '-'}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>LGA</small>
                                                                <p>{value?.lga || '-'}</p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>State</small>
                                                                <p>{value?.state || '-'}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Postcode</small>
                                                                <p>{value?.postcode || '-'}</p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>Country</small>
                                                                <p>
                                                                    {value?.countryFk?.name || '-'}
                                                                </p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Nationality</small>
                                                                <p>{value?.nationality || '-'}</p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>Identity Number</small>
                                                                <p>
                                                                    {value?.identityNumber || value?.id_number || '-'}
                                                                </p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Identity Type</small>
                                                                <p>
                                                                    {value?.id_type ||
                                                                        '-'}
                                                                </p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>Occupation</small>
                                                                <p>{value?.occupation || '-'}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Date of Appointment</small>
                                                                <p>
                                                                    {/* {moment(
                                                                        value?.dateOfAppointment
                                                                    ).format(
                                                                        'MMMM Do YYYY, h:mm'
                                                                    ) || '-'} */}
                                                                    {'-'}
                                                                </p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                        <div className="row justify-content-between">
                                                            <span className="col-md-6">
                                                                <small>Shares Alloted</small>
                                                                <p>
                                                                    {value?.numSharesAlloted ||
                                                                        value?.shares ||
                                                                        '-'}
                                                                </p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Type of Shares</small>
                                                                <p>{value?.typeOfShares || '-'}</p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                      
                                                        <div className="row justify-content-between">
                                                        <span className="col-md-6">
                                                                <small>Percentage</small>
                                                                <p>{value?.percentage || '-'}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Status</small>
                                                                <p>
                                                                    {value?.status === 'ACTIVE' ? (
                                                                        <ActiveTag />
                                                                    ) : (
                                                                        '-'
                                                                    )}
                                                                </p>
                                                            </span>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    />
                            )}
                        </>
                    }
                </>
            ) : (
                <h5 className="text-center mt-5">{responseData.message}</h5>
            )}
        </div>
    )
}
