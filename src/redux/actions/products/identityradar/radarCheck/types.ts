import {actionTypes} from "../../../../constants/actionTypes";
  
  export interface IRadarEmailIntelligence {
    resp: any;
  }
  export interface IRadarMobileIntelligence {
    resp: any;
  }
  export interface IRadarIpIntelligence {
    resp: any;
  }
  export interface IRadarNameIntelligence {
    resp: any;
  }
  

  export interface TeamInfoState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface RadarEmailIntelligenceState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface RadarMobileIntelligenceState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface RadarIpIntelligenceState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  export interface RadarNameIntelligenceState {
    isLoading: boolean;
    resp: any;
    error: string | null;
  }
  

  export interface RadarEmailIntelligencePayload {
    values: { 
      phone_number: string
    };
    callback: any;
  }
  export interface RadarMobileIntelligencePayload {
    values: { 
      mobile: any
      check_type: any
    };
    callback: any;
  }
  export interface RadarIpIntelligencePayload {
    values: { 
      ip_address: any
      check_type: any
    };
    callback: any;
  }
  export interface RadarNameIntelligencePayload {
    values: { 
      search_value: string
      dob: string
      gender: string
      check_type: any
    };
    callback: any;
  }
  

  export interface RadarEmailIntelligenceSuccessPayload {
    resp: any;
  }
  export interface RadarMobileIntelligenceSuccessPayload {
    resp: any;
  }
  export interface RadarIpIntelligenceSuccessPayload {
    resp: any;
  }
  export interface RadarNameIntelligenceSuccessPayload {
    resp: any;
  }
  

  export interface RadarEmailIntelligenceFailurePayload {
    error: string;
  }
  export interface RadarMobileIntelligenceFailurePayload {
    error: string;
  }
  export interface RadarIpIntelligenceFailurePayload {
    error: string;
  }
  export interface RadarNameIntelligenceFailurePayload {
    error: string;
  }
  
  
  export interface RadarEmailIntelligenceRequest {
    type: typeof actionTypes.RADAR_EMAIL_INTELLIGENCE_REQUEST;
    payload: RadarEmailIntelligencePayload;
  }
  export interface RadarMobileIntelligenceRequest {
    type: typeof actionTypes.RADAR_MOBILE_INTELLIGENCE_REQUEST;
    payload: RadarMobileIntelligencePayload;
  }
  export interface RadarIpIntelligenceRequest {
    type: typeof actionTypes.RADAR_IP_INTELLIGENCE_REQUEST;
    payload: RadarIpIntelligencePayload;
  }
  export interface RadarNameIntelligenceRequest {
    type: typeof actionTypes.RADAR_NAME_INTELLIGENCE_REQUEST;
    payload: RadarNameIntelligencePayload;
  }
  

  export type RadarEmailIntelligenceSuccess = {
    type: typeof actionTypes.RADAR_EMAIL_INTELLIGENCE_SUCCESS,
    payload: RadarEmailIntelligenceSuccessPayload,
  };
  export type RadarMobileIntelligenceSuccess = {
    type: typeof actionTypes.RADAR_MOBILE_INTELLIGENCE_SUCCESS,
    payload: RadarMobileIntelligenceSuccessPayload,
  };
  export type RadarIpIntelligenceSuccess = {
    type: typeof actionTypes.RADAR_IP_INTELLIGENCE_SUCCESS,
    payload: RadarIpIntelligenceSuccessPayload,
  };
  export type RadarNameIntelligenceSuccess = {
    type: typeof actionTypes.RADAR_NAME_INTELLIGENCE_SUCCESS,
    payload: RadarNameIntelligenceSuccessPayload,
  };
  

  export type RadarEmailIntelligenceFailure = {
    type: typeof actionTypes.RADAR_EMAIL_INTELLIGENCE_FAILURE,
    payload: RadarEmailIntelligenceFailurePayload,
  };
  export type RadarMobileIntelligenceFailure = {
    type: typeof actionTypes.RADAR_MOBILE_INTELLIGENCE_FAILURE,
    payload: RadarMobileIntelligenceFailurePayload,
  };
  export type RadarIpIntelligenceFailure = {
    type: typeof actionTypes.RADAR_IP_INTELLIGENCE_FAILURE,
    payload: RadarIpIntelligenceFailurePayload,
  };
  export type RadarNameIntelligenceFailure = {
    type: typeof actionTypes.RADAR_NAME_INTELLIGENCE_FAILURE,
    payload: RadarNameIntelligenceFailurePayload,
  };
  
  
  export type RadarEmailIntelligenceActions =
  | RadarEmailIntelligenceRequest
  | RadarEmailIntelligenceSuccess
  | RadarEmailIntelligenceFailure;

  export type RadarMobileIntelligenceActions =
  | RadarMobileIntelligenceRequest
  | RadarMobileIntelligenceSuccess
  | RadarMobileIntelligenceFailure;

  export type RadarIpIntelligenceActions =
  | RadarIpIntelligenceRequest
  | RadarIpIntelligenceSuccess
  | RadarIpIntelligenceFailure;

  export type RadarNameIntelligenceActions =
  | RadarNameIntelligenceRequest
  | RadarNameIntelligenceSuccess
  | RadarNameIntelligenceFailure;