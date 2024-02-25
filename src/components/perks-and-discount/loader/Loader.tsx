import React from 'react'
import LoadingPageLogo from '../../../assets/loadingPageLogo.svg'
import loadingPageGif from '../../../assets/loadingPageGif.gif'

const Loader = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: '100%', flexDirection: 'column' }}>
            <div style={{ width: '200px', position: 'relative', bottom: '-50px' }}>
                <img src={LoadingPageLogo} alt="" className="w-100" />
            </div>
            <div style={{ width: '200px', paddingTop:"8%" }}>
                <img src={loadingPageGif} alt="" className="w-100" />
            </div>
        </div>
    )
}

export default Loader
