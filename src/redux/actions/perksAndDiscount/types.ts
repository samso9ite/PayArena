import { actionTypes } from '../../constants/actionTypes'

export interface PerksAndDiscountInfoState {
    isLoading: boolean
    resp: any
    error: string | null
    isLiking: boolean
    details: any
    isLoadingDetails: boolean
    isLoadingFavorites: boolean
    favorite: any
    isGeneratingCode: boolean
    isClosingBanner: boolean
    openBanner: boolean
}

export interface PerksAndDiscountPayload {
    callback: any
}
export interface IPerksAndDiscountInfo {
    resp: any
}

export interface IPerksAndDiscountLiked {
    resp: any
}

export interface IPerksAndDiscountUnLiked {
    resp: any
}

export interface PerksAndDiscountInfoPayload {
    callback: any
}

export interface PerksAndDiscountProductDetailsPayload {
    callback: any
}

export interface PerksAndDiscountLikePayload {
    callback: any
}

export interface PerksAndDiscountUnLikePayload {
    callback: any
}

export interface PerksAndDiscountLikeSuccessPayload {
    resp: any
}

export interface PerksAndDiscountUnLikeSuccessPayload {
    resp: any
}

export interface PerksAndDiscountInfoSuccessPayload {
    resp: any
}

export interface PerksAndDiscountInfoFailurePayload {
    error: string
}

export interface PerksAndDiscountLikeFailurePayload {
    error: string
}

export interface PerksAndDiscountUnlikeFailurePayload {
    error: string
}
export interface PerksAndDiscountProductDetailsSuccessPayload {
    resp: any
}

export interface PerksAndDiscountProductDetailsFailurePayload {
    error: string
}

export interface PerksAndDiscountFavoritePayload {
    callback: any
}

export interface PerksAndDiscountFavoriteSuccessPayload {
    resp: any
}

export interface PerksAndDiscountFavoriteFailurePayload {
    error: string
}

export interface PerksAndDiscountGenerateCodePayload {
    callback: any
}

export interface PerksAndDiscountCloseBannerPayload {
    callback: any
}

export interface PerksAndDiscountCloseBannerSuccessPayload {
    resp: any
}
export interface PerksAndDiscountGenerateCodeSuccessPayload {
    resp: any
}

export interface PerksAndDiscountGenerateCodeFailurePayload {
    error: string
}

export interface PerksAndDiscountCloseBannerFailurePayload {
    error: string
}

export type PerksAndDiscountInfoSuccess = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_INFO_SUCCESS
    payload: PerksAndDiscountInfoSuccessPayload
}

export interface PerksAndDiscountInfoRequest {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_INFO_REQUEST
    payload: PerksAndDiscountInfoPayload
}

export type PerksAndDiscountLikeSuccess = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_LIKE_SUCCESS
    payload: PerksAndDiscountLikeSuccessPayload
}

export type PerksAndDiscountUnLikeSuccess = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_LIKE_SUCCESS
    payload: PerksAndDiscountUnLikeSuccessPayload
}

export interface PerksAndDiscountLikeRequest {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_LIKE_REQUEST
    payload: PerksAndDiscountLikePayload
}

export type PerksAndDiscountInfoFailure = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_INFO_FAILURE
    payload: PerksAndDiscountInfoFailurePayload
}

export type PerksAndDiscountLikeFailure = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_INFO_FAILURE
    payload: PerksAndDiscountLikeFailurePayload
}

export type PerksAndDiscountUnLikeFailure = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_INFO_FAILURE
    payload: PerksAndDiscountLikeFailurePayload
}

export interface PerksAndDiscountProductDetailsRequest {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_REQUEST
    payload: PerksAndDiscountProductDetailsPayload
}

export type PerksAndDiscountProductDetailsSuccess = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_SUCCESS
    payload: PerksAndDiscountProductDetailsSuccessPayload
}

export type PerksAndDiscountProductDetailsFailure = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_FAILURE
    payload: PerksAndDiscountProductDetailsFailurePayload
}

export interface PerksAndDiscountFavoriteRequest {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_FAVORITE_REQUEST
    payload: PerksAndDiscountFavoritePayload
}

export type PerksAndDiscountFavoriteSuccess = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_FAVORITE_SUCCESS
    payload: PerksAndDiscountFavoriteSuccessPayload
}

export type PerksAndDiscountFavoriteFailure = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_FAVORITE_FAILURE
    payload: PerksAndDiscountFavoriteFailurePayload
}

export interface PerksAndDiscountGenerateCodeRequest {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_FAVORITE_REQUEST
    payload: PerksAndDiscountGenerateCodePayload
}

export type PerksAndDiscountGenerateCodeSuccess = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_FAVORITE_SUCCESS
    payload: PerksAndDiscountGenerateCodeSuccessPayload
}

export type PerksAndDiscountCloseBannerSuccess = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_SUCCESS
    payload: PerksAndDiscountCloseBannerSuccessPayload
}

export type PerksAndDiscountGenerateCodeFailure = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_FAVORITE_FAILURE
    payload: PerksAndDiscountGenerateCodeFailurePayload
}

export type PerksAndDiscountCloseBannerFailure = {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_FAILURE
    payload: PerksAndDiscountCloseBannerFailurePayload
}

export interface PerksAndDiscountCloseBannerRequest {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_FAILURE
    payload: PerksAndDiscountCloseBannerPayload
}

export interface PerksAndDiscountCloseBannerRequest {
    type: typeof actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_FAILURE
    payload: PerksAndDiscountCloseBannerPayload
}
