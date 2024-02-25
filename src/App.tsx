import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/wrapper/sidebar'
import Topbar from './components/wrapper/topbar'
import Dashboard from './pages/dashboard'
import LoginPage from './pages/Auth/login'
import SettingsPage from './pages/settings'
import SignUpPage from './pages/Auth/signUp'
// import WalletPage from './pages/wallet'
import IdPassVerificationPage from './pages/products/identitypass/verification'
import IdpassCheckerWidgetPage from './pages/products/identitypass/checkerWidget'
import IdentityPassUpdateWidgetPage from './pages/products/identitypass/checkerWidget/UpdateWidget'
// import APILibraries from './pages/apiLibraries';
// import useTourGuide from './hooks/useTourGuide'
import SubscriptionPage from './pages/subscription'
import ResetPasswordPage from './pages/Auth/resetPassword'
import IdRadarCheckPage from './pages/products/identityradar/radarCheck'
import ReportsPage from './pages/reports'
import ComplianceCertPage from './pages/compliance'
import NotificationsPage from './pages/notifications'
import APIKeys from './components/ApiLibraries/apiKeys'
import Application from './components/ApiLibraries/applications'
import ApiStatusComp from './components/ApiLibraries/apiStatus'
import AcceptInvitationPage from './pages/Auth/acceptInvite'
import SDKLibraryPage from './pages/sdkLibraries'
import ReferralPage from './pages/referral'
import TourGuideProvider from './contexts/tour-guide'
import Layout from './Layout'
import AuthWrapper from './components/wrapper/authWrapper'
import Mainloader from './components/utils'
import BackgroundCheckConsentPage from './components/products/backgroundCheck/request/checks/consent'
import BackgroundCheckRequestCandidateFormPage from './pages/products/backgroundCheck/request/checks'
import BackgroundCheckRequestPage from './pages/products/backgroundCheck/request'
import CandidateReportPage from './components/products/backgroundCheck/request/candidateReport'
import BackgroundCheckRequestInitiatePage from './components/products/backgroundCheck/request/requestCheck'
import BackgroundCheckPackagePage from './pages/products/backgroundCheck/package'
import BackgroundCheckCreatePackagePage from './components/products/backgroundCheck/package/createPackage'
import BackgroundCheckUpdatePackagePage from './components/products/backgroundCheck/package/updatePackage'
import Favourites from './pages/offerings/perks-and-discount/favourites'
import PerksAndDiscountDetails from './pages/offerings/perks-and-discount/details'
import PerksAndDiscount from './pages/offerings/perks-and-discount'

interface IUserRights {
    userRights: any
    includes: any
}

