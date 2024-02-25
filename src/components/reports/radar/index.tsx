import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { FailedTag, SuccessTag } from '../../utils'
import checkedImg from '../../../assets/checked-img.png'
import cancelImg from '../../../assets/cancel-img.png'
import docImg from '../../../assets/doc-img.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import moment from 'moment'

export default function RadarReports(props:any) {

    return (
        <div>
            <div className="main-table-area mt-5">
                <div className="table-header">
                    <div className="row">
                        <div className="col-md-5">
                            <h5>Activity Logs</h5>
                            <p>Here are all your audit logs</p>
                        </div>
                        <div className="col-md-7 text-end">

                        </div>
                    </div>
                </div>
            </div>

            <div className="sub-tabs mt-3">
                <Tabs defaultActiveKey="api" id="idpassLogTabs" className=" sub-tab-card">
                    <Tab eventKey="api" title="API Calls">

                        <div className="report-card-area mb-5">
                            <div className="row">
                                <div className="col-md-4 mt-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <img src={checkedImg} alt="" />
                                                </div>
                                                <div className="col-md-10">
                                                    <small>Successful Calls</small>
                                                    <p>{props?.report?.successful_count}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mt-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <img src={cancelImg} alt="" />
                                                </div>
                                                <div className="col-md-10">
                                                    <small>Failed Calls</small>
                                                    <p>{props?.report?.failed_count}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mt-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <img src={docImg} alt="" />
                                                </div>
                                                <div className="col-md-10">
                                                    <small>Total Calls</small>
                                                    <p>{props?.report?.total_api_logs}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive mt-3">
                            <table className="table">
                                <thead className="">
                                    <tr>
                                        <th scope="col">Endpoint</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Charge Source</th>
                                        <th scope="col">Source</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props?.report?.logs?.map((val:any, i:number) =>(
                                        <tr key={i}>
                                            <th scope="row">{val?.response_data?.channel}</th>
                                            <td> {val?.billing_status ? val?.price : "Not Charged"} </td>
                                            <td> {val?.charge_source} </td>
                                            <td> {val?.source}</td>
                                            <td> {moment.utc(val?.created_at).format('lll')}</td>
                                            <td> {val?.billing_status ? <SuccessTag /> : <FailedTag />}</td>
                                            <td>
                                                <button className='btn btn-view'>
                                                    <i className='ri-eye-line me-3 ri-xl' />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Tab>
                    <Tab eventKey="bulk" title="Bulk Verification">
                        <></>
                    </Tab>
                    <Tab eventKey="event" title="Event Logs">
                        <></>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
