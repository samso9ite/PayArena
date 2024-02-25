import { PerksAndDiscountInfoState } from '../../actions/perksAndDiscount/types'
import { actionTypes } from '../../constants/actionTypes'

let initialState: PerksAndDiscountInfoState = {
    isLoading: false,
    error: null,
    resp: null,
    isLiking: false,
    details: {},
    isLoadingDetails: false,
    favorite: [],
    isLoadingFavorites: false,
    isGeneratingCode: false,
    isClosingBanner: false,
    openBanner: true,
}

export const perksAndDiscountInfoReducer = (
    state = initialState,
    action: { type: any; payload: any }
) => {
    switch (action.type) {
        case actionTypes.PERKS_AND_DISCOUNT_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.PERKS_AND_DISCOUNT_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp,
            }
        case actionTypes.PERKS_AND_DISCOUNT_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            }
        case actionTypes.PERKS_AND_DISCOUNT_LIKE_REQUEST:
            return {
                ...state,
                isLiking: true,
            }
        case actionTypes.PERKS_AND_DISCOUNT_LIKE_SUCCESS:
            const likedProductID = action.payload.resp.product_id
            const indexofLikedProduct =
                action.payload.resp?.caller === 'INIT'
                    ? state.resp.results?.findIndex(
                          ({ id }: { id: string }) => likedProductID === id
                      )
                    : action.payload.resp?.caller === 'FAVORITE'
                    ? state.favorite?.findIndex(({ id }: { id: string }) => likedProductID === id)
                    : null

            const newResults =
                action.payload.resp?.caller === 'INIT'
                    ? state.resp.results
                    : action.payload.resp?.caller === 'FAVORITE'
                    ? state.favorite
                    : {}
            if (Array.isArray(newResults)) {
                newResults[indexofLikedProduct].is_favorite = true
            }

            const newData =
                action.payload.resp.caller === 'INIT'
                    ? {
                          ...state,
                          resp: { ...state.resp, results: newResults },
                          isLiking: false,
                      }
                    : action.payload.resp.caller === 'DEETS'
                    ? {
                          ...state,
                          details: { ...state.details, is_favorite: true },
                          isLiking: false,
                      }
                    : {
                          ...state,
                          favorite: newResults,
                          isLiking: false,
                      }
            return newData

        case actionTypes.PERKS_AND_DISCOUNT_LIKE_FAILURE:
            return {
                ...state,
                isLiking: false,
                error: action.payload.error,
            }

        case actionTypes.PERKS_AND_DISCOUNT_UNLIKE_REQUEST:
            return {
                ...state,
                isLiking: true,
            }

        case actionTypes.PERKS_AND_DISCOUNT_UNLIKE_SUCCESS:
            const unLikedProductID = action.payload.resp.product_id
            const indexofUnLikedProduct =
                action.payload.resp?.caller === 'INIT'
                    ? state.resp.results?.findIndex(
                          ({ id }: { id: string }) => unLikedProductID === id
                      )
                    : action.payload.resp?.caller === 'FAVORITE'
                    ? state.favorite?.findIndex(({ id }: { id: string }) => unLikedProductID === id)
                    : {}

            const newResults2 =
                action.payload.resp?.caller === 'INIT'
                    ? state.resp.results
                    : action.payload.resp?.caller === 'FAVORITE'
                    ? state.favorite
                    : null
            if (Array.isArray(newResults2)) {
                newResults2[indexofUnLikedProduct].is_favorite = false
            }

            const newData2 =
                action.payload.resp.caller === 'INIT'
                    ? {
                          ...state,
                          resp: { ...state.resp, results: newResults2 },
                          isLiking: false,
                      }
                    : action.payload.resp.caller === 'DEETS'
                    ? {
                          ...state,
                          details: { ...state.details, is_favorite: false },
                          isLiking: false,
                      }
                    : {
                          ...state,
                          favorite: action.payload.resp.response.results,
                          isLiking: false,
                      }
            return newData2

        case actionTypes.PERKS_AND_DISCOUNT_UNLIKE_FAILURE:
            return {
                ...state,
                isLiking: false,
                error: action.payload.error,
            }

        case actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                isLoadingDetails: true,
            }

        case actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingDetails: false,
                details: action.payload.resp.detail,
            }

        case actionTypes.PERKS_AND_DISCOUNT_PRODUCT_DETAILS_FAILURE:
            return {
                ...state,
                isLoadingDetails: false,
                error: action.payload.error,
            }

        case actionTypes.PERKS_AND_DISCOUNT_FAVORITE_REQUEST:
            return {
                ...state,
                isLoadingFavorites: true,
            }

        case actionTypes.PERKS_AND_DISCOUNT_FAVORITE_SUCCESS:
            return {
                ...state,
                isLoadingFavorites: false,
                favorite: action.payload.resp.results,
            }

        case actionTypes.PERKS_AND_DISCOUNT_FAVORITE_FAILURE:
            return {
                ...state,
                isLoadingFavorites: false,
                error: action.payload.error,
            }

        case actionTypes.PERKS_AND_DISCOUNT_GENERATE_CODE_REQUEST:
            return {
                ...state,
                isGeneratingCode: true,
            }
        case actionTypes.PERKS_AND_DISCOUNT_GENERATE_CODE_SUCCESS:
            return {
                ...state,
                isGeneratingCode: false,
                details: { ...state.details, code: action.payload.resp?.data?.code },
            }

        case actionTypes.PERKS_AND_DISCOUNT_GENERATE_CODE_FAILURE:
            return {
                ...state,
                isGeneratingCode: false,
                error: action.payload.error,
            }

        case actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_REQUEST:
            return {
                ...state,
                isClosingBanner: true,
            }

        case actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_SUCCESS:
            return {
                ...state,
                isClosingBanner: false,
                openBanner: !state.openBanner,
            }

        case actionTypes.PERKS_AND_DISCOUNT_CLOSE_BANNER_FAILURE:
            return {
                ...state,
                isClosingBanner: false,
            }

        default:
            return state
    }
}
