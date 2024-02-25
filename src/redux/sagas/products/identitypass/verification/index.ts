import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../../constants/actionTypes"
import global from "../../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../../constants/api";
import { IIdentitypassBulkHistory, IIdentitypassBulkVerification, IIdentitypassEndpoints, IIdentitypassVerification } from "../../../../actions/products/identitypass/verification/types";
import { identitypassBulkHistoryFailure, identitypassBulkHistorySuccess, identitypassBulkVerificationFailure, identitypassBulkVerificationSuccess, identitypassEndpointsFailure, identitypassEndpointsSuccess, identitypassVerificationFailure, identitypassVerificationSuccess } from "../../../../actions/products/identitypass/verification";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""
// axios.defaults.timeout = 10000000

const identitypassVerification = async (payload: any) => {
  const { data } = await axios.post<IIdentitypassVerification[]>(
    global.apiBaseUrl + global.idpassApiUrl + "verification/portal/verify",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
      },
    }
  );
  return data;
};
const identitypassEndpoints = async (payload: any) => {
  const { data } = await axios.get<IIdentitypassEndpoints[]>(
    global.apiBaseUrl + global.idpassApiUrl + "internal/core/endpoints/get",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
      },
    }
  );
  return data;
};
const identitypassBulkVerification = async (payload: any) => {
  const { data } = await axios.post<IIdentitypassBulkVerification[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/bulk/verification",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
        // Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
      },
    }
  );
  return data;
};
const identitypassBulkHistory = async (payload: any) => {
  const { data } = await axios.get<IIdentitypassBulkHistory[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/bulk/uploads/organisation",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
      },
    }
  );
  return data;
};

                                                                                                                                  
function* identitypassVerificationSaga(action: any) {
  try {
    const response: { data: any } = yield call(identitypassVerification, {
      mode: action.payload.values.mode,
      data: action.payload.values.data,
      file: action.payload.values.file,
      pin: action.payload.values.pin,
      email: action.payload.values.email,
      endpoint: action.payload.values.endpoint
    });
    yield put(
      identitypassVerificationSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        identitypassVerificationFailure({
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
        identitypassVerificationFailure({
          error: (typeof e.response.data.detail == "string") ? e.response.data.detail : e.response.data.detail.message,
        })
      );
      action.payload.callback(e?.response?.data);
    }
  }
}
function* identitypassEndpointsSaga(action: any) {
  try {
    const response: { data: any } = yield call(identitypassEndpoints, { });
    yield put(
      identitypassEndpointsSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        identitypassEndpointsFailure({
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
        identitypassEndpointsFailure({
          error: e?.response?.data?.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
                                                                                                                                  
function* identitypassBulkVerificationSaga(action: any) {

  let bulkData = new FormData()

  bulkData.append('product', action.payload.values.product);
  bulkData.append('type', action.payload.values.type);
  bulkData.append('file', action.payload.values.file);
  bulkData.append('app_id', action.payload.values.app_id);
      
  try {
    const response: { data: any } = yield call(identitypassBulkVerification, bulkData);
    yield put(
      identitypassBulkVerificationSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        identitypassBulkVerificationFailure({
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
        identitypassBulkVerificationFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
                                                                                                                              
function* identitypassBulkHistorySaga(action: any) {
      
  try {
    const response: { data: any } = yield call(identitypassBulkHistory, {});
    yield put(
      identitypassBulkHistorySuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        identitypassBulkHistoryFailure({
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
        identitypassBulkHistoryFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* identitypassVerificationSagaTrigger() {
  yield all([takeLatest(actionTypes.IDENTITYPASS_VERIFICATION_REQUEST, identitypassVerificationSaga)]);
}
export function* identitypassEndpointsSagaTrigger() {
  yield all([takeLatest(actionTypes.IDENTITYPASS_ENDPOINTS_REQUEST, identitypassEndpointsSaga)]);
}
export function* identitypassBulkVerificationSagaTrigger() {
  yield all([takeLatest(actionTypes.IDENTITYPASS_BULK_VERIFICATION_REQUEST, identitypassBulkVerificationSaga)]);
}
export function* identitypassBulkHistorySagaTrigger() {
  yield all([takeLatest(actionTypes.IDENTITYPASS_BULK_HISTORY_REQUEST, identitypassBulkHistorySaga)]);
}