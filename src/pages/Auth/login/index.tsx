import { Link } from 'react-router-dom'
import premblyLogo from '../../../assets/logo.png'
import womanImg from '../../../assets/woman-img.png'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequest } from '../../../redux/actions/auth/login'
import { RootState } from '../../../redux/reducers'
import { Spinner } from 'react-bootstrap'
import NotificationToast from '../../../components/utils/notifToast'
import Cookies from 'js-cookie'
import global from '../../../redux/constants/global'
import { ServerErrorComp } from '../../../components/utils'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [serverError, setServerError] = useState('')
    const [ip, setIp] = useState('')
    const [viewPassword, setViewPassword] = useState(false)

    const loginState = useSelector((state: RootState) => state.loginReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        getUserLocation()

        let accessT = Cookies.get('babtbu') || ''

        if (accessT) {
            window.location.href = global.appBaseUrl
        }
    }, [])

    const getUserLocation = () => {
        var requestOptions: any = {
            method: 'GET',
            redirect: 'follow',
        }

        fetch('https://api.ipify.org?format=json', requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIp(result?.ip)
            })
            .catch((error) => console.log('error', error))
    }

    let checkEmail = () => {
        if (!email) {
            setEmailError('Email cannot be blank')
        } else {
            setEmailError('')
        }
    }
    let checkPassword = () => {
        if (!password) {
            setPasswordError('Password cannot be blank')
        } else {
            setPasswordError('')
        }
    }

    let attemptlogin = () => {
        getUserLocation()
        const callback = (data: any) => {
            if (data?.status) {
                // let sortedData = data?.organisations.sort((d1:any, d2:any) => d1?.organisation?.created_at - d2?.organisation?.created_at)
                // console.log(sortedData)
                setServerError('')
                Cookies.set('babtbu', data?.data?.AccessToken)
                Cookies.set('brbtbu', data?.data?.RefreshToken)
                Cookies.set('org', data?.organisations[0].organisation.id)

                if(data?.organisations[0]?.organisation?.id){
                    window.location.href = global.appBaseUrl
                }
            } else {
                // setNotifVal(true)
                // setNotifError(data.detail)
                setServerError(data.detail)
                // if(data?.code === "REQUIRE_CONFIRMATION"){
                //     window.location.href = global.appBaseUrl + "/signUp?reqConfirmation=true"
                // }
            }
        }

        let data: any = {
            values: {
                email,
                password,
                ip,
            },
            callback,
        }

        if (!email) {
            setEmailError('Email cannot be blank')
            return
        }
        if (!password) {
            setPasswordError('Password cannot be blank')
            return
        }
        if (!ip) {
            getUserLocation()
        }
        dispatch(loginRequest(data))
    }

    return (
        <div className="login-area">
            {/* {(notifError && notifVal) && <NotificationToast title={"Error"} message={notifError} closeNotif={()=>setNotifVal(!notifVal)}/>} */}
            <div className="row login-row align-items-center">
                <div className="col-lg-6 ps-lg-0 d-none d-lg-block">
                    <img src={womanImg} className="w-100" alt="" />
                </div>
                <div className="col-lg-6 pt-3">
                    <div className="col-11 col-md-8 col-lg-10 mx-auto ms-lg-4">
                        <div className="card py-5 px-md-4">
                            <div className="card-body">
                                <div className="text-center">
                                    <img src={premblyLogo} alt="" width="150px" className="mb-3" />
                                    <h4>Welcome Back to Prembly</h4>
                                    <p className="mb-4">
                                        Kindly fill in your details to sign in to your account
                                    </p>
                                    {serverError && <ServerErrorComp error={serverError} />}
                                </div>
                                <div className="">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        className={`form-control ${emailError ? 'input-error' : ''
                                            }`}
                                        onBlur={checkEmail}
                                        onChange={(email) =>
                                            setEmail(email.target.value.toLowerCase())
                                        }
                                        placeholder="name@company.com"
                                    />
                                    {emailError && (
                                        <p style={{ color: 'red' }} className="p-0 m-0">
                                            {emailError}
                                        </p>
                                    )}
                                </div>
                                <div className="">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-group">
                                        <input
                                            type={!viewPassword ? "password" : "text"}
                                            className={`form-control ${passwordError ? 'input-error' : '' }`}
                                            onBlur={checkPassword}
                                            onChange={(password) => setPassword(password.target.value)}
                                            placeholder="*********"
                                        />
                                        <span >
                                            <div className="form-control py-3 d-flex align-items-center" style={{borderRadius: "0px 5px 5px 0px" }}>
                                                {!viewPassword ?
                                                    <i className="ri-eye-line ri-lg" onClick={()=>setViewPassword(true)} style={{cursor:"pointer"}} />
                                                    :
                                                    <i className="ri-eye-off-line ri-lg" onClick={()=>setViewPassword(false)} style={{cursor:"pointer"}} />
                                                }
                                            </div>
                                        </span>
                                    </div>
                                    {passwordError && (
                                        <p style={{ color: 'red' }} className="p-0 m-0">
                                            {passwordError}
                                        </p>
                                    )}
                                </div>
                                <div className="row mb-4 mt-2 ">
                                    <div className="col-7">
                                        <input type="checkbox" name="" id="" />
                                        <small className="ms-1">Keep me signed in</small>
                                    </div>
                                    <div className="col-5 text-end">
                                        <Link to="/ResetPassword" className="link link-underline">
                                            Reset Password
                                        </Link>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-green w-100 py-3 mt-1"
                                    onClick={attemptlogin}>
                                    {loginState.isLoading ? (
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
                                        'Log In'
                                    )}
                                </button>
                                <p className=" text-center mt-4">
                                    Don't have an account?
                                    <Link to="/signUp" className="link link-underline ms-2">
                                        {' '}
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
