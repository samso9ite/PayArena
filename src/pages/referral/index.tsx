import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { useEffect, useState } from 'react'
import Mainloader from '../../components/utils'
import NotificationToast from '../../components/utils/notifToast'
import global from '../../redux/constants/global'
import referralImg from '../../assets/referral-img.png'
import CommissionComponent from '../../components/referral/commission'
import {
    referralCommissionBalanceRequest,
    referralGraphRequest,
    referralHistoryRequest,
    referralLinkRequest,
    referralOverviewRequest,
    referralReportRequest,
} from '../../redux/actions/referral'
import {
    EmailShareButton,
    // FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share'
import { ReferralChart } from '../../components/utils/chart'
import { Spinner } from 'react-bootstrap'
import { organisationInfoRequest } from '../../redux/actions/settings/organisationInfo'

export default function ReferralPage(props: any) {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [reportModal, setReportModal] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)
    const overviewState = useSelector((state: RootState) => state.referralOverviewReducer)
    const commissionBalanceState = useSelector(
        (state: RootState) => state.referralCommissionBalanceReducer
    )
    const referralLinkState = useSelector((state: RootState) => state.referralLinkReducer)
    const referralHistoryState = useSelector((state: RootState) => state.referralHistoryReducer)
    const referralGraphState = useSelector((state: RootState) => state.referralGraphReducer)
    const referralReportState = useSelector((state: RootState) => state.referralReportReducer)

    const dispatch = useDispatch()

    const cardStyleExtension = {
        backgroundColor: '#fff',
        boxShadow: "3px 3px 3px 3px #B853E614",
        border:'none',
    };

    useEffect(() => {
        // console.log("code", organisationInfoState?.resp?.data?.organisation?.referral_code)
        // else if(organisationInfoState?.resp?.data?.organisation?.referral_code == 'undefined'){
        //     getOrgInfo()
        // }
        getOrgInfo()

        getCommissionBalance()
        getReferralOverview()
        getRefferalGraph()
        getReferralHistory()
    }, [])

    let getCommissionBalance = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }

        let data: any = {
            callback,
        }
        dispatch(referralCommissionBalanceRequest(data))
    }

    let getReferralLink = () => {
        const callback = (data: any) => {
            if (data?.status && referralLinkState?.resp && !referralLinkState?.resp?.data?.referral_url ) {
                setNotifTitle('Success')
                setNotif('Referral link generated successfully')
                setNotifVal(true)
            }
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }

        let data: any = {
            callback,
        }
        dispatch(referralLinkRequest(data))
    }

    let getReferralOverview = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }

        let data: any = {
            callback,
        }

        dispatch(referralOverviewRequest(data))
    }

    // let getAllRefrees = () => {
    //     const callback = (data: any) => {
    //         if (!data.status) {
    //             setNotifTitle("Error")
    //             setNotif(data.detail)
    //             setNotifVal(true)
    //         }
    //     };

    //     let data: any = {
    //         callback,
    //     };

    //     dispatch(referralOverviewRequest(data))
    // }

    let getRefferalGraph = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }

        let data: any = {
            callback,
        }

        dispatch(referralGraphRequest(data))
    }

    let getReferralHistory = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }

        let data: any = {
            callback,
        }

        dispatch(referralHistoryRequest(data))
    }

    let downloadreport = () => {
        const callback = (data: any) => {
            if (data.status) {
                downloadFunc(data?.data)
                setNotifTitle('Success')
                setNotif('Referral report generated successfully')
                setNotifVal(true)
                setReportModal(false)
                setStartDate('')
                setEndDate('')
            } else {
                setNotifTitle('Error')
                setNotif(data.data)
                setNotifVal(true)
            }
        }
        if (!startDate) {
            setNotifTitle('Error')
            setNotif('Start date cannot be empty')
            setNotifVal(true)
            return
        }
        if (!endDate) {
            setNotifTitle('Error')
            setNotif('End Date cannot be empty')
            setNotifVal(true)
            return
        }

        let data: any = {
            values: {
                start_date: startDate,
                end_date: endDate,
                file_type: 'excel',
            },
            callback,
        }

        dispatch(referralReportRequest(data))
    }

    let copyFunc = (val: any) => {
        navigator.clipboard.writeText(val)
        setNotifTitle('Success')
        setNotif(`Your referral link has been copied`)
        setNotifVal(true)
    }

    let downloadFunc = (val: any) => {
        const downloadLink = document.createElement('a')
        downloadLink.href = val
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    let getOrgInfo = () => {
        const callback = (data: any) => {
            if (data?.status) {
                // console.log(data?.data)
                if (data?.data?.organisation?.referral_code) {
                    getReferralLink()
                }
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }

        let data: any = {
            callback,
        }

        dispatch(organisationInfoRequest(data))
    }

    let getAllBal = (data: any) => {
        getOrgInfo()
        getCommissionBalance()
    }

    let refLink = `${global.appBaseUrl}signUp?refCode=${
        referralLinkState?.resp?.data?.referral_code
    }&refCompany=${organisationInfoState?.resp?.data?.organisation?.name?.replace(' ', '%20')}`

    // let pushShare =async () => {
    //     const shareData = {
    //         title: "MDN",
    //         text: "Learn web development on MDN!",
    //         url: "https://developer.mozilla.org",
    //     };

    //     if (navigator.share && navigator.canShare(shareData)) {
    //         navigator.share(shareData)
    //      } else {
    //         // Do something else like copying the data to the clipboard
    //      }

    //     try {
    //         await navigator.share(shareData);
    //         console.log("MDN shared successfully");
    //       } catch (err) {
    //         console.log(`Error: ${err}`);
    //       }
    // }

    return (
        <div className="dashboard-area">
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {(commissionBalanceState?.isLoading || organisationInfoState?.isLoading) && (
                <Mainloader />
            )}

            {reportModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-7 col-lg-4 mx-auto">
                        <span
                            onClick={() => {
                                setReportModal(false)
                                setStartDate('')
                                setEndDate('')
                            }}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-7 col-lg-4">
                                    <h5>Download Report</h5>
                                </div>
                                <div className="">
                                    <div>
                                        <label htmlFor="startDate">Start Date</label>
                                        <input
                                            value={startDate}
                                            type="date"
                                            className="form-control"
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="endDate">End Date</label>
                                        <input
                                            value={endDate}
                                            type="date"
                                            className="form-control"
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-deep-green px-4 mt-3"
                                        disabled={referralReportState?.isLoading}
                                        onClick={downloadreport}>
                                        {referralReportState?.isLoading ? (
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
                                            'Download Report'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!commissionBalanceState?.isLoading && !organisationInfoState?.isLoading && (
                <div className="container-fluid px-md-4 my-4">
                    <div className="pb-4">
                        <h5>Refer & Earn</h5>
                        <p>See all your referred users here and other activities</p>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div
                                className="card"
                                style={{
                                    backgroundColor: '#003E51',
                                    borderRadius: '10px',
                                    minHeight: '200px',
                                }}>
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-md-3 order-md-2">
                                            <img src={referralImg} alt="" className="w-100" />
                                        </div>
                                        <div className="col-md-9 order-md-1">
                                            <h5 className="" style={{ color: '#fff' }}>
                                                Refer Users, Earn Money.
                                            </h5>

                                            <p className="" style={{ fontSize: '16px', color: '#fff' }}>
                                                Earn on each transaction made by your referrals. 
                                                Copy and share your referral details anytime!
                                            </p>
                                            {!referralLinkState?.isLoading && (
                                                <div className="row align-items-center">
                                                    <div className="col-lg-7">
                                                        {!referralLinkState?.resp?.data
                                                            ?.referral_url ? (
                                                            <button
                                                                className="btn btn-deep-green px-3 mt-1 mb-2"
                                                                onClick={getReferralLink}>
                                                                Generate referral link
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn btn-deep-green px-3 mt-1 mb-2"
                                                                onClick={() => copyFunc(refLink)}>
                                                                Click to copy referral link
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="col-lg-5 p-lg-0">
                                                        <span className="referral-socials d-flex align-items-center justify-content-end">
                                                            <EmailShareButton
                                                                url={refLink}
                                                                separator={' '}
                                                                subject={
                                                                    'Hello, Kindly register on Prembly using my referral code '
                                                                }>
                                                                <i
                                                                    className="ri-mail-fill"
                                                                    style={{
                                                                        borderRight:
                                                                            '1px solid #fff',
                                                                    }}
                                                                />
                                                            </EmailShareButton>

                                                            <LinkedinShareButton
                                                                url={refLink}
                                                                title={
                                                                    'Hello, Kindly register on Prembly using my referral code '
                                                                }>
                                                                <i
                                                                    className="ri-linkedin-box-fill"
                                                                    style={{
                                                                        borderRight:
                                                                            '1px solid #fff',
                                                                    }}
                                                                />
                                                            </LinkedinShareButton>

                                                            <WhatsappShareButton
                                                                url={refLink}
                                                                separator={' '}
                                                                title={
                                                                    'Hello, Kindly register on Prembly using my referral code '
                                                                }>
                                                                <i
                                                                    className="ri-whatsapp-fill"
                                                                    style={{
                                                                        borderRight:
                                                                            '1px solid #fff',
                                                                    }}
                                                                />
                                                            </WhatsappShareButton>

                                                            <TwitterShareButton
                                                                url={refLink}
                                                                // title={
                                                                //     " Hello, Register on Prembly using my referral code" +
                                                                //     " " + referralLinkState?.resp?.data?.referral_url
                                                                // }
                                                                title={
                                                                    'Hello, Kindly register on Prembly using my referral code '
                                                                }>
                                                                <i className="ri-twitter-fill" />
                                                            </TwitterShareButton>

                                                            {/* <FacebookShareButton
                                                            url={refLink}
                                                            // quote={
                                                            //     " Hello, Register on identitypass using my referral code" +
                                                            //     " " + referralLinkState?.resp?.data?.referral_url
                                                            // }
                                                            quote={
                                                                "Hello, Kindly register on Prembly using my referral code " 
                                                            }
                                                        >
                                                            <i className="ri-facebook-fill" />
                                                        </FacebookShareButton> */}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0" >
                            <CommissionComponent
                                currency={organisationInfoState?.resp?.data?.organisation?.currency}
                                balance={commissionBalanceState?.resp?.data?.balance}
                                getAllBalance={getAllBal}
                            />
                        </div>
                    </div>
                    <div className="dash-analytics-area px-3 py-4 mt-4">
                        <h6>Your Referral Stats</h6>

                        <div className="row text-center">
                            <div className="col-lg-3">
                                <div className="card mt-3" style={cardStyleExtension}>
                                    <div className="card-body">
                                        <p> Total Referred Users </p>
                                        <h5 className="pt-2">
                                            {overviewState?.resp?.data?.total_referred}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card mt-3" style={cardStyleExtension}>
                                    <div className="card-body">
                                        <p>Total Active users</p>
                                        <h5 className="pt-2">
                                            {overviewState?.resp?.data?.total_active_user}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card mt-3" style={cardStyleExtension}>
                                    <div className="card-body">
                                        <p> Total Inactive users </p>
                                        <h5 className="pt-2">
                                            {overviewState?.resp?.data?.total_inactive_user}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card mt-3" style={cardStyleExtension}>
                                    <div className="card-body">
                                        <p> Lifetime Commission earned </p>
                                        <h5 className="pt-2">
                                            {overviewState?.resp?.data?.life_time_commission_earned}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" card my-4 px-md-3 py-4" style={{ backgroundColor: '#ECEDEF' }}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-4 pb-4">
                                    <h5>Daily Referral Overview</h5>
                                </div>
                                <div className="col-md-8 "></div>
                            </div>
                            <div style={{ backgroundColor: '#FFFFFF' }} className="p-4">
                                <ReferralChart chartData={referralGraphState?.resp?.data?.graph} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="main-table-area mt-5">
                            <div className="table-header">
                                <div className="row">
                                    <div className="col-md-5">
                                        <h5>Referral History</h5>
                                        <p>View daily referral transaction history</p>
                                    </div>
                                    <div className="col-md-7 text-md-end">
                                        <button
                                            className="btn btn-deep-green"
                                            onClick={() => setReportModal(true)}>
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table-responsive mt-3">
                            <table className="table">
                                <thead className="">
                                    <tr>
                                        <th scope="col">S/N</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Referee</th>
                                        <th scope="col">Charged Amount</th>
                                        <th scope="col">Commission Earned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {referralHistoryState?.resp?.data?.map(
                                        (val: any, i: number) => (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td> {val?.date} </td>
                                                <td> {val?.referee}</td>
                                                <td>
                                                    {' '}
                                                    {`${val?.charge_currency} ${val?.charge_amount}`}
                                                </td>
                                                <td>
                                                    {' '}
                                                    {`${val?.commission_currency} ${val?.commission_amount}`}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
