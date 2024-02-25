import { AcceptInviteState } from '../../../actions/auth/acceptInvite/types';
import { actionTypes } from './../../../constants/actionTypes';

const initialState : AcceptInviteState = {
    isLoading: false,
    error: null,
    resp:null,
};

const acceptInviteReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ACCEPT_INVITE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ACCEPT_INVITE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ACCEPT_INVITE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default acceptInviteReducer
