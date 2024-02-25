import { actionTypes } from "../../constants/actionTypes";


export interface IWalletHistory {
  resp: any;
}
export interface ICardInfo {
  resp: any;
}
export interface IAddCard {
  resp: any;
}
export interface ISetDefaultCard {
  resp: any;
}
export interface IRemoveCard {
  resp: any;
}
export interface ISetThreshold {
  resp: any;
}
export interface IVirtualAccountInfo {
  resp: any;
}
export interface ITopUpWallet {
  resp: any;
}
export interface IPaystackTopUpWallet {
  resp: any;
}
export interface IFlutterwaveTopUpWallet {
  resp: any;
}
export interface IWalletToWalletTransfer {
  resp: any;
}
export interface IMpesaTopUpWallet {
  resp: any;
}


export interface WalletHistoryState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface CardInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface AddCardState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface SetDefaultCardState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface RemoveCardState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface SetThresholdState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface VirtualAccountInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface TopUpWalletState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface PaystackTopUpWalletState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface FlutterwaveTopUpWalletState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface WalletToWalletTransferState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface MpesaTopUpWalletState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}


export interface WalletHistoryPayload {
  callback: any;
}
export interface CardInfoPayload {
  callback: any;
}
export interface AddCardPayload {
  values: {
    card_number: string,
    exp_month: string,
    exp_year: string,
    cvc: string,
    default: boolean
  };
  callback: any;
}
export interface SetDefaultCardPayload {
  values: { card_id: string, };
  callback: any;
}
export interface RemoveCardPayload {
  values: { card_id: string, };
  callback: any;
}
export interface SetThresholdPayload {
  values: { status: 0, funding_amount: string, threshold: string, auto_funding_date: string };
  callback: any;
}
export interface VirtualAccountInfoPayload {
  callback: any;
}
export interface TopUpWalletPayload {
  values: {
    amount: string,
    email: string,
    currency: string,
    success_url: string,
    cancel_url: string
  };
  callback: any;
}
export interface PaystackTopUpWalletPayload {
  values: {
    amount: string,
    currency: string,
    callback_url:string
  };
  callback: any;
}

export interface MpesaTopUpWalletPayload {
  values: {
    amount: string,
    currency: string,
    payment_gateway: string,
    pay_with: string,
    redirect_url: string, 
    mpesa_billing_number: string,
    phone_number: string}
   ;
  callback: any;
}
export interface FlutterwaveTopUpWalletPayload {
  values: {
    amount: string,
    callback_url:any,
  };
  callback: any;
}
export interface WalletToWalletTransferPayload {
  values: {
    credit_id: string,
    payment_type: string,
    amount: string,
    email: string,
    currency: string,
    success_url: string,
    cancel_url: string
  };
  callback: any;
}


export interface WalletHistorySuccessPayload {
  resp: any;
}
export interface CardInfoSuccessPayload {
  resp: any;
}
export interface AddCardSuccessPayload {
  resp: any;
}
export interface SetDefaultCardSuccessPayload {
  resp: any;
}
export interface RemoveCardSuccessPayload {
  resp: any;
}
export interface SetThresholdSuccessPayload {
  resp: any;
}
export interface VirtualAccountInfoSuccessPayload {
  resp: any;
}
export interface TopUpWalletSuccessPayload {
  resp: any;
}
export interface PaystackTopUpWalletSuccessPayload {
  resp: any;
}
export interface FlutterwaveTopUpWalletSuccessPayload {
  resp: any;
}
export interface WalletToWalletTransferSuccessPayload {
  resp: any;
}

export interface MpesaTopUpWalletSuccessPayload {
  resp: any;
}
export interface WalletHistoryFailurePayload {
  error: string;
}
export interface CardInfoFailurePayload {
  error: string;
}
export interface AddCardFailurePayload {
  error: string;
}
export interface SetDefaultCardFailurePayload {
  error: string;
}
export interface RemoveCardFailurePayload {
  error: string;
}
export interface SetThresholdFailurePayload {
  error: string;
}
export interface VirtualAccountInfoFailurePayload {
  error: string;
}
export interface TopUpWalletFailurePayload {
  error: string;
}
export interface PaystackTopUpWalletFailurePayload {
  error: string;
}
export interface FlutterwaveTopUpWalletFailurePayload {
  error: string;
}
export interface WalletToWalletTransferFailurePayload {
  error: string;
}
export interface MpesaTopUpWalletFailurePayload {
  error: string;
}


