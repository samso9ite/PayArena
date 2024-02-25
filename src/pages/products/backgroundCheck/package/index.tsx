import React, { useEffect, useState } from 'react'
import Mainloader, { ActiveTag, EmptyStateComp, InactiveTag } from '../../../../components/utils'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/reducers'
import { backgroundCheckPackageChangeStatusRequest, backgroundCheckPackageGetAllRequest } from '../../../../redux/actions/products/backgroundCheck/package'
import NotificationToast from '../../../../components/utils/notifToast'
// import { backgroundCheckRequestFilterRequest } from '../../../../redux/actions/products/backgroundCheck/request/general'
import { Spinner } from 'react-bootstrap'
import global from '../../../../redux/constants/global'


export default function BackgroundCheckPackagePage() {

	const [notifVal, setNotifVal] = useState(false)
	const [notif, setNotif] = useState("")
	const [notifTitle, setNotifTitle] = useState("")
	const [moreModal, setMoreModal] = useState(false)
	const [packageId, setPackageId] = useState("")
	const [searchValue, setSearchValue] = useState("")
	const [packageList, setPackageList] = useState<any[]>([])
	const [filterModal, setFilterModal] = useState(false)
	// const [filterName, setFilterName] = useState("")
	const [deactivateModal, setDeactivateModal] = useState(false)
	const [activationState, setActivationState] = useState("")

	const [status, setStatus] = useState("all")
	const [createdBy, setcreatedBy] = useState(undefined)
	const [startDate, setStartDate] = useState(undefined)
	const [endDate, setEndDate] = useState(undefined)

	const allPackageState = useSelector((state: RootState) => state.backgroundCheckPackageGetAllReducer);
	// const packageFilterState = useSelector((state: RootState) => state.backgroundCheckPackageFilterReducer);
	const deactivatePackageState = useSelector((state: RootState) => state.backgroundCheckPackageChangeStatusReducer);

	const dispatch = useDispatch()

	useEffect(() => {
		getAllPackages()
	}, [])

	let getAllPackages = () => {
		const callback = (data: any) => {
			if (data.status) {
				setPackageList(data?.detail)
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
		dispatch(backgroundCheckPackageGetAllRequest(data))
	}


	// let filterPackages = () => {
	// 	const callback = (data: any) => {
	// 		if (!data.status) {
	// 			setNotifTitle("Error")
	// 			setNotif(data.detail)
	// 			setNotifVal(true)
	// 		}
	// 	};
	// 	let data: any = {
	// 		values: {
	// 			name: filterName
	// 		},
	// 		callback,
	// 	};
	// 	dispatch(backgroundCheckRequestFilterRequest(data))
	// }


	let changePackageStatus = () => {
		const callback = (data: any) => {
			if (data.status) {
				setNotifTitle("Success")
				setNotif(`Package Sucessfully ${activationState === "deactivate" ? "Deactivated" : "Activated"}`)
				setNotifVal(true)
				getAllPackages()
				setPackageId("")
				setDeactivateModal(false)
			}
			else {
				setNotifTitle("Error")
				setNotif(data.detail)
				setNotifVal(true)
			}
		};
		let data: any = {
			values: {
				package_id: packageId,
				package_state: activationState
			},
			callback,
		};
		dispatch(backgroundCheckPackageChangeStatusRequest(data))
	}

	// let triggerSearch = (val:any) => {
	// 	allPackageState?.resp?.detail?.filter((item:any) => {
	// 		if (item?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())) { return item; }
	// 	})
	// }

	let clearFilterData = () => {
		setStartDate(undefined)
		setEndDate(undefined)
		setcreatedBy(undefined)
		setStatus("all")
	}

	let filterData = (startDate: any, endDate: any, createdBy: any, status: any, searchValue: any) => {
		let filteredData: any = allPackageState?.resp?.detail;

		if ((startDate !== undefined && endDate !== undefined) && (new Date(endDate) < new Date(startDate))) {
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
			filteredData = filteredData?.filter((val: any) => val?.status?.toString() === status);
		}

		if (searchValue !== undefined) {
			// filteredData = filteredData?.filter((val: any) => {val?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())})
			filteredData = filteredData?.filter((item: any) => {
				if (item?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())) { return item; }
			})
		}

		setPackageList(filteredData)
		// setpackageList(filteredData)
		clearFilterData()
	}


	let getPackageCreators = () => {
		let uniqueCreatedBy: any = [];

		for (const val of allPackageState?.resp?.detail) {
			if (!uniqueCreatedBy?.includes(val?.created_by)) {
				uniqueCreatedBy?.push(val?.created_by);
			}
		}

		return uniqueCreatedBy
	}

	let copyFunc = (val: any) => {
		navigator.clipboard.writeText(val)
		setNotifTitle('Success')
		setNotif(`Your general request link has been copied`)
		setNotifVal(true)
	}

	return (
		<div>
			{notif && notifVal && (
				<NotificationToast
					title={notifTitle}
					message={notif}
					closeNotif={() => setNotifVal(!notifVal)}
				/>
			)}

			{filterModal &&
				<div className="main-modal report-filter-modal">
					<div className="main-modal-content package-filter-card card col-md-7 col-lg-4 mx-auto" >
						<span
							onClick={() => { setFilterModal(false); clearFilterData() }}>
							<i className="ri-close-line close-modal"></i>
						</span>

						<div className="card-body">
							<div className="main-modal-body">
								<div className="main-modal-header col-md-7 col-lg-4">
									<h5>Filter Packages</h5>
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
											{getPackageCreators()?.map((val: any, k: number) => (
												<option key={k} value={val}>{val}</option>
											))}
										</select>
									</div>
									<div className="">
										<label htmlFor="selectStatus"> Status </label>
										<div className="input-group align-items-center">
											<input type="radio" className='' checked={status === "all" ? true : false}
												name="status" value="all" onChange={(e: any) => setStatus(e?.target?.value)}
											// name="status" value="true" onChange={(e) => console.log(e.target.value)} 
											/>
											<p className='mt-3 ms-2'>
												All
											</p>
										</div>
										<div className="input-group align-items-center">
											<input type="radio" className='' checked={status === "true" ? true : false}
												name="status" value="true" onChange={(e: any) => setStatus(e?.target?.value)}
											// name="status" value="true" onChange={(e) => console.log(e.target.value)} 
											/>
											<p className='mt-3 ms-2'>
												Active
											</p>
										</div>
										<div className="input-group align-items-center">
											<input type="radio" className='' checked={status === "false" ? true : false}
												name="status" value="false" onChange={(e: any) => setStatus(e?.target?.value)}
											/>
											<p className='mt-3 ms-2'>Inactive</p>
										</div>
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



			{deactivateModal &&
				<div className="main-modal">
					<div className="main-modal-content card col-md-5 col-lg-3 mx-auto" >

						<div className="card-body">
							<div className="main-modal-body icon-modal-body text-center">

								<div className='mt-3'>
									<h5>Are you sure ?</h5>
									<p>This package will be {activationState === "deactivate" ? "deactivated" : "activated"} </p>

									<button
										className="btn btn-deep-green w-100"
										disabled={deactivatePackageState?.isLoading}
										onClick={changePackageStatus}
									>
										{deactivatePackageState?.isLoading ? (
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
									<button className='btn btn-deep-green-outline w-100 mt-2' onClick={() => setDeactivateModal(false)}>No</button>

								</div>
							</div>
						</div>
					</div>
				</div>
			}

			{(allPackageState?.isLoading) && (<Mainloader />)}


			{(!allPackageState?.isLoading) &&
				<div className="container-fluid px-md-4 mt-4">
					<div className="table-header">
						<div className="row">
							<div className="col-md-4">
								<div className="pb-2">
									<h5>Packages</h5>
									<p>Create and edit Background Check packages here</p>
								</div>
							</div>
							<div className="col-md-8">
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
										<Link to="/BackgroundCheck/Packages/Create-Package">
											<button className='btn btn-green' style={{ padding: "13px" }}>Create new package</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>

					{((packageList?.length > 0)) ?
						<div className='py-5 package-card-area'>
							<div className="row">
								<div className="col-md-3 mt-4">
									<Link to="/BackgroundCheck/Packages/Create-Package" className='link'>
										<div className="card border-0 shadow text-center package-create-card" style={{ minHeight: "308px" }}>
											<i className="ri-add-line" />
											<button className='btn btn-deep-green w-75 mt-2 mx-auto'>
												Create New Package
											</button>
										</div>
									</Link>
								</div>

								{packageList?.map((val: any, index: number) => (
									<div className="col-md-3 mt-4" key={index}>
										<div className="card border-0 shadow">
											<div className="card-header border-0  pb-2 py-3">
												<div className="row">
													<div className="col-10">
														<h6>{val?.name}</h6>
													</div>
													<div className="col-2">
														<div className="position-relative">
															<button className='btn btn-view p-0 ms-auto' onClick={() => { setPackageId(val?.id); setMoreModal(!moreModal) }}>
																<i className='ri-more-2-fill me-2 ri-xl' />
															</button>
															{(moreModal && val?.id === packageId) &&
																<div className="position-absolute top-0 end-100" style={{ width: "200px", content: "" }}>
																	<div className="card shadow rounded-0 border-0">
																		<div className="card-body">
																			{val?.status &&
																				<Link to={`/BackgroundCheck/Requests/Initiate?ref=${packageId}`} className='link'>
																					<p className=''>Initiate a check</p>
																				</Link>
																			}
																			<Link to={`/BackgroundCheck/Packages/Update-Package/${packageId}`} className='link'>
																				<p className=''>Edit package</p>
																			</Link>
																			{val?.status &&
																				<p style={{ cursor: "pointer", fontSize:"13px"  }} onClick={() => { setActivationState("deactivate"); setDeactivateModal(true); setMoreModal(false) }}>
																					Deactivate Package
																				</p>
																			}
																			{!val?.status &&
																				<p style={{ cursor: "pointer", fontSize:"13px" }} onClick={() => { setActivationState("activate"); setDeactivateModal(true); setMoreModal(false) }}>
																					Activate Package
																				</p>
																			}
																			<p style={{ cursor: "pointer", fontSize:"13px" }}
																				onClick={() => { copyFunc(global.appBaseUrl + `BackgroundCheck/Requests/Accept?packageRef=${packageId}`); setMoreModal(false) }}
																			>
																				Copy general request link
																			</p>
																		</div>
																	</div>
																</div>
															}
														</div>
													</div>
												</div>

												<p className='p-0 m-0 add-2line-ellipsis' style={{fontSize:"13px"}}>{val?.purpose}</p>

												{/* <p className='p-0 m-0' style={{ fontSize: "13px" }}>
													Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis recusandae
												</p> */}
											</div>
											<div className="card-body">
												<div className='package-spec-area'>
													<div className="package-spec">
														{val?.checks.map((newVal: any, k: number) => (
															<span className="">
																<i className="ri-checkbox-circle-fill me-2" />
																<p>{newVal}</p>
															</span>
														))}
													</div>
												</div>
												{val?.status &&
													<Link to={`/BackgroundCheck/Requests/Initiate?ref=${packageId}`} className='btn btn-deep-green w-100 my-2'style={{paddingTop:"10px"}}>
														Initiate Request
														{/* <p className='pt-2 m-0' style={{fontFamily:"S-bold"}}>Initiate Request</p> */}
													</Link>
												}
												{/* <button className='btn btn-deep-green w-100 my-2'>
													Initiate Request
												</button> */}
											</div>
										</div>
									</div>

								))}
							</div>
						</div>
						:
						<div className="my-5 py">
							<EmptyStateComp title={"No Package found"}
								ctaAction={() => { }}
								desc={"All your package will appear here when you have one"}
								ctaValue={""}
							/>
						</div>

					}
				</div>
			}
		</div>
	)
}
