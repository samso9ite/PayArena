import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accessTokenInfoRequest } from '../../../redux/actions/accessToken'
// import { myOrganisationInfoRequest } from '../../../redux/actions/myOganisation'
import global from '../../../redux/constants/global'
import { RootState } from '../../../redux/reducers'
import LoadingPage from '../../utils/loadingPage'
import NotificationToast from '../../utils/notifToast'
// import global from '../../constants/global'

export default function AuthWrapper(props: any) {
    const [tokenLoading, setTokenLoading] = useState(true)
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(window.location.search)

    useEffect(() => {

        const session = queryParams.get("session") || ""
        
        // const email = queryParams.get("email") || ""
        if (!session) {
            setTokenLoading(false)
        }
        else {
            getLatestToken(session)
        }

    }, []);

    let getLatestToken = (session: string) => {
        setTokenLoading(true)
        const callback = (data: any) => {
            
            if (data?.status) {
                queryParams.delete('session')
                Cookies.set('babtbu', data?.data?.AccessToken
                )
                Cookies.set("org", data?.data?.organisations[0]?.organisation?.id)
                Cookies.set("tenant", data?.data?.tenant?.id)
                Cookies.set("host",  data?.data?.tenant?.host)
                Cookies.set("hostName",  data?.data?.tenant?.name)
                Cookies.set("documentation", data?.data?.tenant?.documentation)
                Cookies.set("sdkUrl", data?.data?.tenant?.sdk_url)
                data?.data?.tenant.products.map((product:any) => {
                    if(product.code == "IDENTITYPASS"){
                        Cookies.set("logo", product.logo)
                        Cookies.set("loader", product.loader)
                    }
                })
                window.location.href = global.appBaseUrl
            } else {
                setNotifTitle("Error")
                setNotif(data?.data)
                setNotifVal(true)
                setTokenLoading(false)
            }
        }
        let data = { 
            values: {
                session
            },
            callback,
        }
        dispatch(accessTokenInfoRequest(data))
    }

    if (tokenLoading === true) {
        return (
            <div>
                {notif && notifVal && (
                    <NotificationToast
                        title={notifTitle}
                        message={notif}
                        closeNotif={() => setNotifVal(!notifVal)}
                    />
                )}
                <LoadingPage />
            </div>
        )
    }
    else {
        return (
            <div>
                {props.children}
            </div>
        )

    }
}
