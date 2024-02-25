import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ElementProps, PerksDiscountCardParams } from '../../../enum'
import Banner from '../../../components/perks-and-discount/banner/Banner'
import PerksSearch from '../../../components/perks-and-discount/search-perks/PerksSearch'
import Button from '../../../components/form/button/Button'
import '../../../styles/pages/perks-discount.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Card from '../../../components/perks-and-discount/card/Card'
import { ArrowRight, SeeAllArow } from '../../../assets'
import { useDispatch, useSelector } from 'react-redux'
import {
    perksAndDiscountCloseBannerRequest,
    perksAndDiscountInfoRequest,
    perksAndDiscountLikeRequest,
    perksAndDiscountUnLikeRequest,
} from '../../../redux/actions/perksAndDiscount'
import { RootState } from '../../../redux/reducers'
import Like from '../../../components/perks-and-discount/like/Like'
import {
    PerksAndDiscountLikePayload,
    PerksAndDiscountLikeRequest,
} from '../../../redux/actions/perksAndDiscount/types'
import NotificationToast from '../../../components/utils/notifToast'
import SeeAll from '../../../components/perks-and-discount/see-all/SeeAll'
import emptyBox from '../../../assets/empty-box.png'
import Recommend from '../../../components/perks-and-discount/recommend/Recommend'
import axios from 'axios'
import Cookies from 'js-cookie'
import global from '../../../redux/constants/global'
import { authorizationRedirect } from '../../../redux/constants/api'
import Loader from '../../../components/perks-and-discount/loader/Loader'
import { createPortal } from 'react-dom'
import Modal from '../../../components/modal/Modal'
import success from '../../../assets/success.svg'

let accessToken = Cookies.get('babtbu') || ''
let orgId = Cookies.get('org') || ''
const base = global.apiBaseUrl + global.liveUrl

