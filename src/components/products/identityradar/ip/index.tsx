import { useState } from "react";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { radarIpIntelligenceRequest} from "../../../../redux/actions/products/identityradar/radarCheck";
import { RootState } from "../../../../redux/reducers";
import NotificationToast from "../../../utils/notifToast";
import IPIntelligenceResponseComp from "./response";

export default function IPIntelligenceComp(props:any) {
    
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")
    const [checkType, setCheckType] = useState([])

    const [ip, setIp] = useState("")
    const [result, setResult] = useState(false)

    const IPIntelligenceState = useSelector((state: RootState) => state.radarIpIntelligenceReducer);

    let dispatch = useDispatch()

    let clearReq = ()=>{
        setIp("")
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

    let validateIP = (IP:string) =>{
    
        let ipv4RegEx = /(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/;
        let ipv6RegEx = /((([0-9a-fA-F]){1,4})\:){7}([0-9a-fA-F]){1,4}/;
        if(ipv4RegEx.test(IP)){
            return "valid";
        }
        else if(ipv6RegEx.test(IP)){
            return "valid";
        }
        else{
            return "invalid";
        }
    }


    let verifyIP = () => {
        const callback = (data: any) => {
            if (data?.success) {
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

        if(!ip){
            setNotifTitle("Error")
            setNotif("Please enter an IP address")
            setNotifVal(true)
            return
        }
        if(validateIP(ip) === "invalid"){
            setNotifTitle("Error")
            setNotif("Invalid IP address")
            setNotifVal(true)
            return
        }
        if(checkType?.length < 1){
            setNotifTitle("Error")
            setNotif("Please select atleast one check type")
            setNotifVal(true)
            return
        }

        let data: any = {

            values: {
                ip_address: ip,
                check_type: checkType
            },

            callback,
        };
        dispatch(radarIpIntelligenceRequest(data))
    }

    let removeIPLetters = (val:any) => {
        let replaceText = val.replace(/([^0-9.]+)/g, '');
        return replaceText
    }
    return (
        <>
            {!result &&
                <div className="col-md-6 mb-5 radar-request-area">

                {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

                    <div className="card">
                        <div className="card-body p-0 px-md-3">
                            <div className="">
                                <label htmlFor="email">IP Address <span style={{color:"red"}}> *</span></label>
                                <input type="text" value={ip} className="form-control" 
                                    onChange={ip => setIp(removeIPLetters(ip.target.value))}
                                    placeholder="41.219.05.100"
                                />
                            </div>

                            <div className="mt-5">
                                <h6> Choose the result(s) you would want for this check <span style={{color:"red"}}> *</span></h6>
                                <div className="d-flex mt-3">
                                    <input type="checkbox" name="" id=""
                                        onChange={()=>pushSetType("geolocation")} 
                                    />
                                    <p className="ps-2 mb-0">Get Geolocation data</p>
                                </div>
                                <div className="d-flex mt-3">
                                    <input type="checkbox" name="" id=""
                                        onChange={()=>pushSetType("ats")} 
                                    />
                                    <p className="ps-2 mb-0">Get IP Autonomous system data</p>
                                </div>
                                <div className="d-flex mt-3">
                                    <input type="checkbox" name="" id=""
                                        onChange={()=>pushSetType("blacklist")} 
                                    />
                                    <p className="ps-2 mb-0">Get IP blacklisting information data</p>
                                </div>
                            </div>

                            <button className="btn btn-deep-green px-4 my-5" onClick={verifyIP}>
                                {IPIntelligenceState.isLoading
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
                                    " Run Check"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            }

            {result &&
                <IPIntelligenceResponseComp data={IPIntelligenceState?.resp?.response} request={ip} goBack={resetResultPage} pushShowSelect={props.pushShowSelect}/>
            }
        </>
    )
}
