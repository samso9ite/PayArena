import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { applicationInfoRequest } from "../../../../../redux/actions/apiLibraries/applications"
import { RootState } from "../../../../../redux/reducers"
import NotificationToast from "../../../../utils/notifToast"

export default function BulkChannelComp(props: any) {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [doc, setDoc] = useState<any>(null)
    const [app, setApp] = useState("")
    
    const applicationInfoState = useSelector((state: RootState) => state.applicationInfoReducer)

    let dispatch = useDispatch()

    useEffect(() => {
        getApps()
    }, [])

    useEffect(() => {
        setDoc(null)
    }, [props?.channel])

    let getApps = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(applicationInfoRequest(data))
    }

    let verifyData = () => {
        let data = {
            doc,
            appId:app
        }
        if (!app) {
            setNotifTitle("Error")
            setNotif("Please select an App")
            setNotifVal(true)
        }
        else if (!doc) {
            setNotifTitle("Error")
            setNotif("Please upload bulk document")
            setNotifVal(true)
        }
        else {
            props?.verify(data)
        }
    }

    // console.log(props?.templateLink)

    // console.log(applicationInfoState?.resp)

    return (
        <div>
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}


            <div>
                <label htmlFor="app">Select App <span style={{ color: "red" }}> *</span></label>
                <div className="">
                    <select value={app} className="form-select" onChange={e => setApp(e.target.value)}>
                        <option value="">Select App</option>
                        {applicationInfoState?.resp?.data?.map((val:any, i:number)=>(
                            <option value={val?.id}>{val?.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="document">Upload Document <span style={{ color: "red" }}> *</span></label>

                {props?.templateLink &&
                    <a href={props?.templateLink} download className="link text-end ms-auto" target="_blank" rel="noopener noreferrer">
                        Download {props?.endpName} template
                    </a>
                }

                {!doc ?
                    <div className="file-input-area p-2">
                        <div className="">
                            <input type="file"
                                accept=".csv, .xlsx, .xls"
                                onChange={(doc: any) => {
                                    // imageHandler(doc)
                                    // updateDoc(doc,"busCert")
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

            </div>

            <button className='btn btn-deep-green w-100 py-3 mt-5' onClick={verifyData}>
                {props?.verifIsLoading
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
    )
}
