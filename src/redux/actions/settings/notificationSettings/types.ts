import { actionTypes } from "../../../constants/actionTypes";


export interface IPreferenceInfo {
  resp: any;
}
export interface IUpdatePreferenceInfo {
  resp: any;
}
export interface IContactInfo {
  resp: any;
}
export interface IAddContactInfo {
  resp: any;
}
export interface IRemoveContactInfo {
  resp: any;
}

export interface PreferenceInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface UpdatePreferenceInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ContactInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface AddContactInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface RemoveContactInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}

export interface PreferenceInfoPayload {
  values: {}
  callback: any;
}
export interface UpdatePreferenceInfoPayload {
  values: {
    newsletter: string, low_wallet: string, new_update: string,
  };
  callback: any;
}
export interface ContactInfoPayload {
  values: {}
  callback: any;
}
export interface AddContactInfoPayload {
  values: {
    name: string, email: string, phone: string,
  };
  callback: any;
}
export interface RemoveContactInfoPayload {
  values: {
    ref: string,
  };
  callback: any;
}

export interface PreferenceInfoSuccessPayload {
  resp: any;
}
export interface UpdatePreferenceInfoSuccessPayload {
  resp: any;
}
export interface ContactInfoSuccessPayload {
  resp: any;
}
export interface AddContactInfoSuccessPayload {
  resp: any;
}
export interface RemoveContactInfoSuccessPayload {
  resp: any;
}

export interface PreferenceInfoFailurePayload {
  error: string;
}
export interface UpdatePreferenceInfoFailurePayload {
  error: string;
}
export interface ContactInfoFailurePayload {
  error: string;
}
export interface AddContactInfoFailurePayload {
  error: string;
}
export interface RemoveContactInfoFailurePayload {
  error: string;
}


export interface PreferenceInfoRequest {
  type: typeof actionTypes.PREFERENCE_INFO_REQUEST;
  payload: PreferenceInfoPayload;
}
export interface UpdatePreferenceInfoRequest {
  type: typeof actionTypes.UPDATE_PREFERENCE_INFO_REQUEST;
  payload: UpdatePreferenceInfoPayload;
}
export interface ContactInfoRequest {
  type: typeof actionTypes.CONTACT_INFO_REQUEST;
  payload: ContactInfoPayload;
}
export interface AddContactInfoRequest {
  type: typeof actionTypes.ADD_CONTACT_INFO_REQUEST;
  payload: AddContactInfoPayload;
}
export interface RemoveContactInfoRequest {
  type: typeof actionTypes.REMOVE_CONTACT_INFO_REQUEST;
  payload: RemoveContactInfoPayload;
}

export type PreferenceInfoSuccess = {
  type: typeof actionTypes.PREFERENCE_INFO_SUCCESS,
  payload: PreferenceInfoSuccessPayload,
};
export type UpdatePreferenceInfoSuccess = {
  type: typeof actionTypes.UPDATE_PREFERENCE_INFO_SUCCESS,
  payload: UpdatePreferenceInfoSuccessPayload,
};
export type ContactInfoSuccess = {
  type: typeof actionTypes.CONTACT_INFO_SUCCESS,
  payload: ContactInfoSuccessPayload,
};
export type AddContactInfoSuccess = {
  type: typeof actionTypes.ADD_CONTACT_INFO_SUCCESS,
  payload: AddContactInfoSuccessPayload,
};
export type RemoveContactInfoSuccess = {
  type: typeof actionTypes.REMOVE_CONTACT_INFO_SUCCESS,
  payload: RemoveContactInfoSuccessPayload,
};

export type PreferenceInfoFailure = {
  type: typeof actionTypes.PREFERENCE_INFO_FAILURE,
  payload: PreferenceInfoFailurePayload,
};
export type UpdatePreferenceInfoFailure = {
  type: typeof actionTypes.UPDATE_PREFERENCE_INFO_FAILURE,
  payload: UpdatePreferenceInfoFailurePayload,
};
export type ContactInfoFailure = {
  type: typeof actionTypes.CONTACT_INFO_FAILURE,
  payload: ContactInfoFailurePayload,
};
export type AddContactInfoFailure = {
  type: typeof actionTypes.ADD_CONTACT_INFO_FAILURE,
  payload: AddContactInfoFailurePayload,
};
export type RemoveContactInfoFailure = {
  type: typeof actionTypes.REMOVE_CONTACT_INFO_FAILURE,
  payload: RemoveContactInfoFailurePayload,
};


export type PreferenceInfoActions =
  | PreferenceInfoRequest
  | PreferenceInfoSuccess
  | PreferenceInfoFailure;

export type UpdatePreferenceInfoActions =
  | UpdatePreferenceInfoRequest
  | UpdatePreferenceInfoSuccess
  | UpdatePreferenceInfoFailure;

export type ContactInfoActions =
  | ContactInfoRequest
  | ContactInfoSuccess
  | ContactInfoFailure;

export type AddContactInfoActions =
  | AddContactInfoRequest
  | AddContactInfoSuccess
  | AddContactInfoFailure;

export type RemoveContactInfoActions =
  | RemoveContactInfoRequest
  | RemoveContactInfoSuccess
  | RemoveContactInfoFailure;