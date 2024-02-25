import { NotificationsInfoState } from '../../actions/notifications/types';
import { actionTypes } from './../../constants/actionTypes';

let initialState : NotificationsInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};

export const notificationsInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.NOTIFICATIONS_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.NOTIFICATIONS_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.NOTIFICATIONS_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const readNotificationReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.READ_NOTIFICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.READ_NOTIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.READ_NOTIFICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
