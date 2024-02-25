import { Navigate,} from "react-router-dom"
import womanImg from "../../../assets/woman-img.png"
import { SetStateAction, useEffect, useState } from "react"
import Cookies from "js-cookie"
import NotificationToast from "../../../components/utils/notifToast"
import InitSignUpComp from "../../../components/Auth/signUp/initialize"
import ConfirmSignUpComp from "../../../components/Auth/signUp/confirm"
import SetPasswordComp from "../../../components/Auth/signUp/setPassword"
import ReferralAgreementPage from "../../referral/referralAgreement"

export default function  SignUpPage() {
    const [email, setEmail] = useState("")
    const [page, setPage] = useState(1)
    const [token, setToken] = useState("")
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [showRefAgreement, setShowRefAgreement] = useState(false)

    const queryParams = new URLSearchParams(window.location.search)
    let refCode = queryParams.get("refCode") || ""
    let refComp = queryParams.get("refCompany") || ""
    // let confirmCode = queryParams.get("refConfirmation") !== "true"

    useEffect(() => {
        let accessT = Cookies.get("babtbu") || ""
      
        if (accessT) {
            <Navigate replace to={"/"} />
        }
        
        if(refCode){
            setShowRefAgreement(true)
        }

        // if(queryParams.get("reqConfirmation") === "true"){
        //     setPage(2)
        // }
    }, [])

    let pushNotifTitle = (title: SetStateAction<string>) =>{
        setNotifTitle(title)
    }
    let pushNotif = (notif: SetStateAction<string>, val: boolean | ((prevState: boolean) => boolean)) =>{
        setNotif(notif)
        setNotifVal(val)
    }

    let changePage = (pg: SetStateAction<number>) =>{
        setPage(pg)
    }

    let pushEmail = (mail: SetStateAction<string>) =>{
        setEmail(mail)
    }

    let passToken = (tok: SetStateAction<string>) =>{
        setToken(tok)
    }

    let clearMail =()=>{
        setEmail("")
    }

    let agreeToRefCondtions = () =>{
        setShowRefAgreement(false)
    }

    return (
        <>
            {showRefAgreement && <ReferralAgreementPage agree={agreeToRefCondtions} refComp={refComp} />}

            {!showRefAgreement &&
            <div className="login-area">
                {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={()=>setNotifVal(!notifVal)}/>}
                <div className="row login-row align-items-center">
                    <div className="col-lg-6 ps-lg-0 d-none d-lg-block">
                        <img src={womanImg} className="w-100" alt="" />
                    </div>
                    <div className="col-lg-6 pt-3">
                        <div className="col-11 col-md-8 col-lg-10 mx-auto ms-lg-4">
                            <div className="card py-4 px-md-4">
                                {page === 1 &&
                                    <InitSignUpComp changePage={changePage} pushNotif={pushNotif} pushEmail={pushEmail} pushNotifTitle={pushNotifTitle} refCode={refCode}/>
                                }
                                {page === 2 &&
                                    <ConfirmSignUpComp emailVal={email} clearMail={clearMail} changePage={changePage} pushNotif={pushNotif} pushNotifTitle={pushNotifTitle}  passToken={passToken} />
                                }
                                {page === 3 &&
                                    <SetPasswordComp pushNotif={pushNotif} pushNotifTitle={pushNotifTitle}  token={token}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}
