import { Link } from 'react-router-dom'
import premblyLogo from '../../../../assets/logo.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/reducers'
import { initSignUpRequest } from '../../../../redux/actions/auth/signUp/initialize'
import { Spinner } from 'react-bootstrap'
import Select from 'react-select'
import { emailValidator } from '../../../utils/emailValidator'
import { removeNumbers, ServerErrorComp } from '../../../utils'
import { Country } from 'country-state-city'
import { allSectors } from './sectorData'
import { referralSectors } from './referralData'

const options: any = Country.getAllCountries().map((country) => {
    return { value: country.isoCode, label: country.name }
})

const sectorOptions: any = allSectors.map((sec) => {
    return { value: sec.sector, label: sec.sector }
})

const referralOptions: any = referralSectors.map((sec) => {
    return { value: sec.sector, label: sec.sector }
})

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        color: state.isSelected ? '#fff' : '',
        backgroundColor: state.isSelected ? '#007DA3' : state.isFocused ? '#DEEBFF' : '',
    }),
}

export default function InitSignUpComp(props: any) {
    interface Iorg_country {
        value: any
        label: any
    }

    const [first_name, set_first_name] = useState('')
    const [last_name, set_last_name] = useState('')
    const [email, setEmail] = useState('')
    const [org_name, set_org_name] = useState('')
    const [org_country, set_org_country] = useState<Iorg_country | null>(null)
    const [firstNameError, setfirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [orgNameError, setOrgNameError] = useState('')
    const [orgCountryError, setOrgCountryError] = useState('')
    const [org_sector, set_org_sector] = useState<Iorg_country | null>(null)
    const [other_sector, set_other_sector] = useState('')
    const [orgSectorError, setOrgSectorError] = useState('')
    const [serverError, setServerError] = useState('')
    const [org_referral, set_org_referral] = useState<Iorg_country | null>(null)
    const [orgReferralError, setOrgReferralError] = useState('')
    const [termss, setTermss] = useState(false)
    const [termsError, setTermsError] = useState('')

    const initSignUpState = useSelector((state: RootState) => state.initSignUpReducer)

    const dispatch = useDispatch()

    let validateEmail = emailValidator(email.toLowerCase())

    let checkFirstName = () => {
        if (first_name) {
            setfirstNameError('')
        } else {
            setfirstNameError('First name cannot be blank')
        }
    }
    let checkLastName = () => {
        if (last_name) {
            setLastNameError('')
        } else {
            setLastNameError('Last name cannot be blank')
        }
    }
    let checkEmail = () => {
        if (validateEmail.status) {
            setEmailError('')
        } else {
            setEmailError(validateEmail.message)
        }
    }
    let checkOrgName = () => {
        if (org_name) {
            setOrgNameError('')
        } else {
            setOrgNameError('Organisation name cannot be blank')
        }
    }
    let checkOrgCountry = () => {
        if (org_country) {
            setOrgCountryError('')
        } else {
            setOrgCountryError('Organisation country cannot be blank')
        }
    }

    let checkOrgSector = () => {
        if (org_sector) {
            setOrgSectorError('')
        } else {
            setOrgSectorError('Organisation sector cannot be blank')
        }
    }

    let checkOrgRefferal = () => {
        if (org_referral) {
            setOrgReferralError('')
        } else {
            setOrgReferralError('How you hear about us cannot be blank')
        }
    }

    let checkTerms = () => {
        if (termss) {
            setTermsError('')
        } else {
            setTermsError('This field is required')
        }
    }

    let initializeSignUp = () => {
        const callback = (data: any) => {
            if (data.status) {
                props.pushNotifTitle('Success')
                props.pushNotif(data.detail, true)
                setServerError('')
                props.pushEmail(email)
                props.changePage(2)

                // props.passToken(data?.data?.AccessToken)
                // Cookies.set("babtbu", data?.data?.AccessToken)
                // Cookies.set("brbtbu", data?.data?.RefreshToken)
                // props.changePage(3)
            } else {
                setServerError(data.detail)
                if (data?.code === 'REQUIRE_CONFIRMATION') {
                    props.pushEmail(email)
                    props.changePage(2)
                }
            }
        }
        if (!first_name) {
            setfirstNameError('First name cannot be blank')
            return
        }
        if (!last_name) {
            setLastNameError('Last name cannot be blank')
            return
        }
        if (validateEmail.status) {
            props.pushNotif(validateEmail.message, false)
        }
        if (!validateEmail.status) {
            setEmailError(validateEmail.message)
            return
        }
        if (!org_name) {
            setOrgNameError('Organisation name cannot be blank')
            return
        }
        if (!org_country) {
            setOrgCountryError('Organisation country cannot be blank')
            return
        }
        if (!org_sector) {
            setOrgSectorError('Organisation sector cannot be blank')
            return
        }
        if (org_sector?.value === 'Other Sector' && !other_sector) {
            setOrgSectorError('Organisation sector cannot be blank')
            return
        }
        if (!org_referral) {
            setOrgReferralError('How you hear about us cannot be blank')
            return
        }
        if (!termss) {
            setTermsError('This field is required')
            return
        }

        let data: any = {
            values: {
                first_name,
                last_name,
                email,
                terms: termss.toString(),
                organisation_name: org_name,
                country: org_country?.value,
                referral_source: org_referral?.value,
                sector: org_sector?.value === 'Other Sector' ? other_sector : org_sector?.value,
            },
            callback,
        }
        dispatch(initSignUpRequest(data))
    }

    return (
        <div className="card-body">
            <div className="text-center">
                <img src={premblyLogo} alt="" width="150px" className="mb-3" />
                <h4>Get access to Prembly</h4>
                <p className="mb-3">Kindly fill in your details to get you started</p>
                {serverError && <ServerErrorComp error={serverError} />}
            </div>

            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        className={`form-control ${firstNameError ? 'input-error' : ''}`}
                        value={first_name}
                        onBlur={checkFirstName}
                        onChange={(first) => set_first_name(removeNumbers(first.target.value))}
                        placeholder="John"
                    />
                    {firstNameError && (
                        <p style={{ color: 'red' }} className="p-0 m-0">
                            {firstNameError}
                        </p>
                    )}
                </div>

                <div className="col-md-6">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        className={`form-control ${lastNameError ? 'input-error' : ''}`}
                        value={last_name}
                        onBlur={checkLastName}
                        onChange={(last) => set_last_name(removeNumbers(last.target.value))}
                        placeholder="Doe"
                    />
                    {lastNameError && (
                        <p style={{ color: 'red' }} className="p-0 m-0">
                            {lastNameError}
                        </p>
                    )}
                </div>
            </div>
            <div className="">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    className={`form-control ${emailError ? 'input-error' : ''}`}
                    value={email}
                    onBlur={checkEmail}
                    onChange={(email) => setEmail(email.target.value.toLowerCase())}
                    placeholder="johndoe@prembly.com"
                />
                {emailError && (
                    <p style={{ color: 'red' }} className="p-0 m-0">
                        {emailError}
                    </p>
                )}
            </div>
            <div className="">
                <label htmlFor="email">Organisation Name</label>
                <input
                    type="text"
                    className={`form-control ${orgNameError ? 'input-error' : ''}`}
                    value={org_name}
                    onBlur={checkOrgName}
                    onChange={(org) => set_org_name(org.target.value)}
                    placeholder="Prembly"
                />
                {orgNameError && (
                    <p style={{ color: 'red' }} className="p-0 m-0">
                        {orgNameError}
                    </p>
                )}
            </div>
            <div className="">
                <label htmlFor="country">Organisation Country</label>
                <Select
                    required
                    value={org_country}
                    onBlur={checkOrgCountry}
                    onChange={(country) => set_org_country(country)}
                    options={options}
                    styles={customStyles}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#ddd',
                        },
                    })}
                />
                {/* <select name="" id="" className={`form-select ${orgCountryError ? "input-error" : ""}`} 
                    value={org_country} onBlur={checkOrgCountry}
                    onChange={country => {
                        set_org_country(country.target.value)
                    }}
                >
                    <option value="">Select Country</option>
                    {Country.getAllCountries()?.map(country => (
                        <option value={country.isoCode}>{country.name}</option>
                    ))}
                </select> */}
                {orgCountryError && (
                    <p style={{ color: 'red' }} className="p-0 m-0">
                        {orgCountryError}
                    </p>
                )}
            </div>
            <div className="">
                <label htmlFor="country">Organisation Sector</label>
                <Select
                    required
                    onBlur={checkOrgSector}
                    value={org_sector}
                    onChange={(sector) => set_org_sector(sector)}
                    options={sectorOptions}
                    styles={customStyles}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#ddd',
                        },
                    })}
                />
                {org_sector?.value === 'Other Sector' && (
                    <input
                        type="text"
                        className={`form-control ${!other_sector ? 'input-error' : ''}`}
                        value={other_sector}
                        onChange={(sec) => set_other_sector(sec.target.value)}
                        placeholder="sector type"
                    />
                )}
                {((org_sector?.value === 'Other Sector' && !other_sector) ||
                    !org_sector?.value) && (
                    <p style={{ color: 'red' }} className="p-0 m-0">
                        {orgSectorError}
                    </p>
                )}
            </div>
            <div className="">
                <label htmlFor="country">
                    How did you hear about us?{' '}
                    {/* <i className="ri-asterisk" style={{ color: 'red' }}></i> */}
                </label>
                <Select
                    required
                    onBlur={checkOrgRefferal}
                    value={org_referral}
                    onChange={(sector) => set_org_referral(sector)}
                    options={referralOptions}
                    styles={customStyles}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary: '#ddd',
                        },
                    })}
                />
                {/* {org_referral?.value === 'Other Sector' && (
                        <input
                            type="text"
                            className={`form-control ${orgReferralError ? 'input-error' : ''}`}
                            value={other_sector}
                            onChange={(sec) => set_other_sector(sec.target.value)}
                            placeholder="How did you hear about us"
                        />
                    )} */}
                {orgReferralError && (
                    <p style={{ color: 'red' }} className="p-0 m-0">
                        {orgReferralError}
                    </p>
                )}
            </div>
            <div className="d-block agreements">
                <span className="d-flex align-items-center gap-2">
                    <input
                        type="checkbox"
                        onBlur={checkTerms}
                        checked={termss}
                        onChange={(e) => setTermss(e.target.checked)}
                        className=""
                    />

                    <p>
                        I have read and agree to the &nbsp;
                        <a
                            href="https://prembly.com/terms"
                            target="_blank"
                            className="link link-underline">
                            Terms and Services
                        </a>
                        &nbsp; and &nbsp;
                        <a
                            href="https://prembly.com/Policy"
                            target="_blank"
                            className="link link-underline">
                            Privacy Policy
                        </a>
                    </p>
                </span>

                {termsError && (
                    <p style={{ color: 'red' }} className="p-0 m-0">
                        {termsError}
                    </p>
                )}
            </div>
            <button className="btn btn-green w-100 py-3 mt-4" onClick={initializeSignUp}>
                {initSignUpState.isLoading ? (
                    <div>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    'Sign Up'
                )}
            </button>
            <p className=" text-center mt-4">
                Already have an account?
                <Link to="/login" className="link link-underline ms-2">
                    {' '}
                    Login
                </Link>
            </p>
        </div>
    )
}
