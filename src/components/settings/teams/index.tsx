import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { organizationRoleRequest } from '../../../redux/actions/settings/roles'
import {
    activateTeamMemberRequest,
    changeTeamMemberRoleRequest,
    createTeamMemberRequest,
    deactivateTeamMemberRequest,
    deleteTeamMemberRequest,
    teamInfoRequest,
} from '../../../redux/actions/settings/team'
import global from '../../../redux/constants/global'
import { RootState } from '../../../redux/reducers'
import MainTable from '../../mainTable'
import Mainloader from '../../utils'
import { emailValidator } from '../../utils/emailValidator'
import NotificationToast from '../../utils/notifToast'
import useTourGuide from '../../../hooks/useTourGuide'
export default function TeamsComp(props: any) {
    const [tourGuide, setTourGuide] = useTourGuide()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [teamModal, setTeamModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [activateModal, setActivateModal] = useState(false)
    const [deactivateModal, setDeactivateModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [email, setEmail] = useState('')
    const [permission, setPermission] = useState('')
    const [name, setName] = useState('')
    const [teamId, setTeamId] = useState('')
    const [searchVal, setSearchVal] = useState('')
     const [filteredModal, setFilteredModal] = useState(false)
     const [filteredTeamPermissionList, setFilteredTeamPermissionList] = useState([])
     const [teamPermissionList, setTeamPermissionList] = useState([])
     const [teamLists, setTeamLists] = useState([])
     const [filters, setFilters] = useState({
         name: '',
         is_active: 'true',
    })
    const [searchItem, setSearchItem] = useState('')
    const teamInfoState = useSelector((state: RootState) => state.teamInfoReducer)
    const orgRoleState = useSelector((state: RootState) => state.organizationRoleReducer)
    const changeRoleState = useSelector((state: RootState) => state.changeTeamMemberRoleReducer)
    const createMemberState = useSelector((state: RootState) => state.createTeamMemberReducer)
    const activateMemberState = useSelector((state: RootState) => state.activateTeamMemberReducer)
    const deactivateMemberState = useSelector(
        (state: RootState) => state.deactivateTeamMemberReducer
    )
    const deleteMemberState = useSelector((state: RootState) => state.deleteTeamMemberReducer)
    const organisationInfoState = useSelector((state: RootState) => state.organisationInfoReducer)
    const dispatch = useDispatch()
    let validateEmail = emailValidator(email.toLowerCase())
    useEffect(() => {
        if (tourGuide.currentStep === 54) {
            setTeamModal(true)
        }
    }, [tourGuide])
    useEffect(() => {
        getTeamInfo()
        getOrgRole()
    }, [])
    let getTeamInfo = () => {
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
        dispatch(teamInfoRequest(data))
    }
    let getOrgRole = () => {
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
        dispatch(organizationRoleRequest(data))
    }
    let addMember = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Team member successfully invited')
                setNotifVal(true)
                getTeamInfo()
                setTeamModal(false)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        if (!email) {
            setNotifTitle('Error')
            setNotif('Email is required')
            setNotifVal(true)
            return
        }
        if (validateEmail.status) {
            setNotif(validateEmail.message)
            setNotifVal(false)
        }
        if (!validateEmail.status) {
            setNotifTitle('Error')
            setNotif(validateEmail.message)
            setNotifVal(true)
            return
        }
        if (!permission) {
            setNotifTitle('Error')
            setNotif('Please Select a role for the user')
            setNotifVal(true)
            return
        }
        let data: any = {
            values: {
                email,
                permission_id: permission,
                url_path: global.appBaseUrl + 'Accept-Invitation',
            },
            callback,
        }
        dispatch(createTeamMemberRequest(data))
    }
    let editMemberRole = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Team member role successfully edited')
                setNotifVal(true)
                getTeamInfo()
                setEditModal(false)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                team_id: teamId,
                permission_id: permission,
            },
            callback,
        }
        dispatch(changeTeamMemberRoleRequest(data))
    }
    let activateMember = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
                setActivateModal(false)
                getTeamInfo()
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                email,
            },
            callback,
        }
        dispatch(activateTeamMemberRequest(data))
    }
    let deactivateMember = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif(data.detail)
                setNotifVal(true)
                setDeactivateModal(false)
                getTeamInfo()
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                email,
            },
            callback,
        }
        dispatch(deactivateTeamMemberRequest(data))
    }
    let deleteMember = () => {
        const callback = (data: any) => {
            if (data.status) {
                setNotifTitle('Success')
                setNotif('Member successfully deleted')
                setNotifVal(true)
                setDeleteModal(false)
                getTeamInfo()
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                email,
            },
            callback,
        }
        dispatch(deleteTeamMemberRequest(data))
    }
    const handleNext = () => {
        setTourGuide({ ...tourGuide, currentStep: 55 })
        setTeamModal(false)
    }
    const handleBack = () => {
        setTourGuide({ ...tourGuide, currentStep: 53 })
        setTeamModal(false)
    }
    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }
    const filterModal = () => {
        setFilteredModal(true)
    }
    const handleCloseModal = () => {
        setFilteredModal(false)
    }
     const handleFilters = (e: any) => {
         e.preventDefault()
         const status = filters.is_active === 'true' ? true : false
        //  const results = teamPermissionList.filter(
         const results = teamLists.filter(
             (roles: any) =>
                 roles?.permission?.name === filters.name && roles?.user?.is_active === status
         )
         setFilteredTeamPermissionList(results)
     }

     const handleFiltersChange = (e: any) => {
         setFilters((prevs: any) => ({ ...prevs, [e.target.name]: e.target.value }))
     }

     const handleUserSearch = (searchKey: string) => {
         let newSearchKey = searchKey.toLowerCase()

        //  const filterNewUsers = teamPermissionList.filter(
         let tempUserData: any = []
         const filterNewUsers = filteredTeamPermissionList.filter(
             (user: any) =>
                 // {user:{first_name: string, last_name: string, email: string}}
                 user?.user?.first_name?.toLowerCase().includes(newSearchKey) ||
                 user?.user?.last_name?.toLowerCase().includes(newSearchKey) ||
                 user?.user?.email?.toLowerCase().includes(newSearchKey)
         )
         setFilteredTeamPermissionList(filterNewUsers)
     }

     useEffect(() => {
         if (teamInfoState) {
            const removeDuplicates = teamInfoState?.resp?.data.filter(
                (item: { permission: { id: string; name: string } }, index: number) => {
                    return (
                        index ===
                        teamInfoState?.resp?.data.findIndex(
                            (obj: { permission: { id: string; name: string } }) =>
                                item?.permission?.id === obj?.permission?.id &&
                                item?.permission?.name === obj?.permission?.name
                        )
                     )
                 }
             )
             setTeamLists(teamInfoState?.resp?.data)
             setTeamPermissionList(removeDuplicates)
             setFilteredTeamPermissionList(teamInfoState?.resp?.data)
         }
     }, [teamInfoState])

     return (
        <div>
            {tourGuide.currentStep === 54 && (
                <div className="main-modal-alt sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-54 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>6/11</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Add Team members</h5>
                                    <p>Add team members via email and assign roles.</p>
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
            {teamInfoState?.isLoading || orgRoleState?.isLoading
                ? props.changeLoadingState(true)
                : props.changeLoadingState(false)}
            {teamModal && (
                <div
                    className={`main-modal ${
                        tourGuide.currentStep === 54 ? 'app-guide-no-event' : ''
                    }`}>
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span onClick={() => setTeamModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Add a Team Member</h5>
                                </div>
                                <div>
                                    <div className="">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(mail) =>
                                                setEmail(mail.target.value.toLowerCase())
                                            }
                                            placeholder="johndoe@prembly.com"
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="password">Select Role</label>
                                        <select
                                            name=""
                                            id=""
                                            className="form-select"
                                            onChange={(role) => setPermission(role.target.value)}>
                                            <option value="">Choose Role</option>
                                            {orgRoleState?.resp?.data?.map(
                                                (val: any, i: number) => (
                                                    <option value={val?.id} key={i}>
                                                        {val?.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <button
                                        className="btn btn-deep-green py-2 mt-4"
                                        onClick={addMember}>
                                        {createMemberState.isLoading ? (
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
                                            'Send Invite'
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
                        <span onClick={() => setEditModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Edit a Member Role</h5>
                                </div>
                                <div>
                                    <div className="">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            value={email}
                                            className="form-control"
                                            readOnly
                                            placeholder="johndoe@prembly.com"
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="password">Select Role</label>
                                        <select
                                            name=""
                                            id=""
                                            className="form-select"
                                            onChange={(role) => setPermission(role.target.value)}>
                                            <option value="">Choose Role</option>
                                            {orgRoleState?.resp?.data?.map(
                                                (val: any, i: number) => (
                                                    <option value={val?.id} key={i}>
                                                        {val?.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <button
                                        className="btn btn-deep-green py-2 mt-4"
                                        onClick={editMemberRole}>
                                        {changeRoleState.isLoading ? (
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
                                            'Edit Role'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activateModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span onClick={() => setActivateModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center mt-4">
                                    <h5>Are you sure?</h5>
                                    <p>Do you want to activate "{email}" as a user?</p>
                                    <button
                                        className="btn btn-deep-green-outline py-2 mt-3 me-3"
                                        onClick={() => setActivateModal(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-deep-green py-2 mt-3"
                                        onClick={activateMember}>
                                        {activateMemberState.isLoading ? (
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
                                            'Yes, Activate'
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
                        <span onClick={() => setDeactivateModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center mt-4">
                                    <h5>Are you sure?</h5>
                                    <p>Do you want to deactivate "{email}" as a user?</p>
                                    <button
                                        className="btn btn-deep-green-outline py-2  mt-3 me-3"
                                        onClick={() => setDeactivateModal(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-deep-green py-2 mt-3"
                                        onClick={deactivateMember}>
                                        {deactivateMemberState.isLoading ? (
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
            {deleteModal && (
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-3 mx-auto">
                        <span onClick={() => setDeleteModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="text-center">
                                    <div className="text-center">
                                        <h5>Are you sure?</h5>
                                        <p>Do you want to delete "{email}" as a user?</p>
                                    </div>
                                    <button
                                        className="btn btn-deep-green-outline py-2 mt-3 me-3"
                                        onClick={() => setDeleteModal(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-deep-green py-2 mt-3"
                                        onClick={deleteMember}>
                                        {deleteMemberState.isLoading ? (
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
            {!teamInfoState?.isLoading && !orgRoleState?.isLoading && (
                <div className="main-table-area mt-5">
                    <div className="table-header">
                        <div className="row">
                            <div className="col-md-5">
                                <h5>Teams</h5>
                                <p>Invite and manage team members here</p>
                            </div>
                            <div className="col-md-7 ">
                                <div className="row align-items-center">
                                    <div className="col-md-6 ContainSearch">
                                        {/* <input
                                            type="text"
                                            className="form-control"
                                            placeholder="search by Role"
                                            onChange={(val) => setSearchVal(val.target.value)}
                                        /> */}
                                        <div className="searchbarForm">
                                            <input
                                                type="text"
                                                placeholder="Search for a user"
                                                className="searchIt"
                                                //onChange={handleUserName}
                                                onChange={(e) => {
                                                    handleUserSearch(e.target.value)
                                                    setSearchItem(e.target.value)
                                                }}
                                                // onChange={e => setSearchItem(e.target.value)}
                                            />
                                            <button onClick={() => handleUserSearch(searchItem)}>
                                                <i className="ri-search-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <button className="btn-filter btn" onClick={filterModal}>
                                            Filter
                                            <i className="ms-2 ri-xl ri-filter-3-fill" />
                                        </button>
                                    </div>
                                    <div
                                        className={`col-md-4 ${
                                            tourGuide.currentStep === 53
                                                ? 'tour-guide-add-team'
                                                : ''
                                        }`}>
                                        <button
                                            className="btn btn-deep-green ms-auto"
                                            onClick={() => setTeamModal(true)}>
                                            Add Team Member
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="">
                                    <tr>
                                        <th scope="col">S/N</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email Address</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Last Login</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTeamPermissionList
                                        // ?.filter((filteredMember: any) => {
                                        //     if (
                                        //         filteredMember?.permission?.name
                                        //             ?.toLowerCase()
                                        //             .includes(searchVal?.toLowerCase())
                                        //     ) {
                                        //         return filteredMember
                                        //     }
                                        // })
                                        ?.map((val: any, index: number) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    {!val?.user?.first_name || !val?.user?.last_name
                                                        ? 'Not Available'
                                                        : val?.user?.first_name +
                                                          ' ' +
                                                          val?.user?.last_name}
                                                </td>
                                                <td>{val?.email || 'Not Available'}</td>
                                                <td>{val?.permission?.name}</td>
                                                <td>{val?.user?.last_login || 'Not Available'}</td>
                                                <td>
                                                    {organisationInfoState?.resp?.data.user
                                                        .email === val?.email ||
                                                    val?.permission?.name === 'Business Owner' ? (
                                                        'Not Allowed'
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="btn btn-edit"
                                                                onClick={() => {
                                                                    setEmail(val?.email)
                                                                    setTeamId(val?.team_id)
                                                                    setPermission('')
                                                                    setEditModal(true)
                                                                }}>
                                                                Edit
                                                            </button>
                                                            {val?.user && (
                                                                <>
                                                                    {val?.is_active ? (
                                                                        <button
                                                                            className="btn btn-edit"
                                                                            onClick={() => {
                                                                                setEmail(val?.email)
                                                                                setName(
                                                                                    `${val?.user?.first_name} ${val?.user?.last_name}`
                                                                                )
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
                                                                                setEmail(val?.email)
                                                                                setName(
                                                                                    `${val?.user?.first_name} ${val?.user?.last_name}`
                                                                                )
                                                                                setActivateModal(
                                                                                    true
                                                                                )
                                                                            }}>
                                                                            Activate
                                                                        </button>
                                                                    )}
                                                                </>
                                                            )}
                                                            <button
                                                                className="btn btn-deactivate"
                                                                onClick={() => {
                                                                    setEmail(val?.email)
                                                                    setName(
                                                                        `${val?.user?.first_name} ${val?.user?.last_name}`
                                                                    )
                                                                    setDeleteModal(true)
                                                                }}>
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {filteredModal && (
                        <div className="filterMainModal">
                            <form onSubmit={handleFilters} className="main-modal">
                                <div
                                    className="main-modal-content card col-md-5 col-lg-4 mx-auto"
                                    //  onClick={(e) => e.stopPropagation()}
                                >
                                    <span onClick={handleCloseModal}>
                                        <i className="ri-close-line close-modal"></i>
                                    </span>
                                    <div className="card-body">
                                        <div className="main-modal-body">
                                            <div className="main-modal-header col-md-8 col-lg-5">
                                                <h2
                                                    style={{
                                                        borderBottom: '1px solid #E95470',
                                                        padding: '5px 0px',
                                                        width: '40px',
                                                        fontSize: '14px',
                                                        fontWeight: '300',
                                                    }}>
                                                    Filter
                                                </h2>
                                            </div>
                                            <div>
                                                <label htmlFor="" style={{ fontSize: '12px' }}>
                                                    Role
                                                </label>
                                                <select
                                                    name="name"
                                                    className="form-select"
                                                    onChange={handleFiltersChange}
                                                    required
                                                    value={filters.name}>
                                                    <option value="">Choose Role</option>
                                                    {teamPermissionList?.map((permission: any) => (
                                                        <option
                                                            value={permission?.permission?.name}>
                                                            {permission?.permission?.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="radioCheckbox">
                                                <label
                                                    htmlFor=""
                                                    style={{
                                                        fontSize: '12px',
                                                        color: '#01313f',
                                                    }}>
                                                    Status
                                                </label>
                                                <div className="radioButtons">
                                                    <input
                                                        type="radio"
                                                        checked={filters.is_active === 'true'}
                                                        name="is_active"
                                                        value="true"
                                                        onChange={handleFiltersChange}
                                                    />
                                                    <label> Active</label>
                                                </div>
                                                <div className="radioButtons">
                                                    <input
                                                        type="radio"
                                                        checked={filters.is_active === 'false'}
                                                        name="is_active"
                                                        value="false"
                                                        onChange={handleFiltersChange}
                                                    />
                                                    <label>Inactive</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            style={{
                                                outline: 'none',
                                                width: '100%',
                                                height: '50px',
                                                border: '1px solid #007DA3',
                                                color: '#ffffff',
                                                background: ' #007DA3',
                                                borderRadius: '4px',
                                                fontSize: '15px',
                                            }}>
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}