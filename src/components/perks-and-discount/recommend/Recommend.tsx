import React from 'react'
import './recommend.css'
import Button from '../../form/button/Button'
import { Cancel } from '../../../assets'

const Recommend = ({ close, recommend }: { close: () => void; recommend: () => void }) => {
    return (
        <div className="recommend-container">
            <div className="recommend-no-result-text">No result found</div>
            <div className="d-flex align-items-center gap-2">
                <Button onClick={recommend} className="recommend-btn">
                    Recommend Product
                </Button>
                <Button onClick={close} className="recommend-cancel-btn">
                    <Cancel />
                </Button>
            </div>
        </div>
    )
}

export default Recommend
