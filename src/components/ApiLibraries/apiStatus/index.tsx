import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import { identitypassEndpointsRequest } from '../../../redux/actions/products/identitypass/verification'
import { RootState } from '../../../redux/reducers'
import Mainloader, { InvalidAccessRightComp, OfflineTag, OnlineTag, PartialTag } from '../../utils'

export default function ApiStatusComp(props:any) {
	const endpointsState = useSelector((state: RootState) => state.identitypassEndpointsReducer);

	const [notifVal, setNotifVal] = useState(false)
	const [notif, setNotif] = useState("")
	const [notifTitle, setNotifTitle] = useState("")

	const [countryCode, setCountryCode] = useState("NG")
	const [filteredEndpoints, setFilteredEndpoints] = useState([])

	const dispatch = useDispatch()

	useEffect(() => {
		getEndpoints()
	}, [])

	let getEndpoints = () => {
		const callback = (data: any) => {
			if (data.status) {
				setNotifTitle("Success")
				setNotif(data.detail)
				setNotifVal(true)
				getFilteredEndp("NG", data?.data)
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
		dispatch(identitypassEndpointsRequest(data))
	}

	let getFilteredEndp = (code: string, mainData: any) => {
		setFilteredEndpoints(
			mainData?.filter((endp: any) => endp?.country_code === code)
		)
	}

	let getCountryCodes = (data: any) => {
		const uniqueKeys: any = [];

		const unique = data?.filter((element: any) => {
			const isDuplicate = uniqueKeys.includes(element.country_code)
			if (!isDuplicate) {
				uniqueKeys.push(element.country_code);
				return true;
			}
			return false;
		});
		return unique
	}

	return (
		<div>
			{(endpointsState?.isLoading) && <Mainloader />}

			{(!endpointsState?.isLoading) &&
				<div className='container-fluid px-md-4'>
					<div className="main-table-area mt-5">
						<div className="table-header">
							<div className="row">
								<div className="col-md-5">
									<h5>API Status</h5>
									<p>Realtime availability status of all our endpoints</p>
								</div>
							</div>
						</div>
					</div>
					{(props?.userRights?.includes("STATUS")) ?
						<div className="sub-tabs mt-3">
							<ul className='d-flex p-0'>
								{getCountryCodes(endpointsState?.resp?.data)?.map((val: any, i: number) => (
									<li className='nav-tabs link me-1' style={{ border: "none" }} key={i}
										onClick={() => {
											getFilteredEndp(val?.country_code, endpointsState?.resp?.data)
											setCountryCode(val?.country_code)
										}}
									>
										<h6 className={`${val?.country_code === countryCode ? "active" :""} nav-link px-3 py-2`}>{val?.country}</h6>
									</li>
								))}
							</ul>

							<div className="table-responsive mt-3">
								<table className="table">
									<thead className="">
										<tr>
											<th scope="col">Endpoint</th>
											<th scope="col">Status</th>
											<th scope="col">Time Updated</th>
										</tr>
									</thead>
									<tbody>
										{filteredEndpoints?.map((endp: any, i: number) => {
											if (countryCode === endp.country_code) {
												return (
													<tr key={i}>
														<th scope="row">{endp?.name}</th>
														<td>
															{
																endp?.endpoint_status === "UP" ? <OnlineTag />
																	:
																	endp?.endpoint_status === "PARTIAL" ? <OfflineTag />
																		:
																		endp?.endpoint_status === "DOWN" ? <OfflineTag /> : ""
															}
														</td>
														<td>
															<Moment>{endp?.updated_at}</Moment>
														</td>
													</tr>
												)
											}
										})}
										{/* <tr>
										<th scope="row">Phone Number Basic</th>
										<td><ActiveTag/></td>
										<td> 21/12/2022 4:02PM</td>
									</tr> */}
									</tbody>
								</table>
							</div>
						</div>
						:
						<InvalidAccessRightComp />
					}
				</div>
			}



		</div>
	)
}
