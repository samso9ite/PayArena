import React, { useEffect, useMemo, useState } from 'react'
import { ElementProps, PerksDiscountCardParams } from '../../../../enum'
import NotificationToast from '../../../../components/utils/notifToast'
import PerksSearch from '../../../../components/perks-and-discount/search-perks/PerksSearch'
import Card from '../../../../components/perks-and-discount/card/Card'
import Like from '../../../../components/perks-and-discount/like/Like'
import Button from '../../../../components/form/button/Button'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from '../../../../assets'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/reducers'
import {
    perksAndDiscountFavoriteRequest,
    perksAndDiscountLikeRequest,
    perksAndDiscountUnLikeRequest,
} from '../../../../redux/actions/perksAndDiscount'
import '../../../../styles/pages/perks-discount.css'
import BackBtn from '../../../../components/perks-and-discount/backBtn/BackBtn'
import {
    PerksAndDiscountLikePayload,
    PerksAndDiscountLikeRequest,
} from '../../../../redux/actions/perksAndDiscount/types'
import emptyBox from '../../../../assets/empty-box.png'

const Favourites = (props: ElementProps) => {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const perksAndDiscountInfoState = useSelector(
        (state: RootState) => state.perksAndDiscountInfoReducer
    )

    const handleSearch = (e: any) => {
        const value = e.target.value.toLowerCase()
        setSearchValue(value)
        if (value) {
            const filter = perksAndDiscountInfoState.favorite?.filter(
                ({
                    brand_name = '',
                    product_name = '',
                    category: { name = '' },
                }: {
                    brand_name: string
                    product_name: string
                    category: any
                }) =>
                    brand_name.toLowerCase().includes(value) ||
                    product_name.toLowerCase().includes(value) ||
                    name.toLowerCase().includes(value)
            )
            setSearchResult(filter)
        } else {
            setSearchResult([])
        }
    }

    const getFavorites = () => {
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
        dispatch(perksAndDiscountFavoriteRequest(data))
    }

    const handleNavigate = () => {
        navigate(-1)
    }

    // const handleRedirect = () => {
    //     window.open(redirect_url, '_blank')
    // }

    const handleViewOffer = (id: string) => {
        navigate(`/Perks-And-Discount-Details/${id}`)
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
            values: { product_id: id, caller: 'FAVORITE' },
            callback,
        }
        dispatch(dispatchFunc(data))
    }

    const length = useMemo(() => {
        if (searchResult.length > 0) {
            return searchResult.length
        } else {
            return perksAndDiscountInfoState.favorite?.length
        }
    }, [searchResult, perksAndDiscountInfoState.favorite])

    // const fav = useMemo(() => {
    //     const fav = perksAndDiscountInfoState.favorite?.filter(
    //         ({ is_favorite }: { is_favorite: boolean }) => is_favorite === true
    //     )
    //     return fav
    // }, [perksAndDiscountInfoState.favorite])

    useEffect(() => {
        getFavorites()
    }, [])

    useEffect(() => {
        props.changeLoadingState(perksAndDiscountInfoState.isLoadingFavorites)
    }, [perksAndDiscountInfoState.isLoadingFavorites])
    return (
        <div className="px-4 pb-4">
            <div>
                {notif && notifVal && (
                    <NotificationToast
                        title={notifTitle}
                        message={notif}
                        closeNotif={() => setNotifVal(!notifVal)}
                    />
                )}
                <div className="">
                    <PerksSearch onSearchFunc={handleSearch} />

                    <BackBtn
                        text={`My Favourites (${length})`}
                        onClick={handleNavigate}
                        className="mt-4"
                    />

                    <section className="d-flex mt-2 pt-3 pb-5 perks-discount-product-card-container flex-wrap">
                        {searchResult.length > 0 ? (
                            <>
                                {searchResult?.map((products: PerksDiscountCardParams) => (
                                    <Card image={products.image_url} key={products.image_url}>
                                        <section>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <div className="perks-discount-product-title">
                                                        {products.product_name}
                                                    </div>
                                                    <h6 className="perks-dsicount-product-subtitle">
                                                        {products.discount_price}
                                                    </h6>
                                                </div>
                                                <Like
                                                    disabled={perksAndDiscountInfoState.isLiking}
                                                    onClick={() =>
                                                        likeProduct(
                                                            products.id,
                                                            Boolean(products.is_favorite)
                                                                ? perksAndDiscountUnLikeRequest
                                                                : perksAndDiscountLikeRequest
                                                        )
                                                    }
                                                    isLiked={Boolean(products.is_favorite)}
                                                />
                                            </div>
                                            <p className="perks-discount-product-desc mt-2">
                                                {`${products.description.substring(0, 156)}...`}
                                            </p>
                                        </section>
                                        <Button
                                            onClick={() => handleViewOffer(products.id)}
                                            className="d-flex align-items-center justify-content-center perks-discount-product-offer-btn">
                                            <div>View offer</div>
                                            <ArrowRight />
                                        </Button>
                                    </Card>
                                ))}
                            </>
                        ) : searchValue && searchResult.length < 1 ? (
                            <div className="col-md-8 mx-auto d-flex justify-content-center flex-column align-items-center">
                                <h6>{`Product with the name "${searchValue}" does not exist in your favourites`}</h6>
                                <img
                                    src={emptyBox}
                                    alt=""
                                    className="w-50 h-50 "
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        ) : (
                            <>
                                {perksAndDiscountInfoState.favorite?.length < 1 ? (
                                    <div className="col-md-8 mx-auto d-flex justify-content-center flex-column align-items-center">
                                        <h6>
                                            You have not added any product to your favourites yet
                                        </h6>
                                        <img
                                            src={emptyBox}
                                            alt=""
                                            className="w-50 h-50 "
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </div>
                                ) : (
                                    perksAndDiscountInfoState.favorite?.map(
                                        (products: PerksDiscountCardParams) => {
                                            return (
                                                <Card
                                                    image={products.image_url}
                                                    key={products.image_url}>
                                                    <section>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <div className="perks-discount-product-title">
                                                                    {products.product_name}
                                                                </div>
                                                                <h6 className="perks-dsicount-product-subtitle">
                                                                    {products.discount_price}
                                                                </h6>
                                                            </div>
                                                            <Like
                                                                disabled={
                                                                    perksAndDiscountInfoState.isLiking
                                                                }
                                                                onClick={() =>
                                                                    likeProduct(
                                                                        products.id,
                                                                        Boolean(
                                                                            products.is_favorite
                                                                        )
                                                                            ? perksAndDiscountUnLikeRequest
                                                                            : perksAndDiscountLikeRequest
                                                                    )
                                                                }
                                                                isLiked={Boolean(
                                                                    products.is_favorite
                                                                )}
                                                            />
                                                        </div>
                                                        <p className="perks-discount-product-desc mt-2">
                                                            {`${products.description.substring(
                                                                0,
                                                                156
                                                            )}...`}
                                                        </p>
                                                    </section>
                                                    <Button
                                                        onClick={() => handleViewOffer(products.id)}
                                                        className="d-flex align-items-center justify-content-center perks-discount-product-offer-btn">
                                                        <div>View offer</div>
                                                        <ArrowRight />
                                                    </Button>
                                                </Card>
                                            )
                                        }
                                    )
                                )}
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Favourites
