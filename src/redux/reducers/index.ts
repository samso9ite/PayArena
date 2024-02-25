// import { apiPerkDiscountReducer } from './reports/index';
import { combineReducers } from 'redux'
import loginReducer from './auth/login'
import { initSignUpReducer, clearSignUpEmailReducer } from './auth/signUp/initialize'
import { confirmSignUpReducer, resendSignUpOTPReducer } from './auth/signUp/confirm'
import setPasswordReducer from './auth/signUp/setPassword'
import initResetPasswordReducer from './auth/resetPassword/initializeResetPassword'
import confirmResetPasswordReducer from './auth/resetPassword/confirmResetPassword'
import acceptInviteReducer from './auth/acceptInvite/'
import {accessTokenInfoReducer, migrationSetPasswordReducer} from './accessToken/'
import {tourGuideReducer} from './tourGuide'
import { 
    dashboardInfoReducer, 
    announcementReducer, 
    viewAnnouncementReducer,
    acceptIndemnityFormReducer
} from './dashboard'
import {
    walletHistoryReducer,
    cardInfoReducer,
    addCardReducer,
    setDefaultCardReducer,
    removeCardReducer,
    setThresholdReducer,
    virtualAccountInfoReducer,
    topUpWalletReducer,
    mpesaTopUpWalletReducer,
    // paystackTopUpWalletReducer,
    // flutterwaveTopUpWalletReducer,
    walletToWalletTransferReducer,
} from './wallet'
import {
    myOrganisationInfoReducer,
    createMyOrganisationInfoReducer,
    updateMyOrganisationInfoReducer,
} from './myOrganisation'
import {
    regenerateLiveKeyReducer,
    regenerateSandboxKeyReducer,
} from './apiLibraries/apiKeys'
import {
    applicationInfoReducer,
    createApplicationReducer,
    editApplicationReducer,
    getAppTeamMembersInfoReducer
} from './apiLibraries/applications'
import { apiStatusReducer } from './apiLibraries/status'
import { updateWebhookUrlReducer } from './sdkLibraries'
import { updateProfileInfoReducer, updateUserPasswordReducer } from './settings/profileInfo'
import { organisationInfoReducer, updateOrganisationInfoReducer } from './settings/organisationInfo'
import {
    organizationModuleReducer,
    organizationRoleReducer,
    createUserRoleReducer,
    updateUserRoleReducer,
} from './settings/roles'
import {
    preferenceInfoReducer,
    updatePreferenceInfoReducer,
    contactInfoReducer,
    addContactInfoReducer,
    removeContactInfoReducer,
} from './settings/notificationSettings'
import {
    teamInfoReducer,
    createTeamMemberReducer,
    activateTeamMemberReducer,
    deactivateTeamMemberReducer,
    deleteTeamMemberReducer,
    changeTeamMemberRoleReducer,
} from './settings/team'
import {
    identitypassVerificationReducer,
    identitypassEndpointsReducer,
    identitypassBulkVerificationReducer,
    identitypassBulkHistoryReducer,
} from './products/identitypass/verification'
import {
    identityPassCreateWidgetReducer,
    identityPassDeleteWidgetReducer,
    identityPassEndpointsReducer,
    identityPassGetWidgetReducer,
    identityPassGetWidgetsReducer,
    identityPassUpdateWidgetReducer,
} from './products/identitypass/checker-widget'
import {
    radarEmailIntelligenceReducer,
    radarMobileIntelligenceReducer,
    radarIpIntelligenceReducer,
    radarNameIntelligenceReducer,
} from './products/identityradar/radarCheck'
import {
    backgroundCheckPackageGetAllReducer,
    backgroundCheckPackageGetBaseChecksReducer,
    backgroundCheckPackageGetBaseChecksSubserviceReducer,
    backgroundCheckPackageCreateReducer,
    backgroundCheckPackageUpdateReducer,
    backgroundCheckPackageFilterReducer,
    backgroundCheckPackageGetSingleReducer,
    backgroundCheckPackageGetActiveReducer,
    backgroundCheckPackageChangeStatusReducer,
} from './products/backgroundCheck/package'
import {
    backgroundCheckRequestGetAllReducer,
    backgroundCheckRequestInitiateReducer,
    backgroundCheckRequestConsentReducer,
    backgroundCheckRequestFilterReducer,
} from './products/backgroundCheck/request/general'
import {
    backgroundCheckRequestGetCandidateFormReducer,
    backgroundCheckRequestValidateCandidateFormReducer,
    backgroundCheckRequestCreateCandidateFormReducer,
    backgroundCheckRequestAnswerUploadReducer,
    backgroundCheckRequestReportOverviewReducer,
    backgroundCheckRequestReportChecklistReducer,
    backgroundCheckRequestReportDetailReducer,
    backgroundCheckRequestReportSetStatusReducer,
    backgroundCheckRequestGetPriceReducer,
    backgroundCheckRequestMakePaymentReducer,
} from './products/backgroundCheck/request/checks'
import {
    apiReportReducer,
    apiReportProductsReducer,
    apiReportActivitiesReducer,
    apiGenerateReportLogsReducer,
    customerReportReducer,
} from './reports'
// import {
//     apiPerksDiscountReducer,
//     apiAllPerksDiscountReducer,
//     addFavouritesPerksDiscountReducer,
//     searchPerksDiscountReducer,
//     ecommercePerksDiscountReducer,
//     salesMarketPerksDiscountReducer,
//     financePerksDiscountReducer,
//     developerToolsPerksDiscountReducer,
//     fundingPerksDiscountReducer,
//     apiFavouritesPerksDiscountReducer
// } from './perkDiscount'
import {
    subPlansReducer,
    subPlansByTenureReducer,
    subscriptionReducer,
    subLogsReducer,
    currentSubReducer,
    subPricingReducer,
} from './subscription'
import {
    referralCommissionBalanceReducer,
    referralHistoryReducer,
    referralOverviewReducer,
    referralLinkReducer,
    allRefereesReducer,
    referralReportReducer,
    referralCommissionWithdrawalReducer,
    referralGraphReducer,
    referralFeedbackReducer,
} from './referral'
import { notificationsInfoReducer, readNotificationReducer } from './notifications'
import { complianceDocInfoReducer } from './complianceCert'
import { perksAndDiscountInfoReducer } from './perksAndDiscount'

