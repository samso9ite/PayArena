import { actionTypes } from "../../../constants/actionTypes";

export interface IApplicationInfo {
  resp: any;
}
export interface ICreateApplication {
  resp: any;
}
export interface IEditApplication {
  resp: any;
}

export interface IGetAppTeamMembers {
  resp: any;
}

export interface ApplicationInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface CreateApplicationState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface EditApplicationState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface GetAppTeamMembersInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface ApplicationInfoPayload {
  callback: any;
}
export interface CreateApplicationPayload {
  values: { name: string, users: string[], products: string[] };
  callback: any;
}
export interface EditApplicationPayload {
  values: { name: string, application_id: string, is_active:any, users: string[], products: string[] };
  callback: any;
}

export interface GetAppTeamMembersInfoPayload {
  callback: any;
}

export interface ApplicationInfoSuccessPayload {
  resp: any;
}
export interface CreateApplicationSuccessPayload {
  resp: any;
}
export interface EditApplicationSuccessPayload {
  resp: any;
}

export interface GetAppTeamMembersInfoSuccessPayload {
  resp: any;
}

export interface ApplicationInfoFailurePayload {
  error: string;
}
export interface CreateApplicationFailurePayload {
  error: string;
}
export interface EditApplicationFailurePayload {
  error: string;
}

export interface GetAppTeamMembersInfoFailurePayload {
  error: string;
}


export interface ApplicationInfoRequest {
  type: typeof actionTypes.APPLICATION_INFO_REQUEST;
  payload: ApplicationInfoPayload;
}
export interface CreateApplicationRequest {
  type: typeof actionTypes.CREATE_APPLICATION_REQUEST;
  payload: CreateApplicationPayload;
}
export interface EditApplicationRequest {
  type: typeof actionTypes.EDIT_APPLICATION_REQUEST;
  payload: EditApplicationPayload;
}

export interface GetAppTeamMembersInfoRequest {
  type: typeof actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_REQUEST;
  payload: GetAppTeamMembersInfoPayload;
}

export type ApplicationInfoSuccess = {
  type: typeof actionTypes.APPLICATION_INFO_SUCCESS,
  payload: ApplicationInfoSuccessPayload,
};
export type CreateApplicationSuccess = {
  type: typeof actionTypes.CREATE_APPLICATION_SUCCESS,
  payload: CreateApplicationSuccessPayload,
};
export type EditApplicationSuccess = {
  type: typeof actionTypes.EDIT_APPLICATION_SUCCESS,
  payload: EditApplicationSuccessPayload,
};
export type GetAppTeamMembersInfoSuccess = {
  type: typeof actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_SUCCESS,
  payload: GetAppTeamMembersInfoSuccessPayload,
};

export type ApplicationInfoFailure = {
  type: typeof actionTypes.APPLICATION_INFO_FAILURE,
  payload: ApplicationInfoFailurePayload,
};
export type CreateApplicationFailure = {
  type: typeof actionTypes.CREATE_APPLICATION_FAILURE,
  payload: CreateApplicationFailurePayload,
};
export type EditApplicationFailure = {
  type: typeof actionTypes.EDIT_APPLICATION_FAILURE,
  payload: EditApplicationFailurePayload,
};
export type GetAppTeamMembersInfoFailure = {
  type: typeof actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_FAILURE,
  payload: GetAppTeamMembersInfoFailurePayload,
};

export type ApplicationInfoActions =
  | ApplicationInfoRequest
  | ApplicationInfoSuccess
  | ApplicationInfoFailure;
export type CreateApplicationActions =
  | CreateApplicationRequest
  | CreateApplicationSuccess
  | CreateApplicationFailure;
export type EditApplicationActions =
  | EditApplicationRequest
  | EditApplicationSuccess
  | EditApplicationFailure;
export type GetAppTeamMembersActions =
  | GetAppTeamMembersInfoRequest
  | GetAppTeamMembersInfoSuccess
  | GetAppTeamMembersInfoFailure;