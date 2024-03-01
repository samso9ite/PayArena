export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',

    INIT_SIGNUP_REQUEST: 'INIT_SIGNUP_REQUEST',
    INIT_SIGNUP_SUCCESS: 'INIT_SIGNUP_SUCCESS',
    INIT_SIGNUP_FAILURE: 'INIT_SIGNUP_FAILURE',

    CLEAR_SIGNUP_EMAIL_REQUEST: 'CLEAR_SIGNUP_EMAIL_REQUEST',
    CLEAR_SIGNUP_EMAIL_SUCCESS: 'CLEAR_SIGNUP_EMAIL_SUCCESS',
    CLEAR_SIGNUP_EMAIL_FAILURE: 'CLEAR_SIGNUP_EMAIL_FAILURE',

    CONFIRM_SIGNUP_REQUEST: 'CONFIRM_SIGNUP_REQUEST',
    CONFIRM_SIGNUP_SUCCESS: 'CONFIRM_SIGNUP_SUCCESS',
    CONFIRM_SIGNUP_FAILURE: 'CONFIRM_SIGNUP_FAILURE',

    MPESA_TOP_UP_WALLET_REQUEST : 'MPESA_TOP_UP_WALLET_REQUEST',
    MPESA_TOP_UP_WALLET_SUCCESS : 'MPESA_TOP_UP_WALLET_SUCCESS',
    MPESA_TOP_UP_WALLET_FAILURE : 'MPESA_TOP_UP_WALLET_FAILURE',

    SET_PASSWORD_REQUEST: 'SET_PASSWORD_REQUEST',
    SET_PASSWORD_SUCCESS: 'SET_PASSWORD_SUCCESS',
    SET_PASSWORD_FAILURE: 'SET_PASSWORD_FAILURE',

    RESEND_SIGNUP_OTP_REQUEST: 'RESEND_SIGNUP_OTP_REQUEST',
    RESEND_SIGNUP_OTP_SUCCESS: 'RESEND_SIGNUP_OTP_SUCCESS',
    RESEND_SIGNUP_OTP_FAILURE: 'RESEND_SIGNUP_OTP_FAILURE',

    INIT_RESET_PASSWORD_REQUEST: 'INIT_RESET_PASSWORD_REQUEST',
    INIT_RESET_PASSWORD_SUCCESS: 'INIT_RESET_PASSWORD_SUCCESS',
    INIT_RESET_PASSWORD_FAILURE: 'INIT_RESET_PASSWORD_FAILURE',

    CONFIRM_RESET_PASSWORD_REQUEST: 'CONFIRM_RESET_PASSWORD_REQUEST',
    CONFIRM_RESET_PASSWORD_SUCCESS: 'CONFIRM_RESET_PASSWORD_SUCCESS',
    CONFIRM_RESET_PASSWORD_FAILURE: 'CONFIRM_RESET_PASSWORD_FAILURE',

    ACCEPT_INVITE_REQUEST: 'ACCEPT_INVITE_REQUEST',
    ACCEPT_INVITE_SUCCESS: 'ACCEPT_INVITE_SUCCESS',
    ACCEPT_INVITE_FAILURE: 'ACCEPT_INVITE_FAILURE',

    ACCESS_TOKEN_INFO_REQUEST: 'ACCESS_TOKEN_INFO_REQUEST',
    ACCESS_TOKEN_INFO_SUCCESS: 'ACCESS_TOKEN_INFO_SUCCESS',
    ACCESS_TOKEN_INFO_FAILURE: 'ACCESS_TOKEN_INFO_FAILURE',

    MIGRATION_SET_PASSWORD_REQUEST: 'MIGRATION_SET_PASSWORD_REQUEST',
    MIGRATION_SET_PASSWORD_SUCCESS: 'MIGRATION_SET_PASSWORD_SUCCESS',
    MIGRATION_SET_PASSWORD_FAILURE: 'MIGRATION_SET_PASSWORD_FAILURE',

    TOURGUIDE_STATUS_REQUEST: 'TOURGUIDE_STATUS_REQUEST',
    TOURGUIDE_STATUS_SUCCESS: 'TOURGUIDE_STATUS_SUCCESS',
    TOURGUIDE_STATUS_FAILURE: 'TOURGUIDE_STATUS_FAILURE',

    TOURGUIDE_COMPLETE_REQUEST: 'TOURGUIDE_COMPLETE_REQUEST',
    TOURGUIDE_COMPLETE_SUCCESS: 'TOURGUIDE_COMPLETE_SUCCESS',
    TOURGUIDE_COMPLETE_FAILURE: 'TOURGUIDE_COMPLETE_FAILURE',

    DASHBOARD_INFO_REQUEST: 'DASHBOARD_INFO_REQUEST',
    DASHBOARD_INFO_SUCCESS: 'DASHBOARD_INFO_SUCCESS',
    DASHBOARD_INFO_FAILURE: 'DASHBOARD_INFO_FAILURE',

    ANNOUNCEMENT_REQUEST: 'ANNOUNCEMENT_REQUEST',
    ANNOUNCEMENT_SUCCESS: 'ANNOUNCEMENT_SUCCESS',
    ANNOUNCEMENT_FAILURE: 'ANNOUNCEMENT_FAILURE',

    VIEW_ANNOUNCEMENT_REQUEST: 'VIEW_ANNOUNCEMENT_REQUEST',
    VIEW_ANNOUNCEMENT_SUCCESS: 'VIEW_ANNOUNCEMENT_SUCCESS',
    VIEW_ANNOUNCEMENT_FAILURE: 'VIEW_ANNOUNCEMENT_FAILURE',

    ACCEPT_INDEMNITY_FORM_REQUEST: 'ACCEPT_INDEMNITY_FORM_REQUEST',
    ACCEPT_INDEMNITY_FORM_SUCCESS: 'ACCEPT_INDEMNITY_FORM_SUCCESS',
    ACCEPT_INDEMNITY_FORM_FAILURE: 'ACCEPT_INDEMNITY_FORM_FAILURE',

    WALLET_HISTORY_REQUEST: 'WALLET_HISTORY_REQUEST',
    WALLET_HISTORY_SUCCESS: 'WALLET_HISTORY_SUCCESS',
    WALLET_HISTORY_FAILURE: 'WALLET_HISTORY_FAILURE',

    SET_THRESHOLD_REQUEST: 'SET_THRESHOLD_REQUEST',
    SET_THRESHOLD_SUCCESS: 'SET_THRESHOLD_SUCCESS',
    SET_THRESHOLD_FAILURE: 'SET_THRESHOLD_FAILURE',

    CARD_INFO_REQUEST: 'CARD_INFO_REQUEST',
    CARD_INFO_SUCCESS: 'CARD_INFO_SUCCESS',
    CARD_INFO_FAILURE: 'CARD_INFO_FAILURE',

    ADD_CARD_REQUEST: 'ADD_CARD_REQUEST',
    ADD_CARD_SUCCESS: 'ADD_CARD_SUCCESS',
    ADD_CARD_FAILURE: 'ADD_CARD_FAILURE',

    SET_DEFAULT_CARD_REQUEST: 'SET_DEFAULT_CARD_REQUEST',
    SET_DEFAULT_CARD_SUCCESS: 'SET_DEFAULT_CARD_SUCCESS',
    SET_DEFAULT_CARD_FAILURE: 'SET_DEFAULT_CARD_FAILURE',

    REMOVE_CARD_REQUEST: 'REMOVE_CARD_REQUEST',
    REMOVE_CARD_SUCCESS: 'REMOVE_CARD_SUCCESS',
    REMOVE_CARD_FAILURE: 'REMOVE_CARD_FAILURE',

    VIRTUAL_ACCOUNT_INFO_REQUEST: 'VIRTUAL_ACCOUNT_INFO_REQUEST',
    VIRTUAL_ACCOUNT_INFO_SUCCESS: 'VIRTUAL_ACCOUNT_INFO_SUCCESS',
    VIRTUAL_ACCOUNT_INFO_FAILURE: 'VIRTUAL_ACCOUNT_INFO_FAILURE',

    TOP_UP_WALLET_REQUEST: 'TOP_UP_WALLET_REQUEST',
    TOP_UP_WALLET_SUCCESS: 'TOP_UP_WALLET_SUCCESS',
    TOP_UP_WALLET_FAILURE: 'TOP_UP_WALLET_FAILURE',

    PAYSTACK_TOP_UP_WALLET_REQUEST: 'PAYSTACK_TOP_UP_WALLET_REQUEST',
    PAYSTACK_TOP_UP_WALLET_SUCCESS: 'PAYSTACK_TOP_UP_WALLET_SUCCESS',
    PAYSTACK_TOP_UP_WALLET_FAILURE: 'PAYSTACK_TOP_UP_WALLET_FAILURE',

    FLUTTERWAVE_TOP_UP_WALLET_REQUEST: 'FLUTTERWAVE_TOP_UP_WALLET_REQUEST',
    FLUTTERWAVE_TOP_UP_WALLET_SUCCESS: 'FLUTTERWAVE_TOP_UP_WALLET_SUCCESS',
    FLUTTERWAVE_TOP_UP_WALLET_FAILURE: 'FLUTTERWAVE_TOP_UP_WALLET_FAILURE',

    WALLET_TO_WALLET_TRANSFER_REQUEST: 'WALLET_TO_WALLET_TRANSFER_REQUEST',
    WALLET_TO_WALLET_TRANSFER_SUCCESS: 'WALLET_TO_WALLET_TRANSFER_SUCCESS',
    WALLET_TO_WALLET_TRANSFER_FAILURE: 'WALLET_TO_WALLET_TRANSFER_FAILURE',

    MY_ORGANISATION_INFO_REQUEST: 'MY_ORGANISATION_INFO_REQUEST',
    MY_ORGANISATION_INFO_SUCCESS: 'MY_ORGANISATION_INFO_SUCCESS',
    MY_ORGANISATION_INFO_FAILURE: 'MY_ORGANISATION_INFO_FAILURE',

    CREATE_MY_ORGANISATION_INFO_REQUEST: 'CREATE_MY_ORGANISATION_INFO_REQUEST',
    CREATE_MY_ORGANISATION_INFO_SUCCESS: 'CREATE_MY_ORGANISATION_INFO_SUCCESS',
    CREATE_MY_ORGANISATION_INFO_FAILURE: 'CREATE_MY_ORGANISATION_INFO_FAILURE',

    UPDATE_MY_ORGANISATION_INFO_REQUEST: 'UPDATE_MY_ORGANISATION_INFO_REQUEST',
    UPDATE_MY_ORGANISATION_INFO_SUCCESS: 'UPDATE_MY_ORGANISATION_INFO_SUCCESS',
    UPDATE_MY_ORGANISATION_INFO_FAILURE: 'UPDATE_MY_ORGANISATION_INFO_FAILURE',

    ORGANISATION_INFO_REQUEST: 'ORGANISATION_INFO_REQUEST',
    ORGANISATION_INFO_SUCCESS: 'ORGANISATION_INFO_SUCCESS',
    ORGANISATION_INFO_FAILURE: 'ORGANISATION_INFO_FAILURE',

    UPDATE_USER_PASSWORD_REQUEST: 'UPDATE_USER_PASSWORD_REQUEST',
    UPDATE_USER_PASSWORD_SUCCESS: 'UPDATE_USER_PASSWORD_SUCCESS',
    UPDATE_USER_PASSWORD_FAILURE: 'UPDATE_USER_PASSWORD_FAILURE',

    UPDATE_PROFILE_INFO_REQUEST: 'UPDATE_PROFILE_INFO_REQUEST',
    UPDATE_PROFILE_INFO_SUCCESS: 'UPDATE_PROFILE_INFO_SUCCESS',
    UPDATE_PROFILE_INFO_FAILURE: 'UPDATE_PROFILE_INFO_FAILURE',

    UPDATE_ORGANISATION_INFO_REQUEST: 'UPDATE_ORGANISATION_INFO_REQUEST',
    UPDATE_ORGANISATION_INFO_SUCCESS: 'UPDATE_ORGANISATION_INFO_SUCCESS',
    UPDATE_ORGANISATION_INFO_FAILURE: 'UPDATE_ORGANISATION_INFO_FAILURE',

    TEAM_INFO_REQUEST: 'TEAM_INFO_REQUEST',
    TEAM_INFO_SUCCESS: 'TEAM_INFO_SUCCESS',
    TEAM_INFO_FAILURE: 'TEAM_INFO_FAILURE',

    CREATE_TEAM_MEMBER_REQUEST: 'CREATE_TEAM_MEMBER_REQUEST',
    CREATE_TEAM_MEMBER_SUCCESS: 'CREATE_TEAM_MEMBER_SUCCESS',
    CREATE_TEAM_MEMBER_FAILURE: 'CREATE_TEAM_MEMBER_FAILURE',

    CHANGE_TEAM_MEMBER_ROLE_REQUEST: 'CHANGE_TEAM_MEMBER_ROLE_REQUEST',
    CHANGE_TEAM_MEMBER_ROLE_SUCCESS: 'CHANGE_TEAM_MEMBER_ROLE_SUCCESS',
    CHANGE_TEAM_MEMBER_ROLE_FAILURE: 'CHANGE_TEAM_MEMBER_ROLE_FAILURE',

    ACTIVATE_TEAM_MEMBER_REQUEST: 'ACTIVATE_TEAM_MEMBER_REQUEST',
    ACTIVATE_TEAM_MEMBER_SUCCESS: 'ACTIVATE_TEAM_MEMBER_SUCCESS',
    ACTIVATE_TEAM_MEMBER_FAILURE: 'ACTIVATE_TEAM_MEMBER_FAILURE',

    DEACTIVATE_TEAM_MEMBER_REQUEST: 'DEACTIVATE_TEAM_MEMBER_REQUEST',
    DEACTIVATE_TEAM_MEMBER_SUCCESS: 'DEACTIVATE_TEAM_MEMBER_SUCCESS',
    DEACTIVATE_TEAM_MEMBER_FAILURE: 'DEACTIVATE_TEAM_MEMBER_FAILURE',

    DELETE_TEAM_MEMBER_REQUEST: 'DELETE_TEAM_MEMBER_REQUEST',
    DELETE_TEAM_MEMBER_SUCCESS: 'DELETE_TEAM_MEMBER_SUCCESS',
    DELETE_TEAM_MEMBER_FAILURE: 'DELETE_TEAM_MEMBER_FAILURE',

    ORGANIZATION_MODULE_REQUEST: 'ORGANIZATION_MODULE_REQUEST',
    ORGANIZATION_MODULE_SUCCESS: 'ORGANIZATION_MODULE_SUCCESS',
    ORGANIZATION_MODULE_FAILURE: 'ORGANIZATION_MODULE_FAILURE',

    ORGANIZATION_ROLE_REQUEST: 'ORGANIZATION_ROLE_REQUEST',
    ORGANIZATION_ROLE_SUCCESS: 'ORGANIZATION_ROLE_SUCCESS',
    ORGANIZATION_ROLE_FAILURE: 'ORGANIZATION_ROLE_FAILURE',

    CREATE_USER_ROLE_REQUEST: 'CREATE_USER_ROLE_REQUEST',
    CREATE_USER_ROLE_SUCCESS: 'CREATE_USER_ROLE_SUCCESS',
    CREATE_USER_ROLE_FAILURE: 'CREATE_USER_ROLE_FAILURE',

    UPDATE_USER_ROLE_REQUEST: 'UPDATE_USER_ROLE_REQUEST',
    UPDATE_USER_ROLE_SUCCESS: 'UPDATE_USER_ROLE_SUCCESS',
    UPDATE_USER_ROLE_FAILURE: 'UPDATE_USER_ROLE_FAILURE',

    PREFERENCE_INFO_REQUEST: 'PREFERENCE_INFO_REQUEST',
    PREFERENCE_INFO_SUCCESS: 'PREFERENCE_INFO_SUCCESS',
    PREFERENCE_INFO_FAILURE: 'PREFERENCE_INFO_FAILURE',

    UPDATE_PREFERENCE_INFO_REQUEST: 'UPDATE_PREFERENCE_INFO_REQUEST',
    UPDATE_PREFERENCE_INFO_SUCCESS: 'UPDATE_PREFERENCE_INFO_SUCCESS',
    UPDATE_PREFERENCE_INFO_FAILURE: 'UPDATE_PREFERENCE_INFO_FAILURE',

    CONTACT_INFO_REQUEST: 'CONTACT_INFO_REQUEST',
    CONTACT_INFO_SUCCESS: 'CONTACT_INFO_SUCCESS',
    CONTACT_INFO_FAILURE: 'CONTACT_INFO_FAILURE',

    ADD_CONTACT_INFO_REQUEST: 'ADD_CONTACT_INFO_REQUEST',
    ADD_CONTACT_INFO_SUCCESS: 'ADD_CONTACT_INFO_SUCCESS',
    ADD_CONTACT_INFO_FAILURE: 'ADD_CONTACT_INFO_FAILURE',

    REMOVE_CONTACT_INFO_REQUEST: 'REMOVE_CONTACT_INFO_REQUEST',
    REMOVE_CONTACT_INFO_SUCCESS: 'REMOVE_CONTACT_INFO_SUCCESS',
    REMOVE_CONTACT_INFO_FAILURE: 'REMOVE_CONTACT_INFO_FAILURE',

    IDENTITYPASS_ENDPOINTS_REQUEST: 'IDENTITYPASS_ENDPOINTS_REQUEST',
    IDENTITYPASS_ENDPOINTS_SUCCESS: 'IDENTITYPASS_ENDPOINTS_SUCCESS',
    IDENTITYPASS_ENDPOINTS_FAILURE: 'IDENTITYPASS_ENDPOINTS_FAILURE',

    IDENTITYPASS_VERIFICATION_REQUEST: 'IDENTITYPASS_VERIFICATION_REQUEST',
    IDENTITYPASS_VERIFICATION_SUCCESS: 'IDENTITYPASS_VERIFICATION_SUCCESS',
    IDENTITYPASS_VERIFICATION_FAILURE: 'IDENTITYPASS_VERIFICATION_FAILURE',

    IDENTITYPASS_BULK_VERIFICATION_REQUEST: 'IDENTITYPASS_BULK_VERIFICATION_REQUEST',
    IDENTITYPASS_BULK_VERIFICATION_SUCCESS: 'IDENTITYPASS_BULK_VERIFICATION_SUCCESS',
    IDENTITYPASS_BULK_VERIFICATION_FAILURE: 'IDENTITYPASS_BULK_VERIFICATION_FAILURE',

    IDENTITYPASS_BULK_HISTORY_REQUEST: 'IDENTITYPASS_BULK_HISTORY_REQUEST',
    IDENTITYPASS_BULK_HISTORY_SUCCESS: 'IDENTITYPASS_BULK_HISTORY_SUCCESS',
    IDENTITYPASS_BULK_HISTORY_FAILURE: 'IDENTITYPASS_BULK_HISTORY_FAILURE',

    IDENTITYPASS_WIDGET_CONFIG_REQUEST: 'IDENTITYPASS_WIDGET_CONFIG_REQUEST',
    IDENTITYPASS_WIDGET_CONFIG_SUCCESS: 'IDENTITYPASS_WIDGET_CONFIG_SUCCESS',
    IDENTITYPASS_WIDGET_CONFIG_FAILURE: 'IDENTITYPASS_WIDGET_CONFIG_FAILURE',

    IDENTITYPASS_WIDGET_SETTINGS_UPDATE_REQUEST: 'IDENTITYPASS_WIDGET_SETTINGS_UPDATE_REQUEST',
    IDENTITYPASS_WIDGET_SETTINGS_UPDATE_SUCCESS: 'IDENTITYPASS_WIDGET_SETTINGS_UPDATE_SUCCESS',
    IDENTITYPASS_WIDGET_SETTINGS_UPDATE_FAILURE: 'IDENTITYPASS_WIDGET_SETTINGS_UPDATE_FAILURE',

    IDENTITYPASS_WIDGET_GET_REQUEST: 'IDENTITYPASS_WIDGET_GET_REQUEST',
    IDENTITYPASS_WIDGET_GET_SUCCESS: 'IDENTITYPASS_WIDGET_GET_SUCCESS',
    IDENTITYPASS_WIDGET_GET_FAILURE: 'IDENTITYPASS_WIDGET_GET_FAILURE',

    IDENTITYPASS_WIDGET_CREATE_REQUEST: 'IDENTITYPASS_WIDGET_CREATE_REQUEST',
    IDENTITYPASS_WIDGET_CREATE_SUCCESS: 'IDENTITYPASS_WIDGET_CREATE_SUCCESS',
    IDENTITYPASS_WIDGET_CREATE_FAILURE: 'IDENTITYPASS_WIDGET_CREATE_FAILURE',

    IDENTITYPASS_WIDGET_UPDATE_REQUEST: 'IDENTITYPASS_WIDGET_UPDATE_REQUEST',
    IDENTITYPASS_WIDGET_UPDATE_SUCCESS: 'IDENTITYPASS_WIDGET_UPDATE_SUCCESS',
    IDENTITYPASS_WIDGET_UPDATE_FAILURE: 'IDENTITYPASS_WIDGET_UPDATE_FAILURE',

    IDENTITYPASS_WIDGET_DELETE_REQUEST: 'IDENTITYPASS_WIDGET_DELETE_REQUEST',
    IDENTITYPASS_WIDGET_DELETE_SUCCESS: 'IDENTITYPASS_WIDGET_DELETE_SUCCESS',
    IDENTITYPASS_WIDGET_DELETE_FAILURE: 'IDENTITYPASS_WIDGET_DELETE_FAILURE',

    RADAR_EMAIL_INTELLIGENCE_REQUEST: 'RADAR_EMAIL_INTELLIGENCE_REQUEST',
    RADAR_EMAIL_INTELLIGENCE_SUCCESS: 'RADAR_EMAIL_INTELLIGENCE_SUCCESS',
    RADAR_EMAIL_INTELLIGENCE_FAILURE: 'RADAR_EMAIL_INTELLIGENCE_FAILURE',

    RADAR_MOBILE_INTELLIGENCE_REQUEST: 'RADAR_MOBILE_INTELLIGENCE_REQUEST',
    RADAR_MOBILE_INTELLIGENCE_SUCCESS: 'RADAR_MOBILE_INTELLIGENCE_SUCCESS',
    RADAR_MOBILE_INTELLIGENCE_FAILURE: 'RADAR_MOBILE_INTELLIGENCE_FAILURE',

    RADAR_IP_INTELLIGENCE_REQUEST: 'RADAR_IP_INTELLIGENCE_REQUEST',
    RADAR_IP_INTELLIGENCE_SUCCESS: 'RADAR_IP_INTELLIGENCE_SUCCESS',
    RADAR_IP_INTELLIGENCE_FAILURE: 'RADAR_IP_INTELLIGENCE_FAILURE',

    RADAR_NAME_INTELLIGENCE_REQUEST: 'RADAR_NAME_INTELLIGENCE_REQUEST',
    RADAR_NAME_INTELLIGENCE_SUCCESS: 'RADAR_NAME_INTELLIGENCE_SUCCESS',
    RADAR_NAME_INTELLIGENCE_FAILURE: 'RADAR_NAME_INTELLIGENCE_FAILURE',


    
    BACKGROUND_CHECK_PACKAGE_GET_ALL_REQUEST: 'BACKGROUND_CHECK_PACKAGE_GET_ALL_REQUEST',
    BACKGROUND_CHECK_PACKAGE_GET_ALL_SUCCESS: 'BACKGROUND_CHECK_PACKAGE_GET_ALL_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_GET_ALL_FAILURE: 'BACKGROUND_CHECK_PACKAGE_GET_ALL_FAILURE',

    BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_REQUEST:
        'BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_REQUEST',
    BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUCCESS:
        'BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_FAILURE:
        'BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_FAILURE',

    BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_REQUEST:
        'BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_REQUEST',
    BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_SUCCESS:
        'BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_FAILURE:
        'BACKGROUND_CHECK_PACKAGE_GET_BASE_CHECKS_SUBSERVICE_FAILURE',

    BACKGROUND_CHECK_PACKAGE_CREATE_REQUEST: 'BACKGROUND_CHECK_PACKAGE_CREATE_REQUEST',
    BACKGROUND_CHECK_PACKAGE_CREATE_SUCCESS: 'BACKGROUND_CHECK_PACKAGE_CREATE_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_CREATE_FAILURE: 'BACKGROUND_CHECK_PACKAGE_CREATE_FAILURE',

    BACKGROUND_CHECK_PACKAGE_UPDATE_REQUEST: 'BACKGROUND_CHECK_PACKAGE_UPDATE_REQUEST',
    BACKGROUND_CHECK_PACKAGE_UPDATE_SUCCESS: 'BACKGROUND_CHECK_PACKAGE_UPDATE_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_UPDATE_FAILURE: 'BACKGROUND_CHECK_PACKAGE_UPDATE_FAILURE',

    BACKGROUND_CHECK_PACKAGE_FILTER_REQUEST: 'BACKGROUND_CHECK_PACKAGE_FILTER_REQUEST',
    BACKGROUND_CHECK_PACKAGE_FILTER_SUCCESS: 'BACKGROUND_CHECK_PACKAGE_FILTER_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_FILTER_FAILURE: 'BACKGROUND_CHECK_PACKAGE_FILTER_FAILURE',

    BACKGROUND_CHECK_PACKAGE_GET_SINGLE_REQUEST: 'BACKGROUND_CHECK_PACKAGE_GET_SINGLE_REQUEST',
    BACKGROUND_CHECK_PACKAGE_GET_SINGLE_SUCCESS: 'BACKGROUND_CHECK_PACKAGE_GET_SINGLE_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_GET_SINGLE_FAILURE: 'BACKGROUND_CHECK_PACKAGE_GET_SINGLE_FAILURE',

    BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_REQUEST: 'BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_REQUEST',
    BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_SUCCESS: 'BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_FAILURE: 'BACKGROUND_CHECK_PACKAGE_GET_ACTIVE_FAILURE',

    BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_REQUEST:
        'BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_REQUEST',
    BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_SUCCESS:
        'BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_SUCCESS',
    BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_FAILURE:
        'BACKGROUND_CHECK_PACKAGE_CHANGE_STATUS_FAILURE',

    BACKGROUND_CHECK_REQUEST_GET_ALL_REQUEST: 'BACKGROUND_CHECK_REQUEST_GET_ALL_REQUEST',
    BACKGROUND_CHECK_REQUEST_GET_ALL_SUCCESS: 'BACKGROUND_CHECK_REQUEST_GET_ALL_SUCCESS',
    BACKGROUND_CHECK_REQUEST_GET_ALL_FAILURE: 'BACKGROUND_CHECK_REQUEST_GET_ALL_FAILURE',

    BACKGROUND_CHECK_REQUEST_INITIATE_REQUEST: 'BACKGROUND_CHECK_REQUEST_INITIATE_REQUEST',
    BACKGROUND_CHECK_REQUEST_INITIATE_SUCCESS: 'BACKGROUND_CHECK_REQUEST_INITIATE_SUCCESS',
    BACKGROUND_CHECK_REQUEST_INITIATE_FAILURE: 'BACKGROUND_CHECK_REQUEST_INITIATE_FAILURE',

    BACKGROUND_CHECK_REQUEST_CONSENT_REQUEST: 'BACKGROUND_CHECK_REQUEST_CONSENT_REQUEST',
    BACKGROUND_CHECK_REQUEST_CONSENT_SUCCESS: 'BACKGROUND_CHECK_REQUEST_CONSENT_SUCCESS',
    BACKGROUND_CHECK_REQUEST_CONSENT_FAILURE: 'BACKGROUND_CHECK_REQUEST_CONSENT_FAILURE',

    BACKGROUND_CHECK_REQUEST_FILTER_REQUEST: 'BACKGROUND_CHECK_REQUEST_FILTER_REQUEST',
    BACKGROUND_CHECK_REQUEST_FILTER_SUCCESS: 'BACKGROUND_CHECK_REQUEST_FILTER_SUCCESS',
    BACKGROUND_CHECK_REQUEST_FILTER_FAILURE: 'BACKGROUND_CHECK_REQUEST_FILTER_FAILURE',

    BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_REQUEST:
        'BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_REQUEST',
    BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_SUCCESS:
        'BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_SUCCESS',
    BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_FAILURE:
        'BACKGROUND_CHECK_REQUEST_GET_CANDIDATE_FORM_FAILURE',

    BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_REQUEST:
        'BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_REQUEST',
    BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_SUCCESS:
        'BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_SUCCESS',
    BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_FAILURE:
        'BACKGROUND_CHECK_REQUEST_ANSWER_UPLOAD_FAILURE',

    BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_REQUEST:
        'BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_REQUEST',
    BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_SUCCESS:
        'BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_SUCCESS',
    BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_FAILURE:
        'BACKGROUND_CHECK_REQUEST_REPORT_OVERVIEW_FAILURE',

    BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_REQUEST:
        'BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_REQUEST',
    BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_SUCCESS:
        'BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_SUCCESS',
    BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_FAILURE:
        'BACKGROUND_CHECK_REQUEST_REPORT_CHECKLIST_FAILURE',

    BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_REQUEST : 'BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_REQUEST',
    BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_SUCCESS : 'BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_SUCCESS',
    BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_FAILURE : 'BACKGROUND_CHECK_REQUEST_VALIDATE_CANDIDATE_FORM_FAILURE',

    BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_REQUEST : 'BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_REQUEST',
    BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_SUCCESS : 'BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_SUCCESS',
    BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_FAILURE : 'BACKGROUND_CHECK_REQUEST_CREATE_CANDIDATE_FORM_FAILURE',

    BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_REQUEST:
        'BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_REQUEST',
    BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_SUCCESS:
        'BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_SUCCESS',
    BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_FAILURE:
        'BACKGROUND_CHECK_REQUEST_REPORT_DETAIL_FAILURE',

    BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_REQUEST:
        'BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_REQUEST',
    BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_SUCCESS:
        'BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_SUCCESS',
    BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_FAILURE:
        'BACKGROUND_CHECK_REQUEST_REPORT_SET_STATUS_FAILURE',

    BACKGROUND_CHECK_REQUEST_GET_PRICE_REQUEST: 'BACKGROUND_CHECK_REQUEST_GET_PRICE_REQUEST',
    BACKGROUND_CHECK_REQUEST_GET_PRICE_SUCCESS: 'BACKGROUND_CHECK_REQUEST_GET_PRICE_SUCCESS',
    BACKGROUND_CHECK_REQUEST_GET_PRICE_FAILURE: 'BACKGROUND_CHECK_REQUEST_GET_PRICE_FAILURE',

    BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_REQUEST: 'BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_REQUEST',
    BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_SUCCESS: 'BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_SUCCESS',
    BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_FAILURE: 'BACKGROUND_CHECK_REQUEST_MAKE_PAYMENT_FAILURE',



    REGENERATE_LIVE_KEY_REQUEST: 'REGENERATE_LIVE_KEY_REQUEST',
    REGENERATE_LIVE_KEY_SUCCESS: 'REGENERATE_LIVE_KEY_SUCCESS',
    REGENERATE_LIVE_KEY_FAILURE: 'REGENERATE_LIVE_KEY_FAILURE',

    REGENERATE_SANDBOX_KEY_REQUEST: 'REGENERATE_SANDBOX_KEY_REQUEST',
    REGENERATE_SANDBOX_KEY_SUCCESS: 'REGENERATE_SANDBOX_KEY_SUCCESS',
    REGENERATE_SANDBOX_KEY_FAILURE: 'REGENERATE_SANDBOX_KEY_FAILURE',

    APPLICATION_INFO_REQUEST: 'APPLICATION_INFO_REQUEST',
    APPLICATION_INFO_SUCCESS: 'APPLICATION_INFO_SUCCESS',
    APPLICATION_INFO_FAILURE: 'APPLICATION_INFO_FAILURE',

    CREATE_APPLICATION_REQUEST: 'CREATE_APPLICATION_REQUEST',
    CREATE_APPLICATION_SUCCESS: 'CREATE_APPLICATION_SUCCESS',
    CREATE_APPLICATION_FAILURE: 'CREATE_APPLICATION_FAILURE',

    EDIT_APPLICATION_REQUEST: 'EDIT_APPLICATION_REQUEST',
    EDIT_APPLICATION_SUCCESS: 'EDIT_APPLICATION_SUCCESS',
    EDIT_APPLICATION_FAILURE: 'EDIT_APPLICATION_FAILURE',

    GET_APPLICATION_TEAM_MEMBERS_INFO_REQUEST: 'GET_APPLICATION_TEAM_MEMBERS_INFO_REQUEST',
    GET_APPLICATION_TEAM_MEMBERS_INFO_SUCCESS: 'GET_APPLICATION_TEAM_MEMBERS_INFO_SUCCESS',
    GET_APPLICATION_TEAM_MEMBERS_INFO_FAILURE: 'GET_APPLICATION_TEAM_MEMBERS_INFO_FAILURE',

    API_STATUS_REQUEST: 'API_STATUS_REQUEST',
    API_STATUS_SUCCESS: 'API_STATUS_SUCCESS',
    API_STATUS_FAILURE: 'API_STATUS_FAILURE',

    UPDATE_WEBHOOK_URL_REQUEST: 'UPDATE_WEBHOOK_URL_REQUEST',
    UPDATE_WEBHOOK_URL_SUCCESS: 'UPDATE_WEBHOOK_URL_SUCCESS',
    UPDATE_WEBHOOK_URL_FAILURE: 'UPDATE_WEBHOOK_URL_FAILURE',

    API_REPORT_REQUEST: 'API_REPORT_REQUEST',
    API_REPORT_SUCCESS: 'API_REPORT_SUCCESS',
    API_REPORT_FAILURE: 'API_REPORT_FAILURE',

    API_SEARCH_REPORT_REQUEST: 'API_SEARCH_REPORT_REQUEST',
    API_SEARCH_REPORT_SUCCESS: 'API_SEARCH_REPORT_SUCCESS',
    API_SEARCH_REPORT_FAILURE: 'API_SEARCH_REPORT_FAILURE',

    API_FILTER_REPORT_REQUEST: 'API_FILTER_REPORT_REQUEST',
    API_FILTER_REPORT_SUCCESS: 'API_FILTER_REPORT_SUCCESS',
    API_FILTER_REPORT_FAILURE: 'API_FILTER_REPORT_FAILURE',

    API_REPORT_PRODUCTS_REQUEST: 'API_REPORT_PRODUCTS_REQUEST',
    API_REPORT_PRODUCTS_SUCCESS: 'API_REPORT_PRODUCTS_SUCCESS',
    API_REPORT_PRODUCTS_FAILURE: 'API_REPORT_PRODUCTS_FAILURE',

    API_REPORT_ACTIVITIES_REQUEST: 'API_REPORT_ACTIVITIES_REQUEST',
    API_REPORT_ACTIVITIES_SUCCESS: 'API_REPORT_ACTIVITIES_SUCCESS',
    API_REPORT_ACTIVITIES_FAILURE: 'API_REPORT_ACTIVITIES_FAILURE',

    API_GENERATE_REPORT_LOG_REQUEST: 'API_GENERATE_REPORT_LOG_REQUEST',
    API_GENERATE_REPORT_LOG_SUCCESS: 'API_GENERATE_REPORT_LOG_SUCCESS',
    API_GENERATE_REPORT_LOG_FAILURE: 'API_GENERATE_REPORT_LOG_FAILURE',

    CUSTOMER_REPORT_REQUEST: 'CUSTOMER_REPORT_REQUEST',
    CUSTOMER_REPORT_SUCCESS: 'CUSTOMER_REPORT_SUCCESS',
    CUSTOMER_REPORT_FAILURE: 'CUSTOMER_REPORT_FAILURE',

    API_PERKS_DISCOUNT_REQUEST: 'API_PERKS_DISCOUNT_REQUEST',
    API_PERKS_DISCOUNT_SUCCESS: 'API_PERKS_DISCOUNT_SUCCESS',
    API_PERKS_DISCOUNT_FAILURE: 'API_PERKS_DISCOUNT_FAILURE',

    API_SEARCH_PERKS_DISCOUNT_REQUEST: 'API_SEARCH_PERKS_DISCOUNT_REQUEST',
    API_SEARCH_PERKS_DISCOUNT_SUCCESS: 'API_SEARCH_PERKS_DISCOUNT_SUCCESS',
    API_SEARCH_PERKS_DISCOUNT_FAILURE: 'API_SEARCH_PERKS_DISCOUNT_FAILURE',

    API_FAVOURITES_PERKS_DISCOUNT_REQUEST: 'API_FAVOURITES_PERKS_DISCOUNT_REQUEST',
    API_FAVOURITES_PERKS_DISCOUNT_SUCCESS: 'API_FAVOURITES_PERKS_DISCOUNT_SUCCESS',
    API_FAVOURITES_PERKS_DISCOUNT_FAILURE: 'API_FAVOURITES_PERKS_DISCOUNT_FAILURE',

    ADD_FAVOURITES_PERKS_DISCOUNT_REQUEST: ' ADD_FAVOURITES_PERKS_DISCOUNT_REQUEST',
    ADD_FAVOURITES_PERKS_DISCOUNT_SUCCESS: ' ADD_FAVOURITES_PERKS_DISCOUNT_SUCCESS',
    ADD_FAVOURITES_PERKS_DISCOUNT_FAILURE: ' ADD_FAVOURITES_PERKS_DISCOUNT_FAILURE',

    ECOMMERCE_PERKS_DISCOUNT_REQUEST: ' ECOMMERCE_PERKS_DISCOUNT_REQUEST',
    ECOMMERCE_PERKS_DISCOUNT_SUCCESS: ' ECOMMERCE_PERKS_DISCOUNT_SUCCESS',
    ECOMMERCE_PERKS_DISCOUNT_FAILURE: ' ECOMMERCE_PERKS_DISCOUNT_FAILURE',

    SALES_MARKET_PERKS_DISCOUNT_REQUEST: 'SALES_MARKET_PERKS_DISCOUNT_REQUEST',
    SALES_MARKET_PERKS_DISCOUNT_SUCCESS: 'SALES_MARKET_PERKS_DISCOUNT_SUCCESS',
    SALES_MARKET_PERKS_DISCOUNT_FAILURE: 'SALES_MARKET_PERKS_DISCOUNT_FAILURE',

    DEVELOPER_TOOLS_PERKS_DISCOUNT_REQUEST: '  DEVELOPER_TOOLS_PERKS_DISCOUNT_REQUEST',
    DEVELOPER_TOOLS_PERKS_DISCOUNT_SUCCESS: '  DEVELOPER_TOOLS_PERKS_DISCOUNT_SUCCESS',
    DEVELOPER_TOOLS_PERKS_DISCOUNT_FAILURE: '  DEVELOPER_TOOLS_PERKS_DISCOUNT_FAILURE',

    FINANCE_PERKS_DISCOUNT_REQUEST: ' FINANCE_PERKS_DISCOUNT_REQUEST',
    FINANCE_PERKS_DISCOUNT_SUCCESS: ' FINANCE_PERKS_DISCOUNT_SUCCESS',
    FINANCE_PERKS_DISCOUNT_FAILURE: ' FINANCE_PERKS_DISCOUNT_FAILURE',

    FUNDING_PERKS_DISCOUNT_REQUEST: ' FUNDING_PERKS_DISCOUNT_REQUEST',
    FUNDING_PERKS_DISCOUNT_SUCCESS: ' FUNDING_PERKS_DISCOUNT_SUCCESS',
    FUNDING_PERKS_DISCOUNT_FAILURE: ' FUNDING_PERKS_DISCOUNT_FAILURE',

    API_ALL_PERKS_DISCOUNT_REQUEST: ' API_ALL_PERKS_DISCOUNT_REQUEST',
    API_ALL_PERKS_DISCOUNT_SUCCESS: ' API_ALL_PERKS_DISCOUNT_SUCCESS',
    API_ALL_PERKS_DISCOUNT_FAILURE: ' API_ALL_PERKS_DISCOUNT_FAILURE',

    SUB_PLANS_REQUEST: 'SUB_PLANS_REQUEST',
    SUB_PLANS_SUCCESS: 'SUB_PLANS_SUCCESS',
    SUB_PLANS_FAILURE: 'SUB_PLANS_FAILURE',

    SUB_PLANS_BY_TENURE_REQUEST: 'SUB_PLANS_BY_TENURE_REQUEST',
    SUB_PLANS_BY_TENURE_SUCCESS: 'SUB_PLANS_BY_TENURE_SUCCESS',
    SUB_PLANS_BY_TENURE_FAILURE: 'SUB_PLANS_BY_TENURE_FAILURE',

    SUBSCRIPTION_REQUEST: 'SUBSCRIPTION_REQUEST',
    SUBSCRIPTION_SUCCESS: 'SUBSCRIPTION_SUCCESS',
    SUBSCRIPTION_FAILURE: 'SUBSCRIPTION_FAILURE',

    SUB_LOGS_REQUEST: 'SUB_LOGS_REQUEST',
    SUB_LOGS_SUCCESS: 'SUB_LOGS_SUCCESS',
    SUB_LOGS_FAILURE: 'SUB_LOGS_FAILURE',

    CURRENT_SUB_REQUEST: 'CURRENT_SUB_REQUEST',
    CURRENT_SUB_SUCCESS: 'CURRENT_SUB_SUCCESS',
    CURRENT_SUB_FAILURE: 'CURRENT_SUB_FAILURE',

    SUB_PRICING_REQUEST: 'SUB_PRICING_REQUEST',
    SUB_PRICING_SUCCESS: 'SUB_PRICING_SUCCESS',
    SUB_PRICING_FAILURE: 'SUB_PRICING_FAILURE',

    REFERRAL_COMMISSION_BALANCE_REQUEST: 'REFERRAL_COMMISSION_BALANCE_REQUEST',
    REFERRAL_COMMISSION_BALANCE_SUCCESS: 'REFERRAL_COMMISSION_BALANCE_SUCCESS',
    REFERRAL_COMMISSION_BALANCE_FAILURE: 'REFERRAL_COMMISSION_BALANCE_FAILURE',

    REFERRAL_HISTORY_REQUEST: 'REFERRAL_HISTORY_REQUEST',
    REFERRAL_HISTORY_SUCCESS: 'REFERRAL_HISTORY_SUCCESS',
    REFERRAL_HISTORY_FAILURE: 'REFERRAL_HISTORY_FAILURE',

    REFERRAL_OVERVIEW_REQUEST: 'REFERRAL_OVERVIEW_REQUEST',
    REFERRAL_OVERVIEW_SUCCESS: 'REFERRAL_OVERVIEW_SUCCESS',
    REFERRAL_OVERVIEW_FAILURE: 'REFERRAL_OVERVIEW_FAILURE',

    REFERRAL_LINK_REQUEST: 'REFERRAL_LINK_REQUEST',
    REFERRAL_LINK_SUCCESS: 'REFERRAL_LINK_SUCCESS',
    REFERRAL_LINK_FAILURE: 'REFERRAL_LINK_FAILURE',

    ALL_REFEREES_REQUEST: 'ALL_REFEREES_REQUEST',
    ALL_REFEREES_SUCCESS: 'ALL_REFEREES_SUCCESS',
    ALL_REFEREES_FAILURE: 'ALL_REFEREES_FAILURE',

    REFERRAL_REPORT_REQUEST: 'REFERRAL_REPORT_REQUEST',
    REFERRAL_REPORT_SUCCESS: 'REFERRAL_REPORT_SUCCESS',
    REFERRAL_REPORT_FAILURE: 'REFERRAL_REPORT_FAILURE',

    REFERRAL_COMMISSION_WITHDRAWAL_REQUEST: 'REFERRAL_COMMISSION_WITHDRAWAL_REQUEST',
    REFERRAL_COMMISSION_WITHDRAWAL_SUCCESS: 'REFERRAL_COMMISSION_WITHDRAWAL_SUCCESS',
    REFERRAL_COMMISSION_WITHDRAWAL_FAILURE: 'REFERRAL_COMMISSION_WITHDRAWAL_FAILURE',

    REFERRAL_GRAPH_REQUEST: 'REFERRAL_GRAPH_REQUEST',
    REFERRAL_GRAPH_SUCCESS: 'REFERRAL_GRAPH_SUCCESS',
    REFERRAL_GRAPH_FAILURE: 'REFERRAL_GRAPH_FAILURE',

    REFERRAL_FEEDBACK_REQUEST: 'REFERRAL_FEEDBACK_REQUEST',
    REFERRAL_FEEDBACK_SUCCESS: 'REFERRAL_FEEDBACK_SUCCESS',
    REFERRAL_FEEDBACK_FAILURE: 'REFERRAL_FEEDBACK_FAILURE',

    NOTIFICATIONS_INFO_REQUEST: 'NOTIFICATIONS_INFO_REQUEST',
    NOTIFICATIONS_INFO_SUCCESS: 'NOTIFICATIONS_INFO_SUCCESS',
    NOTIFICATIONS_INFO_FAILURE: 'COMPLIANCE_DOC_INFO_FAILURE',

    READ_NOTIFICATION_REQUEST: 'READ_NOTIFICATION_REQUEST',
    READ_NOTIFICATION_SUCCESS: 'READ_NOTIFICATION_SUCCESS',
    READ_NOTIFICATION_FAILURE: 'READ_NOTIFICATION_FAILURE',

    COMPLIANCE_DOC_INFO_REQUEST: 'COMPLIANCE_DOC_INFO_REQUEST',
    COMPLIANCE_DOC_INFO_SUCCESS: 'COMPLIANCE_DOC_INFO_SUCCESS',
    COMPLIANCE_DOC_INFO_FAILURE: 'COMPLIANCE_DOC_INFO_FAILURE',

    POLICY_GET_REQUEST: 'POLICY_GET_REQUEST',
    POLICY_GET_SUCCESS: 'POLICY_GET_SUCCESS',
    POLICY_GET_FAILURE: 'POLICY_GET_FAILURE',

    POLICY_TEMPLATE_CREATE_REQUEST: 'POLICY_TEMPLATE_CREATE_REQUEST',
    POLICY_TEMPLATE_CREATE_SUCCESS: 'POLICY_TEMPLATE_CREATE_SUCCESS',
    POLICY_TEMPLATE_CREATE_FAILURE: 'POLICY_TEMPLATE_CREATE_FAILURE',

    POLICY_TEMPLATE_GET_REQUEST: 'POLICY_TEMPLATE_GET_REQUEST',
    POLICY_TEMPLATE_GET_SUCCESS: 'POLICY_TEMPLATE_GET_SUCCESS',
    POLICY_TEMPLATE_GET_FAILURE: 'POLICY_TEMPLATE_GET_FAILURE',

    POLICY_TEMPLATE_ADOPT_REQUEST: 'POLICY_TEMPLATE_ADOPT_REQUEST',
    POLICY_TEMPLATE_ADOPT_SUCCESS: 'POLICY_TEMPLATE_ADOPT_SUCCESS',
    POLICY_TEMPLATE_ADOPT_FAILURE: 'POLICY_TEMPLATE_ADOPT_FAILURE',

    POLICY_DELETE_REQUEST: 'POLICY_DELETE_REQUEST',
    POLICY_DELETE_SUCCESS: 'POLICY_DELETE_SUCCESS',
    POLICY_DELETE_FAILURE: 'POLICY_DELETE_FAILURE',

    POLICY_EDIT_REQUEST: 'POLICY_EDIT_REQUEST',
    POLICY_EDIT_SUCCESS: 'POLICY_EDIT_SUCCESS',
    POLICY_EDIT_FAILURE: 'POLICY_EDIT_FAILURE',

    POLICY_PARTIAL_UPDATE_REQUEST: 'POLICY_PARTIAL_UPDATE_REQUEST',
    POLICY_PARTIAL_UPDATE_SUCCESS: 'POLICY_PARTIAL_UPDATE_SUCCESS',
    POLICY_PARTIAL_UPDATE_FAILURE: 'POLICY_PARTIAL_UPDATE_FAILURE',

    POLICY_DOWNLOAD_REQUEST: 'POLICY_DOWNLOAD_REQUEST',
    POLICY_DOWNLOAD_SUCCESS: 'POLICY_DOWNLOAD_SUCCESS',
    POLICY_DOWNLOAD_FAILURE: 'POLICY_DOWNLOAD_FAILURE',

    PERKS_AND_DISCOUNT_INFO_REQUEST: 'PERKS_AND_DISCOUNT_INFO_REQUEST',
    PERKS_AND_DISCOUNT_INFO_SUCCESS: 'PERKS_AND_DISCOUNT_INFO_SUCCESS',
    PERKS_AND_DISCOUNT_INFO_FAILURE: 'PERKS_AND_DISCOUNT_INFO_FAILURE',

    PERKS_AND_DISCOUNT_LIKE_REQUEST: 'PERKS_AND_DISCOUNT_LIKE_REQUEST',
    PERKS_AND_DISCOUNT_LIKE_SUCCESS: 'PERKS_AND_DISCOUNT_LIKE_SUCCESS',
    PERKS_AND_DISCOUNT_LIKE_FAILURE: 'PERKS_AND_DISCOUNT_LIKE_FAILURE',

    PERKS_AND_DISCOUNT_UNLIKE_REQUEST: 'PERKS_AND_DISCOUNT_UNLIKE_REQUEST',
    PERKS_AND_DISCOUNT_UNLIKE_SUCCESS: 'PERKS_AND_DISCOUNT_UNLIKE_SUCCESS',
    PERKS_AND_DISCOUNT_UNLIKE_FAILURE: 'PERKS_AND_DISCOUNT_UNLIKE_FAILURE',

    PERKS_AND_DISCOUNT_PRODUCT_DETAILS_REQUEST: 'PERKS_AND_DISCOUNT_PRODUCT_DETAILS_REQUEST',
    PERKS_AND_DISCOUNT_PRODUCT_DETAILS_SUCCESS: 'PERKS_AND_DISCOUNT_PRODUCT_DETAILS_SUCCESS',
    PERKS_AND_DISCOUNT_PRODUCT_DETAILS_FAILURE: 'PERKS_AND_DISCOUNT_PRODUCT_DETAILS_FAILURE',

    PERKS_AND_DISCOUNT_FAVORITE_REQUEST: 'PERKS_AND_DISCOUNT_FAVORITE_REQUEST',
    PERKS_AND_DISCOUNT_FAVORITE_SUCCESS: 'PERKS_AND_DISCOUNT_FAVORITE_SUCCESS',
    PERKS_AND_DISCOUNT_FAVORITE_FAILURE: 'PERKS_AND_DISCOUNT_FAVORITE_FAILURE',

    PERKS_AND_DISCOUNT_GENERATE_CODE_REQUEST: 'PERKS_AND_DISCOUNT_GENERATE_CODE_REQUEST',
    PERKS_AND_DISCOUNT_GENERATE_CODE_SUCCESS: 'PERKS_AND_DISCOUNT_GENERATE_CODE_SUCCESS',
    PERKS_AND_DISCOUNT_GENERATE_CODE_FAILURE: 'PERKS_AND_DISCOUNT_GENERATE_CODE_FAILURE',

    PERKS_AND_DISCOUNT_CLOSE_BANNER_REQUEST: 'PERKS_AND_DISCOUNT_CLOSE_BANNER_REQUEST',
    PERKS_AND_DISCOUNT_CLOSE_BANNER_SUCCESS: 'PERKS_AND_DISCOUNT_CLOSE_BANNER_SUCCESS',
    PERKS_AND_DISCOUNT_CLOSE_BANNER_FAILURE: 'PERKS_AND_DISCOUNT_CLOSE_BANNER_FAILURE',

    FAQ_REQUEST: 'FAQ_REQUEST',
    FAQ_SUCCESS: 'FAQ_SUCCESS',
    FAQ_FAILURE: 'FAQ_FAILURE',
}