// import {getPolicyReducer, getPolicyTemplateReducer, adoptPolicyTemplateReducer, createPolicyTemplateReducer, deletePolicyReducer, editPolicyReducer, partialUpdatePolicyReducer} from './policies'

export const rootReducers = combineReducers({
    loginReducer,
    initSignUpReducer,
    clearSignUpEmailReducer,
    confirmSignUpReducer,
    resendSignUpOTPReducer,
    setPasswordReducer,
    initResetPasswordReducer,
    confirmResetPasswordReducer,
    acceptInviteReducer,
    accessTokenInfoReducer,
    migrationSetPasswordReducer,



    tourGuideReducer,
    dashboardInfoReducer,
    announcementReducer,
    viewAnnouncementReducer,
    acceptIndemnityFormReducer,
    walletHistoryReducer,
    cardInfoReducer,
    addCardReducer,
    setDefaultCardReducer,
    removeCardReducer,
    setThresholdReducer,
    virtualAccountInfoReducer,
    topUpWalletReducer,
    mpesaTopUpWalletReducer,
    walletToWalletTransferReducer,
    myOrganisationInfoReducer,
    createMyOrganisationInfoReducer,
    updateMyOrganisationInfoReducer,
    organisationInfoReducer,
    updateOrganisationInfoReducer,
    updateUserPasswordReducer,
    updateProfileInfoReducer,
    regenerateLiveKeyReducer,
    regenerateSandboxKeyReducer,
    applicationInfoReducer,
    createApplicationReducer,
    editApplicationReducer,
    getAppTeamMembersInfoReducer,
    apiStatusReducer,
    updateWebhookUrlReducer,
    organizationModuleReducer,
    organizationRoleReducer,
    createUserRoleReducer,
    updateUserRoleReducer,
    preferenceInfoReducer,
    updatePreferenceInfoReducer,
    contactInfoReducer,
    addContactInfoReducer,
    removeContactInfoReducer,
    teamInfoReducer,
    createTeamMemberReducer,
    changeTeamMemberRoleReducer,
    activateTeamMemberReducer,
    deactivateTeamMemberReducer,
    deleteTeamMemberReducer,



    identitypassVerificationReducer,
    identitypassEndpointsReducer,
    identitypassBulkVerificationReducer,
    identitypassBulkHistoryReducer,
    identityPassCreateWidgetReducer,
    identityPassUpdateWidgetReducer,
    identityPassDeleteWidgetReducer,
    identityPassGetWidgetsReducer,
    identityPassGetWidgetReducer,
    identityPassEndpointsReducer,


    radarEmailIntelligenceReducer,
    radarMobileIntelligenceReducer,
    radarIpIntelligenceReducer,
    radarNameIntelligenceReducer,


    backgroundCheckPackageGetAllReducer,
    backgroundCheckPackageGetBaseChecksReducer,
    backgroundCheckPackageGetBaseChecksSubserviceReducer,
    backgroundCheckPackageCreateReducer,
    backgroundCheckPackageUpdateReducer,
    backgroundCheckPackageFilterReducer,
    backgroundCheckPackageGetSingleReducer,
    backgroundCheckPackageGetActiveReducer,
    backgroundCheckPackageChangeStatusReducer,

    backgroundCheckRequestGetAllReducer,
    backgroundCheckRequestInitiateReducer,
    backgroundCheckRequestConsentReducer,
    backgroundCheckRequestFilterReducer,

    backgroundCheckRequestGetCandidateFormReducer,
    backgroundCheckRequestValidateCandidateFormReducer,
    backgroundCheckRequestCreateCandidateFormReducer,
    backgroundCheckRequestAnswerUploadReducer,
    backgroundCheckRequestReportOverviewReducer,
    backgroundCheckRequestReportChecklistReducer,
    backgroundCheckRequestReportDetailReducer,
    backgroundCheckRequestReportSetStatusReducer,
    backgroundCheckRequestGetPriceReducer,
    backgroundCheckRequestMakePaymentReducer,


    apiReportReducer,
    apiReportProductsReducer,
    apiReportActivitiesReducer,
    apiGenerateReportLogsReducer,
    customerReportReducer,

    
    // apiPerksDiscountReducer,
    // apiAllPerksDiscountReducer,
    // addFavouritesPerksDiscountReducer,
    // searchPerksDiscountReducer,
    // ecommercePerksDiscountReducer,
    // salesMarketPerksDiscountReducer,
    // financePerksDiscountReducer,
    // developerToolsPerksDiscountReducer,
    // fundingPerksDiscountReducer,
    // apiFavouritesPerksDiscountReducer,



    subPlansReducer,
    subPlansByTenureReducer,
    subscriptionReducer,
    subLogsReducer,
    currentSubReducer,
    subPricingReducer,



    referralCommissionBalanceReducer,
    referralHistoryReducer,
    referralOverviewReducer,
    referralLinkReducer,
    allRefereesReducer,
    referralReportReducer,
    referralCommissionWithdrawalReducer,
    referralGraphReducer,
    referralFeedbackReducer,



    notificationsInfoReducer,
    readNotificationReducer,



    complianceDocInfoReducer,
    // getPolicyReducer,
    // getPolicyTemplateReducer,
    // adoptPolicyTemplateReducer,
    // createPolicyTemplateReducer,
    // deletePolicyReducer,
    // editPolicyReducer,
    // partialUpdatePolicyReducer

    perksAndDiscountInfoReducer,

})

export type RootState = ReturnType<typeof rootReducers>
