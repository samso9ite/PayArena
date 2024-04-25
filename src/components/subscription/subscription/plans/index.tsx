import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { subIconOne, subIconThree, subIconTwo } from '../../../../assets/svgs'
import { organisationInfoRequest } from '../../../../redux/actions/settings/organisationInfo'
import {
    currentSubRequest,
    subLogsRequest,
    subPlansByTenureRequest,
    subPlansRequest,
    subscriptionRequest,
} from '../../../../redux/actions/subscription'
import { RootState } from '../../../../redux/reducers'
import NotificationToast from '../../../utils/notifToast'
import useTourGuide from '../../../../hooks/useTourGuide'

export default function SubPlans(props: any) {
    const [tourGuide, setTourGuide] = useTourGuide()
    const [planPage, setPlanPage] = useState(1)
    const [notifVal, setNotifVal] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [planIDD, setPlanIDD] = useState('')
    const [planName, setPlanName] = useState('')
    const [productId, setProductId] = useState(props?.idpassId)
    const [tenure, setTenure] = useState('monthly')

    const plansState = useSelector((state: RootState) => state.subPlansReducer)
    const subscriptionState = useSelector((state: RootState) => state.subscriptionReducer)
    const plansByTenureState = useSelector((state: RootState) => state.subPlansByTenureReducer)
    const subLogsState = useSelector((state: RootState) => state.subLogsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        getPlans()
        getPlansByTenure(productId, tenure)
    }, [tenure, productId])

    let getPlans = () => {
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
        dispatch(subPlansRequest(data))
    }

    let getPlansByTenure = (refID: string, tenure: string) => {
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
            values: {
                ref: refID,
                tenure: tenure,
            },
            callback,
        }
        dispatch(subPlansByTenureRequest(data))
    }

    let getOrgInfo = () => {
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
        dispatch(organisationInfoRequest(data))
    }

    let attemptSubscription = (planID: string) => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data?.data)
                setNotifVal(true)
                getOrgInfo()
                getCurrentSub()
                getSubLogs()
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                ref: planID,
            },
            callback,
        }
        dispatch(subscriptionRequest(data))
    }

    let getSubLogs = () => {
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
        dispatch(subLogsRequest(data))
    }

    let getCurrentSub = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
                if (data?.data?.length > 0) {
                    props?.openPage('3')
                } else {
                    props?.openPage('1')
                }
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
        dispatch(currentSubRequest(data))
    }

    return (
        <>
            {confirmModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        {!subscriptionState.isLoading && (
                            <span
                                onClick={() => {
                                    setConfirmModal(false)
                                    setPlanIDD('')
                                }}>
                                <i className="ri-close-line close-modal"></i>
                            </span>
                        )}
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-4">
                                    <h5>Subscription</h5>
                                </div>
                                <div className="text-center my-3">
                                    <p>You are about to subscribe to the {planName} </p>
                                </div>

                                <button
                                    onClick={() => {
                                        attemptSubscription(planIDD)
                                    }}
                                    className="btn btn-deep-green w-100 mt-3">
                                    {subscriptionState.isLoading ? (
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
                                        'Proceed'
                                    )}
                                </button>

                                <button
                                    onClick={() => {
                                        setConfirmModal(false)
                                        setPlanIDD('')
                                    }}
                                    className="btn btn-deep-green-outline w-100 mt-3"
                                    disabled={subscriptionState.isLoading}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="sub-plans-area pb-5">
                {notif && notifVal && (
                    <NotificationToast
                        title={notifTitle}
                        message={notif}
                        closeNotif={() => setNotifVal(!notifVal)}
                    />
                )}

                <div className="row mt-4">
                    <div className="col-md-5">
                        <h5>Subscription Plan & Pricing</h5>
                        <p className="d-flex align-items-center mt-3">
                            <span onClick={getCurrentSub} style={{ cursor: 'pointer' }}>
                                Subscription
                            </span>{' '}
                            <i className="ri-arrow-right-s-line ri-xl" /> Plans
                        </p>
                    </div>
                </div>

                <div className="plan-toggler-area col-md-6 text-center mx-auto">
                    {/* <div
                        className={`plan-toggler ${
                            tourGuide.currentStep === 46
                                ? 'tour-guide-element-preview tour-guide-toggler'
                                : ''
                        }`}>
                        <h6
                            className={planPage === 1 ? 'active' : ''}
                            onClick={() => {
                                setProductId(props?.idpassId)
                                setPlanPage(1)
                            }}>
                            IdentityPass
                        </h6>
                        <h6
                            className={planPage === 2 ? 'active' : ''}
                            onClick={() => {
                                setProductId(props?.radarId)   
                                setPlanPage(2)
                            }}>
                            Identityradar
                        </h6>
                    </div> */}
                    <h4>Choose Your Plan</h4>
                    <p>
                        No contracts, no surprise fees. <br />
                        Switch between monthly or annual payments
                    </p>

                    <div className=" my-3 col d-flex align-items-center justify-content-center">
                        <h6 className="me-2 mt-2 pb-0 mb-0">Monthly</h6>
                        <label className="tenure-switch">
                            <input
                                type="checkbox"
                                checked={tenure === 'yearly' ? true : false}
                                onChange={(e) => setTenure(e.target.checked ? 'yearly' : 'monthly')}
                            />
                            <span className="slider" />
                        </label>
                        <h6 className="ms-2 mt-2 pb-0 mb-0">Annually</h6>
                    </div>
                </div>

                {planPage === 1 && (
                    <div className="col-lg-10 mx-auto">
                        <div className="row justify-content-center">
                            {plansByTenureState?.resp?.data?.map((val: any, i: number) => {
                                if (val?.product_name === 'Identitypass') {
                                    return (
                                        <div className="col-md-6 col-lg-4" key={i}>
                                            <div className="card py-4">
                                                <div className="card-body">
                                                    <div className="plan-header text-center">
                                                        <span> {subIconOne} </span>
                                                        <h3 className="mt-3">{val?.name}</h3>
                                                        <h2>
                                                            {`${val?.currency} ${val?.price}`}
                                                            <span> / {val?.tenure}</span>
                                                        </h2>
                                                    </div>
                                                    <div className="plan-description text-center my-4">
                                                        <p>{val?.desc}</p>
                                                    </div>
                                                    <div className="plan-spec">
                                                        <span className="">
                                                            <i className="ri-checkbox-circle-fill me-2" />
                                                            <p>{val?.units} calls</p>
                                                        </span>
                                                        <span className="">
                                                            <i className="ri-checkbox-circle-fill me-2" />
                                                            <p>All ID Endpoints</p>
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            // attemptSubscription(val?.id)
                                                            setPlanIDD(val?.id)
                                                            setPlanName(val?.name)
                                                            setConfirmModal(true)
                                                        }}
                                                        className="btn btn-deep-green w-100 mt-3"
                                                        disabled={subscriptionState.isLoading}>
                                                        {subscriptionState.isLoading &&
                                                        val?.id === planIDD ? (
                                                            <div>
                                                                <Spinner
                                                                    as="span"
                                                                    animation="border"
                                                                    size="sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                />
                                                                <span className="sr-only">
                                                                    Loading...
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            'Subscribe'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            {/* <div className="col-md-4">
                                <div className="card py-4">
                                    <div className="card-body">
                                        <div className="plan-header text-center">
                                            <span> {subIconOne} </span>
                                            <h3 className="mt-3">KYC Standard</h3>
                                            <h2>
                                                $150
                                                <span> / Month</span>
                                            </h2>
                                        </div>
                                        <div className="plan-description text-center my-4">
                                            <p>This is our most affordable plan to get started</p>
                                        </div>
                                        <div className="plan-spec">
                                            <span className="">
                                                <i className="ri-checkbox-circle-fill me-2" />
                                                <p>5,000-10,000 calls</p>
                                            </span>
                                            <span className="">
                                                <i className="ri-checkbox-circle-fill me-2" />
                                                <p>All ID Endpoints</p>
                                            </span>
                                        </div>
                                        <button className="btn btn-deep-green w-100 mt-3"> Subscribe</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card active py-4">
                                    <div className="card-body">
                                        <div className="plan-header text-center">
                                            <span> {subIconTwo} </span>
                                            <h3 className="mt-3">KYC Standard +</h3>
                                            <h2>
                                                $250
                                                <span style={{ fontSize: "15px", color: "#96A5AE", fontWeight: "400 !important" }}> / Month</span>
                                            </h2>
                                        </div>
                                        <div className="plan-description text-center my-4">
                                            <p>Most businesses use this plan for their KYC</p>
                                        </div>
                                        <div className="plan-spec">
                                            <span className="">
                                                <i className="ri-checkbox-circle-fill me-2" />
                                                <p>5,000-10,000 calls</p>
                                            </span>
                                            <span className="">
                                                <i className="ri-checkbox-circle-fill me-2" />
                                                <p>All ID Endpoints</p>
                                            </span>
                                        </div>
                                        <button className="btn btn-deep-green w-100 mt-3"> Subscribe</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card py-4">
                                    <div className="card-body">
                                        <div className="plan-header text-center">
                                            <span> {subIconThree} </span>
                                            <h3 className="mt-3">KYC Premium</h3>
                                            <h2>
                                                $300
                                                <span> / Month</span>
                                            </h2>
                                        </div>
                                        <div className="plan-description text-center my-4">
                                            <p>For large businesses seeking advanced services</p>
                                        </div>
                                        <div className="plan-spec">
                                            <span className="">
                                                <i className="ri-checkbox-circle-fill me-2" />
                                                <p>5,000-10,000 calls</p>
                                            </span>
                                            <span className="">
                                                <i className="ri-checkbox-circle-fill me-2" />
                                                <p>All ID Endpoints</p>
                                            </span>
                                        </div>
                                        <button className="btn btn-deep-green w-100 mt-3"> Subscribe</button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                )}

                {planPage === 2 && (
                    <div className="col-lg-10 mx-auto">
                        <div className="row justify-content-center">
                            {plansByTenureState?.resp?.data?.map((val: any, i: number) => {
                                if (val?.product_name === 'Identityradar') {
                                    return (
                                        <div className="col-md-6 col-lg-4" key={i}>
                                            <div className="card py-4">
                                                <div className="card-body">
                                                    <div className="plan-header text-center">
                                                        <span> {subIconOne} </span>
                                                        <h3 className="mt-3">{val?.name}</h3>
                                                        <h2>
                                                            {`${val?.currency} ${val?.price}`}
                                                            <span> / {val?.tenure}</span>
                                                        </h2>
                                                    </div>
                                                    <div className="plan-description text-center my-4">
                                                        <p>{val?.desc}</p>
                                                    </div>
                                                    <div className="plan-spec">
                                                        <span className="">
                                                            <i className="ri-checkbox-circle-fill me-2" />
                                                            <p>{val?.units} calls</p>
                                                        </span>
                                                        <span className="">
                                                            <i className="ri-checkbox-circle-fill me-2" />
                                                            <p>Phone Intelligence</p>
                                                        </span>
                                                        <span className="">
                                                            <i className="ri-checkbox-circle-fill me-2" />
                                                            <p>Email Intelligence</p>
                                                        </span>
                                                        <span className="">
                                                            <i className="ri-checkbox-circle-fill me-2" />
                                                            <p>IP Intelligence</p>
                                                        </span>
                                                        <span className="">
                                                            <i className="ri-checkbox-circle-fill me-2" />
                                                            <p>AML/Sanction Intelligence</p>
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => {
                                                            // attemptSubscription(val?.id)
                                                            setPlanIDD(val?.id)
                                                            setPlanName(val?.name)
                                                            setConfirmModal(true)
                                                        }}
                                                        className="btn btn-deep-green w-100 mt-3"
                                                        disabled={subscriptionState.isLoading}>
                                                        {subscriptionState.isLoading &&
                                                        val?.id === planIDD ? (
                                                            <div>
                                                                <Spinner
                                                                    as="span"
                                                                    animation="border"
                                                                    size="sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                />
                                                                <span className="sr-only">
                                                                    Loading...
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            'Subscribe'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                            {/* <div className="col-md-4">
                            <div className="card py-4">
                                <div className="card-body">
                                    <div className="plan-header text-center">
                                        <span> {subIconOne} </span>
                                        <h3 className="mt-3">Radar Basic</h3>
                                        <h2>
                                            $150
                                            <span> / Month</span>
                                        </h2>
                                    </div>
                                    <div className="plan-description text-center my-4">
                                        <p>This is our most affordable plan to get started</p>
                                    </div>
                                    <div className="plan-spec">
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>10,000 calls</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Phone Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Email Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>IP Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Address Intelligence</p>
                                        </span>
                                    </div>
                                    <button className="btn btn-deep-green w-100 mt-3"> Subscribe</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card active py-4">
                                <div className="card-body">
                                    <div className="plan-header text-center">
                                        <span> {subIconTwo} </span>
                                        <h3 className="mt-3">Radar Enterprise</h3>
                                        <h2>
                                            $400
                                            <span style={{ fontSize: "15px", color: "#96A5AE", fontWeight: "400 !important" }}> / Month</span>
                                        </h2>
                                    </div>
                                    <div className="plan-description text-center my-4">
                                        <p>Most businesses use this plan for AML and Intelligence</p>
                                    </div>
                                    <div className="plan-spec">
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>10,000 calls</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Phone Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Email Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>IP Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Address Intelligence</p>
                                        </span>
                                    </div>
                                    <button className="btn btn-deep-green w-100 mt-3"> Subscribe</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card py-4">
                                <div className="card-body">
                                    <div className="plan-header text-center">
                                        <span> {subIconThree} </span>
                                        <h3 className="mt-3">Radar Premium</h3>
                                        <h2>
                                            $750
                                            <span> / Month</span>
                                        </h2>
                                    </div>
                                    <div className="plan-description text-center my-4">
                                        <p>For large businesses seeking advanced services</p>
                                    </div>
                                    <div className="plan-spec">
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>10,000 calls</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Phone Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Email Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>IP Intelligence</p>
                                        </span>
                                        <span className="">
                                            <i className="ri-checkbox-circle-fill me-2" />
                                            <p>Address Intelligence</p>
                                        </span>
                                    </div>
                                    <button className="btn btn-deep-green w-100 mt-3"> Subscribe</button>
                                </div>
                            </div>
                        </div> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
