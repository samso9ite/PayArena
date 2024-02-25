import {actionTypes} from "../../../constants/actionTypes";
  
  export interface IOrganizationModule {
    resp: any;
  }
  export interface IOrganizationRole{
    resp: any;
  }
  export interface ICreateUserRole {
    resp: any;
  }
  export interface IUpdateUserRole {
    resp: any;
  }
  

  export interface OrganizationModuleState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface OrganizationRoleState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface CreateUserRoleState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface UpdateUserRoleState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  

  export interface OrganizationModulePayload {
    callback: any;
  }
  export interface OrganizationRolePayload {
    callback: any;
  }
  export interface CreateUserRolePayload {
    values: { 
      email: string, 
    };
    callback: any;
  }
  export interface UpdateUserRolePayload {
    values: { 
      email: string, 
    };
    callback: any;
  }
  

  export interface OrganizationModuleSuccessPayload {
    resp: any;
  }
  export interface OrganizationRoleSuccessPayload {
    resp: any;
  }
  export interface CreateUserRoleSuccessPayload {
    resp: any;
  }
  export interface UpdateUserRoleSuccessPayload {
    resp: any;
  }
  

  export interface OrganizationModuleFailurePayload {
    error: string;
  }
  export interface OrganizationRoleFailurePayload {
    error: string;
  }
  export interface CreateUserRoleFailurePayload {
    error: string;
  }
  export interface UpdateUserRoleFailurePayload {
    error: string;
  }
  
  
  export interface OrganizationModuleRequest {
    type: typeof actionTypes.ORGANIZATION_MODULE_REQUEST;
    payload: OrganizationModulePayload;
  }
  export interface OrganizationRoleRequest {
    type: typeof actionTypes.ORGANIZATION_ROLE_REQUEST;
    payload: OrganizationRolePayload;
  }
  export interface CreateUserRoleRequest {
    type: typeof actionTypes.CREATE_USER_ROLE_REQUEST;
    payload: CreateUserRolePayload;
  }
  export interface UpdateUserRoleRequest {
    type: typeof actionTypes.UPDATE_USER_ROLE_REQUEST;
    payload: UpdateUserRolePayload;
  }
  

  export type OrganizationModuleSuccess = {
    type: typeof actionTypes.ORGANIZATION_MODULE_SUCCESS,
    payload: OrganizationModuleSuccessPayload,
  };
  export type OrganizationRoleSuccess = {
    type: typeof actionTypes.ORGANIZATION_ROLE_SUCCESS,
    payload: OrganizationRoleSuccessPayload,
  };
  export type CreateUserRoleSuccess = {
    type: typeof actionTypes.CREATE_USER_ROLE_SUCCESS,
    payload: CreateUserRoleSuccessPayload,
  };
  export type UpdateUserRoleSuccess = {
    type: typeof actionTypes.UPDATE_USER_ROLE_SUCCESS,
    payload: OrganizationRoleSuccessPayload,
  };
  

  export type OrganizationModuleFailure = {
    type: typeof actionTypes.ORGANIZATION_MODULE_FAILURE,
    payload: OrganizationModuleFailurePayload,
  };
  export type OrganizationRoleFailure = {
    type: typeof actionTypes.ORGANIZATION_ROLE_FAILURE,
    payload: OrganizationRoleFailurePayload,
  };
  export type CreateUserRoleFailure = {
    type: typeof actionTypes.CREATE_USER_ROLE_FAILURE,
    payload: CreateUserRoleFailurePayload,
  };
  export type UpdateUserRoleFailure = {
    type: typeof actionTypes.UPDATE_USER_ROLE_FAILURE,
    payload: UpdateUserRoleFailurePayload,
  };
  
  
  export type OrganizationModuleActions =
  | OrganizationModuleRequest
  | OrganizationModuleSuccess
  | OrganizationModuleFailure;

  export type OrganizationRoleActions =
  | OrganizationRoleRequest
  | OrganizationRoleSuccess
  | OrganizationRoleFailure;

  export type CreateUserRoleActions =
  | CreateUserRoleRequest
  | CreateUserRoleSuccess
  | CreateUserRoleFailure;

  export type UpdateUserRoleActions =
  | UpdateUserRoleRequest
  | UpdateUserRoleSuccess
  | UpdateUserRoleFailure;
