import React, { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Select from 'react-select'
import Mainloader, {
    EmptyStateComp,
    FailedTag,
    UnavailableTag,
    SuccessTag,
} from '../../../../utils'
import { getCountryFlag } from '../../../../utils/flags'
import emptyBox from '../../../../../assets/empty-box.png'
import { useDispatch, useSelector } from 'react-redux'
import {
    identitypassEndpointsRequest,
    identitypassVerificationRequest,
} from '../../../../../redux/actions/products/identitypass/verification'
import { RootState } from '../../../../../redux/reducers'
import ChannelComp from './channelComp'
import NotificationToast from '../../../../utils/notifToast'
import { ResponseVerificationComponent } from './response'
import { useLocation, useNavigate } from 'react-router-dom'
import useTourGuide from '../../../../../hooks/useTourGuide'
import TourGuideVerificationResult from '../../../../TourGuide/VerificationResult'
import CommercialCreditBereauAdvance from './responseComponents/commCreditBereauAdv'
import VeriicationLoader from '../../../../../assets/verification_loader.gif'

const steps = [8, 9, 10]

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        color: state.isSelected ? '#fff' : '',
        backgroundColor: state.isSelected ? '#007DA3' : state.isFocused ? '#DEEBFF' : '',
    }),
}

const businessRegions = [
    {
        country: 'Argentina',
        country_code: 'ARG',
    },
    {
        country: 'Australia',
        country_code: 'AU',
    },
    {
        country: 'Azerbaijan',
        country_code: 'AZE',
    },
    {
        country: 'Belarus',
        country_code: 'BY',
    },
    {
        country: 'Belgium',
        country_code: 'BE',
    },
    {
        country: 'Botswana',
        country_code: 'BW',
    },
    {
        country: 'Bulgaria',
        country_code: 'BG',
    },
    {
        country: 'Canada',
        country_code: 'CAN',
    },
    {
        country: 'Croatia',
        country_code: 'HR',
    },
    {
        country: 'Cyprus',
        country_code: 'CY',
    },
    {
        country: 'Czech Republic',
        country_code: 'CZ',
    },
    {
        country: 'Denmark',
        country_code: 'DNK',
    },
    {
        country: 'Estonia',
        country_code: 'EE',
    },
    {
        country: 'Finland',
        country_code: 'FI',
    },
    {
        country: 'France',
        country_code: 'FR',
    },
    {
        country: 'Germany',
        country_code: 'DEU',
    },
    {
        country: 'Greece',
        country_code: 'GRC',
    },
    {
        country: 'Hungary',
        country_code: 'HUN',
    },
  
    {
        country: 'Ireland',
        country_code: 'IRL',
    },
    {
        country: 'Kazakhstan',
        country_code: 'KAZ',
    },
    {
        country: 'Kenya',
        country_code: 'KE',
    },
    {
        country: 'Lesotho',
        country_code: 'LSO',
    },
    {
        country: 'Latvia',
        country_code: 'LVA',
    },
    {
        country: 'Lithuania',
        country_code: 'LT',
    },
    {
        country: 'Moldova',
        country_code: 'MDA',
    },
    {
        country: 'Morocco',
        country_code: 'MAR',
    },
    {
        country: 'Namibia',
        country_code: 'NA',
    },
    {
        country: 'Nepal',
        country_code: 'NPL',
    },
    {
        country: 'Nigeria',
        country_code: 'NG',
    },
    {
        country: 'Norway',
        country_code: 'NOR',
    },
    {
        country: 'Oman',
        country_code: 'OMN',
    },
    {
        country: 'Poland',
        country_code: 'POL',
    },
    {
        country: 'Romania',
        country_code: 'ROU',
    },
    {
        country: 'Russia',
        country_code: 'RUS',
    },
    {
        country: 'Saudi Arabia',
        country_code: 'SAU',
    },
    {
        country: 'Slovakia',
        country_code: 'SVK',
    },
    {
        country: 'Slovenia',
        country_code: 'SVN',
    },
    {
        country: 'South Africa',
        country_code: 'ZAF',
    },
    {
        country: 'Switzerland',
        country_code: 'CHE',
    },
    {
        country: 'Tanzania',
        country_code: 'TZA',
    },
    {
        country: 'Tunisia',
        country_code: 'TUN',
    },
    {
        country: 'Turkey',
        country_code: 'TUR',
    },
    {
        country: 'Ukraine',
        country_code: 'UKR',
    },
    {
        country: 'United Arab Emirates',
        country_code: 'ARE',
    },
    {
        country: 'United Kingdom',
        country_code: 'GBR',
    },
    {
        country: 'Uganda',
        country_code: 'UG',
    },
    {
        country: 'United States of America',
        country_code: 'USA',
    },
    {
        country: 'Uzbekizstan',
        country_code: 'UZ',
    },
    {
        country: 'Zambia',
        country_code: 'ZM',
    },
    {
        country: 'China',
        country_code: 'CN',
    },
    {   country: "Singapore",
        country_code: "SG"
    },
    {   country: "Taiwan, Province of China",
        country_code: "TW"
    },
    {   country: "HongKong",
        country_code: "HK"
    },
    {   country: "Japan",
        country_code: "JP"
    },
    {   country: "Republic of Korea",
        country_code: "KR"
    },
 
  
    {   country: "India",
        country_code: "IN"
    },
    {   country: "New Zealand",
        country_code: "NZ"
    },
    {   country: "Vietnam",
        country_code: "VN"
    },
    {   country: "Thailand",
        country_code: "TH"
    },
    {   country: "Australia",
        country_code: "AU"
    }
]

