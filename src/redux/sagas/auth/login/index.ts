import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { loginSuccess, loginFailure } from "../../../actions/auth/login";
import {actionTypes} from "../../../constants/actionTypes"
import { IAuth } from "../../../actions/auth/login/types";
import global from "../../../constants/global";
import { serverCodes } from "../../../constants/api";

const login = async (payload: any) => {
  const { data } = await axios.post<IAuth[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/auth/login",
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

function* loginSaga(action: any) {
  try {
    const response: { data: any } = yield call(login, {
      email: action.payload.values.email,
      password: action.payload.values.password,
      ip: action.payload.values.ip
    });
    yield put(
      loginSuccess({
        tokens: response?.data,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        loginFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    yield put(
      loginFailure({
        error: e.response?.data?.detail,
      })
    );
    action.payload.callback(e.response?.data);
  }
}


function* loginSagaTrigger() {
  yield all([takeLatest(actionTypes.LOGIN_REQUEST, loginSaga)]);
}

export default loginSagaTrigger;