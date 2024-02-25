import React, { useEffect, useState } from 'react'
import NotificationToast from '../../../../../utils/notifToast'
import { backgroundCheckRequestConsentRequest, backgroundCheckRequestInitiateRequest } from '../../../../../../redux/actions/products/backgroundCheck/request/general'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import { RootState } from '../../../../../../redux/reducers'
import { backgroundCheckRequestCreateCandidateFormRequest, backgroundCheckRequestGetCandidateFormRequest, backgroundCheckRequestValidateCandidateFormRequest } from '../../../../../../redux/actions/products/backgroundCheck/request/checks'
import { useNavigate } from 'react-router-dom'
import Mainloader, { EmptyStateComp } from '../../../../../utils'

export default function BackgroundCheckConsentPage() {
	const [notifVal, setNotifVal] = useState(false)
	const [notif, setNotif] = useState("")
	const [notifTitle, setNotifTitle] = useState("")
	const [signature, setSignature] = useState("")
	const [signatureDate, setSignatureDate] = useState(new Date().toJSON().slice(0, 10))
	const [consentPage, setConsentPage] = useState(1)
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [activeReqId, setActiveReqId] = useState("")
	const [activeOrgId, setActiveOrgId] = useState("")
	const [activeOrgName, setActiveOrgName] = useState("")


	// const consentState = useSelector((state: RootState) => state.backgroundCheckRequestConsentReducer)
	// const candidateFormState = useSelector((state: RootState) => state.backgroundCheckRequestGetCandidateFormReducer)

	const consentState = useSelector((state: RootState) => state.backgroundCheckRequestConsentReducer)
	const candidateFormState = useSelector((state: RootState) => state.backgroundCheckRequestGetCandidateFormReducer)
	const validateFormState = useSelector((state: RootState) => state.backgroundCheckRequestValidateCandidateFormReducer)
	const createFormState = useSelector((state: RootState) => state.backgroundCheckRequestCreateCandidateFormReducer)


	const queryParams = new URLSearchParams(window.location.search)
	let packageId = queryParams.get('packageRef') || ""
	let requestId = queryParams.get("request_id") || ""
	let orgId = queryParams.get("orginisation_id") || ""
	let orgName = queryParams.get("organisation_name") || ""

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (requestId) {
			getCandidateForm(requestId,orgId,orgName)
		}

		if (packageId) {
			validatePackage()
		}

	}, [])


	let getCandidateForm = (reqId:string, orgIdd:string, orgNamee:string) => {
		const callback = (data: any) => {
			if (data.status) {
				setActiveReqId(reqId)
				setActiveOrgId(orgIdd)
				setActiveOrgName(orgNamee)
				setSignature(data?.detail?.name)
				if (data?.detail?.consent) {
					navigate(`/BackgroundCheck/Requests/Candidate-Form?ref=${reqId}&organization=${orgId}`)
				}
				else{
					setConsentPage(2)
				}
			}
			else {
				setConsentPage(3)
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				form_id: reqId,
			},
			callback,
		};
		dispatch(backgroundCheckRequestGetCandidateFormRequest(data))

	}


	let validatePackage = () => {
		const callback = (data: any) => {
			if (!data.status) {
				setConsentPage(3)
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)

			}
		};
		let data: any = {
			values: {
				package_id: packageId,
			},
			callback,
		};
		dispatch(backgroundCheckRequestValidateCandidateFormRequest(data))
	}


	let createCandidateForm = () => {
		let email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;
		if (!firstName) {
			setNotifTitle('Error')
			setNotif("Please input your first name")
			setNotifVal(true)
			return
		}
		if (!lastName) {
			setNotifTitle('Error')
			setNotif("Please input your last name")
			setNotifVal(true)
			return
		}
		if (!email) {
			setNotifTitle('Error')
			setNotif("Please input your email")
			setNotifVal(true)
			return
		}
		if(!email_reg.test(email)){
			setNotifTitle('Error')
			setNotif("Invalid email address")
			setNotifVal(true)
			return
		}

		const callback = (data: any) => {
			if (data.status) {
				getCandidateForm(data?.detail?.request_id, data?.detail?.organisation, data?.detail?.organisation_name)
				setSignature(`${firstName} ${lastName}`)
			}
			else {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				full_name: `${firstName} ${lastName}`  ,
				email: email,
				package_id: packageId

			},
			callback,
		};
		dispatch(backgroundCheckRequestCreateCandidateFormRequest(data))
	}

	// let getCandidateForm = () => {

	// 	const callback = (data: any) => {
	// 		if (data.status) {
	// 			setSignature(data?.detail?.name)
	// 			if (data?.detail?.consent) {
	// 				navigate(`/BackgroundCheck/Requests/Candidate-Form?ref=${requestId}&organization=${orgId}`)
	// 			}
	// 		}
	// 		else {
	// 			setNotifTitle("Error")
	// 			setNotif(data.detail)
	// 			setNotifVal(true)
	// 		}
	// 	};
	// 	let data: any = {
	// 		values: {
	// 			form_id: requestId,
	// 		},
	// 		callback,
	// 	};
	// 	dispatch(backgroundCheckRequestGetCandidateFormRequest(data))
	// }

	let signConsent = () => {
		let bioData = {
			first_name: firstName,
			last_name: lastName,
			email: email,
		}
		if (!signature) {
			setNotifTitle('Error')
			setNotif("Please put in your signature in the form")
			setNotifVal(true)
			return
		}
		if (!signatureDate) {
			setNotifTitle('Error')
			setNotif("Please input the date")
			setNotifVal(true)
			return
		}

		const callback = (data: any) => {
			if (data.status) {
				setNotifTitle("Success")
				setNotif("Successfully consented to this terms and condition")
				setNotifVal(true)

				setTimeout(() => {
					// navigate(`/BackgroundCheck/Requests/Candidate-Form?ref=${requestId}&organization=${orgId}`, { state:bioData })
					navigate(`/BackgroundCheck/Requests/Candidate-Form?ref=${activeReqId}&organization=${orgId}`, { state:bioData })
				}, 2000);
			}
			else {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				request_id: activeReqId,
				organisation: activeOrgId,
				full_name: signature,
				date: signatureDate

			},
			callback,
		};
		dispatch(backgroundCheckRequestConsentRequest(data))
	}

	return (
		<div>
			{(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

			<div className="text-white py-4 mb-5" style={{ background: "#003E51" }}>
				<div className="container">
					<h5>Complete A Background Check</h5>
				</div>
			</div>

			{candidateFormState?.isLoading && <Mainloader />}

			{!candidateFormState?.isLoading &&
				<div className="container">
					{consentPage === 1 &&
						<div className="col-md-6 mx-auto">
							<h5>Candidate Form</h5>
							<p>Please fill in this info to be able to continue with this form</p>
							<div className="">
								<label htmlFor="firstName"> First Name </label>
								<input type="text" className='form-control' placeholder='John'
									value={firstName} onChange={e => setFirstName(e?.target?.value)}
								/>
							</div>
							<div className="">
								<label htmlFor="lastName"> Last Name </label>
								<input type="text" className='form-control' placeholder='Doe'
									value={lastName} onChange={e => setLastName(e?.target?.value)}
								/>
							</div>
							<div className="">
								<label htmlFor="packageName"> Email </label>
								<input type="email" className='form-control' placeholder='name@mail.com'
									value={email} onChange={e => setEmail(e?.target?.value)}
								/>
							</div>
							<button className='btn btn-deep-green mt-3 px-5 mb-5' onClick={createCandidateForm}>
								{createFormState?.isLoading ? (
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
									'Proceed'
								)}
							</button>
						</div>
					}

					{consentPage === 2 &&
						<>
						<h5>Consent</h5>
	
						<p>
							I, the undersigned, hereby authorize {orgName} to which I have applied for a
							position, to obtain a background screening report on me in order to verify my
							particulars as provided in my curriculum vitae and/or any other application/supporting
							documents for the purpose of my application/employment by and through the Company’s service
							provider, Prembly Inc (“Prembly”) and its agents and authorized representatives,
							in accordance with the Company’s Data Privacy and Prembly’s Privacy Policy.
						</p>
	
						<ol>
							<li>
								<p>
									I confirm that I have read and understood the Company’s Data Privacy and Prembly’s Privacy Policy.
								</p>
							</li>
							<li>
								<p>
									The above-mentioned employment background screening report will include job related information,
									such as identity, education history, professional qualifications and memberships, criminal history,
									employment history, work references, credit history, driving records, right to work verifications,
									tax compliance and other applicable public record information including any relevant information t
									hat may necessary to inform my employment.
								</p>
							</li>
							<li>
								<p>
									I hereby declare that l understand and will cooperate with persons conducting the screening and to assist
									in case more information is required or when approaching my referees, former employer(s), educational
									establishments, government agencies and any other relevant entities.
								</p>
							</li>
							<li>
								<p>
									I further authorize all current or previous employers to discuss my relevant personal and employment
									history with Prembly with consent to release of such information orally or in writing, and hereby release
									them from all liability. Further, I understand and agree that Prembly is relying on the information provided
									to it by my past employers/relevant sources and is not responsible or liable for accuracy or completeness of
									the information provided to it from such sources.
								</p>
							</li>
							<li>
								<p>
									I further authorize the Company and Prembly to share and/or disclose a copy of this authorization to any
									person(s), educational establishment(s), former employer(s), business entity(ies), private data source(s)
									or government/public body(s) (“Third Party”) and for this authorization to act as my specific consent to
									any such Third Party for the disclosure to the Company/ Prembly of any personal data about me.
								</p>
							</li>
							<li>
								<p>
									I hereby release the Company, Prembly and any Third Parties from any claims, costs, expenses or rights
									of action of any kind whatsoever (“Claims”) which I (or others on my behalf) may have against the Company
									and/or Prembly arising directly or indirectly out of/or in connection with the provision of the employment
									background screening report, save where such Claim arises directly as a result of the gross negligence of
									the Company or Prembly.
								</p>
							</li>
							<li>
								<p>
									I understand and consent to my information/details may be collected, stored, retained or processed anywhere
									in the world and not necessarily within the Republic of Kenya.
								</p>
							</li>
							<li>
								<p>
									This authorization given in this Consent Form expires automatically if my application is rejected or
									following termination of my employment with the Company in the event that my application is unsuccessful.
								</p>
							</li>
							<li>
								<p>
									Further, I understand and consent to Prembly sharing its findings/report with the company via electronic
									medium or otherwise; and that the Prembly may retain the information contained in the said findings and/or
									report and any update thereto without any restrictions, reservation, or expiration subject to expiration
									terms in Clause 6 above.
								</p>
							</li>
							<li>
								<p>
									Finally, I certify that the information provided in my application for employment is true and correct and
									that my job application and/or employment might be terminated based on any false or misleading information
									subject to local law provisions and jurisdiction.
								</p>
							</li>
							<li>
								<p>
									I confirm that this is my willful, express, unequivocal, free, specific and informed indication consent and
									authorization.
								</p>
							</li>
						</ol>

					{/* <p>
						I, the undersigned, hereby authorise {orgName} to which I have applied for a
						position, to obtain a background screening report on me in order
						to verify my particulars as provided in my curriculum vitae and self-declaration form
						for the purpose of my application by and through the Company’s service provider, Prembly
						International Limited hereinafter referred to as Prembly, in accordance with the Company’s
						Data Privacy and Prembly Privacy Policy.The above mentioned report will include information,
						such as {"list_of_checks"} and other applicable public record information.I further authorise
						the Company and Prembly to disclose a copy of this authorisation to any person(s), educational
						establishment(s), former employer(s), business entity(ies) or public body(s) (“Third Party”)
						shown on my curriculum vitae and self-declaration form and for this authorisation to act as
						my specific consent to any such Third Party for the disclosure to the Company/ Prembly of
						any personal data about me.I hereby release the Company, Prembly and any Third Parties from
						any claims, costs, expenses or rights of action of any kind whatsoever (“Claims”) which I
						(or others on my behalf) may have against the Company or Prembly arising directly or indirectly
						out of or in connection with the provision of the pre-employment background screening report,
						save where such Claim arises directly as a result of the gross negligence or intent of the Company
						or Prembly. This authorization given in this Consent Form expires automatically if my application is
						rejected or following termination of my employment with the Company in the event that my application
						is successful.I certify that the information provided in my application for employment is true and
						correct and that my job application and /or employment might be terminated based on any false or
						misleading information subject to local law provisions and jurisdiction.Payments rendered to Prembly
						International Ltd shall not be refundable under any circumstances, if the checks have already been
						conducted.
					</p> */}
					<div className='pt-4'>
						<h5>Requested Checks</h5>
						{candidateFormState?.resp?.detail && Object?.keys(candidateFormState?.resp?.detail?.form)?.reverse()?.map((val: any, i: number) => (
							<div key={i} className='mt-3'>
								<p className='p-0 m-0'>
									{val[0]?.toUpperCase() + val?.replaceAll("_", " ")?.slice(1)}
								</p>
							</div>
						))}
						{/* <p>Identity</p> */}
					</div>

					<div className="col-md-4 mt-1">
						<label htmlFor="signature">Signature (Type in your name)</label>
						<input type="text" className='form-control' value={signature} placeholder='John Doe'
							onChange={e => setSignature(e.target.value)}
						/>
					</div>
					<div className="col-md-4 mt-1">
						<label htmlFor="date">Date</label>
						<input type="date" className='form-control' value={signatureDate}
							min={new Date().toJSON().slice(0, 10)}
							max={new Date().toJSON().slice(0, 10)}
							onChange={e => setSignatureDate(e.target.value)}
						/>
					</div>
					<button className='btn btn-deep-green mt-3 px-5 mb-5' onClick={signConsent}>
						{consentState?.isLoading ? (
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
							'Proceed'
						)}
					</button>
						</>
					}

					{consentPage === 3 &&
						<>
							<EmptyStateComp
								title={'Form Error'}
								ctaAction={() => {}}
								desc={candidateFormState?.error || validateFormState?.error || 'You are most likely seeing this error because you have entered an invalid link. Please reconfirm your link'}
								ctaValue={''}
							/>
						</>
					}
				


				</div>
			}
		</div>
	)
}
