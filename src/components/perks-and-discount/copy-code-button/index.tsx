import React from 'react'
import Button from '../../form/button/Button'
import './copy-code.css'
import { Copy } from '../../../assets'

const CopyCode = ({ onCopyCode, codeToCopy }: { onCopyCode: () => void; codeToCopy: string }) => {
    return (
        <Button
            onClick={onCopyCode}
            className="d-flex gap-1 align-items-center justify-content-center perks-and-discount-copy-code-btn">
            <div className='mt-1'>{codeToCopy}</div>
            <div>
                <Copy />
            </div>
        </Button>
    )
}

export default CopyCode
