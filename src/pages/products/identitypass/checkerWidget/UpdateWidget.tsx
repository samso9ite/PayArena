import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import UpdateWidget from '../../../../components/products/identitypass/checkerWidget/update-widget'
import { IdentityPassGetWidgetRequest } from '../../../../redux/actions/products/identitypass/checker-widget'
import { RootState } from '../../../../redux/reducers'
import Mainloader, { InvalidAccessRightComp } from '../../../../components/utils'
import { identitypassEndpointsRequest } from '../../../../redux/actions/products/identitypass/verification'
import NotificationToast from '../../../../components/utils/notifToast'
import useTourGuide from '../../../../hooks/useTourGuide'

type CurrentStateWidget = {
    created_at: Date
    created_by: string
    endpoints: any[]
    face_confidence: string
    id: string
    is_active: boolean
    name: string
    organisation: string
    subtitle: string
    theme_color: string
    updated_at: Date
}

const IdentityPassUpdateWidgetPage = (props: any) => {
    const dispatch = useDispatch()
    const [tourGuide, setTourGuide] = useTourGuide()
    const params = useParams()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const { id: widgetId } = params
    const [currentState, setCurrentState] = useState<Partial<CurrentStateWidget>>({})
    const [channelEndpoints, setChannelEndpoints] = useState<any>([])

    const getEndpointsState = useSelector((state: RootState) => state.identitypassEndpointsReducer)
    const { isLoading: endpointsLoading } = getEndpointsState

    const getWidgetState = useSelector((state: RootState) => state.identityPassGetWidgetReducer)
    const { isLoading, resp } = getWidgetState

    useEffect(() => {
        getWidget()
        getEndpoints()
    }, [])

    const getEndpoints = () => {
        const { resp } = getEndpointsState
        let data: any = {
            values: {},
            callback: (data: any) => {
                if (data.status) {
                    setChannelEndpoints([...data.data])
                } else {
                    setNotifVal(true)
                    setNotif(data.detail)
                    setNotifTitle('Error')
                }
            },
        }
        if (!resp) {
            dispatch(identitypassEndpointsRequest(data))
        } else if (resp && resp.data) {
            setChannelEndpoints([...resp.data])
        }
    }

    function getWidget() {
        let data: any = {
            values: {
                id: widgetId,
            },
            callback: (data: any) => {
                if (data.status) {
                    const res = data.data
                    setCurrentState({ ...res })
                } else {
                }
            },
        }
        dispatch(IdentityPassGetWidgetRequest(data))
    }

    return (
        <>
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}
            <section>
                <div className="px-4">
                    <div className="table-header mt-2">
                        <div className="d-flex justify-content-between align-items-end">
                            <div className="mb-3">
                                <p className="">ID Widget Checker</p>
                                <small className="fw-light subtitle">
                                    Automate onboarding with our Customizable KYC & KYB SDK. Click
                                    here to &nbsp;
                                    <a href="https://docs.prembly.com/docs/identity-verification-sdk">
                                        Learn More
                                    </a>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                {props?.userRights?.includes('CHECKER_WIDGET') ? (
                    <>
                        {Object.keys(currentState).length > 0 && channelEndpoints?.length ? (
                            <UpdateWidget currentState={currentState} channels={channelEndpoints} />
                        ) : (
                            <div className="p-4">
                                <Mainloader />
                            </div>
                        )}
                    </>
                ) : (
                    <InvalidAccessRightComp />
                )}
            </section>
        </>
    )
}

export default IdentityPassUpdateWidgetPage
