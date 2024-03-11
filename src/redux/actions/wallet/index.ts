import { actionTypes } from '../../constants/actionTypes'
import { WalletHistoryPayload, WalletHistoryRequest, WalletHistorySuccess,
    WalletHistorySuccessPayload, WalletHistoryFailure, WalletHistoryFailurePayload, 

    CardInfoPayload, CardInfoRequest, CardInfoSuccessPayload, 
    CardInfoSuccess, CardInfoFailure, CardInfoFailurePayload, 
    
    AddCardPayload, AddCardRequest, AddCardSuccess, 
    AddCardSuccessPayload, AddCardFailurePayload, AddCardFailure, 

    SetDefaultCardPayload, SetDefaultCardRequest, SetDefaultCardSuccessPayload, 
    SetDefaultCardSuccess, SetDefaultCardFailurePayload, SetDefaultCardFailure, 

    RemoveCardPayload, RemoveCardRequest, RemoveCardSuccessPayload, 
    RemoveCardSuccess, RemoveCardFailurePayload, RemoveCardFailure, 
    
    SetThresholdPayload, SetThresholdRequest, SetThresholdSuccessPayload, 
    SetThresholdSuccess, SetThresholdFailurePayload, SetThresholdFailure, 
    
    VirtualAccountInfoPayload, VirtualAccountInfoRequest, VirtualAccountInfoSuccessPayload,
    VirtualAccountInfoSuccess, VirtualAccountInfoFailurePayload, VirtualAccountInfoFailure,

    TopUpWalletPayload, TopUpWalletRequest, TopUpWalletSuccessPayload,
    TopUpWalletSuccess, TopUpWalletFailurePayload, TopUpWalletFailure,

    // PaystackTopUpWalletPayload, PaystackTopUpWalletRequest, PaystackTopUpWalletSuccessPayload, 
    // PaystackTopUpWalletSuccess, PaystackTopUpWalletFailurePayload, PaystackTopUpWalletFailure,
    
    // FlutterwaveTopUpWalletPayload, FlutterwaveTopUpWalletRequest, FlutterwaveTopUpWalletSuccessPayload, 
    // FlutterwaveTopUpWalletSuccess, FlutterwaveTopUpWalletFailurePayload, FlutterwaveTopUpWalletFailure, 

    WalletToWalletTransferPayload, WalletToWalletTransferRequest, WalletToWalletTransferSuccessPayload,
    WalletToWalletTransferSuccess, WalletToWalletTransferFailurePayload, WalletToWalletTransferFailure, 

    MpesaTopUpWalletPayload, MpesaWalletTopUpSuccess, MpesaWalletRequest, 
    MpesaTopUpWalletSuccessPayload, MpesaTopUpWalletFailurePayload, MpesaTopUpWalletFailure,

    walletBalancePayload, WalletBalanceSuccess, WalletBalanceRequest, 
    WalletBalanceSuccessPayload, WalletBalanceFailurePayload, WalletBalanceFailure,
} from "./types";

export const mpesaTopUpWalletRequest = (payload:MpesaTopUpWalletPayload):MpesaWalletRequest => ({
    type: actionTypes.MPESA_TOP_UP_WALLET_REQUEST,
    payload,
});
export const mpesaTopUpWalletSuccess = (payload:MpesaTopUpWalletSuccessPayload):MpesaWalletTopUpSuccess => ({
    type: actionTypes.MPESA_TOP_UP_WALLET_SUCCESS,
    payload,
});
export const mpesaTopUpWalletFailure = (payload:MpesaTopUpWalletFailurePayload):MpesaTopUpWalletFailure => ({
    type: actionTypes.MPESA_TOP_UP_WALLET_FAILURE,
    payload,
});

export const walletHistoryRequest = (payload:WalletHistoryPayload):WalletHistoryRequest => ({
    type: actionTypes.WALLET_HISTORY_REQUEST,
    payload,
});
export const walletHistorySuccess = (payload:WalletHistorySuccessPayload):WalletHistorySuccess => ({
    type: actionTypes.WALLET_HISTORY_SUCCESS,
    payload,
});
export const walletHistoryFailure = (payload:WalletHistoryFailurePayload):WalletHistoryFailure => ({
    type: actionTypes.WALLET_HISTORY_FAILURE,
    payload,
});


export const cardInfoRequest = (payload:CardInfoPayload):CardInfoRequest => ({
    type: actionTypes.CARD_INFO_REQUEST,
    payload,
});
export const cardInfoSuccess = (payload:CardInfoSuccessPayload):CardInfoSuccess => ({
    type: actionTypes.CARD_INFO_SUCCESS,
    payload,
});
export const cardInfoFailure = (payload:CardInfoFailurePayload):CardInfoFailure => ({
    type: actionTypes.CARD_INFO_FAILURE,
    payload,
});


