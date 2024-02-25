import React from 'react'
import './banner.css'
import info from '../../../assets/info.svg'
import ribbon from '../../../assets/ribbon.svg'
import cancel from '../../../assets/cancel.svg'

const Banner = ({
    onClick,
    disabled,
    ...rest
}: {
    onClick: () => void
    [key: string]: any
    disabled?: boolean
}) => {
    return (
        <div className="perks-discount-bannner-container">
            <div className="perks-discount-info-text-container">
                <img src={info} alt="info" />
                <div className="">
                    {/* <img src={ribbon} /> */}
                    <div className="perks-discount-banner-sub-title">
                        Complete a minimum of three live verifications via the API, Dashboard, or
                        SDK every month to get continuous access.
                    </div>
                </div>
            </div>

            <button
                style={{ cursor: `${disabled ? 'not-allowed' : 'pointer'}` }}
                disabled={disabled}
                onClick={onClick}
                className="banner-close-btn">
                <img src={cancel} />
            </button>
        </div>
    )
}

export default Banner
