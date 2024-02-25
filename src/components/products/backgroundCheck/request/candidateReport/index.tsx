import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Mainloader, { AlertTag, CompletedTag, EmptyStateComp, InProgressTag } from '../../../../utils'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import NotificationToast from '../../../../utils/notifToast';
import { backgroundCheckRequestReportOverviewRequest, backgroundCheckRequestReportSetStatusRequest } from '../../../../../redux/actions/products/backgroundCheck/request/checks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers';
import CandidateDetailedReportPage from './detailedReport';
import avatar from '../../../../../assets/avatar.png'
import { Spinner } from 'react-bootstrap';

export default function CandidateReportPage() {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [checkStatus, setCheckStatus] = useState("")
    const [stopCheckModal, setStopCheckModal] = useState(false)
    const [downloadModal, setDownloadModal] = useState(false)
    const [reportPage, setReportPage] = useState(1)

    const reportOverviewState = useSelector((state: RootState) => state.backgroundCheckRequestReportOverviewReducer);
    const checkStatusState = useSelector((state: RootState) => state.backgroundCheckRequestReportSetStatusReducer);
	const reportChecklistState = useSelector((state: RootState) => state.backgroundCheckRequestReportChecklistReducer);
	const reportDetailState = useSelector((state: RootState) => state.backgroundCheckRequestReportDetailReducer);


    const dispatch = useDispatch()
    const { ref } = useParams();

    useEffect(() => {
        getReportSummary()
    }, [])


    let getReportSummary = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {
                request_id: ref,
            },
            callback,
        };
        dispatch(backgroundCheckRequestReportOverviewRequest(data))
    }


    let changeCheckStatus = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle("Success")
                setNotif(`You have successfully ${checkStatus === "true" ? "stopped" : "continued"} this check `)
                setNotifVal(true)
                setStopCheckModal(false)
                getReportSummary()
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {
                request_id: ref,
                checkStatus: checkStatus === "true" ? "stop" : "start"
            },
            callback,
        };
        dispatch(backgroundCheckRequestReportSetStatusRequest(data))
    }

    let changePage = (page: any) => {
        setReportPage(page)
    }


    // console.log(reportOverviewState)


    return (
        <div className='candidate-report-area'>

            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

            {downloadModal &&
                <div className="main-modal ">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <div className="card-body">
                            <div className="main-modal-body icon-modal-body text-center">

                                <i className="ri-logout-circle-line modal-back-button" onClick={() => setDownloadModal(false)} />

                                <div className='mt-3'>
                                    <p>You will be able to view a full report on this check after the download.</p>
                                    <p>Do you want to download the full report of this check ?</p>

                                    <button className='btn btn-deep-green w-100 mt-3' onClick={() => setDownloadModal(false)}>No</button>
                                    <a className='btn btn-deep-green-outline w-100 mt-3' href='' download>
                                        Yes
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            }

            {stopCheckModal &&
                <div className="main-modal ">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <div className="card-body">
                            <div className="main-modal-body icon-modal-body text-center">

                                <i className="ri-logout-circle-line modal-back-button" onClick={() => setStopCheckModal(false)} />

                                <div className='mt-3'>
                                    <p>This will {checkStatus === "true" ? "stop" : "continue"}  all pending check and you will {checkStatus === "true" ? "not be charged for incomplete checks" : "now be charged for your checks"}</p>
                                    <p>Do you want to {checkStatus === "true" ? "stop" : "continue"} this check ?</p>

                                    <button className='btn btn-deep-green w-100 mt-3' onClick={() => setStopCheckModal(false)}>No</button>
                                    <button className='btn btn-deep-green-outline w-100 mt-3' onClick={changeCheckStatus}>
                                        {checkStatusState?.isLoading ? (
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
                                            'Yes'
                                        )}

                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }

            {(reportOverviewState?.isLoading || reportChecklistState?.isLoading || reportDetailState?.isLoading )&& <Mainloader />}

            {(!reportOverviewState?.isLoading || !reportChecklistState?.isLoading || !reportDetailState?.isLoading) &&
                <div className="container-fluid px-md-4 mt-4">
                    <div className="table-header">
                        <div className="row justi">
                            <div className="col-md-4">
                                <div className="pb-2">
                                    <h5>Candidate Report</h5>
                                    <p>View your candidates reports here</p>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="pb-2">

                                    {/* <button className='btn border d-flex align-items-center ms-auto'>
                                    <i className='ri-download-2-line me-3'/>
                                    Download Report
                                </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {reportPage === 1 &&
                        <>
                            <div className='row'>
                                <div className="col-md-6">
                                    <p className="d-flex align-items-center mt-4">
                                        <Link to="/BackgroundCheck/Requests" className='link'>
                                            <span style={{ cursor: 'pointer' }}>
                                                Request
                                            </span>
                                        </Link>
                                        {' '}
                                        <i className="ri-arrow-right-s-line ri-xl" />
                                        <span style={{ fontWeight: "bold" }}> Candidate Report</span>
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    {(reportOverviewState?.resp?.detail && Object.keys(reportOverviewState?.resp?.detail)?.length > 0) &&
                                        <div className="text-end mt-3">
                                            <button className='btn btn-green me-3'
                                                onClick={() => setReportPage(2)}
                                            > View full report</button>
                                            {/* <button className='btn btn-green me-3'
                                            onClick={() => setDownloadModal(true)}
                                        > Download full report</button> */}

                                            {reportOverviewState?.resp?.detail?.is_active &&
                                                <button className='btn btn-danger'
                                                    onClick={() => { setStopCheckModal(true); setCheckStatus(reportOverviewState?.resp?.detail?.is_active?.toString()) }}
                                                > Stop Check</button>
                                            }
                                            {(reportOverviewState?.resp?.detail?.is_active === false) &&
                                                <button className='btn btn-green'
                                                    onClick={() => { setStopCheckModal(true); setCheckStatus(reportOverviewState?.resp?.detail?.is_active?.toString()) }}
                                                > Continue Check</button>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>


                            {(!reportOverviewState?.isLoading && reportOverviewState?.resp?.detail && Object.keys(reportOverviewState?.resp?.detail)?.length < 1) &&
                                <div className="my-5 py">
                                    <EmptyStateComp title={"No report yet"}
                                        ctaAction={() => { }}
                                        desc={"There is no report for this candidate yet"}
                                        ctaValue={""}
                                    />
                                </div>
                            }


                            {(!reportOverviewState?.isLoading && reportOverviewState?.resp?.detail && Object.keys(reportOverviewState?.resp?.detail)?.length > 0) &&
                                <>
                                    <div className="card mt-4">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="text-center">
                                                        <img src={avatar} alt="" className='' width="150px" />
                                                        <h6 className='pt-2'>
                                                            {`${reportOverviewState?.resp?.detail?.bio?.first_name} ${reportOverviewState?.resp?.detail?.bio?.last_name}`}
                                                        </h6>
                                                        {/* <p className=''>
                                                {reportOverviewState?.resp?.detail?.bio?.phone_number}
                                            </p> */}
                                                        <small className='p-2 rounded text-white' style={{ background: "#37b7ab" }}>{reportOverviewState?.resp?.detail?.bio?.email}</small>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div style={{ width: "200px" }} className='mx-auto'>
                                                        <CircularProgressbar
                                                            maxValue={10}
                                                            strokeWidth={20}
                                                            value={6}
                                                            backgroundPadding={0}
                                                            text={`${reportOverviewState?.resp?.detail?.percentage || 0}%`}
                                                            styles={buildStyles({
                                                                rotation: 0.25,
                                                                strokeLinecap: 'butt',
                                                                textSize: '12px',
                                                                pathTransitionDuration: 0.5,
                                                                pathColor: `rgba(62, 152, 199, ${reportOverviewState?.resp?.detail?.percentage / 100})`,
                                                                textColor: '#000',
                                                                trailColor: '#58BEBF',
                                                                //   backgroundColor: '#3e98c7',
                                                            })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="table-responsive mt-5">
                                        <table className="table">
                                            <thead className="">
                                                <tr>
                                                    <th scope="col">Check</th>
                                                    <th scope="col">Details</th>
                                                    <th scope="col">Date Completed</th>
                                                    <th scope="col">Check Status</th>
                                                    <th scope="col">Observation</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportOverviewState?.resp?.detail?.checks?.map((val: any, index: number) => (
                                                    <tr>
                                                        <th scope="row">{val?.check}</th>
                                                        <td>{val?.details}</td>
                                                        <td>{val?.date_completed}</td>
                                                        <td>
                                                            {val?.status === "ALERT" && <AlertTag />}
                                                            {val?.status === "IN PROGRESS" && <InProgressTag />}
                                                            {val?.status === "COMPLETED" && <CompletedTag />}
                                                        </td>
                                                        <td>{val?.observation}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            }


                        </>
                    }

                    {(reportPage === 2) &&
                        <CandidateDetailedReportPage changePage={changePage}
                            name={`${reportOverviewState?.resp?.detail?.bio?.first_name} ${reportOverviewState?.resp?.detail?.bio?.last_name}`}
                            email={reportOverviewState?.resp?.detail?.bio?.email}
                        />
                    }
                </div>
            }

        </div>
    )
}