export const addCardRequest = (payload:AddCardPayload):AddCardRequest => ({
    type: actionTypes.ADD_CARD_REQUEST,
    payload,
});
export const addCardSuccess = (payload:AddCardSuccessPayload):AddCardSuccess => ({
    type: actionTypes.ADD_CARD_SUCCESS,
    payload,
});
export const addCardFailure = (payload:AddCardFailurePayload):AddCardFailure => ({
    type: actionTypes.ADD_CARD_FAILURE,
    payload,
});


export const setDefaultCardRequest = (payload:SetDefaultCardPayload):SetDefaultCardRequest => ({
    type: actionTypes.SET_DEFAULT_CARD_REQUEST,
    payload,
});
export const setDefaultCardSuccess = (payload:SetDefaultCardSuccessPayload):SetDefaultCardSuccess => ({
    type: actionTypes.SET_DEFAULT_CARD_SUCCESS,
    payload,
});
export const setDefaultCardFailure = (payload:SetDefaultCardFailurePayload):SetDefaultCardFailure => ({
    type: actionTypes.SET_DEFAULT_CARD_FAILURE,
    payload,
});


export const removeCardRequest = (payload:RemoveCardPayload):RemoveCardRequest => ({
    type: actionTypes.REMOVE_CARD_REQUEST,
    payload,
});
export const removeCardSuccess = (payload:RemoveCardSuccessPayload):RemoveCardSuccess => ({
    type: actionTypes.REMOVE_CARD_SUCCESS,
    payload,
});
export const removeCardFailure = (payload:RemoveCardFailurePayload):RemoveCardFailure => ({
    type: actionTypes.REMOVE_CARD_FAILURE,
    payload,
});


export const setThresholdRequest = (payload:SetThresholdPayload):SetThresholdRequest => ({
    type: actionTypes.SET_THRESHOLD_REQUEST,
    payload,
});
export const setThresholdSuccess = (payload:SetThresholdSuccessPayload):SetThresholdSuccess => ({
    type: actionTypes.SET_THRESHOLD_SUCCESS,
    payload,
});
export const setThresholdFailure = (payload:SetThresholdFailurePayload):SetThresholdFailure => ({
    type: actionTypes.SET_THRESHOLD_FAILURE,
    payload,
});


export const virtualAccountInfoRequest = (payload:VirtualAccountInfoPayload):VirtualAccountInfoRequest => ({
    type: actionTypes.VIRTUAL_ACCOUNT_INFO_REQUEST,
    payload,
});
export const virtualAccountInfoSuccess = (payload:VirtualAccountInfoSuccessPayload):VirtualAccountInfoSuccess => ({
    type: actionTypes.VIRTUAL_ACCOUNT_INFO_SUCCESS,
    payload,
});
export const virtualAccountInfoFailure = (payload:VirtualAccountInfoFailurePayload):VirtualAccountInfoFailure => ({
    type: actionTypes.VIRTUAL_ACCOUNT_INFO_FAILURE,
    payload,
});


export const topUpWalletRequest = (payload:TopUpWalletPayload):TopUpWalletRequest => ({
    type: actionTypes.TOP_UP_WALLET_REQUEST,
    payload,
});
export const topUpWalletSuccess = (payload:TopUpWalletSuccessPayload):TopUpWalletSuccess => ({
    type: actionTypes.TOP_UP_WALLET_SUCCESS,
    payload,
});
export const topUpWalletFailure = (payload:TopUpWalletFailurePayload):TopUpWalletFailure => ({
    type: actionTypes.TOP_UP_WALLET_FAILURE,
    payload,
});


export const walletToWalletTransferRequest = (payload:WalletToWalletTransferPayload):WalletToWalletTransferRequest => ({
    type: actionTypes.WALLET_TO_WALLET_TRANSFER_REQUEST,
    payload,
});
export const walletToWalletTransferSuccess = (payload:WalletToWalletTransferSuccessPayload):WalletToWalletTransferSuccess => ({
    type: actionTypes.WALLET_TO_WALLET_TRANSFER_SUCCESS,
    payload,
});
export const walletToWalletTransferFailure = (payload:WalletToWalletTransferFailurePayload):WalletToWalletTransferFailure => ({
    type: actionTypes.WALLET_TO_WALLET_TRANSFER_FAILURE,
    payload,
});


export const walletBalanceRequest = (payload:walletBalancePayload):WalletBalanceRequest => ({
    type: actionTypes.WALLET_BALANCE_REQUEST,
    payload,
});
export const walletBalanceSuccess = (payload:WalletBalanceSuccessPayload):WalletBalanceSuccess => ({
    type: actionTypes.WALLET_BALANCE_SUCCESS,
    payload,
});
export const walletBalanceFailure = (payload:WalletBalanceFailurePayload):WalletBalanceFailure => ({
    type: actionTypes.WALLET_BALANCE_FAILURE,
    payload,
});

