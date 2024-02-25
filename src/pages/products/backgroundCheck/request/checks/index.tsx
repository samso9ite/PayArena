import React, { useEffect, useState } from 'react'
import NotificationToast from '../../../../../components/utils/notifToast'
import { backgroundCheckRequestAnswerUploadRequest, backgroundCheckRequestGetCandidateFormRequest } from '../../../../../redux/actions/products/backgroundCheck/request/checks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/reducers'
import CheckSummaryComp from '../../../../../components/products/backgroundCheck/request/checks/checkSummary'
import { Player } from '@lottiefiles/react-lottie-player'
import successVerifGif from '../../../../../assets/successVerif.json'
import Mainloader, { removeLetters } from '../../../../../components/utils'
import { useLocation } from 'react-router-dom'
import BackgroundCheckFaceVerificationComp from '../../../../../components/products/backgroundCheck/request/checks/faceVerification'

export default function BackgroundCheckRequestCandidateFormPage() {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [allForm, setAllForm] = useState<any>([]);
    const [formPage, setFormPage] = useState(1)
    const [currentStep, setCurrentStep] = useState(0);
    const [currentForm, setCurrentForm] = useState<any>({});

    const [payloadData, setPayloadData] = useState({})
    const [previewData, setPreviewData] = useState({})
    const [payloadDataArr, setPayloadDataArr] = useState<any[]>([])

    const [facialDataValues, setFacialDataValues] = useState({})

    const [successModal, setSuccessModal] = useState(false)


    const candidateFormState = useSelector((state: RootState) => state.backgroundCheckRequestGetCandidateFormReducer)

    const location = useLocation();
    const queryParams = new URLSearchParams(window.location.search)
    let requestId = queryParams.get("ref") || ""

    const bioData = location.state;

    const dispatch = useDispatch()

    useEffect(() => {
        getCandidateForm()
    }, [])

    useEffect(() => {
        getFormAt(currentStep)
    }, [currentStep, candidateFormState?.resp?.detail])


    let getCandidateForm = () => {
        const callback = (data: any) => {

            if (data.status) {
                let splittedName = data?.detail?.name?.split(" ")

                if (data?.detail?.request_completed) {
                    setFormPage(4)
                }

                data?.detail?.form?.bio_data?.forEach((val: any, i: number) => {
                    if (val?.form_value === "first_name") {
                        triggerKeyUpdate("bio_data", val?.endpoint, val?.form_type, val?.form_value, bioData?.first_name || splittedName[0] || "", val?.form_id, val?.key, val?.regex, val?.form_label)
                    }
                    if (val?.form_value === "last_name") {
                        triggerKeyUpdate("bio_data", val?.endpoint, val?.form_type, val?.form_value, bioData?.last_name || splittedName[1] || "", val?.form_id, val?.key, val?.regex, val?.form_label)
                    }
                    if (val?.form_value === "email") {
                        triggerKeyUpdate("bio_data", val?.endpoint, val?.form_type, val?.form_value, bioData?.email || data?.detail?.email || "", val?.form_id, val?.key, val?.regex, val?.form_label)
                    }
                })
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {
                form_id: requestId,
            },
            callback,
        };
        dispatch(backgroundCheckRequestGetCandidateFormRequest(data))
    }



    let getFormAt = (index: number) => {
        if (!candidateFormState?.isLoading && candidateFormState?.resp?.detail) {
            setAllForm(Object?.entries(candidateFormState?.resp?.detail?.form)?.reverse())
            setCurrentForm(Object?.entries(candidateFormState?.resp?.detail?.form)?.reverse()[index])
        }
    }

    let triggerKeyUpdate = (title: any, endpoint: any, formType: any, key: any, val: any, id: any, uniqueId: any, regex: any, label:any) => {

        let keyDataArr: any = payloadDataArr


        if (formType === 'file') {
            var file = val?.target?.files[0]
            let reader = new FileReader()

            if (val?.target?.files?.length > 0) {
                reader.readAsDataURL(file)
                reader.onload = () => {
                    let imgBase: any = reader.result
                    let keyDataIndex = payloadDataArr.findIndex(item => ((item?.form_value === key) && (item?.title === title) && (item?.key === (uniqueId))))
                    // setFileCheck(imgBase)

                    if (keyDataIndex !== -1) {
                        keyDataArr.splice(keyDataIndex, 1)
                        keyDataArr.push({ "title": title, "endpoint": endpoint, "form_value": key, "form_data": imgBase, "form_id": id, "key": uniqueId, "regex": regex, "file_front_Data": file, "label": label })
                    }
                    else {
                        keyDataArr.push({ "title": title, "endpoint": endpoint, "form_value": key, "form_data": imgBase, "form_id": id, "key": uniqueId, "regex": regex, "file_front_Data": file, "label": label })
                    }

                    setPayloadDataArr(keyDataArr)
                    reformatData()
                }
            }
            else {
                let keyDataIndex = payloadDataArr.findIndex(item => ((item?.form_value === key) && (item?.title === title) && (item?.key === (uniqueId))))
                // setFileCheck(imgBase)

                if (keyDataIndex !== -1) {
                    keyDataArr.splice(keyDataIndex, 1)
                    // keyDataArr.push({ "title": "", "endpoint": "", "form_value": "", "form_data": "", "form_id": "", "key": "", "regex": "" })
                }
                // else {
                //     keyDataArr.push({ "title": "", "endpoint": "", "form_value": "", "form_data": "", "form_id": "", "key": "", "regex": "" })
                // }

                setPayloadDataArr(keyDataArr)
                reformatData()
            }
        }
        else {
            let keyDataIndex = payloadDataArr.findIndex(item => ((item?.form_value === key) && (item?.title === title) && (item?.key === (uniqueId))))

            if (keyDataIndex !== -1) {
                keyDataArr.splice(keyDataIndex, 1)
                keyDataArr.push({ "title": title, "endpoint": endpoint, "form_value": key, "form_data": val, "form_id": id, "key": uniqueId, "regex": regex, "label": label })
            }
            else {
                keyDataArr.push({ "title": title, "endpoint": endpoint, "form_value": key, "form_data": val, "form_id": id, "key": uniqueId, "regex": regex, "label": label })
            }

            // setPayloadData(keyData)
            setPayloadDataArr(keyDataArr)
            reformatData()
        }

    }


    // let triggerKeyUpdate = (title: any, key: any, val: any, id: any, count: any) => {

    //     let keyDataArr: any = payloadDataArr

    //     let keyDataIndex = payloadDataArr.findIndex(item => ((item?.form_value === key) && (item?.title === title) && (item?.form_id === (id + count))))


    //     if (keyDataIndex !== -1) {
    //         keyDataArr.splice(keyDataIndex, 1)
    //         keyDataArr.push({ "title": title, "form_value": key, "form_data": val, "form_id": id + count })
    //     }
    //     else {
    //         keyDataArr.push({ "title": title, "form_value": key, "form_data": val, "form_id": id + count })
    //     }

    //     // setPayloadData(keyData)
    //     setPayloadDataArr(keyDataArr)
    //     reformatData()
    // }

    let reformatData = () => {
        const correctData: any = {};
        const correctPreData: any = {};

        payloadDataArr?.forEach((obj) => {
            correctPreData[obj.title] = payloadDataArr?.filter((item: any) => item?.title === obj?.title)
        });

        // setPayloadData({ ...correctData })
        // setPreviewData({ ...correctPreData })

        setPayloadData({ ...correctPreData })
    }

    // let reformatData = () => {
    //     const correctData: any = {};
    //     payloadDataArr?.forEach((obj) => {
    //         correctData[obj.title] = payloadDataArr?.filter((item: any) => item?.title === obj?.title)
    //     });

    //     setPayloadData({ ...correctData })
    // }

    // let verifyData = () => {
    //     if (payloadDataArr?.length < 1 || payloadDataArr?.some((val: any) => val.value === "")) {
    //         setNotifTitle('Error')
    //         setNotif('Please fill in all required fields')
    //         setNotifVal(true)
    //         return
    //     }
    //     reformatData()
    //     setCurrentStep(currentStep + 1)

    // }

    let nextForm = (formName: any) => {

        let currentPageData = payloadDataArr.filter((val: any) => val?.title === formName)

        if ((payloadDataArr?.length < 1) || (payloadDataArr?.some((val: any) => val?.form_data === ""))
            ||
            (currentForm[1]?.length !== (payloadDataArr.filter((val: any) => val?.title === currentForm[0])?.length))
        ){
            setNotifTitle('Error')
            setNotif('Please fill in all fields')
            setNotifVal(true)
            return
        }
        else if (formName === allForm[allForm?.length - 1][0]) {
            currentPageData?.forEach((dat: any) => {
                if (dat?.file_front_Data && (
                    (dat?.file_front_Data.type !== "image/png") &&
                    (dat?.file_front_Data.type !== "image/jpeg") &&
                    (dat?.file_front_Data.type !== "image/jpg") &&
                    (dat?.file_front_Data?.type !== "application/pdf")
                )) {
                    setNotifTitle('Error')
                    setNotif(`Unsupported ${dat?.label} format Uploaded`)
                    setNotifVal(true)
                    return
                }
                else if (dat?.file_front_Data && (dat?.file_front_Data?.size > 1100000)) {
                    setNotifTitle('Error')
                    setNotif(`${dat?.label} is larger than 1mb`)
                    setNotifVal(true)
                    return
                }
                else if (!new RegExp(dat?.regex)?.test(dat?.form_data)) {
                    setNotifTitle('Error')
                    setNotif(`Invalid ${dat?.label} format`)
                    setNotifVal(true)
                    return
                }
            })
            if ((!currentPageData?.some((val: any) => new RegExp(val?.regex)?.test(val?.form_data) === false))
                &&
                ((currentPageData?.some((val: any) => val?.file_front_Data && (val?.file_front_Data?.size > 1100000))=== false))
                &&
                ((currentPageData?.some((val: any) => val?.file_front_Data && (
                    (val?.file_front_Data.type !== "image/png") &&
                    (val?.file_front_Data.type !== "image/jpeg") &&
                    (val?.file_front_Data.type !== "image/jpg") &&
                    (val?.file_front_Data?.type !== "application/pdf"))) === false)
                )
            ) {
                reformatData()
                if (candidateFormState?.resp?.detail?.face_capture === true) {
                    goToFormPage(2)
                }
                else {
                    goToFormPage(3)
                }
            }
        }
        else {
            currentPageData?.forEach((dat: any) => {
                if (dat?.file_front_Data && (
                    (dat?.file_front_Data.type !== "image/png") &&
                    (dat?.file_front_Data.type !== "image/jpeg") &&
                    (dat?.file_front_Data.type !== "image/jpg") &&
                    (dat?.file_front_Data?.type !== "application/pdf")
                )) {
                    setNotifTitle('Error')
                    setNotif(`Unsupported ${dat?.label} format Uploaded`)
                    setNotifVal(true)
                    return
                }
                else if (dat?.file_front_Data && (dat?.file_front_Data?.size > 1100000)) {
                    setNotifTitle('Error')
                    setNotif(`${dat?.label} is larger than 1mb`)
                    setNotifVal(true)
                    return
                }
                else if (!new RegExp(dat?.regex)?.test(dat?.form_data)) {
                    setNotifTitle('Error')
                    setNotif(`Invalid ${dat?.label} format`)
                    setNotifVal(true)
                    return
                }
            })
            
            if ((!currentPageData?.some((val: any) => new RegExp(val?.regex)?.test(val?.form_data) === false))
                &&
                ((currentPageData?.some((val: any) => val?.file_front_Data && (val?.file_front_Data?.size > 1100000))=== false))
                &&
                ((currentPageData?.some((val: any) => val?.file_front_Data && (
                    (val?.file_front_Data.type !== "image/png") &&
                    (val?.file_front_Data.type !== "image/jpeg") &&
                    (val?.file_front_Data.type !== "image/jpg") &&
                    (val?.file_front_Data?.type !== "application/pdf"))) === false)
                )
            ) {
                reformatData()
                setCurrentStep(currentStep + 1)
            }
            // verifyData()
        }
    }


    let proceedFromFaceVerification = (val: any) => {
        setFacialDataValues(val)
        setFormPage(3)
    }

    let submitForm = () => {
        const callback = (data: any) => {
            if (data?.status) {
                setNotifTitle("Success")
                setNotif("Response successfully sent")
                setNotifVal(true)

                setTimeout(() => {
                    setFormPage(4)
                }, 1000);
                // toggleSuccessModal()
            }
            else {
                setNotifTitle("Error")
                setNotif(data.detail)
                setNotifVal(true)
            }
        };
        let data: any = {
            values: {
                request_id: requestId,
                // ids: Object.keys(facialDataValues)?.length > 0 ? {...payloadData, ...facialDataValues} : payloadData

                ids: (candidateFormState?.resp?.detail?.face_capture === true) ? { ...payloadData, ...facialDataValues } : payloadData

            },
            callback,
        };
        dispatch(backgroundCheckRequestAnswerUploadRequest(data))
    }

    let goToFormPage = (val: any) => {
        setFormPage(val)
    }

    let getValueForKey = (id: any) => {
        const mainValue = payloadDataArr?.filter((val: any) => ((val.key === id)))[0];
        return mainValue?.file_front_Data || mainValue?.form_data;
    }


    // let getValueForKey = (title: string, key: string, id: any) => {
    //     const mainValue = payloadDataArr?.find((val: any) => (val.title === title) && (val.form_value === key) && (val.form_id === id));
    //     return mainValue?.form_data;
    // }

    let toggleSuccessModal = () => {
        setSuccessModal(!successModal)
    }

    // console.log(payloadData)

    return (
        <div>

            {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

            <div className="text-white py-4 mb-5" style={{ background: "#003E51" }}>
                <div className="container">
                    <h5>Complete A Background Check</h5>
                </div>
            </div>

            {candidateFormState?.isLoading && <Mainloader />}

            {formPage === 1 &&
                <>
                    {!candidateFormState?.isLoading &&
                        <div className="container">
                            <div>
                                <small> step {currentStep + 1} of {allForm?.length}</small>
                                <h1> {currentForm[0]?.charAt(0)?.toUpperCase() + currentForm[0]?.substring(1).replaceAll("_", " ")}</h1>
                                <p>Please enter your {currentForm[0]?.replaceAll("_", " ")} details</p>
                            </div>
                            <div className='row justify-content-between '>
                                {allForm?.length > 0 && (
                                    <div className="col-md-5 mt-5">
                                        <form onSubmit={e => e.preventDefault()} autoComplete="off" className=''>
                                            {currentForm && currentForm[1]?.map((form: any, i: number) => {
                                                return (
                                                    <div className="mt-1" key={i}>
                                                        <label htmlFor={form?.form_label}>{`${form?.form_label} ${form?.description ? ("(" + form?.description + ")") : ""}`}</label>
                                                        {/* <input type={form?.form_type} defaultValue={getValueForKey(currentForm[0], form?.form_value, form.form_id + i)}  */}
                                                        {form?.form_type === "select" ?
                                                            <select
                                                                name={form?.form_id}
                                                                className='form-select'
                                                                onChange={e => triggerKeyUpdate(currentForm[0], form?.endpoint, form?.form_type, form?.form_value, e?.target?.value, form?.form_id, form?.key, form?.regex, `${form?.description ? (form?.description) : (form?.form_label) }`)}
                                                                autoComplete="off"
                                                                // value={getValueForKey(currentForm[0], form?.form_value, form.form_id + i) || ""}
                                                                value={getValueForKey(form?.key) || ""}
                                                            >
                                                                <option value="">Select {form?.form_label}</option>
                                                                {form?.select_value?.map((opt: any, k: number) => (
                                                                    <option key={k} value={opt?.value}>{opt?.name}</option>
                                                                ))}
                                                            </select>
                                                            :
                                                            form?.form_type === "file" ?
                                                                <div>
                                                                    {!getValueForKey(form?.key) &&
                                                                        <div className="file-input-area p-2">
                                                                            <div className="">
                                                                                <input type={form?.form_type}
                                                                                    placeholder={form?.form_label}
                                                                                    name={form?.form_id}
                                                                                    onChange={e => triggerKeyUpdate(currentForm[0], form?.endpoint, form?.form_type, form?.form_value, e, form?.form_id, form?.key, "", `${form?.description ? (form?.description) : (form?.form_label) }`)}
                                                                                    autoComplete="off"
                                                                                    accept=".pdf, .png, .jpg, .jpeg"
                                                                                    draggable={false}
                                                                                />
                                                                                <small>Maximum file size: 1MB</small>
                                                                                <small>Supported file types: (.pdf, .png, .jpg, .jpeg).</small>
                                                                            </div>
                                                                        </div>
                                                                    }

                                                                    {getValueForKey(form?.key) &&
                                                                        <div style={{backgroundColor: "#eaeef6"}} className='py-2 px-3'>
                                                                            <div className="row align-items-center">
                                                                                <div className="col-md-8 d-flex align-items-center">
                                                                                    <i className="ri-image-2-line ri-xl me-2" />
                                                                                    <span>
                                                                                        <p className="p-0 m-0" style={{ fontSize: "14px" }}>{getValueForKey(form?.key)?.name}</p>
                                                                                        <p className="p-0 m-0" style={{ fontSize: "13px", color: "#8D8D8D" }}>
                                                                                            Size: {getValueForKey(form?.key).size / 1000} KB
                                                                                        </p>
                                                                                    </span>

                                                                                </div>
                                                                                <div className="col-md-4 d-flex justify-content-md-end">
                                                                                    <span>
                                                                                        <button className="btn btn-danger"
                                                                                            onClick={e => triggerKeyUpdate(currentForm[0], form?.endpoint, form?.form_type, form?.form_value, "", form?.form_id, form?.key, "", `${form?.description ? (form?.description) : (form?.form_label) }`)}
                                                                                            style={{ border: "None", borderRadius: "5px" }}
                                                                                        >
                                                                                            <span className="d-flex align-items-center">
                                                                                                <i className="ri-delete-bin-3-line ri-xl me-2 " />
                                                                                                Remove
                                                                                            </span>
                                                                                        </button>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                // <div className="">
                                                                //     <input type={form?.form_type}
                                                                //         className='form-control' placeholder={form?.form_label}
                                                                //         name={form?.form_id}
                                                                //         onChange={e => triggerKeyUpdate(currentForm[0], form?.endpoint, form?.form_type, form?.form_value, e, form?.form_id, form?.key, "")}
                                                                //         autoComplete="off"
                                                                //         accept=".pdf, .png, .jpg, .jpeg"
                                                                //     />
                                                                //     {/* <small>Maximum file size: 3MB</small> <br /> */}
                                                                //     <small>Supported file types: (.pdf, .png, .jpg, .jpeg).</small>
                                                                // </div>

                                                            :
                                                            form?.form_type === "tel" ?
                                                                <input type={form?.form_type}
                                                                    className='form-control' placeholder={form?.form_label}
                                                                    name={form?.form_id}
                                                                    onChange={e => triggerKeyUpdate(currentForm[0], form?.endpoint, form?.form_type, form?.form_value, removeLetters(e.target.value), form?.form_id, form?.key, form?.regex, `${form?.description ? (form?.description) : (form?.form_label) }`)}
                                                                    autoComplete="off"
                                                                    // value={getValueForKey(currentForm[0], form?.form_value, form.form_id + i) || ""}
                                                                    value={getValueForKey(form?.key) || ""}
                                                                />
                                                            :
                                                            <input type={form?.form_type}
                                                                className='form-control' placeholder={form?.form_label}
                                                                name={form?.form_id}
                                                                onChange={e => triggerKeyUpdate(currentForm[0], form?.endpoint, form?.form_type, form?.form_value, e.target.value, form?.form_id, form?.key, form?.regex, `${form?.description ? (form?.description) : (form?.form_label) }`)}
                                                                autoComplete="off"
                                                                // value={getValueForKey(currentForm[0], form?.form_value, form.form_id + i) || ""}
                                                                value={getValueForKey(form?.key) || ""}
                                                            />
                                                        }
                                                    </div>
                                                )
                                            }
                                            )}

                                            <button className='btn btn-deep-green px-5 my-5 w-100'
                                                onClick={() => nextForm(currentForm[0])}
                                            >
                                                Next
                                            </button>

                                        </form>
                                    </div>
                                )}

                                <div className="col-md-4 mt-5">
                                    <div className="card mt-4 pb-3">
                                        <div className="card-body">
                                            {candidateFormState?.resp?.detail && Object?.keys(candidateFormState?.resp?.detail?.form)?.reverse()?.map((val: any, i: number) => (
                                                <div key={i} className='d-flex align-items-center mt-3'>
                                                    {currentStep > i ?
                                                        <i className="ri-checkbox-circle-fill ri-xl me-2" />
                                                        :
                                                        <i className="ri-checkbox-blank-circle-line ri-xl me-2" />
                                                    }
                                                    <p className='p-0 m-0' style={{ cursor: "pointer" }} onClick={(currentStep > i) ? () => setCurrentStep(i) : () => { }}>
                                                        {val[0]?.toUpperCase() + val?.replaceAll("_", " ")?.slice(1)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }

            {/* {formPage === 1 &&
                <>
                    {!candidateFormState?.isLoading &&
                        <div className="container">
                            <div>
                                <small> step {currentStep + 1} of {allForm?.length}</small>
                                <h1> {currentForm[0]?.charAt(0)?.toUpperCase() + currentForm[0]?.substring(1).replaceAll("_", " ")}</h1>
                                <p>Please enter your {currentForm[0]?.replaceAll("_", " ")} details</p>
                            </div>
                            <div className='row justify-content-between '>
                                {allForm?.length > 0 && (
                                    <div className="col-md-5 mt-5">
                                        <div className=''>
                                            {currentForm && currentForm[1]?.map((form: any, i: number) => {
                                                return (
                                                    <div className="mt-1" key={i}>
                                                        <label htmlFor="firstname">{`${form?.form_label} ${form?.description ? ("(" + form?.description + ")") : ""}`}</label>
                                                        <input type={form?.form_type}
                                                            name={form?.form_value}
                                                            className='form-control' placeholder={form?.form_label}
                                                            onChange={e => triggerKeyUpdate(currentForm[0], form?.form_value, e?.target?.value, form?.form_id, i)}
                                                            autoComplete="off"
                                                        />
                                                        {form?.form_type === "select" ?
                                                            <select
                                                                name={form?.form_id}
                                                                className='form-select'
                                                                onChange={e => triggerKeyUpdate(currentForm[0], form?.endpoint, form?.form_type, form?.form_value, e?.target?.value, form?.form_id, form?.key,)}
                                                                autoComplete="off"
                                                                value={getValueForKey(currentForm[0], form?.form_value, form.form_id + i) || ""}
                                                            >
                                                                <option value="">Select {form?.form_label}</option>
                                                                {form?.select_value?.map((opt: any, i: number) => (
                                                                    <option value={opt?.value}>{opt?.name}</option>
                                                                ))}
                                                            </select>
                                                            :
                                                            <input  
                                                                type={form?.form_type}
                                                                name={form?.form_value}
                                                                className='form-control' placeholder={form?.form_label}
                                                                onChange={e => triggerKeyUpdate(currentForm[0], form?.form_value, e?.target?.value, form?.form_id, i)}
                                                                autoComplete="off"
                                                                value={getValueForKey(currentForm[0], form?.form_value, form.form_id + i) || ""}
                                                            />
                                                        }
                                                    </div>
                                                )
                                            }
                                            )}

                                            <button className='btn btn-deep-green mt-3 px-5 mt-5 w-100'
                                                onClick={() => nextForm(currentForm[0])}
                                            >
                                                Next
                                            </button>

                                        </div>
                                    </div>
                                )}

                                <div className="col-md-4 mt-5">
                                    <div className="card mt-4 pb-3">
                                        <div className="card-body">
                                            {candidateFormState?.resp?.detail && Object?.keys(candidateFormState?.resp?.detail?.form)?.reverse()?.map((val: any, i: number) => (
                                                <div key={i} className='d-flex align-items-center mt-3'>
                                                    {currentStep > i ?
                                                        <i className="ri-checkbox-circle-fill ri-xl me-2" />
                                                        :
                                                        <i className="ri-checkbox-blank-circle-line ri-xl me-2" />
                                                    }
                                                    <p className='p-0 m-0' style={{ cursor: "pointer" }} onClick={(currentStep > i) ? () => setCurrentStep(i) : () => { }}>
                                                        {val[0]?.toUpperCase() + val?.replaceAll("_", " ")?.slice(1)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            } */}

            {formPage === 2 && 
                <BackgroundCheckFaceVerificationComp proceedFromFaceVerification={proceedFromFaceVerification} goToFormPage={goToFormPage} />
            }

            {formPage === 3 && 
                // <p>testtttttt</p>
                <CheckSummaryComp submitForm={submitForm} goToFormPage={goToFormPage}
                    successModal={successModal} toggleSuccessModal={toggleSuccessModal} 
                    faceEnabled={candidateFormState?.resp?.detail?.face_capture} 
                    facialDataValues={facialDataValues} collectedData={payloadData} 
                />
            }

            {formPage === 4 &&
                <div>
                    <div className="col-md-6 col-lg-4 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <div className="main-modal-body text-center">
                                    <div className="col-md-6 mx-auto mt-4">
                                        <Player
                                            src={successVerifGif}
                                            className="player"
                                            loop
                                            autoplay
                                        />
                                    </div>
                                    <div className="my-5">
                                        <h4>Thank You</h4>
                                        <p className='my-3'>You have Succesfully Submitted this form</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
