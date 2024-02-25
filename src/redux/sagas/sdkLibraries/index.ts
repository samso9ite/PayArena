import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { IUpdateWebhookUrl } from "../../actions/sdkLibraries/types";
import { updateWebhookUrlFailure, updateWebhookUrlSuccess } from "../../actions/sdkLibraries";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const updateWebhookUrl = async (payload: any) => {
  const { data } = await axios.put<IUpdateWebhookUrl[]>(
    global.apiBaseUrl + global.liveUrl + `api/v1/account/organisation/${orgId}/update`,
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


function* updateWebhookUrlSaga(action: any) {
  try {
    const response: { data: any } = yield call(updateWebhookUrl, {
      webhook_url: action.payload.values.webhook_url,
    });

    yield put(
      updateWebhookUrlSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        updateWebhookUrlFailure({
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
        updateWebhookUrlFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* updateWebhookUrlSagaTrigger() {
  yield all([takeLatest(actionTypes.UPDATE_WEBHOOK_URL_REQUEST, updateWebhookUrlSaga)]);
}