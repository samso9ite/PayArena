import { Navigate,} from "react-router-dom"
import premblyLogo from "../../../assets/logo.png"
import womanImg from "../../../assets/woman-img.png"
import { SetStateAction, useEffect, useState } from "react"
import Cookies from "js-cookie"
import NotificationToast from "../../../components/utils/notifToast"
import InitPasswordResetComp from "../../../components/Auth/resetPassword/initializePassword"
import ConfirmResetPasswordComp from "../../../components/Auth/resetPassword/confirmPassword"

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("")
    const [page, setPage] = useState(1)
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")

    useEffect(() => {
        let accessT = Cookies.get("babtbu") || ""
      
        if (accessT) {
            <Navigate replace to={"/"} />
        }

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

    return (
        <div className="login-area">
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={()=>setNotifVal(!notifVal)}/>}
            <div className="row login-row align-items-center">
                <div className="col-lg-6 ps-lg-0 d-none d-lg-block">
                    <img src={womanImg} className="w-100" alt="" />
                </div>
                <div className="col-lg-6 pt-3">
                    <div className="col-11 col-md-8 col-lg-10 mx-auto ms-lg-4">
                        <div className="card py-5 px-md-4">
                            {page === 1 &&
                                <InitPasswordResetComp changePage={changePage} pushNotif={pushNotif} pushEmail={pushEmail} pushNotifTitle={pushNotifTitle} />
                            }
                            {page === 2 &&
                                <ConfirmResetPasswordComp emailVal={email} changePage={changePage} pushNotif={pushNotif} pushNotifTitle={pushNotifTitle} />
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