function App() {
    const [userRights, setUserRights] = useState<IUserRights | []>([])
    const [permissionKey, setPermissionKey] = useState('')
    const [loadingState, setLoadingState] = useState(false)

    let setFilteredRights = (val: any) => {
        setUserRights(val)
    }

    let pushPermissionKey = (val: string) => {
        setPermissionKey(val)
    }

    let changeLoadingState = (val: boolean) => {
        setLoadingState(val)
    }

    return (
        <div>
            {window.location.pathname === '/login' ||
            window.location.pathname === '/signUp' ||
            window.location.pathname === '/ResetPassword' ||
            window.location.pathname === '/Accept-Invitation' ||
            window.location.pathname === '/BackgroundCheck/Requests/Accept' ||
            window.location.pathname === '/BackgroundCheck/Requests/Candidate-Form' ? (
                <div>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signUp" element={<SignUpPage />} />
                        <Route path="/ResetPassword" element={<ResetPasswordPage />} />
                        <Route path="/Accept-Invitation" element={<AcceptInvitationPage />} />
                        <Route
                            path="/BackgroundCheck/Requests/Accept"
                            element={<BackgroundCheckConsentPage />}
                        />
                        <Route
                            path="/BackgroundCheck/Requests/Candidate-Form"
                            element={<BackgroundCheckRequestCandidateFormPage />}
                        />
                    </Routes>
                </div>
            ) : (
                <AuthWrapper>
                    <TourGuideProvider>
                        <>
                            {loadingState && <Mainloader />}

                            <div
                                style={{
                                    visibility: `${loadingState ? 'hidden' : 'visible'}`,
                                    // not scrollable when loading fix
                                    height: `${loadingState ? '100vh' : 'auto'}`,
                                    overflow: `${loadingState ? 'hidden' : 'scroll'}`,
                                }}
                                className="d-lg-flex">
                                <div className="col-lg-2">
                                    <Sidebar
                                        pushFilteredRights={setFilteredRights}
                                        pushPermissionKey={pushPermissionKey}
                                        userRights={userRights}
                                    />
                                </div>
                                <Layout className="col-lg-10">
                                    <Topbar userRights={userRights} />
                                    <div className="pages mt-4">
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={
                                                    <Dashboard
                                                        userRights={userRights}
                                                        permissionKey={permissionKey}
                                                        changeLoadingState={changeLoadingState}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/Perks-And-Discount"
                                                element={
                                                    <PerksAndDiscount
                                                        userRights={userRights}
                                                        permissionKey={permissionKey}
                                                        changeLoadingState={changeLoadingState}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/Perks-And-Discount-Details/:id"
                                                element={
                                                    <PerksAndDiscountDetails
                                                        userRights={userRights}
                                                        permissionKey={permissionKey}
                                                        changeLoadingState={changeLoadingState}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/Perks-And-Discount-Favorite"
                                                element={
                                                    <Favourites
                                                        userRights={userRights}
                                                        permissionKey={permissionKey}
                                                        changeLoadingState={changeLoadingState}
                                                    />
                                                }
                                            />
                                            {/* <Route path="/Wallet" element={<WalletPage />} /> */}
                                            <Route
                                                path="/Identitypass/Verification/Data"
                                                element={
                                                    <IdPassVerificationPage
                                                        userRights={userRights}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/Identitypass/Verification/Document"
                                                element={
                                                    <IdPassVerificationPage
                                                        userRights={userRights}
                                                    />
                                                }
                                            />
                                            {/* <Route path="/Identitypass/Checker-Widget" element={<IdpassCheckerWidgetPage />} ></Route> */}
                                            <Route path="/Identitypass/Checker-Widget">
                                                <Route
                                                    index
                                                    element={
                                                        <IdpassCheckerWidgetPage
                                                            userRights={userRights}
                                                        />
                                                    }
                                                />
                                                <Route
                                                    path=":id"
                                                    element={
                                                        <IdentityPassUpdateWidgetPage
                                                            userRights={userRights}
                                                        />
                                                    }
                                                />
                                            </Route>
                                            <Route
                                                path="/Identityradar/Radar-Check"
                                                element={
                                                    <IdRadarCheckPage userRights={userRights} />
                                                }
                                            />

                                            <Route
                                                path="/BackgroundCheck/Requests"
                                                element={<BackgroundCheckRequestPage />}
                                            />
                                            <Route
                                                path="/BackgroundCheck/Requests/report/:ref"
                                                element={<CandidateReportPage />}
                                            />
                                            <Route
                                                path="/BackgroundCheck/Requests/Initiate"
                                                element={<BackgroundCheckRequestInitiatePage />}
                                            />
                                            <Route
                                                path="/BackgroundCheck/Packages"
                                                element={<BackgroundCheckPackagePage />}
                                            />
                                            <Route
                                                path="/BackgroundCheck/Packages/Create-Package"
                                                element={<BackgroundCheckCreatePackagePage />}
                                            />
                                            <Route
                                                path="/BackgroundCheck/Packages/Update-Package/:ref"
                                                element={<BackgroundCheckUpdatePackagePage />}
                                            />

                                            {/* <Route path="/Api-Library" element={<APILibraries/>} /> */}
                                            <Route
                                                path="/API-Library/API-Keys"
                                                element={<APIKeys userRights={userRights} />}
                                            />
                                            <Route
                                                path="/API-Library/Applications"
                                                element={<Application userRights={userRights} />}
                                            />
                                            <Route
                                                path="/API-Library/API-Status"
                                                element={<ApiStatusComp userRights={userRights} />}
                                            />
                                            <Route
                                                path="/SDK-Library/Webhook"
                                                element={<SDKLibraryPage />}
                                            />
                                            <Route
                                                path="/Reports"
                                                element={<ReportsPage userRights={userRights} />}
                                            />
                                            <Route
                                                path="/Subscription"
                                                element={
                                                    <SubscriptionPage
                                                        userRights={userRights}
                                                        permissionKey={permissionKey}
                                                    />
                                                }
                                            />
                                            <Route path="/Referral" element={<ReferralPage />} />
                                            <Route
                                                path="/Settings"
                                                element={
                                                    <SettingsPage
                                                        userRights={userRights}
                                                        changeLoadingState={changeLoadingState}
                                                    />
                                                }
                                            />
                                            <Route
                                                path="/Notifications"
                                                element={<NotificationsPage />}
                                            />
                                            <Route
                                                path="/Compliance-Certificates"
                                                element={<ComplianceCertPage />}
                                            />
                                        </Routes>
                                    </div>
                                </Layout>
                            </div>
                        </>
                    </TourGuideProvider>
                </AuthWrapper>
            )}
        </div>
    )
}

export default App
