import axios from 'axios'
import global from '../../constants/global'
import Cookies from 'js-cookie'
import {
    IPerksAndDiscountInfo,
    IPerksAndDiscountLiked,
    IPerksAndDiscountUnLiked,
} from '../../actions/perksAndDiscount/types'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { authorizationRedirect, serverCodes } from '../../constants/api'
import {
    perksAndDiscountCloseBannerFailure,
    perksAndDiscountCloseBannerSuccess,
    perksAndDiscountFavoriteFailure,
    perksAndDiscountFavoriteSuccess,
    perksAndDiscountGenerateCodeFailure,
    perksAndDiscountGenerateCodeSuccess,
    perksAndDiscountInfoFailure,
    perksAndDiscountInfoSuccess,
    perksAndDiscountLikeFailure,
    perksAndDiscountLikeSuccess,
    perksAndDiscountProductDetailsFailure,
    perksAndDiscountProductDetailsSuccess,
    perksAndDiscountUnLikeFailure,
    perksAndDiscountUnLikeSuccess,
} from '../../actions/perksAndDiscount'
import { actionTypes } from '../../constants/actionTypes'

let accessToken = Cookies.get('babtbu') || ''
let orgId = Cookies.get('org') || ''
const base = global.apiBaseUrl + global.liveUrl

const perksAndDiscountCloseBanner = async (payload: any) => {
    const { data } = await axios.get<IPerksAndDiscountInfo[]>(base + 'api/v1/perks/eligibilty', {
        headers: {
            Accept: 'application/json',
            Authorization: accessToken,
            Organisation: orgId,
        },
    })
    return data
}

const perksAndDiscountInfo = async (payload: any) => {
    const { data } = await axios.get<IPerksAndDiscountInfo[]>(base + 'api/v1/perks/products', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: accessToken,
            Organisation: orgId,
        },
    })
    return data
}

const perksAndDiscountLike = async (payload: any) => {
    const { data } = await axios.post<IPerksAndDiscountLiked[]>(
        base + 'api/v1/perks/products/favourites',
        payload,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessToken,
                Organisation: orgId,
            },
        }
    )
    return data
}

const perksAndDiscountUnLike = async (payload: any) => {
    const { data } = await axios.delete<IPerksAndDiscountUnLiked[]>(
        base + 'api/v1/perks/products/favourites',
        {
            data: payload,

            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessToken,
                Organisation: orgId,
            },
        }
    )
    return data
}

const perksAndDiscountProductDetails = async (payload: any) => {
    const { data } = await axios.get<IPerksAndDiscountInfo[]>(
        base + `api/v1/perks/products/${payload}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessToken,
                Organisation: orgId,
            },
        }
    )
    return data
}

const perksAndDiscountFavorite = async (payload: any) => {
    const { data } = await axios.get<IPerksAndDiscountInfo[]>(
        base + 'api/v1/perks/products/favourites',
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessToken,
                Organisation: orgId,
            },
        }
    )
    return data
}

const perksAndDiscountGenerateCode = async (payload: any) => {
    const { data } = await axios.get<IPerksAndDiscountInfo[]>(
        base + `api/v1/perks/products/${payload}/code`,
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessToken,
                Organisation: orgId,
            },
        }
    )
    return data
}

function* perksAndDiscountGenerateCodeSaga(action: any) {
    try {
        const response: { data: any } = yield call(
            perksAndDiscountGenerateCode,
            action.payload.values
        )

        yield put(
            perksAndDiscountGenerateCodeSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                perksAndDiscountGenerateCodeFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                perksAndDiscountGenerateCodeFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

function* perksAndDiscountCloseBannerSaga(action: any) {
    try {
        const response: { data: any } = yield call(perksAndDiscountCloseBanner, {})

        yield put(
            perksAndDiscountCloseBannerSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                perksAndDiscountCloseBannerFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                perksAndDiscountCloseBannerFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

function* perksAndDiscountFavoriteSaga(action: any) {
    try {
        const response: { data: any } = yield call(perksAndDiscountFavorite, {})

        yield put(
            perksAndDiscountFavoriteSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                perksAndDiscountFavoriteFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                perksAndDiscountFavoriteFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

function* perksAndDiscountInfoSaga(action: any) {
    try {
        const response: { data: any } = yield call(perksAndDiscountInfo, {})

        yield put(
            perksAndDiscountInfoSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                perksAndDiscountInfoFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                perksAndDiscountInfoFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

function* perksAndDiscountProductDetailsSaga(action: any) {
    try {
        const response: { data: any } = yield call(
            perksAndDiscountProductDetails,
            action.payload.values
        )

        yield put(
            perksAndDiscountProductDetailsSuccess({
                resp: response,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                perksAndDiscountProductDetailsFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                perksAndDiscountProductDetailsFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

function* perksAndDiscountLikeSaga(action: any) {
    try {
        const response: { data: any } = yield call(perksAndDiscountLike, action.payload.values)
        yield put(
            perksAndDiscountLikeSuccess({
                resp: action.payload.values,
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                perksAndDiscountLikeFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                perksAndDiscountLikeFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

function* perksAndDiscountUnLikeSaga(action: any) {
    try {
        const response: { data: any } = yield call(perksAndDiscountUnLike, action.payload.values)
        yield put(
            perksAndDiscountUnLikeSuccess({
                resp: { ...action.payload.values, response },
            })
        )
        action.payload.callback(response)
    } catch (e: any) {
        if (serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status) {
            yield put(
                perksAndDiscountUnLikeFailure({
                    error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                })
            )
            action.payload.callback({
                detail: 'An error occurred, hang on a minute as we work towards fixing this error.',
            })
            return
        }
        if (e.response.request.status === 401) {
            authorizationRedirect()
        } else {
            yield put(
                perksAndDiscountUnLikeFailure({
                    error: e.response.data.detail,
                })
            )
            action.payload.callback(e.response.data)
        }
    }
}

export function* perksAndDiscountInfoSagaTrigger() {
    yield all([takeLatest(actionTypes.PERKS_AND_DISCOUNT_INFO_REQUEST, perksAndDiscountInfoSaga)])
}

export function* perksAndDiscountLikeSagaTrigger() {
    yield all([takeLatest(actionTypes.PERKS_AND_DISCOUNT_LIKE_REQUEST, perksAndDiscountLikeSaga)])
}

export function* perksAndDiscountUnLikeSagaTrigger() {
    yield all([
        takeLatest(actionTypes.PERKS_AND_DISCOUNT_UNLIKE_REQUEST, perksAndDiscountUnLikeSaga),
    ])
}

export function* perksAndDiscountProductDetailsSagaTrigger() {
    yield all([
        takeLatest(
            actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_REQUEST,
            perksAndDiscountProductDetailsSaga
        ),
    ])
}
export function* perksAndDiscountFavoriteSagaTrigger() {
    yield all([
        takeLatest(actionTypes.PERKS_AND_DISCOUNT_FAVORITE_REQUEST, perksAndDiscountFavoriteSaga),
    ])
}

export function* perksAndDiscountGenerateCodeSagaTrigger() {
    yield all([
        takeLatest(
            actionTypes.PERKS_AND_DISCOUNT_GENERATE_CODE_REQUEST,
            perksAndDiscountGenerateCodeSaga
        ),
    ])
}

export function* perksAndDiscountCloseBannerSagaTrigger() {
    yield all([
        takeLatest(
            actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_REQUEST,
            perksAndDiscountCloseBannerSaga
        ),
    ])
}
