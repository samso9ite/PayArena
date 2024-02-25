import { TourGuideStatusState } from '../../actions/tourGuide/types';
import { actionTypes } from './../../constants/actionTypes';

let initialState : TourGuideStatusState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const tourGuideReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.TOURGUIDE_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.TOURGUIDE_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.TOURGUIDE_STATUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const tourGuideCompleteReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.TOURGUIDE_COMPLETE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.TOURGUIDE_COMPLETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.TOURGUIDE_COMPLETE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
