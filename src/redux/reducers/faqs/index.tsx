import { FaqsState } from '../../actions/faqs/types';
import { actionTypes } from './../../constants/actionTypes';

let initialState : FaqsState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const faqReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.FAQ_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FAQ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.FAQ_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};



