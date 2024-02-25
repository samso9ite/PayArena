import React, { useState } from 'react'
import refLogo from '../../assets/ref-logo.png'
import logo from '../../assets/logo.png'
import NotificationToast from '../../components/utils/notifToast'
import global from '../../redux/constants/global'

export default function ReferralAgreementPage(props:any) {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [agreementValue, setAgreementValue] = useState(false)


    let triggerAgreement = ()=>{
        if(!agreementValue){
            setNotifTitle("Error")
            setNotif("Please sign the Agreement")
            setNotifVal(true)
        }
        else{
            props?.agree()
        }

    }
    return (
        <div className='referral-agreement-area'>
        {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={()=>setNotifVal(!notifVal)}/>}
            <div className="container-fluid">
            <div className="row">
                <div className="col-lg-5 d-none d-lg-block">
                    <div className="left-side my-5 px-4">
                        <div>
                            <img src={refLogo} alt="" width="150px" />
                        </div>
                        <div>
                            <h4 style={{color:"#fff"}}>Referral Terms & Conditions</h4>
                            {/* <p style={{color:"#003E51"}}> */}
                            <p style={{color:"#fff"}}>
                                Referred by {props?.refComp}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="col-md-8 mx-auto py-4">
                        <div className="text-center">
                            <div className='d-lg-none'>
                                <img src={logo} alt="" width="150px" />
                            </div>
                            <h4>Welcome to Prembly</h4>
                            <p>
                                By using the website {`${global.appBaseUrl}referral`} , you acknowledge and
                                agree to the terms and conditions specified herein.
                            </p>
                        </div>
                        <div className="card p-3">
                            <div className="card-body">
                                <p>
                                    You are hereby granting your referrer access to view your transactions
                                    on our platform for a limited period. This access will allow your referrer
                                    to view the amount and cost of your transactions, which will provide transparency
                                    on the commission they have earned based on your signup through their link.
                                </p>
                                <p>
                                    Please note that your referrer will not have access to any of the personal data
                                    you have provided, as this information will remain confidential. Only the number
                                    and cost of transactions made by you will be accessible to your referrer for a period
                                    of one year.
                                </p>
                                <p>
                                    Please be advised that you have the option to revoke this consent at any time by sending
                                    us a notice. Such revocation may result in the termination of your participation in the
                                    referral program.
                                </p>
                                <p>
                                    Furthermore, we reserve the right to modify or amend these Terms of Service at any time.
                                    Any changes made will be effective immediately upon posting on our website, and your
                                    continued use of the site will be deemed as acceptance of the updated Terms of Service.
                                </p>
                                <p>
                                    By accessing this website and participating in our referral program, you acknowledge that
                                    you have read and understood these terms and conditions and agree to abide by them.
                                </p>
                                <p>
                                    Please note that the violation of any of the conditions outlined in this agreement may
                                    result in the termination of your account.”
                                </p>
                                <div className='d-flex '>
                                    <input type="checkbox" name="" id="" className='me-2' onChange={e => setAgreementValue(e.target.checked)} />
                                    <p className='p-0 m-0'>I agree</p>
                                </div>
                                <button className='btn btn-deep-green w-100 mt-4' onClick={triggerAgreement}>
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
