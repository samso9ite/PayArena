// import moment from 'moment';
import React, { useEffect, useState } from 'react';
// import { PaginatedList } from 'react-paginated-list';
import EmailIntelligenceResponseComp from '../../products/identityradar/email/response';
import IPIntelligenceResponseComp from '../../products/identityradar/ip/response';
import NameIntelligenceResponseComp from '../../products/identityradar/name/response';
import PhoneIntelligenceResponseComp from '../../products/identityradar/phone/response';
// import { ActiveTag, FailedTag, SuccessTag, imgUrl, InactiveTag } from '../../utils';

export const RadarReportResponseComponent = (props) => {

    // const [requestData, setRequestData] = useState(props?.data?.request_data || {})
    // const [responseData, setResponseData] = useState(props?.data)
    // const [idData, setIdData] = useState({})
    // const [idDataKeys, setIdDataKeys] = useState([])

    // const [openDirectors, setOpenDirectors] = useState(false)
    // const [openDataChild, setOpenDataChild] = useState(false)
    // const [dataChild, setDataChild] = useState("")

    // console.log(props?.data)
    // console.log(props?.dataName)

    return (
        <div className="">
            {props?.dataName === "IP INTELLIGENCE" &&
                <IPIntelligenceResponseComp data={props?.data}/>
            }
            {props?.dataName === "EMAIL INTELLIGENCE" &&
                <EmailIntelligenceResponseComp data={props?.data}/>
            }
            {props?.dataName === "NAME INTELLIGENCE" &&
                <NameIntelligenceResponseComp data={props?.data}/>
            }
            {props?.dataName === "PHONE INTELLIGENCE" &&
                <PhoneIntelligenceResponseComp data={props?.data}/>
            }
            {/* <div className="text-center">
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
            </div> */}


            
        </div>
    );
}