import React from 'react'
import './seeall.css'

const SeeAll = ({ text, icon, onClick }: { text: string; icon: any; onClick?: () => void }) => {
    return (
        <button onClick={onClick} className="see-all-btn d-flex align-items-center">
            <div>{text}</div>
            {icon}
        </button>
    )
}

export default SeeAll
