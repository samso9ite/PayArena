import { actionTypes } from '../../../../../constants/actionTypes'
import { 
    BackgroundCheckRequestGetCandidateFormFailure, BackgroundCheckRequestGetCandidateFormFailurePayload, BackgroundCheckRequestGetCandidateFormPayload, 
    BackgroundCheckRequestGetCandidateFormRequest, BackgroundCheckRequestGetCandidateFormSuccess, BackgroundCheckRequestGetCandidateFormSuccessPayload,

    BackgroundCheckRequestValidateCandidateFormPayload, BackgroundCheckRequestValidateCandidateFormRequest, BackgroundCheckRequestValidateCandidateFormSuccessPayload, 
    BackgroundCheckRequestValidateCandidateFormSuccess, BackgroundCheckRequestValidateCandidateFormFailurePayload, BackgroundCheckRequestValidateCandidateFormFailure, 
    
    BackgroundCheckRequestCreateCandidateFormPayload, BackgroundCheckRequestCreateCandidateFormRequest, BackgroundCheckRequestCreateCandidateFormSuccessPayload, 
    BackgroundCheckRequestCreateCandidateFormSuccess, BackgroundCheckRequestCreateCandidateFormFailurePayload, BackgroundCheckRequestCreateCandidateFormFailure,

    BackgroundCheckRequestAnswerUploadFailure, BackgroundCheckRequestAnswerUploadFailurePayload, BackgroundCheckRequestAnswerUploadPayload, 
    BackgroundCheckRequestAnswerUploadRequest, BackgroundCheckRequestAnswerUploadSuccess, BackgroundCheckRequestAnswerUploadSuccessPayload, 
    
    BackgroundCheckRequestReportOverviewPayload, BackgroundCheckRequestReportOverviewRequest, BackgroundCheckRequestReportOverviewSuccessPayload, 
    BackgroundCheckRequestReportOverviewSuccess, BackgroundCheckRequestReportOverviewFailurePayload, BackgroundCheckRequestReportOverviewFailure, 
    
    BackgroundCheckRequestReportChecklistPayload, BackgroundCheckRequestReportChecklistRequest, BackgroundCheckRequestReportChecklistSuccessPayload, 
    BackgroundCheckRequestReportChecklistSuccess, BackgroundCheckRequestReportChecklistFailurePayload, BackgroundCheckRequestReportChecklistFailure,
    
    BackgroundCheckRequestReportDetailPayload, BackgroundCheckRequestReportDetailRequest, BackgroundCheckRequestReportDetailSuccessPayload, 
    BackgroundCheckRequestReportDetailSuccess, BackgroundCheckRequestReportDetailFailurePayload, BackgroundCheckRequestReportDetailFailure, 
    
    BackgroundCheckRequestReportSetStatusPayload, BackgroundCheckRequestReportSetStatusRequest, BackgroundCheckRequestReportSetStatusSuccessPayload, 
    BackgroundCheckRequestReportSetStatusSuccess, BackgroundCheckRequestReportSetStatusFailurePayload, BackgroundCheckRequestReportSetStatusFailure, 
    
    BackgroundCheckRequestGetPricePayload, BackgroundCheckRequestGetPriceRequest, BackgroundCheckRequestGetPriceSuccessPayload, 
    BackgroundCheckRequestGetPriceSuccess, BackgroundCheckRequestGetPriceFailurePayload, BackgroundCheckRequestGetPriceFailure, 
    
    BackgroundCheckRequestMakePaymentPayload, BackgroundCheckRequestMakePaymentRequest, BackgroundCheckRequestMakePaymentSuccessPayload, 
    BackgroundCheckRequestMakePaymentSuccess, BackgroundCheckRequestMakePaymentFailurePayload, BackgroundCheckRequestMakePaymentFailure 
} from './types';


export const backgroundCheckRequestGetCandidateFormRequest = (payload:BackgroundCheckRequestGetCandidateFormPayload):BackgroundCheckRequestGetCandidateFormRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_REQUEST,
    payload,
});
export const backgroundCheckRequestGetCandidateFormSuccess = (payload:BackgroundCheckRequestGetCandidateFormSuccessPayload):BackgroundCheckRequestGetCandidateFormSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_SUCCESS,
    payload,
});
export const backgroundCheckRequestGetCandidateFormFailure = (payload:BackgroundCheckRequestGetCandidateFormFailurePayload):BackgroundCheckRequestGetCandidateFormFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_FAILURE,
    payload,
});


export const backgroundCheckRequestAnswerUploadRequest = (payload:BackgroundCheckRequestAnswerUploadPayload):BackgroundCheckRequestAnswerUploadRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_REQUEST,
    payload,
});
export const backgroundCheckRequestAnswerUploadSuccess = (payload:BackgroundCheckRequestAnswerUploadSuccessPayload):BackgroundCheckRequestAnswerUploadSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_SUCCESS,
    payload,
});
export const backgroundCheckRequestAnswerUploadFailure = (payload:BackgroundCheckRequestAnswerUploadFailurePayload):BackgroundCheckRequestAnswerUploadFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_FAILURE,
    payload,
});


export const backgroundCheckRequestValidateCandidateFormRequest = (payload:BackgroundCheckRequestValidateCandidateFormPayload):BackgroundCheckRequestValidateCandidateFormRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_REQUEST,
    payload,
});
export const backgroundCheckRequestValidateCandidateFormSuccess = (payload:BackgroundCheckRequestValidateCandidateFormSuccessPayload):BackgroundCheckRequestValidateCandidateFormSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_SUCCESS,
    payload,
});
export const backgroundCheckRequestValidateCandidateFormFailure = (payload:BackgroundCheckRequestValidateCandidateFormFailurePayload):BackgroundCheckRequestValidateCandidateFormFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_FAILURE,
    payload,
});


