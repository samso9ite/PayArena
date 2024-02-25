import { UpdateWebhookUrlState } from '../../actions/sdkLibraries/types';
import { actionTypes } from './../../constants/actionTypes';

const initialState : UpdateWebhookUrlState = {
    isLoading: false,
    error: null,
    resp:null,

};

export const updateWebhookUrlReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.UPDATE_WEBHOOK_URL_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_WEBHOOK_URL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.UPDATE_WEBHOOK_URL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};