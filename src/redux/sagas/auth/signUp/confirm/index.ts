import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {actionTypes} from "../../../../constants/actionTypes"
import global from "../../../../constants/global";
import { IConfirmSignUp, IResendSignUpOTP } from "../../../../actions/auth/signUp/confirm/types";
import { confirmSignUpFailure, confirmSignUpSuccess, resendSignUpOTPFailure, resendSignUpOTPSuccess } from "../../../../actions/auth/signUp/confirm";
import { serverCodes } from "../../../../constants/api";

const confirmSignUp = async (payload: any) => {
  const { data } = await axios.post<IConfirmSignUp[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/auth/register/session/validate",
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
const resendSignUp = async (payload: any) => {
  const { data } = await axios.post<IResendSignUpOTP[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/auth/register/session/otp/resend",
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

function* confirmSignUpSaga(action: any) {
  try {
    const response: { data: any } = yield call(confirmSignUp, {
      email: action.payload.values.email,
      confirmation_code: action.payload.values.confirmation_code,
    });

    yield put(
      confirmSignUpSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        confirmSignUpFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    yield put(
      confirmSignUpFailure({
        error: e.response.data.detail,
      })
    );
    action.payload.callback(e.response.data);
  }
}
function* resendSignUpOTPSaga(action: any) {
  try {
    const response: { data: any } = yield call(resendSignUp, {
      email: action.payload.values.email,
    });

    yield put(
      resendSignUpOTPSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        resendSignUpOTPFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    yield put(
      resendSignUpOTPFailure({
        error: e.response.data.detail,
      })
    );
    action.payload.callback(e.response.data);
  }
}


export function* confirmSignUpSagaTrigger() {
  yield all([takeLatest(actionTypes.CONFIRM_SIGNUP_REQUEST, confirmSignUpSaga)]);
}
export function* resendSignUpOTPSagaTrigger() {
  yield all([takeLatest(actionTypes.RESEND_SIGNUP_OTP_REQUEST, resendSignUpOTPSaga)]);
}
