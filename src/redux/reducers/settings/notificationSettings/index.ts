
import { AddContactInfoState, ContactInfoState, PreferenceInfoState, RemoveContactInfoState, UpdatePreferenceInfoState } from '../../../actions/settings/notificationSettings/types';
import { actionTypes } from '../../../constants/actionTypes';

const initialState : PreferenceInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};
const updateInitialState : UpdatePreferenceInfoState = {
    isLoading: false,
    error: null,
    resp:null,

};
const contactInitialState : ContactInfoState = {
    isLoading: false,
    error: null,
    resp:null,

};
const addInitialState : AddContactInfoState = {
    isLoading: false,
    error: null,
    resp:null,

};
const removeInitialState : RemoveContactInfoState = {
    isLoading: false,
    error: null,
    resp:null,

};

export const preferenceInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.PREFERENCE_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.PREFERENCE_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.PREFERENCE_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const updatePreferenceInfoReducer = (state = updateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.UPDATE_PREFERENCE_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_PREFERENCE_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.UPDATE_PREFERENCE_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const contactInfoReducer = (state = contactInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CONTACT_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CONTACT_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CONTACT_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const addContactInfoReducer = (state = addInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ADD_CONTACT_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ADD_CONTACT_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ADD_CONTACT_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const removeContactInfoReducer = (state = removeInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REMOVE_CONTACT_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REMOVE_CONTACT_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REMOVE_CONTACT_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};