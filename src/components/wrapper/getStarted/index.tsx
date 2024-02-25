import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    getStartedIconFive,
    getStartedIconFour,
    getStartedIconOne,
    getStartedIconThree,
    getStartedIconTwo,
    getStartedDashboard,
    getStartedIdentityPass,
    getStartedIdentityRadar,
    getStartedIntegration,
} from '../../../assets/svgs'
import FundingImage from '../../../assets/svgs/certificate.svg'
import LaptopImage from '../../../assets/svgs/laptop.svg'
import useTourGuide from '../../../hooks/useTourGuide'

export default function GetStartedComp(props: any) {
    const [tourGuide, _] = useTourGuide()
    const [openGuide, setOpenGuide] = useState(false)
    const [openCompliance, setOpenCompliance] = useState(false)
    const [openWallet, setOpenWallet] = useState(false)

    return (
        <div className="main-modal p-0 ">
            <div
                className="main-modal-content card col-md-5 col-lg-4 ms-auto"
                style={{ minHeight: '100vh' }}>
                <span
                    onClick={() => {
                        props.closeModal()
                        setOpenGuide(false)
                        setOpenCompliance(false)
                        setOpenWallet(false)
                    }}>
                    <i className="ri-close-line close-modal" />
                </span>
                <div className="card-body">
                    <div className="main-modal-body">
                        <div className=" col-md-8 col-lg-5">
                            <p className="link-underline pb-1">Lets set you up quickly</p>
                        </div>

                        <div className="get-started-area pt-3">
                            <div className="d-flex mt-3">
                                <div className="card w-100">
                                    <div className="card-body p-0">
                                        <div className="d-flex align-items-center justify-content-between px-3 py-3">
                                            <span className="d-flex align-items-center">
                                                <span>{getStartedIconOne}</span>
                                                <p className="m-0 ps-2">Quick guide</p>
                                            </span>
                                            <i
                                                className={`${
                                                    openGuide
                                                        ? 'ri-arrow-up-s-line'
                                                        : 'ri-arrow-down-s-line'
                                                } ri-xl`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setOpenGuide(!openGuide)}
                                            />
                                        </div>

                                        {openGuide && (
                                            <div className="text-left mt-2">
                                                <div
                                                    className="border px-3 py-3 d-flex items-center cursor-pointer"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={props.handleRetriggerDashboard}>
                                                    <span>{getStartedDashboard}</span>
                                                    <p className="ps-2 mb-0">Dashboard</p>
                                                </div>
                                                <div
                                                    className="border px-3 py-3 d-flex items-center"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={props.handleRetriggerIDPass}>
                                                    <span>{getStartedIdentityPass}</span>
                                                    <p className="ps-2 mb-0">Identitypass</p>
                                                </div>
                                                <div
                                                    className="border px-3 py-3 d-flex items-center"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={props.handleRetriggerIDRadar}>
                                                    <span>{getStartedIdentityRadar}</span>
                                                    <p className="ps-2 mb-0">Identityradar</p>
                                                </div>
                                                <div
                                                    className="border px-3 py-3 d-flex items-center"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={props.handleRetriggerAPILib}>
                                                    <span>{getStartedIntegration}</span>
                                                    <p className="ps-2 mb-0">Integration</p>
                                                </div>
                                                <div
                                                    className="border px-3 py-3 d-flex items-center"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={props.handleRetriggerGeneral}>
                                                    <span>{getStartedIconOne}</span>
                                                    <p className="ps-2 mb-0">General</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="ms-3 mt-3">
                                    {tourGuide.isCompleted
                                        ? getStartedIconFour
                                        : getStartedIconFive}
                                </span>
                            </div>

                            <div className="d-flex mt-3">
                                <div className="card w-100">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span className="d-flex align-items-center">
                                                <span>{getStartedIconTwo}</span>
                                                <p className="m-0 ps-2">Compliance</p>
                                            </span>
                                            <i
                                                className={`${
                                                    openCompliance
                                                        ? 'ri-arrow-up-s-line'
                                                        : 'ri-arrow-down-s-line'
                                                } ri-xl`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setOpenCompliance(!openCompliance)}
                                            />
                                        </div>

                                        {openCompliance && (
                                            <div className="text-center">
                                                <div
                                                    className="bg-light py-5 my-3 mx-auto"
                                                    style={{ width: '90%' }}>
                                                    <img
                                                        src={FundingImage}
                                                        alt="Fund your wallet"
                                                        style={{ width: '150px', height: '150px' }}
                                                    />
                                                </div>
                                                <p>
                                                    Finish up your KYB process by providing few more
                                                    details about your business.
                                                </p>

                                                <Link to="/Settings?kyc=true">
                                                    <button className="btn btn-deep-green ms-3 px-4">
                                                        Complete KYB
                                                    </button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="ms-3 mt-3">
                                    {props?.KYCStatus === 'APPROVED'
                                        ? getStartedIconFour
                                        : getStartedIconFive}
                                </span>
                            </div>

                            <div className="d-flex mt-3">
                                <div className="card w-100">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <span className="d-flex align-items-center">
                                                <span>{getStartedIconThree}</span>
                                                <p className="m-0 ps-2">Fund your wallet</p>
                                            </span>
                                            <i
                                                className={`${
                                                    openWallet
                                                        ? 'ri-arrow-up-s-line'
                                                        : 'ri-arrow-down-s-line'
                                                } ri-xl`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setOpenWallet(!openWallet)}
                                            />
                                        </div>

                                        {openWallet && (
                                            <div className="text-center">
                                                <div
                                                    className="bg-light py-5 my-3 mx-auto"
                                                    style={{ width: '90%' }}>
                                                    <img
                                                        src={LaptopImage}
                                                        alt="Laptop"
                                                        style={{ width: '150px', height: '150px' }}
                                                    />
                                                </div>
                                                <p>Fund your wallet to start using all our APIs</p>
                                                <Link to="/Subscription">
                                                    <button className="btn btn-deep-green ms-3 px-4">
                                                        Fund Wallet
                                                    </button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="ms-3 mt-3">
                                    {props?.fundingStatus > 0
                                        ? getStartedIconFour
                                        : getStartedIconFive}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn btn-deep-green dismiss-modal w-100"
                        onClick={() => {
                            props.closeModal()
                            setOpenGuide(false)
                            setOpenCompliance(false)
                            setOpenWallet(false)
                        }}>
                        Dismiss Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}
