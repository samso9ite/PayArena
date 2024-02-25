import { actionTypes } from '../../../constants/actionTypes'
import { TeamInfoPayload, TeamInfoRequest, TeamInfoSuccess,
    TeamInfoSuccessPayload, TeamInfoFailure, TeamInfoFailurePayload, 
    CreateTeamMemberPayload, CreateTeamMemberRequest, CreateTeamMemberSuccess,
    CreateTeamMemberSuccessPayload, CreateTeamMemberFailure, CreateTeamMemberFailurePayload, 
    ActivateTeamMemberPayload, ActivateTeamMemberRequest, ActivateTeamMemberSuccessPayload, 
    ActivateTeamMemberSuccess, ActivateTeamMemberFailurePayload, ActivateTeamMemberFailure, 
    DeactivateTeamMemberPayload, DeactivateTeamMemberRequest, DeactivateTeamMemberSuccessPayload, 
    DeactivateTeamMemberSuccess, DeactivateTeamMemberFailurePayload, DeactivateTeamMemberFailure, 
    DeleteTeamMemberPayload, DeleteTeamMemberRequest, DeleteTeamMemberSuccessPayload, 
    DeleteTeamMemberSuccess, DeleteTeamMemberFailurePayload, DeleteTeamMemberFailure, ChangeTeamMemberRolePayload, ChangeTeamMemberRoleRequest, ChangeTeamMemberRoleSuccessPayload, ChangeTeamMemberRoleSuccess, ChangeTeamMemberRoleFailurePayload, ChangeTeamMemberRoleFailure, 
} from "./types";


export const teamInfoRequest = (payload:TeamInfoPayload):TeamInfoRequest => ({
    type: actionTypes.TEAM_INFO_REQUEST,
    payload,
});
export const teamInfoSuccess = (payload:TeamInfoSuccessPayload):TeamInfoSuccess => ({
    type: actionTypes.TEAM_INFO_SUCCESS,
    payload,
});
export const teamInfoFailure = (payload:TeamInfoFailurePayload):TeamInfoFailure => ({
    type: actionTypes.TEAM_INFO_FAILURE,
    payload,
});


export const createTeamMemberRequest = (payload:CreateTeamMemberPayload):CreateTeamMemberRequest => ({
    type: actionTypes.CREATE_TEAM_MEMBER_REQUEST,
    payload,
});
export const createTeamMemberSuccess = (payload:CreateTeamMemberSuccessPayload):CreateTeamMemberSuccess => ({
    type: actionTypes.CREATE_TEAM_MEMBER_SUCCESS,
    payload,
});
export const createTeamMemberFailure = (payload:CreateTeamMemberFailurePayload):CreateTeamMemberFailure => ({
    type: actionTypes.CREATE_TEAM_MEMBER_FAILURE,
    payload,
});


export const changeTeamMemberRoleRequest = (payload:ChangeTeamMemberRolePayload):ChangeTeamMemberRoleRequest => ({
    type: actionTypes.CHANGE_TEAM_MEMBER_ROLE_REQUEST,
    payload,
});
export const changeTeamMemberRoleSuccess = (payload:ChangeTeamMemberRoleSuccessPayload):ChangeTeamMemberRoleSuccess => ({
    type: actionTypes.CHANGE_TEAM_MEMBER_ROLE_SUCCESS,
    payload,
});
export const changeTeamMemberRoleFailure = (payload:ChangeTeamMemberRoleFailurePayload):ChangeTeamMemberRoleFailure => ({
    type: actionTypes.CHANGE_TEAM_MEMBER_ROLE_FAILURE,
    payload,
});


export const activateTeamMemberRequest = (payload:ActivateTeamMemberPayload):ActivateTeamMemberRequest => ({
    type: actionTypes.ACTIVATE_TEAM_MEMBER_REQUEST,
    payload,
});
export const activateTeamMemberSuccess = (payload:ActivateTeamMemberSuccessPayload):ActivateTeamMemberSuccess => ({
    type: actionTypes.ACTIVATE_TEAM_MEMBER_SUCCESS,
    payload,
});
export const activateTeamMemberFailure = (payload:ActivateTeamMemberFailurePayload):ActivateTeamMemberFailure => ({
    type: actionTypes.ACTIVATE_TEAM_MEMBER_FAILURE,
    payload,
});


export const deactivateTeamMemberRequest = (payload:DeactivateTeamMemberPayload):DeactivateTeamMemberRequest => ({
    type: actionTypes.DEACTIVATE_TEAM_MEMBER_REQUEST,
    payload,
});
export const deactivateTeamMemberSuccess = (payload:DeactivateTeamMemberSuccessPayload):DeactivateTeamMemberSuccess => ({
    type: actionTypes.DEACTIVATE_TEAM_MEMBER_SUCCESS,
    payload,
});
export const deactivateTeamMemberFailure = (payload:DeactivateTeamMemberFailurePayload):DeactivateTeamMemberFailure => ({
    type: actionTypes.DEACTIVATE_TEAM_MEMBER_FAILURE,
    payload,
});


export const deleteTeamMemberRequest = (payload:DeleteTeamMemberPayload):DeleteTeamMemberRequest => ({
    type: actionTypes.DELETE_TEAM_MEMBER_REQUEST,
    payload,
});
export const deleteTeamMemberSuccess = (payload:DeleteTeamMemberSuccessPayload):DeleteTeamMemberSuccess => ({
    type: actionTypes.DELETE_TEAM_MEMBER_SUCCESS,
    payload,
});
export const deleteTeamMemberFailure = (payload:DeleteTeamMemberFailurePayload):DeleteTeamMemberFailure => ({
    type: actionTypes.DELETE_TEAM_MEMBER_FAILURE,
    payload,
});