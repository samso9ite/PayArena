import React, { useEffect, useState } from 'react'
import PerksSearch from '../../../../components/perks-and-discount/search-perks/PerksSearch'
import { classnames, copyTextToClipboard } from '../../../../utils'
import Button from '../../../../components/form/button/Button'
import '../../../../styles/pages/perks-discount.css'
import BackBtn from '../../../../components/perks-and-discount/backBtn/BackBtn'
import Like from '../../../../components/perks-and-discount/like/Like'
import {
    perksAndDiscountGenerateCodeRequest,
    perksAndDiscountLikeRequest,
    perksAndDiscountProductDetailsRequest,
    perksAndDiscountUnLikeRequest,
} from '../../../../redux/actions/perksAndDiscount'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ElementProps } from '../../../../enum'
import { RootState } from '../../../../redux/reducers'
import {
    PerksAndDiscountGenerateCodePayload,
    PerksAndDiscountGenerateCodeRequest,
    PerksAndDiscountLikePayload,
    PerksAndDiscountLikeRequest,
} from '../../../../redux/actions/perksAndDiscount/types'
import GenerateCode from '../../../../components/perks-and-discount/generate-code-button'
import NotificationToast from '../../../../components/utils/notifToast'

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
    return <div className={`p-3 ${classnames(className)}`}>{children}</div>
}

const PerksAndDiscountDetails = (props: ElementProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const { id = '' } = useParams()

    const perksAndDiscountInfoState = useSelector(
        (state: RootState) => state.perksAndDiscountInfoReducer
    )

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)

    const { data: { user: { is_perk_eligible = false } = {} } = {} } =
        organisationInfoState.resp || {}

    const {
        brand_name = '',
        description = '',
        price = '',
        discount_percentage = '',
        discount_price = '',
        restrictions = '',
        image_url = '',
        is_favorite = false,
        redirect_url = '',
        is_code = false,
        code = '',
        is_eligible = false,
    } = perksAndDiscountInfoState.details

    const getDetails = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: id,
            callback,
        }
        dispatch(perksAndDiscountProductDetailsRequest(data))
    }

    const handleNavigate = () => {
        navigate(-1)
    }

    const handleRedirect = () => {
        if (is_perk_eligible) {
            window.open(redirect_url, '_blank')
        } else {
            setNotifTitle('Error')
            setNotif(
                'You are not eligible, complete a minimum of 3 live verification per month to be eligible'
            )
            setNotifVal(true)
        }
    }

    const likeProduct = (
        id: string,
        dispatchFunc: (payload: PerksAndDiscountLikePayload) => PerksAndDiscountLikeRequest
    ) => {
        const callback = (data: any) => {
            let key
            let message = ''
            if (typeof data.detail !== 'string') {
                key = Object.keys(data.detail || {})
                for (let i = 0; i < key.length; i++) {
                    message += `${key[i]} ${data.detail[key[i]]}`.replace('This', '')
                }
            } else {
                message = data.detail
            }

            if (!data.status) {
                setNotifTitle('Error')
                setNotif(message)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: { product_id: id, caller: 'DEETS' },
            callback,
        }
        dispatch(dispatchFunc(data))
    }

    const generateCode = (
        id: string,
        dispatchFunc: (
            payload: PerksAndDiscountGenerateCodePayload
        ) => PerksAndDiscountGenerateCodeRequest
    ) => {
        const callback = (data: any) => {
            let key
            let message = ''
            if (typeof data.detail !== 'string') {
                key = Object.keys(data.detail || {})
                for (let i = 0; i < key.length; i++) {
                    message += `${key[i]} ${data.detail[key[i]]}`.replace('This', '')
                }
            } else {
                message = data.detail
            }

            if (!data.status) {
                setNotifTitle('Error')
                setNotif(message)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: id,
            callback,
        }
        if (is_perk_eligible) {
            dispatch(dispatchFunc(data))
        } else {
            setNotifTitle('Error')
            setNotif(
                'You are not eligible, complete a minimum of 3 live verification per month to be eligible'
            )
            setNotifVal(true)
        }
    }

    const handleCopyToClipboard = () => {
        copyTextToClipboard(code)
            .then((e: string) => {
                setNotifTitle('Success')
                setNotif(e)
                setNotifVal(true)
            })
            .catch((e: string) => {
                setNotifTitle('Error')
                setNotif(e)
                setNotifVal(true)
            })
    }

    useEffect(() => {
        getDetails()
    }, [])

    useEffect(() => {
        props.changeLoadingState(perksAndDiscountInfoState.isLoadingDetails)
    }, [perksAndDiscountInfoState.isLoadingDetails])

    return (
        <>
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}
            <div className="px-4 pb-4">
                <PerksSearch onSearchFunc={() => {}} />

                <BackBtn text={brand_name} onClick={handleNavigate} className="mt-4" />

                <section className="details-cards-wrapper mt-4 pt-4 d-flex justify-content-between">
                    <Card className="details-img-desc-wrapper d-flex">
                        <div className="details-img-wrapper">
                            <img src={image_url} alt="product" className="details-img" />
                        </div>
                        <div className="details-desc-wrapper">
                            <h6 className="details-desc-header">{brand_name}</h6>
                            <p className="details-desc-paragraph">{description}</p>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div>
                                    <div className="details-discount-price">{discount_price}</div>
                                    <div className="details-discount-prev-price">
                                        {price}{' '}
                                        <span className="details-discount-percentage">
                                            -{discount_percentage}%
                                        </span>
                                    </div>
                                </div>
                                <Like
                                    isLiked={Boolean(is_favorite)}
                                    disabled={perksAndDiscountInfoState.isLiking}
                                    onClick={() =>
                                        likeProduct(
                                            id,
                                            Boolean(is_favorite)
                                                ? perksAndDiscountUnLikeRequest
                                                : perksAndDiscountLikeRequest
                                        )
                                    }
                                />
                            </div>
                            {restrictions && (
                                <div className="mt-3">
                                    <strong>Restrictions:</strong> {restrictions}
                                </div>
                            )}
                            <div className="d-flex flex-column gap-2 mt-4">
                                <GenerateCode
                                    disable={perksAndDiscountInfoState.isGeneratingCode}
                                    showComp={is_code}
                                    showCode={Boolean(code)}
                                    onGenerateCode={() =>
                                        generateCode(id, perksAndDiscountGenerateCodeRequest)
                                    }
                                    onCopyCode={handleCopyToClipboard}
                                    codeToCopy={code}
                                />
                            </div>
                        </div>
                    </Card>
                    <Card className="details-proceed-wrapper">
                        <h6 className="details-proceed-header">How to redeem discount</h6>
                        <p className="details-proceed-paragraph">
                            {is_code
                                ? 'Copy and paste your unique generated code when you are about to checkout'
                                : 'To proceed to the website, please click on the "Get offer" button below and Voila, you’re done!'}
                        </p>

                        {!is_code && (
                            <Button onClick={handleRedirect} className="details-get-offer-btn">
                                Get offer
                            </Button>
                        )}
                    </Card>
                </section>
            </div>
        </>
    )
}

export default PerksAndDiscountDetails
