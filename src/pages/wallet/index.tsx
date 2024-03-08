import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MainTable from '../../components/mainTable'
import { FailedTag, PendingTag, SuccessTag } from '../../components/utils'
import NotificationToast from '../../components/utils/notifToast'
import TopupComp from '../../components/wallet/topup'
import { organisationInfoRequest } from '../../redux/actions/settings/organisationInfo'
import { setThresholdRequest, walletHistoryRequest } from '../../redux/actions/wallet'
import { RootState } from '../../redux/reducers'

export default function WalletPage() {

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer);

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")

    const [thresholdModal, setThresholdModal] = useState(false)
    const [thresholdAmount, setThresholdAmount] = useState(organisationInfoState?.resp?.data?.organisation?.wallet_funding_threshold)
    const [fundAmount, setFundAmount] = useState(organisationInfoState?.resp?.data?.organisation?.auto_wallet_funding_amount)
    const [fundDate, setFundDate] = useState(organisationInfoState?.resp?.data?.organisation?.auto_wallet_funding_date)

    const walletHistoryState = useSelector((state: RootState) => state.walletHistoryReducer);
    const thresholdState = useSelector((state: RootState) => state.setThresholdReducer);

    
    const dispatch = useDispatch()

    useEffect(() => {
        getWalletHist()
        getOrgInfo()
    }, [])

    let getWalletHist = () => {
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
        dispatch(walletHistoryRequest(data))
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

    let setThreshold = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle("Success")
                setNotif("Threshold successfully Set")
                setNotifVal(true)
                getOrgInfo()
                setThresholdModal(false)
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {
                status:0,
                funding_amount:fundAmount,
                threshold:thresholdAmount,
                auto_funding_date:fundDate
            },
            callback,
        };
        dispatch(setThresholdRequest(data))
    }

    return (
        <div className="wallet-area px-md-4 mt-4">
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}
            
            {thresholdModal &&
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span onClick={() => setThresholdModal(false)}><i className="ri-close-line close-modal"></i></span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Set Threshold</h5>
                                </div>

                                <div>
                                    <div className="">
                                        <label htmlFor="email">Threshold Limit</label>
                                        <input type="number" className="form-control" placeholder="500"
                                            value={thresholdAmount}
                                            onChange={amt => setThresholdAmount(amt.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="email">Auto Funding Date</label>
                                        <input type="date" className="form-control" placeholder="500"
                                            value={fundDate}
                                            onChange={date => setFundDate(date.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="email">Amount to fund</label>
                                        <input type="number" className="form-control" placeholder="500"
                                            value={fundAmount}
                                            onChange={amt => setFundAmount(amt.target.value)}
                                        />
                                    </div>

                                    <button className="btn btn-deep-green py-2 mt-4" onClick={setThreshold}>
                                        {thresholdState.isLoading
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
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="row align-items-center">
                <TopupComp />

                <div className='col-md-4'>
                    <div className="card">
                        <div className="card-body">
                            <p style={{color:"#005E7A"}}>Auto Refill Threshold</p>
                            <div className="row align-items-center">
                                <div className="col-md-7 ">
                                    <div className="d-flex">
                                        <small className='rounded px-2 py-1 me-3 text-white' style={{ font: "11px S-regular", backgroundColor: "#E95470" }}>
                                            {organisationInfoState?.resp?.data?.organisation?.currency}
                                        </small>
                                        <h5 className='p-0 m-0 add-ellipsis'>
                                            {organisationInfoState?.resp?.data?.organisation?.wallet_funding_threshold}
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <button className='btn btn-black'onClick={()=>setThresholdModal(true)}>
                                        Set Threshold
                                    </button>
                                </div>
                            </div>
                            <div className="row align-items-center mt-3">
                                <div className="col-md-9 ">
                                    <p className='p-0 m-0' style={{color:"#005E7A"}}>Low Wallet Threshold</p>
                                    <small style={{ font: "11px S-regular",color:"#005E7A"}}>
                                        Get alerts when your balance is running low
                                    </small>
                                </div>
                                <div className="col-md-3">
                                    <label className="switch">
                                        <input type="checkbox"
                                        />
                                        <span className="slider" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-table-area mt-5">
                <div className="table-header">
                    <div className="row">
                        <div className="col-md-5">
                            <h5>Transactions</h5>
                            <p>View all transactions in your wallet here</p>
                        </div>
                        <div className="col-md-7">
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="">
                                <tr>
                                    <th scope="col">Transaction ID</th>
                                    <th scope="col">Transaction Description</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {walletHistoryState?.resp?.results?.map((value: any, index: React.Key | null | undefined) => (
                                    <tr key={index}>
                                        <th scope="row">{value?.id}</th>
                                        <td>{value?.description}</td>
                                        <td>{value?.product?.name}</td>
                                        <td>{value?.currency.code} {value?.amount}</td>
                                        <td>{value?.before_payment}</td>
                                        <td>{value?.after_payment}</td>
                                        
                                       
                                        <td>{moment.utc(value?.created_at).format('lll')}</td>
                                        <td>
                                            {value?.status === "SUCCESSFUL" && <SuccessTag />}
                                            {value?.status === "FAILED" && <FailedTag />}
                                            {value?.status === "PENDING" && <PendingTag />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <MainTable /> */}
            </div>
        </div>
    )
}
