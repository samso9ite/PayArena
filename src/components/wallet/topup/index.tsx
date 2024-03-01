import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { organisationInfoRequest } from '../../../redux/actions/settings/organisationInfo';
import { RootState } from '../../../redux/reducers';
import walletIcon from '../../../assets/walletImg.svg'
import { NumericFormat } from 'react-number-format';
import { mpesaTopUpWalletRequest, topUpWalletRequest, virtualAccountInfoRequest, walletToWalletTransferRequest } from '../../../redux/actions/wallet';
import global from '../../../redux/constants/global';
import { Spinner } from 'react-bootstrap';
import NotificationToast from '../../utils/notifToast';
import { removeLetters } from '../../utils';
import Cookies from 'js-cookie';

export default function TopupComp(props:any) {

    // console.log(organisationInfoState?.resp)

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [topUpModal, setTopUpModal] = useState(false)
    const [fundPage, setFundPage] = useState("1")
    const [amount, setAmount] = useState(10000)
    const [paymentMethod, setPaymentMethod] = useState("")
    const [paymentOrg, setPaymentOrg] = useState("")
    // const [paymentPlatform, setPaymentPlatform] = useState("")
    const [paymentPlatform, setPaymentPlatform] = useState("stripe")
    // const [paymentCurrency, setPaymentCurrency] = useState(organisationInfoState?.resp?.data?.organisation?.currency)
    const [paymentCurrency, setPaymentCurrency] = useState("NGN")
    const [code, setCode] = useState("")
    const [otherWalletInput, setOtherWalletInput] = useState('')

    // const virtualAccountInfoState = useSelector((state: RootState) => state.virtualAccountInfoReducer);
    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer);
    const topUpWalletState = useSelector((state: RootState) => state.topUpWalletReducer);
    const mpesaTopUpWalletState = useSelector((state: RootState) => state.mpesaTopUpWalletReducer);
  
    // const paystackTopUpWalletState = useSelector((state: RootState) => state.paystackTopUpWalletReducer);
    // const flutterwaveTopUpWalletState = useSelector((state: RootState) => state.flutterwaveTopUpWalletReducer);
    const myOrganisationInfoState = useSelector((state: RootState) => state.myOrganisationInfoReducer);
    const walletTransferState = useSelector((state: RootState) => state.walletToWalletTransferReducer);


    const dispatch = useDispatch()

    let orgId = Cookies.get("org") || ""

    useEffect(() => {
        // getOrgInfo()
        // getVirtualAccountInfo()
    }, [])

    let getOrgInfo = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle("Success")
                setNotif(data.detail)
                setNotifVal(true)
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {},
            callback,
        };
        dispatch(organisationInfoRequest(data))
    }

    // let getVirtualAccountInfo = () => {
    //     const callback = (data: any) => {
    //         if (data.status) {
    //             setNotifTitle("Success")
    //             setNotif(data.detail)
    //             setNotifVal(true)
    //         }
    //         else {
    //             setNotifTitle("Error")
    //             setNotif(data.detail)
    //             setNotifVal(true)
    //         }
    //     };
    //     let data: any = {
    //         values: {},
    //         callback,
    //     };
    //     dispatch(virtualAccountInfoRequest(data))
    // }

    
    let proceedToNext = () => {
        if (!amount) {
            setNotifTitle("Error")
            setNotif("Please enter an Amount")
            setNotifVal(true)
            return
        }
        else if(paymentCurrency === "NGN" && (amount < 10000)){
            setNotifTitle("Error")
            setNotif("Amount cannot be less than NGN10000")
            setNotifVal(true)
            return
        }
        if((paymentCurrency === "USD") && (organisationInfoState?.resp?.data?.organisation?.currency === "NGN") && (amount < 10)){
            setNotifTitle("Error")
            setNotif("Amount cannot be less than USD10")
            setNotifVal(true)
            return
        }
        if((paymentCurrency === "USD") && (organisationInfoState?.resp?.data?.organisation?.currency === "USD") && (amount < 200)){
            setNotifTitle("Error")
            setNotif("Amount cannot be less than USD200")
            setNotifVal(true)
            return
        }
        else if (!paymentMethod){
            setNotifTitle("Error")
            setNotif("Please select payment method")
            setNotifVal(true)
            return
        }
        else if ((paymentMethod === "card" || paymentMethod === "mpesa")  && !paymentPlatform){
            setNotifTitle("Error")
            setNotif("Please select payment platform")
            setNotifVal(true)
            return
        }
        // else if (paymentMethod === "card" && paymentPlatform === "stripe"){
        //     fundWallet()
        //     return
        // }
        // else if (paymentMethod === "card" && paymentPlatform === "paystack"){
        //     paystackFundWallet()
        //     return
        // }
        // else if (paymentMethod === "card" && paymentPlatform === "flutterwave"){
        //     flutterwaveFundWallet()
        //     return
        // }
        else if (paymentMethod === "transfer"){
            setFundPage("2")
            return
        }
        else if (paymentMethod === "wallet" && !paymentOrg ){
            setNotifTitle("Error")
            setNotif("Select business you want to transfer to")
            setNotifVal(true)
            return
        }
        else if (paymentMethod === "wallet" && paymentOrg ){
            setFundPage("3")
            return
        }
        else if((paymentMethod === "mpesa" && (paymentPlatform === "stk-push" || paymentPlatform === "ussd")) && !otherWalletInput){
            setNotifTitle("Error")
            if(paymentPlatform == "stk-push"){
                setNotif("Please enter your phone number")
            }else{
                setNotif("Please fill in your M-PESA billing number")
            }
            setNotifVal(true)
            return
        }
        else (
            fundWallet()
        )

    }


    let fundWallet = () => {
        let refinedPaymentMethod
        let refinedPaymentPlatform
        if(paymentMethod == "card"){
            refinedPaymentMethod = paymentPlatform
            refinedPaymentPlatform = paymentMethod
        }else{
            refinedPaymentMethod = paymentMethod
            refinedPaymentPlatform = paymentPlatform
        } 
        const callback = (data: any) => {
            
            if (data.status && paymentMethod == "card") {
                window.location.href = data?.link
            }else if(data.status && paymentMethod == "mpesa"){
                if(paymentPlatform == "qr-code"){
                    setCode(data?.link)
                    setFundPage('3')
                }else if(paymentPlatform == 'usd'){
                    setCode(data?.link)
                    setFundPage('4')
                }else if(paymentPlatform == "stk-push"){
                    setFundPage('5')
                }
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let values
        if (paymentMethod == "mpesa" && paymentPlatform === "ussd"){
            values = {
                amount: amount.toString(),
                pay_with: refinedPaymentPlatform,
                payment_gateway:refinedPaymentMethod,
                mpesa_billing_number: otherWalletInput,
                // email: organisationInfoState?.resp?.data?.organisation.official_email,
                currency: paymentCurrency || organisationInfoState?.resp?.data?.organisation?.currency,
                redirect_url: global.appBaseUrl,
                // cancel_url: global.appBaseUrl + "?failed=true"
            }
        }else if(paymentMethod == "mpesa" && paymentPlatform == "stk-push"){
            values = {
                amount: amount.toString(),
                pay_with: refinedPaymentPlatform,
                payment_gateway:refinedPaymentMethod,
                phone_number: otherWalletInput,
                currency: paymentCurrency || organisationInfoState?.resp?.data?.organisation?.currency,
                redirect_url: global.appBaseUrl,
        }}else {
            values = {
                amount: amount.toString(),
                pay_with: refinedPaymentPlatform,
                payment_gateway:refinedPaymentMethod,
                // phone_number: otherWalletInput,
                currency: paymentCurrency || organisationInfoState?.resp?.data?.organisation?.currency,
                redirect_url: global.appBaseUrl,
        }
    }
        
        let data: any = {
            values: values,
            callback,
        };
        dispatch(mpesaTopUpWalletRequest(data))
        
    }

    // let paystackFundWallet = () => {
    //     const callback = (data: any) => {
    //         if (data.success) {
    //             window.location.href = data?.response?.url
    //         }
    //         else {
    //             setNotifTitle("Error")
    //             setNotif(data.detail)
    //             setNotifVal(true)
    //         }
    //     };
    //     let data: any = {
    //         values: {
    //             amount: amount.toString(),
    //             // currency: paymentCurrency || organisationInfoState?.resp?.data?.organisation?.currency,
    //             currency: paymentCurrency,
    //             callback_url: global.appBaseUrl + window.location.pathname.replace("/",''),
    //         },
    //         callback,
    //     };
    //     dispatch(paystackTopUpWalletRequest(data))
    // }

    // let flutterwaveFundWallet = () => {
    //     const callback = (data: any) => {
    //         if (data?.success) {
    //             // console.log(data)
    //             window.location.href = data?.response
    //         }
    //         else {
    //             setNotifTitle("Error")
    //             setNotif(data.detail)
    //             setNotifVal(true)
    //         }
    //     };
    //     let data: any = {
    //         values: {
    //             amount: amount.toString(),
    //             // currency: paymentCurrency || organisationInfoState?.resp?.data?.organisation?.currency,
    //             // currency: paymentCurrency,
    //             callback_url: global.appBaseUrl + window.location.pathname.replace("/",''),
    //         },
    //         callback,
    //     };
    //     dispatch(flutterwaveTopUpWalletRequest(data))
    // }

    let walletTransfer = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle("Success")
                setNotif(`${data?.data?.message} with ${data?.data?.unit}`)
                setNotifVal(true)
                setTopUpModal(false)
                setAmount(0)
                setFundPage('1')
                setPaymentMethod("")
                getOrgInfo()
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {
                credit_id: paymentOrg,
                payment_type: "wallet",
                amount: amount.toString(),
                email: organisationInfoState?.resp?.data?.organisation?.official_email,
                // currency: paymentCurrency || organisationInfoState?.resp?.data?.organisation?.currency,
                currency: paymentCurrency,
                success_url:"",
                cancel_url: ""
            },
            callback,
        };
        dispatch(walletToWalletTransferRequest(data))
    }

	let copyFunc = (val:any)=>{
		navigator.clipboard.writeText(val)
		setNotifTitle("Success")
		setNotif("Copied to Clipboard")
		setNotifVal(true)
	}

    // console.log(organisationInfoState?.resp)

    return (
        <>
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}
            {topUpModal &&
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span
                            onClick={() => {
                                setTopUpModal(false)
                                setAmount(0)
                                setPaymentMethod("")
                            }}
                        >
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
							<div className="main-modal-body">
								<div className="main-modal-header col-md-8 col-lg-5">
									<h5>Top Up Wallet</h5>
								</div>
                                {(fundPage === "1") &&
                                    <div>
                                        {props?.permissionKey === "b226a56e-702f-4059-bbb6-e1fe0b19b172" &&
                                            <div className="">
                                                <label htmlFor="paymentMethod">Select Business to Top</label>
                                                <select className="form-select " value={paymentOrg} 
                                                    onChange={e => {
                                                        setPaymentMethod("")
                                                        setPaymentOrg(e.target.value)
                                                    }}
                                                >
                                                    <option value="">Select Business</option>
                                                    {myOrganisationInfoState?.resp?.data?.map((val: any, i: number) => (
                                                        <option key={i} value={val?.organisation?.id}>{val?.organisation?.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        }
                                        <div className="">
                                            <label htmlFor="amount">Amount</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" value={amount} 
                                                    onChange={e => setAmount(removeLetters(e.target.value))} 
                                                    placeholder={organisationInfoState?.resp?.data?.organisation.currency === "NGN" ? "10000" : "1000"} 
                                                />
                                                <span className="">
                                                    <select className="form-select" value={paymentCurrency} 
                                                        onChange={(e)=>{
                                                            setPaymentCurrency(e.target.value);
                                                            ((e?.target?.value === "USD") &&(paymentMethod === 'card')) && setPaymentPlatform('stripe')
                                                        }} 
                                                        style={{ borderRadius: "0px 5px 5px 0px" }}>
                                                        <option value="NGN">NGN</option>
                                                        <option value="USD">USD</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <label htmlFor="paymentMethod">Select Payment Method</label>
                                            <select className="form-select " value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                                                <option value="">Select Payment Method</option>
                                                {(!paymentOrg || orgId === paymentOrg) &&
                                                    <option value="card">Card Payment</option>
                                                }
                                                {/* {organisationInfoState?.resp?.data?.organisation.currency === 'NGN' &&
                                                    <option value="transfer">Bank Transfer</option>
                                                } */}
                                                {/* {(!paymentOrg || orgId === paymentOrg) &&
                                                    <option value="mpesa">MPESA</option>
                                                } */}
                                                {(paymentOrg && orgId !== paymentOrg) &&
                                                    <option value="wallet">Wallet Transfer</option>
                                                }
                                            </select>
                                        </div>
                                        
                                        {(paymentMethod === 'card' || paymentMethod === 'mpesa')  &&
                                            <div className="">
                                                <label htmlFor="paymentPlatform">Select Payment Platform</label>
                                                <select className="form-select " value={paymentPlatform} 
                                                    onChange={e => {
                                                        setPaymentPlatform(e.target.value)
                                                    }}
                                                >
                                                    <option value="">Select Platform</option>
                                                    {/* {organisationInfoState?.resp?.data?.organisation.currency === "NGN" ?
                                                        <>
                                                            <option value="stripe">Fund with Stripe</option>
                                                            <option value="paystack">Fund with Paystack</option>
                                                            <option value="flutterwave">Fund with Flutterwave</option>
                                                        </>
                                                        :
                                                        <>
                                                            <option value="stripe">Fund with Stripe(USD)</option>
                                                        </>
                                                    } */}
                                                    {(paymentMethod == 'card') ?
                                                        <>
                                                            <option value="stripe">Fund with Stripe</option>
                                                            <option value="paystack">Fund with Paystack</option>
                                                            <option value="flutterwave">Fund with Flutterwave</option>
                                                        </> 
                                                        :
                                                        <>
                                                            <option value="qr-code">QR Code</option>
                                                            <option value="ussd">USSD</option>
                                                            {/* <option value="stk-push">STK Push</option> */}
                                                        </> 
                                                    }
                                                </select>
                                            </div>
                                        }
                                        {(paymentPlatform === "ussd" || paymentPlatform === "stk-push") &&
                                            <div className='input'>
                                                <label htmlFor="paymentPlatform">{ paymentPlatform === "ussd" ? "M-PESA Billing Number" : 'Phone Number'}</label>
                                                <input type="text" className="form-control"  
                                                    onChange={e => setOtherWalletInput((e.target.value))} 
                                                    placeholder={
                                                        paymentPlatform === "ussd" ? "M-PESA Billing Number" : 'Phone Number'
                                                    } 
                                                />
                                            </div>
                                        }

                                        <button className="btn btn-deep-green py-2 mt-4" 
                                            onClick={ proceedToNext} disabled={mpesaTopUpWalletState.isLoading}
                                        >
                                            {(topUpWalletState?.isLoading ||
                                                mpesaTopUpWalletState?.isLoading 
                                                // flutterwaveTopUpWalletState?.isLoading
                                                )
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
                                                "Proceed"
                                            }
                                        </button>
                                    </div>
                                }
                                {(fundPage === "2") &&
                                    <div>
                                        <div className="bg-light text-center my-5 py-3 px-2">
                                            <p>Transfer NGN {amount} to the {organisationInfoState?.resp?.data?.account?.bank_name} account below. </p>
                                            {organisationInfoState?.resp?.data?.account?.account_number &&
                                                <button className="btn btn-copy" onClick={() => copyFunc(organisationInfoState?.resp?.data?.account?.account_number)}>
                                                    <small className="d-flex align-items-center">
                                                        {organisationInfoState?.resp?.data?.account?.account_number}
                                                        <i className=" ms-3 ri-file-copy-fill ri-xl" />
                                                    </small>
                                                </button>
                                            }
                                            {!organisationInfoState?.resp?.data?.account?.account_number &&
                                                <button className="btn btn-copy px-3 py-3" style={{ fontSize: "30px !important" }}>
                                                    <small>
                                                        NOT AVAILABLE
                                                    </small>
                                                </button>
                                            }
                                            <p className="mt-3"> click the code to copy it</p>
                                        </div>
                                        <button className="btn link-underline " onClick={() => setFundPage("1")}>Change Payment Method</button>
                                    </div>
                                }
                                {(fundPage === "3") &&
                                    <div>
                                        <div className="bg-light text-center my-5 py-3 px-2">
                                            <p>
                                                {`You are about to move ${paymentCurrency} ${amount} from `}
                                                <b>
                                                    {myOrganisationInfoState?.resp?.data?.map((val: any) => {
                                                        if(orgId === val?.organisation?.id){
                                                            return (val?.organisation?.name)
                                                        }
                                                    })}
                                                </b> wallet to <b>
                                                    {myOrganisationInfoState?.resp?.data?.map((val: any) => {
                                                        if(paymentOrg === val?.organisation?.id){
                                                            return (val?.organisation?.name)
                                                        }
                                                    })}
                                                </b> wallet 
                                            </p>
                                            <button className="btn btn-deep-green py-2 mt-4" 
                                                onClick={walletTransfer}
                                            >
                                                {walletTransferState.isLoading
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
                                        </div>
                                        <button className="btn link-underline " onClick={() => setFundPage("1")}>Change Payment Method</button>
                                    </div>
                                }
                                  {(fundPage === "4") &&
                                    <div>
                                        <div className="bg-light text-center my-5 py-3 px-2">
                                            <p>Please scan the QR Code below to make payment. </p>
                                            <img src={`data:image/jpeg;base64,${code}`} alt="base64image" />
                                        </div>
                                        <button className="btn link-underline " onClick={() => setFundPage("1")}>Change Payment Method</button>
                                    </div>
                                }
                                {(fundPage === "5") &&
                                    <div>
                                        <div className="bg-light     text-center my-5 py-3 px-2">
                                            <p>Please copy the USSD code below to make payment. </p>
                                            {code}

                                           
                                                <button className="btn btn-copy" onClick={() => copyFunc(code)}>
                                                    <small className="d-flex align-items-center">
                                                        <i className=" ms-3 ri-file-copy-fill ri-xl" />
                                                    </small>
                                                </button>
                                            <p className="mt-3"> click the code to copy it</p>
                                        </div>
                                        <button className="btn link-underline " onClick={() => setFundPage("1")}>Change Payment Method</button>
                                    </div>
                                }
							</div>
						</div>
                    </div>
                </div>
            }
            <div className='topup-card'>
                <div className="card"  style={{minHeight:"200px", border:'none',  boxShadow: "3px 3px 3px 3px #B853E614"}}>
                    <div className="card-body">
                        <h5>Total Wallet Balance</h5>
                        <div className="row align-items-center">
                            <div className="col-md-8 ">
                                <div className="d-flex mt-2">
                                    <h4 className=' me-1'>
                                        {organisationInfoState?.resp?.data?.organisation?.currency}
                                    </h4>
                                    <h4 className='p-0 m-0 add-ellipsis'>
                                        <NumericFormat value={organisationInfoState?.resp?.data.organisation?.wallet_balance}
                                            thousandsGroupStyle={organisationInfoState?.resp?.data?.organisation?.currency}
                                            thousandSeparator=","
                                        />
                                    </h4>
                                </div>
                                <button className='btn btn-deep-green mt-4' onClick={()=>setTopUpModal(true)}>
                                    Top Up
                                </button>
                            </div>
                            <div className="col-md-4">
                                <img src={walletIcon} alt="" className='w-100' />
                            </div>
                        </div>
                        {/* <div className="row align-items-center mt-3">
                        <div className="col-md-9 ">
                            <p className='p-0 m-0'>Enable Auto Funding</p>
                            <small style={{ font: "11px S-regular" }}>
                                You can toggle on/off your auto funding
                            </small>
                        </div>
                        <div className="col-md-3">
                            <label className="switch">
                                <input type="checkbox"
                                    checked={organisationInfoState?.resp?.data?.organisation?.auto_wallet_funding}
                                />
                                <span className="slider" />
                            </label>
                        </div>
                    </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
