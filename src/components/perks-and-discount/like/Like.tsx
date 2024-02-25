import React from 'react'
import { HeartIcon, HeartIconLiked } from '../../../assets'
import './like.css'

const Like = ({ isLiked, ...rest }: { isLiked?: boolean; [key: string]: any }) => {
    return (
        <button {...rest} className="favourie-heart-btn">
            {isLiked ? <HeartIconLiked /> : <HeartIcon />}
        </button>
    )
}

export default Like
