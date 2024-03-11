import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { organisationInfoRequest } from '../../../redux/actions/settings/organisationInfo'
import global from '../../../redux/constants/global'
import { RootState } from '../../../redux/reducers'
import NotificationToast from '../../utils/notifToast'
import { Country } from 'country-state-city';
import { createMyOrganisationInfoRequest, myOrganisationInfoRequest } from '../../../redux/actions/myOganisation'
import { emailValidator } from '../../utils/emailValidator'
import IndemnityFormComp from './indemnityForm'
import { ActiveTag } from '../../utils'
import { allSectors } from '../../Auth/signUp/initialize/sectorData'

export default function TopProfile() {
    const [open, setOpen] = useState(false)
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [addModal, setAddModal] = useState(false)
    const [indemnityModal, setIndemnityModal] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [regCountry, setRegCountry] = useState("")
    const [busSector, setBusSector] = useState("")

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer);
    const myOrganisationInfoState = useSelector((state: RootState) => state.myOrganisationInfoReducer);
    const createMyOrganisationInfoState = useSelector((state: RootState) => state.createMyOrganisationInfoReducer);
    const orgRoleState = useSelector((state: RootState) => state.organizationRoleReducer);

    const dispatch = useDispatch()

    let orgId = Cookies.get("org") || ""
    let hostName = Cookies.get('hostName') || ''
    let host = Cookies.get('host') || ''
    let passLogo = Cookies.get('logo') || ''

    let validateEmail = emailValidator(email.toLowerCase())

    useEffect(() => {
        getOrgInfo()
        getMyOrganisations()
    }, [])

    let getMyOrganisations = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };

        let data: any = {
            values: {},
            callback,
        };
        dispatch(myOrganisationInfoRequest(data))
    }

    let getOrgInfo = () => {
        const callback = (data: any) => {
            if (data.status) {
                if (!data?.data?.organisation?.indemnity_signed) {
                    setIndemnityModal(true)
                }
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {},
            callback,
        };
        dispatch(organisationInfoRequest(data))
    }

    let addBusiness = () => {
        const callback = (data: any) => {
            if (data.status) {
                setName("")
                setEmail("")
                setRegCountry("")
                setAddModal(false)
                // setOrgID(data?.data?.id)
                getMyOrganisations()
                setNotifTitle("Success")
                setNotif("Business Successfully Added")
                setNotifVal(true)
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        if (!name) {
            setNotifTitle("Error")
            setNotif("Please enter Business name")
            setNotifVal(true)
            return
        }
        if (!email) {
            setNotifTitle("Error")
            setNotif("Please enter Email")
            setNotifVal(true)
            return
        }
        if (!regCountry) {
            setNotifTitle("Error")
            setNotif("Please select Business Registration Country")
            setNotifVal(true)
            return
        }
        if (!busSector) {
            setNotifTitle("Error")
            setNotif("Please select Business Sector")
            setNotifVal(true)
            return
        }
        if (validateEmail.status) {
            setNotifTitle("Success")
            setNotif(validateEmail.message)
            setNotifVal(false)
        }
        if (!validateEmail.status) {
            setNotifTitle("Error")
            setNotif(validateEmail.message)
            setNotifVal(true)
            return
        }
        let data: any = {
            values: {
                business_name: name,
                business_email: email,
                country: regCountry,
                sector: busSector
            },
            callback,
        };
        dispatch(createMyOrganisationInfoRequest(data))
    }

    let logOut = () => {
        // window.location.href = host
    }

    let setOrgID = (id: string) => {
        Cookies.set("org", id)
        window.location.reload()
    }

    let triggerNotif = (title: string, notiff: string, val: boolean) => {
        setNotifTitle(title)
        setNotif(notiff)
        setNotifVal(val)
    }

    return (
        <>
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

            {indemnityModal &&
                <IndemnityFormComp closeModal={() => setIndemnityModal(false)}
                    orgName={organisationInfoState?.resp?.data?.organisation?.name}
                    triggerNotif={triggerNotif}
                />
            }
            <div className="profile" onClick={() => setOpen(!open)}>

                <div className="d-flex align-items-center justify-content-between">
                    <div className="avatar">
                        <img src={organisationInfoState?.resp?.data?.user?.image} alt="" className="w-100" />
                    </div>
                    <div className="mx-2">
                        <h6 className="add-ellipsis">{organisationInfoState?.resp?.data?.organisation?.name || ""}</h6>
                        <p className="add-ellipsis">{`${organisationInfoState?.resp?.data?.user?.first_name || ""} ${organisationInfoState?.resp?.data?.user?.last_name || ""}`}</p>

                        <span className="badge add-ellipsis" style={{fontFamily:"S-regular", backgroundColor:"#007da3", borderRadius:"3px"}}>
                            {orgRoleState?.resp?.data?.map((val: any) => {
                                if (organisationInfoState?.resp?.data?.permission === val?.id) {
                                    return val.name
                                }
                            })}
                        </span>
                    </div>
                </div>
                <span>
                    {open ?
                        <i className="ri-arrow-drop-up-line ri-xl" />
                        :
                        <i className="ri-arrow-drop-down-line ri-xl" />
                    }
                </span>

                {open &&
                    <div className="user-profile">
                        {myOrganisationInfoState?.resp?.data?.map((val: any, i: number) => (
                            <div className='d-flex'>
                                <p className="pt-2 add-ellipsis me-2" key={i} onClick={() => setOrgID(val?.organisation?.id)}>
                                    {val?.organisation?.name}
                                </p>
                                {orgId === val?.organisation?.id ? <ActiveTag /> : ""}
                            </div>
                        ))}
                        <div className="pt-2 justify-content-between" style={{ color: "#37B7AB" }} onClick={() => setAddModal(true)} >
                            <p>Add New Business</p>
                            <i className="ri-add-fill" />
                        </div>
                        <hr />
                        <Link to="/Settings" className="link">
                            <div className="pro pt-2">
                                <i className="ri-user-line" />
                                <p>Profile</p>
                            </div>
                        </Link>

                        <div className="logout pt-2" onClick={logOut}>
                            <i className="ri-shut-down-line" />
                            <p>Go Back to {hostName}</p>
                        </div>
                    </div>
                }

                {addModal &&
                    <div className="main-modal">
                        <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                            <span onClick={() => setAddModal(false)}><i className="ri-close-line close-modal"></i></span>
                            <div className="card-body">
                                <div className="main-modal-body">
                                    <div className="main-modal-header col-md-8 col-lg-5">
                                        <h5>Add New Business</h5>
                                    </div>

                                    <div>
                                        <div className="">
                                            <label htmlFor="name">Business Name</label>
                                            <input type="text" className="form-control" placeholder="Prembly Inc"
                                                value={name}
                                                onChange={name => setName(name.target.value)}
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" placeholder="johndoe@gmail.com"
                                                value={email}
                                                onChange={mail => setEmail(mail.target.value)}
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="text">Country of Registration</label>
                                            <select name="" id="" className="form-select" value={regCountry}
                                                onChange={country => {
                                                    setRegCountry(country.target.value)
                                                }}
                                            >
                                                <option value="">Select Country</option>
                                                {Country.getAllCountries()?.map(country => (
                                                    <option value={country.isoCode}>{country.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <label htmlFor="text">Business Sector</label>
                                            <select name="" id="" className="form-select" value={busSector}
                                                onChange={sector => {
                                                    setBusSector(sector.target.value)
                                                }}
                                            >
                                                <option value="">Select Sector</option>
                                                {allSectors?.map(sec => (
                                                    <option value={sec.sector}>{sec.sector}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button className="btn btn-deep-green py-2 mt-4" onClick={addBusiness}>
                                            {createMyOrganisationInfoState.isLoading
                                                ?
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
                                                :
                                                "Add Business"
                                            }

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}
