import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
// import SubOverview from "../../components/subscription/overview";
import SubPayment from '../../components/subscription/payment'
import SubscriptionComp from '../../components/subscription/subscription'
import SubWalletComp from '../../components/subscription/wallet'
import useTourGuide from '../../hooks/useTourGuide'
import global from '../../redux/constants/global'
import SubPricingComp from '../../components/subscription/pricing'

export default function SubscriptionPage(props: any) {
    const [tourGuide, setTourGuide] = useTourGuide()
    const [key, setKey] = useState<any>(
        (!props?.userRights?.includes('WALLET') &&
            props?.userRights?.includes('SUBSCRIPTION')
        ) ?'subscription' :
        (!props?.userRights?.includes('WALLET') &&
            !props?.userRights?.includes('SUBSCRIPTION') &&
            props?.userRights?.includes('CARD')
        ) ?'payment': 'wallet'
    )
    const [idpassId, setIdpassId] = useState('')
    const [radarId, setRadarId] = useState('')

    let accessT = Cookies.get("babtbu") || ""
    let orgId = Cookies.get("org") || ""

    useEffect(() => {
        if (
            tourGuide.currentStep === 45 ||
            tourGuide.currentStep === 46 ||
            tourGuide.currentStep === 47 ||
            tourGuide.currentStep === 48
        ) {
            setKey(tourGuide.subscription_key)
        }
    }, [tourGuide])

    useEffect(() => {
        getAllProducts()
    }, [])

    let getAllProducts = () =>{
        let config = {
            method: 'get',
            url: global.apiBaseUrl + global.liveUrl + `api/v1/billing/product`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: accessT,
                Organisation: orgId,
            },
            // data : data
        };

        axios.request(config)
        .then((response) => {
            response?.data?.data?.forEach((val: any,) => {
                if(val?.name === 'Identitypass'){
                    setIdpassId(val?.id)
                }
              
            })
        })
        .catch((error) => {
           console.log(error);
        });
    }

    return (
        <div className="container-fluid px-md-4">
            <div className="main-tabs mt-3">
                <Tabs
                    // defaultActiveKey="wallet"
                    activeKey={key}
                    id="subTabs"
                    className=" main-tab-card"
                    onSelect={(k) => setKey(k)}>
                    {props?.userRights?.includes('WALLET') && (
                        <Tab eventKey="wallet" title="Wallet">
                            <SubWalletComp permissionKey={props?.permissionKey} />
                        </Tab>
                    )}
                    {props?.userRights?.includes('SUBSCRIPTION') && (
                        <Tab eventKey="subscription" title="Subscription">
                            <SubscriptionComp userRights={props?.userRights} idpassId={idpassId} radarId={radarId}/>
                        </Tab>
                    )}
                    <Tab eventKey="pricing" title="Pricing">
                        <SubPricingComp userRights={props?.userRights}/>
                    </Tab>
                    {/* <Tab eventKey="overview" title="Overview">
						<SubOverview />
					</Tab> */}
                    {props?.userRights?.includes('CARD') && (
                        <Tab eventKey="payment" title="Payment & Billing">
                            <SubPayment userRights={props?.userRights} />
                        </Tab>
                    )}
                </Tabs>
            </div>
        </div>
    )
}
