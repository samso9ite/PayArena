import React from 'react'
import LoadingPageLogo from '../../assets/loadingPageLogo.svg'
import loadingPageGif from '../../assets/loadingPageGif.gif'

export default function LoadingPage() {
  return (
    <div className='loading-page-area'>
        <div>
          <div style={{width:"200px",position:"relative", bottom: "-50px"}}>
            <img src={LoadingPageLogo} alt="" className='w-100' />
          </div>
          <div style={{width:"200px",  paddingTop:"8%"}}>
            <img src={loadingPageGif} alt="" className='w-100' />
          </div>
        </div>
    </div>
  )
}
