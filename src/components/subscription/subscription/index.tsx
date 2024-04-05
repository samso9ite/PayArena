import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { PaginatedList } from 'react-paginated-list'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { subIconOne, subIconThree, subIconTwo } from '../../../assets/svgs'
import {
    currentSubRequest,
    subLogsRequest,
    subPlansByTenureRequest,
    subPlansRequest,
    subscriptionRequest,
} from '../../../redux/actions/subscription'
import { RootState } from '../../../redux/reducers'
import { EmptyStateComp, FailedTag, SuccessTag } from '../../utils'
import NotificationToast from '../../utils/notifToast'
import SubPlans from './plans'
import useTourGuide from '../../../hooks/useTourGuide'
import moment from 'moment'

export default function SubComp(props: any) {
    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()
    const [planPage, setPlanPage] = useState(1)
    const [page, setPage] = useState('')
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const plansByTenureState = useSelector((state: RootState) => state.subPlansByTenureReducer)
    const subLogsState = useSelector((state: RootState) => state.subLogsReducer)
    const currentSubState = useSelector((state: RootState) => state.currentSubReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if (tourGuide.onGoing && tourGuide.currentStep === 47) {
            setPage(tourGuide.subscription_page)
        }
    }, [tourGuide.currentStep === 47])

    useEffect(() => {
        // getPlansByTenure("","")
        getCurrentSub()
        getSubLogs()
    }, [])

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
                    setPage('3')
                } else {
                    setPage('1')
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

    let openPage = (p: string) => {
        setPage(p)
    }
    let openPlanPage = () => {
        setPage('2')
    }

    const handleNext = () => {
        if (tourGuide.currentStep === 46) {
            setTourGuide({ ...tourGuide, currentStep: 47, subscription_page: '2' })
        } else if (tourGuide.currentStep === 47) {
            setTourGuide({ ...tourGuide, currentStep: 48, subscription_key: 'payment' })
        }
    }

    const handleBack = () => {
        if (tourGuide.currentStep === 46) {
            navigate('/Subscription')
            setTourGuide({ ...tourGuide, currentStep: 45 })
        } else if (tourGuide.currentStep === 47) {
            setPage('1')
            setTourGuide({ ...tourGuide, currentStep: 46 })
        }
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    return (
        <div className="pb-5">
            {tourGuide.currentStep === 46 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-46 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                {/* <p>3/5</p> */}
                                {!props?.userRights.includes('VIEW_REPORT') ? (
                                    <p>2/4</p>
                                ) : (
                                    <p>3/5</p>
                                )}
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Subscribe</h5>
                                    <p>
                                        Click on <span className="info"> “Subscribe”</span> to
                                        select your preferred plan.
                                    </p>
                                </div>
                                <div className="text-left d-flex flex-row align-items-center justify-content-between btn-reset">
                                    <button
                                        className="btn btn-deep-green-outline"
                                        onClick={handleBack}>
                                        Back
                                    </button>
                                    <button className="btn btn-dark-green" onClick={handleNext}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tourGuide.currentStep === 47 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-47 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                {/* <p>4/5</p> */}
                                {!props?.userRights.includes('VIEW_REPORT') ? (
                                    <p>3/4</p>
                                ) : (
                                    <p>4/5</p>
                                )}
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select platform</h5>
                                    <p>
                                        Switch between Identitypass and Identityradar and choose
                                        your preferred plan.
                                    </p>
                                </div>
                                <div className="text-left d-flex flex-row align-items-center justify-content-between btn-reset">
                                    <button
                                        className="btn btn-deep-green-outline"
                                        onClick={handleBack}>
                                        Back
                                    </button>
                                    <button className="btn btn-dark-green" onClick={handleNext}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {page === '1' && (
                <>
                    <div className="col-md-5 mt-4">
                        <h5>Subscription Plan & Pricing</h5>
                        <p className="mt-3">Select your desired plan to get started</p>
                    </div>
                    <div className="my-5">
                        <EmptyStateComp
                            title={'No Active Subscriptions'}
                            ctaAction={openPlanPage}
                            desc={'Click the button below to subscribe to Radar'}
                            ctaValue={'Subscribe'}
                        />
                    </div>
                </>
            )}

            {page === '2' && <SubPlans openPage={openPage} idpassId={props?.idpassId}  radarId={props?.radarId}/>}

            {page === '3' && (
                <div className="sub-cur-area">
                    <div className="row mt-4">
                        <div className="col-md-8">
                            <h5>Subscription Plan & Pricing</h5>
                            <p className="mt-3">Manage your subscriptions here</p>
                        </div>
                        <div className="col-md-4 text-end">
                            <button className="btn btn-green px-md-5 py-3" onClick={openPlanPage}>
                                Add New Plan
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                {currentSubState?.resp?.data?.length > 0 && (
                                    <div className="card-body">
                                        <PaginatedList
                                            list={currentSubState?.resp?.data}
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
                                                    {list?.map((val: any, i: number) => (
                                                        <div key={i}>
                                                            <h5>{val?.plan_name}</h5>
                                                            <hr />
                                                            <div className="mt-5">
                                                                <small>
                                                                    {' '}
                                                                    SubScription renewal date{' '}
                                                                </small>
                                                                <p>{`${val?.end_date} (in ${val?.days_left} days)`}</p>
                                                                {/* <small> What you will be charged </small> */}
                                                                <small>Units you have left</small>
                                                                <p>{val?.unit_bal}</p>
                                                            </div>
                                                            <button
                                                                className="btn btn-black-outline mb-5"
                                                                onClick={openPlanPage}>
                                                                Change Plan
                                                            </button>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5>Invoices</h5>
                                    <div className="mt-4">
                                        {subLogsState?.resp?.data?.length > 0 && (
                                            <div className="table-responsive">
                                                <PaginatedList
                                                    list={subLogsState?.resp?.data}
                                                    itemsPerPage={4}
                                                    useMinimalControls={true}
                                                    leftMargin={1}
                                                    rightMargin={1}
                                                    nextText={'Next'}
                                                    prevText={'Previous'}
                                                    displayRange={2}
                                                    breakText={'...'}
                                                    breakClass={'pagination-break'}
                                                    renderList={(list) => (
                                                        <table className="table">
                                                            <thead className="">
                                                                <tr>
                                                                    <th scope="col">Ref</th>
                                                                    <th scope="col">Product</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Status</th>
                                                                    {/* <th scope="col">Action</th> */}
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {list?.map(
                                                                    (
                                                                        value: any,
                                                                        index:
                                                                            | React.Key
                                                                            | null
                                                                            | undefined
                                                                    ) => (
                                                                        <tr key={index}>
                                                                            <th scope="row">
                                                                                {value?.reference}
                                                                            </th>
                                                                            <td>
                                                                                {' '}
                                                                                {
                                                                                    value?.product_name
                                                                                }{' '}
                                                                            </td>
                                                                            <td>
                                                                                {' '}
                                                                                {`${value?.currency} ${value?.amount}`}
                                                                            </td>
                                                                            <td>
                                                                                {' '}
                                                                                {
                                                                                    moment.utc(value?.created_at).format('lll')
                                                                                }{' '}
                                                                            </td>
                                                                            <td>
                                                                                {value?.status && (
                                                                                    <SuccessTag />
                                                                                )}
                                                                                {!value?.status && (
                                                                                    <FailedTag />
                                                                                )}
                                                                            </td>
                                                                          
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
