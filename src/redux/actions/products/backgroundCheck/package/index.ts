import { actionTypes } from '../../../../constants/actionTypes'
import { 
    BackgroundCheckPackageGetAllFailure, BackgroundCheckPackageGetAllFailurePayload, BackgroundCheckPackageGetAllPayload, 
    BackgroundCheckPackageGetAllRequest, BackgroundCheckPackageGetAllSuccess, BackgroundCheckPackageGetAllSuccessPayload, 

    BackgroundCheckPackageCreateFailure, BackgroundCheckPackageCreateFailurePayload, BackgroundCheckPackageCreatePayload,
    BackgroundCheckPackageCreateRequest, BackgroundCheckPackageCreateSuccess, BackgroundCheckPackageCreateSuccessPayload,
    
    BackgroundCheckPackageUpdateFailure, BackgroundCheckPackageUpdateFailurePayload, BackgroundCheckPackageUpdatePayload, 
    BackgroundCheckPackageUpdateRequest, BackgroundCheckPackageUpdateSuccess, BackgroundCheckPackageUpdateSuccessPayload,

    BackgroundCheckPackageFilterFailure, BackgroundCheckPackageFilterFailurePayload, BackgroundCheckPackageFilterPayload,
    BackgroundCheckPackageFilterRequest, BackgroundCheckPackageFilterSuccess, BackgroundCheckPackageFilterSuccessPayload,
    
    BackgroundCheckPackageGetSingleFailure, BackgroundCheckPackageGetSingleFailurePayload, BackgroundCheckPackageGetSinglePayload, 
    BackgroundCheckPackageGetSingleRequest, BackgroundCheckPackageGetSingleSuccess, BackgroundCheckPackageGetSingleSuccessPayload, 

    BackgroundCheckPackageGetActiveFailure, BackgroundCheckPackageGetActiveFailurePayload, BackgroundCheckPackageGetActivePayload,
    BackgroundCheckPackageGetActiveRequest, BackgroundCheckPackageGetActiveSuccess, BackgroundCheckPackageGetActiveSuccessPayload, 
    
    BackgroundCheckPackageChangeStatusPayload, BackgroundCheckPackageChangeStatusRequest, BackgroundCheckPackageChangeStatusSuccessPayload, 
    BackgroundCheckPackageChangeStatusSuccess, BackgroundCheckPackageChangeStatusFailurePayload, BackgroundCheckPackageChangeStatusFailure, 
    
    BackgroundCheckPackageGetBaseChecksPayload, BackgroundCheckPackageGetBaseChecksRequest, BackgroundCheckPackageGetBaseChecksSuccessPayload, 
    BackgroundCheckPackageGetBaseChecksSuccess, BackgroundCheckPackageGetBaseChecksFailurePayload, BackgroundCheckPackageGetBaseChecksFailure, 
    
    BackgroundCheckPackageGetBaseChecksSubservicePayload, BackgroundCheckPackageGetBaseChecksSubserviceRequest, BackgroundCheckPackageGetBaseChecksSubserviceSuccessPayload, 
    BackgroundCheckPackageGetBaseChecksSubserviceSuccess, BackgroundCheckPackageGetBaseChecksSubserviceFailurePayload, BackgroundCheckPackageGetBaseChecksSubserviceFailure,
} from './types';



export const backgroundCheckPackageGetAllRequest = (payload:BackgroundCheckPackageGetAllPayload):BackgroundCheckPackageGetAllRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_REQUEST,
    payload,
});
export const backgroundCheckPackageGetAllSuccess = (payload:BackgroundCheckPackageGetAllSuccessPayload):BackgroundCheckPackageGetAllSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_SUCCESS,
    payload,
});
export const backgroundCheckPackageGetAllFailure = (payload:BackgroundCheckPackageGetAllFailurePayload):BackgroundCheckPackageGetAllFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ALL_FAILURE,
    payload,
});


export const backgroundCheckPackageGetBaseChecksRequest = (payload:BackgroundCheckPackageGetBaseChecksPayload):BackgroundCheckPackageGetBaseChecksRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_REQUEST,
    payload,
});
export const backgroundCheckPackageGetBaseChecksSuccess = (payload:BackgroundCheckPackageGetBaseChecksSuccessPayload):BackgroundCheckPackageGetBaseChecksSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUCCESS,
    payload,
});
export const backgroundCheckPackageGetBaseChecksFailure = (payload:BackgroundCheckPackageGetBaseChecksFailurePayload):BackgroundCheckPackageGetBaseChecksFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_FAILURE,
    payload,
});


