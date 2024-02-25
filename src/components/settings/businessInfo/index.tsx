import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { organisationInfoRequest, updateOrganisationInfoRequest } from '../../../redux/actions/settings/organisationInfo';
import { RootState } from '../../../redux/reducers';
import NotificationToast from '../../utils/notifToast';
import cancelImg from '../../../assets/cancel-img.png'
import Mainloader, { removeLetters } from '../../utils';
import { Country, State } from 'country-state-city';
import { emailValidator } from '../../utils/emailValidator';
import { isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js'

// Import Interfaces`
// import { ICountry, IState, ICity } from 'country-state-city'


export default function BusinessInfo(props:any) {

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")

    const [busName, setBusName] = useState("")
    const [busEmail, setBusEmail] = useState("")
    const [busPhoneNo, setBusPhone] = useState("")
    const [address, setAddress] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [regCountry, setRegCountry] = useState("")
    const [countryStates, setCountryStates] = useState([])
    const [busState, setBusState] = useState("")
    const [busRegNo, setBusRegNo] = useState("")
    const [tin, setTin] = useState("")
    const [busWebsite, setBusWebsite] = useState("")
    const [busCert, setBusCert] = useState("")
    const [initBusCert, setInitBusCert] = useState("")
    const [busCertSize, setBusCertSize] = useState(0)
    const [busCertType, setBusCertType] = useState("")
    const [dirName, setDirName] = useState("")
    const [dirEmail, setDirEmail] = useState("")
    const [dirAddress, setDirAddress] = useState("")
    const [dirCard, setDirCard] = useState("")
    const [initDirCard, setInitDirCard] = useState("")
    const [dirCardSize, setDirCardSize] = useState(0)
    const [dirCardType, setDirCardType] = useState("")


    const [certModal, setCertModal] = useState(false)
    const [docName, setDocName] = useState("")
    const [doc, setDoc] = useState("")
    const [previewBusImg, setPreviewBusImg] = useState("")
    const [previewDirImg, setPreviewDirImg] = useState("")


    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer);
    const updateOrganisationInfoState = useSelector((state: RootState) => state.updateOrganisationInfoReducer);

    const dispatch = useDispatch()

    let validateEmail = emailValidator(busEmail.toLowerCase())

    useEffect(() => {
        getOrgInfo()
    }, [])

    let getOrgInfo = () => {
        const callback = (data: any) => {
            if (data.status) {
                passCountryData(data?.data?.organisation?.country_code)

                setBusName(data?.data?.organisation?.name)
                setBusEmail(data?.data?.organisation?.official_email)
                setBusPhone(data?.data?.organisation?.official_phone)
                setAddress(data?.data?.organisation?.address)
                setRegCountry(data?.data?.organisation?.country)
                setBusState(data?.data?.organisation?.state)
                setBusRegNo(data?.data?.organisation?.business_number)
                setTin(data?.data?.organisation?.tin)
                setBusWebsite(data?.data?.organisation?.website)
                setInitBusCert(data?.data?.organisation?.business_document)
                setDirName(data?.data?.organisation?.director_name)
                setDirEmail(data?.data?.organisation?.director_email)
                setDirAddress(data?.data?.organisation?.director_address)
                setInitDirCard(data?.data?.organisation?.director_id_card)


                setNotifTitle("Success")
                setNotif(data.detail)
                setNotifVal(true)
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
        dispatch(organisationInfoRequest(data))
    }

    let updateBusInfo = () => {
        let country_code: any = countryCode || organisationInfoState?.resp?.data?.organisation?.country_code

        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle("Success")
                setNotif("Business info successfully updated ")
                setNotifVal(true)
                getOrgInfo()
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        

        if(!busName || !address || !busState || !busPhoneNo || !busRegNo || !busWebsite || !tin || !initBusCert ||!dirName
            || !dirEmail || !dirAddress || !initDirCard
        ){
            setNotifTitle("Error")
            setNotif("Please fill in all fields")
            setNotifVal(true)
            return
        }
        // if(!validateEmail.status) {
        //     setNotifTitle("Error")
        //     setNotif(validateEmail.message)
        //     setNotifVal(true)
        //     return
        // }
        if(!isPossiblePhoneNumber(busPhoneNo, country_code ) || !isValidPhoneNumber(busPhoneNo, country_code) ||
            validatePhoneNumberLength(busPhoneNo, country_code) === 'TOO_SHORT' || 
            validatePhoneNumberLength(busPhoneNo, country_code) === 'TOO_LONG' 
        ){
            setNotifTitle("Error")
            setNotif("Invalid Mobile Number format")
            setNotifVal(true)
            return
        }
        if(busCertSize > 1500000 ){
            setNotifTitle("Error")
            setNotif("Business certificate is too big")
            setNotifVal(true)
            return
        }
        if((busCertType && busCertType !== "image/jpg") && (busCertType && busCertType !== "image/jpeg") && (busCertType && busCertType !== "image/png") ){
            setNotifTitle("Error")
            setNotif("Unsupported Business certificate Format")
            setNotifVal(true)
            return
        }
        if(dirCardSize > 1500000 ){
            setNotifTitle("Error")
            setNotif("Director's ID Card is too big")
            setNotifVal(true)
            return
        }
        if((dirCardType && dirCardType !== "image/jpg") && (dirCardType && dirCardType !== "image/jpeg") && (dirCardType && dirCardType !== "image/png") ){
            setNotifTitle("Error")
            setNotif("Unsupported Director's Identity Card Format")
            setNotifVal(true)
            return
        }

        // if(busPhoneNo?.includes("+")){
        //     setNotifTitle("Error")
        //     setNotif('Remove "+" from Mobile Number')
        //     setNotifVal(true)
        //     return
        // }

        let data: any = {
            values: {
                name: busName,
                address: address || "",
                state: busState || "",
                // country: regCountry,
                official_phone: busPhoneNo || "",
                // official_email: busEmail,
                business_number: busRegNo || "",
                website: busWebsite || "",
                tin: tin || "",
                business_document: busCert || "",
                director_name: dirName || "",
                director_email: dirEmail || "",
                director_address: dirAddress || "",
                director_id_card: dirCard || ""
            },

            callback,
        };
        dispatch(updateOrganisationInfoRequest(data))
    }


    let passCountryData = (code: any) => {
        setCountryCode(code)
        Country?.getAllCountries()?.map((val: any) => {
            if (val.isoCode === code) {
                setRegCountry(val.name)
            }
        })

        let stateData:any = State.getStatesOfCountry(code)
        setCountryStates(stateData)
    }

    let imageHandler = (img:any,type:any) => {
        if (img.target.files.length > 0) {
            if(type === "busCert"){
                setPreviewBusImg(URL.createObjectURL(img.target.files[0]));
            }
            else{
                setPreviewDirImg(URL.createObjectURL(img.target.files[0]));
            }
        }
    }


    let updateDoc = (img:any, type:string) => {
        var file = img.target.files[0]
        let reader:any = new FileReader()
        reader.readAsDataURL(file)
        if (type === "busCert") {
            reader.onload = () => {
                setBusCert(reader.result)
                setInitBusCert(reader.result)
            };
            setBusCertSize(file?.size)
            setBusCertType(file?.type)
        }
        else{
            reader.onload = () => {
                setDirCard(reader.result)
                setInitDirCard(reader.result)
            };
            setDirCardSize(file?.size)
            setDirCardType(file?.type)
        }

    }

    return (
        <div>
            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

            {organisationInfoState?.isLoading ? props.changeLoadingState(true) : props.changeLoadingState(false)}

            {certModal &&
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span onClick={() => {
                            setCertModal(false)
                            setDocName("")
                            setDoc("")
                        }}><i className="ri-close-line close-modal"></i></span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>{docName}</h5>
                                </div>
                                <img src={doc} alt="" className='w-100' />

                            </div>
                        </div>
                    </div>
                </div>
            }


            {!organisationInfoState?.isLoading &&
                <>
                    <div className="table-header mt-4">
                        <div className="row">
                            <div className="col-md-8">
                                <h5>Business Information</h5>
                                <p>Access and edit your required business details </p>
                            </div>
                            <div className="col-md-4 text-end">
                                {organisationInfoState?.resp?.data?.organisation?.verification_status === "PENDING" &&
                                    <button className="btn btn-warning ms-auto px-4 py-2">
                                        Pending
                                    </button>
                                }
                                {organisationInfoState?.resp?.data?.organisation?.verification_status === "AWAITING" &&
                                    <button className="btn btn-info ms-auto px-4 py-2">
                                        Awaiting
                                    </button>
                                }
                                {organisationInfoState?.resp?.data?.organisation?.verification_status === "APPROVED" &&
                                    <button className="btn btn-success ms-auto px-4 py-2">
                                        Verified
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='py-5' >
                        <div className=''>
                            <h5>Business Details</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="busName">Business Name <span style={{color:"red"}}> *</span></label>
                                    <input type="text" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.name}
                                        onChange={name => setBusName(name.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="busEmail">Business email</label>
                                    <input type="email" className="form-control"
                                        disabled
                                        value={organisationInfoState?.resp?.data?.organisation?.official_email}
                                        // value={busEmail}
                                        readOnly
                                        onChange={email => setBusEmail(email.target.value.toLowerCase())}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="text">Country of Registration <span style={{color:"red"}}> *</span></label>
                                    <select name="" id="" className="form-select" defaultValue={organisationInfoState?.resp?.data?.organisation?.country_code}
                                        disabled
                                        onChange={country => {
                                            // setRegCountry(country.target.value)
                                            passCountryData(country.target.value)
                                        }}
                                    >
                                        <option value="">Select Country <span style={{color:"red"}}> *</span></option>
                                        {Country.getAllCountries()?.map(country => (
                                            <option key={country.name} value={country.isoCode}>{country.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="state">State <span style={{color:"red"}}> *</span></label>
                                    <select name="" id="" className="form-select" value={busState}
                                        onChange={busState => setBusState(busState.target.value)}
                                        // disabled={!regCountry ? true : false}
                                    >
                                        <option value="">Select State</option>
                                        {countryStates?.map((sta: any, index) => (
                                            <option key={index} value={sta?.name}>{sta?.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="busPhone">Business Phone Number <span style={{color:"red"}}> *</span></label>
                                    <input type="text" className="form-control"
                                        value={busPhoneNo}
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.official_phone}
                                        onChange={phone => setBusPhone(removeLetters(phone.target.value))}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label htmlFor="busAddress">Business Address <span style={{color:"red"}}> *</span></label>
                                    <input type="email" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.address}
                                        // value={address}
                                        onChange={address => setAddress(address.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="busRegNumber">Business Registration Number <span style={{color:"red"}}> *</span></label>
                                    <input type="text" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.business_number}
                                        // value={busRegNo}
                                        onChange={regNo => setBusRegNo(regNo.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="tin">Tax Identification Number <span style={{color:"red"}}> *</span></label>
                                    <input type="text" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.tin}
                                        // value={tin}
                                        onChange={tin => setTin(tin.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="busWeb">Business Website <span style={{color:"red"}}> *</span></label>
                                    <input type="url" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.website}
                                        // value={busWebsite}
                                        onChange={web => setBusWebsite(web.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="busEmail">Business sector</label>
                                    <input type="email" className="form-control"
                                        disabled
                                        value={organisationInfoState?.resp?.data?.organisation?.sector}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="busCert">Business Certificate <span style={{color:"red"}}> *</span></label>
                                    {!initBusCert ?
                                        <div className="file-input-area p-2">
                                            <div className="">
                                                <input type="file"
                                                    accept="image/png, image/jpg, image/jpeg"
                                                    onChange={(doc: any) => {
                                                        imageHandler(doc,"busCert")
                                                        updateDoc(doc,"busCert")
                                                        // setBusCert(doc.target.files[0])
                                                    }}
                                                />
                                                <small>Maximum file size: 1MB</small>
                                                <small>Supported file types: (.png, .jpg, .jpeg).</small>
                                            </div>
                                        </div>
                                        :
                                        <div className="card">
                                            <div className="card-body py-1">
                                                <div className="row justify-content-between ">
                                                    <div className="col-md-7">
                                                        {/* <p className='p-0'>{organisationInfoState?.resp?.data?.organisation?.business_document?.substr(64, 100)}</p> */}
                                                        <p className='p-0'>Cetificate{organisationInfoState?.resp?.data?.organisation?.business_document?.substr(-4)}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className='d-flex justify-content-end align-items-center'>
                                                            <p className='link-underline me-3' style={{cursor:"pointer"}} onClick={()=>{
                                                                setDoc(previewBusImg || organisationInfoState?.resp?.data?.organisation?.business_document)
                                                                setDocName("Business Certificate")
                                                                setCertModal(true)
                                                            }}> view </p>
                                                            <i className=' ri-delete-bin-6-line ri-lg' style={{ cursor: "pointer", marginTop: "-10px", color:"#E95470"}}
                                                                onClick={() => {
                                                                    setBusCert("")
                                                                    setInitBusCert("")
                                                                }} 
                                                            />
                                                            {/* <img src={cancelImg} alt="" width="25px" style={{ cursor: "pointer", marginTop: "-10px"}} 
                                                                onClick={() => {
                                                                    setBusCert("")
                                                                    setInitBusCert("")
                                                                }}
                                                            /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='pt-5'>
                            <h5>Director Details</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="dirName">Director's Name <span style={{color:"red"}}> *</span></label>
                                    <input type="text" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.director_name}
                                        // value={dirName}
                                        onChange={name => setDirName(name.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="dirEmail">Director's email <span style={{color:"red"}}> *</span></label>
                                    <input type="email" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.director_email}
                                        // value={dirEmail}
                                        onChange={email => setDirEmail(email.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="dirAddress">Director's Address <span style={{color:"red"}}> *</span></label>
                                    <input type="text" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.director_address}
                                        // value={dirAddress}
                                        onChange={address => setDirAddress(address.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="dirCard">Upload Director’s Identity Card <span style={{color:"red"}}> *</span></label>
                                    {!initDirCard ?
                                        <div className="file-input-area p-2">
                                            <div className="">
                                                <input type="file"
                                                    accept="image/png, image/jpg, image/jpeg"
                                                    onChange={(card: any) => {
                                                        imageHandler(card, dirCard)
                                                        updateDoc(card, "dirCard")
                                                    }}
                                                />
                                                <small>Maximum file size: 1MB</small>
                                                <small>Supported file types: (.png, .jpg, .jpeg).</small>
                                            </div>
                                        </div>
                                        :
                                        <div className="card">
                                            <div className="card-body py-1">
                                                <div className="row justify-content-between">
                                                    <div className="col-md-7">
                                                        {/* <p>{organisationInfoState?.resp?.data?.organisation?.director_id_card?.substr(64, 100)}</p> */}
                                                        <p>Identity Card{organisationInfoState?.resp?.data?.organisation?.director_id_card?.substr(-4)}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className='d-flex justify-content-end align-items-center'>
                                                            <p className='link-underline me-3' style={{cursor:"pointer"}} onClick={()=>{
                                                                setDoc(previewDirImg || organisationInfoState?.resp?.data?.organisation?.director_id_card)
                                                                setDocName("Director's ID Card")
                                                                setCertModal(true)
                                                            }}> view </p>
                                                            <i className=' ri-delete-bin-6-line ri-lg' style={{ cursor: "pointer", marginTop: "-10px", color:"#E95470"}}
                                                                onClick={() => {
                                                                    setDirCard("")
                                                                    setInitDirCard("")
                                                                }} 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {/* <input type="file" className="form-control"
                                        defaultValue={organisationInfoState?.resp?.data?.organisation?.director_id}
                                        // value={organisationInfoState?.resp?.data?.organisation?.director_id}
                                        onChange={(card: any) => setDirCard(card?.target?.files[0])}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <button className='btn btn-deep-green mt-4' onClick={updateBusInfo}>
                            {updateOrganisationInfoState.isLoading
                                ?
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
                                :
                                "Save Changes"
                            }
                        </button>
                    </div>
                </>
            }

        </div>
    )
}
