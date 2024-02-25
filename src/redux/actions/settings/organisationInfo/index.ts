import { actionTypes } from '../../../constants/actionTypes'
import { OrganisationInfoPayload, OrganisationInfoRequest, OrganisationInfoSuccess,
    OrganisationInfoSuccessPayload, OrganisationInfoFailure, OrganisationInfoFailurePayload, 
    UpdateOrganisationInfoPayload, UpdateOrganisationInfoRequest, UpdateOrganisationInfoSuccess,
    UpdateOrganisationInfoSuccessPayload, UpdateOrganisationInfoFailure, UpdateOrganisationInfoFailurePayload, 
} from "./types";


export const organisationInfoRequest = (payload:OrganisationInfoPayload):OrganisationInfoRequest => ({
    type: actionTypes.ORGANISATION_INFO_REQUEST,
    payload,
});

export const organisationInfoSuccess = (payload:OrganisationInfoSuccessPayload):OrganisationInfoSuccess => ({
    type: actionTypes.ORGANISATION_INFO_SUCCESS,
    payload,
});

export const organisationInfoFailure = (payload:OrganisationInfoFailurePayload):OrganisationInfoFailure => ({
    type: actionTypes.ORGANISATION_INFO_FAILURE,
    payload,
});



export const updateOrganisationInfoRequest = (payload:UpdateOrganisationInfoPayload):UpdateOrganisationInfoRequest => ({
    type: actionTypes.UPDATE_ORGANISATION_INFO_REQUEST,
    payload,
});

export const updateOrganisationInfoSuccess = (payload:UpdateOrganisationInfoSuccessPayload):UpdateOrganisationInfoSuccess => ({
    type: actionTypes.UPDATE_ORGANISATION_INFO_SUCCESS,
    payload,
});

export const updateOrganisationInfoFailure = (payload:UpdateOrganisationInfoFailurePayload):UpdateOrganisationInfoFailure => ({
    type: actionTypes.UPDATE_ORGANISATION_INFO_FAILURE,
    payload,
});

