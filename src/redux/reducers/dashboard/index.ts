import { AcceptIndemnityFormState, AnnouncementState, DashboardInfoState, ViewAnnouncementState } from '../../actions/dashboard/types';
import { actionTypes } from './../../constants/actionTypes';

let initialState : DashboardInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};
let announcementInitialState : AnnouncementState = {
    isLoading: false,
    error: null,
    resp:null,
};
let viewInitialState : ViewAnnouncementState = {
    isLoading: false,
    error: null,
    resp:null,
};
let indemnityInitialState : AcceptIndemnityFormState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const dashboardInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.DASHBOARD_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.DASHBOARD_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.DASHBOARD_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const announcementReducer = (state = announcementInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ANNOUNCEMENT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const viewAnnouncementReducer = (state = viewInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.VIEW_ANNOUNCEMENT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.VIEW_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.VIEW_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const acceptIndemnityFormReducer = (state = indemnityInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ACCEPT_INDEMNITY_FORM_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ACCEPT_INDEMNITY_FORM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ACCEPT_INDEMNITY_FORM_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
