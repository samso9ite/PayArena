import React, { useEffect, useState } from 'react'
import global from '../../../../redux/constants/global'

export default function EmailIntelligenceResponseComp(props:any) {
    const [basicData, setBasicData] = useState([])
    const [domainData, setDomainData] = useState([])
    const [emailData, setEmailData] = useState([])

    useEffect(() => {
        if(props?.data?.basic){
            let basData: any = Object.keys(props?.data?.basic) || []
            setBasicData(basData)
        }
        if(props?.data?.domain_info){
            let domData: any = Object.keys(props?.data?.domain_info) || []
            setDomainData(domData)
        }
        // if(props?.data?.domain){
        //     let domData: any = Object.keys(props?.data?.domain) || []
        //     setDomainData(domData)
        // }
        if(props?.data?.email_info){
            let mailData: any = Object.keys(props?.data?.email_info) || []
            setEmailData(mailData)
        }
    }, [])



    let getKeyLabel = (val:any) => {
        var formattedText = ""
        for (var i = 0, len = val.length; i < len; i++) {
            if (i === 0) {
                formattedText += val.charAt(0).toUpperCase()
                continue
            }
            if ((i !== 0) && (val.charAt(i) === val.charAt(i).toUpperCase())) {
                formattedText += " " + val.charAt(i).toUpperCase()
                continue
            }
            formattedText += val.charAt(i)
        }
        return formattedText
    }
    return (
        <div className='radar-response-area'>
            { window.location.href === `${global.appBaseUrl}Identityradar/Radar-Check` &&
                <>
                    <button className='btn btn-back my-4 d-flex align-items-center' 
                        onClick={()=>{
                            props.goBack()
                            props.pushShowSelect()
                        }}
                    >
                        <i className="ri-arrow-left-line me-2 ri-xl"/>
                        Back
                    </button>

                    <div className="card response-request">
                        <div className="card-body">
                            <h5>Your Manual Checker result is ready</h5>
                            {/* <small>Data input : “{props?.request}”</small> */}
                        </div>
                    </div>
                </>
            }

            <div className="row">
                {domainData?.length > 0 &&
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Domain Data Result</h6><hr />
                                <div className='row justify-content-between mt-2'>
                                    {domainData?.map((item:any, i:number) => (
                                        <span className={(i + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={i}>
                                            <>
                                                <small>{getKeyLabel(item)?.replace(/_/g, " ")}</small>
                                                <p>{props?.data?.domain_info[item] || 'Not Available'}</p>
                                            </>
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                }
                {basicData?.length > 0 &&
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Basic Email Data Result</h6><hr />
                                <div className='row justify-content-between mt-2'>
                                    {basicData?.map((item:any, i:number) => (
                                        <span className={(i + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={i}>
                                            <>
                                                <small>{getKeyLabel(item)?.replace(/_/g, " ")}</small>
                                                <p>{props?.data?.basic[item] || 'Not Available'}</p>
                                            </>
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                }
                {emailData?.length > 0 &&
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Advanced Email Data Result</h6><hr />
                                <div className='row justify-content-between mt-2'>
                                    {emailData?.map((item:any, i:number) => (
                                        <span className={(i + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={i}>
                                            <>
                                                <small>{getKeyLabel(item)?.replace(/_/g, " ")}</small>
                                                {/* <p>{props?.data?.email_info[item] || 'Not Available'}</p> */}
                                                <p>
                                                    {typeof props?.data?.email_info[item] === 'object' ? "" 
                                                    : (props?.data?.email_info[item][0] ? "Registered" : "Not Registered")}
                                                </p>
                                                {
                                                    // props?.data?.email_info[item]?.map((val:any, ind:number) =>(
                                                    //     <p>{JSON.stringify(val) || 'Not Available'}</p>
                                                    // ))
                                                }
                                            </>
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                }

            </div>

        </div>
    )
}
