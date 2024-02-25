import React from 'react'
import './modal.css'
import { classnames } from '../../utils'
import { CancelIncon } from '../../assets'
// import { ModalCancelIcon } from '../../assets'

const Modal = ({
    open,
    setOpen,
    children,
    modalCardClasses,
    modalTitle,
    showCancel = true,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
    modalCardClasses?: string
    modalTitle: string
    showCancel?: boolean
}) => {
    const handleCloseModal = () => {
        setOpen((prev) => !prev)
    }
    return (
        <div className="main-modal d-flex justify-content-center align-items-center">
            <div className={`modal-inner-card ${classnames(modalCardClasses)}`}>
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="modal-title">{modalTitle}</h6>
                    {showCancel && (
                        <CancelIncon onClick={handleCloseModal} style={{ cursor: 'pointer' }} />
                    )}
                </div>
                <div className="mt-3">{children}</div>
            </div>
        </div>
    )
}

export default Modal
