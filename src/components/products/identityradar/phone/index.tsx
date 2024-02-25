import { useState } from "react";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { radarMobileIntelligenceRequest } from "../../../../redux/actions/products/identityradar/radarCheck";
import { RootState } from "../../../../redux/reducers";
import NotificationToast from "../../../utils/notifToast";
import PhoneIntelligenceResponseComp from "./response";
import { isPossiblePhoneNumber, isValidNumberForRegion, isValidPhoneNumber, parsePhoneNumber, validatePhoneNumberLength } from 'libphonenumber-js'
import { removeLetters } from "../../../utils";
import { countryList } from "../../../utils/countries";
import { getCountryFlag } from "../../../utils/flags";

export default function PhoneIntelligenceComp(props:any) {
    
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")

    const [phone, setPhone] = useState("")
    const [result, setResult] = useState(false)
    const [checkType, setCheckType] = useState([])
    const [countryCode, setCountryCode] = useState("NG")

    const mobileIntelligenceState = useSelector((state: RootState) => state.radarMobileIntelligenceReducer);

    let dispatch = useDispatch()

    let clearReq = ()=>{
        setPhone("")
        setCheckType([])
    }

    let resetResultPage = () => {
        clearReq()
        setResult(!result)
    }

    let pushSetType = (type:string) => {
        var typeData:any = checkType

        var typeIdx = typeData.findIndex((typ: string) => typ === type)

        if (typeIdx !== -1) {
            typeData.splice(typeIdx, 1);
        }
        else{
            typeData.push(type)
        }
        setCheckType(typeData)
    }
    

    let verifyPhone = () => {
        let country_code:any = countryCode
        const phoneNumber = parsePhoneNumber(phone, country_code)
        const formattedPhoneNumber = phoneNumber.formatInternational()

        const callback = (data: any) => {
            if (data.success) {
                setNotifTitle("Success")
                setNotifVal(true)
                props.pushShowSelect()
                resetResultPage()
            }
            else {
                setNotifTitle("Error")
                setNotif(data?.response?.message)
                setNotifVal(true)
            }
        };

        if(!phone){
            setNotifTitle("Error")
            setNotif("Please enter a phone number")
            setNotifVal(true)
            return
        }

        if(
            !isPossiblePhoneNumber((phone), country_code) || !isValidPhoneNumber(phone, country_code) ||
            !isValidNumberForRegion(phone, country_code) ||
            validatePhoneNumberLength(phone, country_code) === 'TOO_SHORT' || 
            validatePhoneNumberLength(phone, country_code) === 'INVALID_LENGTH' ||
            validatePhoneNumberLength(phone, country_code) === 'TOO_LONG' ||
            (country_code === "NG" && phone?.length !== 10 )
        ){
            setNotifTitle("Error")
            setNotif("Invalid Mobile Number format")
            setNotifVal(true)
            return
        }

        if(checkType?.length < 1){
            setNotifTitle("Error")
            setNotif("Please select atleast one check type")
            setNotifVal(true)
            return
        }
          
        // if(!isPossiblePhoneNumber((phone), country_code) || !isValidPhoneNumber(phone, country_code) ||
        //     validatePhoneNumberLength(phone, country_code) === 'TOO_SHORT' || 
        //     validatePhoneNumberLength(phone, country_code) === 'TOO_LONG' 
        // ){
        //     setNotifTitle("Error")
        //     setNotif("Invalid Mobile Number format")
        //     setNotifVal(true)
        //     return
        // }

        if(phone?.includes("+")){
            setNotifTitle("Error")
            setNotif('Remove "+" from Mobile Number')
            setNotifVal(true)
            return
        }

        let data: any = {
            values: {
                mobile:formattedPhoneNumber.replaceAll("+", "").replaceAll(" ", ""),
                // mobile: phone,
                check_type: checkType
            },

            callback,
        };
        dispatch(radarMobileIntelligenceRequest(data))
    }


    return (
        <>
            {!result &&
                <div className="col-md-6 mb-5 radar-request-area">

                    {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

                    <div className="card" style={{ border: "none" }}>
                        <div className="card-body p-0 px-md-3">
                            <div className="">
                                <label htmlFor="email">Phone Number <span style={{color:"red"}}> *</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <select className="form-select" onChange={e =>setCountryCode(e.target.value)} value={countryCode} style={{ borderRadius: "5px 0px 0px 5px" }}>
                                            {countryList?.map((country, i) => (
                                                <option key={i} value={country?.code}>{getCountryFlag(country?.code)} {country?.dialCode}</option>
                                            ))}
                                        </select>
                                    </div>
                                <input type="tel" value={phone} className="form-control" 
                                    onChange={phone => setPhone(removeLetters(phone.target.value))}
                                    placeholder="7012345678"
                                />
                                </div>
                            </div>

                            <div className="mt-5">
                                <h6> Choose the result(s) you would want for this check</h6>
                                <div className="d-flex mt-3">
                                    <input type="checkbox" name="" id="" 
                                        onChange={()=>pushSetType("basic")}
                                    />
                                    <p className="ps-2 mb-0">Get Basic Phone data</p>
                                </div>
                                <div className="d-flex mt-3">
                                    <input type="checkbox" name="" id="" 
                                        onChange={()=>pushSetType("advance")}
                                    />
                                    <p className="ps-2 mb-0">Get Advanced Phone data</p>
                                </div>
                                <div className="d-flex mt-3">
                                    <input type="checkbox" name="" id="" 
                                        onChange={()=>pushSetType("whatsapp")}
                                    />
                                    <p className="ps-2 mb-0">Get Social Data</p>
                                </div>
                            </div>

                            <button className="btn btn-deep-green px-4 my-5" onClick={verifyPhone}>
                                {mobileIntelligenceState?.isLoading
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
                                    "Run Check"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            }

            {result &&
                <PhoneIntelligenceResponseComp data={mobileIntelligenceState?.resp?.response} request={phone}  goBack={resetResultPage} pushShowSelect={props.pushShowSelect} />
            }
        </>
    )
}
