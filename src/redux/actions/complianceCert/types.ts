import { actionTypes } from "../../constants/actionTypes";

export interface IComplianceDocInfo {
  resp: any;
}

export interface ComplianceDocInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface ComplianceDocInfoPayload {
  callback: any;
}

export interface ComplianceDocInfoSuccessPayload {
  resp: any;
}

export interface ComplianceDocInfoFailurePayload {
  error: string;
}


export interface ComplianceDocInfoRequest {
  type: typeof actionTypes.COMPLIANCE_DOC_INFO_REQUEST;
  payload: ComplianceDocInfoPayload;
}

export type ComplianceDocInfoSuccess = {
  type: typeof actionTypes.COMPLIANCE_DOC_INFO_SUCCESS,
  payload: ComplianceDocInfoSuccessPayload,
};

export type ComplianceDocInfoFailure = {
  type: typeof actionTypes.COMPLIANCE_DOC_INFO_FAILURE,
  payload: ComplianceDocInfoFailurePayload,
};

export type ComplianceDocInfoActions =
  | ComplianceDocInfoRequest
  | ComplianceDocInfoSuccess
  | ComplianceDocInfoFailure;