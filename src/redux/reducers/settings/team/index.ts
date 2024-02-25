import { 
    ActivateTeamMemberState, ChangeTeamMemberRoleState, CreateTeamMemberState, DeactivateTeamMemberState, 
    DeleteTeamMemberState, TeamInfoState 
} from '../../../actions/settings/team/types';
import { actionTypes } from './../../../constants/actionTypes';


const initialState : TeamInfoState = {
    isLoading: false,
    error: null,
    resp:null,
};
const createInitialState : CreateTeamMemberState = {
    isLoading: false,
    error: null,
    resp:null,
};
const roleInitialState : ChangeTeamMemberRoleState = {
    isLoading: false,
    error: null,
    resp:null,
};
const activateInitialState : ActivateTeamMemberState = {
    isLoading: false,
    error: null,
    resp:null,
};
const deactivateInitialState : DeactivateTeamMemberState = {
    isLoading: false,
    error: null,
    resp:null,
};
const deleteInitialState : DeleteTeamMemberState = {
    isLoading: false,
    error: null,
    resp:null,
};


export const teamInfoReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.TEAM_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.TEAM_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.TEAM_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const createTeamMemberReducer = (state = createInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CREATE_TEAM_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CREATE_TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CREATE_TEAM_MEMBER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const changeTeamMemberRoleReducer = (state = roleInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.CHANGE_TEAM_MEMBER_ROLE_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.CHANGE_TEAM_MEMBER_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.CHANGE_TEAM_MEMBER_ROLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const activateTeamMemberReducer = (state = activateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.ACTIVATE_TEAM_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.ACTIVATE_TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.ACTIVATE_TEAM_MEMBER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const deactivateTeamMemberReducer = (state = deactivateInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.DEACTIVATE_TEAM_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.DEACTIVATE_TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.DEACTIVATE_TEAM_MEMBER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};


export const deleteTeamMemberReducer = (state = deleteInitialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case actionTypes.DELETE_TEAM_MEMBER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.DELETE_TEAM_MEMBER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                resp:action.payload.resp
            };
        case actionTypes.DELETE_TEAM_MEMBER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
};