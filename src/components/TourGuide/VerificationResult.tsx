import { SuccessTag, UnavailableTag } from '../utils'
import emptyBox from '../../assets/empty-box.png'
import useTourGuide from '../../hooks/useTourGuide'

const Data = ({ data: { lTitle, lSubtitle, rTitle, rSubtitle } }: any) => {
    return (
        <>
            <div className="row justify-content-between">
                <span className="col-md-6">
                    <small>{lTitle}</small>
                    <p>{lSubtitle}</p>
                </span>
                <span className="col-md-6 text-md-end">
                    <small>{rTitle}</small>
                    <p>{rSubtitle}</p>
                </span>
            </div>
            <hr />
        </>
    )
}

const TourGuideVerificationResult = () => {
    const [tourGuide, setTourGuide] = useTourGuide()
    if (tourGuide.onGoing && tourGuide.currentStep === 11) {
        return (
            <div className="card-body">
                <div className="text-center mb-3">
                    <h5>Verification Result</h5>
                    <SuccessTag />
                </div>
                {[
                    {
                        lTitle: 'Fullname',
                        lSubtitle: 'John Doe',
                        rTitle: 'Fullname',
                        rSubtitle: 'John Doe',
                    },
                    {
                        lTitle: 'Date of Birth',
                        lSubtitle: '20/00/2000',
                        rTitle: 'Email',
                        rSubtitle: 'john.doe@email.com',
                    },
                    {
                        lTitle: 'Phone Number',
                        lSubtitle: '09000000000',
                        rTitle: 'Address',
                        rSubtitle: 'Binami',
                    },
                    {
                        lTitle: 'City',
                        lSubtitle: 'Kiwi',
                        rTitle: 'LGA',
                        rSubtitle: 'Megra',
                    },
                ].map((data) => (
                    <Data data={data} />
                ))}
            </div>
        )
    }
    if ((tourGuide.onGoing && tourGuide.currentStep === 16) || tourGuide.currentStep === 21) {
        return (
            <div className="card-body">
                <div className="text-center mb-3">
                    <h5>Verification Result</h5>
                    <SuccessTag />
                </div>
                {[
                    {
                        lTitle: 'Name',
                        lSubtitle: 'PEACH PAYMENTS',
                        rTitle: 'International Number',
                        rSubtitle: 'RC-1577301',
                    },
                    {
                        lTitle: 'Local Number',
                        lSubtitle: 'RC-1577301',
                        rTitle: 'Country ID',
                        rSubtitle: '234',
                    },
                    {
                        lTitle: 'Date Created',
                        lSubtitle: '2016-04-12',
                        rTitle: 'Date dissolved',
                        rSubtitle: '2021-04-12',
                    },
                    {
                        lTitle: 'Accounting Authority Id',
                        lSubtitle: '42567898EFE',
                        rTitle: 'Short Name',
                        rSubtitle: 'PEACHY',
                    },
                ].map((data) => (
                    <Data data={data} />
                ))}
            </div>
        )
    }
    return (
        <div className="card-body">
            <div className="text-center mb-5">
                <h5>Verification Result</h5>
                <h6>You are yet to make a verification check</h6>
                <small>Verification Status: </small>
                <>
                    <UnavailableTag />
                    <br />
                </>
                <div className="col-md-8 mx-auto">
                    <img src={emptyBox} alt="" className="w-100" />
                </div>
            </div>
        </div>
    )
}

export default TourGuideVerificationResult
