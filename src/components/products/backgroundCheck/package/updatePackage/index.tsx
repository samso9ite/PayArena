import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/reducers'
import { backgroundCheckPackageGetSingleRequest, backgroundCheckPackageUpdateRequest, backgroundCheckPackageGetBaseChecksRequest, backgroundCheckPackageGetBaseChecksSubserviceRequest} from '../../../../../redux/actions/products/backgroundCheck/package'
import NotificationToast from '../../../../utils/notifToast'
import { useNavigate, useParams } from 'react-router-dom'
import { Country } from 'country-state-city'


export default function BackgroundCheckUpdatePackagePage() {

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")

    const [packageName, setPackageName] = useState("")
    const [country, setCountry] = useState("")
    const [packagePurpose, setPackagePurpose] = useState("")
    const [checkAndSubserviceValue, setCheckAndSubserviceValue] = useState<any[]>([])
    const [activeCheckValue, setActiveCheckValue] = useState("")
    const [activeCheckNameValue, setActiveCheckNameValue] = useState("")
    const [checkValue, setCheckValue] = useState<any[]>([])
    const [checkNameValue, setCheckNameValue] = useState<any[]>([])
    const [mergedCheckValue, setMergedCheckValue] = useState<any[]>([])
    const [newCheckModal, setNewCheckModal] = useState(false)
    const [subserviceValue, setSubserviceValue] = useState<any[]>([])

    const backgroundCheckUpdatePackageState = useSelector((state: RootState) => state.backgroundCheckPackageUpdateReducer);
    const backgroundCheckUpdateSinglePackageState = useSelector((state: RootState) => state.backgroundCheckPackageGetSingleReducer);
    const backgroundCheckBaseChecksState = useSelector((state: RootState) => state.backgroundCheckPackageGetBaseChecksReducer);
    const backgroundCheckSubserviceState = useSelector((state: RootState) => state.backgroundCheckPackageGetBaseChecksSubserviceReducer);

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let ref:any = useParams()?.ref

    
    useEffect(() => {
      getAllBaseChecksPackage()
      getSinglePackages(ref)
    }, [])



	let getSinglePackages = (id: string) => {
		const callback = (data: any) => {
			if (data.status) {
                setPackageName(data?.detail?.name)
                setPackagePurpose(data?.detail?.purpose)
                setCountry(data?.detail?.country)
                // setCheckValue(data?.detail?.check_type)
                setSubserviceValue(data?.detail?.no_of_checks)
                data?.detail?.check_type?.forEach((check:any) => {
                    pushCheckValue(check?.id, check?.name)
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


    let pushCheckAndSubserviceValue = (check: any, checkName:any, subservice: any) => {

        let checkAndSubserviceData: any = checkAndSubserviceValue

        var checkAndSubIdx = checkAndSubserviceData?.findIndex((typ: any) => typ?.check === check && typ?.subservice === subservice)

        if (checkAndSubIdx !== -1) {
            checkAndSubserviceData?.splice(checkAndSubIdx, 1);
            // checkAndSubserviceData?.push({ "check": check, "subservice": subservice })
        }
        else {
            checkAndSubserviceData?.push({ "check": check, "subservice": subservice })
        }
        setCheckAndSubserviceValue([...checkAndSubserviceData])


        pushCheckValue(check, checkName)
        pushSubserviceValue(subservice)

    }
    let removeCheckAndSubserviceValue = (check: any,) => {

        let checkAndSubserviceData: any = checkAndSubserviceValue

        checkAndSubserviceData?.forEach((sub:any) => {
            if (sub.check === check){
                removeSubserviceValue(sub?.subservice)
            }
        })

        var checkAndSubIdx = checkAndSubserviceData?.findIndex((typ: any) => typ?.check === check)

        if (checkAndSubIdx !== -1) {
            checkAndSubserviceData?.splice(checkAndSubIdx, 1);
        }
        setCheckAndSubserviceValue([...checkAndSubserviceData])

        removeCheckValue(check)

    }


    let pushCheckValue = (newCheck: string, newCheckName:string) => {
        // var checkData: any = checkValue

        // var checkIdx = checkData?.findIndex((typ: string) => typ === newCheck)

        // if (checkIdx !== -1) {
        //     checkData?.splice(checkIdx, 1);
        //     checkData?.push(newCheck)
        // }
        // else {
        //     checkData?.push(newCheck)
        // }
        // setCheckValue([...checkData])
        var checkData: any = checkValue
        var checkNameData: any = checkNameValue

        var checkIdx = checkData?.findIndex((typ: string) => typ === newCheck)
        var checkNameIdx = checkNameData?.findIndex((typ: any) => typ?.id === newCheck)

        if (checkIdx !== -1) {
            checkData?.splice(checkIdx, 1);
            checkData?.push(newCheck)
        }
        else {
            checkData?.push(newCheck)
        }

        if (checkNameIdx !== -1) {
            checkNameData?.splice(checkNameIdx, 1);
            checkNameData?.push({id:newCheck, name:newCheckName})
        }
        else {
            checkNameData?.push({id:newCheck, name:newCheckName})
        }

        setCheckValue([...checkData])
        setCheckNameValue([...checkNameData])
    }
    let removeCheckValue = (newCheck: string) => {
        var checkData: any = checkValue
        var checkNameData: any = checkNameValue

        var checkIdx = checkData?.findIndex((typ: any) => typ === newCheck)
        var checkNameIdx = checkNameData?.findIndex((typ: any) => typ?.id === newCheck)

        if (checkIdx !== -1) {
            checkData?.splice(checkIdx, 1);
        }
        if (checkNameIdx !== -1) {
            checkNameData?.splice(checkNameIdx, 1);
        }

        setCheckValue([...checkData])
        setCheckNameValue([...checkNameData])
        
    }


    let pushSubserviceValue = (type: string) => {
        var typeData: any = subserviceValue

        var typeIdx = typeData?.findIndex((typ: string) => typ === type)

        if (typeIdx !== -1) {
            typeData?.splice(typeIdx, 1);
        }
        else {
            typeData?.push(type)
        }
        setSubserviceValue([...typeData])
    }
    let removeSubserviceValue = (type: string) => {
        var typeData: any = subserviceValue

        var typeIdx = typeData?.findIndex((typ: string) => typ === type)

        if (typeIdx !== -1) {
            typeData?.splice(typeIdx, 1);
        }
        setSubserviceValue([...typeData])
    }


    let getAllBaseChecksPackage = () => {
        const callback = (data: any) => {
            if (!data?.status) {
                setNotifTitle('Error')
                setNotif(data?.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(backgroundCheckPackageGetBaseChecksRequest(data))
    }

    let getSubserviceData = (check: string) => {
        backgroundCheckBaseChecksState?.resp?.detail?.forEach((val:any) => {
            if (val?.id === check) {
                return (
                    setActiveCheckNameValue(val?.name)
                )
            }
        })
        const callback = (data: any) => {
            if (!data?.status) {
                setNotifTitle('Error')
                setNotif(data?.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                subservice: check,
            },
            callback,
        }
        dispatch(backgroundCheckPackageGetBaseChecksSubserviceRequest(data))
    }

    let updatePackage = () => {
        const callback = (data: any) => {
            // console.log(data)
            if (data?.status) {
                setNotifTitle('Success')
                setNotif("Package successfully updated")
                setNotifVal(true)

                setTimeout(() => navigate("/BackgroundCheck/Packages"), 2000);

            } else {
                setNotifTitle('Error')
                setNotif(data?.detail)
                setNotifVal(true)
            }
        }

        if (!packageName) {
            setNotifTitle('Error')
            setNotif('Please Enter your Package name')
            setNotifVal(true)
            return
        }
        if (!country) {
            setNotifTitle('Error')
            setNotif('Please select a country')
            setNotifVal(true)
            return
        }
        if (!packagePurpose) {
            setNotifTitle('Error')
            setNotif('Please enter a purpose of check')
            setNotifVal(true)
            return
        }
        if (!checkValue || checkValue?.length < 1) {
            setNotifTitle('Error')
            setNotif('Please select atleast one check')
            setNotifVal(true)
            return
        }
        if (!subserviceValue || subserviceValue?.length < 1) {
            setNotifTitle('Error')
            setNotif('Please select atleast one subservice')
            setNotifVal(true)
            return
        }


        let data: any = {
            values: {
                package_id:ref,
                name: packageName,
                country: country,
                purpose: packagePurpose,
                check_type: checkValue,
                check_type_attributes: subserviceValue,
            },

            callback,
        }
        dispatch(backgroundCheckPackageUpdateRequest(data))
    }


    return (
        <div className='pb-5'>
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

            {newCheckModal &&
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        {/* <span onClick={() => setNewCheckModal(false)}><i className="ri-close-line close-modal"></i></span> */}
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Add a new check</h5>
                                </div>
                                <div className="">
                                    <label htmlFor="selectCheck"> Select Check </label>
                                    <select className="form-select"  onChange={e => {getSubserviceData(e?.target?.value); setActiveCheckValue(e?.target?.value)}}>
                                        <option value="">Select Check</option>
                                        {backgroundCheckBaseChecksState?.resp?.detail?.map((val: any, k: number) => (
                                            <option key={k} value={val?.id}>{val?.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {backgroundCheckSubserviceState?.isLoading && backgroundCheckBaseChecksState?.resp?.detail?.map((val: any, k: number) => {
                                    if (val?.id === activeCheckValue) {
                                        return (
                                            <p key={k} className='mt-3'>{val?.name} Subservice is Loading ...</p>
                                        )
                                    }
                                })}

                                {((!backgroundCheckSubserviceState?.isLoading && (backgroundCheckSubserviceState?.resp?.detail?.length > 0))) &&
                                    <div className="">
                                        <label htmlFor="selectCheck"> Select Subservice </label>
                                        {backgroundCheckSubserviceState?.resp?.detail?.map((val: any, k: number) => (
                                            <div className="d-flex mt-3" key={k} >
                                                {subserviceValue?.includes(val?.endpoint) ?
                                                    <i className="ri-checkbox-line ri-lg" style={{cursor:"pointer"}}
                                                        onClick={() => pushCheckAndSubserviceValue(activeCheckValue,activeCheckNameValue, val?.endpoint)}
                                                    />
                                                    :
                                                    <i className="ri-checkbox-blank-line ri-lg" style={{cursor:"pointer"}} 
                                                        onClick={() => pushCheckAndSubserviceValue(activeCheckValue,activeCheckNameValue, val?.endpoint)}
                                                    />
                                                }
                                                {/* <input type="checkbox" value={val?.endpoint} onChange={() => pushCheckAndSubserviceValue(activeCheckValue,activeCheckNameValue, val?.endpoint)} /> */}
                                                <p className="ps-2 mb-0">{val?.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {/* {(backgroundCheckSubserviceState?.resp?.detail?.length > 0) &&
                                    <div className="">
                                        <label htmlFor="selectCheck"> Select Subservice </label>
                                        {backgroundCheckSubserviceState?.resp?.detail?.map((val: any, k: number) => (
                                            <div className="d-flex mt-3" key={k} >
                                                <input type="checkbox" value={val?.key} onChange={() => pushSubserviceValue(val?.key)} />
                                                <p className="ps-2 mb-0">{val?.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                } */}
                                <button className='btn btn-deep-green' onClick={() => setNewCheckModal(false)}>Done</button>

                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="px-4">
                <div className="table-header mt-5">
                    <div className="row">
                        <div className="col-md-5">
                            <h5>Update Package</h5>
                            <p>Update Background Check packages here.</p>
                        </div>
                    </div>
                </div>
            </div>
 
            <div className="mt-3">

                <div className="col-md-5 mx-auto">
                    <div className="">
                        <label htmlFor="packageName"> Package Name </label>
                        <input type="text" className='form-control' placeholder='Employment'
                            value={packageName} onChange={e => setPackageName(e?.target?.value)}
                        />
                    </div>
                    <div className="">
                        <label htmlFor="packageName"> Purpose of Check </label>
                        <input type="text" className='form-control' placeholder='Employment'
                            value={packagePurpose} onChange={e => setPackagePurpose(e?.target?.value)}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="packageName"> Select Country </label>
                        <select className="form-select" value={country} onChange={e => setCountry(e?.target?.value)}>
                            <option value="">Choose Country</option>
                            {Country.getAllCountries()?.map(country => (
                                <option key={country.name} value={country.isoCode}>{country.name}</option>
                            ))}
                            {/* <option value="BR">Brazil</option> */}
                        </select>
                    </div>


                    <div className="">
                        <label htmlFor="selectCheck"> Selected Check </label>

                        <div className='d-flex flex-wrap'>
                            {checkNameValue?.map((val: any, i: number) => (
                                <div key={i} className='py-1 px-2 mb-2 me-3' style={{ display: "inline-block", background: "#e9f0fc" }}>
                                    <small>{val?.name}</small>
                                    <i className='ri-close-line ms-2' onClick={() => removeCheckAndSubserviceValue(val?.id)} style={{ cursor: "pointer" }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="selectCheck"> Selected Subservice </label>

                        <div className='d-flex flex-wrap'>
                            {subserviceValue?.map((val: any, i: number) => (
                                <div key={i} className='py-1 px-2 mb-2 me-3' style={{ display: "inline-block", background: "#e9f0fc" }}>
                                    <small>{val?.replaceAll("_"," ")}</small>
                                    <i className='ri-close-line ms-2' onClick={() => removeSubserviceValue(val)} style={{ cursor: "pointer" }} />
                                </div>
                            ))}
                        </div>
                    </div>


                    <button onClick={() => setNewCheckModal(true)} className="btn btn-deep-green-outline w-100 py-2 mt-4 d-flex align-items-center justify-content-center">
                        <i className='ri-add-circle-line me-3 ri-xl' />
                        Add Another Check
                    </button>



                    <button className="btn btn-deep-green w-100 py-2 mt-4" onClick={updatePackage}>
                        {backgroundCheckUpdatePackageState?.isLoading ? (
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
                            'Update Package'
                        )}
                    </button>
                </div>

            </div>
        </div>
    )
}
