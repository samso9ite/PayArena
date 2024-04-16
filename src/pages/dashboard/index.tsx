import TopupComp from '../../components/wallet/topup'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { useEffect, useState } from 'react'
import {
    announcementRequest,
    dashboardInfoRequest,
    // viewAnnouncementRequest,
} from '../../redux/actions/dashboard'
import { DashboardChart } from '../../components/utils/chart'
// import Mainloader from '../../components/utils'
import NotificationToast from '../../components/utils/notifToast'
import global from '../../redux/constants/global'
import GetStartedComp from '../../components/wrapper/getStarted'
// import { PaginatedList } from "react-paginated-list";
import { Alert, Carousel, Spinner } from 'react-bootstrap'
import walletImg from '../../assets/wallet-bg-2.png'
import premblyLogo from '../../assets/logo.png'
import announcement from '../../assets/announcement.svg'
import useTourGuide from '../../hooks/useTourGuide'
import riseArrow from '../../assets/rise.svg'
import {
    EmptyStateComp,
    FailedTag,
    UnavailableTag,
    SuccessTag,
} from '../../components/utils'
import SetMigrationPasswordComp from './migrationPassword'
import { walletBalanceRequest } from '../../redux/actions/wallet'
import emptyImg from '../../assets/empty.svg'
import Cookies from 'js-cookie'

