import { all, fork } from 'redux-saga/effects'
import {
    regenerateLiveKeySagaTrigger,
    regenerateSandboxKeySagaTrigger,
} from './apiLibraries/apiKeys'
import {
    applicationInfoSagaTrigger,
    createApplicationSagaTrigger,
    editApplicationSagaTrigger,
    getAppSagaTrigger,
} from './apiLibraries/application'
import { apiStatusSagaTrigger } from './apiLibraries/status'
import { updateWebhookUrlSagaTrigger } from './sdkLibraries'
import loginSagaTrigger from './auth/login/index'
import confirmResetPasswordSagaTrigger from './auth/resetPassword/confirmResetPassword'
import initResetPasswordSagaTrigger from './auth/resetPassword/initializeResetPassword'
import { confirmSignUpSagaTrigger, resendSignUpOTPSagaTrigger } from './auth/signUp/confirm'
import { clearSignUpEmailSagaTrigger, initSignUpSagaTrigger } from './auth/signUp/initialize'
import setPasswordSagaTrigger from './auth/signUp/setPassword'
import { complianceDocInfoSagaTrigger } from './complianceCert'
import {
    acceptIndemnityFormSagaTrigger,
    announcementSagaTrigger,
    dashboardInfoSagaTrigger,
    viewAnnouncementSagaTrigger,
} from './dashboard'
import {
    identitypassBulkVerificationSagaTrigger,
    identitypassEndpointsSagaTrigger,
    identitypassVerificationSagaTrigger,
} from './products/identitypass/verification'
import {
    identityPassGetAllConfigSagaTrigger,
    identityPassCreateWidgetSagaTrigger,
    identityPassUpdateWidgetSagaTrigger,
    identityPassDeleteWidgetSagaTrigger,
    identityPassGetWidgetSagaTrigger,
} from './products/identitypass/checker-widget'
import {
    radarEmailIntelligenceSagaTrigger,
    radarIpIntelligenceSagaTrigger,
    radarMobileIntelligenceSagaTrigger,
    radarNameIntelligenceSagaTrigger,
} from './products/identityradar/radaCheck'
import {
    backgroundCheckPackageChangeStatusSagaTrigger,
    backgroundCheckPackageCreateSagaTrigger,
    backgroundCheckPackageFilterSagaTrigger,
    backgroundCheckPackageGetActiveSagaTrigger,
    backgroundCheckPackageGetAllSagaTrigger,
    backgroundCheckPackageGetBaseChecksSagaTrigger,
    backgroundCheckPackageGetBaseChecksSubserviceSagaTrigger,
    backgroundCheckPackageGetSingleSagaTrigger,
    backgroundCheckPackageUpdateSagaTrigger,
} from './products/backgroundCheck/package'
import {
    backgroundCheckRequestConsentSagaTrigger,
    backgroundCheckRequestFilterSagaTrigger,
    backgroundCheckRequestGetAllSagaTrigger,
    backgroundCheckRequestInitiateSagaTrigger,
} from './products/backgroundCheck/request/general'
import {
    backgroundCheckRequestGetCandidateFormSagaTrigger,
    backgroundCheckRequestValidateCandidateFormSagaTrigger, 
    backgroundCheckRequestCreateCandidateFormSagaTrigger, 
    backgroundCheckRequestAnswerUploadSagaTrigger,
    backgroundCheckRequestReportOverviewSagaTrigger,
    backgroundCheckRequestReportChecklistSagaTrigger,
    backgroundCheckRequestReportDetailSagaTrigger,
    backgroundCheckRequestReportSetStatusSagaTrigger,
    backgroundCheckRequestGetPriceSagaTrigger,
    backgroundCheckRequestMakePaymentSagaTrigger,
} from './products/backgroundCheck/request/checks'

