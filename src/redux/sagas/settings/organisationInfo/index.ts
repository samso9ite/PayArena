import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { actionTypes } from "../../../constants/actionTypes"
import global from "../../../constants/global";
import Cookies from "js-cookie";
import { authorizationRedirect, serverCodes } from "../../../constants/api";
import { IOrganisationInfo, IUpdateOrganisationInfo } from "../../../actions/settings/organisationInfo/types";
import { organisationInfoFailure, organisationInfoSuccess, updateOrganisationInfoFailure, updateOrganisationInfoSuccess } from "../../../actions/settings/organisationInfo";

let accessT = Cookies.get("babtbu") || ""
let orgId = Cookies.get("org") || ""
let tenantId = Cookies.get("tenant") || ""

const organisationInfo = async (payload: any) => {
  const { data } = await axios.get<IOrganisationInfo[]>(
    global.apiBaseUrl + global.liveUrl + "api/v1/account/organisation/get",
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
const updateOrganisationInfo = async (payload: any) => {
  const { data } = await axios.put<IUpdateOrganisationInfo[]>(
    `https://ifgn6xvqlj.execute-api.us-east-2.amazonaws.com/production/prembly-production/api/v1/account/organisation/${orgId}/update`,
    payload,
    {
      headers: {
        // "Content-Type": "multipart/form-data",
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


function* organisationInfoSaga(action: any) {
  try {
    const response: { data: any } = yield call(organisationInfo, {});

    yield put(
      organisationInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        organisationInfoFailure({
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
        organisationInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}

function* updateOrganisationInfoSaga(action: any) {

  // let busData = new FormData()

  // busData.append('name', action.payload.values.name);

  // busData.append('address', action.payload.values.address);
  // busData.append('state', action.payload.values.state);
  // busData.append('official_phone', action.payload.values.official_phone);
  // busData.append('business_number', action.payload.values.business_number);
  // busData.append('website', action.payload.values.website);
  // busData.append('tin',  action.payload.values.tin);
  // busData.append('business_document', action.payload.values.business_document);
  // busData.append('director_name',  action.payload.values.director_name,);
  // busData.append('director_email', action.payload.values.director_email);
  // busData.append('director_address',action.payload.values.director_address);
  // busData.append('director_id_card',  action.payload.values.director_id_card);

  // busData.append('country', action.payload.values.country);
  // busData.append('official_email', action.payload.values.official_email);
      
  try {
    // const response: { data: any } = yield call(updateOrganisationInfo, busData);
    const response: { data: any } = yield call(updateOrganisationInfo, {
      name: action.payload.values.name,
      address: action.payload.values.address,
      state: action.payload.values.state,
      official_phone: action.payload.values.official_phone,
      business_number: action.payload.values.business_number,
      website: action.payload.values.website,
      tin: action.payload.values.tin,
      business_document: action.payload.values.business_document,
      director_name: action.payload.values.director_name,
      director_email: action.payload.values.director_email,
      director_address: action.payload.values.director_address,
      director_id_card: action.payload.values.director_id_card
    });

    yield put(
      updateOrganisationInfoSuccess({
        resp: response,
      })
    );
    action.payload.callback(response);
  } catch (e: any) {
    if(serverCodes.includes(e?.response?.request?.status) || !e?.response?.request?.status){
      yield put(
        updateOrganisationInfoFailure({
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
        updateOrganisationInfoFailure({
          error: e.response.data.detail,
        })
      );
      action.payload.callback(e.response.data);
    }
  }
}


export function* organisationInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.ORGANISATION_INFO_REQUEST, organisationInfoSaga)]);
}
export function* updateOrganisationInfoSagaTrigger() {
  yield all([takeLatest(actionTypes.UPDATE_ORGANISATION_INFO_REQUEST, updateOrganisationInfoSaga)]);
}