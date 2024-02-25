import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import APIKeys from '../../components/ApiLibraries/apiKeys'
import ApiStatusComp from '../../components/ApiLibraries/apiStatus'
import Application from '../../components/ApiLibraries/applications'
// import SDKComp from '../../components/ApiLibraries/SDK'



// ...................................................................
// ..........................---------------------........................

// Noteeeee  this page is currently not in use, check out the API Libraries inside Component


export default function APILibraries() {
    return (
        <div className='container-fluid px-md-4'>
            <div className="main-tabs mt-3">
                <Tabs defaultActiveKey="apiKeys" id="libraryTabs" className=" main-tab-card">
                    <Tab eventKey="apiKeys" title="API Keys">
                        <APIKeys/>
                    </Tab>
                    <Tab eventKey="application" title="Applications">
                        <Application />
                    </Tab>
                    {/* <Tab eventKey="sdk" title="SDK">
                        <SDKComp />
                    </Tab> */}
                    <Tab eventKey="apiStatus" title="API Status">
                        <ApiStatusComp />
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
