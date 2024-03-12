import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import VerificationReports from '../../components/reports/verification'
import RadarReports from '../../components/reports/radar';
import NotificationToast from '../../components/utils/notifToast';
import { apiReportProductsRequest, apiReportRequest } from '../../redux/actions/reports';
import { RootState } from '../../redux/reducers';
import CustomerReports from '../../components/reports/customer';
import Mainloader from '../../components/utils';

export default function ReportsPage(props:any) {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState("")
    const [notifTitle, setNotifTitle] = useState("")

    // const allProductsState = useSelector((state: RootState) => state.apiReportProductsReducer);
    
    const dispatch = useDispatch()

    useEffect(() => {
        // getAllProducts()
    }, [])

    let getAllProducts = () =>{
        const callback = (data: any) => {
            if (data.status) {

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
        dispatch(apiReportProductsRequest(data))
    }

    return (
        <div>
            <div className='container-fluid px-md-4'>
                {(notif && notifVal) && <NotificationToast title={notifTitle} message={notif} closeNotif={() => setNotifVal(!notifVal)} />}

                <div className="table-header mt-5">
                    <div className="row">
                        <div className="col-md-5">
                            <h5>Reports</h5>
                            <p>Here are all your audit logs</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* {(allProductsState?.isLoading) && <Mainloader/>} */}

            {/* {(!allProductsState?.isLoading) &&  */}
                <div className='container-fluid px-md-4 bg-light-blue pb-5'>
                    {/* {allProductsState?.resp?.data.length > 0 && */}
                        <div className="main-tabs mt-3">
                            {/* <Tabs defaultActiveKey={"Identitypass Report"} id="reportsTabs" className="main-tab-card"> */}
                                {/* {allProductsState?.resp?.data?.map((val:any, i:number)=>(
                                    (val?.name === "Identitypass") && */}
                                    {/* <Tab eventKey={"IdentityPass Report"} title="IdentityPass Report" mountOnEnter={true} unmountOnExit={true} > */}
                                        <VerificationReports  userRights={props?.userRights} tag={"IdentityPass Report"} />
                                    {/* </Tab> */}
                                {/* ))} */}
                               {/* <Tab eventKey="verificationReport" title="Verification Report"  mountOnEnter={true} unmountOnExit={true}>
                                    <VerificationReports  report={apiReportState?.resp?.data} tag={'Verification'} />
                                </Tab> 
                                  <Tab eventKey="radarReport" title="Radar Report" >
                                    <RadarReports report={apiReportState?.resp?.data} />
                                </Tab>
                                <Tab eventKey="backgroundCheckReport" title="Background Check Report">
                                </Tab> */}
                                {/* <Tab eventKey="customerReport" title="Customer Report" mountOnEnter={true} unmountOnExit={true}>
                                    <CustomerReports tag={"Customer"} />
                                </Tab> */}
                            {/* </Tabs> */}
                        </div>
                    {/* } */}
                </div>
            {/* } */}
        </div>
    )
}
