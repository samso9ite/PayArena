import React from 'react'
import aws from '../../../assets/aws.svg'
import './card.css'
import { classnames } from '../../../utils'

const Card = ({
    image,
    children,
    className,
    ...rest
}: {
    image: any
    className?: string
    children: React.ReactNode
    [key: string]: any
}) => {
    return (
        <div {...rest} className={`perks-dsicount-product-card`}>
            <div className='perks-discount-card-image-container'>
                <img className="perks-discount-product-image" src={image} alt="aws" />
            </div>
            <div
                className={`perks-discount-product-desc-container py-3 px-3 pb-5 ${classnames(
                    className
                )}`}>
                {children}
            </div>
        </div>
    )
}

export default Card
