import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../../constants/actionTypes"
import global from "../../../../constants/global";
import { ISetPassword } from "../../../../actions/auth/signUp/setPassword/types";
import { setPasswordFailure, setPasswordSuccess } from "../../../../actions/auth/signUp/setPassword";
import Cookies from "js-cookie";
import { serverCodes } from "../../../../constants/api";

// let accessT = Cookies.get("babtbu") || ""

const setPassword = async (payload: any) => {
    const { data } = await axios.post<ISetPassword[]>(
        global.apiBaseUrl + global.liveUrl + "api/v1/auth/register/session/set_password",
        payload,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: payload.token,
            },
        }
    );
    return data;
};

function* setPasswordSaga(action: any) {
    try {
        const response: { data: any } = yield call(setPassword, {
            password: action.payload.values.password,
            confirm_password: action.payload.values.confirm_password,
            token: action.payload.values.token
        });

        yield put(
            setPasswordSuccess({
                resp: response,
            })
        );
        action.payload.callback(response);
    } catch (e: any) {
        if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
          yield put(
            setPasswordFailure({
              error: "An error occurred, hang on a minute as we work towards fixing this error.",
            })
          );
          action.payload.callback(
            { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
          );
          return
        }
        yield put(
            setPasswordFailure({
                error: e?.response?.data?.detail,
            })
        );
        action.payload.callback(e?.response?.data);
    }
}


function* setPasswordSagaTrigger() {
    yield all([takeLatest(actionTypes.SET_PASSWORD_REQUEST, setPasswordSaga)]);
}

export default setPasswordSagaTrigger;