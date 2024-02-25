import React, { useEffect, useState } from 'react'
import global from '../../../../redux/constants/global'

export default function PhoneIntelligenceResponseComp(props: any) {
    const [basicData, setBasicData] = useState([])
    const [advanceData, setAdvanceData] = useState([])
    const [whatsAppData, setWhatsAppData] = useState([])

    useEffect(() => {
        if(props?.data?.basic){
            let basData: any = Object.keys(props?.data?.basic || [])
            setBasicData(basData)
        }
        if(props?.data?.advance){
            let advData: any = Object.keys(props?.data?.advance || [])
            setAdvanceData(advData)
        }
        if(props?.data?.whatsapp){
            let whatsappData: any = Object.keys(props?.data?.whatsapp || [])
            setWhatsAppData(whatsappData)
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
                {basicData?.length > 0 &&
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Basic Phone Data Result</h6><hr />
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
                {whatsAppData?.length > 0 &&
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Whatsapp Phone Data Result</h6><hr />
                                {props?.data?.whatsapp?.profile_photo &&
                                    <div className="text-center my-4">
                                        <img className="response-img" src={props?.data?.whatsapp?.profile_photo} alt="" /><br />
                                    </div>
                                }
                                <div className='row justify-content-between mt-2'>
                                    {whatsAppData?.map((item:any, i:number) => {
                                        if (item === "profile_photo"){
                                            return (
                                                <div></div>
                                            )
                                        }
                                        else return (
                                            <span className={(i + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={i}>
                                                <>
                                                    <small>{getKeyLabel(item)?.replace(/_/g, " ")}</small>
                                                    <p>{props?.data?.whatsapp[item] || 'Not Available'}</p>
                                                </>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                }
                {advanceData?.length > 0 &&
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Advanced Phone Data Result</h6><hr />
                                <div className='row justify-content-between mt-2'>
                                    {Object.keys(props?.data?.advance?.basic)?.map((item:any, i:number) => (
                                        <span className={(i + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={i}>
                                            <>
                                                <small>{getKeyLabel(item)?.replace(/_/g, " ")}</small>
                                                <p>{props?.data?.advance?.basic[item] || 'Not Available'}</p>
                                            </>
                                        </span>
                                    ))}
                                </div>
                                <div className='row justify-content-between mt-2'>
                                    {Object.keys(props?.data?.advance?.social)?.map((item:any, i:number) => (
                                        <span className={(i + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={i}>
                                            <>
                                                <small>{getKeyLabel(item)?.replace(/_/g, " ")}</small>
                                                <p>{props?.data?.advance?.social[item] || 'Not Available'}</p>
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
