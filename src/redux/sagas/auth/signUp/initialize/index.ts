import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {actionTypes} from "../../../../constants/actionTypes"
import global from "../../../../constants/global";
import { IClearSignUpEmail, IInitSignUp } from "../../../../actions/auth/signUp/initialize/types";
import { clearSignUpEmailFailure, clearSignUpEmailSuccess, initSignUpFailure, initSignUpSuccess } from "../../../../actions/auth/signUp/initialize";
import { serverCodes } from "../../../../constants/api";

const init = async (payload: any) => {
  const { data } = await axios.post<IInitSignUp[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/auth/register/session/initialize",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};
const clear = async (payload: any) => {
  const { data } = await axios.post<IClearSignUpEmail[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/auth/register/session/clear_email",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};


function* initSignUpSaga(action: any) {
  try {
    const response: { data: any } = yield call(init, {
      email: action.payload.values.email,
      first_name: action.payload.values.first_name,
      last_name: action.payload.values.last_name,
      organisation_name: action.payload.values.organisation_name,
      country: action.payload.values.country,
      referral: action.payload.values.referral,
      // referral: "",
      sector: action.payload.values.sector
    });

    yield put(
      initSignUpSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        initSignUpFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    yield put(
      initSignUpFailure({
        error: e?.response?.data?.detail,
      })
    );
    action.payload.callback(e?.response?.data);
  }
}
function* clearSignUpEmailSaga(action: any) {
  try {
    const response: { data: any } = yield call(clear, {
      email: action.payload.values.email,
    });

    yield put(
      clearSignUpEmailSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        clearSignUpEmailFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    yield put(
      clearSignUpEmailFailure({
        // error: e.message,
        error: e?.response?.data?.detail,
      })
    );
    action.payload.callback(e?.response?.data);
  }
}


export function* initSignUpSagaTrigger() {
  yield all([takeLatest(actionTypes.INIT_SIGNUP_REQUEST, initSignUpSaga)]);
}
export function* clearSignUpEmailSagaTrigger() {
  yield all([takeLatest(actionTypes.CLEAR_SIGNUP_EMAIL_REQUEST, clearSignUpEmailSaga)]);
}
