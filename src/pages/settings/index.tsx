import { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import BusinessInfo from '../../components/settings/businessInfo'
import NotificationSettings from '../../components/settings/notificationSettings'
import ProfileInfo from '../../components/settings/profileInfo'
import RolesComp from '../../components/settings/roles'
import TeamsComp from '../../components/settings/teams'
import useTourGuide from '../../hooks/useTourGuide'

export default function SettingsPage(props: any) {
    const queryParams = new URLSearchParams(window.location.search)
    const [key, setKey] = useState<any>(
        queryParams.get('kyc') !== 'true' ? 'profileInfo' : 'businessInfo'
    )
    const [tourGuide, setTourGuide] = useTourGuide()
    const navigate = useNavigate()

    useEffect(() => {
        if (tourGuide.currentStep === 44) {
            setKey('roles')
        } else if (tourGuide.currentStep === 47) {
            setKey('notifications')
        } else if (tourGuide.currentStep === 43) {
            setKey('teams')
        } else if (tourGuide.currentStep === 55) {
            setKey('roles')
        } else if (tourGuide.currentStep === 58) {
            setKey('notifications')
        } else if (tourGuide.currentStep === 59) {
            setKey('notifications')
        }
    }, [tourGuide])

    const handleNext = () => {
        if (
            tourGuide.currentStep === 50 &&
            props?.userRights.includes('BUSINESS_INFORMATION') &&
            props?.userRights.includes('TEAM_MANAGEMENT') &&
            props?.userRights.includes('ROLES') &&
            props?.userRights.includes('NOTIFICATION')
        ) {
            setTourGuide({
                ...tourGuide,
                currentStep: 51,
            })
            setKey('businessInfo')
        } else if (
            tourGuide.currentStep === 50 &&
            !props?.userRights.includes('BUSINESS_INFORMATION') &&
            !props?.userRights.includes('TEAM_MANAGEMENT') &&
            !props?.userRights.includes('ROLES') &&
            !props?.userRights.includes('NOTIFICATION')
        ) {
            navigate('/Notifications')
            setTourGuide({ ...tourGuide, currentStep: 60 })
        } else if (
            tourGuide.currentStep === 50 &&
            props?.userRights?.includes('BUSINESS_INFORMATION') &&
            !props?.userRights?.includes('TEAM_MANAGEMENT') &&
            !props?.userRights?.includes('ROLES') &&
            props?.userRights?.includes('NOTIFICATION')
        ) {
            // navigate('/Notifications')
            setKey('businessInfo')
            setTourGuide({ ...tourGuide, currentStep: 51 })
        } else if (
            tourGuide.currentStep === 50 &&
            props?.userRights.includes('BUSINESS_INFORMATION') &&
            !props?.userRights?.includes('ROLES') &&
            !props?.userRights?.includes('TEAM_MANAGEMENT')
        ) {
            setTourGuide({ ...tourGuide, currentStep: 58 })
        } else if (
            tourGuide.currentStep === 51 &&
            props?.userRights?.includes('BUSINESS_INFORMATION') &&
            !props?.userRights?.includes('ROLES')
        ) {
            setTourGuide({ ...tourGuide, currentStep: 58 })
        } else if (tourGuide.currentStep === 51) {
            setTourGuide({ ...tourGuide, currentStep: 52 })
            setKey('teams')
        } else if (tourGuide.currentStep === 52) {
            setTourGuide({ ...tourGuide, currentStep: 53 })
        } else if (tourGuide.currentStep === 53) {
            setTourGuide({ ...tourGuide, currentStep: 54, add_team_member: true })
        } else if (tourGuide.currentStep === 55) {
            setTourGuide({ ...tourGuide, currentStep: 56 })
        } else if (tourGuide.currentStep === 58) {
            setTourGuide({ ...tourGuide, currentStep: 59 })
        }
    }

    const handleBack = () => {
        if (tourGuide.currentStep === 39) {
            setTourGuide({ ...tourGuide, currentStep: 38 })
        } else if (tourGuide.currentStep === 40) {
            setKey('profileInfo')
            setTourGuide({ ...tourGuide, currentStep: 39 })
        } else if (tourGuide.currentStep === 41) {
            setKey('businessInfo')
            setTourGuide({ ...tourGuide, currentStep: 40 })
        } else if (tourGuide.currentStep === 42) {
            setTourGuide({ ...tourGuide, currentStep: 41 })
        } else if (tourGuide.currentStep === 44) {
            setTourGuide({ ...tourGuide, currentStep: 43 })
        } else if (tourGuide.currentStep === 47) {
            setTourGuide({ ...tourGuide, currentStep: 46 })
        } else if (tourGuide.currentStep === 50) {
            setTourGuide({ ...tourGuide, currentStep: 49 })
        } else if (tourGuide.currentStep === 51) {
            setKey('profileInfo')
            setTourGuide({ ...tourGuide, currentStep: 50 })
        } else if (tourGuide.currentStep === 52) {
            setKey('businessInfo')
            setTourGuide({ ...tourGuide, currentStep: 51 })
        } else if (tourGuide.currentStep === 53) {
            setKey('teams')
            setTourGuide({ ...tourGuide, currentStep: 52 })
        } else if (tourGuide.currentStep === 55) {
            setKey('teams')
            setTourGuide({ ...tourGuide, currentStep: 54 })
        } else if (
            tourGuide.currentStep === 58 &&
            !props?.userRights?.includes('ROLES') &&
            !props?.userRights?.includes('TEAM_MANAGEMENT')
        ) {
            setKey('businessInfo')
            setTourGuide({ ...tourGuide, currentStep: 51 })
        } else if (tourGuide.currentStep === 58) {
            setKey('roles')
            setTourGuide({ ...tourGuide, currentStep: 57 })
        }
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    return (
        <div className="settings-area container-fluid px-md-4 mt-4">
            {tourGuide.currentStep === 50 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-50 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                {/* <p>2/11</p> */}
                                {!props?.userRights.includes('BUSINESS_INFORMATION') &&
                                !props?.userRights.includes('TEAM_MANAGEMENT') &&
                                !props?.userRights.includes('ROLES') &&
                                !props?.userRights.includes('NOTIFICATION') ? (
                                    <p>2/2</p>
                                ) : props?.userRights?.includes('BUSINESS_INFORMATION') &&
                                  !props?.userRights?.includes('TEAM_MANAGEMENT') &&
                                  !props?.userRights?.includes('ROLES') &&
                                  props?.userRights?.includes('NOTIFICATION') ? (
                                    <p>2/5</p>
                                ) : (
                                    <p>2/11</p>
                                )}
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Profile Information</h5>
                                    <p>Update your profile information and saves changes.</p>
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
            {tourGuide.currentStep === 51 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-51 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                {/* <p>3/11</p> */}
                                {props?.userRights?.includes('BUSINESS_INFORMATION') &&
                                !props?.userRights?.includes('TEAM_MANAGEMENT') &&
                                !props?.userRights?.includes('ROLES') &&
                                props?.userRights?.includes('NOTIFICATION') ? (
                                    <p>3/5</p>
                                ) : (
                                    <p>3/11</p>
                                )}
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Business Information</h5>
                                    <p>
                                        Fill and Update your business information to complete your
                                        KYB process.
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
            {tourGuide.currentStep === 52 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-52 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>4/11</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Teams</h5>
                                    <p>
                                        You can add, view, edit roles, and remove team members
                                        associated with your account.
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
            {tourGuide.currentStep === 53 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-53 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>5/11</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Add Team members</h5>
                                    <p>
                                        Click on <span className="info"> “Add team members”</span>{' '}
                                        to create and manage team members
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
            {tourGuide.currentStep === 55 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-55 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>7/11</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Roles and permission</h5>
                                    <p> Create and manage roles and permission </p>
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
            {tourGuide.currentStep === 58 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div
                        className={`main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto ${
                            props?.userRights?.includes('BUSINESS_INFORMATION') &&
                            !props?.userRights?.includes('TEAM_MANAGEMENT') &&
                            !props?.userRights?.includes('ROLES') &&
                            props?.userRights?.includes('NOTIFICATION')
                                ? 'main-modal-tourguide-58-alt'
                                : 'main-modal-tourguide-58'
                        }`}>
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                {/* <p>10/11</p> */}
                                {props?.userRights?.includes('BUSINESS_INFORMATION') &&
                                !props?.userRights?.includes('TEAM_MANAGEMENT') &&
                                !props?.userRights?.includes('ROLES') &&
                                props?.userRights?.includes('NOTIFICATION') ? (
                                    <p>4/5</p>
                                ) : (
                                    <p>10/11</p>
                                )}
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Notifications</h5>
                                    <p>
                                        View notifications regarding necessary activities occurring
                                        in your account and you can add team members who will also
                                        receive these notifications.
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
            <div className="main-tabs mt-5">
                <Tabs
                    // defaultActiveKey={
                    //     queryParams.get('kyc') !== 'true' ? 'profileInfo' : 'businessInfo'
                    // }
                    activeKey={key}
                    id="settingsTabs"
                    className="main-tab-card"
                    onSelect={(k) => setKey(k)}
                    style={{ border: '1px solid green' }}>
                    <Tab
                        eventKey="profileInfo"
                        title="Profile Information"
                        tabClassName={tourGuide.currentStep === 50 ? 'tour-guide-tab' : ''}>
                        <ProfileInfo changeLoadingState={props.changeLoadingState} />
                    </Tab>
                    {props?.userRights?.includes('BUSINESS_INFORMATION') && (
                        <Tab
                            eventKey="businessInfo"
                            title="Business Information"
                            tabClassName={tourGuide.currentStep === 51 ? 'tour-guide-tab' : ''}>
                            <BusinessInfo  changeLoadingState={props.changeLoadingState}/>
                        </Tab>
                    )}
                    {props?.userRights?.includes('TEAM_MANAGEMENT') && (
                        <Tab
                            eventKey="teams"
                            title="Teams"
                            tabClassName={tourGuide.currentStep === 52 ? 'tour-guide-tab' : ''}>
                            <TeamsComp changeLoadingState={props.changeLoadingState}/>
                        </Tab>
                    )}
                    {props?.userRights?.includes('ROLES') && (
                        <Tab
                            eventKey="roles"
                            title="Roles and Permissions"
                            tabClassName={tourGuide.currentStep === 55 ? 'tour-guide-tab' : ''}>
                            <RolesComp changeLoadingState={props.changeLoadingState} />
                        </Tab>
                    )}
                    {props?.userRights?.includes('NOTIFICATION') && (
                        <Tab
                            eventKey="notifications"
                            title="Notifications"
                            tabClassName={tourGuide.currentStep === 58 ? 'tour-guide-tab' : ''}>
                            <NotificationSettings userRights={props?.userRights} changeLoadingState={props.changeLoadingState}/>
                        </Tab>
                    )}
                </Tabs>
            </div>
        </div>
    )
}
