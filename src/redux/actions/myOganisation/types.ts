import { actionTypes } from "../../constants/actionTypes";


export interface IMyOrganisationInfo {
  resp: any;
}
export interface ICreateMyOrganisationInfo {
  resp: any;
}
export interface IUpdateMyOrganisationInfo {
  resp: any;
}


export interface MyOrganisationInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface CreateMyOrganisationInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface UpdateMyOrganisationInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface MyOrganisationInfoPayload {
  callback: any;
}
export interface CreateMyOrganisationInfoPayload {
  values: {
    business_name: string,
    business_email:string,
    country: string,
    sector:string,
  };
  callback: any;
}
export interface UpdateMyOrganisationInfoPayload {
  values: {
    ref: string,
  };
  callback: any;
}


export interface MyOrganisationInfoSuccessPayload {
  resp: any;
}
export interface CreateMyOrganisationInfoSuccessPayload {
  resp: any;
}
export interface UpdateMyOrganisationInfoSuccessPayload {
  resp: any;
}


export interface MyOrganisationInfoFailurePayload {
  error: string;
}
export interface CreateMyOrganisationInfoFailurePayload {
  error: string;
}
export interface UpdateMyOrganisationInfoFailurePayload {
  error: string;
}


export interface MyOrganisationInfoRequest {
  type: typeof actionTypes.MY_ORGANISATION_INFO_REQUEST;
  payload: MyOrganisationInfoPayload;
}
export interface CreateMyOrganisationInfoRequest {
  type: typeof actionTypes.CREATE_MY_ORGANISATION_INFO_REQUEST;
  payload: CreateMyOrganisationInfoPayload;
}
export interface UpdateMyOrganisationInfoRequest {
  type: typeof actionTypes.UPDATE_MY_ORGANISATION_INFO_REQUEST;
  payload: UpdateMyOrganisationInfoPayload;
}


export type MyOrganisationInfoSuccess = {
  type: typeof actionTypes.MY_ORGANISATION_INFO_SUCCESS,
  payload: MyOrganisationInfoSuccessPayload,
};
export type CreateMyOrganisationInfoSuccess = {
  type: typeof actionTypes.CREATE_MY_ORGANISATION_INFO_SUCCESS,
  payload: CreateMyOrganisationInfoSuccessPayload,
};
export type UpdateMyOrganisationInfoSuccess = {
  type: typeof actionTypes.UPDATE_MY_ORGANISATION_INFO_SUCCESS,
  payload: UpdateMyOrganisationInfoSuccessPayload,
};


export type MyOrganisationInfoFailure = {
  type: typeof actionTypes.MY_ORGANISATION_INFO_FAILURE,
  payload: MyOrganisationInfoFailurePayload,
};
export type CreateMyOrganisationInfoFailure = {
  type: typeof actionTypes.CREATE_MY_ORGANISATION_INFO_FAILURE,
  payload: CreateMyOrganisationInfoFailurePayload,
};
export type UpdateMyOrganisationInfoFailure = {
  type: typeof actionTypes.UPDATE_MY_ORGANISATION_INFO_FAILURE,
  payload: UpdateMyOrganisationInfoFailurePayload,
};


export type MyOrganisationInfoActions =
  | MyOrganisationInfoRequest
  | MyOrganisationInfoSuccess
  | MyOrganisationInfoFailure;

export type CreateMyOrganisationInfoActions =
  | CreateMyOrganisationInfoRequest
  | CreateMyOrganisationInfoSuccess
  | CreateMyOrganisationInfoFailure;

export type UpdateMyOrganisationInfoActions =
  | UpdateMyOrganisationInfoRequest
  | UpdateMyOrganisationInfoSuccess
  | UpdateMyOrganisationInfoFailure;