export default function Dashboard(props: any) {
    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [openGetStarted, setOpenGetStarted] = useState(false)
    const [moreModal, setMoreModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer);
    const dashboardState = useSelector((state: RootState) => state.dashboardInfoReducer)
    const announcementState = useSelector((state: RootState) => state.announcementReducer)
    const viewAnnouncementState = useSelector((state: RootState) => state.viewAnnouncementReducer)
   
    // const tourGuideStatusState = useSelector((state: RootState) => state.tourGuideReducer)
    const dispatch = useDispatch()
    const location = useLocation()
    let hostName = Cookies.get('hostName') || ''
    let passLogo = Cookies.get('logo') || ''

    const queryParams = new URLSearchParams(location.search)
    let successPayment = queryParams.get('success')
    let failedPayment = queryParams.get('failed')  
    
    useEffect(() => {
        getDashboardInfo()
        getAnnouncement()

        if (successPayment === 'true') {
            setNotifTitle('Success')
            setNotif('You have successfully funded your wallet')
            setNotifVal(true)
            window.location.href = global.appBaseUrl
        }
        if (failedPayment === 'true') {
            setNotifTitle('Error')
            setNotif('Wallet funding was unsuccessful')
            setNotifVal(true)
            window.location.href = global.appBaseUrl
        }
    }, [])

    useEffect(() => {
        triggerPasswordModal()
    }, [
        organisationInfoState?.resp?.data?.user?.has_set_password,
        organisationInfoState?.resp?.data?.user?.migrated,
    ])

    let getDashboardInfo = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(dashboardInfoRequest(data))
    }

    
    let getAnnouncement = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(announcementRequest(data))
    }

    const handleGetStarted = () => {
        setTourGuide({ isActive: true, currentStep: 1, onGoing: true })
    }

    const handleNext = () => {
        if (tourGuide.currentStep === 2) {
            setTourGuide({ ...tourGuide, currentStep: 3 })
        } else if (tourGuide.currentStep === 3) {
            setTourGuide({ ...tourGuide, currentStep: 4 })
        }
    }

    const handleBack = () => {
        if (tourGuide.currentStep === 3) {
            setTourGuide({ ...tourGuide, currentStep: 2 })
        } else if (tourGuide.currentStep === 2) {
            setTourGuide({ ...tourGuide, currentStep: 1 })
        }
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    let pushNotifTitle = (title: string) => {
        setNotifTitle(title)
    }
    let pushNotif = (notif: string, val: boolean | ((prevState: boolean) => boolean)) => {
        setNotif(notif)
        setNotifVal(val)
    }

    let triggerPasswordModal = () => {
        if (
            organisationInfoState?.resp?.data?.user?.migrated &&
            !organisationInfoState?.resp?.data?.user?.has_set_password
        ) {
            setPasswordModal(true)
        }
    }

    const handleRetriggerDashboard = () => {
        setTourGuide({ isActive: true, currentStep: 1, onGoing: true })
        setOpenGetStarted(false)
    }

    const handleRetriggerIDPass = () => {
        setTourGuide({
            ...tourGuide,
            onGoing: true,
            currentStep: 5,
            identitypass_data_verification: 'individual',
            identitypass_country_code: 'NG',
            identitypass_channel: 'PHONE_VER_BASIC',
        })
        navigate('/Identitypass/Verification/Data')
        setOpenGetStarted(false)
    }

    const handleRetriggerIDRadar = () => {
        setTourGuide({
            ...tourGuide,
            onGoing: true,
            currentStep: 32,
            radar_intelligenceCheck: 'email',
        })
        setOpenGetStarted(false)
        navigate('/Identityradar/Radar-Check')
    }

    const handleRetriggerAPILib = () => {
        navigate('/API-Library/API-Keys')
        setTourGuide({ ...tourGuide, onGoing: true, currentStep: 36 })
    }

    const handleRetriggerGeneral = () => {
        navigate('/Reports')
        setTourGuide({ ...tourGuide, onGoing: true, currentStep: 44 })
    }

    const truncateString= (str:string, maxLength:number) => {
        return [...str].slice(0, maxLength).join('') + (str.length > maxLength ? "..." : "");
    }
    return (
        <div className="dashboard-area">
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {organisationInfoState?.isLoading
                ? props.changeLoadingState(true)
                : props.changeLoadingState(false)}

            {!tourGuide.isActive &&
                !organisationInfoState?.isLoading &&
                organisationInfoState?.resp?.data?.organisation?.indemnity_signed &&
                ((organisationInfoState?.resp?.data?.user?.migrated &&
                    organisationInfoState?.resp?.data?.user?.has_set_password) ||
                    (!organisationInfoState?.resp?.data?.user?.migrated &&
                        !organisationInfoState?.resp?.data?.user?.has_set_password)) && (
                    <div className="main-modal get-started-modal sm-turn-off-tour-guide">
                        <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                            <div className="card-body">
                                <div className="text-center">
                                    <img src={passLogo} alt="" width="150px" className="mb-3" />
                                </div>
                                <div className="main-modal-body">
                                    <div className="text-center mt-3">
                                        <h5>Welcome to the {hostName} Interface Tour!</h5>
                                        <p>Let's explore and enjoy the interface together!</p>
                                    </div>
                                </div>
                                <div className="text-center d-flex flex-column btn-actions">
                                    <button
                                        className="btn btn-dark-green btn-get-started"
                                        onClick={handleGetStarted}>
                                        Get Started
                                    </button>
                                    <button
                                        className="btn btn-link btn-skip"
                                        onClick={handleSkipTour}>
                                        Skip the tour
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            {tourGuide.currentStep === 2 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-2 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>2/4</p>
                                <div>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Announcement</h5>
                                    <p>
                                        The announcement section ensures that you stay up-to-date
                                        about the latest releases and updates, enabling you to make
                                        the most of all available features.
                                    </p>
                                </div>
                                <div className="text-left d-flex flex-row align-items-center justify-content-between btn-reset">
                                    <button
                                        className="btn btn-deep-green-outline btn-reset"
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

            {tourGuide.currentStep === 3 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-3 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>3/4</p>
                                <div>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Total Wallet Balance</h5>
                                    <p>View your wallet balance and top up your wallet.</p>
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

            {passwordModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-6 col-lg-4 mx-auto">
                        <span onClick={() => setPasswordModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-7 col-lg-5">
                                    <h5>Create a new Password</h5>
                                </div>
                                <SetMigrationPasswordComp
                                    closePasswordModal={() => setPasswordModal(false)}
                                    pushNotif={pushNotif}
                                    pushNotifTitle={pushNotifTitle}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {moreModal && (
                <div className="main-modal ">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span
                            onClick={() => {
                                setMoreModal(false)
                            }}>
                            <i className="ri-close-line close-modal" />
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center mt-4">
                                    <h5>{viewAnnouncementState?.resp?.results?.title}</h5>
                                    <p>{viewAnnouncementState?.resp?.results?.content} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div>
                {!openGetStarted && (
                    <div className="fixed-bottom text-end pe-5" style={{marginBottom:"5%"}}>
                        <button
                            className="btn btn-deep-green align-items-center d-flex ms-auto"
                            onClick={() => setOpenGetStarted(true)}>
                            <i className="ri-play-fill ri-xl me-2" />
                            Get Started
                        </button>
                    </div>
                )}

                {openGetStarted && (
                    <GetStartedComp
                        KYCStatus={
                            organisationInfoState?.resp?.data?.organisation?.verification_status
                        }
                        fundingStatus={
                            organisationInfoState?.resp?.data?.organisation?.wallet_balance
                        }
                        closeModal={() => setOpenGetStarted(!openGetStarted)}
                        handleRetriggerDashboard={handleRetriggerDashboard}
                        handleRetriggerIDPass={handleRetriggerIDPass}
                        handleRetriggerIDRadar={handleRetriggerIDRadar}
                        handleRetriggerAPILib={handleRetriggerAPILib}
                        handleRetriggerGeneral={handleRetriggerGeneral}
                    />
                )}
            </div>

            <div className="container-fluid px-md-4 mt-4">
                <div className="row">
                       {    organisationInfoState?.resp?.data?.organisation?.verification_status &&  
                            organisationInfoState?.resp?.data?.organisation?.business_document == null &&
                            <Alert variant="warning" style={{backgroundColor:"#FEC84B", border:"#FDB002"}}>
                                <span style={{ color:"black"}}>
                                    <i className="ri-error-warning-fill" style={{color:"white", fontSize:"20px", paddingRight:"15px"}}></i> 
                                        Finish setting up your account by completing your Business Information verification on IdentityPass.<Link to={"/Settings"}> Go to Settings</Link>
                                </span>
                            </Alert>
                        }
                        <div className="col-md-4">
                            <div className="pb-4">
                                <h5 style={{textTransform:"capitalize"}}>Welcome, {organisationInfoState?.resp?.data?.user?.first_name}!</h5>
                                <p>How are you doing today? It's great to have you here</p>
                            </div>
                        </div>
                        <div className="col-md-8" >
                            {hostName == "Prembly" &&
                                <a target='_blank' href={hostName == "Prembly" ? "https://youtu.be/Ou35K3E0rWc" : "https://youtu.be/Cy2buzNKxEEhttps://youtu.be/Cy2buzNKxEE"}> <button className='btn' style={{float:'right', backgroundColor:'#ECEBF8', color:'#332ECF'}}>
                                    Watch a tour <i className="ri-arrow-right-line ms-2" /></button>
                                </a>
                            }
                        </div>
                </div>
               
                <div className="row">
                    <div
                        className={`col-md-7 ${
                            tourGuide.currentStep === 2 && 'announcement-guide'
                        }`}>
                        <div
                            className="card"
                            style={{
                                backgroundColor: '#fff',
                                boxShadow: "3px 3px 3px 3px #B853E614",
                                border:'none',
                                minHeight: '200px',
                            }}>
                            <div>
                                <div className="card-body">
                                    <div className='row'>
                                    <div className="col-md-8">
                                        <h5> Announcement</h5>
                                        {announcementState?.resp?.results?.length > 0 && (
                                            <Carousel>
                                                {announcementState?.resp?.results?.map(
                                                    (val: any, i: number) => (
                                                        <Carousel.Item interval={5000} key={i}>
                                                            <img
                                                                className=" w-100"
                                                                src={walletImg}
                                                                style={{
                                                                    opacity: 0,
                                                                    height: '110px',
                                                                }}
                                                                alt=""
                                                            />
                                                            <Carousel.Caption>
                                                                <p
                                                                    className="add-ellipsis"
                                                                    style={{
                                                                        fontSize: '17px',
                                                                        color: '#62789D',
                                                                    }}>
                                                                    {val?.title}
                                                                </p>
                                                                <a
                                                                    className="btn btn-read-more p-0 mt-1 mb-2"
                                                                    href={val?.redirect_link}
                                                                    target="_blank"
                                                                    rel="noreferrer noopener">
                                                                    Read More
                                                                    <i className="ri-arrow-right-line ms-2" />
                                                                </a>
                                                            </Carousel.Caption>
                                                        </Carousel.Item>
                                                    )
                                                )}
                                            </Carousel>
                                        )}
                                    </div>
                                    <div className='col-md-4'>
                                        <img src={announcement} />
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {props?.userRights?.includes('WALLET') && (
                        <div
                            className={`col-md-5 mt-3 mt-md-0 ${
                                tourGuide.currentStep === 3 && 'topup-card-wrapper'
                            }`}>
                            <TopupComp permissionKey={props?.permissionKey} />
                        </div>
                    )}
                </div>
               {(hostName == "Prembly") && 
                    <div className=" px-3 py-4 mt-5">
                <div className="row">
                        <div className='col-lg-2'>
                            <h6>Most Used Endpoints </h6>
                        </div>
                        <div className='col-lg-10'>
                            <hr />
                        </div>
                    </div>
                    <p>In the last 30days</p>

                    <div className="row">
                        {dashboardState?.resp?.data?.most_used?.length > 0 ? 
                            dashboardState?.resp?.data?.most_used?.map((val: any, index: number) => (
                                <div key={index} style={{width:"20%"}}>
                                    <div className="card  mt-3" style={{
                                            backgroundColor: '#fff',
                                            boxShadow: "3px 3px 3px 3px #B853E614",
                                            border:'none',
                                    }}>
                                        <div className="card-body">
                                            <span style={{color:'#323232', fontWeight:'500', fontSize:'14px'}}> {truncateString(val?.endpoint_name, 20)} </span>
                                            <div className="d-flex justify-content-between">
                                                <h5 className="pt-2">
                                                    {val?.total}
                                                    <span style={{ fontSize: 12, color: "#62789D" }}> Checks</span>
                                                </h5>
                                                <i className="ri-arrow-right-line ms-2" style={{fontSize:"25px", color:"#323232"}}/>
                                            </div>
                                            {/* <div className="d-flex justify-content-between">
                                                <span className="success-tag">10 <img src={riseArrow} /></span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                        )) : 
                            <center>
                                <div>
                                    <img src={emptyImg} />
                                    <h5>No most used endpoints results yet</h5>
                                    <p style={{maxWidth:"25%"}}>Most used APIs will appear here when you carry out verifications</p>
                                </div>
                            </center>
                        }
                    </div>
                    </div>
                }
                <div className="px-3 py-4 mt-5">
                    <div className="row">
                        <div className='col-lg-1'>
                            <h6>API Calls </h6>
                        </div>
                        <div className='col-lg-11'>
                            <hr />
                        </div>
                    </div>
                    <p>View most used endpoints and API Calls</p>
                    {/* <button className='btn btn-default' style={{border:'1px solid #62789D', color:'#62789D'}}>
                        <i className="ri-bar-chart-2-line"></i> Bar Chart
                    </button>  <button className='btn btn-default' style={{border:'1px solid #62789D', color:'#62789D',  marginLeft:'10px'}}>
                    <i className="ri-pie-chart-line"></i> Pie Chart
                    </button>  <button className='btn btn-default' style={{border:'1px solid #62789D', color:'#62789D',  marginLeft:'10px'}}>
                    <i className="ri-line-chart-line"></i> Graph
                    </button> */}
                    <div className=" card my-4 px-md-3 py-4" style={{border:'none'}}>
                        <div className="card-body">
                        {dashboardState?.resp?.data?.most_used?.length > 0 ?  
                            <>
                                {/* <div className="d-flex justify-content-end" style={{color:'#62789D'}}>
                                    <i className="ri-checkbox-blank-circle-fill"  style={{color:'#542D77'}}/> Email Intelligence  <i className="ri-checkbox-blank-circle-fill" style={{color:'#9154C7', paddingLeft:'10px'}}/> Phone Intelligence
                                    <i className="ri-checkbox-blank-circle-fill" style={{color:'#BD98DD', paddingLeft:'10px'}}/> Phone Number Verification <i className="ri-checkbox-blank-circle-fill" style={{color:'#DECCEF', paddingLeft:'10px'}}/> BVN Check 
                                    <i className="ri-checkbox-blank-circle-fill" style={{color:'#E9DDF4', paddingLeft:'10px'}}/> NIN Verification  
                                </div> */}
                                <div style={{ backgroundColor: '#FFFFFF' }} className="p-4">
                                    {/* <DashboardChart chartData={dashboardState?.resp?.data?.graph} /> */}
                                </div>
                            </> :
                            <center>
                                <div>
                                    <img src={emptyImg} />
                                    <h5>No charts results yet</h5>
                                    <p style={{maxWidth:"25%"}}>Most used APIs will appear on your chart when you carry out verifications</p>
                                </div>
                            </center>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
