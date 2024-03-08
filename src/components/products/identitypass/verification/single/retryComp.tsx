export default function RetryVerification() {

    const handleSingleVerification = (props:any) => {
        props.verify()
    }
    return(
        <span
        className="d-flex align-items-center btn btn-deep-green mx-auto my-3 "
        style={{ width: 'fit-content' }} onClick={handleSingleVerification}>
            Retry Verification
    </span>
    )
}