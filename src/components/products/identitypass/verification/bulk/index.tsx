import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Mainloader, { EmptyStateComp, FailedTag, UnavailableTag } from '../../../../utils'
import { getCountryFlag } from '../../../../utils/flags'
import emptyBox from '../../../../../assets/empty-box.png'
import { useDispatch, useSelector } from 'react-redux'
import {
    identitypassBulkVerificationRequest,
    identitypassEndpointsRequest,
} from '../../../../../redux/actions/products/identitypass/verification'
import { RootState } from '../../../../../redux/reducers'
// import ChannelComp from './channelComp'
import NotificationToast from '../../../../utils/notifToast'
import { useLocation } from 'react-router-dom'
import { BulkResponseVerificationComponent } from './response'
import BulkChannelComp from './channelComp'
import { Player } from '@lottiefiles/react-lottie-player'
import successVerifGif from '../../../../../assets/successVerif.json'

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        color: state.isSelected ? '#fff' : '',
        backgroundColor: state.isSelected ? '#007DA3' : state.isFocused ? '#DEEBFF' : '',
    }),
}

export default function PassBulkVerificationComp() {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [countryCode, setCountryCode] = useState('NG')
    const [channel, setChannel] = useState('')
    const [channelPayloads, setChannelPayloads] = useState([])
    const [filteredEndpoints, setFilteredEndpoints] = useState([])
    const [openResponse, setOpenResponse] = useState(false)
    const [updatedResponse, setUpdatedResponse] = useState(null)
    const [ref, setRef] = useState('')
    const [verifType, setVerifType] = useState('')
    const [endPData, setEndPData] = useState([])

    const [template, setTemplate] = useState('')
    const [endpName, setEndpName] = useState('')

    const endpointsState = useSelector((state: RootState) => state.identitypassEndpointsReducer)
    const identitypassBulkVerifState = useSelector(
        (state: RootState) => state.identitypassBulkVerificationReducer
    )

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
            country: 'India',
            country_code: 'IND',
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
    ]

    const dispatch = useDispatch()
    let location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split('/')

    useEffect(() => {
        getEndpoints()
    }, [splitLocation[3]])

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
        setFilteredEndpoints(mainData?.filter((endp: any) => endp?.country_code === code))
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
                setTemplate(val?.bulk_template)
                setEndpName(val?.description)
            }
        })
    }

    let clearData = () => {
        setChannel('')
        setCountryCode('')
        setOpenResponse(false)
        setUpdatedResponse(null)
    }

    let performBulkVerification = (requestData: any) => {
        
        setUpdatedResponse(null)
        setOpenResponse(false)

        const callback = (data: any) => {
            if (data.status) {
                setRef(data?.data?.code || '')
                setOpenResponse(true)
                setUpdatedResponse(data)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
                setUpdatedResponse(data)
            }
        }
        let data: any = {
            values: {
                product: 'identitypass',
                type: channel,
                file: requestData?.doc,
                app_id: requestData?.appId,
                file_type: requestData?.fileType
            },
            callback,
        }
        dispatch(identitypassBulkVerificationRequest(data))
    }

    return (
        <div>
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
                                <div className="my-5">
                                    <EmptyStateComp
                                        title={'Service Unavailable'}
                                        ctaAction={() => {}}
                                        desc={
                                            'Bulk verification is not yet available for Document Verification'
                                        }
                                        ctaValue={''}
                                    />
                                </div>

                                {/* <div className=''>
                                    {(channelPayloads.length > 0 && channel) &&
                                        <BulkChannelComp channel={channel} channelPayloads={channelPayloads} endpName={endpName} templateLink={template} verify={performBulkVerification} verifIsLoading={identitypassBulkVerifState.isLoading} />
                                    }
                                    <div className="text-center">
                                        {!channel && <button className='btn btn-deep-green w-100 py-3 mt-5' disabled> Verify</button>}
                                        <button className='btn btn-clear my-3 link-underline' style={{ cursor: "pointer" }} onClick={clearData}>Clear Information</button>
                                    </div>
                                </div> */}
                            </div>
                        )}

                        {splitLocation[3] === 'Data' && (
                            <div className="col">
                                <div className="">
                                    <label htmlFor="verificationType">
                                        Select Verification Type{' '}
                                        <span style={{ color: 'red' }}> *</span>
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
                                    <div className="">
                                        <label htmlFor="country">
                                            Select Region <span style={{ color: 'red' }}> *</span>
                                        </label>
                                        {/* <select className='form-select' value={countryCode}
                                            onChange={(code) => {
                                                getFilteredEndp(code.target.value, endpointsState?.resp?.data)
                                                setCountryCode(code.target.value)
                                            }}
                                            >
                                            <option value="">Select Region </option>
                                            {getCountryCodes(endpointsState?.resp?.data)?.map((val: any, i: number) => {
                                                if (verifType === "individual" && val?.is_individual && val?.country_code !== "GEN") {
                                                    return (
                                                        <option key={i} value={val?.country_code}>
                                                            {getCountryFlag(val?.country_code)} {val?.country}
                                                        </option>
                                                    )
                                                }
                                            })}
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
                                                          if (val?.is_individual && val.country_code !== 'GEN' ) {
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
                                            <label htmlFor="channel">
                                                Select ID to verify{' '}
                                                <span style={{ color: 'red' }}> *</span>
                                            </label>
                                            <select
                                                className="form-select"
                                                value={channel}
                                                disabled={!countryCode}
                                                onChange={(endpoint) => {
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
                                                                    countryCode ===
                                                                        endp.country_code &&
                                                                    endp?.is_portal
                                                                ) {
                                                                    return (
                                                                        <option
                                                                            key={i}
                                                                            value={endp?.code}>
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
                                                        {endPData?.map((endp: any, i: number) => {
                                                            if (
                                                                endp?.is_business &&
                                                                (countryCode ===
                                                                    endp.country_code ||
                                                                    endp.country_code === 'GEN') &&
                                                                endp?.is_portal
                                                            ) {
                                                                return (
                                                                    <option
                                                                        key={i}
                                                                        value={endp?.code}>
                                                                        {endp?.name}
                                                                    </option>
                                                                )
                                                            }
                                                        })}
                                                    </>
                                                )}
                                            </select>
                                            {channelPayloads.length > 0 && channel && (
                                                <BulkChannelComp
                                                    channel={channel}
                                                    channelPayloads={channelPayloads}
                                                    endpName={endpName}
                                                    templateLink={template}
                                                    verify={performBulkVerification}
                                                    verifIsLoading={
                                                        identitypassBulkVerifState.isLoading
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

                    {/* <div className="col-md-6 col-lg-6">
                        <div className='card endpoint-response'>
                            <div className="card-body"> */}

                    {!updatedResponse && !openResponse ? (
                        <div className=""></div>
                    ) : (
                        <>
                            {identitypassBulkVerifState?.resp?.status &&
                            identitypassBulkVerifState.resp?.data?.code === ref ? (
                                <>
                                    {openResponse && (
                                        <div className="main-modal ">
                                            <div className="main-modal-content card col-md-6 col-lg-4 mx-auto">
                                                <span
                                                    onClick={() => {
                                                        setRef('')
                                                        setOpenResponse(false)
                                                        setUpdatedResponse(null)
                                                    }}>
                                                    <i className="ri-close-line close-modal" />
                                                </span>
                                                <div className="card-body">
                                                    <div className="main-modal-body text-center">
                                                        <div className="col-md-6 mx-auto mt-4">
                                                            <Player
                                                                src={successVerifGif}
                                                                className="player"
                                                                loop
                                                                autoplay
                                                            />
                                                        </div>
                                                        <BulkResponseVerificationComponent
                                                            data={updatedResponse}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="main-modal ">
                                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                                        <span
                                            onClick={() => {
                                                setRef('')
                                                setOpenResponse(false)
                                                setUpdatedResponse(null)
                                            }}>
                                            <i className="ri-close-line close-modal" />
                                        </span>
                                        <div className="card-body">
                                            <div className="main-modal-body">
                                                <div className="text-center my-5">
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
                                                                    identitypassBulkVerifState?.resp
                                                                        ?.message
                                                                }
                                                                ctaValue={''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* </div>
                        </div>
                    </div> */}
                </div>
            )}
        </div>
    )
}
