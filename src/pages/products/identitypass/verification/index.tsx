import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import PassBulkVerificationComp from '../../../../components/products/identitypass/verification/bulk'
import PassVerificationHistoryComp from '../../../../components/products/identitypass/verification/history'
import PassSingleVerificationComp from '../../../../components/products/identitypass/verification/single'
import { InvalidAccessRightComp } from '../../../../components/utils'

export default function IdPassVerificationPage(props: any) {
    return (
        <div className="px-4">
            <div className="table-header mt-5">
                <div className="row">
                    <div className="col-md-6 col-lg-5">
                        <h5>Verification</h5>
                        <p>Instantly perform KYC and KYB checks.</p>
                    </div>
                </div>
            </div>

            {props?.userRights?.includes('VERIFICATION') ? (
                <div className="main-tabs my-3">
                    <Tabs
                        defaultActiveKey="single"
                        id="idpassVerifTabs"
                        className="main-tab-card verif-tab">
                        <Tab
                            eventKey="single"
                            title="Single"
                            mountOnEnter={true}
                            unmountOnExit={true}>
                            <PassSingleVerificationComp userRights={props?.userRights} />
                        </Tab>
                        <Tab eventKey="bulk" title="Bulk" mountOnEnter={true} unmountOnExit={true}>
                            <PassBulkVerificationComp />
                        </Tab>
                        {/* <Tab eventKey="verifResults" title="Verification Results">
							<PassVerificationHistoryComp />
						</Tab> */}
                    </Tabs>
                </div>
            ) : (
                <InvalidAccessRightComp />
            )}
        </div>
    )
}
