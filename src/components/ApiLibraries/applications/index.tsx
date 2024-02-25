import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import Moment from 'react-moment'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Select, { components } from 'react-select'
import {
    applicationInfoRequest,
    createApplicationRequest,
    editApplicationRequest,
    getAppTeamMembersInfoRequest,
} from '../../../redux/actions/apiLibraries/applications'
import { RootState } from '../../../redux/reducers'
import Mainloader, { ActiveTag, InactiveTag, InvalidAccessRightComp } from '../../utils'
import NotificationToast from '../../utils/notifToast'
import useTourGuide from '../../../hooks/useTourGuide'

const Option = (props: any) => {
    return (
        <div className="app-option">
            <components.Option {...props}>
                <div>
                    <input
                        type="checkbox"
                        disabled={props.isDisabled}
                        style={{ cursor: 'pointer' }}
                        checked={props.isSelected || props.isDisabled}
                        onChange={() => null}
                        value={props.value}
                        id={props.value}
                    />{' '}
                    <label htmlFor={props.value}>{props.label}</label>
                </div>
            </components.Option>
        </div>
    )
}

export default function Application(props: any) {
    const navigate = useNavigate()
    const [tourGuide, setTourGuide] = useTourGuide()
    const [appModal, setAppModal] = useState(false)
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [appName, setAppName] = useState('')
    const [appId, setAppId] = useState('')
    const [appStatus, setAppStatus] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [deactivateModal, setDeactivateModal] = useState(false)
    const [reactivateModal, setReactivateModal] = useState(false)
    const [appOptions, setAppOptions] = useState<{ label: string; value: string }[]>([])
    const [selectedAssignApp, setSelectedAssignApp] = useState<string[]>([])
    const [ownerId, setOwnerId] = useState('')
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const [isDefaultChecked, setIsDefaultChecked] = useState<boolean>(false)
    const [editProductPermission, setEditProductPermission] = useState<any>([])
    const [editAssignApp, setEditAssignApp] = useState<any>([])
    const [selectedUsers, setSelectedUsers] = useState<any>([])
    const [isToggledFullAccess, setIsToggledFullAccess] = useState(false)
    const [isFullAccessList, setIsFullAccessList] = useState<any>(null)
    const [editSelectedUser, setEditSelectedUser] = useState('')
    const [editSelectedProducts, setEditSelectedProducts] = useState<any>([])

    const applicationInfoState = useSelector((state: RootState) => state.applicationInfoReducer)
    const createApplicationState = useSelector((state: RootState) => state.createApplicationReducer)
    const editApplicationState = useSelector((state: RootState) => state.editApplicationReducer)
    const getAppTeamMembersApplicationState = useSelector(
        (state: RootState) => state.getAppTeamMembersInfoReducer
    )
    const orgRoleState = useSelector((state: RootState) => state.organizationRoleReducer)
    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        getApps()
    }, [])

    useEffect(() => {
        getTeamMembers()
    }, [])

    useEffect(() => {
        if (getAppTeamMembersApplicationState) {
            const id = getAppTeamMembersApplicationState?.resp?.data?.user
            setSelectedAssignApp([id])
            setOwnerId(id)
            const res = getAppTeamMembersApplicationState?.resp?.data?.users
                ?.filter((foo: any) => foo.is_active)
                ?.map((data: { user: { email: string; id: string } }) => ({
                    label: data?.user?.email,
                    value: data?.user?.id,
                    isDisabled: id === data?.user?.id,
                }))
            if (res) {
                setAppOptions([{ label: 'General', value: 'general' }, ...res])
            }
        }
    }, [getAppTeamMembersApplicationState])

    useEffect(() => {
        const selectedId = appOptions?.filter((item: any) => item?.isDisabled)
        const users = appOptions?.filter(
            (item: any) => !item.isDisabled && editAssignApp?.indexOf(item.value) > -1
        )
        // const selectedProducts = appOptions?.map((opt: any) => opt)
        const selectedProducts = getAppTeamMembersApplicationState?.resp?.data?.products?.map(
            (pro: any) => pro.id
        )
        setSelectedUsers(users)
        setEditSelectedUser(selectedId[0]?.value)
    }, [appName, editAssignApp])

    useEffect(() => {
        setIsFullAccessList(isToggledFullAccess)
    }, [isToggledFullAccess])

    useEffect(() => {
        setEditAssignApp(appOptions)
    }, [appOptions])

    useEffect(() => {
        setIsToggledFullAccess(!editProductPermission?.length)
    }, [editModal])

    const handleNext = () => {
        navigate('/API-Library/API-Status')
        setTourGuide({ ...tourGuide, currentStep: 41 })
    }

    const handleBack = () => {
        setTourGuide({ ...tourGuide, currentStep: 39 })
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    let getApps = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
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
        dispatch(applicationInfoRequest(data))
    }

    let createApp = () => {
        const ids = appOptions.map((val: { value: string }) => val.value)?.slice(1)
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('App Successfully created')
                setNotifVal(true)
                setAppModal(false)
                setSelectedProducts([])
                setIsDefaultChecked(false)
                getApps()
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        if (!appName) {
            setNotifTitle('Error')
            setNotif('App Name cannot be blank')
            setNotifVal(true)
            return
        }
        if (!selectedProducts.length && !isDefaultChecked) {
            setNotifTitle('Error')
            setNotif('Provide permission')
            setNotifVal(true)
            return
        }
        const assignedUsers = selectedAssignApp[0] === 'general' ? ids : selectedAssignApp
        let data: any = {
            values: {
                name: appName,
                users: assignedUsers,
                products: selectedProducts,
            },
            callback,
        }
        dispatch(createApplicationRequest(data))
    }

    let editApp = () => {
        const ids = selectedUsers.map((val: { value: string }) => val.value)

        const assignedUsers =
            ids[0] === 'general'
                ? appOptions.map((val: { value: string }) => val.value)?.slice(1)
                : [editSelectedUser, ...ids]

        const selectedProducts = editProductPermission
            ? [...editProductPermission, ...editSelectedProducts]
            : isToggledFullAccess
            ? []
            : [...editSelectedProducts]

        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('App Successfully Edited')
                setNotifVal(true)
                setEditModal(false)
                setAppName('')
                getApps()
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        if (!appName) {
            setNotifTitle('Error')
            setNotif('App Name cannot be blank')
            setNotifVal(true)
            return
        }

        let data: any = {
            values: {
                name: appName,
                application_id: appId,
                is_active: appStatus,
                users: assignedUsers,
                products: selectedProducts,
            },
            callback,
        }
        dispatch(editApplicationRequest(data))
    }

    let getTeamMembers = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
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
        dispatch(getAppTeamMembersInfoRequest(data))
    }

    let deactivateApp = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('App Successfully Deactivated')
                setNotifVal(true)
                setDeactivateModal(false)
                setAppName('')
                getApps()
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                name: appName,
                application_id: appId,
                is_active: 0,
            },
            callback,
        }
        dispatch(editApplicationRequest(data))
    }

    let reactivateApp = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('App Successfully Reactivated')
                setNotifVal(true)
                setReactivateModal(false)
                setAppName('')
                getApps()
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                name: appName,
                application_id: appId,
                is_active: 1,
            },
            callback,
        }
        dispatch(editApplicationRequest(data))
    }

    let copyFunc = (val: any) => {
        navigator.clipboard.writeText(val)
        setNotifTitle('Success')
        setNotif('Copied to Clipboard')
        setNotifVal(true)
    }

    const handleGrantFullAccess = (e: any) => {
        setIsToggledFullAccess(e.target.checked)
        setEditSelectedProducts([])
        setEditProductPermission([])
    }

    const handleAddProductPermission = (e: { target: { checked: boolean; value: string } }) => {
        const { checked, value } = e.target
        if (checked) {
            setSelectedProducts([...selectedProducts, value])
        } else {
            const newArr = selectedProducts.filter((product: any) => product !== value)
            setSelectedProducts(newArr)
        }
    }

    const handleEditProductPermission = (e: { target: { checked: boolean; value: string } }) => {
        const { checked, value } = e.target

        if (!checked) {
            const newArr = editSelectedProducts.filter((id: any) => id !== value)
            setEditSelectedProducts(newArr)
            setIsToggledFullAccess(false)
            setEditProductPermission([])
        } else {
            setEditSelectedProducts([...editSelectedProducts, value])
        }
    }

    const handleToggleAssignApp = (values: any) => {
        const ids: string[] = values.map((val: { value: string }) => val.value)
        setSelectedAssignApp([ownerId, ...ids])
    }

    const handleToggleEditApp = (selected: any) => {
        setSelectedUsers(selected)
    }

    return (
        <div>
            {tourGuide.currentStep === 40 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-40 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>5/8</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Create new application</h5>
                                    <p>
                                        Click{' '}
                                        <span className="info"> “Create new application”</span> to
                                        create applications for each of your products or businesses.
                                    </p>
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

            {applicationInfoState?.isLoading && <Mainloader />}

            {appModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span onClick={() => setAppModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Create New Application</h5>
                                </div>

                                <div>
                                    <div className="">
                                        <label htmlFor="email">App Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(name) => setAppName(name.target.value)}
                                            placeholder="Identitypass App"
                                        />
                                    </div>

                                    <div className="">
                                        <label htmlFor="password">Assign App</label>
                                        <Select
                                            styles={{
                                                control: (baseStyles: any, state: any) => ({
                                                    ...baseStyles,
                                                    minHeight: '30px',
                                                }),
                                                option: (provided: any, state: any) => ({
                                                    ...provided,
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    padding: '0px 10px',
                                                }),
                                            }}
                                            isMulti
                                            name="colors"
                                            options={appOptions}
                                            components={{
                                                Option,
                                            }}
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            onChange={handleToggleAssignApp}
                                        />
                                    </div>
                                    <div className="main-modal-header col-md-8 col-lg-5 mt-4">
                                        <h5>Product Permissions</h5>
                                    </div>
                                    {!getAppTeamMembersApplicationState?.isLoading && (
                                        <div className="d-flex align-items-center">
                                            <p className="pb-0 mb-0 mt-3">Full Access</p>
                                            <label className="switch ms-3">
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        setIsDefaultChecked(e.target.checked)
                                                    }
                                                />
                                                <span className="slider" />
                                            </label>
                                        </div>
                                    )}

                                    <div
                                        className="roles-name mt-3"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '20px',
                                        }}>
                                        {getAppTeamMembersApplicationState?.isLoading ? (
                                            <p>Fetching permissions</p>
                                        ) : (
                                            getAppTeamMembersApplicationState &&
                                            getAppTeamMembersApplicationState?.resp?.data?.products?.map(
                                                (product: any) => (
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                        }}>
                                                        <input
                                                            checked={
                                                                isDefaultChecked ||
                                                                selectedProducts.includes(
                                                                    product.id
                                                                )
                                                            }
                                                            type="checkbox"
                                                            value={product.id}
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                            }}
                                                            onChange={handleAddProductPermission}
                                                        />
                                                        {product.name}
                                                    </span>
                                                )
                                            )
                                        )}
                                    </div>

                                    <button
                                        className="btn btn-deep-green py-2 mt-4"
                                        onClick={createApp}>
                                        {createApplicationState.isLoading ? (
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
                                            'Create App'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span
                            onClick={() => {
                                setEditModal(false)
                                setAppName('')
                                setEditAssignApp([])
                                setSelectedUsers([])
                            }}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Edit Application Name</h5>
                                </div>

                                <div>
                                    <div className="">
                                        <label htmlFor="email">App Name</label>
                                        <input
                                            type="text"
                                            value={appName}
                                            className="form-control"
                                            onChange={(name) => setAppName(name.target.value)}
                                            placeholder="Identitypass App"
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="password">Assign App</label>
                                        <Select
                                            value={selectedUsers}
                                            styles={{
                                                control: (baseStyles: any, state: any) => ({
                                                    ...baseStyles,
                                                    minHeight: '30px',
                                                }),
                                                option: (provided: any, state: any) => ({
                                                    ...provided,
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    padding: '0px 10px',
                                                }),
                                            }}
                                            isMulti
                                            name="colors"
                                            options={appOptions}
                                            components={{
                                                Option,
                                            }}
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            onChange={handleToggleEditApp}
                                        />
                                    </div>
                                    <div className="main-modal-header col-md-8 col-lg-5 mt-4">
                                        <h5>Product Permissions</h5>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p className="pb-0 mb-0 mt-3">Full Access</p>
                                        <label className="switch ms-3">
                                            <input
                                                type="checkbox"
                                                onChange={handleGrantFullAccess}
                                                checked={isToggledFullAccess}
                                            />
                                            <span className="slider" />
                                        </label>
                                    </div>

                                    <div
                                        className="roles-name mt-3"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '20px',
                                        }}>
                                        {getAppTeamMembersApplicationState &&
                                            getAppTeamMembersApplicationState?.resp?.data?.products?.map(
                                                (product: any) => (
                                                    <span
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '10px',
                                                        }}>
                                                        <input
                                                            checked={
                                                                editProductPermission?.includes(
                                                                    product.id
                                                                ) ||
                                                                editSelectedProducts.includes(
                                                                    product.id
                                                                ) ||
                                                                isToggledFullAccess
                                                            }
                                                            type="checkbox"
                                                            value={product.id}
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                            }}
                                                            onChange={handleEditProductPermission}
                                                        />
                                                        {product.name}
                                                    </span>
                                                )
                                            )}
                                    </div>

                                    <button
                                        className="btn btn-deep-green py-2 mt-4"
                                        onClick={editApp}>
                                        {editApplicationState.isLoading ? (
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
                                            'Edit App'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {deactivateModal && (
                <div className="main-modal ">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span
                            onClick={() => {
                                setAppName('')
                                setDeactivateModal(false)
                            }}>
                            <i className="ri-close-line close-modal" />
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center mt-4">
                                    <h5>Are you sure?</h5>
                                    <p>Do you want to deactivate "{appName}" </p>

                                    <button
                                        className="btn btn-deep-green-outline py-2  mt-3 me-3"
                                        onClick={() => {
                                            setAppName('')
                                            setDeactivateModal(false)
                                        }}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-deep-green py-2 mt-3"
                                        onClick={deactivateApp}>
                                        {editApplicationState.isLoading ? (
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
                                            'Yes, Deactivate'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {reactivateModal && (
                <div className="main-modal ">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span
                            onClick={() => {
                                setAppName('')
                                setReactivateModal(false)
                            }}>
                            <i className="ri-close-line close-modal" />
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center mt-4">
                                    <h5>Are you sure?</h5>
                                    <p>Do you want to Reactivate "{appName}" </p>

                                    <button
                                        className="btn btn-deep-green-outline py-2  mt-3 me-3"
                                        onClick={() => {
                                            setAppName('')
                                            setReactivateModal(false)
                                        }}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-deep-green py-2 mt-3"
                                        onClick={reactivateApp}>
                                        {editApplicationState.isLoading ? (
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
                                            'Yes, Deactivate'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!applicationInfoState?.isLoading && (
                <>
                    {props?.userRights?.includes('APPLICATION') ? (
                        <div className="container-fluid px-md-4">
                            <div className="main-table-area mt-5">
                                <div className="table-header pb-3">
                                    <div className="row d-flex justify-content-between align-items-start">
                                        <div className="col-md-5">
                                            <h5>Applications</h5>
                                            <p>Find all your application IDs here</p>
                                        </div>
                                        <div
                                            className={`col-md-7 text-md-end ${
                                                tourGuide.currentStep === 40
                                                    ? 'tour-guide-create-app'
                                                    : ''
                                            }`}>
                                            {orgRoleState?.resp?.data?.map((val: any) => {
                                                if (
                                                    organisationInfoState?.resp?.data
                                                        ?.permission === val?.id &&
                                                    (val?.name === 'Business Owner' ||
                                                        val?.name === 'Admin')
                                                ) {
                                                    return (
                                                        <button
                                                            className="btn btn-deep-green py-2"
                                                            onClick={() => setAppModal(true)}>
                                                            Create New Application
                                                        </button>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive mt-4">
                                <table className="table ">
                                    <thead className="">
                                        <tr>
                                            <th scope="col">App Name</th>
                                            <th scope="col">App ID</th>
                                            <th scope="col">Created By</th>
                                            <th scope="col">Date Created</th>
                                            <th scope="col">Status</th>
                                            {orgRoleState?.resp?.data?.map((val: any) => {
                                                if (
                                                    organisationInfoState?.resp?.data
                                                        ?.permission === val?.id &&
                                                    (val?.name === 'Business Owner' ||
                                                        val?.name === 'Admin')
                                                ) {
                                                    return <th scope="col">Actions</th>
                                                }
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicationInfoState.resp?.data?.map(
                                            (value: any, index: any) => (
                                                <tr key={index}>
                                                    <th scope="row">{value?.name}</th>
                                                    <td>
                                                        {value?.id}
                                                        <button
                                                            className="btn btn-copy ms-3"
                                                            onClick={() => copyFunc(value.id)}>
                                                            Copy
                                                        </button>
                                                    </td>
                                                    <td>
                                                        {value?.created_by.hasOwnProperty(
                                                            'first_name'
                                                        )
                                                            ? `${value?.created_by?.first_name} ${value?.created_by?.last_name}`
                                                            : value?.created_by}{' '}
                                                    </td>
                                                    {/* <td>{value?.created_at}</td> */}
                                                    <td>
                                                        <Moment format="D MMM YYYY" withTitle>
                                                            {value?.created_at}
                                                        </Moment>
                                                    </td>
                                                    <td>
                                                        {value?.is_active ? (
                                                            <ActiveTag />
                                                        ) : (
                                                            <InactiveTag />
                                                        )}
                                                    </td>
                                                    {orgRoleState?.resp?.data?.map((val: any) => {
                                                        if (
                                                            organisationInfoState?.resp?.data
                                                                ?.permission === val?.id &&
                                                            (val?.name === 'Business Owner' ||
                                                                val?.name === 'Admin')
                                                        ) {
                                                            return (
                                                                <td>
                                                                    <button
                                                                        className="btn btn-edit"
                                                                        onClick={() => {
                                                                            setAppStatus(
                                                                                value?.is_active
                                                                            )
                                                                            setAppName(value?.name)
                                                                            setAppId(value?.id)
                                                                            setEditProductPermission(
                                                                                value?.products
                                                                            )
                                                                            setEditAssignApp(
                                                                                value?.users
                                                                            )
                                                                            setEditModal(true)
                                                                        }}>
                                                                        Edit
                                                                    </button>
                                                                    {value?.is_active ? (
                                                                        <button
                                                                            className="btn btn-deactivate"
                                                                            onClick={() => {
                                                                                setAppName(
                                                                                    value?.name
                                                                                )
                                                                                setAppId(value?.id)
                                                                                setDeactivateModal(
                                                                                    true
                                                                                )
                                                                            }}>
                                                                            Deactivate
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            className="btn btn-edit"
                                                                            onClick={() => {
                                                                                setAppName(
                                                                                    value?.name
                                                                                )
                                                                                setAppId(value?.id)
                                                                                setReactivateModal(
                                                                                    true
                                                                                )
                                                                            }}>
                                                                            Reactivate
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            )
                                                        }
                                                    })}
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <InvalidAccessRightComp />
                    )}
                </>
            )}
        </div>
    )
}
