import React, { useState, useEffect, useRef, useCallback } from 'react'
import NotificationToast from '../../../../utils/notifToast'
import styles from './index.module.scss'
import { Spinner } from 'react-bootstrap'
import Moment from 'react-moment'

export type widgetObject = {
    id: string
    name: string
    created_by: string
    created_at: string
    organisation: string
    endpoints: any[]
    face_confidence: string
    subtitle: ''
    theme_color: string
    updated_at: string
    updated_by: string
    createdBy: string
}

type WidgetListProps = {
    widgets: widgetObject[]
    initEditWidget: (widget: widgetObject) => void
    deleteWidget: (id: string) => void
    deleteWidgetError: any
    deleteWidgetLoading: boolean
    deleteWidgetResponse: any
}

export const WidgetList: React.FC<WidgetListProps> = ({
    widgets,
    initEditWidget,
    deleteWidget,
    deleteWidgetLoading,
}) => {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selected, setSelected] = useState('')

    function copyWidgetCode(widget: widgetObject) {
        const code = widget.id
        navigator.clipboard.writeText(code)
        setNotifVal(true)
        setNotif('Copied')
        setNotifTitle('Success')
    }

    function onClose() {
        setShowModal(false)
    }

    function onInitDelete(id: string) {
        setSelected(id)
        setShowModal(true)
    }

    return (
        <>
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}
            <table className={styles.table}>
                <thead className={styles.head}>
                    <tr className={styles.row}>
                        <th className={styles.heading}>Name</th>
                        <th className={styles.heading}>Widget Code</th>
                        <th className={styles.heading}>Created By</th>
                        <th className={styles.heading}>Last Edit</th>
                        <th className={styles.heading}>Actions</th>
                    </tr>
                </thead>
                <tbody className={styles.body}>
                    {widgets.map((widget, index) => (
                        <tr key={index} className={styles.row}>
                            <td className={`${styles.data}`}>
                                <div className={styles.name}>
                                    <div
                                        className={styles.theme}
                                        style={{ backgroundColor: widget.theme_color }}></div>
                                    <div>{widget.name}</div>
                                </div>
                            </td>
                            <td className={`${styles.data} ${styles.actionWrapper}`}>
                                <div className={styles.code}>{widget.id}</div>
                                <div className={styles.copy} onClick={() => copyWidgetCode(widget)}>
                                    Copy
                                </div>
                            </td>
                            <td className={styles.data}>
                                {widget.created_by} <br />
                                <Moment format="DD MMM YYYY. HH:mmA">{widget.created_at}</Moment>
                                </td>
                            <td className={styles.data}>
                                {widget?.updated_by} <br />
                                <Moment format="DD MMM YYYY. HH:mmA">{widget.updated_at}</Moment>
                            </td>
                            <td className={`${styles.data} ${styles.actionWrapper}`}>
                                <div className={styles.edit} onClick={() => initEditWidget(widget)}>
                                    Edit
                                </div>
                                <div
                                    className={styles.delete}
                                    onClick={() => onInitDelete(widget.id)}>
                                    Delete
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteModal
                show={showModal}
                onClose={onClose}
                loading={deleteWidgetLoading}
                onDelete={() => deleteWidget(selected)}
            />
        </>
    )
}

type DeleteModalProps = {
    show: boolean
    onClose: () => void
    loading: boolean
    onDelete: () => void
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ show, onClose, loading, onDelete }) => {
    const [timer, setTimer] = useState(10)
    const [countStarted, setCountStarted] = useState(false)
    const countdown = useRef<any>(null)
    const [cancel, setCancel] = useState(false)

    useEffect(() => {
        return () => {
            clearInterval(countdown.current)
            setCancel(false)
        }
    }, [])

    useEffect(() => {
        if (timer > 0 && cancel) {
            cancelDelete()
        } else if (timer < 1) {
            setCountStarted(false)
            stopCountdown()
            onDelete()
        }
    }, [timer])

    const initDelete = useCallback(() => {
        setCountStarted(true)
        countdown.current = setInterval(() => {
            setTimer((prev) => prev - 1)
        }, 1000)
    }, [timer])

    const cancelDelete = () => {
        stopCountdown()
        setTimer(10)
        setCancel(false)
        setTimeout(() => {
            onClose()
        }, 500)
    }

    const stopCountdown = useCallback(() => {
        clearInterval(countdown.current)
        countdown.current = null
        setCountStarted(false)
    }, [])

    if (!show) {
        return null
    }
    return (
        <section className={styles.modal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}></div>

                <div className={styles.modalBody}>
                    <div>Are you sure? </div>
                    <p>You will not be able to recover this file</p>
                    {countStarted && (
                        <small className={styles.info}>
                            Deleting Widget in <strong>{timer}</strong> seconds. Click on
                            cancel to stop.
                        </small>
                    )}

                    <div className={styles.btnWrapper}>
                        <button
                            className={`${styles.btn} ${styles.btnSecondaryOutline} `}
                            onClick={cancelDelete}>
                            Cancel
                        </button>
                        <button
                            className={`${styles.btn} ${styles.btnSecondary}`}
                            onClick={initDelete}>
                            {loading ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                <span> Yes, delete it</span>
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.modalFooter}></div>
            </div>
        </section>
    )
}
