import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../redux/reducers"
import { Spinner } from "react-bootstrap"
import { setPasswordRequest } from "../../../../redux/actions/auth/signUp/setPassword"
import global from "../../../../redux/constants/global"
import premblyLogo from "../../../../assets/logo.png"
import { ServerErrorComp } from "../../../utils"
import { authorizationRedirect } from "../../../../redux/constants/api"

export default function SetPasswordComp(props: any) {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confViewPassword, setConfViewPassword] = useState(false)
    const [viewPassword, setViewPassword] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [serverError, setServerError] = useState("")

    const setPasswordState = useSelector((state: RootState) => state.setPasswordReducer)

    const dispatch = useDispatch()

    var letters_small = new RegExp("^((?=.*[a-z]))");
    var letters_capitals = new RegExp("^((?=.*[a-z])(?=.*[A-Z]))");
    var number_char = new RegExp("^(?=.*[0-9])");
    var special_char = new RegExp("^(?=.*[!@#\$%\^&\*])");
    var eight_char = new RegExp("^(?=.{8,})");


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

    let setPasswordTrigger = () => {
        const callback = (data: any) => {
            if (data.status) {
                props.pushNotifTitle("Success")
                props.pushNotif(data.detail, true)
                setServerError("")

                authorizationRedirect()

            }
            else {
                // props.pushNotifTitle("Error")
                // props.pushNotif(data.detail, true)
                setServerError(data.detail)
            }
        };

        if (!password) {
            setPasswordError("Password cannot be blank")
            // props.pushNotifTitle("Error")
            // props.pushNotif("Password cannot be blank", true)
            return
        }
        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your Password")
            // props.pushNotifTitle("Error")
            // props.pushNotif("Please confirm your Password", true)
            return
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match")
            setConfirmPasswordError("Passwords do not match")
            // props.pushNotifTitle("Error")
            // props.pushNotif("Passwords do not match", true)
            return
        }
        if (!letters_small.test(password) || !letters_capitals.test(password) || !number_char.test(password)
            || !special_char.test(password) || !eight_char.test(password)) {
            // props.pushNotifTitle("Error")
            // props.pushNotif("Password strength is weak", true)
            setServerError("Password strength is weak")
            return
        }

        let data: any = {
            values: {
                password,
                confirm_password: confirmPassword,
                token: props.token
            },
            callback,
        };
        dispatch(setPasswordRequest(data))
    }


    return (
        <div className="card-body">
            <div className="text-center">
                <img src={premblyLogo} alt="" width="150px" className="mb-4" />
                <h4>Create Password</h4>
                <p className="mb-4">Kindly create a password for your account</p>
                {serverError && <ServerErrorComp error={serverError} />}
            </div>

            <div className="">
                <label htmlFor="password">Password</label>
                <div className="input-group">
                    <input type={!viewPassword ? "password" : "text"} className={`form-control ${passwordError ? "input-error" : ""}`}
                        onBlur={checkPassword}
                        onChange={password => setPassword(password.target.value)} placeholder="*********"
                    />
                    <span >
                        <div className="form-control py-3 d-flex align-items-center" style={{ borderRadius: "0px 5px 5px 0px" }}>
                            {!viewPassword ?
                                <i className="ri-eye-line ri-lg" onClick={() => setViewPassword(true)} style={{ cursor: "pointer" }} />
                                :
                                <i className="ri-eye-off-line ri-lg" onClick={() => setViewPassword(false)} style={{ cursor: "pointer" }} />
                            }
                        </div>
                    </span>
                </div>
                {passwordError && <p style={{ color: "red" }} className="p-0 m-0">{passwordError}</p>}
            </div>
            <div className="">
                <label htmlFor="confpassword">Confirm Password</label>
                <div className="input-group">
                    <input type={!confViewPassword ? "password" : "text"} className={`form-control ${confirmPasswordError ? "input-error" : ""}`}
                        onBlur={checkConfPassword}
                        onChange={conf => setConfirmPassword(conf.target.value)} placeholder="*********"
                    />
                    <span >
                        <div className="form-control py-3 d-flex align-items-center" style={{ borderRadius: "0px 5px 5px 0px" }}>
                            {!confViewPassword ?
                                <i className="ri-eye-line ri-lg" onClick={() => setConfViewPassword(true)} style={{ cursor: "pointer" }} />
                                :
                                <i className="ri-eye-off-line ri-lg" onClick={() => setConfViewPassword(false)} style={{ cursor: "pointer" }} />
                            }
                        </div>
                    </span>
                </div>
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
            <button className="btn btn-green w-100 py-3 mt-4" onClick={setPasswordTrigger}>
                {setPasswordState.isLoading
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

            <p className=" text-center mt-4">
                Already have an account ?
                <Link to="/login" className="link link-underline"> Login</Link>
            </p>
        </div>
    )
}