import {
    apiReportActivitiesSagaTrigger,
    apiReportProductsSagaTrigger,
    apiReportSagaTrigger,
    apiGenerateReportLogsSagaTrigger,
    customerReportActivitiesSagaTrigger,
    apiSearchReportSagaTrigger,
    apiFilterReportSagaTrigger,
} from './reports'
import {
    myOrganisationInfoSagaTrigger,
    createMyOrganisationInfoSagaTrigger,
    updateMyOrganisationInfoSagaTrigger,
} from './myOrganisation'
import {
    organisationInfoSagaTrigger,
    updateOrganisationInfoSagaTrigger,
} from './settings/organisationInfo'
import { updateProfileInfoSagaTrigger, updateUserPasswordSagaTrigger } from './settings/profileInfo'
import {
    createUserRoleSagaTrigger,
    organizationModuleSagaTrigger,
    organizationRoleSagaTrigger,
    updateUserRoleSagaTrigger,
} from './settings/role'
import {
    preferenceInfoSagaTrigger,
    updatePreferenceInfoSagaTrigger,
    contactInfoSagaTrigger,
    addContactInfoSagaTrigger,
    removeContactInfoSagaTrigger,
} from './settings/notificationSettings'
import {
    activateTeamMemberSagaTrigger,
    changeTeamMemberRoleSagaTrigger,
    createTeamMemberSagaTrigger,
    deactivateTeamMemberSagaTrigger,
    deleteTeamMemberSagaTrigger,
    teamInfoSagaTrigger,
} from './settings/team'
import {
    currentSubSagaTrigger,
    subLogsSagaTrigger,
    subPlansByTenureSagaTrigger,
    subPlansSagaTrigger,
    subPricingSagaTrigger,
    subscriptionSagaTrigger,
} from './subscription'
import {
    addCardSagaTrigger,
    cardInfoSagaTrigger,
    // flutterwaveTopUpWalletSagaTrigger,
    // paystackTopUpWalletSagaTrigger,
    removeCardSagaTrigger,
    setDefaultCardSagaTrigger,
    setThresholdSagaTrigger,
    topUpWalletSagaTrigger,
    virtualAccountInfoSagaTrigger,
    walletHistorySagaTrigger,
    walletToWalletTransferSagaTrigger,
    mpesaTopUpWalletSagaTrigger
} from './wallet'
import {
    allRefereesSagaTrigger,
    referralCommissionBalanceSagaTrigger,
    referralCommissionWithdrawalSagaTrigger,
    referralFeedbackSagaTrigger,
    referralGraphSagaTrigger,
    referralHistorySagaTrigger,
    referralLinkSagaTrigger,
    referralOverviewSagaTrigger,
    referralReportSagaTrigger,
} from './referral'
import { notificationsInfoSagaTrigger, readNotificationSagaTrigger } from './notifications'
import acceptInviteSagaTrigger from './auth/acceptInvite'
import { tourGuideStatusSagaTrigger, tourGuideCompleteSagaTrigger } from './tourGuide'
import { accessTokenInfoSagaTrigger, migrationSetPasswordSagaTrigger } from './accessToken'
import { perksAndDiscountCloseBannerSagaTrigger, perksAndDiscountFavoriteSagaTrigger, perksAndDiscountGenerateCodeSagaTrigger, perksAndDiscountInfoSagaTrigger, perksAndDiscountLikeSagaTrigger, perksAndDiscountProductDetailsSagaTrigger, perksAndDiscountUnLikeSagaTrigger } from './perksAndDiscount'
import { faqsSagaTrigger } from './faqs'

