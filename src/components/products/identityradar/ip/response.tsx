import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import global from '../../../../redux/constants/global'

export default function IPIntelligenceResponseComp(props: any) {
    const [geolocationData, setGeolocationData] = useState([])
    const [atsData, setAtsData] = useState([])

    useEffect(() => {
        if(props?.data?.geolocation){
            let geoData: any = Object.keys(props?.data?.geolocation)
            setGeolocationData(geoData)
        }
        if(props?.data?.ats){
            let atsData: any = Object.keys(props?.data?.ats)
            setAtsData(atsData)
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

    // console.log(props?.data)
    return (
        <div className='radar-response-area mb-5'>

            { window.location.href === `${global.appBaseUrl}Identityradar/Radar-Check` &&
                <>
                    <button className='btn btn-back my-4 d-flex align-items-center'
                        onClick={()=>{
                            props.goBack()
                            props.pushShowSelect()
                        }} 
                    >  
                        <i className="ri-arrow-left-line me-2 ri-xl" />
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
                {geolocationData?.length > 0 &&
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Geolocation Data Result</h6><hr />
                                <div className='row justify-content-between mt-2'>
                                    {geolocationData?.map((item:any, i:number) => (
                                        <span className={(i + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={i}>
                                            <>
                                                <small>{getKeyLabel(item)?.replace(/_/g, " ")}</small>
                                                <p>{props?.data?.geolocation[item] || 'Not Available'}</p>
                                            </>
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                }
                
                {atsData?.length > 0 &&
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Autonomous System Data Result</h6><hr />
                                <div className='row justify-content-between mt-2'>
                                    {atsData?.map((item:any, i:number) => (
                                        <span className={(i + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={i}>
                                            <>
                                                <small>{getKeyLabel(item)?.replace(/_/g, " ")}</small>
                                                <p>
                                                    {(props?.data?.ats[item] === true ? "True" : 
                                                    props?.data?.ats[item] === false ? "False" : 
                                                    'Not Available')}
                                                </p>

                                                {/* { typeof props?.data?.ats[item] == "boolean" ? 
                                                    <p>{stringify(props?.data?.ats[item])}</p> :
                                                    Array.isArray(props?.data?.ats[item]) ? "" :
                                                    <p>{(props?.data?.ats[item] || 'Not Available')}</p>
                                                } */}
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
