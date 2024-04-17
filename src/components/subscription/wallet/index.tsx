import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { mpesaTopUpWalletRequest,
    topUpWalletRequest, virtualAccountInfoRequest, walletBalanceRequest, walletHistoryRequest, walletToWalletTransferRequest } from "../../../redux/actions/wallet";
import global from "../../../redux/constants/global";
import { RootState } from "../../../redux/reducers";
import Mainloader, { EmptyStateComp, FailedTag, PendingTag, removeLetters, SuccessTag } from "../../utils";
import NotificationToast from "../../utils/notifToast";
import { NumericFormat } from 'react-number-format';
import { organisationInfoRequest } from "../../../redux/actions/settings/organisationInfo";
import Cookies from "js-cookie";
import moment from "moment";
import success from '../../../assets/success.svg'
import axios from "axios";
import { authorizationRedirect } from "../../../redux/constants/api";
import ExportToExcel from "../../../utils/exportToExcel";

export default function SubWalletComp(props:any) {

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

    const walletHistoryState = useSelector((state: RootState) => state.walletHistoryReducer);
    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer);
    // const virtualAccountInfoState = useSelector((state: RootState) => state.virtualAccountInfoReducer);
    const topUpWalletState = useSelector((state: RootState) => state.topUpWalletReducer);
    // const paystackTopUpWalletState = useSelector((state: RootState) => state.paystackTopUpWalletReducer);
    // const flutterwaveTopUpWalletState = useSelector((state: RootState) => state.flutterwaveTopUpWalletReducer);
    const mpesaTopUpWalletState = useSelector((state: RootState) => state.mpesaTopUpWalletReducer);
    const myOrganisationInfoState = useSelector((state: RootState) => state.myOrganisationInfoReducer);
    const walletTransferState = useSelector((state: RootState) => state.walletToWalletTransferReducer);
    const walletBalanceState = useSelector((state: RootState) => state.walletBalanceReducer);
    const [searchData, setSearchData] = useState('')
    const [resultData, setResultData] = useState<any>()
    const [excelData, setExcelData] = useState<any>()


    const dispatch = useDispatch()
    const location = useLocation()

    let orgId = Cookies.get("org") || ""
    let hostName = Cookies.get('hostName') || ''

    const queryParams = new URLSearchParams(location.search)
    let successPayment = queryParams.get("success")
    let failedPayment = queryParams.get("failed")

    useEffect(() => {
        getWalletHist()
        getOrgInfo()
        walletBalance()

        if(successPayment === "true"){
            setNotifTitle("Success")
            setNotif("You have successfully funded your wallet")
            setNotifVal(true)
            window.location.href = global.appBaseUrl 
        }
        if(failedPayment === "true"){
            setNotifTitle("Error")
            window.location.href = global.appBaseUrl 
            setNotifVal(true)
            queryParams.delete("failed") 
        }
    }, [])

    let walletBalance = () => {
        
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            currency_code:  organisationInfoState?.resp?.data?.organisation.currency,
            callback,
        }
        dispatch(walletBalanceRequest(data))
    }
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

    let xlsData = (data:any) => {
        let arr:any[] = []
        data.forEach((item:any) => {
            let itemArr = {
                reference: item.reference,
                name: item.user.full_name,
                description: item.description,
                amount: item.currency.code + item.amount,
                balance_before: item.balance_before,
                balance_after: item.balance_after,
                date: item.created_on,
                status: item.status
            }
            arr.push(itemArr)
        })
        return arr
    }
    
    let getWalletHist = () => {
        const callback = (data: any) => {
            setResultData(data)
            setExcelData(xlsData(data.results))
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
        dispatch(walletHistoryRequest(data))
    }

    const fetchDataBySearch = (e:any) => {
        e.preventDefault()
        let accessT = Cookies.get('babtbu') || ''
        let orgId = Cookies.get('org') || ''

        let requestOptions = {
            method: 'get',
            url: global.apiBaseUrl + global.idpassApiUrl + `wallet/fund-wallet?query=${searchData}`,

            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
        axios
            .request(requestOptions)
            .then((res) => {
                setResultData(res.data)
                setExcelData(xlsData(res.data.results))
            })
            .catch((e: any) => {
                if (e.response.request.status === 401) {
                        authorizationRedirect()
                    } else {
                        console.log(e);
                }
            })
    }


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
        if((hostName == "Prembly" && (paymentCurrency === "USD") && (organisationInfoState?.resp?.data?.organisation?.currency === "USD") && (amount < 200))){
            setNotifTitle("Error")
            setNotif("Amount cannot be less than USD200")
            setNotifVal(true)
            return
        }
        else if((hostName !== "Prembly" && (paymentCurrency === "USD") && (organisationInfoState?.resp?.data?.organisation?.currency === "USD") && (amount < 150))){
            setNotifTitle("Error")
            setNotif("Amount cannot be less than USD150")
            setNotifVal(true)
            return
        }
        else if (!paymentMethod){
            setNotifTitle("Error")
            setNotif("Please select payment method")
            setNotifVal(true)
            return
        }
        else if (paymentMethod === "card" && !paymentPlatform){
            setNotifTitle("Error")
            setNotif("Please select payment platform")
            setNotifVal(true)
            return
        }
        else if ((paymentMethod === "card" || paymentMethod === "mpesa") && !paymentPlatform){
            setNotifTitle("Error")
            setNotif("Please select payment platform")
            setNotifVal(true)
            return
        }

        else if (paymentMethod === "wallet" && !paymentOrg ){
            setNotifTitle("Error")
            setNotif("Select business you want to transfer to")
            setNotifVal(true)
            return
        } else if((paymentMethod === "mpesa" && (paymentPlatform === "stk-push" || paymentPlatform === "ussd")) && !otherWalletInput){
            setNotifTitle("Error")
            if(paymentPlatform == "stk-push"){
                setNotif("Please enter your phone number")
            }else{
                setNotif("Please fill in your M-PESA billing number")
            }
            setNotifVal(true)
            return
        }
     
    
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
                    setFundPage('4')
                }else if(paymentPlatform == 'ussd'){
                    setCode(data?.link)
                    setFundPage('5')
                }else if(paymentPlatform == "stk-push"){
                    setFundPage('6')
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
                getWalletHist()
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
                email: organisationInfoState?.resp?.data?.organisation.official_email,
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


    return (
        <div className="sub-wallet-area">
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}
            
            {(walletHistoryState?.isLoading || organisationInfoState?.isLoading) && <Mainloader/>}
            
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
                                                        {hostName == "Peleza" &&
                                                            <option value="KES">KES</option>
                                                        }
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
                                                {(paymentCurrency == "KES") && (!paymentOrg || orgId === paymentOrg) &&
                                                    <option value="mpesa">MPESA</option>
                                                }
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
                                                    {(paymentMethod == 'card') ?
                                                        <>
                                                            <option value="stripe">Fund with Stripe</option>
                                                            <option value="paystack">Fund with Paystack</option>
                                                            <option value="flutterwave">Fund with Flutterwave</option>
                                                        </> 
                                                        :
                                                        <>
                                                            {/* <option value="qr-code">QR Code</option> */}
                                                            {/* <option value="ussd">USSD</option> */}
                                                            <option value="stk-push">STK Push</option>
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
                                {(fundPage === "6") &&
                                    <div>
                                        <div className="bg-light     text-center my-5 py-3 px-2">
                                            <img src={success} alt="success" />
                                            <p>Payment initiated, please proceed to make payment. </p>
                                        </div>
                                        <button className="btn link-underline " onClick={() => setFundPage("1")}>Change Payment Method</button>
                                    </div>
                                }
							</div>
						</div>
					</div>
				</div>
			}

            {(!walletHistoryState?.isLoading && !organisationInfoState?.isLoading)  && 
                <>
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="card available-wallet-card mt-3">
                                <div className="card-body">
                                    <p>AVAILABLE WALLET BALANCE</p>
                                    <div className="row mt-3 mb-4">
                                        <div className="col-md-8">
                                            <div className="d-flex ">
                                                <span className="me-2 p-1 rounded" style={{fontSize:"12px",backgroundColor:"#E95470"}}>
                                                    {walletBalanceState?.resp?.results[0]?.currency.code}
                                                </span>
                                                <h5 className="p-0 m-0 add-ellipsis">
                                                    <NumericFormat value={walletBalanceState?.resp?.results[0]?.balance} 
                                                        thousandsGroupStyle={walletBalanceState?.resp?.results[0]?.currency.code} 
                                                        thousandSeparator="," 
                                                    />
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-none d-md-block">
                                            <button className="btn btn-red" onClick={()=>setTopUpModal(true)}>
                                                Top Up
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-7 col-md-8">
                                            <p className="mb-0">Account Number</p>
                                            <h6>{organisationInfoState?.resp?.data?.account?.account_number || "Not Available"}</h6>
                                        </div>
                                        <div className="col-5 d-md-none text-end">
                                            <button className="btn btn-red mt-2" onClick={()=>setTopUpModal(true)}>
                                                Top Up
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {organisationInfoState?.resp?.data?.organisation?.currency === "NGN" &&
                            <div className="col-md-6 col-lg-4">
                                <div className="card virtual-account-card mt-3">
                                    <div className="card-body">
                                        <p>VIRTUAL NAIRA ACCOUNT</p>
                                        <div className="row my-3 justify-content-between">
                                            <div className="col-md-6">
                                                <p className="mb-0">Account Name</p>
                                                <h6 className="add-ellipsis">{organisationInfoState?.resp?.data?.account?.account_name || "Not Available"}</h6>
                                            </div>
                                            <div className="col-md-5 d-none d-md-block">
                                                <p className="mb-0">Bank Name</p>
                                                <h6 className="add-ellipsis">{organisationInfoState?.resp?.data?.account?.bank_name || "Not Available"}</h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6 col-md-8">
                                                <p className="mb-0">Account Number</p>
                                                <h6>{organisationInfoState?.resp?.data?.account?.account_number || "Not Available"}</h6>
                                            </div>
                                            <div className="col-6 d-md-none">
                                                <p className="mb-0">Bank Name</p>
                                                <h6 className="add-ellipsis">{organisationInfoState?.resp?.data?.account?.bank_name || "Not Available"}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
        
        
                    <div className="main-table-area mt-5">
                        <div className="table-header">
                            <div className="row">
                                <div className="col-md-5">
                                    <h5>Transactions</h5>
                                    <p>View all transactions in your wallet here</p>
                                </div>
                                <div className="col-md-7">
                                <div className="row justify-content-md-end align-items-center">
                                                    <div className="col-12 col-md-6 ">
                                                        <form
                                                            action=""
                                                            onSubmit={fetchDataBySearch}
                                                            >
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Search by  reference, name, email, amount, press enter to search"
                                                                onChange={(e) =>
                                                                    setSearchData(e.target.value)
                                                                }
                                                            />
                                                        </form>
                                                    </div>
                                                   
                                                    <div className="col-6 col-md-3 col-lg-2 pt-3 pt-md-0">
                                                       <ExportToExcel fileName="Transactions" excelData={excelData} />
                                                    </div>
                                                </div>
                                </div>
                            </div>
                        </div>

                      
        
                        <div className="mt-4">
                            {resultData?.results?.length > 0 ? 
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="">
                                            <tr>
                                                <th scope="col">Ref</th>
                                                <th scope="col"> Description</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Balance Before</th>
                                                <th scope="col">Balance After</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resultData?.results?.map((value: any, index: React.Key | null | undefined) => (
                                                <tr key={index}>
                                                    <th scope="row" className="restrict-width">{value?.reference}</th>
                                                    <td className="restrict-width">{value?.description}</td>
                                                    <td>{value?.user.full_name}</td>
                                                    <td>{value?.currency.code} {value?.amount}</td>
                                                    <td>{value?.balance_before}</td>
                                                    <td>{value?.balance_after} </td>
                                                    <td>{moment.utc(value?.created_at).format('lll')}</td>
                                                    <td>
                                                        {value?.status === "success" && <SuccessTag />}
                                                        {value?.status === "failed" && <FailedTag />}
                                                        {value?.status === "pending" && <PendingTag />}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div className="my-5 py-5">
                                    <EmptyStateComp title={"You are yet to make any transaction"}
                                        ctaAction={()=>setTopUpModal(true)}
                                        desc={"Click the button below to top up your wallet"}
                                        ctaValue={"Top Up Wallet"}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
