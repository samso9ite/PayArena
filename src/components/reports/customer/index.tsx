import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reportIconFour, reportIconOne, reportIconThree, reportIconTwo } from '../../../assets/svgs'
import { CustomerReportOverviewChart, ReportOverviewChart, ReportPieChart } from '../../utils/chart'
import { trophyIcon } from '../../../assets/svgs'
import { RootState } from '../../../redux/reducers'
import { customerReportActivitiesRequest } from '../../../redux/actions/reports'
import NotificationToast from '../../utils/notifToast'
import Mainloader from '../../utils'

export default function CustomerReports(props: any) {
    const teamMember: any[] = [
        // {
        //     name:"Shade Goyin",
        //     avatar:"",
        // },
        // {
        //     name:"Shade Goyin",
        //     avatar:"",
        // },
        // {
        //     name:"Shade Goyin",
        //     avatar:"",
        // },
        // {
        //     name:"Shade Goyin",
        //     avatar:"",
        // },
        // {
        //     name:"Shade Goyin",
        //     avatar:"",
        // },
    ]
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [customerReport, setCustomerReport] = useState<any>([])
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const customerReportState = useSelector((state: RootState) => state.customerReportReducer)

    // useEffect(() => {
    //     let data: any = {
    //         values: {},
    //         callback: (data: any) => {
    //             if (data.status) {
    //                 console.log(data.detail)
    //                 setCustomerReport(data.detail)
    //             } else {
    //                 setNotifVal(true)
    //                 setNotif(data.detail)
    //                 setNotifTitle('Error')
    //             }
    //         },
    //     }
    //     dispatch(customerReportActivitiesRequest(data))
    // }, [])

    // const { isLoading } = customerReportState

    // useEffect(() => {
    //     console.log(customerReportState)
    //     const { resp, isLoading } = customerReportState
    //     setLoading(isLoading)
    //     if (resp !== null) {
    //         setCustomerReport(resp.detail)
    //         console.log(customerReport)
    //     }
    // }, [customerReportState])

    useEffect(() => {
        getCustomerReport()
    }, [])

    let getCustomerReport = () => {
        const callback = (data: any) => {
            if (data.status) {
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            callback,
        };
        dispatch(customerReportActivitiesRequest(data))
    }
    return (
        <>
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {/* {!isLoading ? ( */}
                <div>
                    <div className="report-card-area mt-3 mb-5">
                        <div className="row">
                            <div className="col-md-3 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p>TOTAL CUSTOMERS </p>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <div className="row align-items-center">
                                                    <div className="col-2">
                                                        <i>{reportIconOne}</i>
                                                    </div>
                                                    <div className="col-10 ms-">
                                                        <h5 className="p-0 m-0">
                                                            NA
                                                            {/* {customerReport
                                                                ? customerReport.total_fake
                                                                : 0} */}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <small>Unavailable</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p>TOTAL VERIFIED CUSTOMERS</p>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <div className="row align-items-center">
                                                    <div className="col-2">
                                                        <i>{reportIconTwo}</i>
                                                    </div>
                                                    <div className="col-10 ms-">
                                                        <h5 className="p-0 m-0">
                                                            {customerReportState?.resp?.detail?.total_verified}
                                                            {/* {customerReport
                                                                ? customerReport.total_verified
                                                                : 0} */}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <small>Up by {customerReportState?.resp?.detail?.verified_percent}%</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p>TOTAL SUCCESSFUL VERIFICATION </p>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <div className="row align-items-center">
                                                    <div className="col-2">
                                                        <i>{reportIconThree}</i>
                                                    </div>
                                                    <div className="col-10 ms-">
                                                        <h5 className="p-0 m-0">
                                                            {customerReportState?.resp?.detail?.total_successful}
                                                            {/* {customerReport
                                                                ? customerReport.total_successful
                                                                : 0} */}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <small>Up by {customerReportState?.resp?.detail?.success_percent}%</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p>TOTAL FAILED VERIFICATIONS </p>
                                        <div className="row">
                                            <div className="col-md-7">
                                                <div className="row align-items-center">
                                                    <div className="col-2">
                                                        <i>{reportIconFour}</i>
                                                    </div>
                                                    <div className="col-10 ms-">
                                                        <h5 className="p-0 m-0">
                                                            {customerReportState?.resp?.detail?.total_fake}
                                                            {/* {customerReport
                                                                ? customerReport.total_fake
                                                                : 0} */}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <small>Up by {customerReportState?.resp?.detail?.fake_percent_call}%</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="report-overview-area">
                        <div className="card">
                            <div className="card-body">
                                <CustomerReportOverviewChart data={customerReportState?.resp?.detail?.graph} tag={props?.tag} />
                            </div>
                        </div>
                    </div>

                    {/* <div className="row">
                <div className="col-md-8">
                    <div className="report-overview-area">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h5>User Demographics</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <h5>Gender</h5>
                                                <ReportPieChart/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card mt-4">
                                            <div className="card-body">
                                                <h5>Age</h5>
                                                <ReportPieChart/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="report-overview-area">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h5>Most Active Team Member</h5>
                                {teamMember.map((member, i)=>(
                                    <div className="report-active-member-area mt-3" key={i}>
                                        <div className='d-flex align-items-center'>
                                            <div className="active-member-avatar">
                                                <img src={member?.avatar} alt="" className='w-100' />
                                            </div>
                                            <h6 className='m-0 p-0'>{member?.name}</h6>
                                        </div>
                                        <div className="medal-area">
                                            {i === 0 ? trophyIcon : <p className='p-0 m-0'>{i+1}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
                </div>
            {/* ) : (
                <div className="p-4">
                    <Mainloader />
                </div>
            )} */}
        </>
    )
}
