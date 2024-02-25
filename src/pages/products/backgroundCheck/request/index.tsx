import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mainloader, { AcceptedTag, ConsentedTag, DeclinedTag, EmptyStateComp, InProgressTag, NeutralTag, VerifiedTag } from '../../../../components/utils'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers';
import { backgroundCheckRequestGetAllRequest, backgroundCheckRequestInitiateRequest } from '../../../../redux/actions/products/backgroundCheck/request/general';
import NotificationToast from '../../../../components/utils/notifToast';
import global from '../../../../redux/constants/global';
import moment from 'moment';
import { backgroundCheckPackageGetAllRequest } from '../../../../redux/actions/products/backgroundCheck/package';
import { backgroundCheckRequestGetPriceRequest, backgroundCheckRequestMakePaymentRequest } from '../../../../redux/actions/products/backgroundCheck/request/checks';
import { Spinner } from 'react-bootstrap';

export default function BackgroundCheckRequestPage() {
	const [notifVal, setNotifVal] = useState(false)
	const [notif, setNotif] = useState("")
	const [notifTitle, setNotifTitle] = useState("")
	const [declinedModal, setDeclinedModal] = useState(false)
	const [requestStatus, setRequestStatus] = useState("")
	const [candidateName, setCandidateName] = useState("")
	const [candidateEmail, setCandidateEmail] = useState("")
	const [selectedChecks, setSelectedChecks] = useState({})
	const [acceptedModal, setAcceptedModal] = useState(false)
	const [packageID, setPackageID] = useState("")
	const [checkID, setCheckID] = useState("")
	const [filterModal, setFilterModal] = useState(false)
	const [initiateRequestModal, setInitiateRequestModal] = useState(false)
	const [requestList, setRequestList] = useState<any[]>([])
	const [searchValue, setSearchValue] = useState("")


	const [status, setStatus] = useState("all")
	const [createdBy, setcreatedBy] = useState(undefined)
	const [startDate, setStartDate] = useState(undefined)
	const [endDate, setEndDate] = useState(undefined)

	const initateRequestState = useSelector((state: RootState) => state.backgroundCheckRequestInitiateReducer);
	const allRequestState = useSelector((state: RootState) => state.backgroundCheckRequestGetAllReducer);
	const allPackageState = useSelector((state: RootState) => state.backgroundCheckPackageGetAllReducer);
	const requestPricingState = useSelector((state: RootState) => state.backgroundCheckRequestGetPriceReducer);
	const makePaymentState = useSelector((state: RootState) => state.backgroundCheckRequestMakePaymentReducer);

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		getAllRequests()
		getAllPackages()
	}, [])

	let getAllPackages = () => {
		const callback = (data: any) => {
			if (!data.status) {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {},
			callback,
		};
		dispatch(backgroundCheckPackageGetAllRequest(data))
	}

	let getAllRequests = () => {
		const callback = (data: any) => {
			if (data.status) {
				setRequestList(data?.detail)
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
		dispatch(backgroundCheckRequestGetAllRequest(data))
	}

	let getRequestPricing = (requestId: any) => {
		const callback = (data: any) => {
			if (!data.status) {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				request_id: requestId,
			},
			callback,
		};
		dispatch(backgroundCheckRequestGetPriceRequest(data))
	}

	let makeRequestPayment = (currency:any, price:any) => {
		const callback = (data: any) => {
			if (data.status) {
				setNotifTitle("Success")
				setNotif("You have successfully made the payment for this check")
				setNotifVal(true)
				setTimeout(() => {
					navigate(`/BackgroundCheck/Requests/report/${checkID}`)
				}, 1000);
			}
			else {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				request_id: checkID,
				currency: currency,
				amount: price,
			},
			callback,
		};
		dispatch(backgroundCheckRequestMakePaymentRequest(data))
	}



	let declinedAction = (name: string, email: string, checks: any, package_id: string, requestStat:string) => {
		setCandidateName(name)
		setCandidateEmail(email)
		setSelectedChecks(checks)
		setPackageID(package_id)
		setRequestStatus(requestStat)
		setDeclinedModal(true)
	}

	let acceptedAction = (checks: any, check_id: string, paidAmount:any) => {
		setSelectedChecks(checks)
		setCheckID(check_id)
		setAcceptedModal(true)

		if(!paidAmount){
			getRequestPricing(check_id)
		}
		else{
			navigate(`/BackgroundCheck/Requests/report/${check_id}`)
		}
	}


	let requestAnotherCheck = () => {
		const callback = (data: any) => {
			if (data.status) {
				setNotifTitle("Success")
				setNotif("You have successfully requested for another check")
				setNotifVal(true)
				setDeclinedModal(false)
				getAllRequests()
			}
			else {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				package_id: packageID,
				base_url: global.appBaseUrl + "BackgroundCheck/Requests/Accept",
				candidates: [
					{ candidate_name: candidateName, candidate_email: candidateEmail }
				],
				selected_check: selectedChecks
			},
			callback,
		};
		dispatch(backgroundCheckRequestInitiateRequest(data))
	}

	let clearFilterData =()=>{
		setStartDate(undefined)
		setEndDate(undefined)
		setcreatedBy(undefined)
		setStatus("all")
	}

	let filterData = (startDate: any, endDate: any, createdBy: any, status: any, searchValue: any) => {
		let filteredData: any = allRequestState?.resp?.detail;

		if((startDate !== undefined && endDate !== undefined) && (new Date(endDate) <  new Date(startDate))){
			setNotifTitle("Error")
			setNotif("End Date cannot be less than start Date")
			setNotifVal(true)
			return
		}

		if (startDate !== undefined && endDate !== undefined) {
			filteredData = filteredData?.filter((val: any) => new Date(val.created_at) >= new Date(startDate) && new Date(val.created_at) <= new Date(endDate));
		}

		if (createdBy !== undefined) {
			filteredData = filteredData?.filter((val: any) => val.created_by === createdBy);
		}

		if (status !== undefined) {
			filteredData = filteredData?.filter((val: any) => val?.request_status === status);
		}

		if (searchValue !== undefined) {
			// filteredData = filteredData?.filter((val: any) => {val?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())})
			filteredData = filteredData?.filter((item: any) => {
				if ((item?.candidate_name?.toLowerCase()?.includes(searchValue?.toLowerCase())) ||
					(item?.candidate_email?.toLowerCase()?.includes(searchValue?.toLowerCase()))
				) { 
					return item; 
				}
			})
		}

		setRequestList(filteredData)
		// setpackageList(filteredData)

		clearFilterData()
	}


	let getRequestCreators = () => {
		let uniqueCreatedBy: any = [];

		for (const val of allRequestState?.resp?.detail) {
			if (!uniqueCreatedBy?.includes(val?.created_by)) {
				uniqueCreatedBy?.push(val?.created_by);
			}
		}
		return uniqueCreatedBy
	}

	let getAllRequestStatus = () => {
		let uniqueCreatedBy: any = [];

		for (const val of allRequestState?.resp?.detail) {
			if (!uniqueCreatedBy?.includes(val?.request_status)) {
				uniqueCreatedBy?.push(val?.request_status);
			}
		}
		return uniqueCreatedBy
	}

	let initiateCheck = () => {
		if (!packageID) {
			setNotifTitle("Error")
			setNotif("Please select a package")
			setNotifVal(true)
		}
		else {
			navigate(`/BackgroundCheck/Requests/Initiate?ref=${packageID}`)
		}

	}

	// console.log(requestPricingState)

	return (
		<div>
			{(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}


			{filterModal &&
				<div className="main-modal report-filter-modal">
					<div className="main-modal-content package-filter-card card col-md-7 col-lg-4 mx-auto" >
						<span
							onClick={() => {setFilterModal(false); clearFilterData()}}>
							<i className="ri-close-line close-modal"></i>
						</span>

						<div className="card-body">
							<div className="main-modal-body">
								<div className="main-modal-header col-md-7 col-lg-4">
									<h5>Filter Requests</h5>
								</div>

								<div className="">
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="startDate"> Start Date </label>
											<input type="date" className="form-control" value={startDate} onChange={(e: any) => setStartDate(e?.target?.value)} />
										</div>
										<div className="col-md-6">
											<label htmlFor="endDate"> End Date </label>
											<input type="date" className="form-control" value={endDate} onChange={(e: any) => setEndDate(e?.target?.value)} />
										</div>
									</div>

									<div className="">
										<label htmlFor="selectCheck"> Created By </label>
										<select className="form-select" value={createdBy} onChange={(e: any) => setcreatedBy(e?.target?.value)} >
											<option value="">Filter by package creator</option>
											{getRequestCreators()?.map((val: any, k: number) => (
												<option key={k} value={val}>{val}</option>
											))}
										</select>
									</div>
									<div className="">
										<label htmlFor="selectStatus"> Status </label>
										<select className="form-select" value={status} onChange={(e: any) => setStatus(e?.target?.value)} >
											<option value="">Filter by request status</option>
											<option value="all">ALL</option>
											{getAllRequestStatus()?.map((val: any, k: number) => (
												<option key={k} value={val}>{val}</option>
											))}
										</select>
									</div>


									<button
										className="btn btn-deep-green px-4 mt-3"
										onClick={() => { filterData(startDate, endDate, createdBy, status === "all" ? undefined : status, undefined); setFilterModal(false) }}
									>
										Filter Package
									</button>

								</div>
							</div>
						</div>
					</div>
				</div>
			}

			{initiateRequestModal &&
				<div className="main-modal">
					<div className="main-modal-content card col-md-7 col-lg-4 mx-auto" >
						<span
							onClick={() => setInitiateRequestModal(false)}>
							<i className="ri-close-line close-modal"></i>
						</span>

						<div className="card-body">
							<div className="main-modal-body">
								<div className="main-modal-header col-md-7 col-lg-4">
									<h5>Initiate Requests</h5>
								</div>

								<div className="">
									<div className="">
										<label htmlFor="selectpackage"> Select Package </label>
										<select className='form-select' value={packageID}
											onChange={e => { e.target?.value === "new" ? navigate("/BackgroundCheck/Packages/Create-Package") : setPackageID(e.target.value) }}>
											<option value="new" className='text-center'>
												<i className='ri-add-circle-line' />
												Add new package
											</option>
											<option value="">Choose a package</option>
											{allPackageState?.resp?.detail?.map((val: any, i: number) => (
												<option value={val?.id}>{val?.name}</option>
											))}
										</select>
									</div>
									<button
										className="btn btn-deep-green px-4 mt-3 w-100"
										onClick={initiateCheck}
									>
										Proceed
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			}

			{declinedModal &&
				<div className="main-modal ">
					<div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
						<div className="card-body">
							<div className="main-modal-body icon-modal-body text-center">

								<i className="ri-logout-circle-line modal-back-button" onClick={() => setDeclinedModal(false)} />

								<div className='mt-3'>
									<p>This candidate { requestStatus === "PENDING" && " is yet to accept " } {requestStatus === "DECLINED" && " has declined to complete "} this background check</p>
									<p>Do you want to resend this check ?</p>

									<button className='btn btn-deep-green w-100' disabled={initateRequestState.isLoading} onClick={requestAnotherCheck}>
										{initateRequestState.isLoading ? (
											<div>
												<Spinner
													as="span"
													animation="border"
													size="sm"
													role="status"
													aria-hidden="true"
												/>
												<span className="sr-only">
													Loading...
												</span>
											</div>
										) : (
											'Yes'
										)}
									</button>
									<button className='btn btn-deep-green-outline w-100 mt-3' onClick={() => setDeclinedModal(false)}>No</button>

								</div>
							</div>
						</div>
					</div>
				</div >
			}

			{acceptedModal &&
				<div className="main-modal request-summary-area">
					<div className="main-modal-content card col-md-9 col-lg-7 mx-auto">
						<span onClick={() => setAcceptedModal(false)}><i className="ri-close-line close-modal"></i></span>
						<div className="card-body">
							<div className="main-modal-body">
								<div className="main-modal-header">
									<h5>Background Check Result</h5>
								</div>

								<div className='bg-light p-3 mt-3'>
									<small>Package</small>
									<h6>{requestPricingState?.resp?.detail?.package}</h6>

									<div className="row mt-4">
										<div className="col-md-6">
											<small>Candidate Name</small>
											<h6 className='add-ellipsis'>{requestPricingState?.resp?.detail?.candidate_name}</h6>

										</div>
										<div className="col-md-6">
											<small>Candidate Email</small>
											<h6 className='add-ellipsis'>{requestPricingState?.resp?.detail?.candidate_email}</h6>
										</div>
									</div>
								</div>


								<div className="main-modal-header mt-3">
									<h5>Cost</h5>
								</div>

								<div className='bg-light p-3 mt-3'>
									<div className="row mt-3">
										<div className="col-md-6">
											<small>Check</small>
											{requestPricingState?.resp?.detail?.price_list?.map((val: any, i: number) => (
												<h6 className='add-ellipsis mb-2' key={i}>{val?.name}</h6>
											))}
											{/* {selectedChecks && Object?.keys(selectedChecks)?.map((val: any, i: number) => (
												<h6 className='add-ellipsis mb-2' key={i}>{val?.replaceAll("_", " ")}</h6>
											))} */}
										</div>
										<div className="col-md-6">
											<small>Cost</small>
											{requestPricingState?.resp?.detail?.price_list?.map((val: any, i: number) => (
												<h6 className='add-ellipsis mb-2' key={i}>{val?.price} {val?.currency}</h6>
											))}
										</div>
									</div>
								</div>

								<h6 className='my-3'>You will be charged {requestPricingState?.resp?.detail?.total_price} {requestPricingState?.resp?.detail?.currency} to view this result. Proceed</h6>

								<button className='btn btn-deep-green-outline  w-100'
									disabled={makePaymentState.isLoading}
									onClick={() => makeRequestPayment( requestPricingState?.resp?.detail?.currency, requestPricingState?.resp?.detail?.total_price)}
								>

									{makePaymentState.isLoading ? (
										<div>
											<Spinner
												as="span"
												animation="border"
												size="sm"
												role="status"
												aria-hidden="true"
											/>
											<span className="sr-only">
												Loading...
											</span>
										</div>
									) : (
										'Yes'
									)}

								</button>
								<button className='btn btn-deep-green w-100 mt-2' onClick={() => setAcceptedModal(false)}>No</button>

							</div>
						</div>
					</div>
				</div >
			}

			{allRequestState?.isLoading && <Mainloader />}

			{!allRequestState?.isLoading &&
				<div className="container-fluid px-md-4 mt-4">
					<div className="table-header">
						<div className="row">
							<div className="col-md-3 col-lg-4">
								<div className="pb-2">
									<h5>Requests</h5>
									<p>View and initiate Background Checks here</p>
								</div>
							</div>
							<div className="col-md-9 col-lg-8">
								<div className="row justify-content-end">
									<div className="col-md-5">
										<div className="input-group">
											<input type="search" className="form-control search-input border-end-0" placeholder="Search" value={searchValue}
												onChange={e => { setSearchValue(e.target.value); filterData(undefined, undefined, undefined, undefined, e.target.value) }}
											/>
											<span className="input-group-text border-start-0"
												style={{ borderRadius: "0px 5px 5px 0px", backgroundColor: "#fff" }}
											>
												<i className="ri-search-line" />
											</span>
										</div>
									</div>
									<div className="col-md-2">
										<button className="btn-filter btn py-3" onClick={() => setFilterModal(true)}>
											Filter
											<i className="ms-2 ri-xl ri-filter-3-fill" />
										</button>
									</div>
									<div className="col-md-3 pb-2 text-end">
										{/* <Link to="/BackgroundCheck/Requests/Initiate"> */}
										<button className='btn btn-green py-3 ' onClick={() => setInitiateRequestModal(true)}>Initiate Request</button>
										{/* </Link> */}
									</div>
								</div>
							</div>
						</div>
					</div>


					<div className="table-responsive mt-4">

						{ ((requestList?.length < 1)) ?
							<div className="my-5 py">
								<EmptyStateComp title={"No request found"}
									ctaAction={() => { }}
									desc={"You will see all your recent requests here"}
									ctaValue={""}
								/>
							</div>
							:
							<table className="table">
								<thead className="">
									<tr>
										<th scope="col">S/N</th>
										<th scope="col">Candidate Name</th>
										<th scope="col">Candidate Email</th>
										<th scope="col">Request Status</th>
										<th scope="col">Package Name</th>
										<th scope="col">Completion Status</th>
										<th scope="col">Created By</th>
										<th scope="col">Date Created</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
								<tbody>
									{requestList?.map((val: any, i: number) => (
										<tr>
											<th scope="row">{i + 1}</th>
											<td>{val?.candidate_name}</td>
											<td> <span className='add-ellipsis'>{val?.candidate_email}</span></td>
											<td>
												{val?.request_status === "PENDING" ? <NeutralTag />
													:
													val?.request_status === "ACCEPTED" ? <AcceptedTag />
													:
													val?.request_status === "CONSENT" ? <ConsentedTag />
													:
													val?.request_status === "DECLINED" ? <DeclinedTag />
													:
													val?.request_status === "IN_PROGRESS" ? <InProgressTag />
													:
													val?.request_status === "VERIFIED" ? <VerifiedTag />
													:
													"NOT AVAILABLE"
												}
											</td>
											<td>{val?.package_name}</td>
											<td>
												<div className="d-flex">
													<div className='me-2' style={{ width: "120px", height: "23px", backgroundColor: "#E4E4E4" }}>
														<div style={{ width: `${val?.completion_status}%`, height: "23px", backgroundColor: "#34840E" }} />
													</div>
													<span >{val?.completion_status}% </span>
												</div>
											</td>
											<td> <span className='add-ellipsis'>{val?.created_by}</span></td>
											<td><span className='add-ellipsis'>{moment(val?.created_at).format("MMMM Do YYYY, h:mm")}</span></td>
											<td>
												<button className='btn btn-view add-ellipsis d-flex justify-content-center' style={{width:"110px", backgroundColor:"#deebff", color:"#003e51", padding:"7px 0px"}}
													onClick={() => {
														val?.request_status === "DECLINED" ? declinedAction(val?.candidate_name, val?.candidate_email, val?.selected_check, val?.package_id, val?.request_status)
														:
														val?.request_status === "PENDING" ? declinedAction(val?.candidate_name, val?.candidate_email, val?.selected_check, val?.package_id, val?.request_status)
														:
														val?.request_status === "ACCEPTED" ? acceptedAction(val?.selected_check, val?.id, val?.amount_paid)
														:
														navigate(`/BackgroundCheck/Requests/report/${val?.id}`)
													}}
												>
													<i className={`
														${val?.request_status === "PENDING" ? "ri-upload-line" :
														(val?.request_status === "ACCEPTED" && !val?.amount_paid)  ? "ri-play-line" : "ri-eye-line"} 
															me-1 ri-lg`
														} 
													/>

													{ val?.request_status === "PENDING" ? "Re-Initiate" :
														(val?.request_status === "ACCEPTED" && !val?.amount_paid) ? "Start Check" : "View Report"
													}
													
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>

						}
					</div>
				</div>
			}
		</div>
	)
}
