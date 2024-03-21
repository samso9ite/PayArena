import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateWebhookUrlRequest } from '../../../redux/actions/sdkLibraries'
import { RootState } from '../../../redux/reducers'
import Mainloader from '../../utils'
import NotificationToast from '../../utils/notifToast'
import Cookies from 'js-cookie'

export default function WebhookComp() {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [webhookUrl, setWebhookUrl] = useState('')

    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)
    const updateWebhookUrlState = useSelector((state: RootState) => state.updateWebhookUrlReducer)

    let sdkUrl = Cookies.get("sdkUrl") || " "
    const dispatch = useDispatch()

    let updateWebhook = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Webhook Url Successfully Updated')
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        if (!webhookUrl) {
            setNotifTitle('Error')
            setNotif('Please Enter your webhook url')
            setNotifVal(true)
            return
        }
        let data: any = {
            values: {
                webhook_url:
                    webhookUrl || organisationInfoState?.resp?.data?.organisation?.webhook_url,
            },
            callback,
        }
        dispatch(updateWebhookUrlRequest(data))
    }

    return (
        <div>
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {organisationInfoState?.isLoading && <Mainloader />}

            {!organisationInfoState?.isLoading && (
                <>
                    {
                        // (props?.userRights?.includes("APPLICATION")) ?
                        <div className="container-fluid px-md-4">
                            <div className="main-table-area mt-5">
                                <div className="table-header pb-3">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <h5>SDK Library</h5>
                                            <small>
                                                <p>
                                                    Integrate Your SDK. Click here to &nbsp;
                                                    <a
                                                        href={sdkUrl}
                                                        target="_blank"
                                                        rel="noreferrer">
                                                        Learn More
                                                    </a>
                                                </p>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="">
                                    <label htmlFor="email">Webhook URL</label>
                                    <input
                                        type="url"
                                        defaultValue={
                                            organisationInfoState?.resp?.data?.organisation
                                                ?.webhook_url
                                        }
                                        className="form-control"
                                        onChange={(url) => setWebhookUrl(url.target.value)}
                                        placeholder="https://example.com/webhook"
                                    />
                                </div>

                                <button
                                    className="btn btn-deep-green py-2 mt-4"
                                    disabled={updateWebhookUrlState.isLoading}
                                    onClick={updateWebhook}>
                                    {updateWebhookUrlState.isLoading ? (
                                        <div>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : (
                                        'Update Webhook'
                                    )}
                                </button>
                            </div>
                        </div>
                        // :
                        // <InvalidAccessRightComp />
                    }
                </>
            )}
        </div>
    )
}
