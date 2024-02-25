import { actionTypes } from '../../../constants/actionTypes'
import { OrganizationModulePayload, OrganizationModuleRequest, OrganizationModuleSuccess,
    OrganizationModuleSuccessPayload, OrganizationModuleFailure, OrganizationModuleFailurePayload, 
    OrganizationRolePayload, OrganizationRoleRequest, OrganizationRoleSuccess,
    OrganizationRoleSuccessPayload, OrganizationRoleFailure, OrganizationRoleFailurePayload, 
    CreateUserRolePayload, CreateUserRoleRequest, CreateUserRoleSuccessPayload, 
    CreateUserRoleSuccess, CreateUserRoleFailurePayload, CreateUserRoleFailure, 
    UpdateUserRolePayload, UpdateUserRoleRequest, UpdateUserRoleSuccessPayload, 
    UpdateUserRoleSuccess, UpdateUserRoleFailurePayload, UpdateUserRoleFailure, 
} from "./types";


export const organizationModuleRequest = (payload:OrganizationModulePayload):OrganizationModuleRequest => ({
    type: actionTypes.ORGANIZATION_MODULE_REQUEST,
    payload,
});
export const organizationModuleSuccess = (payload:OrganizationModuleSuccessPayload):OrganizationModuleSuccess => ({
    type: actionTypes.ORGANIZATION_MODULE_SUCCESS,
    payload,
});
export const organizationModuleFailure = (payload:OrganizationModuleFailurePayload):OrganizationModuleFailure => ({
    type: actionTypes.ORGANIZATION_MODULE_FAILURE,
    payload,
});


export const organizationRoleRequest = (payload:OrganizationRolePayload):OrganizationRoleRequest => ({
    type: actionTypes.ORGANIZATION_ROLE_REQUEST,
    payload,
});
export const organizationRoleSuccess = (payload:OrganizationRoleSuccessPayload):OrganizationRoleSuccess => ({
    type: actionTypes.ORGANIZATION_ROLE_SUCCESS,
    payload,
});
export const organizationRoleFailure = (payload:OrganizationRoleFailurePayload):OrganizationRoleFailure => ({
    type: actionTypes.ORGANIZATION_ROLE_FAILURE,
    payload,
});


export const createUserRoleRequest = (payload:CreateUserRolePayload):CreateUserRoleRequest => ({
    type: actionTypes.CREATE_USER_ROLE_REQUEST,
    payload,
});
export const createUserRoleSuccess = (payload:CreateUserRoleSuccessPayload):CreateUserRoleSuccess => ({
    type: actionTypes.CREATE_USER_ROLE_SUCCESS,
    payload,
});
export const createUserRoleFailure = (payload:CreateUserRoleFailurePayload):CreateUserRoleFailure => ({
    type: actionTypes.CREATE_USER_ROLE_FAILURE,
    payload,
});


export const updateUserRoleRequest = (payload:UpdateUserRolePayload):UpdateUserRoleRequest => ({
    type: actionTypes.UPDATE_USER_ROLE_REQUEST,
    payload,
});
export const updateUserRoleSuccess = (payload:UpdateUserRoleSuccessPayload):UpdateUserRoleSuccess => ({
    type: actionTypes.UPDATE_USER_ROLE_SUCCESS,
    payload,
});
export const updateUserRoleFailure = (payload:UpdateUserRoleFailurePayload):UpdateUserRoleFailure => ({
    type: actionTypes.UPDATE_USER_ROLE_FAILURE,
    payload,
});
