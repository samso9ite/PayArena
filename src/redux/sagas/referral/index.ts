import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { IAllReferees, IReferralCommissionBalance, IReferralCommissionWithdrawal, IReferralFeedback, IReferralGraph, IReferralHistory, IReferralLink, IReferralOverview, IReferralReport } from "../../actions/referral/types";
import { allRefereesFailure, allRefereesSuccess, referralCommissionBalanceFailure, referralCommissionBalanceSuccess, referralCommissionWithdrawalFailure, referralCommissionWithdrawalSuccess, referralFeedbackFailure, referralFeedbackSuccess, referralGraphFailure, referralGraphSuccess, referralHistoryFailure, referralHistorySuccess, referralLinkFailure, referralLinkSuccess, referralOverviewFailure, referralOverviewSuccess, referralReportFailure, referralReportSuccess } from "../../actions/referral";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const referralCommissionBalance = async (payload: any) => {
  const { data } = await axios.get<IReferralCommissionBalance[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/referral/commission/balance",
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
const referralHistory = async (payload: any) => {
  const { data } = await axios.get<IReferralHistory[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/referral/history",
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
const referralOverview = async (payload: any) => {
  const { data } = await axios.get<IReferralOverview[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/referral/overview`,
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
const referralLink = async (payload: any) => {
  const { data } = await axios.get<IReferralLink[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/referral/link`,
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
const allReferees = async (payload: any) => {
  const { data } = await axios.get<IAllReferees[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/referral/myreferees`,
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
const referralReport = async (payload: any) => {
  const { data } = await axios.post<IReferralReport[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/referral/report`,
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
const referralCommissionWithdrawal = async (payload: any) => {
  const { data } = await axios.post<IReferralCommissionWithdrawal[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/referral/commission/withdraw`,
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
const referralGraph = async (payload: any) => {
  const { data } = await axios.get<IReferralGraph[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/referral/dashboard`,
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
const referralFeedback = async (payload: any) => {
  const { data } = await axios.post<IReferralFeedback[]>(
    global.apiBaseUrl + global.liveUrl + `/api/v1/referral/feedback`,
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


function* referralCommissionBalanceSaga(action: any) {
  try {
    const response: { data: any } = yield call(referralCommissionBalance, {});

    yield put(
      referralCommissionBalanceSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        referralCommissionBalanceFailure({
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
        referralCommissionBalanceFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* referralHistorySaga(action: any) {
  try {
    const response: { data: any } = yield call(referralHistory, {});

    yield put(
      referralHistorySuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        referralHistoryFailure({
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
        referralHistoryFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* referralOverviewSaga(action: any) {
  try {
    const response: { data: any } = yield call(referralOverview, {});

    yield put(
      referralOverviewSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        referralOverviewFailure({
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
        referralOverviewFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* referralLinkSaga(action: any) {
  try {
    const response: { data: any } = yield call(referralLink, {});

    yield put(
      referralLinkSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        referralLinkFailure({
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
        referralLinkFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* allRefereesSaga(action: any) {
  try {
    const response: { data: any } = yield call(allReferees, {});

    yield put(
      allRefereesSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        allRefereesFailure({
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
        allRefereesFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* referralReportSaga(action: any) {
  try {
    const response: { data: any } = yield call(referralReport, {
      start_date: action.payload.values.start_date,
      end_date: action.payload.values.end_date,
      file_type: action.payload.values.file_type,
    });

    yield put(
      referralReportSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        referralReportFailure({
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
        referralReportFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* referralCommissionWithdrawalSaga(action: any) {
  try {
    const response: { data: any } = yield call(referralCommissionWithdrawal, {
      amount: action.payload.values.amount
    });

    yield put(
      referralCommissionWithdrawalSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        referralCommissionWithdrawalFailure({
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
        referralCommissionWithdrawalFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* referralGraphSaga(action: any) {
  try {
    const response: { data: any } = yield call(referralGraph, {});

    yield put(
      referralGraphSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        referralGraphFailure({
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
        referralGraphFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* referralFeedbackSaga(action: any) {
  try {
    const response: { data: any } = yield call(referralFeedback, {
      score: action.payload.values.score,
      comment: action.payload.values.comment
    });

    yield put(
      referralFeedbackSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        referralFeedbackFailure({
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
        referralFeedbackFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* referralCommissionBalanceSagaTrigger() {
  yield all([takeLatest(actionTypes.REFERRAL_COMMISSION_BALANCE_REQUEST, referralCommissionBalanceSaga)]);
}
export function* referralHistorySagaTrigger() {
  yield all([takeLatest(actionTypes.REFERRAL_HISTORY_REQUEST, referralHistorySaga)]);
}
export function* referralOverviewSagaTrigger() {
  yield all([takeLatest(actionTypes.REFERRAL_OVERVIEW_REQUEST, referralOverviewSaga)]);
}
export function* referralLinkSagaTrigger() {
  yield all([takeLatest(actionTypes.REFERRAL_LINK_REQUEST, referralLinkSaga)]);
}
export function* allRefereesSagaTrigger() {
  yield all([takeLatest(actionTypes.ALL_REFEREES_REQUEST, allRefereesSaga)]);
}
export function* referralReportSagaTrigger() {
  yield all([takeLatest(actionTypes.REFERRAL_REPORT_REQUEST, referralReportSaga)]);
}
export function* referralCommissionWithdrawalSagaTrigger() {
  yield all([takeLatest(actionTypes.REFERRAL_COMMISSION_WITHDRAWAL_REQUEST, referralCommissionWithdrawalSaga)]);
}
export function* referralGraphSagaTrigger() {
  yield all([takeLatest(actionTypes.REFERRAL_GRAPH_REQUEST, referralGraphSaga)]);
}
export function* referralFeedbackSagaTrigger() {
  yield all([takeLatest(actionTypes.REFERRAL_FEEDBACK_REQUEST, referralFeedbackSaga)]);
}
