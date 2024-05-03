import React from 'react'
import LoadingPageLogo from '../../../assets/loadingPageLogo.svg'
import upLogo from '../../../assets/upLogo.png'
import loadingPageGif from '../../../assets/loadingPageGif.gif'
import Cookies from 'js-cookie'

const Loader = () => {
    let passLogo = upLogo || ''

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: '100%', flexDirection: 'column' }}>
            <div style={{ width: '200px', position: 'relative', bottom: '-50px' }}>
                <img src={passLogo} alt="" className="w-100" />
            </div>
            <div style={{ width: '200px', paddingTop:"15%" }}>
                <img src={loadingPageGif} alt="" className="w-100" />
            </div>
        </div>
    )
}

export default Loader
