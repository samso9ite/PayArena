import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { PaginatedList } from 'react-paginated-list';
import Nav from 'react-bootstrap/Nav'
import { ActiveTag, FailedTag, SuccessTag, imgUrl, InactiveTag } from '../../utils';

export const ReportResponseComponent = (props) => {

    const [requestData, setRequestData] = useState(JSON?.parse(props?.reqData?.replaceAll('\\','').replaceAll("'",'"')) || {})
    const [responseData, setResponseData] = useState(props?.data)
    const [idData, setIdData] = useState({})
    const [idDataKeys, setIdDataKeys] = useState([])
    const [openDirectors, setOpenDirectors] = useState(false)
    const [openDataChild, setOpenDataChild] = useState(false)
    const [dataChild, setDataChild] = useState("")

    useEffect(() => {
        if (responseData?.response_code === "00") {
            setIdData(getIdData(responseData))
            if (typeof getIdData(responseData) === "object") {
                setIdDataKeys(Object.keys(getIdData(responseData)))
            }
        }
    }, [])

    let getRequestImg = () => {
        var data = requestData
        if (data?.hasOwnProperty("image")) {
            return data?.image;
        }
        if (data?.hasOwnProperty("base64Image")) {
            return data?.base64Image;
        }
        if (data?.hasOwnProperty("photo")) {
            return data.photo;
        }
        if (data?.hasOwnProperty("Photo")) {
            return data.Photo;
        }
        if (data?.hasOwnProperty("DriverImage")) {
            return data.DriverImage;
        }
        // if (data?.hasOwnProperty("file_base64")) {
        //     return data.file_base64;
        // }
        return null
    }
    let getResponseImg = () => {
        var data = getIdData(responseData);
        if (data?.hasOwnProperty("image")) {
            return data.image;
        }
        if (data?.hasOwnProperty("base64Image")) {
            return data.base64Image;
        }
        if (data?.hasOwnProperty("photo")) {
            return data.photo;
        }
        if (data?.hasOwnProperty("Photo")) {
            return data.Photo;
        }
        if (data?.hasOwnProperty("DriverImage")) {
            return data.DriverImage;
        }
        // if (data?.hasOwnProperty("file_base64")) {
        //     return data.file_base64;
        // }
        return null
    }

    let getIdData = (data) => {
        // console.log(data)
        if (data?.hasOwnProperty("basic")) {
            return data.basic
        }
        if (data?.hasOwnProperty("domain_info")) {
            return data?.domain_info
        }
        if (data?.hasOwnProperty("bvn_data")) {
            return data.bvn_data
        }
        if (data?.hasOwnProperty("nin_data")) {
            return data?.nin_data
        }
        if (data?.hasOwnProperty("frsc_data")) {
            return data?.frsc_data
        }
        if (data?.hasOwnProperty("cac_data")) {
            return data?.cac_data
        }
        if (data?.hasOwnProperty("account_data")) {
            return data?.account_data
        }
        if (data?.hasOwnProperty("nin_data")) {
            return data?.nin_data
        }
        if (data?.hasOwnProperty("data")) {
            return data?.data
        }
        return {}
    }

    let getKeyLabel = (data) => {
        var formattedText = ""
        for (var i = 0, len = data.length; i < len; i++) {
            if (i === 0) {
                formattedText += data.charAt(0).toUpperCase()
                continue
            }
            if ((i !== 0) && (data.charAt(i) === data.charAt(i).toUpperCase())) {
                formattedText += " " + data.charAt(i).toUpperCase()
                continue
            }
            
            formattedText += data.charAt(i)
        }
        return formattedText
    }
    

    return (
        <div className="">
            <div className="text-center">
                <h5>{props?.data?.endpoint?.name}</h5>
                <small className="">Verification Status: </small>
                {(responseData?.response_code === "00" || responseData?.response_code === "01") ?
                    <>
                        <SuccessTag /><br />
                    </>
                    :
                    <>
                        <FailedTag /><br />
                    </>
                }
            </div>
            {
            (responseData.hasOwnProperty("face_data") && (requestData && responseData?.face_data) && (props?.endpName === "Face Liveliness")) ?

                <div className="row align-items-center justify-content-between text-center">
                    <div className="col-md-4 ">
                        <img className="response-img" alt="dashboard-user"
                            src={imgUrl(requestData?.image_two)}
                        /><br />
                        <small>ID IMAGE</small>
                    </div>
                    <div className="col-md-4 mt-2 ">
                        {
                            responseData?.status ?
                                <div style={{ backgroundColor: 'green', borderRadius: 10, }}>
                                    <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                </div>
                                // <a href="javascript:void()" style={{ backgroundColor: 'green', borderRadius: 15, cursor: 'default' }}>{responseData.message}</a>
                                :
                                <div style={{ backgroundColor: 'red', borderRadius: 10, }} className=" p-1">
                                    <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                </div>
                                // <a href="javascript:void()" className="link badge text-white f-12 px-3" style={{ backgroundColor: 'red', borderRadius: 15, cursor: 'default' }}>{responseData?.message}</a>
                        }
                        <p className="pt-2">Confidence Level: {responseData?.face_data?.confidence?.toFixed(2)} OF 100</p>
                    </div>
                    <div className="col-md-4 ">
                        <img className="response-img" alt="dashboard-user"
                            src={imgUrl(requestData?.image_one)}
                        /><br />
                        <small>SELFIE IMAGE</small>
                    </div>
                </div>

                : 
                (responseData.hasOwnProperty("face_data") && (requestData && responseData?.face_data)) ?
                <div className="row align-items-center justify-content-between text-center">
                    <div className="col-md-4 ">
                        <img className="response-img" alt="dashboard-user"
                            src={getResponseImg()?.includes("https://") ? getResponseImg() : imgUrl(getResponseImg())}
                        // src={imgUrl(getResponseImg())}
                        /><br />
                        <small>ID IMAGE</small>
                    </div>
                    <div className="col-md-4 mt-2 ">
                        {
                            responseData?.face_data?.status ?
                                <div style={{ backgroundColor: 'green', borderRadius: 10, }}>
                                    <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData?.face_data?.message}</h6>
                                </div>
                                :
                                <div style={{ backgroundColor: 'red', borderRadius: 10, }} className=" p-1">
                                    <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData?.face_data?.message}</h6>
                                </div>
                        }
                        <p className="pt-2">Confidence Level: {responseData?.face_data?.confidence?.toFixed(2)} OF 100</p>
                    </div>
                    <div className="col-md-4 ">
                        <img className="response-img" alt="dashboard-user"
                            src={imgUrl(getRequestImg())}
                        /><br />
                        <small>SELFIE IMAGE</small>
                    </div>
                </div>
                :
                
                !getResponseImg() || getResponseImg()?.length < 10 ? "":
                    <div className="text-center">
                        {responseData?.response_code === "00" ?
                            <img className="response-img" alt="dashboard-user"
                                src={getResponseImg()?.includes("https://") ? getResponseImg() : imgUrl(getResponseImg())}
                            // src={imgUrl(getResponseImg())}
                            />
                            :
                            ""
                        }
                    </div>
            }

            {responseData?.response_code === "00" ?
                <>
                    {(idDataKeys.length < 1 && (requestData.hasOwnProperty("image_one" || requestData.hasOwnProperty("image_two"))) && (props?.endpName !== "Face Liveliness")) ?

                        <div className="row align-items-center justify-content-between text-center">
                            <div className="col-md-4 ">
                                <img className="response-img" alt="dashboard-user"
                                    src={imgUrl(requestData?.image_one)}
                                /><br />
                                <small>ID IMAGE</small>
                            </div>
                            <div className="col-md-4 mt-2 ">
                                {
                                    responseData?.status ?
                                        <div style={{ backgroundColor: 'green', borderRadius: 10, }}>
                                            <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                        </div>
                                        :
                                        <div style={{ backgroundColor: 'red', borderRadius: 10, }} className=" p-1">
                                            <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                        </div>
                                }
                                <p className="pt-2">Confidence Level: {responseData?.confidence?.toFixed(2)} OF 100</p>
                            </div>
                            <div className="col-md-4 ">
                                <img className="response-img" alt="dashboard-user"
                                    src={imgUrl(requestData?.image_two)}
                                /><br />
                                <small>SELFIE IMAGE</small>
                            </div>
                        </div>

                        :
                        idDataKeys.length < 1 && requestData.hasOwnProperty("image") ?
                            <div className="text-center">
                                <img className="response-img" alt="dashboard-user"
                                    src={imgUrl(getRequestImg())}
                                />
                                <div>
                                    {
                                        responseData?.status ?
                                            <div style={{ backgroundColor: 'green', borderRadius: 10, }}>
                                                <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                            </div>
                                            :
                                            <div style={{ backgroundColor: 'red', borderRadius: 10, }} className=" p-1">
                                                <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                            </div>
                                    }
                                    <p className="pt-2">Confidence Level: {responseData?.confidence_in_percentage} OF 100</p>
                                </div>
                            </div>
                            :
                            <>
                                {idDataKeys?.indexOf("directors") !== -1 &&
                                    <div className="text-center mt-4" >
                                        {/* <button className={`btn btn-grey p-2 rounded ${!openDirectors ? "active" : ""}`}
                                            style={{ font: "12px C-book", borderRadius: "20px, 0px, 0px, 20px," }}
                                            onClick={() => setOpenDirectors(false)}
                                        >
                                            Document Info
                                        </button>
                                        <button className={`btn btn-grey p-2 rounded ${openDirectors ? "active" : ""}`}
                                            style={{ font: "13px C-book", borderRadius: "20px, 0px, 0px, 20px," }}
                                            onClick={() => setOpenDirectors(true)}
                                        >
                                            Directors Info
                                        </button> */}
                                        <Nav
                                        variant="pills"
                                        defaultActiveKey={0}
                                        className="response-tab-menu"
                                        onSelect={(e) => setOpenDirectors(e == 0 ? false : true)}>
                                        <Nav.Item>
                                            <Nav.Link eventKey={0} as={'div'}>
                                                Document Info
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey={1} as={'div'}>
                                                Directors Info
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    </div>
                                }
                                <div className='row justify-content-between mt-3'>
                                    {!openDirectors && idDataKeys?.map((key, index) => {
                                        if (typeof idData[key] !== "object") {
                                            return (
                                                <span className={(index + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={index} style={{ borderBottom: "1px solid #ddd", paddingBottom: "0px", marginBottom: "0px" }}>

                                                    {((key !== "photo") && (key !== "Photo") && (key !== "image") && (key !== "base64Image") && (key !== "DriverImage")&& (key !== "file_base64") && (key !== "signature") && (key !== "directors") && (key !== "expirationDate") && (key !== "service_provider")) &&
                                                        <>
                                                            <small>{getKeyLabel(key)?.replace(/_/g, " ")}</small>
                                                            <p>{(idData[key] || 'Not Available')}</p>
                                                            {/* {typeof idData[key] === "object" ? "" : */}
                                                            {/* <p>{idData[key]?.replace("null", '""') || 'Not Available'}</p> */}
                                                            {/* } */}
                                                        </>
                                                    }


                                                    {key === "signature" &&
                                                        <>
                                                            <small>{getKeyLabel(key)}</small> <br />
                                                            {key === "signature" ?
                                                                <img style={{ width: "50px" }} src={idData[key]} alt='' />
                                                                :
                                                                <p>{'Not Available'}</p>
                                                            }
                                                        </>
                                                    }

                                                    {key === "expirationDate" &&
                                                        <>
                                                            <small>{getKeyLabel(key)}</small> <br />
                                                            <p>
                                                                <span className={`${idData["documentStatus"] === "EXPIRED" ? "text-danger" : ""}`}>
                                                                    {(idData[key] || 'Not Available')}
                                                                </span>
                                                            </p>
                                                        </>
                                                    }

                                                    {(key === "directors" || key === "service_provider") && <> </>}
                                                </span>
                                            )
                                        }
                                        else {
                                            return (
                                                <span className={(key === "0" || key === "1" || key === "2" || key === "3") && (key !== "directors" || key !== "signature" || key !== "PerformanceSummary" || key !== "expirationDate" || key !== "service_provider") ? "col-md-12 py-1" : ((index + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end")}
                                                    key={index} style={{ borderBottom: `${(key === "0" || key === "1" || key === "2" || key === "3") && (key !== "directors" || key !== "signature" || key !== "PerformanceSummary" || key !== "expirationDate" || key !== "service_provider") ? "" : "1px solid #ddd"}`, paddingBottom: "0px", marginBottom: "0px" }}
                                                >
                                                    <>
                                                        {(idData[key]?.length < 1) ?
                                                            <>
                                                                <small>{getKeyLabel(key).replace(/_/g, " ")}</small>
                                                                <p>Not Available</p>
                                                            </>
                                                            :
                                                            <>
                                                                {(key === "0" || key === "1" || key === "2" || key === "3") && (key !== "directors" || key !== "signature" || key !== "PerformanceSummary" || key !== "expirationDate" || key !== "service_provider") ?
                                                                    <div className='row'>
                                                                        {Object?.keys(idData[key])?.map((val, k) => {
                                                                            return (
                                                                                <span className={(k + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={k} style={{ borderBottom: "1px solid #ddd", paddingBottom: "0px", marginBottom: "0px" }}>
                                                                                    <small>{getKeyLabel(val).replace(/_/g, " ")}</small>
                                                                                    <p>{`${idData[key][val]?.replace("null", '""')}` || "Not Available"}</p>
                                                                                </span>
                                                                            )
                                                                            // }
                                                                        })}
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        <div className={`d-flex ${(index + 1) % 2 === 1 ? "justify-content-md-start" : "justify-content-md-end pt-2"}`}>
                                                                            <small>{getKeyLabel(key).replace(/_/g, " ")}</small>
                                                                            {(openDataChild && dataChild === getKeyLabel(key)) ?
                                                                                <i className="ri-arrow-up-s-line ri-lg ms-3"
                                                                                    style={{ cursor: "pointer" }}
                                                                                    onClick={() => {
                                                                                        setOpenDataChild(false)
                                                                                        setDataChild("")
                                                                                    }}
                                                                                />
                                                                                :
                                                                                <i className="ri-arrow-down-s-line ri-lg ms-3"
                                                                                    style={{ cursor: "pointer" }}
                                                                                    onClick={() => {
                                                                                        setOpenDataChild(true)
                                                                                        setDataChild(getKeyLabel(key))
                                                                                    }}
                                                                                />
                                                                            }
                                                                        </div>

                                                                        {(openDataChild && dataChild === getKeyLabel(key)) &&
                                                                            <div>
                                                                                {idData[key] && Object?.keys(idData[key])?.map(val => {
                                                                                    if ((idData[key][val]?.length === undefined) && (typeof idData[key][val] === "object")) {
                                                                                        idData[key][val] && Object?.keys(idData[key][val])?.map(newVal => (
                                                                                            <>
                                                                                                <small>{getKeyLabel(newVal).replace(/_/g, " ")}</small>
                                                                                                <p>{`${idData[key][val][newVal]?.replace("null", '""')}` || "Not Available"}</p>
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                    else {
                                                                                        return (
                                                                                            <>
                                                                                                <small>{getKeyLabel(val).replace(/_/g, " ")}</small>
                                                                                                {getKeyLabel(val) === 'Individual _image' || getKeyLabel(val) === 'Residence _image' 
                                                                                                ||  getKeyLabel(val) === 'Signature' 
                                                                                                ? (<img src={idData[key][val]} alt="preview" style={{ height: '', objectFit: 'cover'}} />) : (
                                                                                                    <p>{`${idData[key][val]?.replace("null", '""')}` || "Not Available"}</p>
                                                                                                )}

                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                })}
                                                                            </div>
                                                                        }
                                                                    </>
                                                                }
                                                            </>
                                                        }

                                                    </>
                                                </span>
                                            )
                                            // }
                                        }
                                    })}
                                    {/* {!openDirectors && idDataKeys?.map((key, index) => (
                                        <span className={(index + 1) % 2 === 1 ? "col-md-6 py-1" : "col-md-6 text-md-end"} key={index} style={{ borderBottom: "1px solid #ddd", paddingBottom: "0px", marginBottom: "0px" }}>

                                            {((key !== "photo") && (key !== "image") && (key !== "base64Image") && (key !== "signature") && (key !== "directors")) &&
                                                <>
                                                    <small>{getKeyLabel(key).replace(/_/g, " ")}</small>
                                                    <p>{idData[key] || 'Not Available'}</p>
                                                </>
                                            }
                                            {key === "signature" &&
                                                <>
                                                    <small>{getKeyLabel(key)}</small> <br />
                                                    {key === "signature" ?
                                                        <img style={{ width: "50px" }} src={idData[key]} alt='' />
                                                        :
                                                        <p>{'Not Available'}</p>
                                                    }
                                                </>
                                            }
                                            {key === "directors" && <> </>}
                                        </span>
                                    ))} */}
                                </div>
                                {(openDirectors && idDataKeys?.filter(dir => (dir === "directors")).length > 0) &&
                                    <PaginatedList
                                        list={idData["directors"]}
                                        itemsPerPage={1}
                                        useMinimalControls={true}
                                        leftMargin={1}
                                        rightMargin={1}
                                        nextText={'Next'}
                                        prevText={'Previous'}
                                        displayRange={2}
                                        breakText={'...'}
                                        breakClass={'pagination-break'}
                                        renderList={(list) => (
                                            <>
                                                {list.map((value, index) => (
                                                    <div key={index}>
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Fullname</small>
                                                                <p>{value?.name || `${value?.firstname} ${value?.otherName} ${value?.surname}`}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Gender</small>
                                                                <p>{value?.gender || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Date of Birth</small>
                                                                <p>{moment(value?.dateOfBirth).format("MMMM Do YYYY, h:mm") || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Email</small>
                                                                <p>{value?.email || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Phone Number</small>
                                                                <p>{value?.phoneNumber || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Address</small>
                                                                <p>{value?.address || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>City</small>
                                                                <p>{value?.city || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>LGA</small>
                                                                <p>{value?.lga || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>State</small>
                                                                <p>{value?.state || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Postcode</small>
                                                                <p>{value?.postcode || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Country</small>
                                                                <p>{value?.countryFk?.name || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Nationality</small>
                                                                <p>{value?.nationality || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Identity Number</small>
                                                                <p>{value?.identityNumber || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Accreditation Number</small>
                                                                <p>{value?.accreditationnumber || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Occupation</small>
                                                                <p>{value?.occupation || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Date of Appointment</small>
                                                                <p>{moment(value?.dateOfAppointment).format("MMMM Do YYYY, h:mm") || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Shares Alloted</small>
                                                                <p>{value?.numSharesAlloted || value?.shares || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Type of Shares</small>
                                                                <p>{value?.typeOfShares || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Affiliate</small>
                                                                <p>{value?.affiliateTypeFk?.name || "Not Available"}</p>
                                                            </span>
                                                            <span className="col-md-6 text-md-end">
                                                                <small>Affiliate Description</small>
                                                                <p>{value?.affiliateTypeFk?.description || "Not Available"}</p>
                                                            </span>
                                                        </div><hr />
                                                        <div className='row justify-content-between'>
                                                            <span className="col-md-6">
                                                                <small>Status</small>
                                                                <p>{value?.status === "ACTIVE" ? <ActiveTag /> : <InactiveTag />}</p>
                                                            </span>
                                                        </div><hr />
                                                    </div>

                                                ))}
                                            </>
                                        )}
                                    />
                                }
                            </>
                    }
                </>
                : responseData?.response_code === "01" ?
                    <>
                        {(idDataKeys.length < 1 && (requestData.hasOwnProperty("image_one" || requestData.hasOwnProperty("image_two"))) && (props?.endpName !== "Face Liveliness")) ?

                            <div className="row align-items-center justify-content-between text-center">
                                <div className="col-md-4 ">
                                    <img className="response-img" alt="dashboard-user"
                                        src={imgUrl(requestData?.image_one) }
                                    /><br />
                                    <small>ID IMAGE</small>
                                </div>
                                <div className="col-md-4 mt-2 ">
                                    {
                                        responseData?.status ?
                                            <div style={{ backgroundColor: 'green', borderRadius: 10, }}>
                                                <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                            </div>
                                            :
                                            <div style={{ backgroundColor: 'red', borderRadius: 10, }} className=" p-1">
                                                <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                            </div>
                                    }
                                    <p className="pt-2">Confidence Level: {responseData?.confidence?.toFixed(2)} OF 100</p>
                                </div>
                                <div className="col-md-4 ">
                                    {/* {console.log((getRequestImg()))} */}
                                    <img className="response-img" alt="dashboard-user"
                                        src={imgUrl(getRequestImg())}
                                    /><br />
                                    <small>SELFIE IMAGE</small>
                                </div>
                            </div>

                            :
                            idDataKeys.length < 1 && requestData.hasOwnProperty("image") ?
                                <div className="text-center">
                                    <img className="response-img" alt="dashboard-user"
                                        src={imgUrl(getRequestImg())}
                                    />
                                    <div>
                                        {
                                            responseData?.status ?
                                                <div style={{ backgroundColor: 'green', borderRadius: 10, }}>
                                                    <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                                </div>
                                                :
                                                <div style={{ backgroundColor: 'red', borderRadius: 10, }} className=" p-1">
                                                    <h6 className="m-0 p-0 text-white" style={{font:"12px S-regular",}}>{responseData.message}</h6>
                                                </div>
                                        }
                                        <p className="pt-2">Confidence Level: {responseData?.confidence_in_percentage} OF 100</p>
                                    </div>
                                </div>
                                :
                                <h5 className="text-center mt-5">{responseData.message}</h5>
                        }
                    </>
                    :
                    <h5 className="text-center mt-5">{responseData.message || responseData?.detail}</h5>
            }
        </div>
    );
}