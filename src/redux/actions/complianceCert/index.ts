import { actionTypes } from '../../constants/actionTypes'
import { 
    ComplianceDocInfoFailure,
    ComplianceDocInfoFailurePayload,
    ComplianceDocInfoPayload,
    ComplianceDocInfoRequest,
    ComplianceDocInfoSuccess,
    ComplianceDocInfoSuccessPayload,
} from './types';


export const complianceDocInfoRequest = (payload:ComplianceDocInfoPayload):ComplianceDocInfoRequest => ({
    type: actionTypes.COMPLIANCE_DOC_INFO_REQUEST,
    payload,
});

export const complianceDocInfoSuccess = (payload:ComplianceDocInfoSuccessPayload):ComplianceDocInfoSuccess => ({
    type: actionTypes.COMPLIANCE_DOC_INFO_SUCCESS,
    payload,
});

export const complianceDocInfoFailure = (payload:ComplianceDocInfoFailurePayload):ComplianceDocInfoFailure => ({
    type: actionTypes.COMPLIANCE_DOC_INFO_FAILURE,
    payload,
});

