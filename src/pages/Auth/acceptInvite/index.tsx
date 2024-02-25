import { Link, useLocation } from "react-router-dom"
import premblyLogo from "../../../assets/logo.png"
import womanImg from "../../../assets/woman-img.png"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../redux/reducers"
import { Spinner } from "react-bootstrap"
import { EmptyStateComp, removeNumbers, ServerErrorComp } from "../../../components/utils"
import { acceptInviteRequest } from "../../../redux/actions/auth/acceptInvite"
import global from "../../../redux/constants/global"

export default function AcceptInvitationPage() {

    const [first_name, set_first_name] = useState("")
    const [last_name, set_last_name] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstNameError, setfirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [serverError, setServerError] = useState("")

    const acceptInviteState = useSelector((state: RootState) => state.acceptInviteReducer)

    const dispatch = useDispatch()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    let email = queryParams.get("email") || ""
    let type = queryParams.get("type") || ""
    let key = queryParams.get("key") || ""
    let org_id = queryParams.get("orgid") || ""

    var letters_small = new RegExp("^((?=.*[a-z]))");
    var letters_capitals = new RegExp("^((?=.*[a-z])(?=.*[A-Z]))");
    var number_char = new RegExp("^(?=.*[0-9])");
    var special_char = new RegExp("^(?=.*[!@#\$%\^&\*])");
    var eight_char = new RegExp("^(?=.{8,})");


    let checkFirstName = () => {
        if (first_name) { setfirstNameError("") }
        else { setfirstNameError("First name cannot be blank") }
    }
    let checkLastName = () => {
        if (last_name) { setLastNameError("") }
        else { setLastNameError("Last name cannot be blank") }
    }
    let checkPassword = () => {
        if (password) { setPasswordError("") }
        else { setPasswordError("Password cannot be blank") }
    }
    let checkConfPassword = () => {
        if (!confirmPassword) { setConfirmPasswordError("Please confirm your Password") }
        else if (password !== confirmPassword) {
            setPasswordError("Passwords do not match")
            setConfirmPasswordError("Passwords do not match")
        }
        else {
            setPasswordError("")
            setConfirmPasswordError("")
        }
    }

    let pushInvite = () => {
        const callback = (data: any) => {
            if(data.status){
                window.location.href = global.appBaseUrl + "login"
            }
            else {
                setServerError(data.detail)
            }
        };
        if (!first_name && type === "new") {
            setfirstNameError("First name cannot be blank")
            return
        }
        if (!last_name && type === "new") {
            setLastNameError("Last name cannot be blank")
            return
        }
        if (!password && type === "new") {
            setPasswordError("Password cannot be blank")
            return
        }
        if (!confirmPassword && type === "new") {
            setConfirmPasswordError("Please confirm your Password")
            return
        }
        if ((password !== confirmPassword) && type === "new") {
            setPasswordError("Passwords do not match")
            setConfirmPasswordError("Passwords do not match")
            return
        }
        if ((!letters_small.test(password) && type === "new") || (!letters_capitals.test(password) && type === "new") ||
            (!number_char.test(password) && type === "new") || (!special_char.test(password) && type === "new") ||
            (!eight_char.test(password) && type === "new")
        ) {
            setServerError("Password strength is weak")
            return
        }

        let data: any = {
            values: {
                first_name,
                last_name,
                email,
                password,
                type,
                key,
                org_id,
            },
            callback,
        };
        dispatch(acceptInviteRequest(data))
    }

    return (
        <div className="login-area">
            <div className="row login-row align-items-center">
                <div className="col-lg-6 ps-lg-0 d-none d-lg-block">
                    <img src={womanImg} className="w-100" alt="" />
                </div>
                <div className="col-lg-6 py-3">
                    <div className="col-11 col-md-8 col-lg-10 mx-auto ms-lg-4">
                        <div className="card py-3 px-md-4">
                            <div className="card-body">
                                {
                                    (type !== "old" && type !== "new") &&
                                    <>
                                        <div className="text-center">
                                            <img src={premblyLogo} alt="" width="150px" className="mb-3" />
                                            <h4>Invalid invitation link </h4>
                                            <p className="mb-3">This link is not valid, Please check your mail</p>
                                            
                                            <div className="my-5 py">
                                                <EmptyStateComp title={"Invalid URL"}
                                                    ctaAction={()=>{}}
                                                    desc={"You are seeing this page because you have entered an invalid URL. Kindly check your mail for the correct URL"}
                                                    ctaValue={""}
                                                />
                                            </div>
                                            <Link to={"/signup"} className="link">
                                                <button className="btn btn-green w-100 py-3 mt-4" >
                                                    Sign Up
                                                </button>
                                            </Link>
                                        </div>
                                    </>
                                }

                                {type === "new" &&
                                    <>
                                        <div className="text-center">
                                            <img src={premblyLogo} alt="" width="150px" className="mb-3" />
                                            <h4>Get access to Prembly</h4>
                                            <p className="mb-3">Kindly fill in your details to get you started</p>
                                            {serverError && <ServerErrorComp error={serverError} />}
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <label htmlFor="firstname">First Name</label>
                                                <input type="text" className={`form-control ${firstNameError ? "input-error" : ""}`}
                                                    value={first_name} onBlur={checkFirstName}
                                                    onChange={first => set_first_name(removeNumbers(first.target.value))} placeholder="John"
                                                />
                                                {firstNameError && <p style={{ color: "red" }} className="p-0 m-0">{firstNameError}</p>}
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="lastname">Last Name</label>
                                                <input type="text" className={`form-control ${lastNameError ? "input-error" : ""}`}
                                                    value={last_name} onBlur={checkLastName}
                                                    onChange={last => set_last_name(removeNumbers(last.target.value))} placeholder="Doe"
                                                />
                                                {lastNameError && <p style={{ color: "red" }} className="p-0 m-0">{lastNameError}</p>}
                                            </div>
                                        </div>
                                        <div className="">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className={`form-control ${passwordError ? "input-error" : ""}`}
                                                onBlur={checkPassword}
                                                onChange={password => setPassword(password.target.value)} placeholder="*********"
                                            />
                                            {passwordError && <p style={{ color: "red" }} className="p-0 m-0">{passwordError}</p>}
                                        </div>
                                        <div className="">
                                            <label htmlFor="confpassword">Confirm Password</label>
                                            <input type="password" className={`form-control ${confirmPasswordError ? "input-error" : ""}`}
                                                onBlur={checkConfPassword}
                                                onChange={conf => setConfirmPassword(conf.target.value)} placeholder="*********"
                                            />
                                            {confirmPasswordError && <p style={{ color: "red" }} className="p-0 m-0">{confirmPasswordError}</p>}
                                        </div>
                                        <div className="password-strength-area mt-3">
                                            <span className="d-flex align-items-center mb-2">
                                                {letters_small.test(password) ?
                                                    <i className="ri-checkbox-circle-fill ri-lg me-2" /> :
                                                    <i className="ri-close-circle-fill ri-lg me-2" />
                                                }
                                                <small>One lowercase letter</small>
                                            </span>
                                            <span className="d-flex align-items-center mb-2">
                                                {letters_capitals.test(password) ?
                                                    <i className="ri-checkbox-circle-fill ri-lg me-2" /> :
                                                    <i className="ri-close-circle-fill ri-lg me-2" />
                                                }
                                                <small>One uppercase letter</small>
                                            </span>
                                            <span className="d-flex align-items-center mb-2">
                                                {number_char.test(password) ?
                                                    <i className="ri-checkbox-circle-fill ri-lg me-2" /> :
                                                    <i className="ri-close-circle-fill ri-lg me-2" />
                                                }
                                                <small>One number </small>
                                            </span>
                                            <span className="d-flex align-items-center mb-2">
                                                {special_char.test(password) ?
                                                    <i className="ri-checkbox-circle-fill ri-lg me-2" /> :
                                                    <i className="ri-close-circle-fill ri-lg me-2" />
                                                }
                                                <small>One special character</small>
                                            </span>
                                            <span className="d-flex align-items-center mb-2">
                                                {eight_char.test(password) ?
                                                    <i className="ri-checkbox-circle-fill ri-lg me-2" /> :
                                                    <i className="ri-close-circle-fill ri-lg me-2" />
                                                }
                                                <small>8 character minimum</small>
                                            </span>
                                        </div>
                                        <button className="btn btn-green w-100 py-3 mt-4" onClick={pushInvite}>
                                            {acceptInviteState.isLoading
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
                                                "Sign Up"
                                            }
                                        </button>
                                    </>
                                }

                                {
                                    type === "old" &&
                                    <>
                                        <div className="text-center">
                                            <img src={premblyLogo} alt="" width="150px" className="mb-3" />
                                            <h4>Accept team invitation </h4>
                                            {serverError && <ServerErrorComp error={serverError} />}
                                            <div className="my-5 py">
                                                <EmptyStateComp title={"Team invitation"}
                                                    ctaAction={()=>{}}
                                                    desc={"Kindly click the button below to get access to your organization"}
                                                    ctaValue={""}
                                                />
                                            </div>
                                        </div>
                                        <button className="btn btn-green w-100 py-3 mt-4" onClick={pushInvite}>
                                            {acceptInviteState.isLoading
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
                                                "Accept Invitation"
                                            }
                                        </button>
                                    </>
                                }
                                {/* <p className=" text-center mt-4">
                                    Already have an account?
                                    <a onClick={pushInvite} className="link link-underline ms-2">
                                        {acceptInviteState.isLoading
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
                                            "Accept invitation"
                                        }

                                    </a>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
