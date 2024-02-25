import { actionTypes } from '../../../../constants/actionTypes'
import { 
    RadarEmailIntelligencePayload, RadarEmailIntelligenceRequest, RadarEmailIntelligenceSuccessPayload, 
    RadarEmailIntelligenceSuccess, RadarEmailIntelligenceFailurePayload, RadarEmailIntelligenceFailure, 
    RadarMobileIntelligencePayload, RadarMobileIntelligenceRequest, RadarMobileIntelligenceSuccessPayload, 
    RadarMobileIntelligenceSuccess, RadarMobileIntelligenceFailurePayload, RadarMobileIntelligenceFailure, 
    RadarIpIntelligencePayload, RadarIpIntelligenceRequest, RadarIpIntelligenceSuccessPayload, 
    RadarIpIntelligenceSuccess, RadarIpIntelligenceFailurePayload, RadarIpIntelligenceFailure, 
    RadarNameIntelligencePayload, RadarNameIntelligenceRequest, RadarNameIntelligenceSuccessPayload, 
    RadarNameIntelligenceSuccess, RadarNameIntelligenceFailurePayload, RadarNameIntelligenceFailure, 
} from "./types";



export const radarEmailIntelligenceRequest = (payload:RadarEmailIntelligencePayload):RadarEmailIntelligenceRequest => ({
    type: actionTypes.RADAR_EMAIL_INTELLIGENCE_REQUEST,
    payload,
});
export const radarEmailIntelligenceSuccess = (payload:RadarEmailIntelligenceSuccessPayload):RadarEmailIntelligenceSuccess => ({
    type: actionTypes.RADAR_EMAIL_INTELLIGENCE_SUCCESS,
    payload,
});
export const radarEmailIntelligenceFailure = (payload:RadarEmailIntelligenceFailurePayload):RadarEmailIntelligenceFailure => ({
    type: actionTypes.RADAR_EMAIL_INTELLIGENCE_FAILURE,
    payload,
});


export const radarMobileIntelligenceRequest = (payload:RadarMobileIntelligencePayload):RadarMobileIntelligenceRequest => ({
    type: actionTypes.RADAR_MOBILE_INTELLIGENCE_REQUEST,
    payload,
});
export const radarMobileIntelligenceSuccess = (payload:RadarMobileIntelligenceSuccessPayload):RadarMobileIntelligenceSuccess => ({
    type: actionTypes.RADAR_MOBILE_INTELLIGENCE_SUCCESS,
    payload,
});
export const radarMobileIntelligenceFailure = (payload:RadarMobileIntelligenceFailurePayload):RadarMobileIntelligenceFailure => ({
    type: actionTypes.RADAR_MOBILE_INTELLIGENCE_FAILURE,
    payload,
});


export const radarIpIntelligenceRequest = (payload:RadarIpIntelligencePayload):RadarIpIntelligenceRequest => ({
    type: actionTypes.RADAR_IP_INTELLIGENCE_REQUEST,
    payload,
});
export const radarIpIntelligenceSuccess = (payload:RadarIpIntelligenceSuccessPayload):RadarIpIntelligenceSuccess => ({
    type: actionTypes.RADAR_IP_INTELLIGENCE_SUCCESS,
    payload,
});
export const radarIpIntelligenceFailure = (payload:RadarIpIntelligenceFailurePayload):RadarIpIntelligenceFailure => ({
    type: actionTypes.RADAR_IP_INTELLIGENCE_FAILURE,
    payload,
});


export const radarNameIntelligenceRequest = (payload:RadarNameIntelligencePayload):RadarNameIntelligenceRequest => ({
    type: actionTypes.RADAR_NAME_INTELLIGENCE_REQUEST,
    payload,
});
export const radarNameIntelligenceSuccess = (payload:RadarNameIntelligenceSuccessPayload):RadarNameIntelligenceSuccess => ({
    type: actionTypes.RADAR_NAME_INTELLIGENCE_SUCCESS,
    payload,
});
export const radarNameIntelligenceFailure = (payload:RadarNameIntelligenceFailurePayload):RadarNameIntelligenceFailure => ({
    type: actionTypes.RADAR_NAME_INTELLIGENCE_FAILURE,
    payload,
});