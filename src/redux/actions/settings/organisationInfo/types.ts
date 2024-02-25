import {actionTypes} from "../../../constants/actionTypes";
  
  export interface IOrganisationInfo {
    resp: any;
  }
  export interface IUpdateOrganisationInfo {
    resp: any;
  }
  
  export interface OrganisationInfoState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface UpdateOrganisationInfoState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  
  export interface OrganisationInfoPayload {
    callback: any;
  }
  export interface UpdateOrganisationInfoPayload {
    values: { 
      name: string, 
      // country: string,
      // official_email:string,
      address: string, state: string, official_phone:string, business_number:string, website:string, 
      tin:string, business_document:string, director_name:string, director_email:string, 
      director_address:string, director_id_card:string
    };
    callback: any;
  }
  
  export interface OrganisationInfoSuccessPayload {
    resp: any;
  }
  export interface UpdateOrganisationInfoSuccessPayload {
    resp: any;
  }
  
  export interface OrganisationInfoFailurePayload {
    error: string;
  }
  export interface UpdateOrganisationInfoFailurePayload {
    error: string;
  }
  
  
  export interface OrganisationInfoRequest {
    type: typeof actionTypes.ORGANISATION_INFO_REQUEST;
    payload: OrganisationInfoPayload;
  }
  export interface UpdateOrganisationInfoRequest {
    type: typeof actionTypes.UPDATE_ORGANISATION_INFO_REQUEST;
    payload: UpdateOrganisationInfoPayload;
  }
  
  export type OrganisationInfoSuccess = {
    type: typeof actionTypes.ORGANISATION_INFO_SUCCESS,
    payload: OrganisationInfoSuccessPayload,
  };
  export type UpdateOrganisationInfoSuccess = {
    type: typeof actionTypes.UPDATE_ORGANISATION_INFO_SUCCESS,
    payload: UpdateOrganisationInfoSuccessPayload,
  };
  
  export type OrganisationInfoFailure = {
    type: typeof actionTypes.ORGANISATION_INFO_FAILURE,
    payload: OrganisationInfoFailurePayload,
  };
  export type UpdateOrganisationInfoFailure = {
    type: typeof actionTypes.UPDATE_ORGANISATION_INFO_FAILURE,
    payload: UpdateOrganisationInfoFailurePayload,
  };
  
  
  export type OrganisationInfoActions =
    | OrganisationInfoRequest
    | OrganisationInfoSuccess
    | OrganisationInfoFailure;

  export type UpdateOrganisationInfoActions =
  | UpdateOrganisationInfoRequest
  | UpdateOrganisationInfoSuccess
  | UpdateOrganisationInfoFailure;