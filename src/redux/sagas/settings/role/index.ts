import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../constants/actionTypes"
import global from "../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../constants/api";
import { ICreateUserRole, IOrganizationModule, IOrganizationRole, IUpdateUserRole } from "../../../actions/settings/roles/types";
import { createUserRoleFailure, createUserRoleSuccess, organizationModuleFailure, organizationModuleSuccess, organizationRoleFailure, organizationRoleSuccess, updateUserRoleFailure, updateUserRoleSuccess } from "../../../actions/settings/roles";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""
let tenantId = Cookies.get("tenant") || ""

const organizationModule = async (payload: any) => {
  const { data } = await axios.get<IOrganizationModule[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/modules/get",
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
const organizationRole = async (payload: any) => {
  const { data } = await axios.get<IOrganizationRole[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/roles/get",
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
const createUserRole = async (payload: any) => {
  const { data } = await axios.post<ICreateUserRole[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/roles/create",
    payload,
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
const updateUserRole = async (payload: any) => {
  const { data } = await axios.post<IUpdateUserRole[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/roles/update",
    payload,
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


function* organizationModuleSaga(action: any) {
  try {
    const response: { data: any } = yield call(organizationModule, {});
    yield put(
      organizationModuleSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        organizationModuleFailure({
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
        organizationModuleFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* organizationRoleSaga(action: any) {
  try {
    const response: { data: any } = yield call(organizationRole, {});
    yield put(
      organizationRoleSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        organizationRoleFailure({
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
        organizationRoleFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* createUserRoleSaga(action: any) {
  try {
    const response: { data: any } = yield call(createUserRole, {
      name: action.payload.values.name,
      access_rights: action.payload.values.access_rights
    });
    yield put(
      createUserRoleSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        createUserRoleFailure({
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
        createUserRoleFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}
function* updateUserRoleSaga(action: any) {
  try {
    const response: { data: any } = yield call(updateUserRole, {
      name: action.payload.values.name,
      access_rights: action.payload.values.access_rights,
      role_id: action.payload.values.role_id
    });
    yield put(
      updateUserRoleSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        updateUserRoleFailure({
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
        updateUserRoleFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* organizationModuleSagaTrigger() {
  yield all([takeLatest(actionTypes.ORGANIZATION_MODULE_REQUEST, organizationModuleSaga)]);
}
export function* organizationRoleSagaTrigger() {
  yield all([takeLatest(actionTypes.ORGANIZATION_ROLE_REQUEST, organizationRoleSaga)]);
}
export function* createUserRoleSagaTrigger() {
  yield all([takeLatest(actionTypes.CREATE_USER_ROLE_REQUEST, createUserRoleSaga)]);
}
export function* updateUserRoleSagaTrigger() {
  yield all([takeLatest(actionTypes.UPDATE_USER_ROLE_REQUEST, updateUserRoleSaga)]);
}