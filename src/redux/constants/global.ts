const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}` 
const appBaseUrl = `${window.location.origin+"/"}`
// const appBaseUrl = `${process.env.REACT_APP_APP_BASE_URL}`
const liveUrl = `${process.env.REACT_APP_API_LIVE_URL}`
const idpassApiUrl = `${process.env.REACT_APP_API_IDENTITYPASS_URL}`
const idradarApiUrl = `${process.env.REACT_APP_API_IDENTITYRADAR_URL}`
const backgroundCheckApiUrl = `${process.env.REACT_APP_API_BACKGROUNDCHECK_URL}`
const reportUrl = `${process.env.REACT_APP_API_REPORTBILLING_URL}`
const idPassReportDownloadUrl = `${process.env.REACT_APP_IDPASS_REPORT_DOWNLOAD_URL}`
const appSSOUrl = `${process.env.REACT_APP_SSO_URL}` 


// const apiBaseUrl = `https://api.prembly.com/` 
// const appBaseUrl = `https://dashboard.prembly.com/`
// const liveUrl = `prembly/`
// const idpassApiUrl = `identitypass/`
// const idradarApiUrl = `identityradar/`


const global = {apiBaseUrl, appBaseUrl, liveUrl, idpassApiUrl, idradarApiUrl, backgroundCheckApiUrl, reportUrl, idPassReportDownloadUrl, appSSOUrl};

export default global 