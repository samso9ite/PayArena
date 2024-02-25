import React from 'react'
import './button.css'
import { classnames } from '../../../utils'
import { Spinner } from 'react-bootstrap'

const Button = ({
    className,
    children,
    disabled,
    loading,
    ...rest
}: {
    className?: string
    children: React.ReactNode
    diabled?: boolean
    loading?: boolean
    [key: string]: any
}) => {
    return (
        <button
            {...rest}
            type="button"
            className={`${loading && 'd-flex gap-2 align-items-center'} app-form-btn ${classnames(
                className
            )}`}
            style={{ cursor: `${disabled ? 'not-allowed' : 'pointer'}` }}>
            {loading && (
                <div>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                </div>
            )}
            {children}
        </button>
    )
}

export default Button
