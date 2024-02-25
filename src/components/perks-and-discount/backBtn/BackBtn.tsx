import React from 'react'
import './backbtn.css'
import { ArrowBackRounded } from '../../../assets'
import { classnames } from '../../../utils'

const BackBtn = ({ onClick, className, text }: { onClick: () => void; className?: string, text: string }) => {
    return (
        <button onClick={onClick} className={`d-flex backbtn-container ${classnames(className)}`}>
            <div>
                <ArrowBackRounded />
            </div>
            <h6 className="backbtn-current-page-title">{text}</h6>
        </button>
    )
}

export default BackBtn
