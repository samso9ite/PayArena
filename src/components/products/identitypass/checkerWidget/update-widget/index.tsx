import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Select from 'react-select'
import { Spinner } from 'react-bootstrap'
import './custom-select.scss'
import {
    IdentityPassUpdateWidgetRequest,
    identitypassEndpointsRequest,
} from '../../../../../redux/actions/products/identitypass/checker-widget'
import { RootState } from '../../../../../redux/reducers'
import {
    UpdateWidgetProps,
    verificationChannelObject,
    verificationChannels,
    WidgetObjectType,
    CurrentStateWidget,
    CountryObj,
} from './types'
import NotificationToast from '../../../../utils/notifToast'
import Mainloader from '../../../../utils'
import { Country } from 'country-state-city'
import useTourGuide from '../../../../../hooks/useTourGuide'

const previewCountryOptions = [
    { value: 'NG', label: 'Nigeria', flag: '🇳🇬' },
    { value: 'GH', label: 'Ghana', flag: '🇬🇭' },
    { value: 'KE', label: 'Kenya', flag: '🇰🇪' },
    { value: 'RW', label: 'Rwanda', flag: '🇷🇼' },
    { value: 'UG', label: 'Uganda', flag: '🇺🇬' },
    { value: 'ZM', label: 'Zambia', flag: '🇿🇦' },
    { value: 'SL', label: 'Sierra Leone', flag: '🇸🇱' },
]
// const countryOptions = [
//     { value: 'NG', label: 'Nigeria', flag: '🇳🇬' },
//     { value: 'GH', label: 'Ghana', flag: '🇬🇭' },
//     { value: 'KE', label: 'Kenya', flag: '🇰🇪' },
//     { value: 'UG', label: 'Uganda', flag: '🇺🇬' },
//     { value: 'ZA', label: 'Zambia', flag: '🇿🇦' },
//     { value: 'SL', label: 'Sierra Leone', flag: '🇸🇱' },
// ]
const countryOptions = [
    { value: 'NG', label: 'Nigeria' },
    { value: 'GH', label: 'Ghana' },
    { value: 'KE', label: 'Kenya' },
    { value: 'RW', label: 'Rwanda' },
    { value: 'UG', label: 'Uganda' },
    { value: 'ZM', label: 'Zambia' },
    { value: 'SL', label: 'Sierra Leone' },
    { value: 'GEN', label: 'Other Countries' },
]
const colors = [
    '#000000',
    '#1633A3',
    '#F44336',
    '#E91E62',
    '#9C27B0',
    '#673AB6',
    '#3F50B5',
    '#2096F3',
    '#00A8F4',
    '#00BCD4',
    '#009688',
    '#4CAF4F',
    '#8BC24A',
    '#CDDC39',
    '#FFC007',
    '#FF9800',
    '#FF5721',
    '#795548',
]

const verification_channels = [
    'NIN Verification',
    'NIN Verification (Slip)',
    'BVN Verification',
    'International Passport',
]

