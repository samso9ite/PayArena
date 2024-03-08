import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import {IMpesaTopUpWallet, IAddCard, ICardInfo, IFlutterwaveTopUpWallet, IPaystackTopUpWallet, IRemoveCard, ISetDefaultCard, ISetThreshold, ITopUpWallet, IVirtualAccountInfo, IWalletHistory, IWalletToWalletTransfer } from "../../actions/wallet/types";
import { addCardFailure, addCardSuccess, cardInfoFailure, cardInfoSuccess, mpesaTopUpWalletFailure, mpesaTopUpWalletSuccess, removeCardFailure, removeCardSuccess, setDefaultCardFailure, setDefaultCardSuccess, setThresholdFailure, setThresholdSuccess, topUpWalletFailure, topUpWalletSuccess, virtualAccountInfoFailure, virtualAccountInfoSuccess, walletHistoryFailure, walletHistorySuccess, walletToWalletTransferFailure, walletToWalletTransferSuccess } from "../../actions/wallet";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""
let tenantId = Cookies.get("tenant") || ""

const walletHistory = async (payload: any) => {
  
  const { data } = await axios.get<IWalletHistory[]>(
    global.apiBaseUrl + global.idpassApiUrl + "wallet/fund-wallet",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};
const cardInfo = async (payload: any) => {
  const { data } = await axios.get<ICardInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/wallet/payment/cards",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};
const mpesaTopUpWallet = async (payload: any) => {
  console.log("This ran");
  
  const { data } = await axios.post<IMpesaTopUpWallet[]>(
    global.apiBaseUrl +  "wallet/fund-wallet",
    payload,
    {
      headers: {
        "Content-Type": "application/json", 
        // "X-Product": "PELEZA",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};

const addCard = async (payload: any) => {
  const { data } = await axios.post<IAddCard[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/wallet/payment/addcard",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};
const setDefaultCard = async (payload: any) => {
  const { data } = await axios.post<ISetDefaultCard[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/wallet/payment/card/set-default/${payload.card_id}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};
const removeCard = async (payload: any) => {
  const { data } = await axios.delete<IRemoveCard[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/wallet/payment/card/remove/${payload.card_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};
const setThreshold = async (payload: any) => {
  const { data } = await axios.post<ISetThreshold[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/wallet/threshold/configure",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};
const virtualAccountInfo = async (payload: any) => {
  const { data } = await axios.get<IVirtualAccountInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/virtual-account/get",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};
const topUpWallet = async (payload: any) => {
  const { data } = await axios.post<ITopUpWallet[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/wallet/stripe/initiatlize",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};
// const paystackTopUpWallet = async (payload: any) => {
//   const { data } = await axios.post<IPaystackTopUpWallet[]>(
//     // global.apiBaseUrl + "internal-wallet/wallet/paystack/pay",
//     "https://ifgn6xvqlj.execute-api.us-east-2.amazonaws.com/production/prembly-wallet-production/wallet/paystack/pay",
//     payload,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: accessT,
//         Organisation: orgId,
//       },
//     }
//   );
//   return data;
// };
// const flutterwaveTopUpWallet = async (payload: any) => {
//   const { data } = await axios.post<IFlutterwaveTopUpWallet[]>(
//     // global.apiBaseUrl + "internal-wallet/wallet/flutterwave/pay'",
//     "https://ifgn6xvqlj.execute-api.us-east-2.amazonaws.com/production/prembly-wallet-production/wallet/flutterwave/pay",
//     payload,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: accessT,
//         Organisation: orgId,
//       },
//     }
//   );
//   return data;
// };
const walletToWalletTransfer = async (payload: any) => {
  const { data } = await axios.post<IWalletToWalletTransfer[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/billing/transfer",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};


function* walletHistorySaga(action: any) {
  try {
    const response: { data: any } = yield call(walletHistory, {});
    
    yield put(
      walletHistorySuccess({
        resp: response,
      })
    );
    
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        walletHistoryFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        walletHistoryFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* cardInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(cardInfo, {});

    yield put(
      cardInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        cardInfoFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        cardInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* addCardSaga(action: any) {
  try {
    const response: { data: any } = yield call(addCard, {
      card_number: action.payload.values.card_number,
      exp_month: action.payload.values.exp_month,
      exp_year: action.payload.values.exp_year,
      cvc: action.payload.values.cvc,
      default: action.payload.values.default
    });
    yield put(
      addCardSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        addCardFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        addCardFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* setDefaultCardSaga(action: any) {
  try {
    const response: { data: any } = yield call(setDefaultCard, {
      card_id: action.payload.values.card_id,
    });
    yield put(
      setDefaultCardSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        setDefaultCardFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        setDefaultCardFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* removeCardSaga(action: any) {
  try {
    const response: { data: any } = yield call(removeCard, {
      card_id: action.payload.values.card_id,
    });
    yield put(
      removeCardSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        removeCardFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        removeCardFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* setThresholdSaga(action: any) {
  try {
    const response: { data: any } = yield call(setThreshold, {
      status: action.payload.values.status,
      funding_amount: action.payload.values.funding_amount,
      threshold: action.payload.values.threshold,
      auto_funding_date: action.payload.values.auto_funding_date,
    });
    yield put(
      setThresholdSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        setThresholdFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        setThresholdFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* virtualAccountInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(virtualAccountInfo, {});

    yield put(
      virtualAccountInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        virtualAccountInfoFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        virtualAccountInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* topUpWalletSaga(action: any) {
  try {
    const response: { data: any } = yield call(topUpWallet, {
      amount: action.payload.values.amount,
      email: action.payload.values.email,
      currency: action.payload.values.currency,
      success_url: action.payload.values.success_url,
      cancel_url: action.payload.values.cancel_url
    });

    yield put(
      topUpWalletSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        topUpWalletFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        topUpWalletFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
// function* paystackTopUpWalletSaga(action: any) {
//   try {
//     const response: { data: any } = yield call(paystackTopUpWallet, {
//       amount: action.payload.values.amount,
//       currency: action.payload.values.currency,
//       callback_url: action.payload.values.callback_url
//     });

//     yield put(
//       paystackTopUpWalletSuccess({
//         resp: response,
//       })
//     );
//     action.payload.callback(response);
//   } catch (e: any) {
//     if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
//       yield put(
//         paystackTopUpWalletFailure({
//           error: "An error occurred, hang on a minute as we work towards fixing this error.",
//         })
//       );
//       action.payload.callback(
//         { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
//       );
//       return
//     }
//     if (e.response.request.status === 401) {
//       authorizationRedirect()
//     } else {
//       yield put(
//         paystackTopUpWalletFailure({
//           error: e.response.data.detail,
//         })
//       );
//       action.payload.callback(e.response.data);
//     }
//   }
// }
// function* flutterwaveTopUpWalletSaga(action: any) {
//   try {
//     const response: { data: any } = yield call(flutterwaveTopUpWallet, {
//       amount: action.payload.values.amount,
//       callback_url:action.payload.values.callback_url,
//     });

//     yield put(
//       flutterwaveTopUpWalletSuccess({
//         resp: response,
//       })
//     );
//     action.payload.callback(response);
//   } catch (e: any) {
//     if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
//       yield put(
//         flutterwaveTopUpWalletFailure({
//           error: "An error occurred, hang on a minute as we work towards fixing this error.",
//         })
//       );
//       action.payload.callback(
//         { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
//       );
//       return
//     }
//     if (e.response.request.status === 401) {
//       authorizationRedirect()
//     } else {
//       yield put(
//         flutterwaveTopUpWalletFailure({
//           error: e.response.data.detail,
//         })
//       );
//       action.payload.callback(e.response.data);
//     }
//   }
// }

function* mpesaTopUpWalletSaga(action: any) {
  console.log("This is here now");
  
  try {
    const response: { data: any } = yield call(mpesaTopUpWallet, {
      amount: action.payload.values.amount,
      currency: action.payload.values.currency,
      redirect_url: action.payload.values.redirect_url,
      payment_gateway: action.payload.values.payment_gateway,
      mpesa_billing_number: action.payload.values.mpesa_billing_number,
      phone_number: action.payload.values.phone_number,
      pay_with: action.payload.values.pay_with,
      organisation_id:orgId
    });

    yield put(
      mpesaTopUpWalletSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        mpesaTopUpWalletFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        mpesaTopUpWalletFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


function* walletToWalletTransferSaga(action: any) {
  try {
    const response: { data: any } = yield call(walletToWalletTransfer, {
      credit_id: action.payload.values.credit_id,
      payment_type: action.payload.values.payment_type,
      amount: action.payload.values.amount,
      email: action.payload.values.email,
      currency: action.payload.values.currency,
      success_url: action.payload.values.success_url,
      cancel_url: action.payload.values.cancel_url
    });

    yield put(
      walletToWalletTransferSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        walletToWalletTransferFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        walletToWalletTransferFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* walletHistorySagaTrigger() {
  yield all([takeLatest(actionTypes.WALLET_HISTORY_REQUEST, walletHistorySaga)]);
}
export function* cardInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.CARD_INFO_REQUEST, cardInfoSaga)]);
}
export function* addCardSagaTrigger() {
  yield all([takeLatest(actionTypes.ADD_CARD_REQUEST, addCardSaga)]);
}
export function* setDefaultCardSagaTrigger() {
  yield all([takeLatest(actionTypes.SET_DEFAULT_CARD_REQUEST, setDefaultCardSaga)]);
}
export function* removeCardSagaTrigger() {
  yield all([takeLatest(actionTypes.REMOVE_CARD_REQUEST, removeCardSaga)]);
}
export function* setThresholdSagaTrigger() {
  yield all([takeLatest(actionTypes.SET_THRESHOLD_REQUEST, setThresholdSaga)]);
}
export function* virtualAccountInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.VIRTUAL_ACCOUNT_INFO_REQUEST, virtualAccountInfoSaga)]);
}
export function* topUpWalletSagaTrigger() {
  yield all([takeLatest(actionTypes.TOP_UP_WALLET_REQUEST, topUpWalletSaga)]);
}
// export function* paystackTopUpWalletSagaTrigger() {
//   yield all([takeLatest(actionTypes.PAYSTACK_TOP_UP_WALLET_REQUEST, paystackTopUpWalletSaga)]);
// }
// export function* flutterwaveTopUpWalletSagaTrigger() {
//   yield all([takeLatest(actionTypes.FLUTTERWAVE_TOP_UP_WALLET_REQUEST, flutterwaveTopUpWalletSaga)]);
// }
export function* walletToWalletTransferSagaTrigger() {
  yield all([takeLatest(actionTypes.WALLET_TO_WALLET_TRANSFER_REQUEST, walletToWalletTransferSaga)]);
}
export function* mpesaTopUpWalletSagaTrigger() {
  yield all([takeLatest(actionTypes.MPESA_TOP_UP_WALLET_REQUEST, mpesaTopUpWalletSaga)]);
}