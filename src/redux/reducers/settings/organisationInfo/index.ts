import { OrganisationInfoState, UpdateOrganisationInfoState } from '../../../actions/settings/organisationInfo/types';
import { actionTypes } from './../../../constants/actionTypes';

const initialState : OrganisationInfoState = {
    isLoading: false,
    error: null,
    resp:null,

};
const initialStatee : UpdateOrganisationInfoState = {
    isLoading: false,
    error: null,
    resp:null,

};

export const organisationInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ORGANISATION_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ORGANISATION_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ORGANISATION_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const updateOrganisationInfoReducer = (state = initialStatee, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.UPDATE_ORGANISATION_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_ORGANISATION_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.UPDATE_ORGANISATION_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};