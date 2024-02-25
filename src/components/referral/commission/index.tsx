import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import walletIcon from '../../../assets/wallet-icon.png'
import { NumericFormat } from 'react-number-format';
import { Spinner } from 'react-bootstrap';
import NotificationToast from '../../utils/notifToast';
import { removeLetters } from '../../utils';
import { referralCommissionWithdrawalRequest, referralFeedbackRequest } from '../../../redux/actions/referral';

export default function CommissionComponent(props: any) {

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [commissionModal, setCommissionModal] = useState(false)
    const [amount, setAmount] = useState(0)
    const [commissionPage, setCommissionPage] = useState(1)
    const [feedbackModal, setFeedbackModal] = useState(false)
    const [feedbackCountdown, setFeedbackCountdown] = useState(5)
    const [score, setScore] = useState("")
    const [comment, setComment] = useState("")



    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer);
    const commissionWithdrawalState = useSelector((state: RootState) => state.referralCommissionWithdrawalReducer);
    const feedbackState = useSelector((state: RootState) => state.referralFeedbackReducer);

    const dispatch = useDispatch()

    useEffect(() => {
        if ((feedbackCountdown > 0) && (commissionPage === 3)) {
            setTimeout(() => setFeedbackCountdown(feedbackCountdown - 1), 1000);
        }
        if (feedbackCountdown === 0) {
            setFeedbackModal(true)
            setCommissionModal(false)
            setAmount(0)
            setCommissionPage(1)
            setFeedbackCountdown(5)
        }
    }, [feedbackCountdown, commissionPage])

    let checkAmount = () => {
        if (!amount) {
            setNotifTitle("Error")
            setNotif("Please enter the amount you want to transfer to your prembly wallet")
            setNotifVal(true)
        }
        else if(amount > Number(props?.balance)){
            setNotifTitle("Error")
            setNotif("You cannot transfer more than you have in your commision wallet")
            setNotifVal(true)
        }
        else {
            setCommissionPage(2)
        }

    }

    let claimCommission = () => {
        const callback = (data: any) => {
            if (data.status) {
                setCommissionPage(3)
            }
            else {
                setNotifTitle("Error")
                setNotif(data.data)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {
                amount,
            },
            callback,
        };
        dispatch(referralCommissionWithdrawalRequest(data))
    }

    let sendFeedback = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle("Success")
                setNotif("Feedback successfully sent. Thanks for your feedback")
                setNotifVal(true)
                setFeedbackModal(false)
                props?.getAllBalance()
                setComment("")
                setScore("")
            }
            else {
                setNotifTitle("Error")
                setNotif(data.data)
                setNotifVal(true)
            }
        };

        if (!score) {
            setNotifTitle("Error")
            setNotif("Please select the score that best communicates your thought")
            setNotifVal(true)
            return
        }
        if (!comment) {
            setNotifTitle("Error")
            setNotif("Please make a comment")
            setNotifVal(true)
            return
        }

        let data: any = {
            values: {
                score,
                comment,
            },
            callback,
        };

        dispatch(referralFeedbackRequest(data))
    }

    return (
        <>
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

            {commissionModal &&
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span
                            onClick={() => {
                                setAmount(0)
                                setCommissionModal(false)
                                props?.getAllBalance()
                            }}
                        >
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Claim commission</h5>
                                </div>
                                {commissionPage === 1 &&
                                    <div className="bg-light text-center my-5 py-3 px-2">
                                        <p>
                                            You have {`${props?.currency} ${props?.balance}`} in your commission wallet. You can redeem all
                                            or type in the amount you want to redeem to your Prembly wallet
                                        </p>
                                        <div className="col-9 mx-auto">
                                            <div className="input-group">
                                                <input value={amount} placeholder="500" type="text" onChange={e => setAmount(removeLetters(e.target.value))} className="form-control" />
                                                <span >
                                                    <button style={{ borderRadius: "0px 5px 5px 0px" }} className='btn btn-light-green px-3' onClick={checkAmount}>
                                                        Redeem
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {commissionPage === 2 &&
                                    <div className=" text-center my-5 py-3 px-2">
                                        <p>
                                            You are about to transfer {`${props?.currency} ${amount}`} to your Prembly wallet
                                        </p>
                                        <span >
                                            <button className='btn btn-deep-green-outline px-4 me-2' disabled={commissionWithdrawalState?.isLoading} onClick={() => setCommissionPage(1)}>
                                                Cancel
                                            </button>
                                            <button className='btn btn-light-green px-4' disabled={commissionWithdrawalState?.isLoading} onClick={claimCommission}>
                                                {commissionWithdrawalState?.isLoading
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
                                                    "Confirm"
                                                }
                                            </button>
                                        </span>
                                    </div>
                                }
                                {commissionPage === 3 &&
                                    <div className=" text-center my-5 py-3 px-2">
                                        <p> Your Prembly wallet has been Credited! </p>
                                        <small style={{ fontWeight: 800 }}>Feedback survey in  {feedbackCountdown} second{(feedbackCountdown > 1) && "s"}</small>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }

            {feedbackModal &&
                <div className="main-modal">
                    <div className="main-modal-content card col-md-7 col-lg-5 mx-auto">
                        <span
                            onClick={() => {
                                setFeedbackModal(false)
                                props?.getAllBalance()
                                setComment("")
                                setScore("")
                            }}
                        >
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-4 col-lg-2">
                                    <h5>Feedback</h5>
                                </div>
                                <div className=" py-3 px-2">
                                    <p style={{ color: "#8193B1" }}>We value your opinion, spare a minute of your time to take this survey</p>
                                    <div className='feedback-score'>
                                        <label htmlFor="score">How satisfied are you with the referral process?  </label>
                                        <div className="d-flex justify-content-between">
                                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((val: any, i: number) => (
                                                <small className={score === val ? "active" : ""} key={i} onClick={() => setScore(val)}>
                                                    {val}
                                                </small>
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ color: "#8193B1", fontSize: 12 }}>Not Satisfied</p>
                                            <p style={{ color: "#8193B1", fontSize: 12 }}>Highly Satisfied</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="comment">How would you want us to improve? </label>
                                        <textarea className='form-control' onChange={e=>setComment(e.target.value)} rows={3} placeholder="Let us know"></textarea>
                                    </div>
                                        <span >
                                            <button className='btn btn-deep-green-outline px-4 mt-3 me-2' disabled={feedbackState?.isLoading} 
                                                onClick={() => {
                                                    setFeedbackModal(false)
                                                    props?.getAllBalance()
                                                    setComment("")
                                                    setScore("")
                                                }}
                                            >
                                                Skip
                                            </button>
                                            <button className='btn btn-deep-green px-4 mt-3' disabled={feedbackState?.isLoading} onClick={sendFeedback}>
                                                {feedbackState?.isLoading
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
                                                    "Send"
                                                }
                                            </button>
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


            <div className='topup-card'>
                <div className="card" style={{ minHeight: "200px" }}>
                    <div className="card-body">
                        <h5>Commission Wallet Balance</h5>
                        <div className="row align-items-center">
                            <div className="col-md-8 ">
                                <div className="d-flex mt-2">
                                    <h4 className=' me-1'>
                                        {props?.currency}
                                    </h4>
                                    <h4 className='p-0 m-0 add-ellipsis'>
                                        <NumericFormat value={props?.balance}
                                            thousandsGroupStyle={organisationInfoState?.resp?.data?.organisation?.currency}
                                            thousandSeparator=","
                                        />
                                    </h4>
                                </div>
                                <button className='btn btn-deep-green mt-4 px-3' onClick={() => setCommissionModal(true)}>
                                    Claim
                                </button>
                            </div>
                            <div className="col-md-4">
                                <img src={walletIcon} alt="" className='w-100' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
