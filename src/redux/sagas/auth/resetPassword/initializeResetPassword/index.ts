import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {actionTypes} from "../../../../constants/actionTypes"
import global from "../../../../constants/global";
import { IInitResetPassword } from "../../../../actions/auth/resetPassword/initializeResetPassword/types";
import { initResetPasswordFailure, initResetPasswordSuccess } from "../../../../actions/auth/resetPassword/initializeResetPassword";
import { serverCodes } from "../../../../constants/api";

const initResetPassword = async (payload: any) => {
  const { data } = await axios.post<IInitResetPassword[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/auth/forgot_password/initialize",
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

function* initResetPasswordSaga(action: any) {
  try {
    const response: { data: any } = yield call(initResetPassword, {
      email: action.payload.values.email,
    });

    yield put(
      initResetPasswordSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        initResetPasswordFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    yield put(
      initResetPasswordFailure({
        error: e?.response?.data?.detail,
      })
    );
    action.payload.callback(e?.response?.data);
  }
}


function* initResetPasswordSagaTrigger() {
  yield all([takeLatest(actionTypes.INIT_RESET_PASSWORD_REQUEST, initResetPasswordSaga)]);
}

export default initResetPasswordSagaTrigger;