import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Mainloader from '../../components/utils'
import NotificationToast from '../../components/utils/notifToast'
import { complianceDocInfoRequest } from '../../redux/actions/complianceCert'
import { RootState } from '../../redux/reducers'

export default function ComplianceCertPage() {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const complianceDocInfoState = useSelector((state: RootState) => state.complianceDocInfoReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        getComplianceInfo()
    }, [])

    let getComplianceInfo = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(complianceDocInfoRequest(data))
    }

    return (
        <div className="px-4">
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {complianceDocInfoState?.isLoading && <Mainloader />}

            {!complianceDocInfoState?.isLoading && (
                <>
                    <div className="table-header mt-5">
                        <div className="row">
                            <div className="col-md-7">
                                <h5>Compliance Certificates</h5>
                                <p>
                                    Access and Monitor our compliance status and certifications in
                                    real-time.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-10 mx-auto my-3 compliance-card-area">
                        <div className="row justify-content-center">
                            {complianceDocInfoState.resp?.data.map((doc: any, i: number) => (
                                <div className="col-md-4">
                                    <div className="card py-3 mt-4">
                                        <div className="card-body">
                                            <img src={doc?.image_url} alt="" className="w-100" />
                                            <div
                                                style={{ backgroundColor: '#BCEBE7' }}
                                                className="d-flex justify-content-between align-items-center p-2">
                                                <p className="p-0 m-0">{doc?.name}</p>
                                                <a href={doc?.file_url} className="link" download>
                                                    <i className="ri-download-2-line ri-lg" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