export interface WalletHistoryRequest {
  type: typeof actionTypes.WALLET_HISTORY_REQUEST;
  payload: WalletHistoryPayload;
}
export interface CardInfoRequest {
  type: typeof actionTypes.CARD_INFO_REQUEST;
  payload: CardInfoPayload;
}
export interface AddCardRequest {
  type: typeof actionTypes.ADD_CARD_REQUEST;
  payload: AddCardPayload;
}
export interface SetDefaultCardRequest {
  type: typeof actionTypes.SET_DEFAULT_CARD_REQUEST;
  payload: SetDefaultCardPayload;
}
export interface RemoveCardRequest {
  type: typeof actionTypes.REMOVE_CARD_REQUEST;
  payload: RemoveCardPayload;
}
export interface SetThresholdRequest {
  type: typeof actionTypes.SET_THRESHOLD_REQUEST;
  payload: SetThresholdPayload;
}
export interface VirtualAccountInfoRequest {
  type: typeof actionTypes.VIRTUAL_ACCOUNT_INFO_REQUEST;
  payload: VirtualAccountInfoPayload;
}
export interface TopUpWalletRequest {
  type: typeof actionTypes.TOP_UP_WALLET_REQUEST;
  payload: TopUpWalletPayload;
}
export interface PaystackTopUpWalletRequest {
  type: typeof actionTypes.PAYSTACK_TOP_UP_WALLET_REQUEST;
  payload: PaystackTopUpWalletPayload;
}
export interface FlutterwaveTopUpWalletRequest {
  type: typeof actionTypes.FLUTTERWAVE_TOP_UP_WALLET_REQUEST;
  payload: FlutterwaveTopUpWalletPayload;
}
export interface WalletToWalletTransferRequest {
  type: typeof actionTypes.WALLET_TO_WALLET_TRANSFER_REQUEST;
  payload: WalletToWalletTransferPayload;
}
export interface MpesaWalletRequest {
  type: typeof actionTypes.MPESA_TOP_UP_WALLET_REQUEST;
  payload: MpesaTopUpWalletPayload;
}


export type WalletHistorySuccess = {
  type: typeof actionTypes.WALLET_HISTORY_SUCCESS,
  payload: WalletHistorySuccessPayload,
};
export type MpesaWalletTopUpSuccess = {
  type: typeof actionTypes.MPESA_TOP_UP_WALLET_SUCCESS,
  payload: MpesaTopUpWalletSuccessPayload,
};
export type CardInfoSuccess = {
  type: typeof actionTypes.CARD_INFO_SUCCESS,
  payload: CardInfoSuccessPayload,
};
export type AddCardSuccess = {
  type: typeof actionTypes.ADD_CARD_SUCCESS,
  payload: AddCardSuccessPayload,
};
export type SetDefaultCardSuccess = {
  type: typeof actionTypes.SET_DEFAULT_CARD_SUCCESS,
  payload: SetDefaultCardSuccessPayload,
};
export type RemoveCardSuccess = {
  type: typeof actionTypes.REMOVE_CARD_SUCCESS,
  payload: RemoveCardSuccessPayload,
};
export type SetThresholdSuccess = {
  type: typeof actionTypes.SET_THRESHOLD_SUCCESS,
  payload: SetThresholdSuccessPayload,
};
export type VirtualAccountInfoSuccess = {
  type: typeof actionTypes.VIRTUAL_ACCOUNT_INFO_SUCCESS,
  payload: VirtualAccountInfoSuccessPayload,
};
export type TopUpWalletSuccess = {
  type: typeof actionTypes.TOP_UP_WALLET_SUCCESS,
  payload: TopUpWalletSuccessPayload,
};
export type PaystackTopUpWalletSuccess = {
  type: typeof actionTypes.PAYSTACK_TOP_UP_WALLET_SUCCESS,
  payload: PaystackTopUpWalletSuccessPayload,
};
export type FlutterwaveTopUpWalletSuccess = {
  type: typeof actionTypes.FLUTTERWAVE_TOP_UP_WALLET_SUCCESS,
  payload: FlutterwaveTopUpWalletSuccessPayload,
};
export type WalletToWalletTransferSuccess = {
  type: typeof actionTypes.WALLET_TO_WALLET_TRANSFER_SUCCESS,
  payload: WalletToWalletTransferSuccessPayload,
};


