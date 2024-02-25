import { useContext } from 'react'
import { TourGuideContext } from '../contexts/tour-guide'

const useTourGuide = () => {
    const { tourGuide, setTourGuide } = useContext<any>(TourGuideContext)

    return [tourGuide, setTourGuide]
}

export default useTourGuide
