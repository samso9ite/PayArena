import moment from 'moment'
import { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from 'react-redux'
import Mainloader, { EmptyStateComp } from '../../components/utils'
import NotificationToast from '../../components/utils/notifToast'
import {
    notificationsInfoRequest,
    readNotificationRequest,
} from '../../redux/actions/notifications'
import { RootState } from '../../redux/reducers'
import Placeholder from '../../assets/profile_placeholder.png'

export default function NotificationsPage() {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [activeTab, setActiveTab] = useState('All')
    const [unreadCount, setUnreadCount] = useState(0)

    const notificationsInfoState = useSelector((state: RootState) => state.notificationsInfoReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        getNotifications()
    }, []) 

    useEffect(() => {
        let count = 0
        notificationsInfoState?.resp?.data?.forEach((dayData: any) => {
            dayData.notification.forEach((notification: any) => {
                if (!notification.has_read) {
                    count++
                }
            })
        })
        setUnreadCount(count)
    }, [notificationsInfoState])

    let getNotifications = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(notificationsInfoRequest(data))
    }

    let readNotification = (id: string) => {
        const callback = (data: any) => {
            if (data.status) {
                getNotifications()
            }
        }
        let data: any = {
            values: {
                id,
            },
            callback,
        }
        dispatch(readNotificationRequest(data))
    }

    const handleTab = (tab: string) => {
        setActiveTab(tab)
    }

    const handleReadNotification = (notification: any) => {
        readNotification(notification.id)
    }

    return (
        <div className=" container-fluid px-md-4">
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {notificationsInfoState?.isLoading && <Mainloader />}

            {!notificationsInfoState?.isLoading && (
                <>
                    <div className="d-flex align-items-center justify-content-between table-header">
                        <div className="col-md-5">
                            <h5>Notifications</h5>
                            <p>View all your notifications here</p>
                        </div>
                        <div className="col-md-5 d-flex gap-2 justify-content-end">
                            <button
                                className={`btn px-3 ${
                                    activeTab === 'All'
                                        ? 'btn-dark-green'
                                        : 'btn-deep-green-outline-sm'
                                }`}
                                style={{
                                    height: 'fit-content',
                                    borderRadius: '0.375rem !important',
                                }}
                                onClick={() => handleTab('All')}>
                                All
                            </button>
                            <button
                                className={`btn px-3 ${
                                    activeTab === 'Unread'
                                        ? 'btn-dark-green'
                                        : 'btn-deep-green-outline-sm'
                                }`}
                                style={{
                                    height: 'fit-content',
                                    borderRadius: '0.375rem !important',
                                }}
                                onClick={() => handleTab('Unread')}>
                                {`Unread(${unreadCount})`}
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        {notificationsInfoState?.resp?.data?.length < 1 ? (
                            <div className="my-5 py">
                                <EmptyStateComp
                                    title={'You have no Notifications yet'}
                                    ctaAction={() => {}}
                                    desc={'You will see all organization Notifications here'}
                                    ctaValue={''}
                                />
                            </div>
                        ) : (
                            <div>
                                {activeTab === 'All' ? (
                                    notificationsInfoState?.resp?.data?.map(
                                        (val: any, i: number) => (
                                            <div key={i} className="mb-5">
                                                <h5 className="mb-2">{val?.day}</h5>
                                                {val.notification.map(
                                                    (notif: {
                                                        summary: string
                                                        created_at: string
                                                        image: string
                                                        operation: string
                                                    }) => (
                                                        <>
                                                            <div
                                                                className="row mt-3"
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() =>
                                                                    handleReadNotification(notif)
                                                                }>
                                                                <div className="col-md-12">
                                                                    <div className="row">
                                                                        <div className="col-md-1 text-left text-md-center">
                                                                            <Image
                                                                                src={
                                                                                    notif.image ||
                                                                                    Placeholder
                                                                                }
                                                                                style={{
                                                                                    width: '35px',
                                                                                    height: '35px',
                                                                                    border: '1px solid #dad7d7',
                                                                                    objectFit:
                                                                                        'contain',
                                                                                }}
                                                                                roundedCircle
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-11">
                                                                            <div className="row justify-content-md-between">
                                                                                <div className="col-md-8">
                                                                                    <h6>
                                                                                        {
                                                                                            notif?.operation
                                                                                        }
                                                                                    </h6>
                                                                                    <p className="mb-0 ">
                                                                                        {
                                                                                            notif?.summary
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <div className="col-md-3">
                                                                                    <p
                                                                                        className="mb-0"
                                                                                        style={{
                                                                                            textAlign:
                                                                                                'end',
                                                                                        }}>
                                                                                        {moment
                                                                                            .utc(
                                                                                                notif?.created_at
                                                                                            )
                                                                                            .format(
                                                                                                'lll'
                                                                                            )}
                                                                                    </p>
                                                                                </div>
                                                                                <hr
                                                                                    style={{
                                                                                        border: '0.5px solid #C0C9D8',
                                                                                        marginTop:
                                                                                            '10px',
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div
                                                                className="col-md-3"
                                                                style={{ textAlign: 'right' }}>
                                                                <p className="mb-0">
                                                                    {moment
                                                                        .utc(notif?.created_at)
                                                                        .format('lll')}
                                                                </p>
                                                            </div> */}
                                                            </div>

                                                            {/* <hr
                                                            style={{
                                                                border: '0.5px solid #C0C9D8',
                                                            }}
                                                        /> */}
                                                        </>
                                                    )
                                                )}
                                            </div>
                                        )
                                    )
                                ) : activeTab === 'Unread' && unreadCount > 0 ? (
                                    notificationsInfoState?.resp?.data?.map(
                                        (val: any, i: number) => {
                                            const allRead = val.notification.every(
                                                (notif: any) => notif.has_read
                                            )
                                            return !allRead ? (
                                                <div key={i} className="mb-5">
                                                    <h5 className="mb-2">{val?.day}</h5>
                                                    {val.notification
                                                        ?.filter((notif: any) => !notif.has_read)
                                                        .map(
                                                            (notif: {
                                                                summary: string
                                                                created_at: string
                                                                image: string
                                                                operation: string
                                                            }) => (
                                                                <>
                                                                    <div
                                                                        className="row mt-3"
                                                                        style={{
                                                                            cursor: 'pointer',
                                                                        }}
                                                                        onClick={() =>
                                                                            handleReadNotification(
                                                                                notif
                                                                            )
                                                                        }>
                                                                        <div className="col-md-12">
                                                                            <div className="row">
                                                                                <div className="col-md-1 text-left text-md-center">
                                                                                    <Image
                                                                                        src={
                                                                                            notif.image ||
                                                                                            Placeholder
                                                                                        }
                                                                                        style={{
                                                                                            width: '35px',
                                                                                            height: '35px',
                                                                                            border: '1px solid #dad7d7',
                                                                                            objectFit:
                                                                                                'contain',
                                                                                        }}
                                                                                        roundedCircle
                                                                                    />
                                                                                </div>
                                                                                <div className="col-md-11">
                                                                                    <div className="row justify-content-md-between">
                                                                                        <div className="col-md-8">
                                                                                            <h6>
                                                                                                {
                                                                                                    notif?.operation
                                                                                                }
                                                                                            </h6>
                                                                                            <p className="mb-0 ">
                                                                                                {
                                                                                                    notif?.summary
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className="col-md-3">
                                                                                            <p
                                                                                                className="mb-0"
                                                                                                style={{
                                                                                                    textAlign:
                                                                                                        'end',
                                                                                                }}>
                                                                                                {moment
                                                                                                    .utc(
                                                                                                        notif?.created_at
                                                                                                    )
                                                                                                    .format(
                                                                                                        'lll'
                                                                                                    )}
                                                                                            </p>
                                                                                        </div>
                                                                                        <hr
                                                                                            style={{
                                                                                                border: '0.5px solid #C0C9D8',
                                                                                                marginTop:
                                                                                                    '10px',
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {/* <div
                                                                    className="col-md-3"
                                                                    style={{ textAlign: 'right' }}>
                                                                    <p className="mb-0">
                                                                        {moment
                                                                            .utc(notif?.created_at)
                                                                            .format('lll')}
                                                                    </p>
                                                                </div> */}
                                                                    </div>

                                                                    {/* <hr
                                                                style={{
                                                                    border: '0.5px solid #C0C9D8',
                                                                }}
                                                            /> */}
                                                                </>
                                                            )
                                                        )}
                                                </div>
                                            ) : null
                                        }
                                    )
                                ) : (
                                    <p>No unread notifications</p>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}