const PerksAndDiscount = (props: ElementProps) => {
    const [searchParam] = useSearchParams()
    const searchQuery = searchParam.get('industry') ?? 'all'

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [seeAll, setSeeAll] = useState(
        localStorage.getItem('PERKS_DISCOUNT_VIEW') === 'SEE_ALL' ? true : false
    )
    const [recommend, setRecommend] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [isRecommending, setIsRecommending] = useState(false)

    const [openRecommendForm, setOpenRecommendForm] = useState(false)
    const [brandNameError, setBrandNameError] = useState('')
    const [brandName, setBrandName] = useState('')
    const [productNameError, setProductNameError] = useState('')
    const [productName, setProductName] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)

    const { data: { user: { perks_read_count = 0 } = {} } = {} } = organisationInfoState.resp || {}

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const perksAndDiscountInfoState = useSelector(
        (state: RootState) => state.perksAndDiscountInfoReducer
    )

    const handleNavigate = (industry: string) => {
        // filter by industry
        navigate(`/Perks-And-Discount?industry=${encodeURIComponent(industry.toLowerCase())}`)
    }

    const handleToggleSeeAll = () => {
        setSeeAll((prev) => !prev)
    }

    // extract all category from products and remove duplicate
    const removeDuplicateIndustry = useMemo(() => {
        const industryWithoutDuplicates = []
        if (perksAndDiscountInfoState.resp) {
            const industries = perksAndDiscountInfoState.resp.results
            for (const industry in industries) {
                const { category: { name = '' } = {} } = industries[industry]
                industryWithoutDuplicates.push(name)
            }
            return ['All', ...new Set(industryWithoutDuplicates)]
        }
        return []
    }, [perksAndDiscountInfoState.resp])

    // filter by category on category button click
    const filterByCategory = useMemo(() => {
        const productsToFilter =
            searchResult.length > 0 ? searchResult : perksAndDiscountInfoState.resp?.results
        const filter =
            productsToFilter?.filter(
                ({ category: { name = '' } = {} }) =>
                    searchQuery.toLowerCase() === name.toLowerCase()
            ) || []
        if (Array.isArray(filter) && filter.length > 0) {
            return filter
        }
        return searchResult.length > 0 ? searchResult : perksAndDiscountInfoState.resp?.results
    }, [searchQuery, perksAndDiscountInfoState.resp?.results, searchResult])

    // get all offers
    const getOffers = () => {
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
        dispatch(perksAndDiscountInfoRequest(data))
    }

    //close banner req
    const handleCloseBanner = () => {
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

        dispatch(perksAndDiscountCloseBannerRequest(data))
    }

    // add/remove from favourite. Note this function is called for both add/remove scenarios but the dispatch function is determine by the current value is is_favourite variable
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
            values: { product_id: id, caller: 'INIT' },
            callback,
        }
        dispatch(dispatchFunc(data))
    }

    const handleSearch = useCallback(
        (token: any) => {
            if (searchValue) {
                setIsSearching(true)
                axios
                    .get(base + `api/v1/perks/products?search=${searchValue}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            Authorization: accessToken,
                            Organisation: orgId,
                        },
                        cancelToken: token,
                    })
                    .then((response) => {
                        setIsSearching(false)
                        setSearchResult(response.data.results)
                        if (response.data?.results?.length < 1) {
                            setRecommend(true)
                            setNotFound(true)
                        } else {
                            setRecommend(false)
                            setNotFound(false)
                        }
                    })
                    .catch((error) => {
                        setIsSearching(false)
                        if (axios.isCancel(error)) {
                            console.log('Request:', error.message)
                        } else {
                            if (error.response.status === 401) {
                                authorizationRedirect()
                            }
                        }
                    })
            } else {
                setSearchResult([])
                setRecommend(false)
                setIsSearching(false)
            }
        },
        [searchValue]
    )

    let checkBrandName = () => {
        if (!brandName) {
            setBrandNameError('Email cannot be blank')
        } else {
            setBrandNameError('')
        }
    }

    let checkProductName = () => {
        if (!productName) {
            setProductNameError('Email cannot be blank')
        } else {
            setProductNameError('')
        }
    }

    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        handleSearch(source.token)
        return () => {
            setIsSearching(true)
            source.cancel()
        }
    }, [handleSearch])

    const handleViewOffer = (id: string) => {
        navigate(`/Perks-And-Discount-Details/${id}`)
    }

    const attemptRecommend = async (e: any) => {
        e.preventDefault()

        if (!brandName) {
            setBrandNameError('Brand name cannot be blank')
            return
        }
        if (!productName) {
            setProductNameError('Product name cannot be blank')
            return
        }
        const reqData = { brand_name: brandName, product_name: productName }
        setIsRecommending(true)
        axios
            .post(base + 'api/v1/perks/products/recommendation', reqData, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: accessToken,
                    Organisation: orgId,
                },
            })
            .then(() => {
                setIsRecommending(false)
                setOpenRecommendForm(false)
                setRecommend(false)
                setBrandName('')
                setProductName('')
                setNotifTitle('Success')
                setShowSuccess(true)
                setNotifVal(true)
            })
            .catch(() => {
                setIsRecommending(false)
                setNotifTitle('Error')
                setNotif('An error occurred')
                setNotifVal(true)
            })
    }

    useEffect(() => {
        getOffers()
    }, [])

    useEffect(() => {
        props.changeLoadingState(perksAndDiscountInfoState.isLoading)
    }, [perksAndDiscountInfoState.isLoading])

    useEffect(() => {
        if (seeAll) {
            localStorage.setItem('PERKS_DISCOUNT_VIEW', 'SEE_ALL')
        } else {
            localStorage.setItem('PERKS_DISCOUNT_VIEW', 'SEE_LESS')
        }
    }, [seeAll])

    return (
        <>
            <div>
                {notif && notifVal && (
                    <NotificationToast
                        title={notifTitle}
                        message={notif}
                        closeNotif={() => setNotifVal(!notifVal)}
                    />
                )}
                <div className="px-4">
                    {Number(perks_read_count) !== 3 && (
                        <>
                            {perksAndDiscountInfoState.openBanner && (
                                <>
                                    <Banner
                                        disabled={perksAndDiscountInfoState.isClosingBanner}
                                        onClick={handleCloseBanner}
                                    />
                                </>
                            )}
                        </>
                    )}
                    <section className="perk-search-recommend-container">
                        <PerksSearch onSearchFunc={(e) => setSearchValue(e.target.value)} />
                        {recommend && (
                            <div className="perk-recommend-container">
                                <Recommend
                                    recommend={() => setOpenRecommendForm(true)}
                                    close={() => setRecommend(false)}
                                />
                            </div>
                        )}
                    </section>
                    <section className="d-flex mt-4 pt-3 flex-wrap perks-discount-container">
                        {removeDuplicateIndustry.map((industry) => (
                            <Button
                                key={industry}
                                onClick={() => handleNavigate(industry)}
                                className={`perks-discount-filter-btn ${
                                    searchQuery.toLowerCase() === industry.toLowerCase()
                                        ? 'perks-discount-filter-btn-active'
                                        : 'perks-discount-filter-btn-inactive'
                                }`}>
                                {industry}
                            </Button>
                        ))}
                    </section>
                    <div className="d-flex justify-content-between align-item-center">
                        <h6 className="perks-discount-active-industry-title">
                            {searchQuery.toUpperCase()}
                        </h6>
                        {searchQuery.toLowerCase() === 'all' && !searchValue && (
                            <SeeAll
                                onClick={handleToggleSeeAll}
                                text={`${seeAll ? 'See less' : 'See all'}`}
                                icon={<SeeAllArow />}
                            />
                        )}
                    </div>

                    <section className="d-flex mt-2 pt-3 pb-5 perks-discount-product-card-container flex-wrap">
                        {isSearching ? (
                            <Loader />
                        ) : // : searchResult.length > 0 ? (
                        //     <>
                        //         {searchResult?.map((products: PerksDiscountCardParams) => (
                        //             <Card image={products.image_url} key={products.image_url}>
                        //                 <section>
                        //                     <div className="d-flex justify-content-between align-items-center">
                        //                         <div>
                        //                             <div className="perks-discount-product-title">
                        //                                 {products.product_name}
                        //                             </div>
                        //                             <h6 className="perks-dsicount-product-subtitle">
                        //                                 {products.discount_price}
                        //                             </h6>
                        //                         </div>
                        //                         <Like
                        //                             disabled={perksAndDiscountInfoState.isLiking}
                        //                             onClick={() =>
                        //                                 likeProduct(
                        //                                     products.id,
                        //                                     Boolean(products.is_favorite)
                        //                                         ? perksAndDiscountUnLikeRequest
                        //                                         : perksAndDiscountLikeRequest
                        //                                 )
                        //                             }
                        //                             isLiked={Boolean(products.is_favorite)}
                        //                         />
                        //                     </div>
                        //                     <p className="perks-discount-product-desc mt-2">
                        //                         {`${products.description.substring(0, 156)}...`}
                        //                     </p>
                        //                 </section>
                        //                 <Button
                        //                     onClick={() => handleViewOffer(products.id)}
                        //                     className="d-flex align-items-center justify-content-center perks-discount-product-offer-btn">
                        //                     <div>View offer</div>
                        //                     <ArrowRight />
                        //                 </Button>
                        //             </Card>
                        //         ))}
                        //     </>
                        // )
                        searchValue && notFound && searchResult.length < 1 ? (
                            <>
                                <div className="col-md-8 mx-auto d-flex justify-content-center flex-column align-items-center">
                                    <h6>{`Product with the name "${searchValue}" can't be found`}</h6>
                                    <img
                                        src={emptyBox}
                                        alt=""
                                        className="w-50 h-50"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                {seeAll ? (
                                    <>
                                        {filterByCategory
                                            ?.slice(0)
                                            .map((products: PerksDiscountCardParams) => (
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
                                            ))}
                                    </>
                                ) : (
                                    <>
                                        {filterByCategory
                                            ?.slice(0, 3)
                                            .map((products: PerksDiscountCardParams) => (
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
                                            ))}
                                    </>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </div>

            {openRecommendForm &&
                createPortal(
                    <Modal
                        open={openRecommendForm}
                        setOpen={setOpenRecommendForm}
                        modalTitle="Recommend Product">
                        <div className="recommend-modal-ruler"></div>
                        <form className="">
                            <div className="mt-2" style={{ position: 'relative' }}>
                                <label
                                    className="bc-checker-widget-name-label"
                                    htmlFor="widget_name">
                                    Enter Brand Name
                                </label>
                                <input
                                    type="text"
                                    id="brand_name"
                                    className={`form-control ${
                                        brandNameError ? 'input-error' : ''
                                    }`}
                                    onBlur={checkBrandName}
                                    value={brandName}
                                    onChange={(brandName) =>
                                        setBrandName(brandName.target.value.toLowerCase())
                                    }
                                    placeholder="e.g Microsoft"
                                />
                                {brandNameError && (
                                    <p
                                        style={{ color: 'red', position: 'absolute' }}
                                        className=" p-0 m-0">
                                        {brandNameError}
                                    </p>
                                )}
                            </div>
                            <div className="mt-2" style={{ position: 'relative' }}>
                                <label
                                    className="bc-checker-widget-name-label"
                                    htmlFor="widget_name">
                                    Enter Product Name
                                </label>
                                <input
                                    type="text"
                                    id="brand_name"
                                    className={`form-control ${
                                        productNameError ? 'input-error' : ''
                                    }`}
                                    onBlur={checkProductName}
                                    value={productName}
                                    onChange={(productName) =>
                                        setProductName(productName.target.value.toLowerCase())
                                    }
                                    placeholder="e.g Microsoft Azure"
                                />
                                {productNameError && (
                                    <p
                                        style={{ color: 'red', position: 'absolute' }}
                                        className="absolute p-0 m-0">
                                        {productNameError}
                                    </p>
                                )}
                            </div>
                            <Button
                                loading={isRecommending}
                                disabled={isRecommending}
                                onClick={attemptRecommend}
                                className="perks-recommend-modal-btn mt-5">
                                Recommend
                            </Button>
                        </form>
                    </Modal>,
                    document.body
                )}
            {showSuccess &&
                createPortal(
                    <Modal
                        showCancel={false}
                        modalTitle=""
                        open={showSuccess}
                        setOpen={setShowSuccess}>
                        <div className="">
                            <div className="d-flex justify-content-center">
                                <img src={success} alt="success" />
                            </div>
                            <p className="success-text" style={{ textAlign: 'center' }}>
                                Thank you for the Recommendation!
                            </p>
                            <p className="success-sub-text" style={{ textAlign: 'center' }}>
                                You will be notified when your recommended partner comes onboard
                            </p>
                            <div className="d-flex justify-content-center">
                                <Button
                                    onClick={() => setShowSuccess(false)}
                                    className="close-recommend-success-btn mt-2">
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Modal>,
                    document.body
                )}
        </>
    )
}

export default PerksAndDiscount
