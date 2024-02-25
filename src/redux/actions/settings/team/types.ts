import {actionTypes} from "../../../constants/actionTypes";

  export interface ITeamInfo {
    resp: any;
  }
  export interface ICreateTeamMember {
    resp: any;
  }
  export interface IChangeTeamMemberRole {
    resp: any;
  }
  export interface IActivateTeamMember {
    resp: any;
  }
  export interface IDeactivateTeamMember {
    resp: any;
  }
  export interface IDeleteTeamMember {
    resp: any;
  }
  

  export interface TeamInfoState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface CreateTeamMemberState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface ChangeTeamMemberRoleState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface ActivateTeamMemberState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface DeactivateTeamMemberState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface DeleteTeamMemberState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  

  export interface TeamInfoPayload {
    callback: any;
  }
  export interface CreateTeamMemberPayload {
    values: { 
      email: string,
      permission_id: string,
      url_path: string
    };
    callback: any;
  }
  export interface ChangeTeamMemberRolePayload {
    values: { 
      team_id: string,
      permission_id: string,
    };
    callback: any;
  }
  export interface ActivateTeamMemberPayload {
    values: { 
      email: string, 
    };
    callback: any;
  }
  export interface DeactivateTeamMemberPayload {
    values: { 
      email: string, 
    };
    callback: any;
  }
  export interface DeleteTeamMemberPayload {
    values: { 
      email: string, 
    };
    callback: any;
  }
  

  export interface TeamInfoSuccessPayload {
    resp: any;
  }
  export interface CreateTeamMemberSuccessPayload {
    resp: any;
  }
  export interface ChangeTeamMemberRoleSuccessPayload {
    resp: any;
  }
  export interface ActivateTeamMemberSuccessPayload {
    resp: any;
  }
  export interface DeactivateTeamMemberSuccessPayload {
    resp: any;
  }
  export interface DeleteTeamMemberSuccessPayload {
    resp: any;
  }
  

  export interface TeamInfoFailurePayload {
    error: string;
  }
  export interface CreateTeamMemberFailurePayload {
    error: string;
  }
  export interface ChangeTeamMemberRoleFailurePayload {
    error: string;
  }
  export interface ActivateTeamMemberFailurePayload {
    error: string;
  }
  export interface DeactivateTeamMemberFailurePayload {
    error: string;
  }
  export interface DeleteTeamMemberFailurePayload {
    error: string;
  }
  
  
  export interface TeamInfoRequest {
    type: typeof actionTypes.TEAM_INFO_REQUEST;
    payload: TeamInfoPayload;
  }
  export interface CreateTeamMemberRequest {
    type: typeof actionTypes.CREATE_TEAM_MEMBER_REQUEST;
    payload: CreateTeamMemberPayload;
  }
  export interface ChangeTeamMemberRoleRequest {
    type: typeof actionTypes.CHANGE_TEAM_MEMBER_ROLE_REQUEST;
    payload: ChangeTeamMemberRolePayload;
  }
  export interface ActivateTeamMemberRequest {
    type: typeof actionTypes.ACTIVATE_TEAM_MEMBER_REQUEST;
    payload: ActivateTeamMemberPayload;
  }
  export interface DeactivateTeamMemberRequest {
    type: typeof actionTypes.DEACTIVATE_TEAM_MEMBER_REQUEST;
    payload: DeactivateTeamMemberPayload;
  }
  export interface DeleteTeamMemberRequest {
    type: typeof actionTypes.DELETE_TEAM_MEMBER_REQUEST;
    payload: DeleteTeamMemberPayload;
  }
  

  export type TeamInfoSuccess = {
    type: typeof actionTypes.TEAM_INFO_SUCCESS,
    payload: TeamInfoSuccessPayload,
  };
  export type CreateTeamMemberSuccess = {
    type: typeof actionTypes.CREATE_TEAM_MEMBER_SUCCESS,
    payload: CreateTeamMemberSuccessPayload,
  };
  export type ChangeTeamMemberRoleSuccess = {
    type: typeof actionTypes.CHANGE_TEAM_MEMBER_ROLE_SUCCESS,
    payload: ChangeTeamMemberRoleSuccessPayload,
  };
  export type ActivateTeamMemberSuccess = {
    type: typeof actionTypes.ACTIVATE_TEAM_MEMBER_SUCCESS,
    payload: ActivateTeamMemberSuccessPayload,
  };
  export type DeactivateTeamMemberSuccess = {
    type: typeof actionTypes.DEACTIVATE_TEAM_MEMBER_SUCCESS,
    payload: DeactivateTeamMemberSuccessPayload,
  };
  export type DeleteTeamMemberSuccess = {
    type: typeof actionTypes.DELETE_TEAM_MEMBER_SUCCESS,
    payload: DeleteTeamMemberSuccessPayload,
  };
  

  export type TeamInfoFailure = {
    type: typeof actionTypes.TEAM_INFO_FAILURE,
    payload: TeamInfoFailurePayload,
  };
  export type CreateTeamMemberFailure = {
    type: typeof actionTypes.CREATE_TEAM_MEMBER_FAILURE,
    payload: CreateTeamMemberFailurePayload,
  };
  export type ChangeTeamMemberRoleFailure = {
    type: typeof actionTypes.CHANGE_TEAM_MEMBER_ROLE_FAILURE,
    payload: ChangeTeamMemberRoleFailurePayload,
  };
  export type ActivateTeamMemberFailure = {
    type: typeof actionTypes.ACTIVATE_TEAM_MEMBER_FAILURE,
    payload: ActivateTeamMemberFailurePayload,
  };
  export type DeactivateTeamMemberFailure = {
    type: typeof actionTypes.DEACTIVATE_TEAM_MEMBER_FAILURE,
    payload: DeactivateTeamMemberFailurePayload,
  };
  export type DeleteTeamMemberFailure = {
    type: typeof actionTypes.DELETE_TEAM_MEMBER_FAILURE,
    payload: DeleteTeamMemberFailurePayload,
  };
  
  
  export type TeamInfoActions =
  | TeamInfoRequest
  | TeamInfoSuccess
  | TeamInfoFailure;

  export type CreateTeamMemberActions =
  | CreateTeamMemberRequest
  | CreateTeamMemberSuccess
  | CreateTeamMemberFailure;

  export type ChangeTeamMemberRoleActions =
  | ChangeTeamMemberRoleRequest
  | ChangeTeamMemberRoleSuccess
  | ChangeTeamMemberRoleFailure;

  export type ActivateTeamMemberActions =
  | ActivateTeamMemberRequest
  | ActivateTeamMemberSuccess
  | ActivateTeamMemberFailure;

  export type DeactivateTeamMemberActions =
  | DeactivateTeamMemberRequest
  | DeactivateTeamMemberSuccess
  | DeactivateTeamMemberFailure;

  export type DeleteTeamMemberActions =
  | DeleteTeamMemberRequest
  | DeleteTeamMemberSuccess
  | DeleteTeamMemberFailure;