export type WalletHistoryFailure = {
  type: typeof actionTypes.WALLET_HISTORY_FAILURE,
  payload: WalletHistoryFailurePayload,
};
export type CardInfoFailure = {
  type: typeof actionTypes.CARD_INFO_FAILURE,
  payload: CardInfoFailurePayload,
};
export type AddCardFailure = {
  type: typeof actionTypes.ADD_CARD_FAILURE,
  payload: AddCardFailurePayload,
};
export type SetDefaultCardFailure = {
  type: typeof actionTypes.SET_DEFAULT_CARD_FAILURE,
  payload: SetDefaultCardFailurePayload,
};
export type RemoveCardFailure = {
  type: typeof actionTypes.REMOVE_CARD_FAILURE,
  payload: RemoveCardFailurePayload,
};
export type SetThresholdFailure = {
  type: typeof actionTypes.SET_THRESHOLD_FAILURE,
  payload: SetThresholdFailurePayload,
};
export type VirtualAccountInfoFailure = {
  type: typeof actionTypes.VIRTUAL_ACCOUNT_INFO_FAILURE,
  payload: VirtualAccountInfoFailurePayload,
};
export type TopUpWalletFailure = {
  type: typeof actionTypes.TOP_UP_WALLET_FAILURE,
  payload: TopUpWalletFailurePayload,
};
export type PaystackTopUpWalletFailure = {
  type: typeof actionTypes.PAYSTACK_TOP_UP_WALLET_FAILURE,
  payload: PaystackTopUpWalletFailurePayload,
};
export type FlutterwaveTopUpWalletFailure = {
  type: typeof actionTypes.FLUTTERWAVE_TOP_UP_WALLET_FAILURE,
  payload: FlutterwaveTopUpWalletFailurePayload,
};
export type WalletToWalletTransferFailure = {
  type: typeof actionTypes.WALLET_TO_WALLET_TRANSFER_FAILURE,
  payload: WalletToWalletTransferFailurePayload,
};
export type MpesaTopUpWalletFailure = {
  type: typeof actionTypes.MPESA_TOP_UP_WALLET_FAILURE,
  payload: MpesaTopUpWalletFailurePayload,
}


export type WalletHistoryActions =
  | WalletHistoryRequest
  | WalletHistorySuccess
  | WalletHistoryFailure;

export type MpesaTopUpWalletSections =
  | MpesaWalletRequest
  | MpesaWalletTopUpSuccess
  | MpesaTopUpWalletFailure;

export type CardInfoActions =
  | CardInfoRequest
  | CardInfoSuccess
  | CardInfoFailure;

export type AddCardActions =
  | AddCardRequest
  | AddCardSuccess
  | AddCardFailure;

export type SetDefaultCardActions =
  | SetDefaultCardRequest
  | SetDefaultCardSuccess
  | SetDefaultCardFailure;

export type RemoveCardActions =
  | RemoveCardRequest
  | RemoveCardSuccess
  | RemoveCardFailure;

export type SetThresholdActions =
  | SetThresholdRequest
  | SetThresholdSuccess
  | SetThresholdFailure;

export type VirtualAccountInfoActions =
  | VirtualAccountInfoRequest
  | VirtualAccountInfoSuccess
  | VirtualAccountInfoFailure;

export type TopUpWalletActions =
  | TopUpWalletRequest
  | TopUpWalletSuccess
  | TopUpWalletFailure;

export type PaystackTopUpWalletActions =
  | PaystackTopUpWalletRequest
  | PaystackTopUpWalletSuccess
  | PaystackTopUpWalletFailure;

export type FlutterwaveTopUpWalletActions =
  | FlutterwaveTopUpWalletRequest
  | FlutterwaveTopUpWalletSuccess
  | FlutterwaveTopUpWalletFailure;

export type WalletToWalletTransferActions =
  | WalletToWalletTransferRequest
  | WalletToWalletTransferSuccess
  | WalletToWalletTransferFailure;
  
