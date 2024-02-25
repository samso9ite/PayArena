import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { ICurrentSub, ISubLogs, ISubPlans, ISubPlansByTenure, ISubPricing, ISubscription } from "../../actions/subscription/types";
import { currentSubFailure, currentSubSuccess, subLogsFailure, subLogsSuccess, subPlansByTenureFailure, subPlansByTenureSuccess, subPlansFailure, subPlansSuccess, subPricingFailure, subPricingSuccess, subscriptionFailure, subscriptionSuccess } from "../../actions/subscription";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const subPlans = async (payload: any) => {
  const { data } = await axios.get<ISubPlans[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/billing/product/plans`,
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
const subPlansByTenure = async (payload: any) => {
  const { data } = await axios.get<ISubPlansByTenure[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/billing/product/plans/${payload.ref}/${payload.tenure}`,
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
const subscription = async (payload: any) => {
  const { data } = await axios.get<ISubscription[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/account/subscription/subscribe/${payload.ref}`,
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
const subLogs = async (payload: any) => {
  const { data } = await axios.get<ISubLogs[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/account/subscription/logs`,
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
const currentSub = async (payload: any) => {
  const { data } = await axios.get<ICurrentSub[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/account/subscription/me`,
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
const subPricing = async (payload: any) => {
  const { data } = await axios.get<ISubPricing[]>(
    global.apiBaseUrl + global.backgroundCheckApiUrl + `background/api/v1/get_price_for_all_countries`,
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


function* subPlansSaga(action: any) {
  try {
    const response: { data: any } = yield call(subPlans, { });

    yield put(
      subPlansSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        subPlansFailure({
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
        subPlansFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* subPlansByTenureSaga(action: any) {
  try {
    const response: { data: any } = yield call(subPlansByTenure, { 
      ref: action.payload.values.ref,
      tenure:action.payload.values.tenure
    });

    yield put(
      subPlansByTenureSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        subPlansByTenureFailure({
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
        subPlansByTenureFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* subscriptionSaga(action: any) {
  try {
    const response: { data: any } = yield call(subscription, {
      ref: action.payload.values.ref,
    });

    yield put(
      subscriptionSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        subscriptionFailure({
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
        subscriptionFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* subLogsSaga(action: any) {
  try {
    const response: { data: any } = yield call(subLogs, { });

    yield put(
      subLogsSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        subLogsFailure({
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
        subLogsFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* currentSubSaga(action: any) {
  try {
    const response: { data: any } = yield call(currentSub, { });

    yield put(
      currentSubSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        currentSubFailure({
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
        currentSubFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* subPricingSaga(action: any) {
  try {
    const response: { data: any } = yield call(subPricing, { });

    yield put(
      subPricingSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        subPricingFailure({
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
        subPricingFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* subPlansSagaTrigger() {
  yield all([takeLatest(actionTypes.SUB_PLANS_REQUEST, subPlansSaga)]);
}
export function* subPlansByTenureSagaTrigger() {
  yield all([takeLatest(actionTypes.SUB_PLANS_BY_TENURE_REQUEST, subPlansByTenureSaga)]);
}
export function* subscriptionSagaTrigger() {
  yield all([takeLatest(actionTypes.SUBSCRIPTION_REQUEST, subscriptionSaga)]);
}
export function* subLogsSagaTrigger() {
  yield all([takeLatest(actionTypes.SUB_LOGS_REQUEST, subLogsSaga)]);
}
export function* currentSubSagaTrigger() {
  yield all([takeLatest(actionTypes.CURRENT_SUB_REQUEST, currentSubSaga)]);
}
export function* subPricingSagaTrigger() {
  yield all([takeLatest(actionTypes.SUB_PRICING_REQUEST, subPricingSaga)]);
}