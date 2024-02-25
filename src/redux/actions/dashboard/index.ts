import { actionTypes } from '../../constants/actionTypes'
import { 
    DashboardInfoFailure, DashboardInfoFailurePayload, DashboardInfoPayload, 
    DashboardInfoRequest, DashboardInfoSuccess, DashboardInfoSuccessPayload,

    AnnouncementFailurePayload, AnnouncementPayload, AnnouncementRequest,
    AnnouncementSuccess, AnnouncementSuccessPayload, AnnouncementFailure, 
    
    ViewAnnouncementPayload, ViewAnnouncementRequest, ViewAnnouncementSuccessPayload, 
    ViewAnnouncementSuccess, ViewAnnouncementFailurePayload, ViewAnnouncementFailure, 
    
    AcceptIndemnityFormPayload, AcceptIndemnityFormRequest, AcceptIndemnityFormSuccessPayload, 
    AcceptIndemnityFormSuccess, AcceptIndemnityFormFailurePayload, AcceptIndemnityFormFailure,
} from './types';


export const dashboardInfoRequest = (payload:DashboardInfoPayload):DashboardInfoRequest => ({
    type: actionTypes.DASHBOARD_INFO_REQUEST,
    payload,
});
export const dashboardInfoSuccess = (payload:DashboardInfoSuccessPayload):DashboardInfoSuccess => ({
    type: actionTypes.DASHBOARD_INFO_SUCCESS,
    payload,
});
export const dashboardInfoFailure = (payload:DashboardInfoFailurePayload):DashboardInfoFailure => ({
    type: actionTypes.DASHBOARD_INFO_FAILURE,
    payload,
});


export const announcementRequest = (payload:AnnouncementPayload):AnnouncementRequest => ({
    type: actionTypes.ANNOUNCEMENT_REQUEST,
    payload,
});
export const announcementSuccess = (payload:AnnouncementSuccessPayload):AnnouncementSuccess => ({
    type: actionTypes.ANNOUNCEMENT_SUCCESS,
    payload,
});
export const announcementFailure = (payload:AnnouncementFailurePayload):AnnouncementFailure => ({
    type: actionTypes.ANNOUNCEMENT_FAILURE,
    payload,
});

export const viewAnnouncementRequest = (payload:ViewAnnouncementPayload):ViewAnnouncementRequest => ({
    type: actionTypes.VIEW_ANNOUNCEMENT_REQUEST,
    payload,
});
export const viewAnnouncementSuccess = (payload:ViewAnnouncementSuccessPayload):ViewAnnouncementSuccess => ({
    type: actionTypes.VIEW_ANNOUNCEMENT_SUCCESS,
    payload,
});
export const viewAnnouncementFailure = (payload:ViewAnnouncementFailurePayload):ViewAnnouncementFailure  => ({
    type: actionTypes.VIEW_ANNOUNCEMENT_FAILURE,
    payload,
});

export const acceptIndemnityFormRequest = (payload:AcceptIndemnityFormPayload):AcceptIndemnityFormRequest => ({
    type: actionTypes.ACCEPT_INDEMNITY_FORM_REQUEST,
    payload,
});
export const acceptIndemnityFormSuccess = (payload:AcceptIndemnityFormSuccessPayload):AcceptIndemnityFormSuccess => ({
    type: actionTypes.ACCEPT_INDEMNITY_FORM_SUCCESS,
    payload,
});
export const acceptIndemnityFormFailure = (payload:AcceptIndemnityFormFailurePayload):AcceptIndemnityFormFailure  => ({
    type: actionTypes.ACCEPT_INDEMNITY_FORM_FAILURE,
    payload,
});

