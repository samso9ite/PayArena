import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    regenerateLiveKeyRequest,
    regenerateSandboxKeyRequest,
} from '../../../redux/actions/apiLibraries/apiKeys'
import { organisationInfoRequest } from '../../../redux/actions/settings/organisationInfo'
import { RootState } from '../../../redux/reducers'
import Mainloader, { InvalidAccessRightComp } from '../../utils'
import NotificationToast from '../../utils/notifToast'
import useTourGuide from '../../../hooks/useTourGuide'
import Cookies from 'js-cookie'
// import  from 'axios'
import { authorizationRedirect } from '../../../redux/constants/api'
import global from '../../../redux/constants/global'
import axios, { AxiosResponse } from 'axios'

export default function APIKeys(props: any) {
    const [tourGuide, setTourGuide] = useTourGuide()
    const navigate = useNavigate()
    const [liveKeys, setLiveKeys] = useState(false)
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [regenerateModal, setRegenerateModal] = useState(false)

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)
    const regenerateLiveKeyState = useSelector((state: RootState) => state.regenerateLiveKeyReducer)
    const regenerateSandboxKeyState = useSelector(
        (state: RootState) => state.regenerateSandboxKeyReducer
    )

    const [apiKeys, setApiKeys] = useState<any>({})

    const dispatch = useDispatch()

    useEffect(() => {
        getOrgInfo()
        triggerListApiKeys()
    }, [])

    let getOrgInfo = ()=>{
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

    const handleNext = () => {
        navigate('/API-Library/Applications')
        setTourGuide({ ...tourGuide, currentStep: 39 })
    }

    const handleBack = () => {
        setTourGuide({ ...tourGuide, currentStep: 37 })
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    let triggerLiveKeyRegeneration = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Live Keys successfully regenerated')
                setNotifVal(true)
                setRegenerateModal(false)
                triggerListApiKeys()
                getOrgInfo()
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
        dispatch(regenerateLiveKeyRequest(data))
    }

    let triggerSandboxKeyRegeneration = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Sandbox Keys successfully regenerated')
                setNotifVal(true)
                setRegenerateModal(false)
                triggerListApiKeys()
                getOrgInfo()
                
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
        dispatch(regenerateSandboxKeyRequest(data))
    }

    let copyFunc = (val: any, type: string) => {
        navigator.clipboard.writeText(val)
        setNotifTitle('Success')
        setNotif(`Your ${type} has been copied`)
        setNotifVal(true)
    }

    interface apiKeysResponseType {
        sandbox_api_key: string; // or whatever type sandbox_api_key is
        // other properties if exists
      }

    const triggerListApiKeys = () => {
        let accessT = Cookies.get('babtbu') || ''
        let orgId = Cookies.get('org') || ''

        let requestOptions = {
            method: 'get',
            url: global.apiBaseUrl + global.idpassApiUrl + "account/organisation/details",

            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
        axios
            .request(requestOptions)
            .then((res) => {
                setApiKeys(res.data)
            })
            .catch((e: any) => {
                if (e.response.request.status === 401) {
                        authorizationRedirect()
                    } else {
                        console.log("An error occured");
                        
                     }
            })
    }

    return (
        <div>
            {tourGuide.currentStep === 38 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-38 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>3/8</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Switch to live</h5>
                                    <p>Toggle to switch between the live and Sandbox API keys.</p>
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

            {organisationInfoState?.isLoading && <Mainloader />}

            {regenerateModal &&
            <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span
                            onClick={() => {
                                setRegenerateModal(false)
                            }}
                        >
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-7">
                                    <h5>Regenerate Api Keys</h5>
                                </div>
                                    <div>
                                        <div className="text-center py-3 px-2">
                                            <p>
                                                You are about to regenerate your 
                                                <b>
                                                    {liveKeys ? " Live" : " Sandbox"} Api keys
                                                </b>
                                            </p>
                                            {liveKeys && (
                                                <button
                                                    className="btn btn-deep-green py-2 mt-4"
                                                    onClick={triggerLiveKeyRegeneration}
                                                    disabled={regenerateLiveKeyState.isLoading}>
                                                    {regenerateLiveKeyState.isLoading ? (
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
                                                        'Regenerate Live Key'
                                                    )}
                                                </button>
                                            )}
                                            {!liveKeys && (
                                                <button
                                                    className="btn btn-deep-green mt-3 me-3"
                                                    onClick={triggerSandboxKeyRegeneration}
                                                    disabled={regenerateSandboxKeyState.isLoading}>
                                                    {regenerateSandboxKeyState.isLoading ? (
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
                                                        'Regenerate Sandbox Key'
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {!organisationInfoState?.isLoading && (
                <div className="container-fluid px-md-4">
                    <div className="main-table-area mt-5">
                        <div className="table-header">
                            <div className="row">
                                <div className="col-md-4">
                                    <h5>API Keys</h5>
                                    <p>Find your private and public keys here</p>
                                </div>
                                {props?.userRights?.includes('API_KEY') && (
                                    <div className="col-md-8">
                                        <div className=" d-flex align-items-center justify-content-md-end">
                                            {liveKeys && (
                                                <button
                                                    className="btn btn-deep-green mt-3 me-3"
                                                    // onClick={triggerLiveKeyRegeneration}
                                                    onClick={()=>setRegenerateModal(true)}>
                                                        Regenerate Live Key
                                                </button>
                                            )}
                                            {!liveKeys && (
                                                <button
                                                    className="btn btn-deep-green mt-3 me-3"
                                                    // onClick={triggerSandboxKeyRegeneration}
                                                    onClick={()=>setRegenerateModal(true)}>
                                                        Regenerate Sandbox Key
                                                </button>
                                            )}
                                            <span
                                                className={`app-switch ${
                                                    tourGuide.currentStep === 38
                                                        ? 'app-guide-switch'
                                                        : ''
                                                }`}>
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => setLiveKeys(!liveKeys)}
                                                    />
                                                    <span className="slider" />
                                                </label>
                                                <p className="ms-3 mt-3 p-0 m-0">
                                                    Switch to {!liveKeys ? 'Live' : 'Sandbox'}
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {props?.userRights?.includes('API_KEY') ? (
                        <div className="table-responsive">
                            <table className="table mt-2">
                                {!liveKeys ? (
                                    <tbody>
                                        <tr>
                                            <th scope="row">Sandbox Public Key</th>
                                            <td style={{ fontSize: '25px' }}>
                                                {/* {organisationInfoState?.resp?.data?.organisation?.sandbox_public_key?.replaceAll(
                                                    organisationInfoState?.resp?.data?.organisation
                                                        ?.sandbox_public_key,
                                                    '**********  **********  **********'
                                                )} */}
                                                 {apiKeys?.sandbox_public_key?.replaceAll(
                                                    apiKeys
                                                        ?.sandbox_public_key,
                                                    '**********  **********  **********'
                                                )}
                                            </td>
                                            <td>
                                                {' '}
                                                <button
                                                    className="btn btn-copy"
                                                    onClick={() =>
                                                        copyFunc(
                                                            // organisationInfoState?.resp?.data
                                                            //     ?.organisation?.sandbox_public_key,
                                                            // 'Public Sandbox Key'
                                                            apiKeys?.sandbox_public_key,
                                                            'Public Sandbox Key'
                                                        )
                                                    }>
                                                    Copy
                                                </button>{' '}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Sandbox Private Key</th>
                                            <td style={{ fontSize: '25px' }}>
                                                {apiKeys?.sandbox_api_key?.replaceAll(
                                                    apiKeys
                                                        ?.sandbox_api_key,
                                                    '**********  **********  **********'
                                                )}
                                            </td>
                                            <td>
                                                {' '}
                                                <button
                                                    className="btn btn-copy"
                                                    onClick={() =>
                                                        copyFunc(
                                                            // organisationInfoState?.resp?.data
                                                            //     ?.organisation?.sandbox_api_key,
                                                            // 'Private Sandbox Key'
                                                          apiKeys?.sandbox_api_key,
                                                            'Private Sandbox Key'
                                                        )
                                                    }>
                                                    Copy
                                                </button>{' '}
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <th scope="row">Live Public Key</th>
                                            <td style={{ fontSize: '25px' }}>
                                                {/* {organisationInfoState?.resp?.data?.organisation?.live_public_key?.replaceAll(
                                                    organisationInfoState?.resp?.data?.organisation
                                                        ?.live_public_key,
                                                    '**********  **********  **********'
                                                )} */}
                                                {apiKeys?.live_public_key?.replaceAll(
                                                    apiKeys
                                                        ?.live_public_key,
                                                    '**********  **********  **********'
                                                )}
                                            </td>
                                            <td>
                                                {' '}
                                                <button
                                                    className="btn btn-copy"
                                                    onClick={() =>
                                                        copyFunc(
                                                            apiKeys?.live_public_key,
                                                            'Public Live Key'
                                                        )
                                                    }>
                                                    Copy
                                                </button>{' '}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Live Private Key</th>
                                            <td style={{ fontSize: '25px' }}>
                                                {apiKeys?.live_api_key?.replaceAll(
                                                    apiKeys
                                                        ?.live_api_key,
                                                    '**********  **********  **********'
                                                )}
                                            </td>
                                            <td>
                                                {' '}
                                                <button
                                                    className="btn btn-copy"
                                                    onClick={() =>
                                                        copyFunc(
                                                            apiKeys?.live_api_key,
                                                            'Private Live Key'
                                                        )
                                                    }>
                                                    Copy
                                                </button>{' '}
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    ) : (
                        <InvalidAccessRightComp />
                    )}
                </div>
            )}
        </div>
    )
}
