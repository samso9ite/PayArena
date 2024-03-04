import { SyntheticEvent } from 'react'

import {
    EmptyStateComp,
    FailedTag,
    InvalidAccessRightComp,
    PendingTag,
    SuccessTag,
    TableLoader,
} from '../../utils'
import { reportIconFour, reportIconOne, reportIconThree, reportIconTwo } from '../../../assets/svgs'
import { ReportEndpointsChart, ReportOverviewChart } from '../../utils/chart'
import { useEffect, useState } from 'react'
import { RootState } from '../../../redux/reducers'
import { useDispatch, useSelector } from 'react-redux'
import {
    apiFilterReportRequest,
    apiGenerateReportLogsRequest,
    apiReportActivitiesRequest,
    apiReportFailure,
    apiReportRequest,
    apiSearchReportRequest,
} from '../../../redux/actions/reports'
import { ReportResponseComponent } from './reportResponse'
import { Code } from 'react-content-loader'
import { RadarReportResponseComponent } from './radarReportResponse'
import { Spinner } from 'react-bootstrap'
import { identitypassEndpointsRequest } from '../../../redux/actions/products/identitypass/verification'
import Cookies from 'js-cookie'
import { authorizationRedirect, serverCodes } from '../../../redux/constants/api'
import axios from 'axios'
import moment from 'moment'

