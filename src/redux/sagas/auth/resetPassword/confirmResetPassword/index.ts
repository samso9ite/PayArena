import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {actionTypes} from "../../../../constants/actionTypes"
import global from "../../../../constants/global";
import { confirmResetPasswordFailure, confirmResetPasswordSuccess } from "../../../../actions/auth/resetPassword/confirmResetPassword";
import { IConfirmResetPassword } from "../../../../actions/auth/resetPassword/confirmResetPassword/types";
import { serverCodes } from "../../../../constants/api";

const confirmResetPassword = async (payload: any) => {
  const { data } = await axios.post<IConfirmResetPassword[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/auth/forgot_password/confirm",
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

function* confirmResetPasswordSaga(action: any) {
  try {
    const response: { data: any } = yield call(confirmResetPassword, {
      email: action.payload.values.email,
      password: action.payload.values.password,
      confirm_code: action.payload.values.confirm_code,
    });

    yield put(
      confirmResetPasswordSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        confirmResetPasswordFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    yield put(
      confirmResetPasswordFailure({
        error: e.response.data.detail,
      })
    );
    action.payload.callback(e.response.data);
  }
}


function* confirmResetPasswordSagaTrigger() {
  yield all([takeLatest(actionTypes.CONFIRM_RESET_PASSWORD_REQUEST, confirmResetPasswordSaga)]);
}

export default confirmResetPasswordSagaTrigger;