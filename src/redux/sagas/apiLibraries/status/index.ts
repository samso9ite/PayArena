import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../constants/actionTypes"
import global from "../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../constants/api";
import { IAPIStatus } from "../../../actions/apiLibraries/status/types";
import { apiStatusFailure, apiStatusSuccess } from "../../../actions/apiLibraries/status";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const apiStatus = async (payload: any) => {
  const { data } = await axios.get<IAPIStatus[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/applications/get",
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

function* apiStatusSaga(action: any) {
  try {
    const response: { data: any } = yield call(apiStatus, {});

    yield put(
      apiStatusSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        apiStatusFailure({
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
        apiStatusFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* apiStatusSagaTrigger() {
  yield all([takeLatest(actionTypes.API_STATUS_REQUEST, apiStatusSaga)]);
}
