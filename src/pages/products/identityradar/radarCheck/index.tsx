import React, { useState, useEffect } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import IdRadarBulkComp from '../../../../components/products/identityradar/bulk'
import EmailIntelligenceComp from '../../../../components/products/identityradar/email'
import EmailIntelligenceBulkComp from '../../../../components/products/identityradar/email/emailBulkRequest'
import IPIntelligenceComp from '../../../../components/products/identityradar/ip'
import NameIntelligenceComp from '../../../../components/products/identityradar/name'
import PhoneIntelligenceComp from '../../../../components/products/identityradar/phone'
import { InvalidAccessRightComp } from '../../../../components/utils'
import useTourGuide from '../../../../hooks/useTourGuide'

const steps = [21, 22, 23, 24, 32, 33, 35]

export default function IdRadarCheckPage(props: any) {
    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()
    const [check, setCheck] = useState('')
    const [showSelect, setShowSelect] = useState(true)

    useEffect(() => {
        if (steps.includes(tourGuide.currentStep)) {
            setCheck(tourGuide.radar_intelligenceCheck as string)
        }
    }, [tourGuide])

    const handleNext = () => {
        if (tourGuide.currentStep === 33) {
            setTourGuide({ ...tourGuide, currentStep: 34 })
        } else if (tourGuide.currentStep === 34) {
            setTourGuide({ ...tourGuide, currentStep: 35 })
        } else if (tourGuide.currentStep === 35 && props.userRights.includes('API_KEY')) {
            navigate('/API-Library/API-Keys')
            setTourGuide({ ...tourGuide, currentStep: 36 })
        } else if (
            tourGuide.currentStep === 35 &&
            !props.userRights.includes('API_KEY') &&
            !props.userRights.includes('STATUS')
        ) {
            navigate('/SDK-Library/Webhook')
            setTourGuide({ ...tourGuide, currentStep: 42 })
        }
        // else if (tourGuide.currentStep === 35 && !props?.userRights?.includes('API_KEY')) {
        //     navigate('/API-Library/Applications')
        //     setTourGuide({ ...tourGuide, currentStep: 36 })
        // }
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    const handleBack = () => {
        if (tourGuide.currentStep === 22) {
            setTourGuide({ ...tourGuide, currentStep: 21 })
        } else if (tourGuide.currentStep === 23) {
            setTourGuide({ ...tourGuide, currentStep: 22 })
        } else if (tourGuide.currentStep === 24) {
            setTourGuide({ ...tourGuide, currentStep: 23 })
        } else if (tourGuide.currentStep === 33) {
            setTourGuide({ ...tourGuide, currentStep: 32 })
        } else if (tourGuide.currentStep === 34) {
            setTourGuide({ ...tourGuide, currentStep: 33 })
        } else if (tourGuide.currentStep === 35) {
            setTourGuide({ ...tourGuide, currentStep: 34 })
        }
    }

    let pushShowSelect = () => {
        setShowSelect(!showSelect)
    }
    return (
        <>
            {tourGuide.currentStep === 33 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-33 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>2/4</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Intelligence Check</h5>
                                    <p>Select your preferred intelligence check.</p>
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
            {tourGuide.currentStep === 34 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-34 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>3/4</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Enter email address</h5>
                                    <p>Enter the email address you want to run a radar check on</p>
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
            {tourGuide.currentStep === 35 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-35 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
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
                                    <h5>Run check</h5>
                                    <p>
                                        Click <span className="info"> “Run Check”</span>
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
            <div>
                <div className="px-4">
                    <div className="table-header mt-5">
                        <div className="row">
                            <div className="col-md-5">
                                <h5>Radar Check</h5>
                                <p>
                                    Seamlessly and manually perform intelligence checks in real
                                    time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-light-blue mt-3">
                    {props?.userRights?.includes('RADAR_CHECK') ? (
                        <div className="main-tabs my-3">
                            <Tabs
                                defaultActiveKey="single"
                                id="idradarVerifTabs"
                                className="main-tab-card verif-tab">
                                <Tab
                                    eventKey="single"
                                    title="Single"
                                    mountOnEnter={true}
                                    unmountOnExit={true}>
                                    <div className="pt-4 px-4">
                                        {showSelect && (
                                            <div
                                                className={`col-md-6 mb-1 px-md-3 mx-auto ${
                                                    tourGuide.currentStep === 33
                                                        ? 'tour-guide-element-preview'
                                                        : ''
                                                }`}>
                                                <label htmlFor="selectCheck">
                                                    Select Intelligence Check{' '}
                                                    <span style={{ color: 'red' }}> *</span>
                                                </label>
                                                <select
                                                    className="form-select"
                                                    value={check}
                                                    onChange={(val) => setCheck(val.target.value)}>
                                                    <option value="">Choose Intelligence</option>
                                                    <option value="email">
                                                        Email Intelligence
                                                    </option>
                                                    <option value="phone">
                                                        Phone Intelligence
                                                    </option>
                                                    <option value="ip">IP Intelligence</option>
                                                    <option value="name">
                                                        AML/Sanction Intelligence
                                                    </option>
                                                </select>
                                            </div>
                                        )}

                                        {check === 'email' && (
                                            <EmailIntelligenceComp
                                                pushShowSelect={pushShowSelect}
                                            />
                                        )}
                                        {check === 'phone' && (
                                            <PhoneIntelligenceComp
                                                pushShowSelect={pushShowSelect}
                                            />
                                        )}
                                        {check === 'ip' && (
                                            <IPIntelligenceComp pushShowSelect={pushShowSelect} />
                                        )}
                                        {check === 'name' && (
                                            <NameIntelligenceComp pushShowSelect={pushShowSelect} />
                                        )}
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="bulk"
                                    title="Bulk"
                                    mountOnEnter={true}
                                    unmountOnExit={true}>
                                    <div className="pt-4 px-4">
                                        {showSelect && (
                                            <div
                                                className={`col-md-6 mb-1 px-md-3 mx-auto ${
                                                    tourGuide.currentStep === 33
                                                        ? 'tour-guide-element-preview'
                                                        : ''
                                                }`}>
                                                <label htmlFor="selectCheck">
                                                    Select Intelligence Check{' '}
                                                    <span style={{ color: 'red' }}> *</span>
                                                </label>
                                                <select
                                                    className="form-select"
                                                    value={check}
                                                    onChange={(val) => setCheck(val.target.value)}>
                                                    <option value="">Choose Intelligence</option>
                                                    <option value="email">
                                                        Email Intelligence
                                                    </option>
                                                    <option value="phone">
                                                        Phone Intelligence
                                                    </option>
                                                    <option value="ip">IP Intelligence</option>
                                                    <option value="name">Name Intelligence</option>
                                                </select>
                                            </div>
                                        )}

                                        {(check === 'email' ||
                                            check === 'phone' ||
                                            check === 'ip' ||
                                            check === 'name') && (
                                            <IdRadarBulkComp
                                                type={check}
                                                pushShowSelect={pushShowSelect}
                                                endpName={
                                                    check === 'email'
                                                        ? 'Email Intelligence'
                                                        : check === 'phone'
                                                        ? 'Phone Intelligence'
                                                        : check === 'ip'
                                                        ? 'IP Intelligence'
                                                        : check === 'name'
                                                        ? 'Name Intelligence'
                                                        : ''
                                                }
                                                templateLink={
                                                    check === 'email'
                                                        ? 'https://prembly-my.sharepoint.com/:x:/p/kolade/EbCnxVQnuDFLl7LBZmp1c1UB88Qaa-mJcZGxwmp9z5nC_A?e=PxSdDA'
                                                        : check === 'phone'
                                                        ? 'https://prembly-my.sharepoint.com/:x:/p/kolade/ETgXlEIB_wxAqt30mDIHfFwBisNnZPFZ5skKWILozaOeHw?e=yAS9Bm'
                                                        : check === 'ip'
                                                        ? 'https://prembly-my.sharepoint.com/:x:/p/kolade/EXr_6i5NG_NJg90bunY_xIoBRha5coikSF3SF3QcVAyXag?e=wUMO4v'
                                                        : check === 'name'
                                                        ? 'https://prembly-my.sharepoint.com/:x:/p/kolade/EVaztF1hR9tFt0G-E96roI4BbBPR-eZ_PI2WBQazkOBeHA?e=mUHcKx'
                                                        : ''
                                                }
                                            />
                                        )}
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    ) : (
                        <InvalidAccessRightComp />
                    )}

                    {/* <div className="sub-tabs mt-3">
                <Tabs defaultActiveKey="email" id="radarCheckTabs" className="sub-tab-card">
                <Tab eventKey="email" title="Email Intelligence">
                <EmailIntelligenceComp/>
                </Tab>
                <Tab eventKey="phone" title="Phone Intelligence">
                <PhoneIntelligenceComp />
                </Tab>
                <Tab eventKey="IP" title="IP Intelligence">
                <IPIntelligenceComp />
                </Tab>
                <Tab eventKey="domain" title="Domain Intelligence">
                </Tab>
                </Tabs>
            </div> */}
                </div>
            </div>
        </>
    )
}
