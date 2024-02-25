import { Link } from "react-router-dom"
import { useState } from "react"
import premblyLogo from "../../../../assets/logo.png"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../redux/reducers"
import { confirmSignUpRequest, resendSignUpOTPRequest } from "../../../../redux/actions/auth/signUp/confirm"
import { Spinner } from "react-bootstrap"
import Cookies from "js-cookie"
import { ServerErrorComp } from "../../../utils"
import { clearSignUpEmailRequest } from "../../../../redux/actions/auth/signUp/initialize"

export default function ConfirmSignUpComp(props: any) {
    const [otp, setOtp] = useState("")
    const [otpError, setOtpError] = useState("")
    const [serverError, setServerError] = useState("")

    const confirmSignUpState = useSelector((state: RootState) => state.confirmSignUpReducer)
    const resendOTPState = useSelector((state: RootState) => state.resendSignUpOTPReducer)
    const clearEmailState = useSelector((state: RootState) => state.clearSignUpEmailReducer)

    const dispatch = useDispatch()

    let checkOtp = () => {
        if (otp) { setOtpError("") }
        else { setOtpError("OTP cannot be blank") }
    }

    let replaceLetters = (val:any) => {
        let replaceText = val.replace(/([^0-9]+)/g, '');
        return replaceText
    }

    let confirmSignUp = () => {
        const callback = (data: any) => {
            if (data.status) {
                props.pushNotifTitle("Success")
                props.pushNotif(data.detail, true)
                setServerError("")
                props.passToken(data?.data?.AccessToken)
                Cookies.set("babtbu", data?.data?.AccessToken)
                Cookies.set("brbtbu", data?.data?.RefreshToken)
                props.changePage(3)
            }
            else {
                setServerError(data?.detail)
            }
        };

        if (!otp) { 
            setOtpError("OTP cannot be blank")
            return
        }
        if(otp.length !== 6){
            setOtpError("Invalid OTP")
            return
        }
        let data: any = {
            values: {
                email: props.emailVal,
                confirmation_code: otp,
            },
            callback,
        };
        dispatch(confirmSignUpRequest(data))

    }

    let resendOTP = () => {
        const callback = (data: any) => {
            if (data.status) {
                props.pushNotifTitle("Success")
                props.pushNotif(data.detail, true)
                setServerError("")
            }
            else {
                setServerError(data.detail)
            }
        };

        let data: any = {
            values: {
                email: props.emailVal,
            },
            callback,
        };
        dispatch(resendSignUpOTPRequest(data))
    }

    let changeEmail = () => {
        const callback = (data: any) => {
            if (data.status) {
                props.pushNotifTitle("Success")
                props.pushNotif(data.detail, true)
                setServerError("")
                // props.clearMail()
                props.changePage(1)
            }
            else {
                setServerError(data.detail)
            }
        };

        let data: any = {
            values: {
                email: props.emailVal,
            },
            callback,
        };
        dispatch(clearSignUpEmailRequest(data))
    }

    return (
        <div className="card-body">
            <div className="text-center">
                <img src={premblyLogo} alt="" width="150px" className="mb-4" />
            </div>
            <h4>Email Verification</h4>
            <p className="p-0 m-0">OTP has been sent to {props.emailVal} </p>
            {clearEmailState.isLoading ? 
                <p>Loading ...</p>
                :
                <p className="" onClick={changeEmail}>
                    <button className=" btn-edit pb-1 link link-underline"> Change email</button>
                </p>
            }
            {serverError && <ServerErrorComp error={serverError} /> }

            <div className="">
                <label htmlFor="otp">Enter OTP</label>
                <input type="tel" className={`form-control ${otpError ? "input-error" : ""}`}
                    value={otp} onBlur={checkOtp} maxLength={6}
                    onChange={otp => setOtp(replaceLetters(otp.target.value))} placeholder="123456"
                />
                {otpError && <p style={{ color: "red" }} className="p-0 m-0">{otpError}</p>}
            </div>
            <p className="mt-2">
                Yet to receive OTP?
                <button style={{ font: "20px s-Bold !important" }} className="ms-2 btn-edit pb-1 link link-underline" onClick={resendOTP}>
                    {resendOTPState.isLoading
                        ?
                        <div>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Resending OTP...</span>
                        </div>
                        :
                        "Resend OTP"
                    }
                </button>
            </p>
            <button className="btn btn-green w-100 py-3 mt-4" onClick={confirmSignUp}>
                {confirmSignUpState.isLoading
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
                <Link to="/login" className="link link-underline pb-1"> Login</Link>
            </p>
        </div>
    )
}
