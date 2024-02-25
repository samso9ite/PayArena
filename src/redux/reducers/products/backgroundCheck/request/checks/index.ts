
import { BackgroundCheckRequestGetCandidateFormState, BackgroundCheckRequestAnswerUploadState, BackgroundCheckRequestReportOverviewState, BackgroundCheckRequestReportChecklistState, BackgroundCheckRequestReportDetailState, BackgroundCheckRequestReportSetStatusState, BackgroundCheckRequestGetPriceState, BackgroundCheckRequestMakePaymentState, BackgroundCheckRequestValidateCandidateFormState, BackgroundCheckRequestCreateCandidateFormState } from '../../../../../actions/products/backgroundCheck/request/checks/types';
import { actionTypes } from './../../../../../constants/actionTypes';


const initialState : BackgroundCheckRequestGetCandidateFormState = {
    isLoading: false,
    error: null,
    resp:null,
};
const validateCandidateInitialState : BackgroundCheckRequestValidateCandidateFormState = {
    isLoading: false,
    error: null,
    resp:null,
};
const createCandidateInitialState : BackgroundCheckRequestCreateCandidateFormState = {
    isLoading: false,
    error: null,
    resp:null,
};
const answerInitiateInitialState : BackgroundCheckRequestAnswerUploadState = {
    isLoading: false,
    error: null,
    resp:null,
};
const reportSummaryState : BackgroundCheckRequestReportOverviewState = {
    isLoading: false,
    error: null,
    resp:null,
};
const reportChecklistState : BackgroundCheckRequestReportChecklistState = {
    isLoading: false,
    error: null,
    resp:null,
};
const reportDetailState : BackgroundCheckRequestReportDetailState = {
    isLoading: false,
    error: null,
    resp:null,
};
const reportSetStatusState : BackgroundCheckRequestReportSetStatusState = {
    isLoading: false,
    error: null,
    resp:null,
};
const priceInitialState : BackgroundCheckRequestGetPriceState = {
    isLoading: false,
    error: null,
    resp:null,
};
const paymentInitialState : BackgroundCheckRequestMakePaymentState = {
    isLoading: false,
    error: null,
    resp:null,
};
// const filterInitialState : BackgroundCheckRequestFilterState = {
//     isLoading: false,
//     error: null,
//     resp:null,
// };


export const backgroundCheckRequestGetCandidateFormReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestValidateCandidateFormReducer = (state = validateCandidateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestCreateCandidateFormReducer = (state = createCandidateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestAnswerUploadReducer = (state = answerInitiateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestReportOverviewReducer = (state = reportSummaryState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestReportChecklistReducer = (state = reportChecklistState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestReportDetailReducer = (state = reportDetailState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestReportSetStatusReducer = (state = reportSetStatusState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestGetPriceReducer = (state = priceInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_GET_PRICE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const backgroundCheckRequestMakePaymentReducer = (state = paymentInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


// export const backgroundCheckRequestFilterReducer = (state = filterInitialState, action: { type: any; payload: any; }) => {
//     switch (action.type) {
//         case actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         case actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 resp:action.payload.resp
//             };
//         case actionTypes.BACKGROUND_CHECK_REQUEST_FILTER_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: action.payload.error
//             };
//         default:
//             return state;
//     }
// };
