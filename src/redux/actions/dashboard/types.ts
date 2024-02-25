import { actionTypes } from "../../constants/actionTypes";

export interface IDashboardInfo {
  resp: any;
}
export interface IAnnouncement {
  resp: any;
}
export interface IViewAnnouncement {
  resp: any;
}
export interface IAcceptIndemnityForm {
  resp: any;
}


export interface DashboardInfoState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface AnnouncementState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface ViewAnnouncementState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}
export interface AcceptIndemnityFormState {
  isLoading: boolean;
  resp: any;
  error: string | null;
}


export interface DashboardInfoPayload {
  callback: any;
}
export interface AnnouncementPayload {
  callback: any;
}
export interface ViewAnnouncementPayload {
  callback: any;
}
export interface AcceptIndemnityFormPayload {
  callback: any;
}


export interface DashboardInfoSuccessPayload {
  resp: any;
}
export interface AnnouncementSuccessPayload {
  resp: any;
}
export interface ViewAnnouncementSuccessPayload {
  resp: any;
}
export interface AcceptIndemnityFormSuccessPayload {
  resp: any;
}


export interface DashboardInfoFailurePayload {
  error: string;
}
export interface AnnouncementFailurePayload {
  error: string;
}
export interface ViewAnnouncementFailurePayload {
  error: string;
}
export interface AcceptIndemnityFormFailurePayload {
  error: string;
}


export interface DashboardInfoRequest {
  type: typeof actionTypes.DASHBOARD_INFO_REQUEST;
  payload: DashboardInfoPayload;
}
export interface AnnouncementRequest {
  type: typeof actionTypes.ANNOUNCEMENT_REQUEST;
  payload: AnnouncementPayload;
}
export interface ViewAnnouncementRequest {
  type: typeof actionTypes.VIEW_ANNOUNCEMENT_REQUEST;
  payload: ViewAnnouncementPayload;
}
export interface AcceptIndemnityFormRequest {
  type: typeof actionTypes.ACCEPT_INDEMNITY_FORM_REQUEST;
  payload: AcceptIndemnityFormPayload;
}


export type DashboardInfoSuccess = {
  type: typeof actionTypes.DASHBOARD_INFO_SUCCESS,
  payload: DashboardInfoSuccessPayload,
};
export type AnnouncementSuccess = {
  type: typeof actionTypes.ANNOUNCEMENT_SUCCESS,
  payload: AnnouncementSuccessPayload,
};
export type ViewAnnouncementSuccess = {
  type: typeof actionTypes.VIEW_ANNOUNCEMENT_SUCCESS,
  payload: ViewAnnouncementSuccessPayload,
};
export type AcceptIndemnityFormSuccess = {
  type: typeof actionTypes.ACCEPT_INDEMNITY_FORM_SUCCESS,
  payload: AcceptIndemnityFormSuccessPayload,
};


export type DashboardInfoFailure = {
  type: typeof actionTypes.DASHBOARD_INFO_FAILURE,
  payload: DashboardInfoFailurePayload,
};
export type AnnouncementFailure = {
  type: typeof actionTypes.ANNOUNCEMENT_FAILURE,
  payload: AnnouncementFailurePayload,
};
export type ViewAnnouncementFailure = {
  type: typeof actionTypes.VIEW_ANNOUNCEMENT_FAILURE,
  payload: ViewAnnouncementFailurePayload,
};
export type AcceptIndemnityFormFailure = {
  type: typeof actionTypes.ACCEPT_INDEMNITY_FORM_FAILURE,
  payload: AcceptIndemnityFormFailurePayload,
};


export type DashboardInfoActions =
  | DashboardInfoRequest
  | DashboardInfoSuccess
  | DashboardInfoFailure;

export type AnnouncementActions =
  | AnnouncementRequest
  | AnnouncementSuccess
  | AnnouncementFailure;

export type ViewAnnouncementActions =
  | ViewAnnouncementRequest
  | ViewAnnouncementSuccess
  | ViewAnnouncementFailure;

  export type AcceptIndemnityFormActions =
    | AcceptIndemnityFormRequest
    | AcceptIndemnityFormSuccess
    | AcceptIndemnityFormFailure;