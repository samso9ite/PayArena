import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import passLogo from  '../../../assets/idpasslogoBlue.svg'
import passIcon from '../../../assets/pass-icon.png'
import radarIcon from '../../../assets/radar-icon.png'
import formIcon from '../../../assets/form-icon.png'
import passIconBlack from '../../../assets/pass-icon-black.png'
import radarIconBlack from '../../../assets/radar-icon-black.png'
import formIconBlack from '../../../assets/form-icon-black.png'
import PremblyLogo from '../../../assets/logo.png'
import NotificationToast from '../../utils/notifToast'
import { organizationRoleRequest } from '../../../redux/actions/settings/roles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import global from '../../../redux/constants/global'
import useTourGuide from '../../../hooks/useTourGuide'
import { tourGuideCompleteRequest } from '../../../redux/actions/tourGuide'
import Placeholder from 'react-bootstrap/Placeholder'
import Cookies from 'js-cookie'
import perksActive from '../../../assets/perks-active.svg'
import perksInactive from '../../../assets/perks-inactive.svg'

export default function Sidebar(props: any) {
    interface IUserRights {
        userRights: []
        includes: any
    }
    let passLogo = Cookies.get("logo") || ""

    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [openSidebar, setOpenSidebar] = useState(false)
    const [userPermission, setUserPermission] = useState([])
    const [userRights, setUserRights] = useState<IUserRights | []>([])

    const [sidebarLoading, setSidebarLoading] = useState(true)
    const [migrationModal, setMigrationModal] = useState(false)

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)
    const orgRoleState = useSelector((state: RootState) => state.organizationRoleReducer)

    let location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split('/')

    const dispatch = useDispatch()
    let host = Cookies.get("host") || ""
    useEffect(() => {
        if (!orgRoleState?.resp || !organisationInfoState.resp || userPermission?.length < 1) {
            getuserRoles()
        }
    }, [orgRoleState?.resp, organisationInfoState.resp, userPermission])

    let getuserRoles = () => {
        const callback = (data: any) => {
            if (data.status) {
                checkPermission()
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
        dispatch(organizationRoleRequest(data))
    }

    let checkPermission = () => {
        let filteredRights: any = userRights

        orgRoleState?.resp?.data?.map((val: any) => {
            if (organisationInfoState?.resp?.data?.permission === val?.id) {
                setUserPermission(val?.access_rights)

                val?.access_rights?.map((ele: any) => {
                    ele?.access_right?.forEach((vall: any) => {
                        if (vall?.has_access) {
                            var rightIndex = filteredRights?.findIndex(
                                (arr: any) => arr === vall?.feature_code
                            )

                            if (rightIndex !== -1) {
                                filteredRights.splice(rightIndex, 1)
                                filteredRights.push(vall?.feature_code)
                            } else {
                                filteredRights.push(vall?.feature_code)
                            }
                        }
                    })
                })
                setUserRights(filteredRights)
                props?.pushFilteredRights(filteredRights)
                props?.pushPermissionKey(organisationInfoState?.resp?.data?.permission)
                setSidebarLoading(false)
            }
        })
    }

    let filterRights = () => {
        checkPermission()

        let filteredRights: any = userRights

        userPermission?.map((ele: any) => {
            ele?.access_right?.forEach((vall: any) => {
                if (vall?.has_access) {
                    var rightIndex = filteredRights?.findIndex(
                        (arr: any) => arr === vall?.feature_code
                    )

                    if (rightIndex !== -1) {
                        filteredRights.splice(rightIndex, 1)
                        filteredRights.push(vall?.feature_code)
                    } else {
                        filteredRights.push(vall?.feature_code)
                    }
                }
            })
        })
        setUserRights(filteredRights)
        props?.pushFilteredRights(filteredRights)
        setSidebarLoading(false)
    }

    const handleNext = () => {
        if (tourGuide.currentStep === 1) {
            setTourGuide({ ...tourGuide, currentStep: 2 })
        } else if (tourGuide.currentStep === 5) {
            setTourGuide({
                ...tourGuide,
                currentStep: 6,
            })
        } else if (tourGuide.currentStep === 11) {
            setTourGuide({ ...tourGuide, currentStep: 12 })
        } else if (tourGuide.currentStep === 17) {
            setTourGuide({ ...tourGuide, currentStep: 18 })
        } else if (tourGuide.currentStep === 22) {
            setTourGuide({ ...tourGuide, currentStep: 23 })
        } else if (tourGuide.currentStep === 23) {
            setTourGuide({ ...tourGuide, currentStep: 32 })
        } else if (tourGuide.currentStep === 32) {
            setTourGuide({ ...tourGuide, currentStep: 33 })
        } else if (tourGuide.currentStep === 36) {
            setTourGuide({ ...tourGuide, currentStep: 37 })
        } else if (tourGuide.currentStep === 37) {
            setTourGuide({ ...tourGuide, currentStep: 38 })
        } else if (tourGuide.currentStep === 39) {
            setTourGuide({ ...tourGuide, currentStep: 40 })
        } else if (tourGuide.currentStep === 41) {
            navigate('/SDK-Library/Webhook')
            setTourGuide({ ...tourGuide, currentStep: 42 })
        } else if (
            tourGuide.currentStep === 42 &&
            props?.userRights.includes('VERIFICATION') &&
            props?.userRights.includes('CHECKER_WIDGET') &&
            props?.userRights.includes('RADAR_CHECK') &&
            props?.userRights?.includes('API_KEY') &&
            props?.userRights?.includes('APPLICATION') &&
            props?.userRights?.includes('STATUS')
        ) {
            navigate('/API-Library/API-Status')
            setTourGuide({ ...tourGuide, currentStep: 43 })
        } else if (
            tourGuide.currentStep === 42
            // &&
            // props?.userRights.includes('VERIFICATION') &&
            // props?.userRights.includes('CHECKER_WIDGET') &&
            // props?.userRights.includes('RADAR_CHECK') &&
            // props?.userRights?.includes('API_KEY') &&
            // props?.userRights?.includes('APPLICATION') &&
            // props?.userRights?.includes('STATUS')
        ) {
            navigate('/SDK-Library/Webhook')
            setTourGuide({ ...tourGuide, currentStep: 43 })
        } else if (
            tourGuide.currentStep === 43 &&
            !props?.userRights.includes('CHECKER_WIDGET') &&
            userRights?.includes('VIEW_REPORT')
        ) {
            navigate('/Reports')
            setTourGuide({ ...tourGuide, currentStep: 44 })
        } else if (
            tourGuide.currentStep === 43 &&
            !userRights?.includes('VIEW_REPORT') &&
            !userRights?.includes('SUBSCRIPTION') &&
            !props?.userRights.includes('CHECKER_WIDGET')
        ) {
            navigate('/Settings')
            setTourGuide({ ...tourGuide, currentStep: 49 })
        } else if (
            tourGuide.currentStep === 43 &&
            userRights?.includes('VIEW_REPORT') &&
            userRights?.includes('VIEW_DATA')
        ) {
            navigate('/Reports')
            setTourGuide({ ...tourGuide, currentStep: 44 })
        } else if (
            tourGuide.currentStep === 43 &&
            !userRights?.includes('VIEW_REPORT') &&
            !userRights?.includes('VIEW_DATA') &&
            userRights?.includes('SUBSCRIPTION')
        ) {
            navigate('/Subscription')
            setTourGuide({ ...tourGuide, currentStep: 45, subscription_key: 'subscription' })
        }
        // else if (
        //     tourGuide.currentStep === 43 &&
        //     !userRights?.includes('SUBSCRIPTION') &&
        //     userRights?.includes('CARD') &&
        //     userRights?.includes('WALLET')
        // ) {
        //     navigate('/Subscription')
        //     setTourGuide({ ...tourGuide, currentStep: 45 })
        // }
        else if (
            tourGuide.currentStep === 43 &&
            !userRights?.includes('SUBSCRIPTION') &&
            !userRights?.includes('WALLET') &&
            !userRights?.includes('CARD')
        ) {
            navigate('/Settings')
            setTourGuide({ ...tourGuide, currentStep: 49 })
        } else if (tourGuide.currentStep === 44 && !userRights.includes('SUBSCRIPTION')) {
            navigate('/Settings')
            setTourGuide({ ...tourGuide, currentStep: 49 })
        } else if (tourGuide.currentStep === 44) {
            navigate('/Subscription')
            setTourGuide({ ...tourGuide, currentStep: 45, subscription_key: 'subscription' })
        } else if (tourGuide.currentStep === 45) {
            setTourGuide({ ...tourGuide, currentStep: 46 })
        } else if (tourGuide.currentStep === 49) {
            setTourGuide({ ...tourGuide, currentStep: 50 })
        } else if (tourGuide.currentStep === 60) {
            navigate('/Compliance-Certificates')
            setTourGuide({ ...tourGuide, currentStep: 61 })
        }
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    const handleBack = () => {
        if (tourGuide.currentStep === 5) {
            setTourGuide({ ...tourGuide, currentStep: 4 })
        } else if (tourGuide.currentStep === 11) {
            setTourGuide({
                ...tourGuide,
                currentStep: 10,
                identitypass_data_verification: 'individual',
                identitypass_country_code: 'NG',
                identitypass_channel: 'PHONE_VER_BASIC',
            })
            navigate('/Identitypass/Verification/Data')
        } else if (tourGuide.currentStep === 17) {
            setTourGuide({
                ...tourGuide,
                currentStep: 16,
                identitypass_data_verification: 'business',
                identitypass_channel: 'COMPANY_GENERAL_SEARCH',
                identitypass_country_code: 'NG',
            })
            navigate('/Identitypass/Verification/Data')
        } else if (tourGuide.currentStep === 22) {
            navigate('/Identitypass/Verification/Document')
            setTourGuide({ ...tourGuide, currentStep: 21 })
        } else if (
            tourGuide.currentStep === 32 &&
            props?.userRights.includes('VERIFICATION') &&
            props.userRights.includes('CHECKER_WIDGET')
        ) {
            navigate('/Identitypass/Checker-Widget')
            setTourGuide({ ...tourGuide, currentStep: 31, checker_step: 2 })
        } else if (
            tourGuide.currentStep === 32 &&
            !props?.userRights.includes('VERIFICATION') &&
            !props.userRights.includes('CHECKER_WIDGET')
        ) {
            navigate('/')
            setTourGuide({ ...tourGuide, currentStep: 4 })
        } else if (tourGuide.currentStep === 32 && !props?.userRights?.includes('CHECKER_WIDGET')) {
            navigate('/Identitypass/Verification/Document')
            setTourGuide({ ...tourGuide, currentStep: 21 })
        } else if (tourGuide.currentStep === 36) {
            navigate('/Identityradar/Radar-Check')
            setTourGuide({ ...tourGuide, currentStep: 35, radar_intelligenceCheck: 'email' })
        } else if (tourGuide.currentStep === 37) {
            navigate('/API-Library/API-Keys')
            setTourGuide({ ...tourGuide, currentStep: 36 })
        } else if (tourGuide.currentStep === 39) {
            navigate('/API-Library/API-Keys')
            setTourGuide({ ...tourGuide, currentStep: 38 })
        } else if (tourGuide.currentStep === 41) {
            navigate('/API-Library/Applications')
            setTourGuide({ ...tourGuide, currentStep: 40 })
        } else if (
            tourGuide.currentStep === 42 &&
            props?.userRights.includes('VERIFICATION') &&
            props?.userRights.includes('CHECKER_WIDGET') &&
            props?.userRights.includes('RADAR_CHECK') &&
            props?.userRights?.includes('API_KEY') &&
            props?.userRights?.includes('APPLICATION') &&
            props?.userRights?.includes('STATUS')
        ) {
            navigate('/API-Library/API-Status')
            setTourGuide({ ...tourGuide, currentStep: 41 })
        } else if (
            tourGuide.currentStep === 42 &&
            !props.userRights.includes('API_KEY') &&
            !props.userRights.includes('STATUS')
        ) {
            navigate('/Identityradar/Radar-Check')
            setTourGuide({ ...tourGuide, currentStep: 35, radar_intelligenceCheck: 'email' })
        } else if (
            tourGuide.currentStep === 42 &&
            !props?.userRights.includes('VERIFICATION') &&
            !props?.userRights.includes('CHECKER_WIDGET') &&
            !props?.userRights.includes('RADAR_CHECK') &&
            !props?.userRights?.includes('API_KEY') &&
            !props?.userRights?.includes('APPLICATION') &&
            !props?.userRights?.includes('STATUS')
        ) {
            navigate('/')
            setTourGuide({ ...tourGuide, currentStep: 4 })
        } else if (tourGuide.currentStep === 43) {
            navigate('/SDK-Library/Webhook')
            setTourGuide({ ...tourGuide, currentStep: 42 })
        } else if (
            tourGuide.currentStep === 44 &&
            userRights?.includes('VIEW_REPORT') &&
            userRights?.includes('VIEW_DATA')
        ) {
            navigate('/SDK-Library/Webhook')
            setTourGuide({ ...tourGuide, currentStep: 43 })
        } else if (tourGuide.currentStep === 44) {
            navigate('/API-Library/API-Status')
            setTourGuide({ ...tourGuide, currentStep: 43 })
        } else if (
            tourGuide.currentStep === 45 &&
            props?.userRights.includes('VERIFICATION') &&
            props?.userRights.includes('CHECKER_WIDGET') &&
            props?.userRights.includes('RADAR_CHECK') &&
            props?.userRights?.includes('API_KEY') &&
            props?.userRights?.includes('APPLICATION') &&
            props?.userRights?.includes('STATUS')
        ) {
            navigate('/Reports')
            setTourGuide({ ...tourGuide, currentStep: 44 })
        } else if (
            tourGuide.currentStep === 45 &&
            !props?.userRights.includes('VERIFICATION') &&
            !props?.userRights.includes('CHECKER_WIDGET') &&
            !props?.userRights.includes('RADAR_CHECK') &&
            !props?.userRights?.includes('API_KEY') &&
            !props?.userRights?.includes('APPLICATION') &&
            !props?.userRights?.includes('STATUS')
        ) {
            navigate('/SDK-Library/Webhook')
            setTourGuide({ ...tourGuide, currentStep: 43 })
        } else if (
            tourGuide.currentStep === 49 &&
            !props.userRights.includes('API_KEY') &&
            !props.userRights.includes('STATUS') &&
            !props.userRights.includes('SUBSCRIPTION')
        ) {
            navigate('/SDK-Library/Webhook')
            setTourGuide({ ...tourGuide, currentStep: 43 })
        } else if (tourGuide.currentStep === 49 && !props?.userRights.includes('SUBSCRIPTION')) {
            navigate('/Reports')
            setTourGuide({ ...tourGuide, currentStep: 44 })
        } else if (tourGuide.currentStep === 49) {
            navigate('/Subscription')
            setTourGuide({ ...tourGuide, currentStep: 48, subscription_key: 'payment' })
        } else if (
            tourGuide.currentStep === 60 &&
            !props?.userRights.includes('BUSINESS_INFORMATION') &&
            !props?.userRights.includes('TEAM_MANAGEMENT') &&
            !props?.userRights.includes('ROLES') &&
            !props?.userRights.includes('NOTIFICATION')
        ) {
            navigate('/Settings')
            setTourGuide({ ...tourGuide, currentStep: 50 })
        } else if (tourGuide.currentStep === 60) {
            navigate('/Settings')
            setTourGuide({ ...tourGuide, currentStep: 59 })
        } 
        // else if (tourGuide.currentStep === 61) {
        //     navigate('/Notifications')
        //     setTourGuide({ ...tourGuide, currentStep: 60 })
        // }
    }

    const handleEndTour = () => {
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
        dispatch(tourGuideCompleteRequest(data))
        setTourGuide({
            isActive: true,
            currentStep: 0,
            onGoing: false,
            identitypass_data_verification: '',
            identitypass_country_code: '',
            identitypass_channel: '',
            radar_intelligenceCheck: '',
            subscription_key: '',
            subscription_page: '',
            add_team_member: false,
            checker_step: null,
        })
    }

    return (
        <>
            {/* {migrationModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto text-center">
                        <span onClick={() => setMigrationModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="greetings-area">
                                    <h5>Are you sure?</h5>
                                    <p>Do you want to switch to the old Identitypass dashboard</p>
                                </div>
                                <div className=" mt-3">
                                    <button
                                        className="btn btn-deep-green-outline me-2"
                                        onClick={() => setMigrationModal(false)}>
                                        Cancel
                                    </button>
                                    <a
                                        className="link"
                                        href={`https://dashboard.myidentitypass.com?email=${
                                            organisationInfoState?.resp?.data?.user?.email
                                        }&migrationSession=${Cookies.get('org') || ''}`}
                                        // href={`https://dev.myidentitypass.com?email=${organisationInfoState?.resp?.data?.user?.email}&migrationSession=${Cookies.get("org") || ""}`}
                                        // href={`http://localhost:3000?email=${organisationInfoState?.resp?.data?.user?.email}&migrationSession=${Cookies.get("org") || ""}`}
                                    >
                                        <button className="btn btn-deep-green">Yes, switch</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

            <div className="sidebar-area">
                {notif && notifVal && (
                    <NotificationToast
                        title={notifTitle}
                        message={notif}
                        closeNotif={() => setNotifVal(!notifVal)}
                    />
                )}

                {tourGuide.currentStep === 1 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div className="main-modal-tourguide-1 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>1/4</p>
                                    <div>
                                        <i
                                            className="ri-close-line close-tourguide-modal"
                                            onClick={handleSkipTour}
                                        />
                                    </div>
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Dashboard</h5>
                                        <p>
                                            The dashboard provides recent updates, transaction
                                            summaries, and your wallet balance. You can also fund
                                            your wallet directly from the dashboard.
                                        </p>
                                    </div>
                                    <div className="text-left d-flex flex-row align-items-center justify-content-between btn-reset">
                                        <button
                                            className="btn btn-deep-green-outline"
                                            onClick={handleSkipTour}>
                                            Skip Tour
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

                {tourGuide.currentStep === 5 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div className="main-modal-tourguide-5 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>1/12</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Data Verification</h5>
                                        <p>
                                            Perform KYC and KYB verification checks for individuals
                                            and businesses.
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
                {tourGuide.currentStep === 17 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div className="main-modal-tourguide-17 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>1/5</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Document Verification</h5>
                                        <p>
                                            Verify users using uploads of government-issued
                                            documents.
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

                {tourGuide.currentStep === 22 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div className="main-modal-tourguide-22 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>1/10</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>ID Checker Widget</h5>
                                        <p>
                                            Customise your verification checker Widget SDK according
                                            to your preferences.
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

                {tourGuide.currentStep === 32 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                                !props?.userRights.includes('VERIFICATION') &&
                                !props.userRights.includes('CHECKER_WIDGET') &&
                                props?.userRights.includes('RADAR_CHECK')
                                    ? 'main-modal-tourguide-32-alt'
                                    : 'main-modal-tourguide-32'
                            }`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>1/4</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Identity Radar</h5>
                                        <p>
                                            Perform KYC checks for emails, phone numbers, IP
                                            addresses, and names manually.
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

                {tourGuide.currentStep === 36 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`${
                                !props?.userRights.includes('RADAR_CHECK') &&
                                !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-36-alt'
                                    : 'main-modal-tourguide-36'
                            }  main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>1/8</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>API Libary</h5>
                                        <p>
                                            Here, you can find your API keys, App ID and status of
                                            all verification channels.
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

                {tourGuide.currentStep === 37 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`${
                                !props?.userRights.includes('RADAR_CHECK') &&
                                !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-37-alt'
                                    : 'main-modal-tourguide-37'
                            }  main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>2/8</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>API Keys</h5>
                                        <p>
                                            API keys provides you with your unique live and test
                                            environment API keys.
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

                {tourGuide.currentStep === 39 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`${
                                !props?.userRights.includes('RADAR_CHECK') &&
                                !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-39-alt'
                                    : 'main-modal-tourguide-39'
                            }  main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>4/8</p>
                                    {/* {!props?.userRights?.includes('API_KEY') &&
                                props?.userRights?.includes('APPLICATION') &&
                                props?.userRights?.includes('STATUS') ? (
                                    <p>1/5</p>
                                ) : (
                                    <p>4/8</p>
                                )} */}
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Applications</h5>
                                        <p>
                                            Applications enable you to create a space for your other
                                            business.
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

                {tourGuide.currentStep === 41 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`${
                                !props?.userRights.includes('RADAR_CHECK') &&
                                !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-41-alt'
                                    : 'main-modal-tourguide-41'
                            } main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>6/8</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>API Status</h5>
                                        <p>
                                            API status offers you real-time information on available
                                            and unavailable verification channels.
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

                {tourGuide.currentStep === 42 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                                props.userRights.includes('VIEW_REPORT') &&
                                !props.userRights.includes('VERIFICATION')
                                    ? 'main-modal-tourguide-42-rep'
                                    : !props?.userRights.includes(
                                          'VERIFICATION' && 'RADAR_CHECK'
                                      ) &&
                                      props.userRights.includes(
                                          'WALLET' && 'CARD' && 'SUBSCRIPTION'
                                      )
                                    ? 'main-modal-tourguide-42-lib'
                                    : !props.userRights.includes('API_KEY') &&
                                      !props.userRights.includes('STATUS')
                                    ? 'main-modal-tourguide-42-alt'
                                    : !props?.userRights.includes('RADAR_CHECK') &&
                                      !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-42-checker'
                                    : 'main-modal-tourguide-42'
                            }`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    {!props?.userRights.includes('VERIFICATION') &&
                                    !props?.userRights.includes('RADAR_CHECK') &&
                                    !props?.userRights?.includes('API_KEY') &&
                                    !props?.userRights?.includes('APPLICATION') &&
                                    !props?.userRights?.includes('STATUS') &&
                                    !props?.userRights.includes('CHECKER_WIDGET') ? (
                                        <p>1/2</p>
                                    ) : !props?.userRights?.includes('API_KEY') &&
                                      !props?.userRights?.includes('APPLICATION') ? (
                                        <p>1/2</p>
                                    ) : (
                                        <p>7/8</p>
                                    )}
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>SDK Libary</h5>
                                        <p>
                                            Documentation provides you with every vital information
                                            on API and SDK integration that you need to know. This
                                            includes code samples, API references, and guides to
                                            integration.
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

                {tourGuide.currentStep === 43 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                                props.userRights.includes('VIEW_REPORT') &&
                                !props.userRights.includes('VERIFICATION')
                                    ? 'main-modal-tourguide-43-doc'
                                    : !props?.userRights.includes(
                                          'VERIFICATION' && 'RADAR_CHECK'
                                      ) &&
                                      props.userRights.includes(
                                          'WALLET' && 'CARD' && 'SUBSCRIPTION'
                                      )
                                    ? 'main-modal-tourguide-43-doc'
                                    : !props?.userRights?.includes('API_KEY') &&
                                      !props?.userRights?.includes('APPLICATION')
                                    ? 'main-modal-tourguide-43-alt'
                                    : !props?.userRights.includes('RADAR_CHECK') &&
                                      !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-43-checker'
                                    : 'main-modal-tourguide-43'
                            }`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    {!props?.userRights.includes('VERIFICATION') &&
                                    !props?.userRights.includes('CHECKER_WIDGET') &&
                                    !props?.userRights.includes('RADAR_CHECK') &&
                                    !props?.userRights?.includes('API_KEY') &&
                                    !props?.userRights?.includes('APPLICATION') &&
                                    !props?.userRights?.includes('STATUS') &&
                                    !props?.userRights.includes('VERIFICATION') &&
                                    !props?.userRights.includes('CHECKER_WIDGET') ? (
                                        <p>2/2</p>
                                    ) : !props?.userRights?.includes('API_KEY') &&
                                      !props?.userRights?.includes('APPLICATION') ? (
                                        <p>2/2</p>
                                    ) : (
                                        <p>8/8</p>
                                    )}
                                    {/* <p>8/8</p> */}
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Documentation</h5>
                                        <p>
                                            Documentation provides you with every vital information
                                            on API and SDK integration that you need to know. This
                                            includes code samples, API references, and guides to
                                            integration.
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

                {tourGuide.currentStep === 44 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={` main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                                !props?.userRights.includes('RADAR_CHECK') &&
                                !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-44-checker'
                                    : props?.userRights?.includes(
                                          'CHECKER_WIDGET' &&
                                              'VERIFICATION' &&
                                              'RADAR_CHECK' &&
                                              'STATUS' &&
                                              'APPLICATION' &&
                                              'API_KEY' &&
                                              'WALLET' &&
                                              'VIEW_REPORT' &&
                                              'VIEW_DATA'
                                      )
                                    ? 'main-modal-tourguide-44-role'
                                    : props?.userRights?.includes('VIEW_REPORT') &&
                                      !props?.userRights.includes('SUBSCRIPTION')
                                    ? 'main-modal-tourguide-44-rep'
                                    : 'main-modal-tourguide-44'
                            }`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    {/* <p>1/5</p> */}
                                    {props?.userRights?.includes('VIEW_REPORT') &&
                                    !props?.userRights.includes('SUBSCRIPTION')
                                        ? '1/1'
                                        : '1/5'}
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Report</h5>
                                        <p>
                                            Report provides you more details of all your activities.
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

                {tourGuide.currentStep === 45 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                                !props?.userRights.includes('VIEW_REPORT')
                                    ? 'main-modal-tourguide-45-alt'
                                    : 'main-modal-tourguide-45'
                            }`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    {/* <p>2/5</p> */}
                                    {!props?.userRights.includes('VIEW_REPORT') ? (
                                        <p>1/4</p>
                                    ) : (
                                        <p>2/5</p>
                                    )}
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Subscriptions</h5>
                                        <p>
                                            Choose a subscription plan, add your payment and billing
                                            account, view your transaction history, and check your
                                            available wallet balance.
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

                {tourGuide.currentStep === 49 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                                !props?.userRights.includes('RADAR_CHECK') &&
                                !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-49-checker'
                                    : props?.userRights?.includes(
                                          'CHECKER_WIDGET' &&
                                              'VERIFICATION' &&
                                              'RADAR_CHECK' &&
                                              'STATUS' &&
                                              'APPLICATION' &&
                                              'API_KEY' &&
                                              'WALLET' &&
                                              'VIEW_REPORT' &&
                                              'VIEW_DATA'
                                      )
                                    ? 'main-modal-tourguide-49-role'
                                    : !props?.userRights.includes('BUSINESS_INFORMATION') &&
                                      !props?.userRights.includes('TEAM_MANAGEMENT') &&
                                      !props?.userRights.includes('ROLES') &&
                                      !props?.userRights.includes('NOTIFICATION')
                                    ? 'main-modal-tourguide-49-alt'
                                    : 'main-modal-tourguide-49'
                            }`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    {/* <p>1/11</p> */}
                                    {!props?.userRights.includes('BUSINESS_INFORMATION') &&
                                    !props?.userRights.includes('TEAM_MANAGEMENT') &&
                                    !props?.userRights.includes('ROLES') &&
                                    !props?.userRights.includes('NOTIFICATION') ? (
                                        <p>1/2</p>
                                    ) : props?.userRights?.includes('BUSINESS_INFORMATION') &&
                                      !props?.userRights?.includes('TEAM_MANAGEMENT') &&
                                      !props?.userRights?.includes('ROLES') &&
                                      props?.userRights?.includes('NOTIFICATION') ? (
                                        <p>1/5</p>
                                    ) : (
                                        <p>1/11</p>
                                    )}
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Settings</h5>
                                        <p>
                                            Manage and modify your personal information, business
                                            information, roles and permissions, and team members.
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

                {tourGuide.currentStep === 60 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                                !props?.userRights.includes('RADAR_CHECK') &&
                                !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-60-checker'
                                    : props?.userRights?.includes(
                                          'CHECKER_WIDGET' &&
                                              'VERIFICATION' &&
                                              'RADAR_CHECK' &&
                                              'STATUS' &&
                                              'APPLICATION' &&
                                              'API_KEY' &&
                                              'WALLET' &&
                                              'VIEW_REPORT' &&
                                              'VIEW_DATA'
                                      )
                                    ? 'main-modal-tourguide-60-role'
                                    : !userRights.includes('VERIFICATION') &&
                                      !userRights.includes('API_KEY') &&
                                      !userRights.includes('VIEW_REPORT') &&
                                      !userRights?.includes('SUBSCRIPTION')
                                    ? 'main-modal-tourguide-60-alt'
                                    : userRights?.includes('SUBSCRIPTION')
                                    ? 'main-modal-tourguide-60-noti'
                                    : 'main-modal-tourguide-60-noti-alt'
                            }`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>1/2</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    {/* <div className="text-left mt-3 text-black">
                                        <h5>Notification</h5>
                                        <p>
                                            View notifications on activities going on around your
                                            account.
                                        </p>
                                    </div> */}
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

                {tourGuide.currentStep === 61 && (
                    <div className="main-modal sm-turn-off-tour-guide">
                        <div
                            className={`main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                                !props?.userRights.includes('RADAR_CHECK') &&
                                !props.userRights.includes('CHECKER_WIDGET')
                                    ? 'main-modal-tourguide-61-checker'
                                    : !userRights.includes('VERIFICATION') &&
                                      !userRights.includes('API_KEY') &&
                                      !userRights.includes('VIEW_REPORT') &&
                                      !userRights?.includes('SUBSCRIPTION')
                                    ? 'main-modal-tourguide-61-alt'
                                    : userRights?.includes('SUBSCRIPTION') &&
                                      userRights.includes('VERIFICATION') &&
                                      userRights.includes('API_KEY') &&
                                      userRights.includes('VIEW_REPORT')
                                    ? 'main-modal-tourguide-61'
                                    : 'main-modal-tourguide-61'
                            }`}>
                            <div className="card-body-tourguide">
                                <div className="d-flex align-self-center tourguide-header">
                                    <p>2/2</p>
                                    <i
                                        className="ri-close-line close-tourguide-modal"
                                        onClick={handleSkipTour}
                                    />
                                </div>
                                <div className="main-modal-body-tourguide">
                                    <div className="text-left mt-3 text-black">
                                        <h5>Compliance Certificate</h5>
                                        <p>
                                            Our Compliance certificates proves that you can trust
                                            and rely on us!
                                        </p>
                                    </div>
                                    <div className="text-left d-flex flex-row align-items-center justify-content-between btn-reset">
                                        <button
                                            className="btn btn-deep-green-outline"
                                            onClick={handleBack}>
                                            Back
                                        </button>
                                        <button
                                            className="btn btn-dark-green"
                                            onClick={handleEndTour}>
                                            End
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="header py-2 py-md-3 py-lg-3 mx-auto">
                    <Link to="/" className="link ">
                        <img src={passLogo} width="130" alt="" />
                    </Link>
                    {!openSidebar ? (
                        <button
                            className="btn btn-expand d-lg-none"
                            onClick={() => setOpenSidebar(true)}>
                            <span>
                                <i className="ri-bar-chart-horizontal-line" />
                            </span>
                        </button>
                    ) : (
                        <button className="btn btn-expand" onClick={() => setOpenSidebar(false)}>
                            <span>
                                <i className="ri-close-line" />
                            </span>
                        </button>
                    )}
                </div>

                <div className="navigation mt-3 d-none d-lg-block">
                    <ul onClick={filterRights}>
                        <Link to="/" className="link">
                            <li className={splitLocation[1] === '' ? 'active' : ''}>
                                <span>
                                    <i className="ri-dashboard-fill" />
                                    Dashboard
                                </span>
                            </li>
                        </Link>

                        {/* <Link to="/Wallet" className="link" >
                        <li className={splitLocation[1] === "Wallet" ? "active" : ""}>
                            <span>
                                <i className="ri-wallet-3-line" />
                                Wallet
                            </span>
                        </li>
                    </Link> */}
                    </ul>
                    {/* <hr /> */}

                    {sidebarLoading === false && (
                        // ? (
                        //     [0, 1, 2, 3, 4, 5, 6].map((loader) => (
                        //         <div style={{ textAlign: 'center' }} key={loader} className="mb-2">
                        //             <Placeholder as="p" animation="glow">
                        //                 <Placeholder
                        //                     md={10}
                        //                     style={{ height: '10px', background: '#37B7AB' }}
                        //                 />
                        //                 <Placeholder
                        //                     md={10}
                        //                     style={{ height: '10px', background: '#37B7AB' }}
                        //                 />
                        //                 <Placeholder
                        //                     md={10}
                        //                     style={{ height: '10px', background: '#37B7AB' }}
                        //                 />
                        //             </Placeholder>
                        //         </div>
                        //     ))
                        // ) :
                        <>
                            <h6 style={{color:"#B853E6"}}> PRODUCTS </h6>
                            <ul onClick={filterRights}>
                                {!userRights?.includes('VERIFICATION') &&
                                !userRights?.includes('CHECKER_WIDGET') ? (
                                    ''
                                ) : (
                                    <>
                                    <Link
                                        to={
                                            userRights?.includes('VERIFICATION') &&
                                            '/Identitypass/Verification/Data'
                                         
                                        }
                                        className="link">
                                        <li
                                            className={
                                                splitLocation[3] === 'Data'
                                                    ? 'active'
                                                    : ''
                                            }
                                            onClick={() => setOpenSidebar(false)}
                                            style={{ padding: '7px 0px' }}
                                            >
                                            <span>
                                            <i className="ri-shield-check-line" />
                                                Data Verification
                                            </span>
                                        </li>
                                        
                                    </Link>

                                    <Link
                                        to={
                                            userRights?.includes('VERIFICATION') &&
                                            '/Identitypass/Verification/Document'
                                         
                                        }
                                        className="link">
                                        <li
                                            className={
                                                splitLocation[3] === 'Document'
                                                    ? 'active'
                                                    : ''
                                            }
                                            onClick={() => setOpenSidebar(false)}
                                            style={{ padding: '7px 0px' }}
                                            >
                                            <span>
                                              
                                                <i className="ri-qr-scan-2-line" />
                                                Document Verification
                                            </span>
                                          
                                        </li>
                                        
                                    </Link>
                                    <Link
                                        to={
                                            userRights?.includes('CHECKER_WIDGET') &&
                                            '/Identitypass/Checker-Widget'
                                         
                                        }
                                        className="link">
                                        <li
                                            className={
                                                splitLocation[2] === 'Checker-Widget'
                                                    ? 'active'
                                                    : ''
                                            }
                                            onClick={() => setOpenSidebar(false)}
                                            style={{ padding: '7px 0px' }}
                                            >
                                           <span>
                                              <i className="ri-insert-column-right" />
                                              Checker Widget
                                          </span>
                                          
                                        </li>
                                        
                                    </Link>
                                   </> 

                                )}
                                {/* </a> */}

                                {/* {userRights?.includes('RADAR_CHECK') && (
                                    <Link to="/Identityradar/Radar-Check" className="link">
                                        <li
                                            className={
                                                splitLocation[1] === 'Identityradar'
                                                    ? 'active has-dropdown reduced-40'
                                                    : ''
                                            }
                                            style={{ padding: '12px 0px' }}>
                                            <span>
                                                {splitLocation[1] === 'Identityradar' ? (
                                                    <img src={radarIcon} alt="" />
                                                ) : (
                                                    <img src={radarIconBlack} alt="" />
                                                )}
                                                Identityradar
                                            </span>
                                            <span>
                                                {splitLocation[1] === 'Identityradar' && (
                                                    <div className="sidebar-dropdown">
                                                        <ul>
                                                            <Link
                                                                to="/Identityradar/Radar-Check"
                                                                className="link">
                                                                <li
                                                                    className={
                                                                        splitLocation[2] ===
                                                                        'Radar-Check'
                                                                            ? 'active'
                                                                            : ''
                                                                    }>
                                                                    Radar Check
                                                                </li>
                                                            </Link>
                                                        </ul>
                                                    </div>
                                                )}
                                            </span>
                                           
                                        </li>
                                    </Link>
                                )} */}
                                {/* <Link to={'/BackgroundCheck/Requests'} className="link">
                                    <li
                                        className={
                                            splitLocation[1] === 'BackgroundCheck'
                                                ? 'active has-dropdown increased-100'
                                                : ''
                                        }
                                        style={{ padding: '7px 0px' }}>
                                        <span>
                                            {splitLocation[1] === 'BackgroundCheck' ? (
                                                <img src={formIcon} alt="" className="py-2" />
                                            ) : (
                                                <img src={formIconBlack} alt="" className="py-2" />
                                            )}
                                            Background Check
                                        </span>
                                        {splitLocation[1] === 'BackgroundCheck' && (
                                            <div className="sidebar-dropdown">
                                                <ul>
                                                
                                                    <Link
                                                        to="/BackgroundCheck/Requests"
                                                        className="link">
                                                        <li
                                                            className={
                                                                splitLocation[2] === 'Requests'
                                                                    ? 'active'
                                                                    : ''
                                                            }>
                                                            Requests
                                                        </li>
                                                    </Link>
                                                   <Link
                                                        to="/BackgroundCheck/Packages"
                                                        className="link">
                                                        <li
                                                            className={
                                                                splitLocation[2] === 'Packages'
                                                                    ? 'active'
                                                                    : ''
                                                            }>
                                                            Packages
                                                        </li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                </Link> */}
                                {/* <li style={{ padding: "12px 0px" }}> */}
                                {/* <Link to="/Identityradar/Radar-Check" className="link">
                                        <li
                                            className={
                                                splitLocation[1] === 'Identityradar'
                                                    ? 'active has-dropdown reduced-40'
                                                    : ''
                                            }
                                            style={{ padding: '12px 0px' }}>
                                        </li>
                                    </Link> */}
                                {/* <li style={{ padding: "12px 0px" }}>

                                <span>
                                        {splitLocation[1] === "BackgroundCheck" 
                                            ? 
                                            <img src={formIcon} alt="" />
                                            : 
                                            <img src={formIconBlack} alt="" />
                                        }
                                    Background Check
                                </span>
                            </li>
                                {/* <li style={{padding:"12px 0px"}}>
                                <span>
                                    <img src={formIcon} alt="" />
                                    IdentityForms
                                </span>
                            </li>
                            <li style={{padding:"12px 0px"}}>
                                <span>
                                    <img src={graphIcon} alt="" />
                                    IdentityGraph
                                </span>
                            </li> */}
                            </ul>
                            {/* <hr /> */}

                            <h6  style={{color:"#B853E6"}}>INTEGRATIONS </h6>
                            <ul onClick={filterRights}>
                                {!userRights?.includes('STATUS') &&
                                !userRights?.includes('APPLICATION') &&
                                !userRights?.includes('API_KEY') ? (
                                    ''
                                ) : (
                                    <Link
                                        to={
                                            userRights?.includes('STATUS') &&
                                            !userRights?.includes('APPLICATION') &&
                                            !userRights?.includes('API_KEY')
                                                ? '/API-Library/Status'
                                                : (userRights?.includes('APPLICATION') &&
                                                      !userRights?.includes('API_KEY') &&
                                                      !userRights?.includes('STATUS')) ||
                                                  (userRights?.includes('APPLICATION') &&
                                                      userRights?.includes('STATUS') &&
                                                      !userRights?.includes('API_KEY'))
                                                ? '/API-Library/Applications'
                                                : (userRights?.includes('API_KEY') &&
                                                      !userRights?.includes('APPLICATION') &&
                                                      !userRights?.includes('STATUS')) ||
                                                  (userRights?.includes('API_KEY') &&
                                                      userRights?.includes('APPLICATION') &&
                                                      !userRights?.includes('STATUS')) ||
                                                  (userRights?.includes('API_KEY') &&
                                                      !userRights?.includes('APPLICATION') &&
                                                      userRights?.includes('STATUS')) ||
                                                  (userRights?.includes('API_KEY') &&
                                                      userRights?.includes('APPLICATION') &&
                                                      userRights?.includes('STATUS'))
                                                ? '/API-Library/API-Keys'
                                                : ''
                                        }
                                        className="link">
                                        <li
                                            className={
                                                splitLocation[1] === 'API-Library'
                                                    ? 'active has-dropdown increased-100'
                                                    : ''
                                            }
                                            style={{ padding: '7px 0px' }}>
                                            <span>
                                                <i className="ri-code-box-line" />
                                                Api Library
                                            </span>
                                            {splitLocation[1] === 'API-Library' && (
                                                <div className="sidebar-dropdown">
                                                    <ul>
                                                        {userRights?.includes('API_KEY') && (
                                                            <Link
                                                                to="/API-Library/API-Keys"
                                                                className="link">
                                                                <li
                                                                    className={
                                                                        splitLocation[2] ===
                                                                        'API-Keys'
                                                                            ? 'active'
                                                                            : ''
                                                                    }>
                                                                    API Keys
                                                                </li>
                                                            </Link>
                                                        )}

                                                        {userRights?.includes('APPLICATION') && (
                                                            <Link
                                                                to="/API-Library/Applications"
                                                                className="link">
                                                                <li
                                                                    className={
                                                                        splitLocation[2] ===
                                                                        'Applications'
                                                                            ? 'active'
                                                                            : ''
                                                                    }>
                                                                    Applications
                                                                </li>
                                                            </Link>
                                                        )}

                                                        {userRights?.includes('STATUS') && (
                                                            <Link
                                                                to="/API-Library/API-Status"
                                                                className="link">
                                                                <li
                                                                    className={
                                                                        splitLocation[2] ===
                                                                        'API-Status'
                                                                            ? 'active'
                                                                            : ''
                                                                    }>
                                                                    API Status
                                                                </li>
                                                            </Link>
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    </Link>
                                )}
                                {/* <Link to="/Api-Library" className="link" >
                                    <li className={splitLocation[1] === "Api-Library" ? "active" : ""}>
                                        <span>
                                            <i className="ri-apps-line" />
                                            Api Library
                                        </span>
                                    </li>
                                </Link> */}

                                <a
                                    href={`${global.appBaseUrl}SDK-Library/Webhook`}
                                    className="link">
                                    <li
                                        className={
                                            splitLocation[1] === 'SDK-Library'
                                                ? 'active has-dropdown increased-100'
                                                : ''
                                        }
                                        style={{ padding: '7px 0px' }}>
                                        <span>
                                            <i className="ri-file-line" />
                                            SDK Library
                                        </span>
                                        {splitLocation[1] === 'SDK-Library' && (
                                            <div className="sidebar-dropdown">
                                                <ul>
                                                    <Link
                                                        to="/SDK-Library/Webhook"
                                                        className="link">
                                                        <li
                                                            className={
                                                                splitLocation[2] === 'Webhook'
                                                                    ? 'active'
                                                                    : ''
                                                            }>
                                                            Webhook
                                                        </li>
                                                    </Link>

                                                    <a
                                                        href="https://docs.prembly.com/docs/identity-verification-sdk"
                                                        className="link"
                                                        target="_blank"
                                                        rel="noopener noreferrer">
                                                        <li>ID Verification SDK</li>
                                                    </a>

                                                    <a
                                                        href="https://docs.prembly.com/docs/bank-statement"
                                                        className="link"
                                                        target="_blank"
                                                        rel="noopener noreferrer">
                                                        <li>Bank Statement SDK</li>
                                                    </a>
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                </a>

                                <li>
                                    <a
                                        href="https://docs.prembly.com/docs"
                                        className="link"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <span>
                                            <i className="ri-file-text-line" />
                                            Documentations
                                        </span>
                                    </a>
                                </li>
                            </ul>

                            <h6  style={{color:"#B853E6"}}>GENERAL </h6>
                            <ul onClick={filterRights}>
                                {!userRights?.includes('VIEW_REPORT') &&
                                !userRights?.includes('VIEW_DATA') ? (
                                    ''
                                ) : (
                                    <Link to="/Reports" className="link">
                                        <li
                                            className={
                                                splitLocation[1] === 'Reports' ? 'active' : ''
                                            }>
                                            <span>
                                                <i className="ri-bar-chart-grouped-fill" />
                                                Reports
                                            </span>
                                        </li>
                                    </Link>
                                )}

                                {!userRights?.includes('WALLET') &&
                                !userRights?.includes('CARD') &&
                                !userRights?.includes('SUBSCRIPTION') ? (
                                    ''
                                ) : (
                                    <Link to="/Subscription" className="link">
                                        <li
                                            className={
                                                splitLocation[1] === 'Subscription' ? 'active' : ''
                                            }>
                                            <span>
                                                <i className="ri-exchange-box-line" />
                                                Subscriptions
                                            </span>
                                        </li>
                                    </Link>
                                )}

                                {/* <Link to="/Referral" className="link">
                                    <li className={splitLocation[1] === 'Referral' ? 'active' : ''}>
                                        <span>
                                            <i className="ri-team-line" />
                                            Referral
                                        </span>
                                    </li>
                                </Link> */}

                                <Link to="/Settings" className="link">
                                    <li className={splitLocation[1] === 'Settings' ? 'active' : ''}>
                                        <span>
                                            <i className="ri-settings-5-line" />
                                            Settings
                                        </span>
                                    </li>
                                </Link>
                            </ul>
                        </>
                    )}

                    {/* <h6  style={{color:"#B853E6"}}>OFFERINGS</h6>
                    <ul onClick={filterRights}>
                        {!userRights?.includes('VERIFICATION') &&
                        !userRights?.includes('CHECKER_WIDGET') ? (
                            ''
                        ) : (
                            <>
                                <Link
                                    to={`/Perks-And-Discount?industry=${encodeURIComponent('all')}`}
                                    className="link">
                                    <li
                                        className={
                                            splitLocation[1] === 'Perks-And-Discount'
                                                ? 'active'
                                                : ''
                                        }
                                        style={{ padding: '12px 0px' }}>
                                        <span>
                                            {splitLocation[1] === 'Perks-And-Discount' ? (
                                                <img src={perksActive} />
                                            ) : (
                                                <img src={perksInactive} />
                                            )}
                                            Perks & Discount
                                        </span>
                                    </li>
                                </Link>
                            </>
                        )}
                    </ul> */}

                    <h6 style={{color:"#B853E6"}}>OTHERS</h6>
                    <ul onClick={filterRights}>
                        {/* <Link to="/Notifications" className="link">
                            <li className={splitLocation[1] === 'Notifications' ? 'active' : ''}>
                                <span>
                                    <i className="ri-notification-3-line" />
                                    Notifications
                                </span>
                            </li>
                        </Link> */}
                        <Link to="/faqs" className="link">
                            <li className={splitLocation[1] === 'Faqs' ? 'active' : ''}>
                                <span>
                                    <i className="ri-questionnaire-line" />
                                    FAQs
                                </span>
                            </li>
                        </Link>
                        {/* <Link to="/Compliance-Certificates" className="link"> */}
                        {/* <a
                            href="https://app.drata.com/trust/25ec0103-c2ef-4f7f-b065-0151620dec24"
                            className="link"
                            target="_blank"
                            rel="noopener noreferrer"=>
                            <li
                                className={
                                    splitLocation[1] === 'Compliance-Certificates' ? 'active' : ''
                                }>
                                <span>
                                    <i className="ri-file-paper-2-line" />
                                    Compliance Certificates
                                </span>
                            </li>
                        </a> */}
                        {/* </Link> */}
                    </ul>
                    {organisationInfoState?.resp?.data?.user?.migrated && (
                        <div
                            className="mt-5 mb-4"
                            style={{ paddingLeft: '13%', cursor: 'pointer' }}
                            onClick={() => window.location.href = host}>
                            <button
                                className="btn"
                                style={{
                                    background: '#5D16B1',
                                    color: '#fff',
                                    font: '14px S-medium',
                                    padding: '15px 10px',
                                }}>
                                Switch to <img src={PremblyLogo} style={{ height: '20px' }} alt="" />{' '}
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile and tablet sidebar starts here ---------------------------*/}
                {openSidebar && (
                    <>
                        {sidebarLoading === false && (
                            <div className="navigation d-lg-none">
                                <ul onClick={filterRights}>
                                    <Link to="/" className="link">
                                        <li
                                            onClick={() => setOpenSidebar(false)}
                                            className={splitLocation[1] === '' ? 'active' : ''}>
                                            <span>
                                                <i className="ri-dashboard-fill" />
                                                Dashboard
                                            </span>
                                        </li>
                                    </Link>
                                </ul>

                                <h6>PRODUCTS </h6>
                                <ul onClick={filterRights}>
                                    {!userRights?.includes('VERIFICATION') &&
                                    !userRights?.includes('CHECKER_WIDGET') ? (
                                        ''
                                    ) : (
                                        <Link
                                            to={
                                                userRights?.includes('CHECKER_WIDGET') &&
                                                !userRights?.includes('VERIFICATION')
                                                    ? '/Identitypass/Checker-Widget'
                                                    : (userRights?.includes('VERIFICATION') &&
                                                          !userRights?.includes(
                                                              'CHECKER_WIDGET'
                                                          )) ||
                                                      (userRights?.includes('VERIFICATION') &&
                                                          userRights?.includes('CHECKER_WIDGET'))
                                                    ? '/Identitypass/Verification/Data'
                                                    : ''
                                            }
                                            className="link">
                                            <li
                                                onClick={() => setOpenSidebar(false)}
                                                className={
                                                    splitLocation[1] === 'Identitypass'
                                                        ? 'active has-dropdown'
                                                        : ''
                                                }
                                                style={{ padding: '12px 0px' }}>
                                                <span>
                                                    {splitLocation[1] === 'Identitypass' ? (
                                                        <img src={passIcon} alt="" />
                                                    ) : (
                                                        <img src={passIconBlack} alt="" />
                                                    )}
                                                    Identitypass
                                                </span>
                                                {splitLocation[1] === 'Identitypass' && (
                                                    <div className="sidebar-dropdown">
                                                        <ul>
                                                            {userRights?.includes(
                                                                'VERIFICATION'
                                                            ) && (
                                                                <Link
                                                                    to="/Identitypass/Verification/Data"
                                                                    className="link">
                                                                    <li
                                                                        className={
                                                                            splitLocation[3] ===
                                                                            'Data'
                                                                                ? 'active'
                                                                                : ''
                                                                        }>
                                                                        Data Verification
                                                                    </li>
                                                                </Link>
                                                            )}

                                                            {userRights?.includes(
                                                                'VERIFICATION'
                                                            ) && (
                                                                <Link
                                                                    to="/Identitypass/Verification/Document"
                                                                    className="link">
                                                                    <li
                                                                        className={
                                                                            splitLocation[3] ===
                                                                            'Document'
                                                                                ? 'active'
                                                                                : ''
                                                                        }>
                                                                        Document Verification
                                                                    </li>
                                                                </Link>
                                                            )}

                                                            {userRights?.includes(
                                                                'CHECKER_WIDGET'
                                                            ) && (
                                                                <Link
                                                                    to="/Identitypass/Checker-Widget"
                                                                    className="link">
                                                                    <li
                                                                        className={
                                                                            splitLocation[2] ===
                                                                            'Checker-Widget'
                                                                                ? 'active'
                                                                                : ''
                                                                        }>
                                                                        ID Checker Widget
                                                                    </li>
                                                                </Link>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                             
                                            </li>
                                        </Link>
                                    )}
                                  
                                    {userRights?.includes('RADAR_CHECK') && (
                                        <Link to="/Identityradar/Radar-Check" className="link">
                                            <li
                                                onClick={() => setOpenSidebar(false)}
                                                className={
                                                    splitLocation[1] === 'Identityradar'
                                                        ? 'active has-dropdown reduced-40'
                                                        : ''
                                                }
                                                style={{ padding: '12px 0px' }}>
                                                <span>
                                                    {splitLocation[1] === 'Identityradar' ? (
                                                        <img src={radarIcon} alt="" />
                                                    ) : (
                                                        <img src={radarIconBlack} alt="" />
                                                    )}
                                                    Identityradar
                                                </span>
                                                {splitLocation[1] === 'Identityradar' && (
                                                    <div className="sidebar-dropdown">
                                                        <ul>
                                                            <Link
                                                                to="/Identityradar/Radar-Check"
                                                                className="link">
                                                                <li
                                                                    className={
                                                                        splitLocation[2] ===
                                                                        'Radar-Check'
                                                                            ? 'active'
                                                                            : ''
                                                                    }>
                                                                    Radar Check
                                                                </li>
                                                            </Link>
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>
                                        </Link>
                                    )}
                                    <Link to={'/BackgroundCheck/Requests'} className="link">
                                        <li
                                            onClick={() => setOpenSidebar(false)}
                                            className={
                                                splitLocation[1] === 'BackgroundCheck'
                                                    ? 'active has-dropdown increased-100'
                                                    : ''
                                            }
                                            style={{ padding: '12px 0px' }}>
                                            <span>
                                                {splitLocation[1] === 'BackgroundCheck' ? (
                                                    <img src={formIcon} alt="" className="py-2" />
                                                ) : (
                                                    <img
                                                        src={formIconBlack}
                                                        alt=""
                                                        className="py-2"
                                                    />
                                                )}
                                                Background Check
                                            </span>
                                            {splitLocation[1] === 'BackgroundCheck' && (
                                                <div className="sidebar-dropdown">
                                                    <ul>
                                                        <Link
                                                            to="/BackgroundCheck/Requests"
                                                            className="link">
                                                            <li
                                                                className={
                                                                    splitLocation[2] === 'Requests'
                                                                        ? 'active'
                                                                        : ''
                                                                }>
                                                                Requests
                                                            </li>
                                                        </Link>
                                                        <Link
                                                            to="/BackgroundCheck/Packages"
                                                            className="link">
                                                            <li
                                                                className={
                                                                    splitLocation[2] === 'Packages'
                                                                        ? 'active'
                                                                        : ''
                                                                }>
                                                                Packages
                                                            </li>
                                                        </Link>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    </Link>
                                    {/* <li style={{ padding: "12px 0px" }}>
                        <span>
                                {splitLocation[1] === "BackgroundCheck" 
                                    ? 
                                    <img src={formIcon} alt="" />
                                    : 
                                    <img src={formIconBlack} alt="" />
                                }
                            Background Check
                        </span>
                    </li> */}
                                </ul>

                                <h6  style={{color:"#B853E6"}}>INTEGRATIONS </h6>
                                <ul onClick={filterRights}>
                                    {!userRights?.includes('STATUS') &&
                                    !userRights?.includes('APPLICATION') &&
                                    !userRights?.includes('API_KEY') ? (
                                        ''
                                    ) : (
                                        <Link
                                            to={
                                                userRights?.includes('STATUS') &&
                                                !userRights?.includes('APPLICATION') &&
                                                !userRights?.includes('API_KEY')
                                                    ? '/API-Library/Status'
                                                    : (userRights?.includes('APPLICATION') &&
                                                          !userRights?.includes('API_KEY') &&
                                                          !userRights?.includes('STATUS')) ||
                                                      (userRights?.includes('APPLICATION') &&
                                                          userRights?.includes('STATUS') &&
                                                          !userRights?.includes('API_KEY'))
                                                    ? '/API-Library/Applications'
                                                    : (userRights?.includes('API_KEY') &&
                                                          !userRights?.includes('APPLICATION') &&
                                                          !userRights?.includes('STATUS')) ||
                                                      (userRights?.includes('API_KEY') &&
                                                          userRights?.includes('APPLICATION') &&
                                                          !userRights?.includes('STATUS')) ||
                                                      (userRights?.includes('API_KEY') &&
                                                          !userRights?.includes('APPLICATION') &&
                                                          userRights?.includes('STATUS')) ||
                                                      (userRights?.includes('API_KEY') &&
                                                          userRights?.includes('APPLICATION') &&
                                                          userRights?.includes('STATUS'))
                                                    ? '/API-Library/API-Keys'
                                                    : ''
                                            }
                                            className="link">
                                            <li
                                                onClick={() => setOpenSidebar(false)}
                                                className={
                                                    splitLocation[1] === 'API-Library'
                                                        ? 'active has-dropdown increased-100'
                                                        : ''
                                                }
                                                style={{ padding: '7px 0px' }}>
                                                <span>
                                                    <i className="ri-code-box-line" />
                                                    Api Library
                                                </span>
                                                {splitLocation[1] === 'API-Library' && (
                                                    <div className="sidebar-dropdown">
                                                        <ul>
                                                            {userRights?.includes('API_KEY') && (
                                                                <Link
                                                                    to="/API-Library/API-Keys"
                                                                    className="link">
                                                                    <li
                                                                        className={
                                                                            splitLocation[2] ===
                                                                            'API-Keys'
                                                                                ? 'active'
                                                                                : ''
                                                                        }>
                                                                        API Keys
                                                                    </li>
                                                                </Link>
                                                            )}

                                                            {userRights?.includes(
                                                                'APPLICATION'
                                                            ) && (
                                                                <Link
                                                                    to="/API-Library/Applications"
                                                                    className="link">
                                                                    <li
                                                                        className={
                                                                            splitLocation[2] ===
                                                                            'Applications'
                                                                                ? 'active'
                                                                                : ''
                                                                        }>
                                                                        Applications
                                                                    </li>
                                                                </Link>
                                                            )}

                                                            {userRights?.includes('STATUS') && (
                                                                <Link
                                                                    to="/API-Library/API-Status"
                                                                    className="link">
                                                                    <li
                                                                        className={
                                                                            splitLocation[2] ===
                                                                            'API-Status'
                                                                                ? 'active'
                                                                                : ''
                                                                        }>
                                                                        API Status
                                                                    </li>
                                                                </Link>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>
                                        </Link>
                                    )}

                                    <a
                                        href={`${global.appBaseUrl}SDK-Library/Webhook`}
                                        onClick={() => setOpenSidebar(false)}
                                        className="link">
                                        <li
                                            className={
                                                splitLocation[1] === 'SDK-Library'
                                                    ? 'active has-dropdown increased-100'
                                                    : ''
                                            }
                                            style={{ padding: '7px 0px' }}>
                                            <span>
                                                <i className="ri-file-line" />
                                                SDK Library
                                            </span>
                                            {splitLocation[1] === 'SDK-Library' && (
                                                <div className="sidebar-dropdown">
                                                    <ul>
                                                        <Link
                                                            to="/SDK-Library/Webhook"
                                                            className="link">
                                                            <li
                                                                className={
                                                                    splitLocation[2] === 'Webhook'
                                                                        ? 'active'
                                                                        : ''
                                                                }>
                                                                Webhook
                                                            </li>
                                                        </Link>

                                                        <a
                                                            href="https://docs.prembly.com/docs/identity-verification-sdk"
                                                            className="link"
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            <li>ID Verification SDK</li>
                                                        </a>

                                                        <a
                                                            href="https://docs.prembly.com/docs/bank-statement"
                                                            className="link"
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            <li>Bank Statement SDK</li>
                                                        </a>
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    </a>

                                    <li onClick={() => setOpenSidebar(false)}>
                                        <a
                                            href="https://docs.prembly.com/docs"
                                            className="link"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <span>
                                                <i className="ri-file-text-line" />
                                                Documentations
                                            </span>
                                        </a>
                                    </li>
                                </ul>

                                <h6  style={{color:"#B853E6"}}>GENERAL </h6>
                                <ul onClick={filterRights}>
                                    {!userRights?.includes('VIEW_REPORT') &&
                                    !userRights?.includes('VIEW_DATA') ? (
                                        ''
                                    ) : (
                                        <Link to="/Reports" className="link">
                                            <li
                                                onClick={() => setOpenSidebar(false)}
                                                className={
                                                    splitLocation[1] === 'Reports' ? 'active' : ''
                                                }>
                                                <span>
                                                    <i className="ri-bar-chart-grouped-fill" />
                                                    Reports
                                                </span>
                                            </li>
                                        </Link>
                                    )}

                                    {!userRights?.includes('WALLET') &&
                                    !userRights?.includes('CARD') &&
                                    !userRights?.includes('SUBSCRIPTION') ? (
                                        ''
                                    ) : (
                                        <Link to="/Subscription" className="link">
                                            <li
                                                onClick={() => setOpenSidebar(false)}
                                                className={
                                                    splitLocation[1] === 'Subscription'
                                                        ? 'active'
                                                        : ''
                                                }>
                                                <span>
                                                    <i className="ri-exchange-box-line" />
                                                    Subscriptions
                                                </span>
                                            </li>
                                        </Link>
                                    )}

                                    {/* <Link to="/Referral" className="link">
                                        <li
                                            onClick={() => setOpenSidebar(false)}
                                            className={
                                                splitLocation[1] === 'Referral' ? 'active' : ''
                                            }>
                                            <span>
                                                <i className="ri-team-line" />
                                                Referral
                                            </span>
                                        </li>
                                    </Link> */}

                                    <Link to="/Settings" className="link">
                                        <li
                                            onClick={() => setOpenSidebar(false)}
                                            className={
                                                splitLocation[1] === 'Settings' ? 'active' : ''
                                            }>
                                            <span>
                                                <i className="ri-settings-5-line" />
                                                Settings
                                            </span>
                                        </li>
                                    </Link>
                                </ul>

                                <h6  style={{color:"#B853E6"}}>OTHERS</h6>
                                    {/* <Link to="/Notifications" className="link">
                                        <li
                                            onClick={() => setOpenSidebar(false)}
                                            className={
                                                splitLocation[1] === 'Notifications' ? 'active' : ''
                                            }>
                                            <span>
                                                <i className="ri-questionnaire-line" />
                                                Notifications
                                            </span>
                                        </li>
                                    </Link> */}
                                    <Link to="/faqs" className="link">
                                        <li
                                            onClick={() => setOpenSidebar(false)}
                                            className={
                                                splitLocation[1] === 'Faqs' ? 'active' : ''
                                            }>
                                            <span>
                                                <i className="ri-notification-3-line" />
                                                FAQs
                                            </span>
                                        </li>
                                    </Link>
                                    
                            </div>
                        )}
                        {/* {organisationInfoState?.resp?.data?.user?.migrated && (
                            <div
                                className="mt-5 mb-4"
                                style={{ paddingLeft: '13%', cursor: 'pointer' }}
                                onClick={() => setMigrationModal(true)}>
                                <button
                                    className="btn"
                                    style={{
                                        background: '#5D16B1',
                                        color: '#fff',
                                        font: '14px S-medium',
                                        padding: '15px 10px',
                                    }}>
                                    Switch to{''}
                                    <img src={passIcon} style={{ height: '20px' }} alt="" />{' '}
                                    Identitypass
                                </button>
                            </div>
                        )} */}
                    </>
                )}
            </div>
        </>
    )
}