export default function VerificationReports(props: any) {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    // const [downloadFiles, setDownloadFiles] = useState(false)
    // const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchData, setSearchData] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [statusCode, setStatusCode] = useState('VERIFIED')
    // const [userLogs, setUserLogs] = useState('')
    const [reportData, setReportData] = useState({
        next_page: '',
        previous_page: '',
        results: [],
    })
    const [pageNumber, setPageNumber] = useState('1')
    const [reportModal, setReportModal] = useState(false)
    // const [newReport, setNewReport] = useState('products')
    // const [filterType, setFilterType] = useState('excel')
    // const [filterByStatus, setFilterByStatus] = useState('all')
    // const [filterByProduct, setFilterByProduct] = useState('all')
    // const [filterByEndpoints, setFilterByEndpoints] = useState('all')
    const [verifModal, setVerifModal] = useState(false)
    const [verifResult, setVerifResult] = useState({})
    const [requestData, setRequestData] = useState({})
    const [productName, setProductName] = useState('')
    const [endpName, setEndpName] = useState('')
    const [filterModalReport, setFilterModalReport] = useState(false)
    const [reportForm, setReportForm] = useState({
        start_date: '',
        end_date: '',
        filter_type: 'excel',
        response_code: ['00', '01', '02', '03'],
        endpoint: '',
    })

    const [modalMessage, setModalMessage] = useState(false)
    const [modalErrMessage, setModalErrMessage] = useState('')
    
    const activityReportState = useSelector((state: RootState) => state.apiReportActivitiesReducer)
    const apiReportState = useSelector((state: RootState) => state.apiReportReducer)
    const apiGenerateReportLogsState = useSelector(
        (state: RootState) => state.apiGenerateReportLogsReducer
    )
    // const apiEndpointReport = useSelector((state: RootState) => state.identitypassEndpointsReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        getActivities()
        // getReport()
    }, [])

    useEffect(() => {
        if (!searchData) {
            const getData = setTimeout(() => {
                getReport()
            }, 2000)

            return () => clearTimeout(getData)
        }
    }, [searchData])

    let getActivities = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
                setStartDate('')
                setEndDate('')
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        if (!startDate) {
            setNotifTitle('Error')
        }
        let data: any = {
            values: {
                product: props.productKey,
            },
            callback,
        }
        dispatch(apiReportActivitiesRequest(data))
    }

    let getReport = () => {
        const callback = (data: any) => {
            setReportData(data)
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                product: props.productKey,
            },
            callback,
        }
        dispatch(apiReportRequest(data))
    }

    let viewResponse = async (req: any, val: string, prod: string, endpName: string) => {
        // fetch(val).then(response => response?.text())
        fetch(val)
            .then((response) => response?.json())
            .then((data) => {
                setRequestData(req)
                setProductName(prod)
                setVerifResult(data)
                setEndpName(endpName)
                setVerifModal(true)
            })
    }

    const handleReportFormSubmit = (e: any) => {
        e.preventDefault()
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Report Successfully Generated')
                setNotifVal(true)
                setReportModal(false)
                setStartDate('')
                setEndDate('')
                downloadFunc(data.data)
            } else {
                // setNotifTitle('Error')
                // setNotif(data.data)
                // setNotifVal(true)
                setModalMessage(true)
                setModalErrMessage(data.message)
                
                setNotifTitle('Error')
                if(props.productKey == "3f20cd19-e739-419c-bec7-dd2c5c8a441b"){
                    setNotif(data.message)
                }else{
                    setNotif(data.data)
                }
               
                setNotifVal(true)
            }
        }
        if (!reportForm.start_date) {
            setNotifTitle('Error')
            setNotif('Start date cannot be empty')
            setNotifVal(true)
            return
        }
        if (!reportForm.end_date) {
            setNotifTitle('Error')
            setNotif('End Date cannot be empty')
            setNotifVal(true)
            return
        }

        // if (!reportForm.name) {
        //     setNotifTitle('Error')
        //     setNotif('Your referral Report will be sent to your mail')
        //     setNotifVal(true)
        //     return
        // }

        if(props.productKey == "3f20cd19-e739-419c-bec7-dd2c5c8a441b") {
            if (reportForm.response_code.some(code => ['00', '01', '02', '03'].includes(code))) {
            let code = '00'
            let data: any = {
                values: {
                    start_date: reportForm.start_date,
                    end_date: reportForm.end_date,
                    filter_type: reportForm.filter_type,
                    response_code: code,
                    product: props.productKey,
                },
                callback,
            }
            dispatch(apiGenerateReportLogsRequest(data))
            }else{
                let data: any = {
                    values: {
                        start_date: reportForm.start_date,
                        end_date: reportForm.end_date,
                        filter_type: reportForm.filter_type,
                        response_code: reportForm.response_code,
                        product: props.productKey,
                    },
                    callback,
                }
                dispatch(apiGenerateReportLogsRequest(data))
            }
       
       }else{
        let data: any = {
            values: {
                start_date: reportForm.start_date,
                end_date: reportForm.end_date,
                filter_type: reportForm.filter_type,
                response_code: reportForm.response_code,
                product: props.productKey,
            },
            callback,
        }
        dispatch(apiGenerateReportLogsRequest(data)) 
       }
    }

    const handleFilterModalReort = () => {
        setFilterModalReport(true)
    }

    const handleReportModalClose = () => {
        setReportModal(false)
        setFilterModalReport(false)
    }

    let downloadFunc = (val: any) => {
        const downloadLink = document.createElement('a')
        downloadLink.href = val
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    const openReportModal = (filter_type: string) => {
        setReportModal(true)
        setReportForm((prev) => ({ ...prev, filter_type }))
    }

    const handleReportFormChange = (e: any) => {
        const value = e.target.value
        const name = e.target.name
        setReportForm((prev) => ({ ...prev, [name]: value }))
    }

    const triggerPage = (val: any) => {
        let accessT = Cookies.get('babtbu') || ''
        let orgId = Cookies.get('org') || ''

        let requestOptions = {
            method: 'get',
            url: val?.replace(
                'https://ifgn6xvqlj.execute-api.us-east-2.amazonaws.com/production/prembly-production',
                'https://api.prembly.com/prembly'
            ),

            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }

        axios
            .request(requestOptions)
            .then((response) => {
                let page = val?.slice(-6).match(/(\d+)/)

                if (val?.includes('page=')) {
                    if (page) {
                        setPageNumber(page[0])
                    }
                } else {
                    setPageNumber('1')
                }
                setReportData(response?.data)
            })
            .catch((e: any) => {
                if (
                    serverCodes.includes(e?.response?.request?.status) ||
                    !e?.response?.request?.status
                ) {
                    apiReportFailure({
                        error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                    })
                    return
                }
                if (e.response.request.status === 401) {
                    authorizationRedirect()
                } else {
                    apiReportFailure({
                        error: e.response.data.detail,
                    })
                }
            })
    }

    let fetchDataBySearch = (e: any) => {
        e.preventDefault()

        const callback = (data: any) => {
            if (data.status) {
                setReportData(data)
            }
        }
        let data: any = {
            values: {
                param: searchData,
                product: props.productKey,
            },
            callback,
        }
        dispatch(apiSearchReportRequest(data))
    }

    let fetchDataByFilter = () => {
        const callback = (data: any) => {
            if (data.status) {
                setReportData(data)
                setFilterModalReport(false)
            }
        }
        let data: any = {
            values: {
                start_date: startDate,
                end_date: endDate,
                status: statusCode,
                product: props.productKey,
            },
            callback,
        }
        dispatch(apiFilterReportRequest(data))
    }

    let getEndPName = (val: any) => {
        let jsonObject = JSON.parse(val)
        return jsonObject?.name
    }


    return (
        <div>
            {verifModal && (
                <div className="main-modal">
                    <div
                        className={`main-modal-content card ${
                            productName === 'c089b67b-53cf-4f30-b96e-3f3d3c2ca403'
                                ? 'col-md-11 col-lg-9'
                                : 'col-md-5 col-lg-4'
                        } mx-auto endpoint-response`}>
                        <span onClick={() => setVerifModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-4">
                                    <h5>Verification Result</h5>
                                </div>

                                {productName === 'c089b67b-53cf-4f30-b96e-3f3d3c2ca403' && (
                                    <RadarReportResponseComponent
                                        data={verifResult}
                                        dataName={endpName}
                                    />
                                )}
                                {productName === '3f20cd19-e739-419c-bec7-dd2c5c8a441b' && (
                                    <ReportResponseComponent
                                        data={verifResult}
                                        reqData={requestData}
                                        endpName={endpName}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {reportModal && (
                <ReportModal
                    handleClose={handleReportModalClose}
                    onChange={handleReportFormChange}
                    reportForm={reportForm}
                    handleSubmit={handleReportFormSubmit}
                    apiReportState={apiReportState}
                    apiGenerateReportLogsState={apiGenerateReportLogsState}
                    product={props.productKey}
                    modalMessage = {modalMessage}
                    modalErrMsg= {modalErrMessage}
                />
            )}

            {props?.userRights?.includes('VIEW_REPORT') ? (
                <>
                    <div className="report-card-area mt-3 mb-5">
                        <div className="row">
                            <div className="col-md-6 col-lg-3 mt-3">
                                <div className="card">
                                    {activityReportState?.isLoading && (
                                        <div className="p-3">
                                            <Code />
                                        </div>
                                    )}

                                    {!activityReportState?.isLoading && (
                                        <div className="card-body">
                                            <p>TOTAL API CALLS </p>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="row align-items-center">
                                                        <div className="col-2">
                                                            <i>{reportIconOne}</i>
                                                        </div>
                                                        <div className="col-10">
                                                            <h5 className="p-0 m-0">
                                                                {
                                                                    activityReportState?.resp?.data
                                                                        ?.api_calls?.total_api_calls
                                                                }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <small>
                                                        Up by{' '}
                                                        {
                                                            activityReportState?.resp?.data
                                                                ?.api_calls?.fake_percent_call
                                                        }
                                                        %
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 mt-3">
                                <div className="card">
                                    {activityReportState?.isLoading && (
                                        <div className="p-3">
                                            <Code />
                                        </div>
                                    )}

                                    {!activityReportState?.isLoading && (
                                        <div className="card-body">
                                            <p>TOTAL VERIFIED DOCUMENTS</p>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="row align-items-center">
                                                        <div className="col-2">
                                                            <i>{reportIconTwo}</i>
                                                        </div>
                                                        <div className="col-10">
                                                            <h5 className="p-0 m-0">
                                                                {
                                                                    activityReportState?.resp?.data
                                                                        ?.api_calls?.total_verified
                                                                }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <small>
                                                        Up by{' '}
                                                        {
                                                            activityReportState?.resp?.data
                                                                ?.api_calls?.fake_percent_call
                                                        }
                                                        %
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 mt-3">
                                <div className="card">
                                    {activityReportState?.isLoading && (
                                        <div className="p-3">
                                            <Code />
                                        </div>
                                    )}

                                    {!activityReportState?.isLoading && (
                                        <div className="card-body">
                                            <p>TOTAL SUCCESSFUL VERIFICATION </p>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="row align-items-center">
                                                        <div className="col-2">
                                                            <i>{reportIconThree}</i>
                                                        </div>
                                                        <div className="col-10">
                                                            <h5 className="p-0 m-0">
                                                                {
                                                                    activityReportState?.resp?.data
                                                                        ?.api_calls
                                                                        ?.total_successful
                                                                }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <small>
                                                        Up by{' '}
                                                        {
                                                            activityReportState?.resp?.data
                                                                ?.api_calls?.success_percent_call
                                                        }
                                                        %
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 mt-3">
                                <div className="card">
                                    {activityReportState?.isLoading && (
                                        <div className="p-3">
                                            <Code />
                                        </div>
                                    )}

                                    {!activityReportState?.isLoading && (
                                        <div className="card-body">
                                            <p>TOTAL FAILED VERIFICATIONS </p>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="row align-items-center">
                                                        <div className="col-2">
                                                            <i>{reportIconFour}</i>
                                                        </div>
                                                        <div className="col-10">
                                                            <h5 className="p-0 m-0">
                                                                {
                                                                    activityReportState?.resp?.data
                                                                        ?.api_calls?.total_fake
                                                                }
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <small>
                                                        Up by{' '}
                                                        {
                                                            activityReportState?.resp?.data
                                                                ?.api_calls?.fake_percent_call
                                                        }
                                                        %
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="report-overview-area">
                        <div className="card">
                            <div className="card-body">
                                <ReportOverviewChart
                                    data={activityReportState?.resp?.data?.api_calls?.graph}
                                    tag={props?.tag}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="report-overview-area mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <ReportEndpointsChart title={"Most Used Endpoints"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="report-overview-area mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <ReportEndpointsChart title={"Most Used Document"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="report-overview-area mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <ReportEndpointsChart title={"Most Used SDKs"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="report-overview-area mt-5">
                        <div className="card">
                            {apiReportState?.isLoading && <TableLoader />}

                            {!apiReportState?.isLoading && (
                                <div className="card-body">
                                    <div className="greetings-area mt-3">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-md-3">
                                                <h5>API Logs</h5>
                                            </div>
                                            <div className="col-md-8 ">
                                                <div className="row justify-content-md-end align-items-center">
                                                    {/* <div className="title-report-item">
                                                    <p>Showing data for</p>
                                                    </div> */}
                                                    <div className="col-12 col-md-6 ">
                                                        <form
                                                            action=""
                                                            onSubmit={fetchDataBySearch}>
                                                            <input
                                                                value={searchData}
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Search by reference number, press enter to search"
                                                                onChange={(e) =>
                                                                    setSearchData(e.target.value)
                                                                }
                                                            />
                                                        </form>
                                                    </div>
                                                    <div className="col-6 col-md-3 col-lg-2 pt-3 pt-md-0">
                                                        <button
                                                            className="px-3 rounded-1 d-flex align-items-center justify-content-between w-100"
                                                            style={{
                                                                outline: 'none',
                                                                background: 'none',
                                                                color: '#62789D',
                                                                border: '1px solid #62789D',
                                                                height: '50px',
                                                                // gap: '0.5rem',
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={handleFilterModalReort}>
                                                            Filter
                                                            <i className="ri-filter-3-fill ri-lg "></i>
                                                        </button>
                                                    </div>

                                                    <div className="col-6 col-md-3 col-lg-2 pt-3 pt-md-0">
                                                        <button
                                                            className="px-3 d-flex align-items-center justify-content-center rounded-1 w-100"
                                                            style={{
                                                                outline: 'none',
                                                                background: '#007DA3',
                                                                color: '#ffffff',
                                                                border: '1px solid #62789D',
                                                                fontSize: '15px',
                                                                height: '50px',
                                                                cursor: 'pointer',
                                                            }}
                                                            // onClick={handleFileModal}
                                                            onClick={() =>
                                                                openReportModal('excel')
                                                            }>
                                                            Export
                                                        </button>

                                                        {/* {downloadFiles === true ? (
                                                        <div className="small-modal">
                                                            <div
                                                                style={{
                                                                    display: 'block',
                                                                    fontSize: '14px',
                                                                }}>
                                                                <span
                                                                    onClick={() =>
                                                                        openReportModal('pdf')
                                                                    }>
                                                                    PDF
                                                                </span>
                                                                <hr />
                                                                <span
                                                                    onClick={() =>
                                                                        openReportModal('excel')
                                                                    }>
                                                                    Xls
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : null} */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive mt-3">
                                        <table className="table">
                                            <thead className="">
                                                <tr>
                                                    <th scope="col">Endpoint</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Source</th>
                                                    <th
                                                        scope="col"
                                                        style={{ whiteSpace: 'nowrap' }}>
                                                        Performed By
                                                    </th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Status</th>
                                                    {props?.userRights?.includes('VIEW_DATA') && (
                                                        <th scope="col">Action</th>
                                                    )}
                                                </tr>
                                            </thead>
                                            {reportData?.results?.length > 0 ? (
                                                <tbody>
                                                    {/* {apiReportState?.resp?.results?.map( */}
                                                    {reportData?.results?.map(
                                                        (val: any, i: number) => (
                                                            <tr key={i}>
                                                                <th scope="row">
                                                                    {/* {val?.endpoint.replaceAll('"', "'").split("'")[7]} */}
                                                                    {getEndPName(
                                                                        val?.endpoint
                                                                            ?.replaceAll('/', '')
                                                                            .replaceAll("'", '"')
                                                                    )}
                                                                </th>
                                                                <td style={{
                                                                        textTransform: 'capitalize',
                                                                    }}>
                                                                    {val?.search_response_name || 'N/A'}
                                                                </td>
                                                                <td>
                                                                    {' '}
                                                                    {val?.verification_status ===
                                                                    'VERIFIED'
                                                                        ? val?.price
                                                                        : 'Not Charged'}{' '}
                                                                </td>
                                                                <td> {val?.source}</td>
                                                                <td>
                                                                    {val?.performed_by ||
                                                                        'Name Not Available'}
                                                                    {/* , <br /> */}
                                                                    {/* {val?.user_email || "Email Not Available"}, <br />
                                                                {val?.user_role || "Role Not Available"} */}
                                                                </td>
                                                                <td>
                                                                    {' '}
                                                                    {moment
                                                                        .utc(val?.created_at)
                                                                        .format('lll')}
                                                                </td>
                                                                <td>
                                                                    {' '}
                                                                    {val?.verification_status ===
                                                                    'VERIFIED' ? (
                                                                        <SuccessTag />
                                                                    ) : val?.status ===
                                                                      'PENDING' ? (
                                                                        <FailedTag />
                                                                    ) : (
                                                                        <FailedTag />
                                                                    )}
                                                                </td>
                                                                {props?.userRights?.includes(
                                                                    'VIEW_DATA'
                                                                ) && (
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-view"
                                                                            onClick={() =>
                                                                                viewResponse(
                                                                                    val?.request_data,
                                                                                    val?.response_data,
                                                                                    val?.product,
                                                                                    getEndPName(
                                                                                        val?.endpoint
                                                                                            ?.replaceAll(
                                                                                                '/',
                                                                                                ''
                                                                                            )
                                                                                            .replaceAll(
                                                                                                "'",
                                                                                                '"'
                                                                                            )
                                                                                    )
                                                                                    // val?.endpoint.replaceAll('"', "'").split("'")[7]
                                                                                )
                                                                            }>
                                                                            <i className="ri-eye-line me-3 ri-xl" />
                                                                            View
                                                                        </button>
                                                                    </td>
                                                                )}
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            ) : (
                                                <div className="mt-5">
                                                    <h5 className="">No Record Found</h5>
                                                </div>
                                            )}
                                        </table>

                                        <div className="d-flex justify-content-end align-items-center">
                                            {reportData?.previous_page && (
                                                <p
                                                    style={{ cursor: 'pointer' }}
                                                    className="mb-0 me-3"
                                                    onClick={() =>
                                                        triggerPage(reportData?.previous_page)
                                                    }>
                                                    Prev
                                                </p>
                                            )}
                                            <button className="btn btn-green">{pageNumber}</button>
                                            {reportData?.next_page && (
                                                <p
                                                    style={{ cursor: 'pointer' }}
                                                    className="mb-0 ms-3"
                                                    onClick={() => triggerPage(reportData?.next_page)}>
                                                    Next
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {filterModalReport && (
                        <div className="main-modal report-filter-modal">
                            <div className="main-modal-content report-filter-card card col-md-5 col-lg-3 mx-auto px-md-4">
                                <span onClick={() => setFilterModalReport(false)}>
                                    <i className="ri-close-line close-modal"></i>
                                </span>

                                <div>
                                    <h2
                                        style={{
                                            borderBottom: '1px solid #E95470',
                                            padding: '5px 0px',
                                            width: '70px',
                                            font: '14px S-regular',
                                        }}>
                                        Filter
                                    </h2>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="brand-name"> Start date </label>
                                        <input
                                            value={startDate}
                                            type="date"
                                            className="form-control"
                                            onChange={(e) => setStartDate(e?.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="brand-name"> End date </label>
                                        <input
                                            value={endDate}
                                            type="date"
                                            className="form-control"
                                            onChange={(e) => setEndDate(e?.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="brand-name"> Status </label>
                                    <select
                                        value={statusCode}
                                        className="form-select"
                                        onChange={(e) => setStatusCode(e?.target?.value)}>
                                        <option value="VERIFIED">Successful</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="FAILED">Failed</option>
                                    </select>
                                </div>

                                <button
                                    onClick={fetchDataByFilter}
                                    className="btn w-100 py-3 mt-5"
                                    style={{
                                        outline: 'none',
                                        background: '#007DA3',
                                        color: '#ffffff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        fontSize: '14px',
                                        // padding:'10px'
                                    }}>
                                    {apiReportState?.isLoading ? (
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
                                        'Apply Filter'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <InvalidAccessRightComp />
            )}

            {/* <div className="sub-tabs mt-3">
                <Tabs defaultActiveKey="api" id="idpassLogTabs" className=" sub-tab-card">
                    <Tab eventKey="api" title="API Calls">

                    </Tab>
                    <Tab eventKey="bulk" title="Bulk Verification">
                        <></>
                    </Tab>
                    <Tab eventKey="event" title="Event Logs">
                        <></>
                    </Tab>
                </Tabs>
            </div> */}
        </div>
    )
}

const ReportModal = ({
    handleClose,
    onChange,
    reportForm,
    handleSubmit,
    apiReportState,
    apiGenerateReportLogsState,
    product,
    modalMessage, 
    modalErrMsg
}: {
    handleClose: () => void
    onChange: any
    reportForm: any
    handleSubmit: any
    apiReportState: any
    apiGenerateReportLogsState: any
    product: any,
    modalMessage:any, 
    modalErrMsg: any
}) => {
    const { start_date, end_date, filter_type, response_code } = reportForm

    // useEffect(() => {
    //     fetchEndpoints()
    // }, [])

    // const [endpointLogs, set]
    const [endpointList, setEndpointList] = useState([])
    const [responseData, setResponseData] = useState('')

    // const fetchEndpoints = async () => {
    //     const endpointList = {
    //         url: 'https://api.prembly.com/identitypass/internal/core/endpoints/get',
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Accept: 'application/json',
    //             Authorization: accessT,
    //             Organisation: orgId,
    //         },
    //     }
    //     await axios.request(endpointList).then((response: any) => {
    //         console.log(response)
    //     })
    // }

    const dispatch = useDispatch()

    // let fetchEndpoints = () => {
    //     const callback = (data: any) => {
    //         if (data.status) {
    //             console.log(data.data)
    //         }
    //         if (!data.status) {
    //             setNotifTitle('Error')
    //             setNotif(data.detail)
    //             setNotifVal(true)
    //         }
    //     }
    //     let data: any = {
    //         values: {},
    //         callback,
    //     }
    //     dispatch(identitypassEndpointsRequest(data))
    // }

    // let fetchRespondsData = () => {
    //     const callback = (data: any) => {
    //         if (data.status) {
    //             console.log(data.data)
    //         }
    //         // if (!data.status) {
    //         //     setNotifTitle('Error')
    //         //     setNotif(data.detail)
    //         //     setNotifVal(true)
    //         // }
    //     }
    //     let data: any = {
    //         values: {
    //             start_date: start_date,
    //             end_date: end_date,
    //             filter_type: filter_type,
    //             response_code: response_code,
    //             product: product,
    //         },
    //         callback,
    //     }
    //     dispatch(apiGenerateReportLogsRequest(data))
    // }

    return (
        <div className="main-modal">
            <div className="main-modal-content card col-md-7 col-lg-4 mx-auto">
                <span
                    onClick={() => {
                        handleClose()
                    }}>
                    <i className="ri-close-line close-modal"></i>
                </span>

                <div className="card-body">
                    <form className="main-modal-body" onSubmit={handleSubmit}>
                        <div className="main-modal-header col-md-7 col-lg-4">
                            <h5>Download Report</h5>
                        </div>
                        {modalMessage && <p style={{color:'red'}}>{modalErrMsg}</p>}
                        <div className="">
                            <div>
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    name={'start_date'}
                                    value={start_date}
                                    type="date"
                                    className="form-control"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    name={'end_date'}
                                    value={end_date}
                                    type="date"
                                    className="form-control"
                                    onChange={onChange}
                                />
                            </div>

                            <div>
                                <label style={{ fontSize: '12px' }}>Filter By Status</label>
                                <select
                                    name="response_code"
                                    className="form-select"
                                    onChange={onChange}
                                    required
                                    value={response_code}>
                                    <option value={['00', '01', '02', '03']}>All</option>
                                    <option value={['00']}>Sucessfull</option>
                                    <option value={['01']}>Id Not found</option>
                                    <option value={['02']}>Service Not Available</option>
                                    <option value={['03']}>Insufficient Wallet Balance</option>
                                </select>
                            </div>
                            {/* 
                            <div>
                            <label style={{ fontSize: '12px' }}>
                                Filter By Product
                            </label>
                            <select
                                className="form-control"
                               
                                onChange={onChange}
                                value={product}
                                required>
                                
                                {

                                <option value={product}>{product.code}</option>
                                }
                                
                            </select>
                        </div> */}

                            {/* <div>
                                <label style={{ fontSize: '12px' }}>Filter By Endpoint</label>
                                <select
                                    className="form-control"
                                    onChange={onChange}
                                    name="endpoint"
                                    required>
                                    <option>All</option>
                                    {endpointList.map((value: any) => (
                                        <option value={value.code}>{value.name}</option>
                                    ))}
                                </select>
                            </div> */}

                            <button
                                className="btn btn-deep-green px-4 mt-3"
                                disabled={apiGenerateReportLogsState?.isLoading}
                                onClick={handleSubmit}
                                type="submit">
                                {apiGenerateReportLogsState?.isLoading ? (
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
                    </form>
                </div>
            </div>
        </div>
    )
}
