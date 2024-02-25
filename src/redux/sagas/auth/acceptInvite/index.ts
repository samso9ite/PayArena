import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {actionTypes} from "../../../constants/actionTypes"
import global from "../../../constants/global";
import { serverCodes } from "../../../constants/api";
import { acceptInviteFailure, acceptInviteSuccess } from "../../../actions/auth/acceptInvite";
import { IAcceptInvite } from "../../../actions/auth/acceptInvite/types";

const acceptInvite = async (payload: any) => {
  const { data } = await axios.post<IAcceptInvite[]>(
    global.apiBaseUrl + global.liveUrl + "teams/confirm_invitation",
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

function* acceptInviteSaga(action: any) {
  try {
    const response: { data: any } = yield call(acceptInvite, {
      email: action.payload.values.email, 
      type: action.payload.values.type, 
      first_name: action.payload.values.first_name, 
      last_name: action.payload.values.last_name,
      password:  action.payload.values.password, 
      key: action.payload.values.key,
      org_id: action.payload.values.org_id
    });
    yield put(
      acceptInviteSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        acceptInviteFailure({
          error: "An error occurred, hang on a minute as we work towards fixing this error.",
        })
      );
      action.payload.callback(
        { detail:"An error occurred, hang on a minute as we work towards fixing this error." }
      );
      return
    }
    yield put(
      acceptInviteFailure({
        error: e.response?.data?.detail,
      })
    );
    action.payload.callback(e.response?.data);
  }
}


function* acceptInviteSagaTrigger() {
  yield all([takeLatest(actionTypes.ACCEPT_INVITE_REQUEST, acceptInviteSaga)]);
}

export default acceptInviteSagaTrigger;