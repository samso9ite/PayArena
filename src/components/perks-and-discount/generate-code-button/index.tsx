import React from 'react'
import Button from '../../form/button/Button'
import './generate-code.css'
import CopyCode from '../copy-code-button'

const GenerateCode = ({
    showComp,
    showCode,
    onGenerateCode,
    onCopyCode,
    codeToCopy,
    disable,
}: {
    showComp: boolean
    showCode: boolean
    onGenerateCode: () => void
    onCopyCode: () => void
    codeToCopy: string
    disable: boolean
}) => {
    return (
        <>
            {showComp && (
                <>
                    {showCode ? (
                        <CopyCode codeToCopy={codeToCopy} onCopyCode={onCopyCode} />
                    ) : (
                        <Button
                            disabled={disable}
                            className="perks-and-discount-generate-code-btn"
                            onClick={onGenerateCode}>
                            Generate Code
                        </Button>
                    )}
                </>
            )}
        </>
    )
}

export default GenerateCode
