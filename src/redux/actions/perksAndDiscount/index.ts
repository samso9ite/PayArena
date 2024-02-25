import { actionTypes } from '../../constants/actionTypes'
import {
    PerksAndDiscountCloseBannerFailure,
    PerksAndDiscountCloseBannerFailurePayload,
    PerksAndDiscountCloseBannerPayload,
    PerksAndDiscountCloseBannerRequest,
    PerksAndDiscountCloseBannerSuccess,
    PerksAndDiscountCloseBannerSuccessPayload,
    PerksAndDiscountFavoriteFailure,
    PerksAndDiscountFavoriteFailurePayload,
    PerksAndDiscountFavoritePayload,
    PerksAndDiscountFavoriteRequest,
    PerksAndDiscountFavoriteSuccess,
    PerksAndDiscountFavoriteSuccessPayload,
    PerksAndDiscountGenerateCodeFailure,
    PerksAndDiscountGenerateCodeFailurePayload,
    PerksAndDiscountGenerateCodePayload,
    PerksAndDiscountGenerateCodeRequest,
    PerksAndDiscountGenerateCodeSuccess,
    PerksAndDiscountGenerateCodeSuccessPayload,
    PerksAndDiscountInfoFailure,
    PerksAndDiscountInfoFailurePayload,
    PerksAndDiscountInfoPayload,
    PerksAndDiscountInfoRequest,
    PerksAndDiscountInfoSuccess,
    PerksAndDiscountInfoSuccessPayload,
    PerksAndDiscountLikeFailure,
    PerksAndDiscountLikeFailurePayload,
    PerksAndDiscountLikePayload,
    PerksAndDiscountLikeRequest,
    PerksAndDiscountLikeSuccess,
    PerksAndDiscountLikeSuccessPayload,
    PerksAndDiscountProductDetailsFailure,
    PerksAndDiscountProductDetailsFailurePayload,
    PerksAndDiscountProductDetailsPayload,
    PerksAndDiscountProductDetailsRequest,
    PerksAndDiscountProductDetailsSuccess,
    PerksAndDiscountProductDetailsSuccessPayload,
    PerksAndDiscountUnLikeFailure,
    PerksAndDiscountUnLikeSuccess,
    PerksAndDiscountUnLikeSuccessPayload,
    PerksAndDiscountUnlikeFailurePayload,
} from './types'
// import { PerksAndDiscountPayload } from '../dashboard/types'

// get products
export const perksAndDiscountInfoRequest = (
    payload: PerksAndDiscountInfoPayload
): PerksAndDiscountInfoRequest => ({
    type: actionTypes.PERKS_AND_DISCOUNT_INFO_REQUEST,
    payload,
})

export const perksAndDiscountInfoSuccess = (
    payload: PerksAndDiscountInfoSuccessPayload
): PerksAndDiscountInfoSuccess => ({
    type: actionTypes.PERKS_AND_DISCOUNT_INFO_SUCCESS,
    payload,
})

export const perksAndDiscountInfoFailure = (
    payload: PerksAndDiscountInfoFailurePayload
): PerksAndDiscountInfoFailure => ({
    type: actionTypes.PERKS_AND_DISCOUNT_INFO_FAILURE,
    payload,
})

// like
export const perksAndDiscountLikeRequest = (
    payload: PerksAndDiscountLikePayload
): PerksAndDiscountLikeRequest => ({
    type: actionTypes.PERKS_AND_DISCOUNT_LIKE_REQUEST,
    payload,
})

export const perksAndDiscountLikeSuccess = (
    payload: PerksAndDiscountLikeSuccessPayload
): PerksAndDiscountLikeSuccess => ({
    type: actionTypes.PERKS_AND_DISCOUNT_LIKE_SUCCESS,
    payload,
})

export const perksAndDiscountLikeFailure = (
    payload: PerksAndDiscountLikeFailurePayload
): PerksAndDiscountLikeFailure => ({
    type: actionTypes.PERKS_AND_DISCOUNT_LIKE_FAILURE,
    payload,
})

