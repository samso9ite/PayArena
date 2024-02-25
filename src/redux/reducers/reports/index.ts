import { APIGenerateReportLogsState, APIReportActivitiesState, APIReportProductsState, APIReportState, CustomerReportState } from '../../actions/reports/types';
import { actionTypes } from './../../constants/actionTypes';

const initialState: APIReportState = {
    isLoading: false,
    error: null,
    resp: null,
};
// const searchInitialState : APISearchReportState = {
//     isLoading: false,
//     error: null,
//     resp:null,
// };
// const filterInitialState : APIFilterReportState = {
//     isLoading: false,
//     error: null,
//     resp:null,
// };
const productsInitialState: APIReportProductsState = {
    isLoading: false,
    error: null,
    resp: null,
};
const activitiesInitialState: APIReportActivitiesState = {
    isLoading: false,
    error: null,
    resp: null,
};
const reportLogInitialState: APIGenerateReportLogsState = {
    isLoading: false,
    error: null,
    resp: null,
};
const customerReportInitialState: CustomerReportState = {
    isLoading: false,
    error: null,
    resp: null,
};



export const apiReportReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.API_REPORT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.API_SEARCH_REPORT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.API_FILTER_REPORT_REQUEST:
            return {
                ...state,
                isLoading: true
            };


        case actionTypes.API_REPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp
            };
        case actionTypes.API_SEARCH_REPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp
            };
        case actionTypes.API_FILTER_REPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp
            };


        case actionTypes.API_REPORT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        case actionTypes.API_SEARCH_REPORT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        case actionTypes.API_FILTER_REPORT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

// export const apiSearchReportReducer = (state = searchInitialState, action: { type: any; payload: any; }) => {
//     switch (action.type) {
//         case actionTypes.API_SEARCH_REPORT_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         case actionTypes.API_REPORT_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 resp:action.payload.resp
//             };
//         case actionTypes.API_SEARCH_REPORT_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: action.payload.error
//             };
//         default:
//             return state;
//     }
// };

// export const apiFilterReportReducer = (state = filterInitialState, action: { type: any; payload: any; }) => {
//     switch (action.type) {
//         case actionTypes.API_FILTER_REPORT_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         case actionTypes.API_REPORT_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 resp:action.payload.resp
//             };
//         case actionTypes.API_FILTER_REPORT_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: action.payload.error
//             };
//         default:
//             return state;
//     }
// };

export const apiReportProductsReducer = (state = productsInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.API_REPORT_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.API_REPORT_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp
            };
        case actionTypes.API_REPORT_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const apiReportActivitiesReducer = (state = activitiesInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.API_REPORT_ACTIVITIES_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.API_REPORT_ACTIVITIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp
            };
        case actionTypes.API_REPORT_ACTIVITIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const apiGenerateReportLogsReducer = (state = reportLogInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.API_GENERATE_REPORT_LOG_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.API_GENERATE_REPORT_LOG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp
            };
        case actionTypes.API_GENERATE_REPORT_LOG_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
export const customerReportReducer = (state = customerReportInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CUSTOMER_REPORT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CUSTOMER_REPORT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp: action.payload.resp
            };
        case actionTypes.CUSTOMER_REPORT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};