export const backgroundCheckPackageGetBaseChecksSubserviceRequest = (payload:BackgroundCheckPackageGetBaseChecksSubservicePayload):BackgroundCheckPackageGetBaseChecksSubserviceRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_REQUEST,
    payload,
});
export const backgroundCheckPackageGetBaseChecksSubserviceSuccess = (payload:BackgroundCheckPackageGetBaseChecksSubserviceSuccessPayload):BackgroundCheckPackageGetBaseChecksSubserviceSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_SUCCESS,
    payload,
});
export const backgroundCheckPackageGetBaseChecksSubserviceFailure = (payload:BackgroundCheckPackageGetBaseChecksSubserviceFailurePayload):BackgroundCheckPackageGetBaseChecksSubserviceFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_FAILURE,
    payload,
});


export const backgroundCheckPackageCreateRequest = (payload:BackgroundCheckPackageCreatePayload):BackgroundCheckPackageCreateRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_REQUEST,
    payload,
});
export const backgroundCheckPackageCreateSuccess = (payload:BackgroundCheckPackageCreateSuccessPayload):BackgroundCheckPackageCreateSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_SUCCESS,
    payload,
});
export const backgroundCheckPackageCreateFailure = (payload:BackgroundCheckPackageCreateFailurePayload):BackgroundCheckPackageCreateFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_CREATE_FAILURE,
    payload,
});


export const backgroundCheckPackageUpdateRequest = (payload:BackgroundCheckPackageUpdatePayload):BackgroundCheckPackageUpdateRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_REQUEST,
    payload,
});
export const backgroundCheckPackageUpdateSuccess = (payload:BackgroundCheckPackageUpdateSuccessPayload):BackgroundCheckPackageUpdateSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_SUCCESS,
    payload,
});
export const backgroundCheckPackageUpdateFailure = (payload:BackgroundCheckPackageUpdateFailurePayload):BackgroundCheckPackageUpdateFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_UPDATE_FAILURE,
    payload,
});


export const backgroundCheckPackageFilterRequest = (payload:BackgroundCheckPackageFilterPayload):BackgroundCheckPackageFilterRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_REQUEST,
    payload,
});
export const backgroundCheckPackageFilterSuccess = (payload:BackgroundCheckPackageFilterSuccessPayload):BackgroundCheckPackageFilterSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_SUCCESS,
    payload,
});
export const backgroundCheckPackageFilterFailure = (payload:BackgroundCheckPackageFilterFailurePayload):BackgroundCheckPackageFilterFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_FILTER_FAILURE,
    payload,
});


export const backgroundCheckPackageGetSingleRequest = (payload:BackgroundCheckPackageGetSinglePayload):BackgroundCheckPackageGetSingleRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_REQUEST,
    payload,
});
export const backgroundCheckPackageGetSingleSuccess = (payload:BackgroundCheckPackageGetSingleSuccessPayload):BackgroundCheckPackageGetSingleSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_SUCCESS,
    payload,
});
export const backgroundCheckPackageGetSingleFailure = (payload:BackgroundCheckPackageGetSingleFailurePayload):BackgroundCheckPackageGetSingleFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_SINGLE_FAILURE,
    payload,
});


export const backgroundCheckPackageGetActiveRequest = (payload:BackgroundCheckPackageGetActivePayload):BackgroundCheckPackageGetActiveRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_REQUEST,
    payload,
});
export const backgroundCheckPackageGetActiveSuccess = (payload:BackgroundCheckPackageGetActiveSuccessPayload):BackgroundCheckPackageGetActiveSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_SUCCESS,
    payload,
});
export const backgroundCheckPackageGetActiveFailure = (payload:BackgroundCheckPackageGetActiveFailurePayload):BackgroundCheckPackageGetActiveFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_FAILURE,
    payload,
});


export const backgroundCheckPackageChangeStatusRequest = (payload:BackgroundCheckPackageChangeStatusPayload):BackgroundCheckPackageChangeStatusRequest => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_REQUEST,
    payload,
});
export const backgroundCheckPackageChangeStatusSuccess = (payload:BackgroundCheckPackageChangeStatusSuccessPayload):BackgroundCheckPackageChangeStatusSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_SUCCESS,
    payload,
});
export const backgroundCheckPackageChangeStatusFailure = (payload:BackgroundCheckPackageChangeStatusFailurePayload):BackgroundCheckPackageChangeStatusFailure => ({
    type: actionTypes.BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_FAILURE,
    payload,
});