export function* rootSaga() {
    yield all([fork(loginSagaTrigger)])
    yield all([fork(initSignUpSagaTrigger)])
    yield all([fork(clearSignUpEmailSagaTrigger)])
    yield all([fork(confirmSignUpSagaTrigger)])
    yield all([fork(resendSignUpOTPSagaTrigger)])
    yield all([fork(setPasswordSagaTrigger)])
    yield all([fork(initResetPasswordSagaTrigger)])
    yield all([fork(confirmResetPasswordSagaTrigger)])
    yield all([fork(acceptInviteSagaTrigger)])
    yield all([fork(accessTokenInfoSagaTrigger)])
    yield all([fork(migrationSetPasswordSagaTrigger)])

    yield all([fork(tourGuideStatusSagaTrigger)])
    yield all([fork(tourGuideCompleteSagaTrigger)])

    yield all([fork(dashboardInfoSagaTrigger)])
    yield all([fork(announcementSagaTrigger)])
    yield all([fork(viewAnnouncementSagaTrigger)])
    yield all([fork(acceptIndemnityFormSagaTrigger)])

    yield all([fork(walletHistorySagaTrigger)])
    yield all([fork(cardInfoSagaTrigger)])
    yield all([fork(addCardSagaTrigger)])
    yield all([fork(setDefaultCardSagaTrigger)])
    yield all([fork(removeCardSagaTrigger)])
    yield all([fork(setThresholdSagaTrigger)])
    yield all([fork(virtualAccountInfoSagaTrigger)])
    yield all([fork(topUpWalletSagaTrigger)])
    yield all([fork(mpesaTopUpWalletSagaTrigger)])
    // yield all([fork(paystackTopUpWalletSagaTrigger)])
    // yield all([fork(flutterwaveTopUpWalletSagaTrigger)])
    yield all([fork(walletToWalletTransferSagaTrigger)])

    yield all([fork(myOrganisationInfoSagaTrigger)])
    yield all([fork(createMyOrganisationInfoSagaTrigger)])
    yield all([fork(updateMyOrganisationInfoSagaTrigger)])
    yield all([fork(organisationInfoSagaTrigger)])
    yield all([fork(updateOrganisationInfoSagaTrigger)])
    yield all([fork(updateUserPasswordSagaTrigger)])
    yield all([fork(updateProfileInfoSagaTrigger)])

    yield all([fork(regenerateLiveKeySagaTrigger)])
    yield all([fork(regenerateSandboxKeySagaTrigger)])
    yield all([fork(applicationInfoSagaTrigger)])
    yield all([fork(createApplicationSagaTrigger)])
    yield all([fork(editApplicationSagaTrigger)])
    yield all([fork(apiStatusSagaTrigger)])
    yield all([fork(updateWebhookUrlSagaTrigger)])
    yield all([fork(organizationModuleSagaTrigger)])
    yield all([fork(organizationRoleSagaTrigger)])
    yield all([fork(createUserRoleSagaTrigger)])
    yield all([fork(updateUserRoleSagaTrigger)])
    yield all([fork(preferenceInfoSagaTrigger)])
    yield all([fork(updatePreferenceInfoSagaTrigger)])
    yield all([fork(contactInfoSagaTrigger)])
    yield all([fork(addContactInfoSagaTrigger)])
    yield all([fork(removeContactInfoSagaTrigger)])
    yield all([fork(teamInfoSagaTrigger)])
    yield all([fork(createTeamMemberSagaTrigger)])
    yield all([fork(changeTeamMemberRoleSagaTrigger)])
    yield all([fork(activateTeamMemberSagaTrigger)])
    yield all([fork(deactivateTeamMemberSagaTrigger)])
    yield all([fork(deleteTeamMemberSagaTrigger)])
    yield all([fork(getAppSagaTrigger)])

    yield all([fork(identitypassVerificationSagaTrigger)])
    yield all([fork(identityPassGetAllConfigSagaTrigger)])
    yield all([fork(identitypassBulkVerificationSagaTrigger)])
    yield all([fork(identityPassCreateWidgetSagaTrigger)])
    yield all([fork(identityPassUpdateWidgetSagaTrigger)])
    yield all([fork(identityPassDeleteWidgetSagaTrigger)])
    yield all([fork(identityPassGetWidgetSagaTrigger)])
    yield all([fork(identitypassEndpointsSagaTrigger)])

    yield all([fork(radarEmailIntelligenceSagaTrigger)])
    yield all([fork(radarMobileIntelligenceSagaTrigger)])
    yield all([fork(radarIpIntelligenceSagaTrigger)])
    yield all([fork(radarNameIntelligenceSagaTrigger)])

    yield all([fork(backgroundCheckPackageGetAllSagaTrigger)])
    yield all([fork(backgroundCheckPackageGetBaseChecksSagaTrigger)])
    yield all([fork(backgroundCheckPackageGetBaseChecksSubserviceSagaTrigger)])
    yield all([fork(backgroundCheckPackageCreateSagaTrigger)])
    yield all([fork(backgroundCheckPackageUpdateSagaTrigger)])
    yield all([fork(backgroundCheckPackageFilterSagaTrigger)])
    yield all([fork(backgroundCheckPackageGetSingleSagaTrigger)])
    yield all([fork(backgroundCheckPackageGetActiveSagaTrigger)])
    yield all([fork(backgroundCheckPackageChangeStatusSagaTrigger)])
    yield all([fork(backgroundCheckRequestGetAllSagaTrigger)])
    yield all([fork(backgroundCheckRequestInitiateSagaTrigger)])
    yield all([fork(backgroundCheckRequestConsentSagaTrigger)])
    yield all([fork(backgroundCheckRequestFilterSagaTrigger)])
    yield all([fork(backgroundCheckRequestGetCandidateFormSagaTrigger)])
    yield all([fork(backgroundCheckRequestValidateCandidateFormSagaTrigger)])
    yield all([fork(backgroundCheckRequestCreateCandidateFormSagaTrigger)])
    yield all([fork(backgroundCheckRequestAnswerUploadSagaTrigger)])
    yield all([fork(backgroundCheckRequestReportOverviewSagaTrigger)])
    yield all([fork(backgroundCheckRequestReportChecklistSagaTrigger)])
    yield all([fork(backgroundCheckRequestReportDetailSagaTrigger)])
    yield all([fork(backgroundCheckRequestReportSetStatusSagaTrigger)])
    yield all([fork(backgroundCheckRequestGetPriceSagaTrigger)])
    yield all([fork(backgroundCheckRequestMakePaymentSagaTrigger)])

    yield all([fork(apiReportSagaTrigger)])
    yield all([fork(apiSearchReportSagaTrigger)])
    yield all([fork(apiFilterReportSagaTrigger)])
    yield all([fork(apiReportProductsSagaTrigger)])
    yield all([fork(apiReportActivitiesSagaTrigger)])
    yield all([fork(apiGenerateReportLogsSagaTrigger)])
    yield all([fork(customerReportActivitiesSagaTrigger)])

    yield all([fork(subPlansSagaTrigger)])
    yield all([fork(subPlansByTenureSagaTrigger)])
    yield all([fork(subscriptionSagaTrigger)])
    yield all([fork(subLogsSagaTrigger)])
    yield all([fork(currentSubSagaTrigger)])
    yield all([fork(subPricingSagaTrigger)])

    yield all([fork(referralCommissionBalanceSagaTrigger)])
    yield all([fork(referralHistorySagaTrigger)])
    yield all([fork(referralOverviewSagaTrigger)])
    yield all([fork(referralLinkSagaTrigger)])
    yield all([fork(allRefereesSagaTrigger)])
    yield all([fork(referralReportSagaTrigger)])
    yield all([fork(referralCommissionWithdrawalSagaTrigger)])
    yield all([fork(referralGraphSagaTrigger)])
    yield all([fork(referralFeedbackSagaTrigger)])

    yield all([fork(notificationsInfoSagaTrigger)])
    yield all([fork(complianceDocInfoSagaTrigger)])
    yield all([fork(readNotificationSagaTrigger)])
    yield all([fork(faqsSagaTrigger)])

    yield all([fork(perksAndDiscountInfoSagaTrigger)])

    yield all([fork(perksAndDiscountLikeSagaTrigger)])

    yield all([fork(perksAndDiscountUnLikeSagaTrigger)])
    yield all([fork(perksAndDiscountProductDetailsSagaTrigger)])
    yield all([fork(perksAndDiscountFavoriteSagaTrigger)])
    yield all([fork(perksAndDiscountGenerateCodeSagaTrigger)])
    yield all([fork(perksAndDiscountCloseBannerSagaTrigger)])
}