export default function PassSingleVerificationComp(props: any) {
    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [countryCode, setCountryCode] = useState('NG')
    const [channel, setChannel] = useState('')
    const [channelPayloads, setChannelPayloads] = useState<any>([])
    const [filteredEndpoints, setFilteredEndpoints] = useState([])
    const [openResponse, setOpenResponse] = useState(false)
    const [updatedResponse, setUpdatedResponse] = useState(null)
    const [ref, setRef] = useState('')
    const [verifType, setVerifType] = useState('')
    const [endPData, setEndPData] = useState([])
    const [progress, setProgress] = useState(0)
    const [retryRequestData, setRetryRequestData] = useState()

    const endpointsState = useSelector((state: RootState) => state.identitypassEndpointsReducer)
    const identitypassVerifState = useSelector(
        (state: RootState) => state.identitypassVerificationReducer
    )

    const dispatch = useDispatch()
    let location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split('/')

    useEffect(() => {
        getEndpoints()
    }, [splitLocation[3]])

    useEffect(() => {
        if ([7, 11].includes(tourGuide.currentStep)) {
            setVerifType(tourGuide.identitypass_data_verification)
        }
    }, [tourGuide])

    useEffect(() => {
        if ([7, 11].includes(tourGuide.currentStep)) {
            setCountryCode(tourGuide.identitypass_country_code)
        }
    }, [tourGuide])
    useEffect(() => {
        if ([9, 11].includes(tourGuide.currentStep)) {
            setChannel(tourGuide.identitypass_channel)
            setChannelPayloads([
                {
                    id: '4c874783-5e50-432c-98a3-070ccd31a4e4',
                    input_label: 'Phone number',
                    input_placeholder: ' Phone Number',
                    input_type: 'number',
                    is_required: true,
                    request_key: 'number',
                    validation_pattern: '/^([0-9]{11}|[0-9]{13})$/',
                },
            ])
        }
    }, [tourGuide])

    useEffect(() => {
        if (tourGuide.currentStep === 12) {
            setVerifType(tourGuide.identitypass_data_verification)
            setChannel(tourGuide.identitypass_channel)
            setChannelPayloads([
                {
                    id: '40fd8972-e922-4fff-9786-9de81703ba8b',
                    input_label: 'Company Name',
                    input_placeholder: 'Enter Company Name',
                    input_type: 'text',
                    is_required: true,
                    request_key: 'company_name',
                    validation_pattern: '/^[a-zA-Z0-9_.-]*$/',
                },
                {
                    id: '40fd8972-e922-4fff-9786-9de81703ba8b',
                    input_label: 'Company Country',
                    input_placeholder: 'Select your company country',
                    input_type: 'select',
                    is_required: true,
                    request_key: 'country_code',
                },
            ])
        }
    }, [tourGuide])

    useEffect(() => {
        if (tourGuide.currentStep === 16) {
            setVerifType(tourGuide.identitypass_data_verification)
            setCountryCode(tourGuide.identitypass_country_code)
            setChannel(tourGuide.identitypass_channel)
        }
    }, [tourGuide])

    useEffect(() => {
        if (identitypassVerifState.isLoading) {
            if (progress < 100) {
                const interval = setInterval(() => {
                    setProgress((prevProgress) => prevProgress + 1)
                }, 1000)
                // Clear the interval when isLoading becomes false
                return () => clearInterval(interval)
            }
        }
    }, [identitypassVerifState.isLoading, progress])

    useEffect(() => {
        if (!identitypassVerifState.isLoading && identitypassVerifState.resp) {
            // Data has been returned, reset the progress count
            setProgress(0)
        }
    }, [identitypassVerifState.isLoading, identitypassVerifState.resp])

    let getEndpoints = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)

                setVerifType('')
                clearData()
                getFilteredEndp('NG', data?.data)
                setEndPData(data?.data)
                if (splitLocation[3] === 'Document') {
                    data?.data?.forEach((val: any) => {
                        if (val?.code === 'DOCUMENT_VERIFICATION') {
                            setChannel('DOCUMENT_VERIFICATION')
                            setChannelPayloads(val?.payloads)
                        }
                    })
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
        dispatch(identitypassEndpointsRequest(data))
    }

    let getFilteredEndp = (code: string, mainData: any) => {
        setFilteredEndpoints(mainData?.filter((endp: any) => (endp?.country_code === code || endp?.country_code === 'GEN')))
        console.log(mainData?.filter((endp: any) => (endp?.country_code === code || endp?.country_code === 'GEN')));
        
    }

    let getCountryCodes = (data: any) => {
        const uniqueKeys: any = []

        const unique = data?.filter((element: any) => {
            const isDuplicate = uniqueKeys.includes(element.country_code)
            if (!isDuplicate) {
                uniqueKeys.push(element.country_code)
                return true
            }
            return false
        })
        return unique
    }

    let setPayload = (endpCode: string, mainData: any) => {
        mainData.map((val: any) => {
            if (endpCode === val?.code) {
                setChannelPayloads(val?.payloads)
            }
        })  
    }

    let clearData = () => {
        setChannel('')
        setCountryCode('')
        setOpenResponse(false)
        setUpdatedResponse(null)
    }

    let performSingleVerification = (requestData: any) => {
        // if (identitypassVerifState?.resp?.response_code  !== "02"){
        //   setRetryRequestData(requestData)
        // }else if (identitypassVerifState?.resp?.response_code  == "02"){
        //   if(requestData == retryRequestData){
        //       requestData = retryRequestData
        //   }     
        // }
     
        setUpdatedResponse(null)
        setOpenResponse(false)

        if(requestData.doc_country == "GHA" && requestData.doc_type == "DL"){
            setNotifTitle('Error')
            setNotif("Ghana's DL endpoint is currently unavailable")
            setNotifVal(true)
        }else{
            const callback = (data: any) => {
                if (data.status) {
                    setRef(data?.verification?.reference)
                    setOpenResponse(true)
                    setUpdatedResponse(data)
                } else {
                    setNotifTitle('Error')
                    setNotif(typeof data?.detail == 'string' ? data?.detail : data?.detail?.message)
                    setNotifVal(true)
                    setUpdatedResponse(data)
                }
            }
            let dataa: any = {
                values: {
                    mode: 'SINGLE',
                    endpoint: channel,
                    data: requestData,
                },
                callback,
            }
            dispatch(identitypassVerificationRequest(dataa))
        }
      
    }

    const handleNext = () => {
        if (tourGuide.currentStep === 6) {
            setTourGuide({ ...tourGuide, currentStep: 7 })
        } else if (tourGuide.currentStep === 7) {
            setTourGuide({ ...tourGuide, currentStep: 8 })
        } else if (tourGuide.currentStep === 8) {
            setTourGuide({ ...tourGuide, currentStep: 9 })
        } else if (tourGuide.currentStep === 9) {
            setTourGuide({ ...tourGuide, currentStep: 10 })
        } else if (tourGuide.currentStep === 10) {
            setTourGuide({ ...tourGuide, currentStep: 11 })
        } else if (tourGuide.currentStep === 11) {
            setTourGuide({
                ...tourGuide,
                identitypass_data_verification: 'business',
                identitypass_channel: 'COMPANY_GENERAL_SEARCH',
                identitypass_country_code: 'NG',
                currentStep: 12,
            })
        } else if (tourGuide.currentStep === 12) {
            setTourGuide({ ...tourGuide, currentStep: 13 })
        } else if (tourGuide.currentStep === 13) {
            setTourGuide({ ...tourGuide, currentStep: 14 })
        } else if (tourGuide.currentStep === 14) {
            setTourGuide({ ...tourGuide, currentStep: 15 })
        } else if (tourGuide.currentStep === 15) {
            setTourGuide({ ...tourGuide, currentStep: 16 })
        } else if (tourGuide.currentStep === 16) {
            navigate('/Identitypass/Verification/Document')
            setTourGuide({ ...tourGuide, currentStep: 17 })
        } else if (tourGuide.currentStep === 18) {
            setTourGuide({ ...tourGuide, currentStep: 19 })
        } else if (tourGuide.currentStep === 19) {
            setTourGuide({ ...tourGuide, currentStep: 20 })
        } else if (tourGuide.currentStep === 20) {
            setTourGuide({ ...tourGuide, currentStep: 21 })
        } else if (
            tourGuide.currentStep === 21 &&
            !props?.userRights?.includes('CHECKER_WIDGET') &&
            !props?.userRights?.includes('RADAR_CHECK')
        ) {
            setTourGuide({ ...tourGuide, currentStep: 36, radar_intelligenceCheck: 'email' })
            navigate('/API-Library/API-Keys')
        } else if (
            tourGuide.currentStep === 21 &&
            !props?.userRights?.includes('CHECKER_WIDGET') &&
            !props?.userRights?.includes('RADAR_CHECK') &&
            !props?.userRights?.includes('API_KEY')
        ) {
            setTourGuide({ ...tourGuide, currentStep: 39, radar_intelligenceCheck: 'email' })
            navigate('/API-Library/API-Keys')
        } else if (
            tourGuide.currentStep === 21 &&
            !props?.userRights?.includes('CHECKER_WIDGET') &&
            !props?.userRights?.includes('RADAR_CHECK') &&
            !props?.userRights?.includes('API_KEY') &&
            !props?.userRights?.includes('APPLICATION')
        ) {
            setTourGuide({ ...tourGuide, currentStep: 41, radar_intelligenceCheck: 'email' })
            navigate('/API-Library/API-Keys')
        } else if (
            tourGuide.currentStep === 21 &&
            !props?.userRights?.includes('CHECKER_WIDGET') &&
            !props?.userRights?.includes('RADAR_CHECK') &&
            !props?.userRights?.includes('API_KEY') &&
            !props?.userRights?.includes('APPLICATION') &&
            !props?.userRights?.includes('STATUS')
        ) {
            setTourGuide({ ...tourGuide, currentStep: 42, radar_intelligenceCheck: 'email' })
            navigate('/SDK-Library/Webhook')
        } else if (tourGuide.currentStep === 21 && !props?.userRights?.includes('CHECKER_WIDGET')) {
            setTourGuide({ ...tourGuide, currentStep: 32, radar_intelligenceCheck: 'email' })
            navigate('/Identityradar/Radar-Check')
        } else if (tourGuide.currentStep === 21) {
            navigate('/Identitypass/Checker-Widget')
            setTourGuide({ ...tourGuide, currentStep: 22 })
        }
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    const handleBack = () => {
        if (tourGuide.currentStep === 6) {
            setTourGuide({ ...tourGuide, currentStep: 5 })
        } else if (tourGuide.currentStep === 7) {
            setTourGuide({ ...tourGuide, currentStep: 6 })
        } else if (tourGuide.currentStep === 8) {
            setTourGuide({ ...tourGuide, currentStep: 7 })
        } else if (tourGuide.currentStep === 9) {
            setTourGuide({ ...tourGuide, currentStep: 8 })
        } else if (tourGuide.currentStep === 10) {
            setTourGuide({ ...tourGuide, currentStep: 9 })
        } else if (tourGuide.currentStep === 11) {
            setTourGuide({ ...tourGuide, currentStep: 10 })
        } else if (tourGuide.currentStep === 12) {
            setTourGuide({
                ...tourGuide,
                currentStep: 11,
                identitypass_data_verification: 'individual',
                identitypass_country_code: 'NG',
                identitypass_channel: 'PHONE_VER_BASIC',
            })
        } else if (tourGuide.currentStep === 13) {
            setTourGuide({ ...tourGuide, currentStep: 12 })
        } else if (tourGuide.currentStep === 14) {
            setTourGuide({ ...tourGuide, currentStep: 13 })
        } else if (tourGuide.currentStep === 15) {
            setTourGuide({ ...tourGuide, currentStep: 14 })
        } else if (tourGuide.currentStep === 16) {
            setTourGuide({ ...tourGuide, currentStep: 15 })
        } else if (tourGuide.currentStep === 18) {
            setTourGuide({ ...tourGuide, currentStep: 17 })
        } else if (tourGuide.currentStep === 19) {
            setTourGuide({ ...tourGuide, currentStep: 18 })
        } else if (tourGuide.currentStep === 20) {
            setTourGuide({ ...tourGuide, currentStep: 19 })
        } else if (tourGuide.currentStep === 21) {
            setTourGuide({ ...tourGuide, currentStep: 20 })
        }
    }

    return (
        <div>
            {tourGuide.currentStep === 6 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-6 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>2/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select Verification Type</h5>
                                    <p>
                                        Choose if you would like to perform verification checks on
                                        an individual or a business entity.
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
            {tourGuide.currentStep === 7 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-7 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>3/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Individual Verification</h5>
                                    <p>Run quick data verification checks on individuals</p>
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
            {tourGuide.currentStep === 8 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-8 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>4/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select Country</h5>
                                    <p>preferred Country to run a quick verification</p>
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

            {tourGuide.currentStep === 9 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-9 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>5/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select ID To Verify</h5>
                                    <p>
                                        Select your preferred Identity Channel that you wish to
                                        verify
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
            {tourGuide.currentStep === 10 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-10 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>6/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Verify</h5>
                                    <p>Click verify to run your verification checks</p>
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
            {[11, 16, 21].includes(tourGuide.currentStep) && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-11 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>
                                    {tourGuide.currentStep === 11
                                        ? '7/12'
                                        : tourGuide.currentStep === 16
                                        ? '12/12'
                                        : '5/5'}
                                </p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Verification Result</h5>
                                    <p>
                                        Verification result shows if the verification checked was
                                        successful or invalid
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
            {tourGuide.currentStep === 12 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-12 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>8/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Business verification</h5>
                                    <p>Run quick verification checks on business entities</p>
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
            {tourGuide.currentStep === 13 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-13 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>9/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select ID To Verify</h5>
                                    <p>
                                        Select your preferred global search type that you want to
                                        verify
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
            {tourGuide.currentStep === 14 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-14 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>10/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Company Name</h5>
                                    <p>Enter the name of the business entity you wish to verify.</p>
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
            {tourGuide.currentStep === 15 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-15 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>11/12</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select Country</h5>
                                    <p>Select the Country where the business was registered.</p>
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
            {tourGuide.currentStep === 18 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-18 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>2/5</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Upload Document</h5>
                                    <p>Upload the image of the document you wish to verify.</p>
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
            {tourGuide.currentStep === 19 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-19 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>3/5</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select Document Type</h5>
                                    <p>Select the type of document you wish to verify</p>
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
            {tourGuide.currentStep === 20 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-20 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>4/5</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Select Country</h5>
                                    <p>Select the country where the document was registered.</p>
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

            {endpointsState?.isLoading && <Mainloader />}

            {!endpointsState?.isLoading && (
                <div className="row justify-content-around">
                    <div className="col-md-6 col-lg-5">
                        {splitLocation[3] === 'Document' && (
                            <div className="col">
                                <div className="">
                                    {channelPayloads.length > 0 && channel && (
                                        <ChannelComp
                                            channelPayloads={channelPayloads}
                                            verify={performSingleVerification}
                                            verifIsLoading={identitypassVerifState.isLoading}
                                        />
                                    )}
                                    <div className="text-center">
                                        {!channel && (
                                            <button
                                                className="btn btn-deep-green w-100 py-3 mt-5"
                                                disabled={identitypassVerifState.isLoading == true}>
                                                {' '}
                                                Verify
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-clear my-3 link-underline"
                                            style={{ cursor: 'pointer' }}
                                            onClick={clearData}>
                                            Clear Information
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {splitLocation[3] === 'Data' && (
                            <div className="col">
                                <div
                                    className={`${
                                        [6, 7, 12].includes(tourGuide.currentStep)
                                            ? 'tour-guide-element-preview'
                                            : ''
                                    }`}>
                                    <label htmlFor="verificationType">
                                        Select Verification Type{' '}
                                        <span style={{ color: 'red' }}> * </span>
                                    </label>
                                    <select
                                        className="form-select"
                                        value={verifType}
                                        onChange={(type) => {
                                            setVerifType(type.target.value)
                                            clearData()
                                        }}>
                                        <option value="">Select Verification Type</option>
                                        <option value="individual">Individual</option>
                                        <option value="business">Business</option>
                                    </select>
                                </div>
                                {verifType !== '' && (
                                    <div
                                        className={`${
                                            tourGuide.currentStep === 8
                                                ? 'tour-guide-element-preview'
                                                : ''
                                        }`}>
                                        <label htmlFor="country">
                                            Select Region <span style={{ color: 'red' }}> *</span>
                                        </label>
                                        {/* <select
                                            className="form-select"
                                            value={countryCode}
                                            onChange={(code) => {
                                                getFilteredEndp(
                                                    code.target.value,
                                                    endpointsState?.resp?.data
                                                )
                                                setCountryCode(code.target.value)
                                            }}>
                                            <option value="">Select Region </option>
                                            {getCountryCodes(endpointsState?.resp?.data)?.map(
                                                (val: any, i: number) => {
                                                    if (
                                                        verifType === 'individual' &&
                                                        val?.is_individual
                                                        // && val?.country_code !== 'GEN'
                                                    ) {
                                                        return (
                                                            <option
                                                                key={i}
                                                                value={val?.country_code}>
                                                                {getCountryFlag(val?.country_code)}{' '}
                                                                {val?.country}
                                                            </option>
                                                        )
                                                    }
                                                }
                                            )}
                                        </select> */}
                                        <Select
                                            placeholder={<>Select Region</>}
                                            onChange={(code: any) => {
                                                getFilteredEndp(
                                                    code.value,
                                                    endpointsState?.resp?.data
                                                )
                                                setCountryCode(code.value)
                                                return { value: code?.value, label: code?.label }
                                            }}
                                            options={
                                                verifType === 'individual'
                                                    ? getCountryCodes(
                                                          endpointsState?.resp?.data
                                                      )?.map((val: any, i: number) => {
                                                          if (val?.is_individual && val.country_code !== 'GEN') {
                                                                 return {
                                                                  value: val?.country_code,
                                                                  label: `${getCountryFlag(
                                                                      val?.country_code
                                                                  )} ${val?.country}`,
                                                              }
                                                           }
                                                      }).filter(Boolean)
                                                    : verifType === 'business'
                                                    ? getCountryCodes(businessRegions)?.map(
                                                          (val: any, i: number) => {
                                                            if (val?.country_code !== 'GEN') {
                                                              return {
                                                                  value: val?.country_code,
                                                                  label: `${getCountryFlag(
                                                                      val?.country_code
                                                                  )} ${val?.country}`,
                                                              }
                                                            }
                                                          }
                                                      )
                                                    : [{ label: '', value: '' }]
                                            }
                                            styles={customStyles}
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary: '#ddd',
                                                },
                                            })}
                                        />
                                    </div>
                                )}
                                <div className="">
                                    {!verifType ? (
                                        ''
                                    ) : (
                                        <>
                                            <div
                                                className={`${
                                                    [9, 13].includes(tourGuide.currentStep)
                                                        ? 'tour-guide-element-preview'
                                                        : ''
                                                }`}>
                                                <label htmlFor="channel">
                                                    Select ID to Verify{' '}
                                                    <span style={{ color: 'red' }}> *</span>
                                                </label>
                                                <select
                                                    className="form-select"
                                                    value={channel}
                                                    disabled={!countryCode}
                                                    onChange={(endpoint) => {
                                                        console.log(endpoint);
                                                        
                                                        setChannel(endpoint.target.value)
                                                        setPayload(
                                                            endpoint.target.value,
                                                            endpointsState?.resp?.data
                                                        )
                                                    }}
                                                    style={{ textTransform: 'capitalize' }}>
                                                    <option value="">Select ID </option>
                                                    {verifType === 'individual' && (
                                                        <>
                                                            {filteredEndpoints?.map(
                                                                (endp: any, i: number) => {
                                                                    if (
                                                                        endp?.is_individual &&
                                                                        
                                                                        (countryCode ===
                                                                            endp.country_code ||
                                                                            endp.country_code ===
                                                                                'GEN') &&
                                                                        endp?.is_portal
                                                                    ) {
                                                                        return (
                                                                            <option
                                                                                key={i}
                                                                                value={endp?.code}
                                                                                style={{
                                                                                    textTransform:
                                                                                        'capitalize',
                                                                                }}>
                                                                                {endp?.name}
                                                                            </option>
                                                                        )
                                                                    }
                                                                }
                                                            )}
                                                        </>
                                                    )}
                                                    {verifType === 'business' && countryCode && (
                                                        <>
                                                            {endPData?.map(
                                                                (endp: any, i: number) => {
                                                                    if (
                                                                        endp?.is_business &&
                                                                        (countryCode ===
                                                                            endp.country_code ||
                                                                            endp.country_code ===
                                                                                'GEN') &&
                                                                        endp?.is_portal
                                                                    ) {
                                                                        return (
                                                                            <option
                                                                                key= {i}
                                                                                value={endp?.code}
                                                                                style={{
                                                                                    textTransform:
                                                                                        'capitalize',
                                                                                }}>
                                                                                {endp?.name}
                                                                            </option>
                                                                        )
                                                                    }
                                                                }
                                                            )}
                                                        </>
                                                    )}
                                                </select>
                                            </div>
                                            {channelPayloads.length > 0 && channel && (
                                                <ChannelComp
                                                    channelPayloads={channelPayloads}
                                                    verify={performSingleVerification}
                                                    verifIsLoading={
                                                        identitypassVerifState.isLoading
                                                    }
                                                />
                                            )}
                                        </>
                                    )}
                                    <div className="text-center">
                                        {!channel && (
                                            <button
                                                className="btn btn-deep-green w-100 py-3 mt-5"
                                                disabled>
                                                {' '}
                                                Verify
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-clear my-3 link-underline"
                                            style={{ cursor: 'pointer' }}
                                            onClick={clearData}>
                                            Clear Information
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div
                        className={`col-md-6 col-lg-6 
                        ${
                            tourGuide.currentStep === 11 ||
                            tourGuide.currentStep === 16 ||
                            tourGuide.currentStep === 21
                                ? 'tour-guide-element-preview pt-3'
                                : ''
                        }
                        `}>
                        <div className="card endpoint-response">
                            {!tourGuide.onGoing && (
                                <div className="card-body">
                                    {identitypassVerifState.isLoading &&
                                    !updatedResponse &&
                                    !openResponse ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                flexDirection: 'column',
                                                height: '60vh',
                                            }}>
                                            <img src={VeriicationLoader} alt="Loader" />
                                            <ProgressBar now={progress} label={`${progress}%`} />
                                            <p className="my-2">
                                                Please wait as verification is in progress...
                                            </p>
                                        </div>
                                    ) : !updatedResponse && !openResponse ? (
                                        <div className="text-center mb-5">
                                            <h5>Verification Result</h5>
                                            <h6>You are yet to make a verification check</h6>
                                            <small>Verification Status: </small>
                                            <>
                                                <UnavailableTag />
                                                <br />
                                            </>
                                            <div className="col-md-8 mx-auto">
                                                <img src={emptyBox} alt="" className="w-100" />
                                            </div>
                                          
                                        </div>
                                    ) : (
                                        <>
                                            {identitypassVerifState?.resp?.response_code === '00' &&
                                            identitypassVerifState.resp?.verification?.reference ===
                                                ref ? (
                                                <>
                                                    <div className="text-center mb-3">
                                                        <h5>Verification Result</h5>
                                                    </div>
                                                    {channel ===
                                                        'ADVANCE-COMMERCIAL-CREDIT-BUREAU-NIG' ||
                                                    channel ===
                                                        'ADVANCE-CONSUMER-CREDIT-BUREAU-NIG' ||
                                                    channel ===
                                                        'BASIC-CONSUMER-CREDIT-BUREAU-NIG'
                                                    ? (
                                                        <CommercialCreditBereauAdvance
                                                            data={updatedResponse}
                                                        />
                                                    ) : (
                                                        <ResponseVerificationComponent
                                                            data={updatedResponse}
                                                            channel={channel}
                                                            verifyType={verifType}
                                                        />
                                                    )}
                                                </>
                                            ) : identitypassVerifState?.resp?.response_code ===
                                              '01' ? (
                                                <div className="text-center mb-5">
                                                    <h5>Verification Result</h5>
                                                    <small>Verification Status: </small>
                                                    <>
                                                        <SuccessTag />
                                                        <br />
                                                    </>
                                                    <div className="col-md-8 mx-auto py-4">
                                                        <div className="my-5">
                                                            <EmptyStateComp
                                                                title={'Verification Response'}
                                                                ctaAction={() => {}}
                                                                desc={
                                                                    identitypassVerifState?.resp
                                                                        ?.message
                                                                }
                                                                ctaValue={''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                // <ResponseVerificationComponent data={identitypassVerifState.resp} />
                                                <div className="text-center mb-5">
                                                    <h5>Verification Result</h5>
                                                    <small>Verification Status: </small>
                                                    <>
                                                        <FailedTag />
                                                        <br />
                                                       
                                                    </>
                                                    <div className="col-md-8 mx-auto py-4">
                                                        <div className="my-5">
                                                            <EmptyStateComp
                                                                title={'Verification Response'}
                                                                ctaAction={() => {}}
                                                                desc={
                                                                    identitypassVerifState?.resp
                                                                        ?.message
                                                                }
                                                                ctaValue={''}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* <span
                                                        className="d-flex align-items-center btn btn-deep-green mx-auto my-3 "
                                                        style={{ width: 'fit-content' }} onClick={performSingleVerification}>
                                                            Retry Verification
                                                    </span> */}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                            {!updatedResponse && !openResponse && tourGuide.onGoing && (
                                <TourGuideVerificationResult />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