const UpdateWidget: React.FC<UpdateWidgetProps> = ({ currentState, channels }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    let [step, setStep] = useState(1)
    let [brandName, setBrandName] = useState('')
    let [brandNameError, setBrandNameError] = useState('')
    let [subtitle, setSubtitle] = useState('')
    let [subtitleError, setSubtitleError] = useState('')
    let [countries, setCountries] = useState<any>([])
    let [countriesError, setCountriesError] = useState('')
    let [themeColor, setThemeColor] = useState('')
    let [themeColorError, setThemeColorError] = useState('')
    let [faceConfidence, setFaceConfidence] = useState('')
    let [faceConfidenceError, setFaceConfidenceError] = useState('')
    let [endpoints, setEndpoints] = useState<any>([])
    const [formEndpoints, setFormEndpoints] = useState<any>([])
    const [currentCountries, setCurrentCountries] = useState<any>([])
    const [previewCountry, setPreviewCountry] = useState('')

    const updateWidgetState = useSelector(
        (state: RootState) => state.identityPassUpdateWidgetReducer
    )
    let { error, isLoading, resp } = updateWidgetState

    useEffect(() => {
        if ([26, 27, 28, 29, 30, 31].includes(tourGuide.currentStep)) {
            setThemeColor('#009688')
        }
        if (tourGuide.currentStep === 31) {
            setStep(tourGuide.checker_step)
        }
    }, [tourGuide])

    useEffect(() => {
        try {
            if (channels && currentState) {
                const allChannels = channels.map((item: any) => {
                    return {
                        name: item.name,
                        value: item.id,
                        active: false,
                        country: item.country,
                        countryCode: item.country_code,
                        isWidget: item.is_widget,
                    }
                })

                if (currentState?.endpoints?.length) {
                    currentState.endpoints.map((currentStateItem: any) => {
                        allChannels.map((allChannelsItem: any) => {
                            if (currentStateItem.endpoint.id === allChannelsItem.value) {
                                allChannelsItem.active = true
                            }
                        })
                    })
                }
                setEndpoints([...allChannels])

                if (currentState?.countries?.length) {
                    const temp = currentState?.countries?.map((country: any) => {
                        return { value: country.code, label: country.name }
                    })
                    setCountries([...temp])
                }
                if (currentState?.face_confidence) {
                    setFaceConfidence(currentState.face_confidence)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }, [channels, currentState])

    function onSubmit(event: any) {
        const countryData = countries.map((country: any) => {
            return { code: country.value, name: country.label }
        })
        event.preventDefault()
        let data: any = {
            values: {
                config_id: currentState?.id,
                name: brandName || currentState?.name,
                subtitle: subtitle || currentState?.subtitle,
                countries: JSON.stringify(countryData),
                face_confidence: faceConfidence || currentState?.face_confidence,
                is_active: 1,
                theme_color: themeColor || currentState?.theme_color,
                endpoints: getSelectedEndpoints(),
            },
            callback: (data: any) => {
                if (data.status) {
                    setNotifVal(true)
                    setNotif('Your Customised  widget was saved successfully')
                    setNotifTitle('Success')

                    setTimeout(() => {
                        navigate('/identitypass/checker-widget')
                    }, 1000)
                } else {
                    isLoading = false
                    setNotifVal(true)
                    setNotif(data.detail)
                    setNotifTitle('Error')
                }
            },
        }
        dispatch(IdentityPassUpdateWidgetRequest(data))
    }

    function nextStep(event: React.FormEvent) {
        event.preventDefault()
        let errorCount = 0
        if (!brandName && !currentState?.organisation) {
            setBrandNameError('Please enter your brand name')
            errorCount++
        }
        if (!subtitle && !currentState?.subtitle) {
            setSubtitleError('Please enter a simple description')
            errorCount++
        }
        if (!countries.length && !currentCountries.length) {
            setCountriesError('Select at least one country')
            errorCount++
        }
        if (!themeColor && !currentState?.theme_color) {
            setThemeColorError('Please select a color')
            errorCount++
        }
        if (!faceConfidence && !currentState?.face_confidence) {
            setFaceConfidenceError('Please select a level')
            errorCount++
        } else if (parseInt(faceConfidence) < 60) {
            setFaceConfidenceError('Please select a level above 60%')
            errorCount++
        }
        if (errorCount > 0) {
            return
        }
        setBrandNameError('')
        setSubtitleError('')
        setCountriesError('')
        setThemeColorError('')
        setFaceConfidenceError('')
        setStep((prev) => prev + 1)
    }

    function previousStep(event: React.FormEvent) {
        event.preventDefault()
        setStep((prev) => prev - 1)
    }

    function onCountryChange(values: any) {
        setCountriesError('')
        const temp = values.map((item: any) => {
            return item
        })
        setCountries([...temp])
    }

    useEffect(() => {
        const res = countries
            .map((country: any) => {
                return endpoints.filter((endpoint: any) => {
                    return endpoint.countryCode === country.value || endpoint.countryCode === 'GEN'
                    // return endpoint.countryCode === country.value
                })
            })
            .flat()

        setFormEndpoints([...res])
    }, [countries, endpoints])

    function onChannelChange(event: any, id: string) {
        try {
            const idx = endpoints?.findIndex((item: any) => item.value === id)
            const clone = [...endpoints]
            clone[idx].active = event.target.checked
            setEndpoints([...clone])
        } catch (error) {
            console.error(error)
        }
    }

    function getSelectedEndpoints() {
        const active = endpoints?.filter((item: any) => {
            return item.active === true
        })
        const result = active.map((item: any) => {
            return { endpoint: item.value }
        })
        return result
    }

    const handleNext = () => {
        setTourGuide({ ...tourGuide, currentStep: 32, radar_intelligenceCheck: 'email' })
        navigate('/Identityradar/Radar-Check')
    }

    const handleBack = () => {
        setTourGuide({ ...tourGuide, currentStep: 30 })
        setStep(1)
        setThemeColor('')
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
        setStep(1)
        setThemeColor('')
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

            {tourGuide.currentStep === 31 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-31 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>10/10</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Verification channels</h5>
                                    <p>Toggle on verification channels of your choice.</p>
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

            <section className={styles.update}>
                <div
                    className={`${styles.formWrapper}
                    ${tourGuide.currentStep === 31 ? 'tour-guide-element-preview' : ''}
                    `}>
                    {/* stepper  */}
                    <div className={styles.stepper}>
                        <div className={styles.step}>1</div>
                        <hr className={styles.line} />
                        <div className={styles.step}>2</div>
                    </div>

                    <form className={styles.form} onSubmit={onSubmit}>
                        {/* form step 1  */}
                        <div
                            id="step-one"
                            style={{
                                visibility: step === 1 ? 'visible' : 'hidden',
                                height: step === 1 ? '100%' : '0',
                                opacity: step === 1 ? '1' : '0',
                                transition: 'opacity .3s ease-in-out',
                            }}>
                            <div
                                className={`
                                ${styles.field}
                                ${tourGuide.currentStep === 26 ? 'tour-guide-element-preview' : ''}
                                `}>
                                <label htmlFor="organisation" className={styles.label}>
                                    brand name
                                </label>
                                <input
                                    type="text"
                                    name="organisation"
                                    className={styles.input}
                                    placeholder="IdentityPass Widget"
                                    defaultValue={currentState?.name}
                                    onChange={(e) => {
                                        setBrandNameError('')
                                        setBrandName(e.target.value)
                                    }}
                                />
                                {brandNameError ? (
                                    <small className={styles.inputError}>{brandNameError}</small>
                                ) : null}
                            </div>
                            <div
                                className={`${styles.field} 
                            ${tourGuide.currentStep === 27 ? 'tour-guide-element-preview' : ''}
                            `}>
                                <label htmlFor="subtitle" className={styles.label}>
                                    short description
                                </label>
                                <input
                                    name="subtitle"
                                    type="text"
                                    className={styles.input}
                                    placeholder="Verification made simple"
                                    defaultValue={currentState?.subtitle}
                                    onChange={(e) => {
                                        setSubtitleError('')
                                        setSubtitle(e.target.value)
                                    }}
                                />
                                {subtitleError ? (
                                    <small className={styles.inputError}>{subtitleError}</small>
                                ) : null}
                            </div>
                            <div
                                className={`${styles.field}
                                ${tourGuide.currentStep === 28 ? 'tour-guide-element-preview' : ''}
                                `}>
                                <label htmlFor="countries" className={styles.label}>
                                    Select countries
                                </label>
                                <Select
                                    isMulti={true}
                                    value={countries}
                                    options={countryOptions}
                                    name="countries"
                                    id="countries"
                                    className="selectCountry"
                                    classNamePrefix="selectCountry"
                                    placeholder="Select Countries"
                                    onChange={onCountryChange}
                                />
                                {countriesError ? (
                                    <small className={styles.inputError}>{countriesError}</small>
                                ) : null}
                            </div>
                            <div
                                className={`${styles.field}
                                ${tourGuide.currentStep === 29 ? 'tour-guide-element-preview' : ''}
                                
                                `}>
                                <label htmlFor="theme" className={styles.label}>
                                    select theme
                                </label>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text bg-white"
                                            style={{ borderRadius: '5px 0px 0px 5px' }}>
                                            <input
                                                type="color"
                                                name="theme"
                                                style={{ height: '40px' }}
                                                className="border-0"
                                                placeholder="#ffffff"
                                                value={themeColor || currentState.theme_color}
                                                defaultValue={currentState.theme_color}
                                                onChange={(e) => {
                                                    setThemeColorError('')
                                                    setThemeColor(e.target.value)
                                                }}
                                            />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="theme"
                                        className="form-control"
                                        placeholder={currentState.theme_color || '#ffffff'}
                                        value={themeColor}
                                        defaultValue={currentState.theme_color}
                                        onChange={(e) => {
                                            setThemeColorError('')
                                            setThemeColor(e.target.value)
                                        }}
                                    />
                                </div>
                                {themeColorError ? (
                                    <small className={styles.inputError}>{themeColorError}</small>
                                ) : null}
                                <div className={styles.checks}>
                                    {colors.map((color, index) => (
                                        <>
                                            <input
                                                name="theme"
                                                key={index}
                                                type="radio"
                                                className={styles.colorRadio}
                                                style={{ backgroundColor: color }}
                                                value={color}
                                                checked={themeColor === color}
                                                defaultChecked={currentState.theme_color === color}
                                                // defaultChecked={themeColor === color ? true : false}
                                                onChange={(e) => {
                                                    setThemeColorError('')
                                                    setThemeColor(e.target.value)
                                                }}
                                            />
                                        </>
                                    ))}
                                    {themeColorError ? (
                                        <small className={styles.inputError}>
                                            {themeColorError}
                                        </small>
                                    ) : null}
                                </div>
                            </div>
                            <div
                                className={`${styles.field}
                                ${tourGuide.currentStep === 30 ? 'tour-guide-element-preview' : ''}
                                `}>
                                <label htmlFor="faceConfidence" className={styles.label}>
                                    Face Confidence ({faceConfidence}%)
                                </label>
                                <small className={styles.smLabel}>
                                    Standard confidence level is 85%
                                </small>
                                <input
                                    name="faceConfidence"
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    className={styles.slider}
                                    defaultValue={
                                        currentState?.face_confidence || faceConfidence || 85
                                    }
                                    onChange={(e) => {
                                        setFaceConfidenceError('')
                                        setFaceConfidence(e.target.value)
                                    }}
                                />

                                {faceConfidenceError ? (
                                    <small className={styles.inputError}>
                                        {faceConfidenceError}
                                    </small>
                                ) : null}
                            </div>
                            <div className={styles.field}>
                                <div className={styles.btnWrapper}>
                                    <button
                                        className={`${styles.btn} ${styles.btnPrimary}`}
                                        onClick={nextStep}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* form step 2 */}
                        <div
                            id="step-two"
                            style={{
                                visibility: step === 2 ? 'visible' : 'hidden',
                                height: step === 2 ? '100%' : '0',
                                opacity: step === 2 ? '1' : '0',
                                transition: 'opacity .3s ease-in-out',
                            }}>
                            <div className={styles.formHeader}>All Verification Channels</div>

                            <div className="d-flex align-items-center justify-content-between checker-toggler">
                                <p className={`${styles.label}`}>
                                    Document Verification(All Countries)
                                </p>
                                <label className="switch ms-3">
                                    <input
                                        type="checkbox"
                                        name="ud9e0672-558f-4c29-b98a-162b77326749"
                                        id="ud9e0672-558f-4c29-b98a-162b77326749"
                                        value={
                                            formEndpoints?.filter((channel: any) => {
                                                return (
                                                    channel.isWidget &&
                                                    channel.value ===
                                                        'ud9e0672-558f-4c29-b98a-162b77326749'
                                                )
                                            })?.[0]?.active
                                        }
                                        checked={
                                            formEndpoints?.filter((channel: any) => {
                                                return (
                                                    channel.isWidget &&
                                                    channel.value ===
                                                        'ud9e0672-558f-4c29-b98a-162b77326749'
                                                )
                                            })?.[0]?.active
                                        }
                                        defaultChecked={
                                            formEndpoints?.filter((channel: any) => {
                                                return (
                                                    channel.isWidget &&
                                                    channel.value ===
                                                        'ud9e0672-558f-4c29-b98a-162b77326749'
                                                )
                                            })?.[0]?.active
                                        }
                                        onChange={(e) => {
                                            onChannelChange(
                                                e,
                                                'ud9e0672-558f-4c29-b98a-162b77326749'
                                            )
                                        }}
                                    />
                                    <span className="slider" />
                                </label>
                            </div>

                            {formEndpoints &&
                                formEndpoints?.length > 0 &&
                                formEndpoints?.map((channel: any, index: number) => {
                                    if (
                                        channel.isWidget &&
                                        channel.value !== 'ud9e0672-558f-4c29-b98a-162b77326749'
                                    ) {
                                        return (
                                            <div className="d-flex align-items-center justify-content-between checker-toggler">
                                                <p className={`${styles.label}`}>
                                                    {channel.name + `(${channel?.country})`}
                                                </p>
                                                <label className="switch ms-3">
                                                    <input
                                                        type="checkbox"
                                                        name={channel.value}
                                                        id={channel.value}
                                                        value={channel.active}
                                                        defaultChecked={channel.active}
                                                        onChange={(e) => {
                                                            onChannelChange(e, channel.value)
                                                        }}
                                                    />
                                                    <span className="slider" />
                                                </label>
                                            </div>
                                            // <div key={index} className={`${styles.fieldRow}`}>
                                            //     <label htmlFor={channel.value} className={styles.label}>
                                            //         {channel.name + `(${channel?.country})`}
                                            //     </label>
                                            //     <div className={styles.checkSlider}>
                                            //         <input
                                            //             type="checkbox"
                                            //             name={channel.value}
                                            //             className={channel.value && styles.switch}
                                            //             id={channel.value}
                                            //             value={channel.active}
                                            //             defaultChecked={channel.active}
                                            //             onChange={(e) => onChannelChange(e, channel.value)}
                                            //         />
                                            //         <label
                                            //             htmlFor={channel.value}
                                            //             className={styles.switchLabel}></label>
                                            //     </div>
                                            // </div>
                                        )
                                    }
                                })}
                            {tourGuide.currentStep === 31 &&
                                verification_channels.map((channel) => (
                                    <div key={channel} className={`${styles.fieldRow}`}>
                                        <label htmlFor={channel} className={styles.label}>
                                            {channel}
                                        </label>
                                        <div className={styles.checkSlider}>
                                            <input
                                                type="checkbox"
                                                name={channel}
                                                className={styles.switch}
                                                value={channel}
                                                defaultChecked={true}
                                            />
                                            <label
                                                htmlFor={channel}
                                                className={styles.switchLabel}></label>
                                        </div>
                                    </div>
                                ))}
                            <div className={styles.field}>
                                <div className={styles.btnWrapperFull}>
                                    <button
                                        className={`${styles.btn} ${styles.btnPrimaryOutline}`}
                                        onClick={previousStep}>
                                        Back
                                    </button>
                                    <button
                                        className={`${styles.btn} ${styles.btnPrimary}`}
                                        type="submit"
                                        disabled={isLoading}>
                                        {isLoading ? (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <span>Save Changes</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* checker widget preview  */}
                <div className={styles.preview}>
                    <div className={styles.previewTitle}>
                        <h5>IdentityPass Widget</h5>
                        <small className={styles.desc}>Verification made simple</small>
                    </div>

                    <form className={styles.form}>
                        <div
                            className={styles.field}
                            style={{ filter: step > 0 ? '' : 'blur(3px)' }}>
                            <label htmlFor="brand-name" className={styles.label}>
                                select country
                            </label>
                            <select
                                className={styles.input}
                                value={previewCountry}
                                onChange={(e) => setPreviewCountry(e.target.value)}>
                                <option value="" disabled>
                                    Select Country
                                </option>
                                {countries.map((country: any) => (
                                    <option value={country.value} key={country.label}>
                                        {country.flag}&nbsp;{country.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div
                            className={styles.field}
                            style={{ filter: step < 2 ? 'blur(3px)' : '' }}>
                            <label htmlFor="brand-name" className={styles.label}>
                                select verification service
                            </label>
                            <select className={styles.input} disabled={step < 2}>
                                <option value="" disabled selected>
                                    Verification Service
                                </option>
                                {channels &&
                                    channels.map((channel: any) => {
                                        if (channel.country_code === previewCountry) {
                                            return (
                                                <option value={channel.id} key={channel.id}>
                                                    {channel.name}
                                                </option>
                                            )
                                        }
                                    })}
                            </select>
                        </div>
                        <div className={styles.field}>
                            <button
                                style={{
                                    backgroundColor: themeColor
                                        ? themeColor
                                        : currentState?.theme_color,
                                    border:
                                        '1px solid' + themeColor
                                            ? themeColor
                                            : currentState?.theme_color,
                                    cursor: 'not-allowed',
                                    color: '#ffffff',
                                }}
                                disabled
                                className={`${styles.btn}  ${styles.btnFull}`}>
                                Proceed
                            </button>
                        </div>

                        <div className={styles.footer}>
                            <small className={styles.clearBtn}>Clear Information</small>

                            <p className={styles.company}>
                                Powered by &nbsp;
                                <span>
                                    <img
                                        src={require(`../../../../../assets/logo.png`)}
                                        alt="prembly"
                                        width={49}
                                        height={12}
                                    />
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default UpdateWidget
