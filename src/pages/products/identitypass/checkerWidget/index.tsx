import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/reducers'
import { useNavigate } from 'react-router-dom'
// import global from '../../../../redux/constants/global'
import {
    identityPassGetAllConfigRequest,
    IdentityPassCreateWidgetRequest,
    IdentityPassDeleteWidgetRequest,
} from '../../../../redux/actions/products/identitypass/checker-widget'

import { ReactComponent as EmptyImage } from '../../../../assets/svgs/empty-state-sm.svg'
import CreateWidgetModal from '../../../../components/products/identitypass/checkerWidget/create-widget-modal'
import {
    WidgetList,
    widgetObject,
} from '../../../../components/products/identitypass/checkerWidget/widget-list'
import { InvalidAccessRightComp, TableLoader } from '../../../../components/utils/index'
import NotificationToast from '../../../../components/utils/notifToast'
import useTourGuide from '../../../../hooks/useTourGuide'
import UpdateWidget from '../../../../components/products/identitypass/checkerWidget/update-widget'

interface IWidget {
    widgetName: String
}

export default function IdpassCheckerWidgetPage(props: any) {
    const [tourGuide, setTourGuide] = useTourGuide()
    const ref = useRef<any>()
    const [openModal, setOpenModal] = useState(false)
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (tourGuide.currentStep === 25) {
            setOpenModal(true)
        }
    }, [tourGuide])

    useEffect(() => {
        if (tourGuide.currentStep === 26 && ref && ref.current) {
            window.scrollTo(0, ref.current.offsetTop - 15)
        }
    }, [tourGuide])

    useEffect(() => {
        getAllWidgets()
    }, [])

    const getAllWidgetsState = useSelector(
        (state: RootState) => state.identityPassGetWidgetsReducer
    )
    const {
        error: getWidgetsError,
        isLoading: getWidgetsLoading,
        resp: getWidgetsResp,
    } = getAllWidgetsState

    const createNewWidgetState = useSelector(
        (state: RootState) => state.identityPassCreateWidgetReducer
    )
    const {
        error: createWidgetsError,
        isLoading: createWidgetsLoading,
        resp: createWidgetsResp,
    } = createNewWidgetState

    const deleteWidgetState = useSelector(
        (state: RootState) => state.identityPassDeleteWidgetReducer
    )
    const {
        error: deleteWidgetsError,
        isLoading: deleteWidgetsLoading,
        resp: deleteWidgetsResp,
    } = deleteWidgetState

    function getAllWidgets() {
        let data: any = {
            values: {},
            callback: (data: any) => {
                if (data.status) {
                } else {
                }
            },
        }
        dispatch(identityPassGetAllConfigRequest(data))
    }

    function openCheckerWidgetModal(event: React.MouseEvent<HTMLElement>): void {
        event.preventDefault()
        setOpenModal(true)
    }

    function initCreateWidget(widgetName: String) {
        let data: any = {
            values: {
                name: widgetName,
            },
            callback: (data: any) => {
                if (data.status) {
                    setOpenModal(false)
                    getAllWidgets()
                    setNotifVal(true)
                    setNotif('Widget created successfully')
                    setNotifTitle('Success')
                } else {
                    setNotifVal(true)
                    setNotif(data.detail)
                    setNotifTitle('Error')
                }
            },
        }
        dispatch(IdentityPassCreateWidgetRequest(data))
    }

    function initEditWidget(widget: widgetObject) {
        navigate(`/identitypass/checker-widget/${widget.id}`, { state: { widget } })
    }

    function deleteWidget(id: string) {
        const data: any = {
            values: {
                id,
            },
            callback: (data: any) => {
                if (data.status) {
                    setNotifVal(true)
                    setNotif('Widget deleted successfully')
                    setNotifTitle('Success')
                    getAllWidgets()
                } else {
                    setNotifVal(true)
                    setNotif(data.detail)
                    setNotifTitle('Error')
                }
            },
        }
        dispatch(IdentityPassDeleteWidgetRequest(data))
    }

    const handleNext = () => {
        if (tourGuide.currentStep === 23) {
            setTourGuide({ ...tourGuide, currentStep: 24 })
        } else if (tourGuide.currentStep === 24) {
            setTourGuide({ ...tourGuide, currentStep: 25 })
        } else if (tourGuide.currentStep === 25) {
            setTourGuide({ ...tourGuide, currentStep: 26 })
            setOpenModal(false)
            // setTourGuide({ ...tourGuide, currentStep: 32, radar_intelligenceCheck: 'email' })
            // navigate('/Identityradar/Radar-Check')
        } else if (tourGuide.currentStep === 26) {
            setTourGuide({ ...tourGuide, currentStep: 27 })
        } else if (tourGuide.currentStep === 27) {
            setTourGuide({ ...tourGuide, currentStep: 28 })
        } else if (tourGuide.currentStep === 28) {
            setTourGuide({ ...tourGuide, currentStep: 29 })
        } else if (tourGuide.currentStep === 29) {
            setTourGuide({ ...tourGuide, currentStep: 30 })
        } else if (tourGuide.currentStep === 30) {
            setTourGuide({ ...tourGuide, currentStep: 31, checker_step: 2 })
        }
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    const handleBack = () => {
        if (tourGuide.currentStep === 12) {
            setTourGuide({ ...tourGuide, currentStep: 11 })
        } else if (tourGuide.currentStep === 13) {
            setTourGuide({ ...tourGuide, currentStep: 12 })
        } else if (tourGuide.currentStep === 14) {
            setOpenModal(false)
            setTourGuide({ ...tourGuide, currentStep: 13 })
        } else if (tourGuide.currentStep === 23) {
            setTourGuide({ ...tourGuide, currentStep: 22 })
        } else if (tourGuide.currentStep === 24) {
            setTourGuide({ ...tourGuide, currentStep: 23 })
        } else if (tourGuide.currentStep === 25) {
            setOpenModal(false)
            setTourGuide({ ...tourGuide, currentStep: 24 })
        } else if (tourGuide.currentStep === 26) {
            setTourGuide({ ...tourGuide, currentStep: 25 })
        } else if (tourGuide.currentStep === 27) {
            setTourGuide({ ...tourGuide, currentStep: 26 })
        } else if (tourGuide.currentStep === 28) {
            setTourGuide({ ...tourGuide, currentStep: 27 })
        } else if (tourGuide.currentStep === 29) {
            setTourGuide({ ...tourGuide, currentStep: 28 })
        } else if (tourGuide.currentStep === 30) {
            setTourGuide({ ...tourGuide, currentStep: 29 })
        }
    }

    return (
        <div>
            {tourGuide.currentStep === 23 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-23 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>2/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Learn more</h5>
                                    <p>
                                        The learn more feature provides you access to the SDK
                                        library for the widget integration.
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
            {tourGuide.currentStep === 24 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-24 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>3/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Create new checker widget</h5>
                                    <p>Customise a new widget according to your preferences.</p>
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

            {tourGuide.currentStep === 25 && (
                <div className="main-modal main-modal-alt main-modal-bg-reset sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-25 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>4/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Widget name</h5>
                                    <p>Assign a name to your widget.</p>
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

            {tourGuide.currentStep === 26 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-26 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>5/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Brand Name</h5>
                                    <p>
                                        Enter your brand name to identify your company, product, or
                                        service.
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

            {tourGuide.currentStep === 27 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-27 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>6/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Short Description</h5>
                                    <p>
                                        Enter short description to briefly introduce and describe
                                        your brand
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

            {tourGuide.currentStep === 28 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-28 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>7/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select countries</h5>
                                    <p>
                                        Select your preferred{' '}
                                        <span className="info">“Countries”</span> you will like your
                                        users to select. <br />
                                        <br /> Note; Each country selected has its own verification
                                        channels
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
            {tourGuide.currentStep === 29 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-29 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>8/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select Theme color</h5>
                                    <p>
                                        Select your preferred
                                        <span className="info"> “Theme colour” </span> that best
                                        represents your brand or company
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
            {tourGuide.currentStep === 30 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-30 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>9/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Face confidence level</h5>
                                    <p>
                                        Face confidence level is the degree accuracy of a face
                                        match. <br />
                                        <br /> Drag the slider to set your face confidence level.
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

            <div className="px-4">
                <div className="table-header mt-2">
                    <div className="d-flex justify-content-between align-items-end">
                        <div className="mb-3">
                            <p className="">ID Widget Checker</p>
                            <small
                                className={`fw-light subtitle ${
                                    tourGuide.currentStep === 23
                                        ? 'tour-guide-element-preview tour-guide-learn-more'
                                        : ''
                                }`}>
                                Automate onboarding with our Customizable KYC & KYB SDK. Click here
                                to &nbsp;
                                <a href="https://docs.prembly.com/docs/identity-verification-sdk">
                                    Learn More
                                </a>
                            </small>
                        </div>
                        {props?.userRights?.includes('CHECKER_WIDGET') && (
                            <>
                                {getWidgetsResp ? (
                                    <div className="mb-3">
                                        <button
                                            type="button"
                                            className="btn btn-deep-green px-4"
                                            onClick={openCheckerWidgetModal}>
                                            Add new checker widget
                                        </button>
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>
                {/* {props?.userRights?.includes('CHECKER_WIDGET') &&
                    tourGuide.onGoing &&
                    tourGuide.currentStep === 26 && (
                        <UpdateWidget currentState={{}} channels={[]} />
                    )} */}

                {getWidgetsLoading ? (
                    <TableLoader />
                ) : props?.userRights?.includes('CHECKER_WIDGET') ? (
                    <>
                        {/* {getWidgetsLoading ? <TableLoader /> : null} */}
                        {/* empty state  */}
                        {getWidgetsResp &&
                        !getWidgetsResp.data?.length &&
                        !getWidgetsLoading &&
                        ![26, 27, 28, 29, 30, 31].includes(tourGuide.currentStep) ? (
                            <div className="d-flex justify-content-center align-items-center mt-5">
                                <div
                                    className="my-5 d-flex flex-column justify-content-center align-items-center gap-3"
                                    style={{ width: '320px' }}>
                                    <EmptyImage />
                                    <p className="mb-0 text-neutral">No Widget created yet</p>
                                    <small className="text-center text-grey-40">
                                        You are yet to create any widget. Create widgets and start
                                        customizing your APIs
                                    </small>
                                    <div
                                        className={`${
                                            tourGuide.currentStep === 24
                                                ? 'tour-guide-element-preview py-3 px-2'
                                                : ''
                                        }`}>
                                        <button
                                            type="button"
                                            className="btn btn-deep-green px-4"
                                            onClick={openCheckerWidgetModal}>
                                            Create new checker widget
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : getWidgetsResp &&
                          !getWidgetsResp.data?.length &&
                          tourGuide.onGoing &&
                          [26, 27, 28, 29, 30, 31].includes(tourGuide.currentStep) ? (
                            <div ref={ref}>
                                <UpdateWidget currentState={{}} channels={[]} />
                            </div>
                        ) : null}

                        {/* widget list  */}
                        {!getWidgetsLoading && getWidgetsResp?.data?.length ? (
                            <WidgetList
                                widgets={getWidgetsResp?.data}
                                initEditWidget={initEditWidget}
                                deleteWidget={deleteWidget}
                                deleteWidgetError={deleteWidgetsError}
                                deleteWidgetLoading={deleteWidgetsLoading}
                                deleteWidgetResponse={deleteWidgetsResp}
                            />
                        ) : null}

                        {/* {tourGuide.onGoing && tourGuide.currentStep === 26 && (
                            <UpdateWidget currentState={{}} channels={[]} />
                        )} */}

                        {openModal ? (
                            <CreateWidgetModal
                                show={openModal}
                                onClose={() => setOpenModal(false)}
                                initCreateWidget={initCreateWidget}
                                error={createWidgetsError}
                                loading={createWidgetsLoading}
                                response={createWidgetsResp}
                            />
                        ) : null}
                    </>
                ) : (
                    <InvalidAccessRightComp />
                )}
            </div>
        </div>
    )
}
