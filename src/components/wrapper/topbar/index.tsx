import { useLocation, useNavigate } from 'react-router-dom'
import TopProfile from './topProfile'
import passIconBlack from '../../../assets/pass-icon-black.png'
import radarIconBlack from '../../../assets/radar-icon-black.png'
import formIconBlack from '../../../assets/form-icon-black.png'
import useTourGuide from '../../../hooks/useTourGuide'
import perksActive from '../../../assets/perks-active.svg'
import perksInactive from '../../../assets/perks-inactive.svg'

export default function Topbar(props: any) {
    const navigate = useNavigate()
    let location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split('/')
    const [tourGuide, setTourGuide] = useTourGuide()

    const handleBack = () => {
        navigate('/')
        setTourGuide({ ...tourGuide, currentStep: 3 })
    }

    const handleNext = () => {
        if (props?.userRights.includes('VERIFICATION')) {
            setTourGuide({
                ...tourGuide,
                currentStep: 5,
                identitypass_data_verification: 'individual',
                identitypass_country_code: 'NG',
                identitypass_channel: 'PHONE_VER_BASIC',
            })
            navigate('/Identitypass/Verification/Data')
        } else if (
            !props?.userRights.includes('VERIFICATION') &&
            props.userRights.includes('CHECKER_WIDGET')
        ) {
            navigate('/Identitypass/Checker-Widget')
            setTourGuide({ ...tourGuide, currentStep: 22 })
        } else if (
            !props?.userRights.includes('VERIFICATION') &&
            !props.userRights.includes('CHECKER_WIDGET') &&
            props?.userRights.includes('RADAR_CHECK')
        ) {
            setTourGuide({ ...tourGuide, currentStep: 32, radar_intelligenceCheck: 'email' })
            navigate('/Identityradar/Radar-Check')
        } else if (
            props?.userRights?.includes('API_KEY') &&
            props?.userRights?.includes('APPLICATION') &&
            props?.userRights?.includes('STATUS') &&
            !props?.userRights.includes('VERIFICATION') &&
            !props.userRights.includes('CHECKER_WIDGET') &&
            !props?.userRights.includes('RADAR_CHECK')
        ) {
            navigate('/API-Library/API-Keys')
            setTourGuide({ ...tourGuide, currentStep: 36 })
        } else {
            navigate('/SDK-Library/Webhook')
            setTourGuide({ ...tourGuide, currentStep: 42 })
        }
        // else {
        //     navigate('/API-Library/API-Keys')
        //     setTourGuide({ ...tourGuide, currentStep: 36 })
        // }
    }
    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    return (
        <div className=" topbar-area py-3 sticky-top container-fluid">
            {tourGuide.currentStep === 4 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-4 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>4/4</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Profile</h5>
                                    <p>
                                        Add new businesses, switch between businesses, and log out
                                        of your profile.
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
            <div className="px-md-2 mx-auto ">
                <div className="row align-items-center">
                    <div
                        className={`col-5 col-md-4 ${
                            tourGuide.currentStep === 4 && 'top-nav-flex'
                        }`}>
                        <div className=" d-flex align-items-center">
                            <i
                                className={`me-2 ri-xl
                                ${
                                    splitLocation[1] === ''
                                        ? 'ri-home-5-line'
                                        : splitLocation[1] === 'API-Library'
                                        ? 'ri-code-box-line'
                                        : splitLocation[1] === 'SDK-Library'
                                        ? 'ri-file-line'
                                        : splitLocation[1] === 'Reports'
                                        ? 'ri-bar-chart-grouped-fill'
                                        : splitLocation[1] === 'Subscription'
                                        ? 'ri-exchange-box-line'
                                        : splitLocation[1] === 'Referral'
                                        ? 'ri-team-line'
                                        : splitLocation[1] === 'Settings'
                                        ? 'ri-settings-5-line'
                                        : splitLocation[1] === 'Notifications'
                                        ? 'ri-notification-3-line'
                                        : splitLocation[1] === 'Compliance-Certificates'
                                        ? 'ri-file-paper-2-line'
                                        : splitLocation[1] === 'Perks-discount'
                                        ? 'ri-file-paper-2-line'
                                        : splitLocation[1] === 'Faqs'
                                        ? 'ri-questionnaire-line'
                                        : ''
                                }
                            `}
                            />
                            {splitLocation[1] === 'Identitypass' ? (
                                <img src={passIconBlack} alt="" width="30px" className="me-2" />
                            ) : splitLocation[1] === 'Identityradar' ? (
                                <img src={radarIconBlack} alt="" width="30px" className="me-2" />
                            ) : splitLocation[1] === 'BackgroundCheck' ? (
                                <img src={formIconBlack} alt="" width="30px" className="me-2" />
                            ) : splitLocation[1] === 'Perks-And-Discount' ||
                              splitLocation[1] === 'Perks-And-Discount-Details' ||
                              splitLocation[1] === 'Perks-And-Discount-Favorite' ? (
                                <img src={perksInactive} alt="" width="30px" className="me-2" />
                            ) : (
                                ''
                            )}
                            <h6 className="p-0 m-0">
                                {splitLocation[1] === ''
                                    ? 'Dashboard'
                                    : splitLocation[1] === 'Identitypass'
                                    ? 'IdentityPass'
                                    : splitLocation[1] === 'Identityradar'
                                    ? 'IdentityRadar'
                                    : splitLocation[1] === 'BackgroundCheck'
                                    ? 'Background Check'
                                    : splitLocation[1] === 'API-Library'
                                    ? 'Api Library'
                                    : splitLocation[1] === 'SDK-Library'
                                    ? 'SDK Library'
                                    : splitLocation[1] === 'Reports'
                                    ? 'Reports'
                                    : splitLocation[1] === 'Subscription'
                                    ? 'Subscriptions'
                                    : splitLocation[1] === 'Referral'
                                    ? 'Referral'
                                    : splitLocation[1] === 'Settings'
                                    ? 'Settings'
                                    : splitLocation[1] === 'Notifications'
                                    ? 'Notifications'
                                    : splitLocation[1] === 'Faqs'
                                    ? 'Faqs'
                                    : splitLocation[1] === 'Compliance-Certificates'
                                    ? 'Compliance Certificates'
                                    : splitLocation[1] === 'Perks-And-Discount' ||
                                      splitLocation[1] === 'Perks-And-Discount-Details' ||
                                      splitLocation[1] === 'Perks-And-Discount-Favorite'
                                    ? 'Perks & Discount'
                                    : ''}
                            </h6>
                        </div>
                    </div>
                    <div
                        className={`col-7 col-md-8 d-flex justify-content-end ${
                            tourGuide.currentStep === 4 && 'profile-guide'
                        }`}>
                        <TopProfile />
                    </div>
                </div>
            </div>
        </div>
    )
}
