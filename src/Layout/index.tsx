import useTourGuide from '../hooks/useTourGuide'

const steps: number[] = [1, 5, 17, 22, 32, 36, 37, 39, 41, 42, 43, 44, 45, 49, 60, 61]

const Layout = ({ className, children }: any) => {
    const [tourGuide, _] = useTourGuide()
    return (
        <div
            className={`${className} ${
                tourGuide.onGoing && steps.includes(tourGuide.currentStep)
                    ? 'app-side-guide'
                    : tourGuide.onGoing && !steps.includes(tourGuide.currentStep)
                    ? 'app-main-guide'
                    : ''
            }
    `}>
            {children}
        </div>
    )
}

export default Layout
