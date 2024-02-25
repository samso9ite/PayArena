import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../constants/actionTypes"
import global from "../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../constants/api";
import { IComplianceDocInfo } from "../../actions/complianceCert/types";
import { complianceDocInfoFailure, complianceDocInfoSuccess } from "../../actions/complianceCert";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const complianceDocInfo = async (payload: any) => {
  const { data } = await axios.get<IComplianceDocInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/complaince/all",
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

function* complianceDocInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(complianceDocInfo, {});

    yield put(
      complianceDocInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        complianceDocInfoFailure({
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
        complianceDocInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

export function* complianceDocInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.COMPLIANCE_DOC_INFO_REQUEST, complianceDocInfoSaga)]);
}
