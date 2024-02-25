import { actionTypes } from '../../constants/actionTypes'
import { 
    MyOrganisationInfoFailure, MyOrganisationInfoFailurePayload, MyOrganisationInfoPayload, 
    MyOrganisationInfoRequest, MyOrganisationInfoSuccess, MyOrganisationInfoSuccessPayload, 

    CreateMyOrganisationInfoFailure, CreateMyOrganisationInfoFailurePayload, CreateMyOrganisationInfoPayload,
    CreateMyOrganisationInfoRequest, CreateMyOrganisationInfoSuccess, CreateMyOrganisationInfoSuccessPayload,

    UpdateMyOrganisationInfoFailure, UpdateMyOrganisationInfoFailurePayload, UpdateMyOrganisationInfoPayload, 
    UpdateMyOrganisationInfoRequest, UpdateMyOrganisationInfoSuccess, UpdateMyOrganisationInfoSuccessPayload ,
} from "./types";


export const myOrganisationInfoRequest = (payload:MyOrganisationInfoPayload):MyOrganisationInfoRequest => ({
    type: actionTypes.MY_ORGANISATION_INFO_REQUEST,
    payload,
});
export const myOrganisationInfoSuccess = (payload:MyOrganisationInfoSuccessPayload):MyOrganisationInfoSuccess => ({
    type: actionTypes.MY_ORGANISATION_INFO_SUCCESS,
    payload,
});
export const myOrganisationInfoFailure = (payload:MyOrganisationInfoFailurePayload):MyOrganisationInfoFailure => ({
    type: actionTypes.MY_ORGANISATION_INFO_FAILURE,
    payload,
});


export const createMyOrganisationInfoRequest = (payload:CreateMyOrganisationInfoPayload):CreateMyOrganisationInfoRequest => ({
    type: actionTypes.CREATE_MY_ORGANISATION_INFO_REQUEST,
    payload,
});
export const createMyOrganisationInfoSuccess = (payload:CreateMyOrganisationInfoSuccessPayload):CreateMyOrganisationInfoSuccess => ({
    type: actionTypes.CREATE_MY_ORGANISATION_INFO_SUCCESS,
    payload,
});
export const createMyOrganisationInfoFailure = (payload:CreateMyOrganisationInfoFailurePayload):CreateMyOrganisationInfoFailure => ({
    type: actionTypes.CREATE_MY_ORGANISATION_INFO_FAILURE,
    payload,
});


export const updateMyOrganisationInfoRequest = (payload:UpdateMyOrganisationInfoPayload):UpdateMyOrganisationInfoRequest => ({
    type: actionTypes.UPDATE_MY_ORGANISATION_INFO_REQUEST,
    payload,
});
export const updateMyOrganisationInfoSuccess = (payload:UpdateMyOrganisationInfoSuccessPayload):UpdateMyOrganisationInfoSuccess => ({
    type: actionTypes.UPDATE_MY_ORGANISATION_INFO_SUCCESS,
    payload,
});
export const updateMyOrganisationInfoFailure = (payload:UpdateMyOrganisationInfoFailurePayload):UpdateMyOrganisationInfoFailure => ({
    type: actionTypes.UPDATE_MY_ORGANISATION_INFO_FAILURE,
    payload,
});
