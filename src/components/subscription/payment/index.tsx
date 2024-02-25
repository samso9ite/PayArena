import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { organisationInfoRequest } from '../../../redux/actions/settings/organisationInfo'
import {
    addCardRequest,
    cardInfoRequest,
    removeCardRequest,
    setDefaultCardRequest,
    setThresholdRequest,
} from '../../../redux/actions/wallet'
import { RootState } from '../../../redux/reducers'
import Mainloader, { removeLetters } from '../../utils'
import NotificationToast from '../../utils/notifToast'
import useTourGuide from '../../../hooks/useTourGuide'

export default function SubPayment(props: any) {
    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()
    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [cardModal, setCardModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false)
    const [defaultModal, setDefaultModal] = useState(false)
    const [moreActions, setMoreActions] = useState(false)
    const [thresholdModal, setThresholdModal] = useState(false)
    const [cardIdx, setCardIdx] = useState('')

    const [cardId, setCardId] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [defaultValue, setDefaultValue] = useState(true)
    const [cvc, setCvc] = useState('')
    const [expDate, setExpDate] = useState('')
    const [thresholdAmount, setThresholdAmount] = useState(
        organisationInfoState?.resp?.data?.organisation?.wallet_funding_threshold
    )
    const [fundAmount, setFundAmount] = useState(
        organisationInfoState?.resp?.data?.organisation?.auto_wallet_funding_amount
    )
    const [fundDate, setFundDate] = useState('')

    const addCardState = useSelector((state: RootState) => state.addCardReducer)
    const cardInfoState = useSelector((state: RootState) => state.cardInfoReducer)
    const removeCardState = useSelector((state: RootState) => state.removeCardReducer)
    const defaultCardState = useSelector((state: RootState) => state.setDefaultCardReducer)

    const thresholdState = useSelector((state: RootState) => state.setThresholdReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        getAllCards()
    }, [])

    let getOrgInfo = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(organisationInfoRequest(data))
    }

    let getAllCards = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(cardInfoRequest(data))
    }

    let addCard = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Card Successfully Added')
                setNotifVal(true)
                getAllCards()
                setCardModal(false)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                card_number: cardNumber,
                exp_month: expDate.slice(5),
                exp_year: expDate.slice(2, 4),
                cvc: cvc,
                default: defaultValue,
            },
            callback,
        }
        if (!cardNumber) {
            setNotifTitle('Error')
            setNotif('Please enter your card number')
            setNotifVal(true)
        } else if (cardNumber?.length < 14 && cardNumber?.length > 16) {
            setNotifTitle('Error')
            setNotif('Invalid card number')
            setNotifVal(true)
        } else if (!expDate) {
            setNotifTitle('Error')
            setNotif('Please input Exp. Date')
            setNotifVal(true)
        } else if (expDate.slice(0, 4) > '2099' || expDate.slice(0, 4) < '2023') {
            setNotifTitle('Error')
            setNotif('Invalid Exp Date')
            setNotifVal(true)
        } else if (!cvc) {
            setNotifTitle('Error')
            setNotif('Please enter CVC')
            setNotifVal(true)
        } else {
            setNotifVal(false)
            dispatch(addCardRequest(data))
        }
    }

    let removeCard = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Card Successfully Removed')
                setNotifVal(true)
                getAllCards()
                setRemoveModal(false)
                setMoreActions(!moreActions)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                card_id: cardId,
            },
            callback,
        }
        dispatch(removeCardRequest(data))
    }

    let setDefault = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Default card sucessfully set')
                setNotifVal(true)
                getAllCards()
                setDefaultModal(false)
                setMoreActions(!moreActions)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                card_id: cardId,
            },
            callback,
        }
        dispatch(setDefaultCardRequest(data))
    }

    let setThreshold = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Threshold successfully Set')
                setNotifVal(true)
                getOrgInfo()
                // setThresholdModal(false)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        if (!thresholdAmount) {
            setNotifTitle('Error')
            setNotif('Please enter your threshold limit')
            setNotifVal(true)
        } else if (!fundDate) {
            setNotifTitle('Error')
            setNotif('Funding date cannot be empty')
            setNotifVal(true)
        } else if (!fundAmount) {
            setNotifTitle('Error')
            setNotif('Please enter your card number')
            setNotifVal(true)
        } else {
            let data: any = {
                values: {
                    status: 0,
                    funding_amount: fundAmount,
                    threshold: thresholdAmount,
                    auto_funding_date: fundDate,
                },
                callback,
            }
            dispatch(setThresholdRequest(data))
        }
    }

    const handleNext = () => {
        setTourGuide({ ...tourGuide, currentStep: 49, subscription_key: '', subscription_page: '' })
        navigate('/Settings')
    }

    const handleBack = () => {
        setTourGuide({
            ...tourGuide,
            currentStep: 47,
            subscription_key: 'subscription',
            subscription_page: '2',
        })
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    return (
        <div className="sub-payment-area my-5">
            {tourGuide.currentStep === 48 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-48 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                {/* <p>5/5</p> */}
                                {!props?.userRights.includes('VIEW_REPORT') ? (
                                    <p>4/4</p>
                                ) : (
                                    <p>5/5</p>
                                )}
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Add Card</h5>
                                    <p>
                                        Add payment card to your account so that you can easily make
                                        subscriptions payments and fund your wallet.
                                    </p>
                                </div>
                                <div className="text-left d-flex flex-row align-items-center justify-content-between btn-reset">
                                    <button
                                        className="btn btn-deep-green-outline"
                                        onClick={handleBack}>
                                        Back
                                    </button>
                                    <button className="btn btn-dark-green" onClick={handleNext}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {(organisationInfoState?.isLoading || cardInfoState?.isLoading) && <Mainloader />}

            {cardModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-6 col-lg-4 mx-auto">
                        <span onClick={() => setCardModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-6 col-lg-5">
                                    <h5>Add Billing Account</h5>
                                </div>

                                <div>
                                    <div className="">
                                        <label htmlFor="cardNumber">Card Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={cardNumber}
                                            maxLength={16}
                                            placeholder="123456789098"
                                            onChange={(number) =>
                                                setCardNumber(removeLetters(number.target.value))
                                            }
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="expiry">
                                                Expiry Date <span style={{ color: 'red' }}> *</span>
                                            </label>
                                            <input
                                                type="month"
                                                value={expDate}
                                                className="form-control"
                                                min="2023-06"
                                                max="2099"
                                                onChange={(date) => setExpDate(date.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="cvc">
                                                CVC <span style={{ color: 'red' }}> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={cvc}
                                                maxLength={3}
                                                placeholder="123"
                                                onChange={(cvc) =>
                                                    setCvc(removeLetters(cvc.target.value))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={defaultValue}
                                                onChange={(def) =>
                                                    setDefaultValue(def.target.checked)
                                                }
                                            />
                                            <span className="slider" />
                                        </label>
                                        <h6 className="mt-3 pt-2">Set as Default</h6>
                                    </div>

                                    <button
                                        className="btn btn-deep-green py-2 mt-4"
                                        onClick={addCard}>
                                        {addCardState.isLoading ? (
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
                                        ) : (
                                            'Add Card'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span onClick={() => setEditModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    {/* <h5>Edit a Member Role</h5> */}
                                </div>

                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {removeModal && (
                <div className="main-modal ">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span onClick={() => setRemoveModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center">
                                    <div className="text-center">
                                        <h5>Are you sure?</h5>
                                        <p>Do you want to remove this card?</p>
                                    </div>
                                    <button
                                        className="btn btn-deep-green-outline py-2 mt-3 me-3"
                                        onClick={() => {
                                            setCardId('')
                                            setMoreActions(false)
                                            setRemoveModal(false)
                                        }}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-deep-green py-2 mt-3"
                                        onClick={removeCard}>
                                        {removeCardState.isLoading ? (
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
                                        ) : (
                                            'Remove Card'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {defaultModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span onClick={() => setDefaultModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center">
                                    <div className="text-center">
                                        <h5>Are you sure?</h5>
                                        <p>
                                            Do you want to make this card your default card? Making
                                            this card your default means all subcription and auto
                                            wallet funding will be carried out through this card.
                                        </p>
                                    </div>
                                    <button
                                        className="btn btn-deep-green-outline py-2 mt-3 me-3"
                                        onClick={() => setDefaultModal(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-deep-green py-2 mt-3"
                                        onClick={setDefault}>
                                        {defaultCardState.isLoading ? (
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
                                        ) : (
                                            'Set as default'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(!organisationInfoState?.isLoading || !cardInfoState?.isLoading) && (
                <>
                    <div>
                        <h5>Payment & Billing Account</h5>
                        <p>
                            Link a payment card to your account for effortless subscription, secure
                            payments, and wallet funding.
                        </p>
                    </div>

                    <div className="row mt-5">
                        {cardInfoState?.resp?.data?.length < 1 && (
                            <div
                                className={`col-md-4 col-lg-3 add-card-area ${
                                    tourGuide.currentStep === 48 ? 'tour-guide-add-card' : ''
                                }`}>
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <span onClick={() => setCardModal(true)}>
                                                <i className="ri-add-fill" />
                                            </span>
                                            <h6 className="mt-3">Add Card</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {cardInfoState?.resp?.data.map((val: any, index: any) => (
                            <div className="col-md-6 col-lg-4 added-card-area" key={index}>
                                <div
                                    className={`card mt-3 ${
                                        val?.card_brand === 'mastercard'
                                            ? 'master-card'
                                            : 'visa-card'
                                    }`}>
                                    <div className="card-body">
                                        <div className="row py-2 ">
                                            <div className="col-10">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <small>Payment Card</small>
                                                    </div>
                                                    {val?.default && (
                                                        <small className="bg-light text-dark py-1 px-3 rounded">
                                                            Default
                                                        </small>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="more-actions-area">
                                                    <i
                                                        className="ri-more-2-fill ri-xl"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            setCardIdx(index)
                                                            setMoreActions(!moreActions)
                                                        }}
                                                    />
                                                    {moreActions && cardIdx === index && (
                                                        <div className="more-actions">
                                                            <p
                                                                onClick={() => {
                                                                    setCardId(val.id)
                                                                    setRemoveModal(true)
                                                                }}>
                                                                Remove
                                                            </p>
                                                            <p
                                                                onClick={() => {
                                                                    setCardId(val.id)
                                                                    setDefaultModal(true)
                                                                }}>
                                                                {' '}
                                                                Make Default
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="row py-3 align-items-end"> */}
                                        <div className="py-3">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p> **** **** **** {val?.last_4} </p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <small>Card Holder</small>
                                                    <p> {val?.card_name || 'Not Available'} </p>
                                                </div>
                                                <div className="col-md-5">
                                                    <small>Expiry Date</small>
                                                    <p> {val?.exp_date || 'Not Available'} </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-2">
                                            {val?.default &&
                                                <span>
                                                    <i className="ri-checkbox-blank-circle-fill active-dot" />
                                                </span>
                                            }
                                        </div> */}
                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {cardInfoState?.resp?.data.length > 0 && (
                            <div className="col-md-4 col-lg-3 add-card-area">
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <div className="text-center">
                                            <span onClick={() => setCardModal(true)}>
                                                <i className="ri-add-fill" />
                                            </span>
                                            <h6 className="mt-3">Add Backup Payment Method</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mt-4 threshold-card px-md-3 py-3">
                                <div className="card-body">
                                    <div>
                                        <h5>Low Wallet Threshold</h5>
                                        <div className="">
                                            <label htmlFor="email">
                                                Threshold Limit{' '}
                                                <span style={{ color: 'red' }}> *</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="500"
                                                value={thresholdAmount}
                                                onChange={(amt) =>
                                                    setThresholdAmount(amt.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="email">
                                                Auto Funding Date{' '}
                                                <span style={{ color: 'red' }}> *</span>
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="500"
                                                value={fundDate}
                                                onChange={(date) => setFundDate(date.target.value)}
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="email">
                                                Amount to fund{' '}
                                                <span style={{ color: 'red' }}> *</span>
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="500"
                                                value={fundAmount}
                                                onChange={(amt) => setFundAmount(amt.target.value)}
                                            />
                                        </div>

                                        <button
                                            className="btn btn-deep-green py-2 mt-4"
                                            onClick={setThreshold}>
                                            {thresholdState.isLoading ? (
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
                                            ) : (
                                                'Proceed'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
