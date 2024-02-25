import { actionTypes } from '../../../constants/actionTypes'
import { ApplicationInfoPayload, ApplicationInfoRequest, ApplicationInfoSuccess,
    ApplicationInfoSuccessPayload, ApplicationInfoFailure, ApplicationInfoFailurePayload, 
    CreateApplicationPayload, CreateApplicationRequest, CreateApplicationSuccess,
    CreateApplicationSuccessPayload, CreateApplicationFailure, CreateApplicationFailurePayload, 
    EditApplicationPayload, EditApplicationRequest, EditApplicationSuccessPayload, 
    EditApplicationSuccess, EditApplicationFailurePayload, EditApplicationFailure, 
    GetAppTeamMembersInfoPayload, GetAppTeamMembersInfoRequest, GetAppTeamMembersInfoSuccess,
    GetAppTeamMembersInfoSuccessPayload, GetAppTeamMembersInfoFailure, GetAppTeamMembersInfoFailurePayload
} from "./types";


export const applicationInfoRequest = (payload:ApplicationInfoPayload):ApplicationInfoRequest => ({
    type: actionTypes.APPLICATION_INFO_REQUEST,
    payload,
});

export const applicationInfoSuccess = (payload:ApplicationInfoSuccessPayload):ApplicationInfoSuccess => ({
    type: actionTypes.APPLICATION_INFO_SUCCESS,
    payload,
});

export const applicationInfoFailure = (payload:ApplicationInfoFailurePayload):ApplicationInfoFailure => ({
    type: actionTypes.APPLICATION_INFO_FAILURE,
    payload,
});



export const createApplicationRequest = (payload:CreateApplicationPayload):CreateApplicationRequest => ({
    type: actionTypes.CREATE_APPLICATION_REQUEST,
    payload,
});

export const createApplicationSuccess = (payload:CreateApplicationSuccessPayload):CreateApplicationSuccess => ({
    type: actionTypes.CREATE_APPLICATION_SUCCESS,
    payload,
});

export const createApplicationFailure = (payload:CreateApplicationFailurePayload):CreateApplicationFailure => ({
    type: actionTypes.CREATE_APPLICATION_FAILURE,
    payload,
});



export const editApplicationRequest = (payload:EditApplicationPayload):EditApplicationRequest => ({
    type: actionTypes.EDIT_APPLICATION_REQUEST,
    payload,
});

export const editApplicationSuccess = (payload:EditApplicationSuccessPayload):EditApplicationSuccess => ({
    type: actionTypes.EDIT_APPLICATION_SUCCESS,
    payload,
});

export const editApplicationFailure = (payload:EditApplicationFailurePayload):EditApplicationFailure => ({
    type: actionTypes.EDIT_APPLICATION_FAILURE,
    payload,
});


export const getAppTeamMembersInfoRequest = (payload:GetAppTeamMembersInfoPayload):GetAppTeamMembersInfoRequest => ({
    type: actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_REQUEST,
    payload,
});

export const getAppTeamMembersInfoSuccess = (payload:GetAppTeamMembersInfoSuccessPayload):GetAppTeamMembersInfoSuccess => ({
    type: actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_SUCCESS,
    payload,
});

export const getAppTeamMembersInfoFailure = (payload:GetAppTeamMembersInfoFailurePayload):GetAppTeamMembersInfoFailure => ({
    type: actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_FAILURE,
    payload,
});

