import { AddCardState, CardInfoState, FlutterwaveTopUpWalletState, PaystackTopUpWalletState, MpesaTopUpWalletState,
    RemoveCardState, SetDefaultCardState, SetThresholdState, TopUpWalletState, VirtualAccountInfoState, 
    WalletHistoryState, WalletToWalletTransferState } from '../../actions/wallet/types';
import { actionTypes } from './../../constants/actionTypes';

const initialState : WalletHistoryState = {
    isLoading: false,
    error: null,
    resp:null,
};
const cardInfoInitialState : CardInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};

const addCardInitialState : AddCardState = {
    isLoading: false,
    error: null,
    resp:null,
};

const setDefaultCardInitialState : SetDefaultCardState = {
    isLoading: false,
    error: null,
    resp:null,
};

const removeCardInitialState : RemoveCardState = {
    isLoading: false,
    error: null,
    resp:null,
};

const setThresholdInitialState : SetThresholdState = {
    isLoading: false,
    error: null,
    resp:null,
};

const virtualInitialState : VirtualAccountInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};

const topUpInitialState : TopUpWalletState = {
    isLoading: false,
    error: null,
    resp:null,
};

const paystackTopUpInitialState : PaystackTopUpWalletState = {
    isLoading: false,
    error: null,
    resp:null,
};

// const flutterwaveTopUpInitialState : FlutterwaveTopUpWalletState = {
//     isLoading: false,
//     error: null,
//     resp:null,
// };

const walletToWalletInitialState : WalletToWalletTransferState = {
    isLoading: false,
    error: null,
    resp:null,
};

const mpesaInitialState : MpesaTopUpWalletState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const mpesaTopUpWalletReducer = (state = mpesaInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.MPESA_TOP_UP_WALLET_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.MPESA_TOP_UP_WALLET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.MPESA_TOP_UP_WALLET_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const walletHistoryReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.WALLET_HISTORY_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.WALLET_HISTORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.WALLET_HISTORY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const cardInfoReducer = (state = cardInfoInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CARD_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CARD_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CARD_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const addCardReducer = (state = addCardInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ADD_CARD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ADD_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ADD_CARD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const setDefaultCardReducer = (state = setDefaultCardInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.SET_DEFAULT_CARD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SET_DEFAULT_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.SET_DEFAULT_CARD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const removeCardReducer = (state = removeCardInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.REMOVE_CARD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.REMOVE_CARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.REMOVE_CARD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const setThresholdReducer = (state = setThresholdInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.SET_THRESHOLD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.SET_THRESHOLD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.SET_THRESHOLD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const virtualAccountInfoReducer = (state = virtualInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.VIRTUAL_ACCOUNT_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.VIRTUAL_ACCOUNT_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.VIRTUAL_ACCOUNT_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const topUpWalletReducer = (state = topUpInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.TOP_UP_WALLET_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.TOP_UP_WALLET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.TOP_UP_WALLET_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

// export const paystackTopUpWalletReducer = (state = paystackTopUpInitialState, action: { type: any; payload: any; }) => {
//     switch (action.type) {
//         case actionTypes.PAYSTACK_TOP_UP_WALLET_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         case actionTypes.PAYSTACK_TOP_UP_WALLET_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 resp:action.payload.resp
//             };
//         case actionTypes.PAYSTACK_TOP_UP_WALLET_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: action.payload.error
//             };
//         default:
//             return state;
//     }
// };

// export const flutterwaveTopUpWalletReducer = (state = flutterwaveTopUpInitialState, action: { type: any; payload: any; }) => {
//     switch (action.type) {
//         case actionTypes.FLUTTERWAVE_TOP_UP_WALLET_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         case actionTypes.FLUTTERWAVE_TOP_UP_WALLET_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 resp:action.payload.resp
//             };
//         case actionTypes.FLUTTERWAVE_TOP_UP_WALLET_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: action.payload.error
//             };
//         default:
//             return state;
//     }
// };

export const walletToWalletTransferReducer = (state = walletToWalletInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.WALLET_TO_WALLET_TRANSFER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.WALLET_TO_WALLET_TRANSFER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.WALLET_TO_WALLET_TRANSFER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