// unlike
export const perksAndDiscountUnLikeRequest = (
    payload: PerksAndDiscountLikePayload
): PerksAndDiscountLikeRequest => ({
    type: actionTypes.PERKS_AND_DISCOUNT_UNLIKE_REQUEST,
    payload,
})

export const perksAndDiscountUnLikeSuccess = (
    payload: PerksAndDiscountUnLikeSuccessPayload
): PerksAndDiscountUnLikeSuccess => ({
    type: actionTypes.PERKS_AND_DISCOUNT_UNLIKE_SUCCESS,
    payload,
})

export const perksAndDiscountUnLikeFailure = (
    payload: PerksAndDiscountUnlikeFailurePayload
): PerksAndDiscountUnLikeFailure => ({
    type: actionTypes.PERKS_AND_DISCOUNT_UNLIKE_FAILURE,
    payload,
})

// details

export const perksAndDiscountProductDetailsRequest = (
    payload: PerksAndDiscountProductDetailsPayload
): PerksAndDiscountProductDetailsRequest => ({
    type: actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_REQUEST,
    payload,
})

export const perksAndDiscountProductDetailsSuccess = (
    payload: PerksAndDiscountProductDetailsSuccessPayload
): PerksAndDiscountProductDetailsSuccess => ({
    type: actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_SUCCESS,
    payload,
})

export const perksAndDiscountProductDetailsFailure = (
    payload: PerksAndDiscountProductDetailsFailurePayload
): PerksAndDiscountProductDetailsFailure => ({
    type: actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_FAILURE,
    payload,
})

// favorites

export const perksAndDiscountFavoriteRequest = (
    payload: PerksAndDiscountFavoritePayload
): PerksAndDiscountFavoriteRequest => ({
    type: actionTypes.PERKS_AND_DISCOUNT_FAVORITE_REQUEST,
    payload,
})

export const perksAndDiscountFavoriteSuccess = (
    payload: PerksAndDiscountFavoriteSuccessPayload
): PerksAndDiscountFavoriteSuccess => ({
    type: actionTypes.PERKS_AND_DISCOUNT_FAVORITE_SUCCESS,
    payload,
})

export const perksAndDiscountFavoriteFailure = (
    payload: PerksAndDiscountFavoriteFailurePayload
): PerksAndDiscountFavoriteFailure => ({
    type: actionTypes.PERKS_AND_DISCOUNT_FAVORITE_FAILURE,
    payload,
})

// generate code
export const perksAndDiscountGenerateCodeRequest = (
    payload: PerksAndDiscountGenerateCodePayload
): PerksAndDiscountGenerateCodeRequest => ({
    type: actionTypes.PERKS_AND_DISCOUNT_GENERATE_CODE_REQUEST,
    payload,
})

export const perksAndDiscountGenerateCodeSuccess = (
    payload: PerksAndDiscountGenerateCodeSuccessPayload
): PerksAndDiscountGenerateCodeSuccess => ({
    type: actionTypes.PERKS_AND_DISCOUNT_GENERATE_CODE_SUCCESS,
    payload,
})

export const perksAndDiscountGenerateCodeFailure = (
    payload: PerksAndDiscountGenerateCodeFailurePayload
): PerksAndDiscountGenerateCodeFailure => ({
    type: actionTypes.PERKS_AND_DISCOUNT_GENERATE_CODE_FAILURE,
    payload,
})

// close banner
export const perksAndDiscountCloseBannerRequest = (
    payload: PerksAndDiscountCloseBannerPayload
): PerksAndDiscountCloseBannerRequest => ({
    type: actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_REQUEST,
    payload,
})

export const perksAndDiscountCloseBannerSuccess = (
    payload: PerksAndDiscountCloseBannerSuccessPayload
): PerksAndDiscountCloseBannerSuccess => ({
    type: actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_SUCCESS,
    payload,
})

export const perksAndDiscountCloseBannerFailure = (
    payload: PerksAndDiscountCloseBannerFailurePayload
): PerksAndDiscountCloseBannerFailure => ({
    type: actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_FAILURE,
    payload,
})
