import { emptyStateIcon } from '../../assets/svgs'
import ContentLoader, { Code, List } from 'react-content-loader'
import useTourGuide from '../../hooks/useTourGuide'
import rocketGif from '../../assets/rocket-icon.gif'
import LoadingPageLogo from '../../assets/loadingPageLogo.svg'
import loadingPageGif from '../../assets/loadingPageGif.gif'
import Cookies from 'js-cookie'

export function SuccessTag() {
    return <span className="success-tag">SUCCESSFUL</span>
}
export function FailedTag() {
    return <span className="failed-tag">FAILED</span>
}
export function PendingTag() {
    return <span className="pending-tag">PENDING</span>
}
export function UnavailableTag() {
    return <span className="success-tag">Unavailable</span>
}
export function AvailableTag() {
    return <span className="success-tag">Available</span>
}

export function ActiveTag() {
    return <span className="success-tag">ACTIVE</span>
}
export function InactiveTag() {
    return <span className="failed-tag">INACTIVE</span>
}

export function OnlineTag() {
    return <span className="success-tag">Online</span>
}
export function OfflineTag() {
    return <span className="failed-tag">Offline</span>
}
export function PartialTag() {
    return <span className="pending-tag">Partially Available</span>
}

export function DeclinedTag() {
    return <span className="failed-tag">Declined</span>
}
export function VerifiedTag() {
    return <span className="success-tag">Verified</span>
}
export function InProgressTag() {
    return <span className="pending-tag">In Progress</span>
}
export function NeutralTag() {
    return <span className="neutral-tag">Pending</span>
}
export function AcceptedTag() {
    return <span className="accepted-tag">Accepted</span>
}
export function ConsentedTag() {
    return <span className="pending-tag">Consented</span>
}

export function AlertTag() {
    return <span className="failed-tag">Alert</span>
}
export function CompletedTag() {
    return <span className="success-tag">Completed</span>
}

export function ServerErrorComp(props: any) {
    return (
        <div className="server-error-area">
            <div className="d-flex">
                <i className="ri-information-fill me-2" />
                <p className="p-0 m-0">{props.error}</p>
            </div>
        </div>
    )
}

export function EmptyStateComp(props: any) {
    const [tourGuide, _] = useTourGuide()
    return (
        <div
            className={`empty-state-area text-center 
            ${tourGuide && tourGuide?.currentStep === 46 ? 'tour-guide-subscribe' : ''}            
            `}>
            <span>{emptyStateIcon}</span>
            <br />
            <h6 className="mt-3">{props?.title}</h6>
            <p>{props?.desc}</p>
            {props?.ctaValue && (
                <button onClick={props?.ctaAction} className="btn btn-deep-green px-5">
                    {props?.ctaValue}
                </button>
            )}
        </div>
    )
}
export function InvalidAccessRightComp() {
    return (
        <div className="my-5 py">
            <EmptyStateComp
                title={'Invalid Access'}
                ctaAction={() => {}}
                desc={
                    'Sorry, you have no access to this section, contact your admin to grant you access to this reports   '
                }
                ctaValue={''}
            />
        </div>
    )
}

export default function Mainloader() {
    let passLogo = Cookies.get('logo') || ''

    return (
        <>
            <div
                className="loading-page-area"
                style={{
                    // overflow fix
                    height: '100vh',
                    overflow: 'hidden',
                    position: 'fixed',
                    width: '100%',
                }}>
                <div>
                    <div style={{ width: '200px', position: 'relative', bottom: '-50px' }}>
                        <img src={passLogo} alt="" className="w-100" />
                    </div>
                    <div style={{ width: '200px',  paddingTop:"15%"}}>
                        <img src={loadingPageGif} alt="" className="w-100" />
                    </div>
                    {/* <div style={{width:"200px"}}>
                        <img src={rocketGif} alt="" className='w-100' />
                    </div> */}
                </div>
            </div>

            {/* <Code />
            <Code height={'160'} />
            <List height={'180'} />
            <List height={'180'} />
            <Code height={'160'} /> */}
        </>
    )
}

export const imgUrl = (imgParam: any) => {
    if (imgParam?.length > 300 && imgParam?.includes('data:image/')) {
        return imgParam
    }
    if (imgParam?.length > 300) {
        return 'data:image/jpeg;base64,' + imgParam
    } else {
        return imgParam
    }
}
export function TableLoader(props: any) {
    return (
        <ContentLoader
            width={1200}
            height={400}
            viewBox="0 0 1200 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}>
            <rect x="27" y="139" rx="4" ry="4" width="20" height="20" />
            <rect x="67" y="140" rx="10" ry="10" width="85" height="19" />
            <rect x="188" y="141" rx="10" ry="10" width="169" height="19" />
            <rect x="402" y="140" rx="10" ry="10" width="85" height="19" />
            <rect x="523" y="141" rx="10" ry="10" width="169" height="19" />
            <rect x="731" y="139" rx="10" ry="10" width="85" height="19" />
            <rect x="852" y="138" rx="10" ry="10" width="85" height="19" />

            <rect x="26" y="196" rx="4" ry="4" width="20" height="20" />
            <rect x="66" y="197" rx="10" ry="10" width="85" height="19" />
            <rect x="187" y="198" rx="10" ry="10" width="169" height="19" />
            <rect x="401" y="197" rx="10" ry="10" width="85" height="19" />
            <rect x="522" y="198" rx="10" ry="10" width="169" height="19" />
            <rect x="730" y="196" rx="10" ry="10" width="85" height="19" />
            <rect x="851" y="195" rx="10" ry="10" width="85" height="19" />

            <rect x="26" y="258" rx="4" ry="4" width="20" height="20" />
            <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
            <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
            <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
            <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
            <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
            <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />

            <rect x="26" y="316" rx="4" ry="4" width="20" height="20" />
            <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
            <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
            <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
            <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
            <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
            <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />

            <rect x="26" y="379" rx="4" ry="4" width="20" height="20" />
            <rect x="66" y="380" rx="10" ry="10" width="85" height="19" />
            <rect x="187" y="381" rx="10" ry="10" width="169" height="19" />
            <rect x="401" y="380" rx="10" ry="10" width="85" height="19" />
            <rect x="522" y="381" rx="10" ry="10" width="169" height="19" />
            <rect x="730" y="379" rx="10" ry="10" width="85" height="19" />
            <rect x="851" y="378" rx="10" ry="10" width="85" height="19" />

            <rect x="978" y="138" rx="10" ry="10" width="169" height="19" />
            <rect x="977" y="195" rx="10" ry="10" width="169" height="19" />
            <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
            <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
            <rect x="977" y="378" rx="10" ry="10" width="169" height="19" />

            <circle cx="37" cy="97" r="11" />
            <rect x="26" y="23" rx="5" ry="5" width="153" height="30" />
            <circle cx="77" cy="96" r="11" />
        </ContentLoader>
    )
}

export function TwoTabsLoader(props: any) {
    return (
        <ContentLoader
            speed={2}
            width={1200}
            height={600}
            viewBox="0 0 1200 600"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}>
            <circle cx="31" cy="31" r="15" />
            <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
            <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
            <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
            <rect x="343" y="354" rx="0" ry="0" width="1" height="0" />
            <rect x="434" y="123" rx="0" ry="0" width="168" height="247" />
        </ContentLoader>
    )
}

export let removeLetters = (val: any) => {
    let replaceText = val.replace(/([^0-9]+)/g, '')
    return replaceText
}

export let removeNumbers = (val: any) => {
    let replaceText = val.replace(/([^A-Za-z]+)/g, '')
    return replaceText
}
