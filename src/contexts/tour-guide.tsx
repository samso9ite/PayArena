import { createContext, FunctionComponent, useState, ReactNode, useEffect } from 'react'
import { RootState } from '../redux/reducers'
import { useDispatch } from 'react-redux'
import { tourGuideStatusRequest } from '../redux/actions/tourGuide'

type Props = {
    children: ReactNode
}

export const TourGuideContext: any = createContext(null || '')

const TourGuideProvider: FunctionComponent<Props> = ({ children }) => {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const dispatch = useDispatch()

    const [tourGuide, setTourGuide] = useState<any>({
        currentStep: 0,
        isActive: null,
        onGoing: false,
        identitypass_data_verification: '',
        identitypass_country_code: '',
        identitypass_channel: '',
        radar_intelligenceCheck: '',
        subscription_key: '',
        subscription_page: '',
        add_team_member: false,
        checker_step: null,
        isCompleted: null,
    })

    let getTourGuideStatus = () => {
        const callback = (data: any) => {
            if (data.status) {
                setTourGuide({
                    ...tourGuide,
                    isActive: data?.data?.completed,
                    isCompleted: data?.data?.completed,
                })
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(tourGuideStatusRequest(data))
    }

    useEffect(() => {
        getTourGuideStatus()
    }, [])

    return (
        <TourGuideContext.Provider value={{ tourGuide, setTourGuide }}>
            {children}
        </TourGuideContext.Provider>
    )
}

export default TourGuideProvider
