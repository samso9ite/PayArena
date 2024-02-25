import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../../constants/actionTypes"
import global from "../../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect } from "../../../../constants/api";
import { IRadarIpIntelligence, IRadarMobileIntelligence, IRadarEmailIntelligence, IRadarNameIntelligence } from "../../../../actions/products/identityradar/radarCheck/types";
import { 
  radarEmailIntelligenceFailure, radarEmailIntelligenceSuccess, 
  radarIpIntelligenceFailure, radarIpIntelligenceSuccess, 
  radarMobileIntelligenceFailure, radarMobileIntelligenceSuccess, radarNameIntelligenceFailure, radarNameIntelligenceSuccess,
} from "../../../../actions/products/identityradar/radarCheck";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

let serverCodes = [
  500,501,502,503,504,505,506,507,508,509,510,511,
]

const radarEmailIntelligence = async (payload: any) => {
  const { data } = await axios.post<IRadarEmailIntelligence[]>(
    global.apiBaseUrl + global.idradarApiUrl + "radar/email-intelligence",
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
const radarMobileIntelligence = async (payload: any) => {
  const { data } = await axios.post<IRadarMobileIntelligence[]>(
    global.apiBaseUrl + global.idradarApiUrl + "radar/mobile-intelligence",
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
const radarIpIntelligence = async (payload: any) => {
  const { data } = await axios.post<IRadarIpIntelligence[]>(
    global.apiBaseUrl + global.idradarApiUrl + "radar/ip-intelligence",
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
const radarNameIntelligence = async (payload: any) => {
  const { data } = await axios.post<IRadarNameIntelligence[]>(
    global.apiBaseUrl + global.idradarApiUrl + "radar/name-intelligence",
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

                                                                                                                                  
function* radarEmailIntelligenceSaga(action: any) {
  try {
    const response: { data: any } = yield call(radarEmailIntelligence, {
      email: action.payload.values.email,
      check_type: action.payload.values.check_type
    });
    yield put(
      radarEmailIntelligenceSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        radarEmailIntelligenceFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { response: { message:"An error occurred, hang on a minute as we work towards fixing this error." }}
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        radarEmailIntelligenceFailure({
          error: e?.response?.data?.response?.message,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* radarMobileIntelligenceSaga(action: any) {
  try {
    const response: { data: any } = yield call(radarMobileIntelligence, {
      mobile: action.payload.values.mobile,
      check_type: action.payload.values.check_type
    });
    yield put(
      radarMobileIntelligenceSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        radarMobileIntelligenceFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { response: { message:"An error occurred, hang on a minute as we work towards fixing this error." }}
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        radarMobileIntelligenceFailure({
          error: e?.response?.data?.response?.message,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* radarIpIntelligenceSaga(action: any) {
  try {
    const response: { data: any } = yield call(radarIpIntelligence, {
      ip_address:  action.payload.values.ip_address,
      check_type: action.payload.values.check_type
    });
    yield put(
      radarIpIntelligenceSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        radarIpIntelligenceFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { response: { message:"An error occurred, hang on a minute as we work towards fixing this error." }}
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        radarIpIntelligenceFailure({
          error: e?.response?.data?.response?.message,
        })
      );
      action.payload.callback(e?.response?.data);
    }
  }
}
function* radarNameIntelligenceSaga(action: any) {
  try {
    const response: { data: any } = yield call(radarNameIntelligence, {
      search_value: action.payload.values.search_value,
      dob: action.payload.values.dob,
      gender: action.payload.values.gender,
      check_type: action.payload.values.check_type
    });
    yield put(
      radarNameIntelligenceSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        radarNameIntelligenceFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { response: { message:"An error occurred, hang on a minute as we work towards fixing this error." }}
      );
      return
    }
    if (e.response.request.status === 401) {
      authorizationRedirect()
    } else {
      yield put(
        radarNameIntelligenceFailure({
          error: e?.response?.data?.response?.message,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* radarEmailIntelligenceSagaTrigger() {
  yield all([takeLatest(actionTypes.RADAR_EMAIL_INTELLIGENCE_REQUEST, radarEmailIntelligenceSaga)]);
}
export function* radarMobileIntelligenceSagaTrigger() {
  yield all([takeLatest(actionTypes.RADAR_MOBILE_INTELLIGENCE_REQUEST, radarMobileIntelligenceSaga)]);
}
export function* radarIpIntelligenceSagaTrigger() {
  yield all([takeLatest(actionTypes.RADAR_IP_INTELLIGENCE_REQUEST, radarIpIntelligenceSaga)]);
}
export function* radarNameIntelligenceSagaTrigger() {
  yield all([takeLatest(actionTypes.RADAR_NAME_INTELLIGENCE_REQUEST, radarNameIntelligenceSaga)]);
}