import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { closeCircleIcon } from '../../../../../assets/svgs/index'
import { Spinner } from 'react-bootstrap'
import useTourGuide from '../../../../../hooks/useTourGuide'

type CreateWidgetModalType = {
    show: Boolean
    onClose: () => void
    initCreateWidget: (name: String) => void
    error: string
    loading: boolean
    response: any
}

const CreateWidgetModal = (props: CreateWidgetModalType) => {
    const [tourGuide, setTourGuide] = useTourGuide()
    const [widgetName, setWidgetName] = useState('')

    useEffect(() => {
        if (tourGuide.currentStep === 25) {
            setWidgetName('ID WIDGET')
        }
    }, [tourGuide.currentStep === 14])

    if (!props.show) {
        return null
    }

    return (
        <>
            <section
                className={styles.modal}
                style={{
                    pointerEvents: tourGuide.currentStep === 25 ? 'none' : 'unset',
                }}
                onClick={props.onClose}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <p className={styles.title}> Create New Checker Widget</p>
                        <div className={styles.closeIcon} onClick={props.onClose}>
                            <i>{closeCircleIcon}</i>
                        </div>
                    </div>

                    <div className={styles.modalBody}>
                        <div className={styles.form}>
                            <div className={styles.field}>
                                <label htmlFor="brand-name" className={styles.label}>
                                    brand name
                                </label>
                                <input
                                    type="text"
                                    name="brand-name"
                                    value={widgetName}
                                    onChange={(e) => setWidgetName(e.target.value)}
                                    className={styles.input}
                                    placeholder="IdentityPass Widget"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalFooter}>
                        <div className={styles.form}>
                            <div className={styles.field}>
                                <div className={styles.btnWrapper}>
                                    <button
                                        type="submit"
                                        className={`${styles.btn} ${styles.btnSecondary}`}
                                        disabled={!widgetName || widgetName.length < 3}
                                        onClick={() => props.initCreateWidget(widgetName.trim())}>
                                        {props.loading ? (
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <span>Create Widget</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateWidgetModal
