import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reducers';
import { Link, useParams } from 'react-router-dom';
import { backgroundCheckRequestReportChecklistRequest, backgroundCheckRequestReportDetailRequest } from '../../../../../redux/actions/products/backgroundCheck/request/checks';
import avatar from '../../../../../assets/avatar.png'
import NotificationToast from '../../../../utils/notifToast';
import Mainloader, { EmptyStateComp } from '../../../../utils';
import { Document, Page, pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function CandidateDetailedReportPage(props: any) {
	const [notifVal, setNotifVal] = useState(false)
	const [notif, setNotif] = useState("")
	const [notifTitle, setNotifTitle] = useState("")
	const [checks, setChecks] = useState([])

	const [PDFFile, setPDFFile] = useState('')

	const [PDFVisibility, setPDFVisibility] = useState(false);
	const [numPages, setNumPages] = useState<any>();
	const [pageNumber, setPageNumber] = useState(1);

	const reportChecklistState = useSelector((state: RootState) => state.backgroundCheckRequestReportChecklistReducer);
	const reportDetailState = useSelector((state: RootState) => state.backgroundCheckRequestReportDetailReducer);

	const dispatch = useDispatch()
	const { ref } = useParams();

	useEffect(() => {
		getReportChecklist()
	}, [])

	useEffect(() => {
		if (reportChecklistState?.resp?.detail?.length > 0) {
			getReportDetail()
		}
	}, [checks])


	let getReportChecklist = () => {
		const callback = (data: any) => {
			if (data.status) {
				setChecks(data?.detail[0]?.ids)
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
			},
			callback,
		};
		dispatch(backgroundCheckRequestReportChecklistRequest(data))
	}
	let getReportDetail = () => {
		const callback = (data: any) => {
			if (!data.status) {
				// 	setPDFFile(data?.detail[0].url)
				// 	setPDFVisibility(true)

				// }
				// else {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				request_id: ref,
				ids: checks
			},
			callback,
		};
		dispatch(backgroundCheckRequestReportDetailRequest(data))
	}

	const onPage = (type: any) => {
		var newPage: any = type ? pageNumber + 1 : pageNumber - 1
		if (newPage > numPages) {
			newPage = 1
		} else if (newPage < 1) {
			newPage = numPages
		}
		setPageNumber(newPage)
	}

	function onDocumentLoadSuccess({ numPages }: any) {
		setNumPages(numPages);
	}

	let downloadFunc = (val: string) => {
		const downloadLink = document.createElement('a')
		downloadLink.href = val
		document.body.appendChild(downloadLink)
		downloadLink.click()
		document.body.removeChild(downloadLink)
	}

	let getPdfFile = (pdf: any) => {
		setPDFFile(pdf)
	}
	// console.log(reportChecklistState)

	return (
		<div>
			{(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

			{(reportDetailState?.isLoading || reportChecklistState?.isLoading) && <Mainloader />}

			{(!reportDetailState?.isLoading || !reportChecklistState?.isLoading) &&
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
							<div className="text-end mt-3">
								<button className='btn btn-deep-green-outline me-3'
									onClick={() => props?.changePage(1)}
								> Return to Summary</button>

							</div>
						</div>
					</div>

					<div className="row mt-5">
						<div className="col-md-3">
							<div className="text-center mb-3">
								<img src={avatar} alt="" className='' width="150px" />
								<h6 className='pt-2'>{props?.name}</h6>
								<small className='p-2 rounded text-white' style={{ background: "#37b7ab" }}>{props?.email}</small>
							</div>
							<div>
								{reportChecklistState?.resp?.detail?.map((val: any, i: number) => (
									<div key={i} style={{ background: `${val?.ids === checks ? "#003241" : "#E6F8F6"}`, color: `${val?.ids === checks ? "#fff" : ""}` }}
										className="py-2 ps-3 pe-2 mt-1 rounded" onClick={() => setChecks(val?.ids)}
									>
										{val.name}
									</div>
								))}
							</div>
						</div>

						{!reportDetailState?.isLoading &&
							<>
								{(reportDetailState?.resp?.detail?.length > 0) ?
									<div className="col-md-9">
										{reportDetailState?.resp?.detail?.map((val: any, i: number) => (
											<div className="card mt-3" key={i}>
												<div className="card-header" style={{ background: "#E6F8F6" }}>
													<div className="row">
														<div className="col-md-7">
															<h6 className='mt-2'>{val?.endpoint}</h6>
														</div>
														<div className="col-md-5 text-md-end">
															<button className='btn btn-deep-green-outline me-3'
																onClick={() => downloadFunc(val?.url)}
															> Download </button>
														</div>

													</div>

												</div>
												<div className="card-body">
													{(val?.url && PDFFile !== val?.url) &&
														<div className="my-5 py">
															<EmptyStateComp title={"Report is ready"}
																ctaAction={() => getPdfFile(val?.url)}
																desc={"Click the button below to view this response"}
																ctaValue={"View Result"}
															/>
														</div>
													}

													{(val?.url && PDFFile === val?.url) &&
														<>
															<Document file={PDFFile}
																onLoadSuccess={onDocumentLoadSuccess}
																onLoadError={console.error}

															>
																<Page
																	renderAnnotationLayer={false}
																	renderTextLayer={false}
																	pageNumber={pageNumber}
																/>
															</Document>

															<div style={{ marginTop: "50px", display: "flex", }}>
																<button className="btn btn-green me-3" onClick={() => onPage(0)}>Previous</button>
																<p style={{ textAlign: "center", paddingTop: "10px" }}>
																	Page {pageNumber} of {numPages}
																</p>
																<button className="btn btn-green ms-3" onClick={() => onPage(1)}>Next</button>
															</div>
														</>
													}

													{/* {(!val?.url && !reportDetailState?.isLoading) &&
													<div className="my-5">
														<EmptyStateComp title={"No result yet"}
															ctaAction={() => { }}
															desc={"No result for this verification yet"}
															ctaValue={""}
														/>
													</div>
												} */}
												</div>
											</div>
										))}
									</div>
									:
									<div className="col-md-9">
										<div className="my-5">
											<EmptyStateComp title={"No report yet"}
												ctaAction={() => { }}
												desc={"No report here yet please check back in 24hours time"}
												ctaValue={""}
											/>
										</div>
									</div>
								}
							</>
						}
					</div>
				</>
			}


		</div>
	)
}
