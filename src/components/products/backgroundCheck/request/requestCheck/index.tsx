import React, { useEffect, useState } from 'react'
import NotificationToast from '../../../../utils/notifToast'
import readXlsxFile from 'read-excel-file'
import { backgroundCheckPackageGetAllRequest, backgroundCheckPackageGetSingleRequest } from '../../../../../redux/actions/products/backgroundCheck/package'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/reducers'
import { backgroundCheckRequestInitiateRequest } from '../../../../../redux/actions/products/backgroundCheck/request/general'
import global from '../../../../../redux/constants/global'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function BackgroundCheckRequestInitiatePage() {
	interface ISingleData {
		detail: any
	}

	const [notifVal, setNotifVal] = useState(false)
	const [notif, setNotif] = useState("")
	const [notifTitle, setNotifTitle] = useState("")
	const [checkData, setCheckData] = useState<ISingleData | null>(null)
	const [candidates, setCandidates] = useState<any[]>([])
	const [candidateName, setCandidateName] = useState("")
	const [candidateEmail, setCandidateEmail] = useState("")
	const [selectedChecks, setSelectedChecks] = useState({})
	const [packageID, setPackageID] = useState("")

	const [uploadModal, setUploadModal] = useState(false)
	const [doc, setDoc] = useState<any>(null)

	const [summaryModal, setSummaryModal] = useState(false)

	// const singlePackageState = useSelector((state: RootState) => state.backgroundCheckPackageGetSingleReducer);
	const requestState = useSelector((state: RootState) => state.backgroundCheckRequestInitiateReducer);
	const allPackageState = useSelector((state: RootState) => state.backgroundCheckPackageGetAllReducer);
    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer);

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const queryParams = new URLSearchParams(window.location.search)
	let packageRef = queryParams.get("ref") || ""


	useEffect(() => {
		getAllPackages()
		setPackageID(packageRef)
		if (packageRef) {
			getSinglePackages(packageRef)
		}
	}, [])

	useEffect(() => {
		!packageID ?  navigate(`/BackgroundCheck/Requests/Initiate`) : navigate(`/BackgroundCheck/Requests/Initiate?ref=${packageID}`)
		getSinglePackages(packageID)
	}, [packageID])



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

	let getSinglePackages = (id: string) => {
		const callback = (data: any) => {
			if (data.status) {
				setCheckData(data)
					data?.detail?.no_of_checks?.forEach((val:any) => {
						let checkList: any = selectedChecks
						checkList[val] = 1;
						setSelectedChecks({ ...checkList });
					});
			}
			else {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				package_id: id
			},
			callback,
		};
		dispatch(backgroundCheckPackageGetSingleRequest(data))
	}


	let pushCandidates = (name: any, mail: any) => {

		let candidatesList: any = candidates

		let candidatesListIndex = candidates.findIndex(item => (item?.mail === mail))
		if (candidatesListIndex !== -1) {
			candidatesList.splice(candidatesListIndex, 1)
			candidatesList.push({ "candidate_name": name, "candidate_email": mail })
		} else {
			candidatesList.push({ "candidate_name": name, "candidate_email": mail })
			// candidatesList.push({ name, mail })
		}

		setCandidates([...candidatesList])
		// setCandidates(candidatesList)
		setCandidateName("")
		setCandidateEmail("")
	}

	let addCandidate = () => {
		let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;

		if (!candidateName) {
			setNotifTitle("Error")
			setNotif("Please enter candidate's name")
			setNotifVal(true)
			return
		}
		if (!candidateEmail) {
			setNotifTitle("Error")
			setNotif("Please enter candidate's email")
			setNotifVal(true)
			return
		}
		if (!email_reg.test(candidateEmail)) {
			setNotifTitle("Error")
			setNotif("Invalid email address")
			setNotifVal(true)
			return
		}

		pushCandidates(candidateName, candidateEmail)
	}

	let uploadList = () => {
		if (!doc) {
			setNotifTitle("Error")
			setNotif("Please upload a document")
			setNotifVal(true)
			return
		}
		else {
			readXlsxFile(doc).then((rows) => {
				rows?.forEach((val, i) => {
					if ((i !== 0) && val) {
						pushCandidates(val[0], val[1])
					}
				})
				setUploadModal(false)
				setDoc(null)
			})
		}
	}

	let removeCandidate = (mail: any) => {

		let candidatesList: any = candidates

		let candidatesListIndex = candidates.findIndex(item => (item?.mail === mail))

		if (candidatesListIndex !== -1) {
			candidatesList.splice(candidatesListIndex, 1)
		}

		setCandidates([...candidatesList])

	}

	let countAction = (check: string, action: string) => {

		let checkList: any = selectedChecks
		if (action === 'increment') {
			checkList[check] = (check in checkList) ? checkList[check] + 1 : 1;
		}
		else {
			checkList[check] = (check in checkList && checkList[check] > 1) ? checkList[check] - 1 : 1;
		}
		setSelectedChecks({ ...checkList });
	}

	let requestCandidateCheck = () => {

		if (candidates?.length < 1) {
			setNotifTitle('Error')
			setNotif('Please Add atleast one candidate')
			setNotifVal(true)
			return
		}
		if (selectedChecks && Object.keys(selectedChecks)?.length < 1) {
			setNotifTitle('Error')
			setNotif('Please have atleast one (1) field you want to verify')
			setNotifVal(true)
			return
		}
		const callback = (data: any) => {
			if (data.status) {
				setNotifTitle('Success')
				setNotif("Request successfully sent")
				setNotifVal(true)
				setTimeout(() => {
					navigate("/BackgroundCheck/Requests")
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
				package_id: packageID,
				base_url: global.appBaseUrl + "BackgroundCheck/Requests/Accept",
				candidates: candidates,
				selected_check: selectedChecks
			},
			callback,
		};
		dispatch(backgroundCheckRequestInitiateRequest(data))
	}

	let requestCheck = () => {
		if (!packageID) {
			setNotifTitle('Error')
			setNotif('Please select a template for your check')
			setNotifVal(true)
			return
		}
		if (candidates?.length < 1) {
			setNotifTitle('Error')
			setNotif('Please Add atleast one candidate')
			setNotifVal(true)
			return
		}
		setSummaryModal(true)
	}


	return (
		<>
			{(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

			{uploadModal &&
				<div className="main-modal">
					<div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
						<span onClick={() => setUploadModal(false)}><i className="ri-close-line close-modal"></i></span>
						<div className="card-body">
							<div className="main-modal-body">
								<div className="main-modal-header col-md-5 col-lg-3">
									<h5>Upload List</h5>
								</div>

								<div>
									<div className="">
										<label htmlFor="email">Update Candidate List</label>

										{!doc ?
											<div className="file-input-area p-2">
												<div className="">
													<input type="file"
														accept=".csv, .xlsx, .xls"
														onChange={(doc: any) => {
															setDoc(doc.target.files[0])
														}}
													/>
													<small>Maximum file size: 1MB</small>
													<small>Supported file types: (.csv, .xlsx, .xls).</small>
												</div>
											</div>
											:
											<div className="card">
												<div className="card-body py-1">
													<div className="row justify-content-between ">
														<div className="col-md-7">
															<p className='p-0'>Document. {doc?.name.substr(-4)}</p>
														</div>
														<div className="col-md-3">
															<div className='d-flex justify-content-end align-items-center'>
																<i className=' ri-delete-bin-6-line ri-lg' style={{ cursor: "pointer", marginTop: "10px", color: "#E95470" }}
																	onClick={() => {
																		setDoc("")
																	}}
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										}

										<div className="text-center pt-4">
											<a href="https://prembly-my.sharepoint.com/:x:/p/kolade/EbyhfXM7O4JPg_qy0C71aVEBz2bcVGDIENSLHa5ZFkrLOw?e=zx4fq8" download className="link link-underline" target="_blank" rel="noopener noreferrer">
												Download template
											</a><br />

											<button className='btn btn-deep-green mt-4 w-100' onClick={uploadList}>Upload</button>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div >
			}


			{summaryModal &&
				<div className="main-modal request-summary-area">
					<div className="main-modal-content card col-md-9 col-lg-7 mx-auto">
						<span onClick={() => setSummaryModal(false)}><i className="ri-close-line close-modal"></i></span>
						<div className="card-body">
							<div className="main-modal-body">
								<div className="main-modal-header">
									<h5>Summary</h5>
								</div>

								<div className='bg-light p-3 mt-3'>
									<small>Package</small>
									<h6>{checkData?.detail?.name}</h6>
									{/* {allPackageState?.resp?.detail?.map((val: any, i: number) => {
										if (packageID === val?.id) {
											<h6 key={i}>{val?.name}</h6>
										}
									})} */}

									<div className="row mt-4">
										<div className="col-md-6">
											<small>Candidate Name</small>
										</div>
										<div className="col-md-6">
											<small>Candidate Email</small>
										</div>
									</div>

									<div>

									</div>
									{candidates?.map((val, i) => (
										<div className="row mt-2" key={i}>
											<div className="col-md-6"> <h6 className='add-ellipsis'>{val?.candidate_name}</h6> </div>
											<div className="col-md-6"> <h6 className='add-ellipsis'>{val?.candidate_email}</h6> </div>
										</div>
									))}
								</div>

								<div className='p-3'>
									<div className="row">
										<div className="col-md-6">
											<div className="main-modal-header col-md-4">
												<h5 style={{ font: "14px S-regular" }}>Selected checks</h5>
											</div>
										</div>
										<div className="col-md-6">
											<div className="main-modal-header col-md-4">
												<h5 style={{ font: "14px S-regular" }}>Number of Fields</h5>
											</div>
										</div>
									</div>

									{checkData?.detail?.no_of_checks?.map((val: any, i: number) => (
										<div className="row" key={i}>
											<div className="col-md-6">
												<h6>{val?.replaceAll("_", " ")}</h6>
											</div>
											<div className="col-md-6">
												<div className="d-flex align-items-center my-1">
													<i className="ri-subtract-line" style={{ border: "1px solid #000", cursor: "pointer" }} onClick={() => countAction(val, "decrement")} />
													<h6 className='m-0 p-0 mx-3'>{selectedChecks[val as keyof typeof selectedChecks] || 0}</h6>
													<i className="ri-add-line" style={{ border: "1px solid #000", cursor: "pointer" }} onClick={() => countAction(val, "increment")} />
												</div>
											</div>
										</div>
									))}


								</div>
								<h6>You will not be charged until you want to view the check results</h6>

								<button className='btn btn-deep-green mt-4' onClick={requestCandidateCheck}
									disabled={requestState.isLoading}>
									{requestState.isLoading ? (
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
										'Request Check'
									)}
								</button>
							</div>
						</div>
					</div>
				</div >
			}

			<div className='request-check-area pb-5'>
				<div className="container-fluid px-md-4 mt-4">
					<div className="table-header">
						<div className="row">
							<div className="col-md-4">
								<div className="pb-2 page-header-title">
									<h5>Request a Check</h5>
									<p>Initiate a background check</p>
								</div>
							</div>
							{/* <div className="col-md-8">
								<div className="pb-2">

								</div>
							</div> */}
						</div>
					</div>

					<div className="col-md-9">

						<div className="col-md-4">
							<label htmlFor="template">Select Package</label>
							<select className='form-select' value={packageID} 
								onChange={e =>{e.target?.value === "new" ? navigate("/BackgroundCheck/Packages/Create-Package") : setPackageID(e.target.value) }}
							>
								<option value="new">
									<i className='ri-add-circle-line' />
									Add new package
								</option>
								<option value="">Choose a package</option>
								{allPackageState?.resp?.detail?.map((val: any, i: number) => (
									<option key={i} value={val?.id}>{val?.name}</option>
								))}
							</select>
						</div>

						<div className='mt-5 mb-3'>
							<p className='m-0 p-0' style={{ color: "#054356" }}>Add Candidate(s)</p>
							<div className="row align-items-center">
								<div className="col-md-4 mt-1">
									<label htmlFor="template">Candidate Name</label>
									<input type="text" className='form-control' value={candidateName} placeholder='John Doe'
										onChange={e => setCandidateName(e.target.value)}
									/>
								</div>
								<div className="col-md-4 mt-1">
									<label htmlFor="template">Candidate Email</label>
									<input type="text" className='form-control' value={candidateEmail} placeholder='name@email.com'
										onChange={e => setCandidateEmail(e.target.value)}
									/>
								</div>
								<div className="col-md-3 mt-1">
									<button className="btn btn-deep-green-outline px-3 py-2 mt-5 d-flex align-items-center justify-content-center"
										onClick={addCandidate}
									>
										<i className='ri-add-circle-line me-3 ri-xl' />
										Add Candidate
									</button>
								</div>
							</div>
						</div>

						{(candidates?.length > 0) &&
							<div className='px-3 py-3 mb-3 uploaded-list-area'>
								{candidates?.map((val, i) => (
									<div className="row" key={i}>
										<div className="col-md-4"> <p className='add-ellipsis'>{val?.candidate_name}</p> </div>
										<div className="col-md-4"> <p className='add-ellipsis'>{val?.candidate_email}</p> </div>
										<div className="col-md-4">
											<p className='text-danger btn p-0 ' 
												style={{borderBottom: '1px solid red', borderRadius: 0}} 
												onClick={() => removeCandidate(val?.mail)}
											>
												Remove Candidate
											</p>
										</div>
									</div>
								))}
							</div>
						}

						<small className='pt-4' style={{ color: "#007DA3", cursor: "pointer" }} onClick={() => setUploadModal(true)}>
							<i className='ri-add-line me-2' />
							Upload List
						</small>

					</div>
					<div>
						<div className="">
							<p className='mt-5' style={{ color: "#054356" }}>Consent</p>
						</div>
						<p>
							I agree to have express permission to collect, use, and disclose the following personal
							information about the above {candidates?.length > 1 ? " candidates " : " candidate "}. The information will be used by 
                        	<b> {organisationInfoState?.resp?.data?.organisation?.name || ""}</b> .
						</p>
						<p className='mt-3'>
							By clicking on proceed I certify that the information provided in this consent statement is true and accurate to
							the best of my knowledge.
						</p>

						<button className='btn btn-deep-green mt-3' onClick={requestCheck}>Proceed</button>
					</div>
				</div>
			</div>
		</>
	)
}
