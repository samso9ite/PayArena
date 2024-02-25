import { Link} from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../redux/reducers"
import { Spinner } from "react-bootstrap"
import premblyLogo from "../../../../assets/logo.png"
import validators from "../../../utils/validators"
import { initResetPasswordRequest } from "../../../../redux/actions/auth/resetPassword/initializeResetPassword"
import { ServerErrorComp } from "../../../utils"

export default function InitPasswordResetComp(props:any) {

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [serverError, setServerError] = useState("")

    const initResetPasswordState = useSelector((state: RootState) => state.initResetPasswordReducer)

    const dispatch = useDispatch()

    let emailValidation = validators.emailValidate(email)

    let checkEmail = ()=>{
        if (emailValidation.status) { setEmailError("") }
        else{ setEmailError(emailValidation.message) }
    }

    let initializeResetPassword = () => {

        const callback = (data: any) => {
            if (data.status) {
                props.pushNotifTitle("Success")
                props.pushNotif("We have sent an OTP to you, kindly check your email", true)
                setServerError("")
                props.pushEmail(email)
                props.changePage(2)
            }
            else {
                // props.pushNotifTitle("Error")
                // props.pushNotif(data.detail, true)
                setServerError(data.detail)
            }
        };

        if (!emailValidation.status) {
                setEmailError(emailValidation.message)
                // props.pushNotifTitle("Error")
                // props.pushNotif(emailValidation.message, true)
            return
        }

        let data: any = {
            values: {
                email,
            },
            callback,
        };
        dispatch(initResetPasswordRequest(data))
    }

    return (
        <div className="card-body">
            <div className="text-center">
                <img src={premblyLogo} alt="" width="150px" className="mb-4" />
                <h4>Password Reset</h4>
                <p className="mb-4">Kindly input your account email address</p>
                {serverError && <ServerErrorComp error={serverError} /> }
            </div>

            <div className="">
                <label htmlFor="email">Email Address</label>
                <input type="email" className={`form-control ${emailError ? "input-error" : ""}`} 
                    onBlur={checkEmail}
                    onChange={email => setEmail(email.target.value.toLowerCase())} placeholder="johndoe@prembly.com" 
                />
                {emailError && <p style={{color:"red"}} className="p-0 m-0">{emailError}</p>}
            </div>
            <button className="btn btn-green w-100 py-3 mt-4" onClick={initializeResetPassword}>
                {initResetPasswordState.isLoading
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
                    "Next"
                }
            </button>
            <p className=" text-center mt-4">
                Already have an account ?
                <Link to="/login" className="link link-underline"> Login</Link>
            </p>
        </div>
    )
}
