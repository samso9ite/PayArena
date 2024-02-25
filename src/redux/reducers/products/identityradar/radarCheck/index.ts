import { 
    RadarEmailIntelligenceState,
    RadarIpIntelligenceState,
    RadarMobileIntelligenceState,
    RadarNameIntelligenceState,
} from '../../../../actions/products/identityradar/radarCheck/types';
import { actionTypes } from './../../../../constants/actionTypes';


const initialState : RadarEmailIntelligenceState = {
    isLoading: false,
    error: null,
    resp:null,
};
const mobileInitialState : RadarMobileIntelligenceState = {
    isLoading: false,
    error: null,
    resp:null,
};
const ipInitialState : RadarIpIntelligenceState = {
    isLoading: false,
    error: null,
    resp:null,
};
const nameInitialState : RadarNameIntelligenceState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const radarEmailIntelligenceReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.RADAR_EMAIL_INTELLIGENCE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.RADAR_EMAIL_INTELLIGENCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.RADAR_EMAIL_INTELLIGENCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const radarMobileIntelligenceReducer = (state = mobileInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.RADAR_MOBILE_INTELLIGENCE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.RADAR_MOBILE_INTELLIGENCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.RADAR_MOBILE_INTELLIGENCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const radarIpIntelligenceReducer = (state = ipInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.RADAR_IP_INTELLIGENCE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.RADAR_IP_INTELLIGENCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.RADAR_IP_INTELLIGENCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const radarNameIntelligenceReducer = (state = nameInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.RADAR_NAME_INTELLIGENCE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.RADAR_NAME_INTELLIGENCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.RADAR_NAME_INTELLIGENCE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
