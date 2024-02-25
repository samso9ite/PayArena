import { useEffect, useState } from 'react'
import { Spinner, Tab, Tabs } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    addContactInfoRequest,
    contactInfoRequest,
    preferenceInfoRequest,
    removeContactInfoRequest,
    updatePreferenceInfoRequest,
} from '../../../redux/actions/settings/notificationSettings'
import { RootState } from '../../../redux/reducers'
import { EmptyStateComp, removeLetters, removeNumbers } from '../../utils'
import { emailValidator } from '../../utils/emailValidator'
import NotificationToast from '../../utils/notifToast'
import useTourGuide from '../../../hooks/useTourGuide'

export default function NotificationSettings(props: any) {
    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [newsletter, setNewsletter] = useState('')
    const [lowWallet, setLowWallet] = useState('')
    const [newsUpdate, setNewsUpdate] = useState('')

    const [targetTab, setTargetTab] = useState('preferences')
    const [addModal, setAddModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [ref, setRef] = useState('')

    const preferenceInfoState = useSelector((state: RootState) => state.preferenceInfoReducer)
    const updatePreferenceInfoState = useSelector(
        (state: RootState) => state.updatePreferenceInfoReducer
    )
    const contactInfoState = useSelector((state: RootState) => state.contactInfoReducer)
    const addContactInfoState = useSelector((state: RootState) => state.addContactInfoReducer)
    const removeContactInfoState = useSelector((state: RootState) => state.removeContactInfoReducer)

    const dispatch = useDispatch()

    let validateEmail = emailValidator(email.toLowerCase())

    useEffect(() => {
        getPreferenceInfo()
        getContactInfo()
    }, [])

    useEffect(() => {
        if ([58].includes(tourGuide.currentStep)) {
            setTargetTab('preferences')
            setNewsletter('1')
            setLowWallet('1')
            setNewsUpdate('1')
        }
    }, [tourGuide])
    useEffect(() => {
        if ([59].includes(tourGuide.currentStep)) {
            setTargetTab('contacts')
        }
    }, [tourGuide])

    let getPreferenceInfo = () => {
        const callback = (data: any) => {
            if (data?.status) {
                setNewsletter(data?.data[0]?.newsletter ? '1' : '0')
                setLowWallet(data?.data[0]?.low_wallet ? '1' : '0')
                setNewsUpdate(data?.data[0]?.new_update ? '1' : '0')
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
        dispatch(preferenceInfoRequest(data))
    }

    let updatePreferences = () => {
        const callback = (data: any) => {
            if (data.status) {
                getPreferenceInfo()
                setNotifTitle('Success')
                setNotif('Preferences Updated Successfully')
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                newsletter: newsletter,
                low_wallet: lowWallet,
                new_update: newsUpdate,
            },
            callback,
        }
        dispatch(updatePreferenceInfoRequest(data))
    }

    let getContactInfo = () => {
        const callback = (data: any) => {
            if (!data?.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(contactInfoRequest(data))
    }

    let addContact = () => {
        const callback = (data: any) => {
            if (data.status) {
                getContactInfo()
                setAddModal(false)
                setNotifTitle('Success')
                setNotif('Contact Updated Successfully')
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }

        if (!name) {
            setNotifTitle('Error')
            setNotif('Please enter a name')
            setNotifVal(true)
        }
        if (!email) {
            setNotifTitle('Error')
            setNotif('Please enter an email')
            setNotifVal(true)
        }

        if (!validateEmail.status) {
            setNotifTitle('Error')
            setNotif(validateEmail.message)
            setNotifVal(true)
            return
        }
        if (!phone) {
            setNotifTitle('Error')
            setNotif('Please enter your phone number')
            setNotifVal(true)
        }
        let data: any = {
            values: {
                name,
                email,
                phone,
            },
            callback,
        }
        dispatch(addContactInfoRequest(data))
    }

    let removeContact = () => {
        const callback = (data: any) => {
            if (data.status) {
                getContactInfo()
                setRemoveModal(false)
                getContactInfo()
                setNotifTitle('Success')
                setNotif('Contact Deleted Successfully')
                setNotifVal(true)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                ref,
            },
            callback,
        }
        dispatch(removeContactInfoRequest(data))
    }

    const handleNext = () => {
        navigate('/Notifications')
        setTourGuide({ ...tourGuide, currentStep: 60 })
    }

    const handleBack = () => {
        setTourGuide({ ...tourGuide, currentStep: 58 })
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    return (
        <div>
            {tourGuide.currentStep === 59 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-59 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                {/* <p>11/11</p> */}
                                {props?.userRights?.includes('BUSINESS_INFORMATION') &&
                                !props?.userRights?.includes('TEAM_MANAGEMENT') &&
                                !props?.userRights?.includes('ROLES') &&
                                props?.userRights?.includes('NOTIFICATION') ? (
                                    <p>5/5</p>
                                ) : (
                                    <p>11/11</p>
                                )}
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Add contact</h5>
                                    <p>Add contacts that you want to receive notifications.</p>
                                </div>
                                <div className="text-left d-flex flex-row align-items-center justify-content-between btn-reset">
                                    <button
                                        className="btn btn-deep-green-outline"
                                        onClick={handleBack}>
                                        Back
                                    </button>
                                    <button className="btn btn-dark-green" onClick={handleNext}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {addModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span onClick={() => setAddModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Add New Contact</h5>
                                </div>

                                <div>
                                    <div className="">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="John"
                                            value={name}
                                            onChange={(name) =>
                                                setName(removeNumbers(name.target.value))
                                            }
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="johndoe@prembly.com"
                                            value={email}
                                            onChange={(mail) =>
                                                setEmail(mail.target.value.toLowerCase())
                                            }
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="2348012345678"
                                            value={phone}
                                            onChange={(phone) =>
                                                setPhone(removeLetters(phone.target.value))
                                            }
                                        />
                                    </div>

                                    <button
                                        className="btn btn-deep-green py-2 mt-4"
                                        onClick={addContact}>
                                        {addContactInfoState.isLoading ? (
                                            <div>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ) : (
                                            'Add Contact'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {removeModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span onClick={() => setRemoveModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center">
                                    <div className="text-center">
                                        <h5>Are you sure?</h5>
                                        <p>
                                            Do you want to delete "{email}" from your contact list?
                                        </p>
                                    </div>
                                    <button
                                        className="btn btn-deep-green-outline py-2 mt-3 me-3"
                                        onClick={() => setRemoveModal(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-deep-green py-2 mt-3"
                                        onClick={removeContact}>
                                        {removeContactInfoState.isLoading ? (
                                            <div>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ) : (
                                            'Yes, Delete'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-header mt-4">
                <div className="row d-flex justify-content-between">
                    <div className="col-md-8">
                        <h5>Notifications</h5>
                        <p>
                        Configure and oversee your
                        notification settings.
                        </p>
                    </div>
                    {targetTab === 'contacts' && (
                        <div
                            className={`col-md-4 text-end ${
                                tourGuide.currentStep === 59 ? 'tour-guide-add-role' : ''
                            }`}>
                            <button
                                className="btn btn-deep-green px-3"
                                onClick={() => setAddModal(true)}>
                                {' '}
                                Add Contact
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="main-tabs mt-3">
                <Tabs
                    // defaultActiveKey="preferences"
                    id="notifTabs"
                    className=" main-tab-card"
                    onSelect={(e: any) => setTargetTab(e)}
                    activeKey={targetTab}>
                    <Tab eventKey="preferences" title="Preferences">
                        <div className="col-md-12 col-lg-9 my-3">
                            <div className=" mt-3 col d-flex align-items-center">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={newsletter === '1' ? true : false}
                                        onChange={(e) =>
                                            setNewsletter(e.target.checked ? '1' : '0')
                                        }
                                    />
                                    <span className="slider" />
                                </label>
                                <h6 className="ms-3 mt-2 pb-0 mb-0">Monthly Newsletter</h6>
                            </div>
                            <div className="offset-md-1">
                                <small>
                                    You will receive timely updates on verification trends and our
                                    most recent accomplishments, as we are committed to ensuring
                                    your continuous awareness and engagement.
                                </small>
                            </div>

                            <div className=" mt-3 col d-flex align-items-center">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={lowWallet === '1' ? true : false}
                                        onChange={(e) => setLowWallet(e.target.checked ? '1' : '0')}
                                    />
                                    <span className="slider" />
                                </label>
                                <h6 className="ms-3 mt-2 pb-0 mb-0">Low Wallet Balance</h6>
                            </div>
                            <div className="offset-md-1">
                                <small>
                                    Upon enabling this notification, you will receive alerts via
                                    email and your dashboard whenever your wallet balance is running
                                    low.
                                </small>
                            </div>

                            <div className=" mt-3 col d-flex align-items-center">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={newsUpdate === '1' ? true : false}
                                        onChange={(e) =>
                                            setNewsUpdate(e.target.checked ? '1' : '0')
                                        }
                                    />
                                    <span className="slider" />
                                </label>
                                <h6 className="ms-3 mt-2 pb-0 mb-0">New Updates on Prembly</h6>
                            </div>
                            <div className="offset-md-1">
                                <small>
                                    As Prembly continues to enhance and streamline your security and
                                    compliance experience, you will receive up-to-date notifications
                                    regarding our product enhancements.
                                </small>
                            </div>
                            <button className="btn btn-deep-green mt-4" onClick={updatePreferences}>
                                {updatePreferenceInfoState.isLoading ? (
                                    <div>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </Tab>
                    <Tab eventKey="contacts" title="Contacts">
                        <div>
                            {contactInfoState?.resp?.data?.length > 0 ? (
                                <div className="table-responsive mt-4">
                                    <table className="table ">
                                        <thead className="">
                                            <tr>
                                                <th scope="col">S/N</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email Address</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {contactInfoState?.resp?.data?.map(
                                                (val: any, i: number) => (
                                                    <tr>
                                                        <th scope="row"> {i + 1}</th>
                                                        <td>{val?.name}</td>
                                                        <td>{val?.email}</td>
                                                        <td>{val?.phone}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-deactivate"
                                                                onClick={() => {
                                                                    setRef(val?.id)
                                                                    setEmail(val?.email)
                                                                    setRemoveModal(true)
                                                                }}>
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="col-md-8 mx-auto py-4">
                                    <div className="my-5">
                                        <EmptyStateComp
                                            title={'Contact Information'}
                                            ctaAction={() => {
                                                setAddModal(true)
                                            }}
                                            desc={'You are yet to add a notification contact'}
                                            ctaValue={'Add Contact'}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}
