
import { CreateMyOrganisationInfoState, MyOrganisationInfoState, UpdateMyOrganisationInfoState } from '../../actions/myOganisation/types';
import { actionTypes } from './../../constants/actionTypes';

const initialState : MyOrganisationInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};
const createInitialState : CreateMyOrganisationInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};

const updateInitialState : UpdateMyOrganisationInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const myOrganisationInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.MY_ORGANISATION_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.MY_ORGANISATION_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.MY_ORGANISATION_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const createMyOrganisationInfoReducer = (state = createInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CREATE_MY_ORGANISATION_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CREATE_MY_ORGANISATION_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CREATE_MY_ORGANISATION_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const updateMyOrganisationInfoReducer = (state = updateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.UPDATE_MY_ORGANISATION_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_MY_ORGANISATION_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.UPDATE_MY_ORGANISATION_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