export const backgroundCheckRequestCreateCandidateFormRequest = (payload:BackgroundCheckRequestCreateCandidateFormPayload):BackgroundCheckRequestCreateCandidateFormRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_REQUEST,
    payload,
});
export const backgroundCheckRequestCreateCandidateFormSuccess = (payload:BackgroundCheckRequestCreateCandidateFormSuccessPayload):BackgroundCheckRequestCreateCandidateFormSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_SUCCESS,
    payload,
});
export const backgroundCheckRequestCreateCandidateFormFailure = (payload:BackgroundCheckRequestCreateCandidateFormFailurePayload):BackgroundCheckRequestCreateCandidateFormFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_FAILURE,
    payload,
});


export const backgroundCheckRequestReportOverviewRequest = (payload:BackgroundCheckRequestReportOverviewPayload):BackgroundCheckRequestReportOverviewRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_REQUEST,
    payload,
});
export const backgroundCheckRequestReportOverviewSuccess = (payload:BackgroundCheckRequestReportOverviewSuccessPayload):BackgroundCheckRequestReportOverviewSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_SUCCESS,
    payload,
});
export const backgroundCheckRequestReportOverviewFailure = (payload:BackgroundCheckRequestReportOverviewFailurePayload):BackgroundCheckRequestReportOverviewFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_FAILURE,
    payload,
});


export const backgroundCheckRequestReportChecklistRequest = (payload:BackgroundCheckRequestReportChecklistPayload):BackgroundCheckRequestReportChecklistRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_REQUEST,
    payload,
});
export const backgroundCheckRequestReportChecklistSuccess = (payload:BackgroundCheckRequestReportChecklistSuccessPayload):BackgroundCheckRequestReportChecklistSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_SUCCESS,
    payload,
});
export const backgroundCheckRequestReportChecklistFailure = (payload:BackgroundCheckRequestReportChecklistFailurePayload):BackgroundCheckRequestReportChecklistFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_FAILURE,
    payload,
});


export const backgroundCheckRequestReportDetailRequest = (payload:BackgroundCheckRequestReportDetailPayload):BackgroundCheckRequestReportDetailRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_REQUEST,
    payload,
});
export const backgroundCheckRequestReportDetailSuccess = (payload:BackgroundCheckRequestReportDetailSuccessPayload):BackgroundCheckRequestReportDetailSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_SUCCESS,
    payload,
});
export const backgroundCheckRequestReportDetailFailure = (payload:BackgroundCheckRequestReportDetailFailurePayload):BackgroundCheckRequestReportDetailFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_FAILURE,
    payload,
});


export const backgroundCheckRequestReportSetStatusRequest = (payload:BackgroundCheckRequestReportSetStatusPayload):BackgroundCheckRequestReportSetStatusRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_REQUEST,
    payload,
});
export const backgroundCheckRequestReportSetStatusSuccess = (payload:BackgroundCheckRequestReportSetStatusSuccessPayload):BackgroundCheckRequestReportSetStatusSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_SUCCESS,
    payload,
});
export const backgroundCheckRequestReportSetStatusFailure = (payload:BackgroundCheckRequestReportSetStatusFailurePayload):BackgroundCheckRequestReportSetStatusFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_FAILURE,
    payload,
});


export const backgroundCheckRequestGetPriceRequest = (payload:BackgroundCheckRequestGetPricePayload):BackgroundCheckRequestGetPriceRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_REQUEST,
    payload,
});
export const backgroundCheckRequestGetPriceSuccess = (payload:BackgroundCheckRequestGetPriceSuccessPayload):BackgroundCheckRequestGetPriceSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_SUCCESS,
    payload,
});
export const backgroundCheckRequestGetPriceFailure = (payload:BackgroundCheckRequestGetPriceFailurePayload):BackgroundCheckRequestGetPriceFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_FAILURE,
    payload,
});


export const backgroundCheckRequestMakePaymentRequest = (payload:BackgroundCheckRequestMakePaymentPayload):BackgroundCheckRequestMakePaymentRequest => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_REQUEST,
    payload,
});
export const backgroundCheckRequestMakePaymentSuccess = (payload:BackgroundCheckRequestMakePaymentSuccessPayload):BackgroundCheckRequestMakePaymentSuccess => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_SUCCESS,
    payload,
});
export const backgroundCheckRequestMakePaymentFailure = (payload:BackgroundCheckRequestMakePaymentFailurePayload):BackgroundCheckRequestMakePaymentFailure => ({
    type: actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_FAILURE,
    payload,
});


// export const backgroundCheckRequestFilterRequest = (payload:BackgroundCheckRequestFilterPayload):BackgroundCheckRequestFilterRequest => ({
//     type: actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_REQUEST,
//     payload,
// });
// export const backgroundCheckRequestFilterSuccess = (payload:BackgroundCheckRequestFilterSuccessPayload):BackgroundCheckRequestFilterSuccess => ({
//     type: actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_SUCCESS,
//     payload,
// });
// export const backgroundCheckRequestFilterFailure = (payload:BackgroundCheckRequestFilterFailurePayload):BackgroundCheckRequestFilterFailure => ({
//     type: actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_FAILURE,
//     payload,
// });
