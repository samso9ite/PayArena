import { useEffect, useState } from 'react'
import { Spinner, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { radarEmailIntelligenceRequest } from '../../../../redux/actions/products/identityradar/radarCheck'
import { RootState } from '../../../../redux/reducers'
import NotificationToast from '../../../utils/notifToast'
import useTourGuide from '../../../../hooks/useTourGuide'
import { Player } from '@lottiefiles/react-lottie-player'
import successVerifGif from '../../../../assets/successVerif.json'
import { identitypassBulkVerificationRequest } from '../../../../redux/actions/products/identitypass/verification'

export default function EmailIntelligenceBulkComp(props: any) {
    // interface ICheckType {
    //     checkType: any
    //     includes: any
    // }
    // const [tourGuide, setTourGuide] = useTourGuide()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [result, setResult] = useState(false)

    const [doc, setDoc] = useState<any>(null)

    const identitypassBulkVerifState = useSelector((state: RootState) => state.identitypassBulkVerificationReducer);

    let dispatch = useDispatch()

    useEffect(() => {
        resetResultPage()
    }, [props?.type])
    
    let clearReq = () => {
        setDoc(null)
    }

    let resetResultPage = () => {
        clearReq()
        setResult(!result)
    }


    let performBulkVerification = () => {

        setResult(false)

        const callback = (data: any) => {
            if (data.status) {
                setResult(true)
                // setUpdatedResponse(data)
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
                // setUpdatedResponse(data)
            }
        };

        if (!doc) {
            setNotifTitle('Error')
            setNotif(`Please upload bulk ${props?.type} document`)
            setNotifVal(true)
            return
        }

        let data: any = {
            values: {
                product: "identityradar",
                type: props?.type?.toUpperCase() ,
                file: doc,
            },
            callback,
        };

        dispatch(identitypassBulkVerificationRequest(data))
    }

    return (
        <>
            {!result && (
                <div className="col-md-6 mb-5 radar-request-area">
                    {notif && notifVal && (
                        <NotificationToast
                            title={notifTitle}
                            message={notif}
                            closeNotif={() => setNotifVal(!notifVal)}
                        />
                    )}

                    <div className="card">
                        <div className="card-body p-0 px-md-3">

                            <label htmlFor="document">Upload Document <span style={{ color: "red" }}> *</span></label>

                            {props?.templateLink &&
                                <a href={props?.templateLink} className="link text-end" target="_blank" rel="noopener noreferrer">
                                    Download {props?.endpName} template
                                </a>
                            }

                            {!doc ?
                                <div className="file-input-area p-2">
                                    <div className="">
                                        <input type="file"
                                            accept=".csv, .xlsx, .xls"
                                            onChange={(doc: any) => {
                                                setDoc(doc.target.files[0])
                                            }}
                                        />
                                        <small>Maximum file size: 1MB</small>
                                        <small>Supported file types: (.csv, .xlsx, .xls).</small>
                                    </div>
                                </div>
                                :
                                <div className="card">
                                    <div className="card-body py-1">
                                        <div className="row justify-content-between ">
                                            <div className="col-md-7">
                                                <p className='p-0'>Document. {doc?.name.substr(-4)}</p>
                                            </div>
                                            <div className="col-md-3">
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <i className=' ri-delete-bin-6-line ri-lg' style={{ cursor: "pointer", marginTop: "10px", color: "#E95470" }}
                                                        onClick={() => {
                                                            setDoc("")
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }


                            <button className='btn btn-deep-green w-100 py-3 mt-5' disabled={!doc ? true : false } onClick={performBulkVerification}>
                                {identitypassBulkVerifState.isLoading
                                    ?
                                    <div>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    "Verify"
                                }

                            </button>


                        </div>
                    </div>
                </div>
            )}

            {result && (
                <div className="main-modal ">
                    <div className="main-modal-content card col-md-6 col-lg-4 mx-auto">
                        <span
                            onClick={() => {
                                setResult(false)
                                resetResultPage()
                            }}>
                            <i className="ri-close-line close-modal" />
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body text-center">
                                <div className="col-md-6 mx-auto mt-4">
                                    <Player
                                        src={successVerifGif}
                                        className="player"
                                        loop
                                        autoplay
                                    />
                                </div>
                                <div className="px-2">
                                    <div className="text-center mb-3">

                                        <div className="my-5">
                                            <h5>Verification in progress</h5>
                                            <p>Your verification is being processed, please check your report log anytime from now.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
