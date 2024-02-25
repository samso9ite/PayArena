import { useState } from 'react'
import { Spinner, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { radarEmailIntelligenceRequest } from '../../../../redux/actions/products/identityradar/radarCheck'
import { RootState } from '../../../../redux/reducers'
import NotificationToast from '../../../utils/notifToast'
import EmailIntelligenceResponseComp from './response'
import useTourGuide from '../../../../hooks/useTourGuide'

export default function EmailIntelligenceComp(props: any) {
    interface ICheckType {
        checkType: any
        includes: any
    }
    const [tourGuide, setTourGuide] = useTourGuide()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [email, setEmail] = useState('')
    const [result, setResult] = useState(false)
    const [checkType, setCheckType] = useState([])

    const EmailIntelligenceState = useSelector(
        (state: RootState) => state.radarEmailIntelligenceReducer
    )

    let dispatch = useDispatch()

    let clearReq = () => {
        setEmail('')
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

    let verifyEmail = () => {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/

        const callback = (data: any) => {
            if (data.success) {
                setNotifTitle('Success')
                // setNotif(data.detail)
                setNotifVal(true)
                props.pushShowSelect()
                resetResultPage()
            } else {
                setNotifTitle('Error')
                setNotif(data.response?.message)
                setNotifVal(true)
            }
        }

        if (!email) {
            setNotifTitle('Error')
            setNotif('Please enter an email address')
            setNotifVal(true)
            return
        }
        if (checkType?.length < 1) {
            setNotifTitle('Error')
            setNotif('Please select atleast one check type')
            setNotifVal(true)
            return
        }
        if (!emailFormat.test(email)) {
            setNotifTitle('Error')
            setNotif('Invalid email format')
            setNotifVal(true)
            return
        }

        let data: any = {
            values: {
                email,
                check_type: checkType,
            },

            callback,
        }
        dispatch(radarEmailIntelligenceRequest(data))
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
                            <div
                                className={`${
                                    tourGuide.currentStep === 34 ? 'tour-guide-element-preview' : ''
                                }`}>
                                <label htmlFor="email">
                                    Email Address <span style={{ color: 'red' }}> *</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    onChange={(email) => setEmail(email.target.value)}
                                    placeholder="johndoe@prembly.com"
                                />
                            </div>

                            <div className="mt-5">
                                <h6>
                                    {' '}
                                    Choose the result(s) you would want for this check{' '}
                                    <span style={{ color: 'red' }}> *</span>
                                </h6>
                                <div className="d-flex mt-3">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        // onChange={(bas)=> bas.target.checked === true ? pushSetType("basic") : ""}
                                        onChange={() => pushSetType('basic')}
                                    />
                                    <p className="ps-2 mb-0">Get Basic Email Data</p>
                                </div>
                                <div className="d-flex mt-3">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        onChange={() => pushSetType('domain_info')}
                                    />
                                    <p className="ps-2 mb-0">Get Domain Data</p>
                                </div>
                                <div className="d-flex mt-3">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                        onChange={() => pushSetType('email_info')}
                                    />
                                    <p className="ps-2 mb-0">Get Advanced Email Data</p>
                                </div>
                            </div>
                            <div
                                className={
                                    tourGuide.currentStep === 35 ? 'app-guide-run-check' : ''
                                }>
                                <button
                                    className={`btn btn-deep-green ${
                                        tourGuide.currentStep === 35 && tourGuide.onGoing
                                            ? 'my-3 px-4'
                                            : 'px-4 my-5'
                                    }`}
                                    onClick={verifyEmail}>
                                    {EmailIntelligenceState?.isLoading ? (
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
                </div>
            )}

            {result && (
                <EmailIntelligenceResponseComp
                    data={EmailIntelligenceState?.resp?.response}
                    request={email}
                    goBack={resetResultPage}
                    pushShowSelect={props.pushShowSelect}
                />
            )}
        </>
    )
}
