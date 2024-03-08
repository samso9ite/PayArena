import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import {IFaqs } from "../../actions/faqs/types";
import {faqsFailure, faqsSuccess } from "../../actions/faqs";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""
let tenantId = Cookies.get("tenant") || ""

const faqs = async (payload: any) => {
  const { data } = await axios.get<IFaqs[]>(
    global.apiBaseUrl + global.liveUrl + "settings/faq",
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: accessT,
        Organisation: orgId,
        TenantId: tenantId
      },
    }
  );
  return data;
};


function* faqsSaga(action: any) {
  try {
    const response: { data: any } = yield call(faqs, {
      id: action.payload.values.id
    });

    yield put(
      faqsSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        faqsFailure({
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
        faqsFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

export function* faqsSagaTrigger() {
  yield all([takeLatest(actionTypes.FAQ_REQUEST, faqsSaga)]);
}
