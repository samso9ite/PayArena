import { ApplicationInfoState, CreateApplicationState, EditApplicationState } from '../../../actions/apiLibraries/applications/types';
import { actionTypes } from '../../../constants/actionTypes';

let initialState : ApplicationInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};
let initialStatee : CreateApplicationState = {
    isLoading: false,
    error: null,
    resp:null,
};
let editInitialStatee : EditApplicationState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const applicationInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.APPLICATION_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.APPLICATION_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.APPLICATION_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const createApplicationReducer = (state = initialStatee, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CREATE_APPLICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CREATE_APPLICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CREATE_APPLICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const editApplicationReducer = (state = editInitialStatee, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.EDIT_APPLICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.EDIT_APPLICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.EDIT_APPLICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const getAppTeamMembersInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.GET_APPLICATION_TEAM_MEMBERS_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};