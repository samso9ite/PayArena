import { useCallback, useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { organisationInfoRequest } from "../../../redux/actions/settings/organisationInfo"
import { updateProfileInfoRequest, updateUserPasswordRequest } from "../../../redux/actions/settings/profileInfo"
import Mainloader, { removeLetters, removeNumbers } from "../../utils"
import NotificationToast from "../../utils/notifToast"
import { isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js'
import { countryList } from "../../utils/countries"
import { getCountryFlag } from "../../utils/flags"


export default function ProfileInfo(props) {

    const organisationInfoState = useSelector(state => state.organisationInfoReducer);

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")

    const [passwordModal, setPasswordModal] = useState(false)

    const [preview_img, setPreview_img] = useState("")
    const [profile_img, setProfile_img] = useState("")
    const [firstName, setFirstName] = useState(organisationInfoState?.resp?.data?.user?.first_name)
    const [lastName, setLastName] = useState(organisationInfoState?.resp?.data?.user?.last_name)
    const [phoneNumber, setPhoneNumber] = useState(organisationInfoState?.resp?.data?.user?.phone)
    const [countryCode, setCountryCode] = useState(organisationInfoState?.resp?.data?.organisation?.country_code)

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confNewPassword, setConfNewPassword] = useState("")

    const changePasswordState = useSelector(state => state.updateUserPasswordReducer);
    const updateProfileState = useSelector(state => state.updateProfileInfoReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        getOrgInfo()
    }, [])

    let getOrgInfo = () => {
        const callback = (data) => {
            if (data?.status) {
                updateFields()
            }
            else {
                setNotifTitle("Error")
                setNotif(data?.detail)
                setNotifVal(true)
            }
        };
        let data = {
            values: {},
            callback,
        };
        dispatch(organisationInfoRequest(data))
    }

    let updateFields = useCallback(() => {
        setFirstName(organisationInfoState?.resp?.data?.user?.first_name)
        setLastName(organisationInfoState?.resp?.data?.user?.last_name)
        setPhoneNumber(organisationInfoState?.resp?.data?.user?.phone)
        setCountryCode(organisationInfoState?.resp?.data?.organisation?.country_code)
        setProfile_img("")
    })

    let setPassword = () => {
        const callback = (data) => {
            if (data.status) {
                setNotifTitle("Success")
                setNotif("Password Successfully changed")
                setNotifVal(true)
                // getOrgInfo()
                window.location.reload()
                setOldPassword("")
                setConfNewPassword("")
                setNewPassword("")
                setPasswordModal(false)
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        if (!oldPassword || !newPassword || !confNewPassword) {
            setNotifTitle("Error")
            setNotif("Please fill in all fields")
            setNotifVal(true)
            return
        }
        if (newPassword !== confNewPassword) {
            setNotifTitle("Error")
            setNotif("New Password and confirm password do not match")
            setNotifVal(true)
            return
        }
        let data = {
            values: {
                previous_password: oldPassword,
                new_password: confNewPassword
            },
            callback,
        };
        dispatch(updateUserPasswordRequest(data))
    }

    let updateProfile = () => {
        let countryDial = countryCode || organisationInfoState?.resp?.data?.organisation?.country_code

        const callback = (data) => {
            if (data.status) {
                setNotifTitle("Success")
                setNotif("Profile Successfully Updated")
                setNotifVal(true)
                // getOrgInfo()
                window.location.reload()
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        if (!firstName && !organisationInfoState?.resp?.data?.user?.first_name) {
            setNotifTitle("Error")
            setNotif("First Name is required")
            setNotifVal(true)
            return
        }
        if (!lastName && !organisationInfoState?.resp?.data?.user?.last_name) {
            setNotifTitle("Error")
            setNotif("Last Name is required")
            setNotifVal(true)
            return
        }
        if (!phoneNumber && !organisationInfoState?.resp?.data?.user?.phone) {
            setNotifTitle("Error")
            setNotif("Phone number is required")
            setNotifVal(true)
            return
        }
        if (!isPossiblePhoneNumber((phoneNumber || organisationInfoState?.resp?.data?.user?.phone), countryDial) || 
            !isValidPhoneNumber((phoneNumber || organisationInfoState?.resp?.data?.user?.phone), countryDial) ||
            validatePhoneNumberLength((phoneNumber || organisationInfoState?.resp?.data?.user?.phone), countryDial) === 'TOO_SHORT' ||
            validatePhoneNumberLength((phoneNumber || organisationInfoState?.resp?.data?.user?.phone), countryDial) === 'TOO_LONG' ||
            (countryDial === "NG" && phoneNumber?.length !== 10 )
        ) {
            setNotifTitle("Error")
            setNotif("Wrong phone number format for your country")
            setNotifVal(true)
            return
        }
        let data = {
            values: {
                first_name: firstName || organisationInfoState?.resp?.data?.user?.first_name,
                last_name: lastName || organisationInfoState?.resp?.data?.user?.last_name,
                image: profile_img || "",
                phone: phoneNumber || organisationInfoState?.resp?.data?.user?.phone,
            },
            callback,
        };
        dispatch(updateProfileInfoRequest(data))
    }


    let imageHandler = (img) => {
        var file = img.target.files[0]
        let reader = new FileReader()

        if (img.target.files.length > 0) {
            setPreview_img(URL.createObjectURL(img.target.files[0]));
            reader.readAsDataURL(file)
            reader.onload = () => {
                setProfile_img(reader.result)
            };
        }
    }

    return (
        <div className="profile-info-area">
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

            {organisationInfoState?.isLoading ? props.changeLoadingState(true) : props.changeLoadingState(false)}

            {passwordModal &&
                <div className="main-modal">
                    <div className="main-modal-content card col-md-7 col-lg-4 mx-auto">
                        <span onClick={() => setPasswordModal(false)}><i className="ri-close-line close-modal"></i></span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-5 col-lg-5">
                                    <h5>Change Password</h5>
                                </div>

                                <div>
                                    <div className="">
                                        <label htmlFor="email">Old Password <span style={{ color: "red" }}> *</span></label>
                                        <input type="password" className="form-control" placeholder="***********"
                                            value={oldPassword}
                                            onChange={pass => setOldPassword(pass.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="email">New Password <span style={{ color: "red" }}> *</span></label>
                                        <input type="password" className="form-control" placeholder="***********"
                                            value={newPassword}
                                            onChange={pass => setNewPassword(pass.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="email"> Confirm New Password <span style={{ color: "red" }}> *</span></label>
                                        <input type="password" className="form-control" placeholder="***********"
                                            value={confNewPassword}
                                            onChange={pass => setConfNewPassword(pass.target.value)}
                                        />
                                    </div>

                                    <button className="btn btn-deep-green py-2 mt-4" onClick={setPassword}>
                                        {changePasswordState.isLoading
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
                                            "Reset Passwword"
                                        }

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


            {!organisationInfoState?.isLoading &&
                <>
                    <div className="table-header mt-4">
                        <div className="row">
                            <div className="col-md-8">
                                <h5>Profile Information</h5>
                                <p>Access and edit your personal details</p>
                            </div>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className=" mt-5 d-md-flex align-items-center " >
                            <div className="avatar">
                                <img src={preview_img ? preview_img : (profile_img || organisationInfoState?.resp?.data?.user?.image)} alt="" className="w-100" />
                            </div>
                            <span className="ms-3 ms-md-4">
                                <h5>Profile Image</h5>
                                <input type="file" name="" id=""
                                    className="my-2 upload-img-btn"
                                    onChange={
                                        imageHandler
                                    }
                                />
                                {/* <button className="btn btn-red-outline"
                                    onClick={() => {
                                        setPreview_img("")
                                        setProfile_img("")
                                    }}
                                >
                                    Remove
                                </button> */}
                            </span>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="firstName">First Name <span style={{ color: "red" }}> *</span></label>
                                <input type="text" className="form-control"
                                    defaultValue={organisationInfoState?.resp?.data.user.first_name}
                                    onChange={name => setFirstName(removeNumbers(name.target.value))}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastName">Last Name <span style={{ color: "red" }}> *</span></label>
                                <input type="text" className="form-control"
                                    defaultValue={organisationInfoState?.resp?.data.user.last_name}
                                    onChange={name => setLastName(removeNumbers(name.target.value))}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email">Email </label>
                                <input type="email" className="form-control" readOnly
                                    defaultValue={organisationInfoState?.resp?.data.user.email}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phoneNumber">Phone number <span style={{ color: "red" }}> *</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <select className="form-select" onChange={e =>setCountryCode(e.target.value)} 
                                            defaultValue={organisationInfoState?.resp?.data?.organisation?.country_code} 
                                            value={countryCode} style={{ borderRadius: "5px 0px 0px 5px" }}
                                        >
                                            {countryList?.map((country, i) => (
                                                <option key={i} value={country?.code}>{getCountryFlag(country?.code)} {country?.dialCode}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <input type="text" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data.user.phone}
                                        onChange={phone => setPhoneNumber(removeLetters(phone.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <button className='btn btn-deep-green-outline-sm mt-4' onClick={() => setPasswordModal(true)}>
                            Change Password
                        </button> <br />
                        <button className='btn btn-deep-green mt-4 px-4' onClick={updateProfile}>
                            {updateProfileState.isLoading
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
                                "Save Changes"
                            }
                        </button>
                    </div>
                </>
            }

        </div>
    )
}

