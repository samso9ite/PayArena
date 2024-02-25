
import { CreateUserRoleState, OrganizationModuleState, OrganizationRoleState, UpdateUserRoleState } from '../../../actions/settings/roles/types';
import { actionTypes } from './../../../constants/actionTypes';


const initialState : OrganizationModuleState = {
    isLoading: false,
    error: null,
    resp:null,
};
const orgRoleInitialState : OrganizationRoleState = {
    isLoading: false,
    error: null,
    resp:null,
};
const createInitialState : CreateUserRoleState = {
    isLoading: false,
    error: null,
    resp:null,
};
const updateInitialState : UpdateUserRoleState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const organizationModuleReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ORGANIZATION_MODULE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ORGANIZATION_MODULE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ORGANIZATION_MODULE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const organizationRoleReducer = (state = orgRoleInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ORGANIZATION_ROLE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ORGANIZATION_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ORGANIZATION_ROLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const createUserRoleReducer = (state = createInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CREATE_USER_ROLE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CREATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CREATE_USER_ROLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export const updateUserRoleReducer = (state = updateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.UPDATE_USER_ROLE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.UPDATE_USER_ROLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};
