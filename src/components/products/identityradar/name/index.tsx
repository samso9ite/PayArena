import { useState } from 'react'
import { Spinner, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { radarNameIntelligenceRequest } from '../../../../redux/actions/products/identityradar/radarCheck'
import { RootState } from '../../../../redux/reducers'
import NotificationToast from '../../../utils/notifToast'
import NameIntelligenceResponseComp from './response'

export default function NameIntelligenceComp(props: any) {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [name, setName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [result, setResult] = useState(false)
    const [checkType, setCheckType] = useState([])
    const [requestData, setRequestData] = useState({})
    const [responseData, setResponseData] = useState({})

    const NameIntelligenceState = useSelector(
        (state: RootState) => state.radarNameIntelligenceReducer
    )

    let dispatch = useDispatch()

    let requestDataa = {
        name,
        dob,
        gender,
        checkType,
    }

    let clearReq = () => {
        setName('')
        setGender('')
        setDob('')
        setCheckType([])
    }

    let resetResultPage = () => {
        clearReq()
        setResult(!result)
    }

    let pushSetType = (type: string) => {
        var typeData: any = checkType

        var typeIdx = typeData.findIndex((typ: string) => typ === type)

        if (typeIdx !== -1) {
            typeData.splice(typeIdx, 1)
        } else {
            typeData.push(type)
        }
        setCheckType(typeData)
    }

    let verifyName = () => {
        const callback = (data: any) => {
            if (data.success) {
                setNotifTitle('Success')
                // setNotif(data.detail)
                setNotifVal(true)
                props.pushShowSelect()
                setResponseData(data?.response)
                setRequestData(requestDataa)
                resetResultPage()
            } else {
                // setNotifTitle("Error")
                // setNotif(data.response?.message)
                // setNotifVal(true)
                if (data?.detail) {
                    setNotifTitle('Error')
                    setNotif(data.detail)
                    setNotifVal(true)
                } else if (data?.status === 400) {
                    setNotifTitle('Error')
                    setNotif(
                        typeof data?.response?.message === 'object'
                            ? data?.response?.message?.message
                            : data?.response?.message
                    )
                    setNotifVal(true)
                } else {
                    setNotifTitle('Error')
                    setNotifVal(true)
                    setNotif(
                        'An error occurred, hang on a minute as we work towards fixing this error.'
                    )
                }
            }
        }

        if (!name) {
            setNotifTitle('Error')
            setNotif('Please enter a name')
            setNotifVal(true)
            return
        }
        if (checkType?.length < 1) {
            setNotifTitle('Error')
            setNotif('Please select atleast one check type')
            setNotifVal(true)
            return
        }

        let data: any = {
            values: {
                search_value: name,
                dob,
                gender,
                check_type: [
                    // "criminal",
                    'ofac',
                    'pep',
                    'sanction',
                ],
            },

            callback,
        }
        dispatch(radarNameIntelligenceRequest(data))
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
                            <div className="">
                                <label htmlFor="name">
                                    Name <span style={{ color: 'red' }}> *</span>
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    className="form-control"
                                    onChange={(name) => setName(name.target.value)}
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="name">Date of Birth</label>
                                <input
                                    type="date"
                                    value={dob}
                                    className="form-control"
                                    onChange={(e) => setDob(e.target.value)}
                                    placeholder="27-09-1900"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="name">Gender</label>
                                <select
                                    value={gender}
                                    className="form-select"
                                    onChange={(val) => setGender(val.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div className="mt-5">
                                <h6>
                                    {' '}
                                    Choose the result(s) you would want for this check{' '}
                                    <span style={{ color: 'red' }}> *</span>
                                </h6>
                                {/* <div className="d-flex mt-3">
                                    <input type="checkbox" name="" id="" />
                                    <p className="ps-2 mb-0">Get Criminal data</p>
                                </div> */}
                                <div className="d-flex mt-3">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        onChange={() => pushSetType('pep')}
                                    />
                                    <p className="ps-2 mb-0">Get PEP data</p>
                                </div>
                                <div className="d-flex mt-3">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        onChange={() => pushSetType('ofac')}
                                    />
                                    <p className="ps-2 mb-0">Get OFAC data</p>
                                </div>
                                <div className="d-flex mt-3">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        onChange={() => pushSetType('sanction')}
                                    />
                                    <p className="ps-2 mb-0">Get SANCTION LIST data</p>
                                </div>
                            </div>

                            <button className="btn btn-deep-green px-4 my-5" onClick={verifyName}>
                                {NameIntelligenceState.isLoading ? (
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
                                ) : (
                                    ' Run Check'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* {result &&
                <NameIntelligenceResponseComp data={NameIntelligenceState?.resp?.response} request={name} goBack={resetResultPage} pushShowSelect={props.pushShowSelect}/>
            } */}

            {result && (
                <NameIntelligenceResponseComp
                    data={responseData}
                    request={requestData}
                    goBack={resetResultPage}
                    pushShowSelect={props.pushShowSelect}
                />
            )}
        </>
    )
}
