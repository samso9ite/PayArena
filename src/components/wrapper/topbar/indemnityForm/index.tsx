import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { acceptIndemnityFormRequest } from '../../../../redux/actions/dashboard'
import { RootState } from '../../../../redux/reducers'
import NotificationToast from '../../../utils/notifToast'
import { organisationInfoRequest } from '../../../../redux/actions/settings/organisationInfo'

export default function IndemnityFormComp(props: any) {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const acceptIndemnityState = useSelector((state: RootState) => state.acceptIndemnityFormReducer)

    const dispatch = useDispatch()

    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    let getOrganizatioInfo = () => {
        const callback = (data: any) => {
            if (!data.status) {
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

    let acceptIndemnity = () => {
        const callback = (data: any) => {
            if (data?.status) {
                props?.triggerNotif('Success', 'Indemnity form successfully accepted', true)
                props.closeModal()
                getOrganizatioInfo()
            } else {
                props?.triggerNotif('Error', data?.detail, true)
            }
        }
        let data = {
            callback,
        }
        dispatch(acceptIndemnityFormRequest(data))
    }

    return (
        <div className="main-modal ">
            <div className="main-modal-content card col-md-7 col-lg-5 mx-auto">
                <span onClick={() => props.closeModal()}>
                    <i className="ri-close-line close-modal" />
                </span>
                <div className="card-body">
                    <div className="main-modal-body">
                        <div className="main-modal-header col-md-8 col-lg-5">
                            <h5>Prembly Indemnity Agreement</h5>
                        </div>

                        <div style={{ color: '#005e7a', textAlign: 'start', fontSize: '13px' }}>
                            <p>
                                This Indemnity Agreement ("Agreement") is made and entered into on{' '}
                                {new Date().getDate()} day of {months[new Date().getMonth()]},{' '}
                                {new Date().getFullYear()} by and between Prembly Limited
                                (“Prembly”, “us”, “we”, “our” and which expression shall include
                                Prembly’s officers, directors, employees, agents, and affiliates)
                                and <b>{props?.orgName?.toUpperCase()}</b>, all persons or entities
                                that request the use of our offerings whether as a guest or
                                registered user (hereinafter referred to as “you”, “your”, “the
                                Customer”)
                            </p>

                            <p>
                                Prembly operates an SDK/API/platform (the “Platform”) which provides
                                various product offerings for the processing of verification request
                                and other related services (the “Services”) as may be displayed on
                                the Platform from time to time.
                            </p>

                            <p>
                                This Agreement sets forth the terms under which You agree to
                                indemnify and hold Us harmless for Your use of the Services. This
                                Agreement shall be read and shall apply in conjunction with Prembly
                                Terms of Use of the Platform. By using the Platform and consequently
                                our Services, You confirm that you have carefully read this
                                Agreement and agree to be bound by its terms.
                            </p>

                            <p>
                                Further to the provision of the Services and the use of the
                                Platform, the Customer hereby agrees to indemnify and hold Prembly
                                harmless from and against any and all Claims arising out of or
                                relating to:
                            </p>

                            <ol className="ps-3">
                                <li className="">
                                    <p>
                                        Your failure to obtain the relevant consent or a legal basis
                                        for processing the data that you input on the Platform for
                                        verification;
                                    </p>
                                </li>

                                <li>
                                    <p>breach of any data protection laws; </p>
                                </li>

                                <li>
                                    <p>
                                        breach of any confidentiality obligations between you and
                                        any third party;{' '}
                                    </p>{' '}
                                </li>

                                <li>
                                    <p>
                                        illegal/unlawful use of the information contained in any
                                        report emanating from us following a request from you via
                                        Our Platform;
                                    </p>
                                </li>

                                <li>
                                    <p>
                                        any claims, suits, losses, damages, liabilities and expenses
                                        (whether direct, indirect or consequential) suffered as a
                                        result of your breach of any law while using the Platform
                                        and our Services.
                                    </p>
                                </li>
                            </ol>

                            <p> You understand and agree that- </p>

                            <ol className="ps-3">
                                <li>
                                    <p>
                                        Your liability under this Agreement shall be at the total
                                        cost of any claim, liability or fines imposed/incurred by
                                        Prembly following your use of our Platform and Services in
                                        any illegal/unlawful manner, or in any manner contrary to
                                        the provisions of Our Terms of Use.
                                    </p>
                                </li>

                                <li>
                                    <p>
                                        This Agreement shall not be construed to limit Prembly’s
                                        right to seek other remedies/redress that may be available
                                        to Us under any applicable law.
                                    </p>
                                </li>

                                <li>
                                    <p>
                                        This Agreement is binding on you and your successors and
                                        assigns, and shall inure to Prembly’s benefit, PROVIDED
                                        however, that none of Your obligations under this Agreement
                                        may be assigned or novated to any third party without
                                        Prembly’s express prior written approval.
                                    </p>
                                </li>
                            </ol>

                            <p>
                                By clicking on “I Agree” or by using our Platform/Service, You agree
                                to be bound by the terms of this Agreement. By agreeing to the terms
                                of this Agreement, You represent that you have the capacity to be
                                bound by it, and if you are entering this on behalf of an entity,
                                you represent that you have the authority to bind that entity.
                            </p>
                        </div>

                        <button
                            className="btn btn-deep-green py-2 mt-4 px-4"
                            onClick={acceptIndemnity}>
                            {acceptIndemnityState?.isLoading ? (
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
                                'I Agree'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
