import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../constants/actionTypes"
import global from "../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../constants/api";
import { IActivateTeamMember, IChangeTeamMemberRole, ICreateTeamMember, IDeactivateTeamMember, IDeleteTeamMember, ITeamInfo } from "../../../actions/settings/team/types";
import { activateTeamMemberFailure, activateTeamMemberSuccess, changeTeamMemberRoleFailure, changeTeamMemberRoleSuccess, createTeamMemberFailure, createTeamMemberSuccess, deactivateTeamMemberFailure, deactivateTeamMemberSuccess, deleteTeamMemberFailure, deleteTeamMemberSuccess, teamInfoFailure, teamInfoSuccess } from "../../../actions/settings/team";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""

const teamInfo = async (payload: any) => {
  const { data } = await axios.get<ITeamInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/teams/get",
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
const createTeamMember = async (payload: any) => {
  const { data } = await axios.post<ICreateTeamMember[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/teams/invite_user",
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
const changeTeamMemberRole = async (payload: any) => {
  const { data } = await axios.post<IChangeTeamMemberRole[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/teams/change_role",
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
const activateTeamMember = async (payload: any) => {
  const { data } = await axios.post<IActivateTeamMember[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/teams/activate_user",
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
const deactivateTeamMember = async (payload: any) => {
  const { data } = await axios.post<IDeactivateTeamMember[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/teams/deactivate_user",
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
const deleteTeamMember = async (payload: any) => {
  const { data } = await axios.post<IDeleteTeamMember[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/teams/delete_user",
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


function* teamInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(teamInfo, {});
    yield put(
      teamInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        teamInfoFailure({
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
        teamInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* createTeamMemberSaga(action: any) {
  try {
    const response: { data: any } = yield call(createTeamMember, {
      email: action.payload.values.email,
      permission_id: action.payload.values.permission_id,
      url_path: action.payload.values.url_path
    });
    yield put(
      createTeamMemberSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        createTeamMemberFailure({
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
        createTeamMemberFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* changeTeamMemberRoleSaga(action: any) {
  try {
    const response: { data: any } = yield call(changeTeamMemberRole, {
      team_id: action.payload.values.team_id,
      permission_id: action.payload.values.permission_id
    });
    yield put(
      changeTeamMemberRoleSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        changeTeamMemberRoleFailure({
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
        changeTeamMemberRoleFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* activateTeamMemberSaga(action: any) {
  try {
    const response: { data: any } = yield call(activateTeamMember, {
      email: action.payload.values.email,
    });
    yield put(
      activateTeamMemberSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        activateTeamMemberFailure({
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
        activateTeamMemberFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* deactivateTeamMemberSaga(action: any) {
  try {
    const response: { data: any } = yield call(deactivateTeamMember, {
      email: action.payload.values.email,
    });
    yield put(
      deactivateTeamMemberSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        deactivateTeamMemberFailure({
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
        deactivateTeamMemberFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* deleteTeamMemberSaga(action: any) {
  try {
    const response: { data: any } = yield call(deleteTeamMember, {
      email: action.payload.values.email,
    });
    yield put(
      deleteTeamMemberSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        deleteTeamMemberFailure({
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
        deleteTeamMemberFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* teamInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.TEAM_INFO_REQUEST, teamInfoSaga)]);
}
export function* createTeamMemberSagaTrigger() {
  yield all([takeLatest(actionTypes.CREATE_TEAM_MEMBER_REQUEST, createTeamMemberSaga)]);
}
export function* changeTeamMemberRoleSagaTrigger() {
  yield all([takeLatest(actionTypes.CHANGE_TEAM_MEMBER_ROLE_REQUEST, changeTeamMemberRoleSaga)]);
}
export function* activateTeamMemberSagaTrigger() {
  yield all([takeLatest(actionTypes.ACTIVATE_TEAM_MEMBER_REQUEST, activateTeamMemberSaga)]);
}
export function* deactivateTeamMemberSagaTrigger() {
  yield all([takeLatest(actionTypes.DEACTIVATE_TEAM_MEMBER_REQUEST, deactivateTeamMemberSaga)]);
}
export function* deleteTeamMemberSagaTrigger() {
  yield all([takeLatest(actionTypes.DELETE_TEAM_MEMBER_REQUEST, deleteTeamMemberSaga)]);
}