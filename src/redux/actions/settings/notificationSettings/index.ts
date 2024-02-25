import { actionTypes } from '../../../constants/actionTypes'
import { 
    PreferenceInfoFailure, PreferenceInfoFailurePayload, PreferenceInfoPayload, 
    PreferenceInfoRequest, PreferenceInfoSuccess, PreferenceInfoSuccessPayload, 

    UpdatePreferenceInfoFailure, UpdatePreferenceInfoFailurePayload, UpdatePreferenceInfoPayload, 
    UpdatePreferenceInfoRequest, UpdatePreferenceInfoSuccess, UpdatePreferenceInfoSuccessPayload,

    ContactInfoFailure, ContactInfoFailurePayload, ContactInfoPayload,
    ContactInfoRequest, ContactInfoSuccess, ContactInfoSuccessPayload, 
    
    AddContactInfoPayload, AddContactInfoRequest, AddContactInfoSuccessPayload, 
    AddContactInfoSuccess, AddContactInfoFailurePayload, AddContactInfoFailure, 
    
    RemoveContactInfoPayload, RemoveContactInfoRequest, RemoveContactInfoSuccessPayload, 
    RemoveContactInfoSuccess, RemoveContactInfoFailurePayload, RemoveContactInfoFailure,
} from './types';


export const preferenceInfoRequest = (payload:PreferenceInfoPayload):PreferenceInfoRequest => ({
    type: actionTypes.PREFERENCE_INFO_REQUEST,
    payload,
});
export const preferenceInfoSuccess = (payload:PreferenceInfoSuccessPayload):PreferenceInfoSuccess => ({
    type: actionTypes.PREFERENCE_INFO_SUCCESS,
    payload,
});
export const preferenceInfoFailure = (payload:PreferenceInfoFailurePayload):PreferenceInfoFailure => ({
    type: actionTypes.PREFERENCE_INFO_FAILURE,
    payload,
});


export const updatePreferenceInfoRequest = (payload:UpdatePreferenceInfoPayload):UpdatePreferenceInfoRequest => ({
    type: actionTypes.UPDATE_PREFERENCE_INFO_REQUEST,
    payload,
});
export const updatePreferenceInfoSuccess = (payload:UpdatePreferenceInfoSuccessPayload):UpdatePreferenceInfoSuccess => ({
    type: actionTypes.UPDATE_PREFERENCE_INFO_SUCCESS,
    payload,
});
export const updatePreferenceInfoFailure = (payload:UpdatePreferenceInfoFailurePayload):UpdatePreferenceInfoFailure => ({
    type: actionTypes.UPDATE_PREFERENCE_INFO_FAILURE,
    payload,
});


export const contactInfoRequest = (payload:ContactInfoPayload):ContactInfoRequest => ({
    type: actionTypes.CONTACT_INFO_REQUEST,
    payload,
});
export const contactInfoSuccess = (payload:ContactInfoSuccessPayload):ContactInfoSuccess => ({
    type: actionTypes.CONTACT_INFO_SUCCESS,
    payload,
});
export const contactInfoFailure = (payload:ContactInfoFailurePayload):ContactInfoFailure => ({
    type: actionTypes.CONTACT_INFO_FAILURE,
    payload,
});


export const addContactInfoRequest = (payload:AddContactInfoPayload):AddContactInfoRequest => ({
    type: actionTypes.ADD_CONTACT_INFO_REQUEST,
    payload,
});
export const addContactInfoSuccess = (payload:AddContactInfoSuccessPayload):AddContactInfoSuccess => ({
    type: actionTypes.ADD_CONTACT_INFO_SUCCESS,
    payload,
});
export const addContactInfoFailure = (payload:AddContactInfoFailurePayload):AddContactInfoFailure => ({
    type: actionTypes.ADD_CONTACT_INFO_FAILURE,
    payload,
});


export const removeContactInfoRequest = (payload:RemoveContactInfoPayload):RemoveContactInfoRequest => ({
    type: actionTypes.REMOVE_CONTACT_INFO_REQUEST,
    payload,
});
export const removeContactInfoSuccess = (payload:RemoveContactInfoSuccessPayload):RemoveContactInfoSuccess => ({
    type: actionTypes.REMOVE_CONTACT_INFO_SUCCESS,
    payload,
});
export const removeContactInfoFailure = (payload:RemoveContactInfoFailurePayload):RemoveContactInfoFailure => ({
    type: actionTypes.REMOVE_CONTACT_INFO_FAILURE,
    payload,
});