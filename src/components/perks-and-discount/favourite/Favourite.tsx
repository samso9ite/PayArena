import React from 'react'
import { HeartIcon } from '../../../assets'
import './favourite.css'
import Like from '../like/Like'

const Favourite = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="favourite-text d-flex d-justify-content-between align-items-center">
            <div>My Favourites</div>
            <Like />
        </button>
    )
}

export default Favourite
