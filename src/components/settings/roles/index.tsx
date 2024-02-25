import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-bootstrap/Modal'

import {
    createUserRoleRequest,
    organizationModuleRequest,
    organizationRoleRequest,
    updateUserRoleRequest,
} from '../../../redux/actions/settings/roles'
import { RootState } from '../../../redux/reducers'
// import Mainloader from '../../utils'
import NotificationToast from '../../utils/notifToast'
import useTourGuide from '../../../hooks/useTourGuide'
import Mainloader from '../../utils'
export default function RolesComp(props: any) {
    interface IEnabledRightCodes {
        enabledRightCodes: any
        includes: any
    }

    const [tourGuide, setTourGuide] = useTourGuide()

    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [createModal, setCreateModal] = useState(false)
    const [createFullAccess, setCreateFullAccess] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [filteredModal, setFilteredModal] = useState(false)
    const [editFullAccess, setEditFullAccess] = useState(false)
    const [fullAccess, setFullAccess] = useState(false)

    const [rolesIdx, setRolesIdx] = useState<any>('')
    const [features, setFeatures] = useState<any>([])
    const [featuresIdx, setFeaturesIdx] = useState<any>('')
    const [openFeatures, setOpenFeatures] = useState(false)

    const [userEnabledRights, setUserEnabledRights] = useState([])
    const [enabledRightCodes, setEnabledRightCodes] = useState<IEnabledRightCodes | [] | any>([])

    const [name, setName] = useState('')
    const [newName, setNewName] = useState('')
    const [rights, setRights] = useState<any>([])
    const [roleId, setRoleId] = useState('')
    const [checked, setChecked] = useState()
    const [checkedEnabled, setCheckedEnabled] = useState(false)

    const [allModules, setAllModules] = useState<any>([])
    const [activeUserInfo, setActiveUserInfo] = useState<any>({})
    const [allPermsCount, setAllPermsCount] = useState(0)
    const [currentPermsCount, setCurrentPermsCount] = useState(0)
    const [rolePermissionList, setRolePermissionList] = useState([])
    const orgRoleModuleState = useSelector((state: RootState) => state.organizationModuleReducer)
    const orgRoleState = useSelector((state: RootState) => state.organizationRoleReducer)
    const createRoleState = useSelector((state: RootState) => state.createUserRoleReducer)
    const editRoleState = useSelector((state: RootState) => state.updateUserRoleReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        if (tourGuide.currentStep === 57) {
            setCreateModal(true)
            setEnabledRightCodes(['CHECKER_WIDGET', 'VERIFICATION'])
            setFeatures([
                {
                    id: 'c8bac6ca-84f5-4275-a2cf-88a1f7447f5c',
                    code: 'CHECKER_WIDGET',
                    name: 'Checker Widget',
                },
                {
                    id: 'c8bac6ca-84f5-4275-a2cf-88a1f7447f5c',
                    code: 'VERIFICATION',
                    name: 'Identity Verification',
                },
            ])
            setFeaturesIdx(2)
            setOpenFeatures(true)
            setRolesIdx(2)
        }
    }, [tourGuide])

    useEffect(() => {
        getRoleModules()
        getuserRoles()
    }, [])

    let getRoleModules = () => {
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
        dispatch(organizationModuleRequest(data))
    }

    let getuserRoles = () => {
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

    let createRole = () => {
        if (!newName || newName === '') {
            setNotifTitle('Error')
            setNotif('Enter a name for the new role to proceed')
            setNotifVal(true)
            return
        }
        const callback = (data: any) => {
            if (data.status) {
                getuserRoles()
                setNotifTitle('Success')
                setNotif(`${name} Role Successfully Created`)
                setNotifVal(true)
                setRights([])
                setName('')
                setCreateModal(false)
            } else {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                name: newName,
                access_rights: rights,
            },
            callback,
        }
        dispatch(createUserRoleRequest(data))
    }

    let editRole = () => {
        const callback = (data: any) => {
            if (data.status) {
                getuserRoles()
                setNotifTitle('Success')
                setNotif(`Role Successfully Edited`)
                setNotifVal(true)
                setRights([])
                setName('')
                setEditModal(false)
            } else {
                openEditModal(activeUserInfo)
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {
                name,
                access_rights: rights,
                role_id: roleId,
            },
            callback,
        }
        dispatch(updateUserRoleRequest(data))
    }

    useEffect(() => {
        const num = rights.length
        setCurrentPermsCount(() => num)
        if (allPermsCount !== currentPermsCount) {
            setFullAccess(() => false)
        } else if (allPermsCount === currentPermsCount) {
            setFullAccess(() => true)
        }
    }, [rights, currentPermsCount, allPermsCount, fullAccess])

    const pushRight = (id: any, code: any, valState: boolean) => {
        let rightData: any = JSON.parse(JSON.stringify(rights))

        if (!valState) {
            const res = rightData.filter((item: any) => {
                return item.access_right[0].feature_code !== code
            })
            setRights(() => [...res])
            pushEnabledRights(code, valState)
        } else {
            const entry: any = {}
            entry.access_right = []
            let entryObject = {
                has_access: true,
                feature_code: code,
            }
            entry.module = id
            entry.access_right.push(entryObject)

            setRights((prev: any) => {
                return [...prev, entry]
            })
            setEnabledRightCodes((prev: any) => {
                return [...prev, code]
            })
        }
    }

    let setFeaturesPart = (fea: any, idx: any) => {
        setFeatures(fea)
        setFeaturesIdx(idx)
        setOpenFeatures(!openFeatures)
    }

    const pushFullAccess = (val: boolean, mode: string) => {
        if (mode === 'CREATE') {
            setCreateFullAccess(val)
        }
        if (mode === 'EDIT') {
            setEditFullAccess(val)
        }

        if (!val) {
            setRights(() => [])
            setEnabledRightCodes(() => [])
            // setFullAccess(() => false)
            return
        }

        if (val) {
            setRights(() => [])
            setEnabledRightCodes(() => [])

            let featureOnly: any = []
            let moduleId = ''
            allModules.map((item: any) => {
                moduleId = ''
                moduleId = item.id
                for (const el of item.features) {
                    featureOnly.push(el.code)
                    pushRight(moduleId, el.code, true)
                }
                return item
            })
            // setFullAccess(() => true)
            return
        }
    }

    let pushEnabledRights = (code: string, status: boolean) => {
        let rightCode: any = JSON.parse(JSON.stringify(enabledRightCodes))

        if (!status) {
            const res = rightCode.filter((item: any) => {
                return item !== code
            })
            setEnabledRightCodes([...res])
            return
        }

        var rightIndex = rightCode.findIndex((arr: any) => arr.id === code)

        if (rightIndex !== -1 && status) {
            rightCode.splice(rightIndex, 1)
            rightCode.push(code)
        }
        if (rightIndex !== -1 && !status) {
            rightCode.splice(rightIndex, 1)
        }
        if (rightIndex === -1 && !status) {
            return
        } else {
            rightCode.push(code)
        }
        setEnabledRightCodes([...rightCode])
    }

    useEffect(() => {
        const { resp } = orgRoleModuleState
        let total = 0
        if (resp !== null) {
            setAllModules(resp.data)
            resp.data.map((item: any) => {
                return item.features.map((item: any) => {
                    total += 1
                    return item
                })
            })
            setAllPermsCount(total)
        }
    }, [orgRoleModuleState])

    function openEditModal(user: any) {
        setFullAccess(() => false)
        setActiveUserInfo({ ...user })
        let moduleId = ''
        let currentCount = 0
        user.access_rights
            .map((item: any) => {
                moduleId = item.module.id
                return item.access_right.map((inner: any) => {
                    return inner
                })
            })
            .flat()
            .filter((item: any) => {
                return item.has_access === true
            })
            .map((item: any) => {
                currentCount += 1
                pushRight(moduleId, item.feature_code, true)
                return item
            })
        setCurrentPermsCount(() => currentCount)
        if (currentCount === allPermsCount) setFullAccess(true)
        else setFullAccess(false)
        setEditModal(true)
    }

    function closeEditModal() {
        setRights([])
        setEnabledRightCodes([])
        setName('')
        setEditModal(false)
    }

    const filterModal = () => {
        setFilteredModal(true)
    }

    const handleCloseModal = () => {
        setFilteredModal(false)
    }

    function openCreateModal() {
        setNewName('')
        setRights([])
        setEnabledRightCodes([])
        setCreateModal(true)
    }

    const handleNext = () => {
        if (tourGuide.currentStep === 56) {
            setTourGuide({ ...tourGuide, currentStep: 57 })
            setCreateModal(true)
        } else if (tourGuide.currentStep === 57) {
            setCreateModal(false)
            setTourGuide({ ...tourGuide, currentStep: 58 })
        }
    }

    const handleBack = () => {
        if (tourGuide.currentStep === 56) {
            setTourGuide({ ...tourGuide, currentStep: 55 })
        } else if (tourGuide.currentStep === 57) {
            setCreateModal(false)
            setTourGuide({ ...tourGuide, currentStep: 56 })
        }
    }

    const handleSkipTour = () => {
        setTourGuide({ isActive: true, currentStep: 0, onGoing: false })
    }

    const handleCheckboxChange = (e: any) => {
        setChecked(e.target.value)
    }

    const handleFilterRoles = (e: any) => {}

    useEffect(() => {
        if (orgRoleState) {
            setRolePermissionList(orgRoleState?.resp?.data)
            setFilteredRolePermissionList(orgRoleState?.resp?.data)
        }
    }, [orgRoleState])

    const [filters, setFilters] = useState({
        name: '',
        is_active: '',
    })

    const [filteredRolePermissionList, setFilteredRolePermissionList] = useState([])

    const handleFiltersChange = (e: any) => {
        setFilters((prevs) => ({ ...prevs, [e.target.name]: e.target.value }))
    }

    const handleFilters = (e: any) => {
        e.preventDefault()
        const results = rolePermissionList.filter(
            (roles: any) =>
                roles.name === filters.name && roles.is_active === (filters.is_active === 'true')
        )
        setFilteredRolePermissionList(results)
    }
    // console.log(filters)
    // console.log(rolePermissionList)
    // console.log(Boolean(filters.is_active))

    const [filterUsers, setFilterUsers] = useState('')

    const handleUserName = (e: any) => {
        setFilterUsers(e.target.value)
        // const usersRolesName = rolePermissionList.filter((roles:any) => roles.name ===)
    }

    const handleUserSearch = (searchKey: string) => {
        let tempUserData: any = []
        rolePermissionList.filter((user: { name: string; email: string }) => {
            if (user?.name?.includes(searchKey) || user?.email?.includes(searchKey)) {
                tempUserData.push(user)
            }
        })
        setFilteredRolePermissionList(tempUserData)
    }
    return (
        <div>
            {tourGuide.currentStep === 56 && (
                <div className="main-modal sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-56 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>8/11</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Add new role</h5>
                                    <p>
                                        Customise your preferred role and select the access levels
                                        for each new role you create.
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
            {tourGuide.currentStep === 57 && (
                <div className="main-modal-alt main-modal-sub sm-turn-off-tour-guide">
                    <div className="main-modal-tourguide-57 main-modal-tourguide-arrow card col-md-4 col-lg-3 mx-auto">
                        <div className="card-body-tourguide">
                            <div className="d-flex align-self-center tourguide-header">
                                <p>9/11</p>
                                <i
                                    className="ri-close-line close-tourguide-modal"
                                    onClick={handleSkipTour}
                                />
                            </div>
                            <div className="main-modal-body-tourguide">
                                <div className="text-left mt-3 text-black">
                                    <h5>Create Role</h5>
                                    <p>
                                        Create a new role and give permissions on which platform
                                        will have access.
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
            {(orgRoleModuleState?.isLoading || orgRoleState?.isLoading) && <Mainloader />}
            {createModal && (
                <div
                    className={`main-modal
                        ${tourGuide.currentStep === 57 ? 'main-modal-alt pointer-event' : ''}`}
                    onClick={() => setCreateModal(false)}>
                    <div
                        className="main-modal-content card col-md-5 col-lg-4 mx-auto"
                        onClick={(e) => e.stopPropagation()}>
                        <span onClick={() => setCreateModal(false)}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Create a User Role</h5>
                                </div>

                                <div>
                                    <div className="">
                                        <label htmlFor="email">Role Name</label>
                                        <input
                                            type="text"
                                            value={newName}
                                            className="form-control"
                                            placeholder="Admin"
                                            onChange={(e) => setNewName(e.target.value)}
                                        />
                                    </div>

                                    <div className="main-modal-header col-md-8 col-lg-3 mt-4">
                                        <h5>Permissions</h5>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p className="pb-0 mb-0 mt-3">Full Access</p>
                                        <label className="switch ms-3">
                                            <input
                                                type="checkbox"
                                                // checked={createFullAccess}
                                                onChange={(e) =>
                                                    pushFullAccess(
                                                        e.target.checked ? true : false,
                                                        'CREATE'
                                                    )
                                                }
                                            />
                                            <span className="slider" />
                                        </label>
                                    </div>

                                    {allModules?.map((roles: any, index: any) => (
                                        <div className="roles-name mt-3" key={index}>
                                            <small
                                                className={`py-2 pe-3 ${
                                                    rolesIdx === index ? 'ps-2 active' : ''
                                                }`}
                                                onClick={() => {
                                                    setFeaturesPart(roles.features, index)
                                                    setRolesIdx(index)
                                                }}>
                                                {roles?.name}
                                            </small>
                                            {featuresIdx === index && (
                                                <div className="features-area">
                                                    {features?.map((val: any, idx: any) => (
                                                        <div
                                                            className="ps-1 py-2 pe-3 ms-3"
                                                            key={idx}>
                                                            <input
                                                                type="checkbox"
                                                                checked={enabledRightCodes?.includes(
                                                                    val?.code
                                                                )}
                                                                onChange={(e) =>
                                                                    pushRight(
                                                                        roles?.id,
                                                                        val?.code,
                                                                        e.target.checked
                                                                            ? true
                                                                            : false
                                                                    )
                                                                }
                                                            />
                                                            <small className="ps-2">
                                                                {val?.name}
                                                            </small>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* {orgRoleModuleState?.resp?.data?.map((roles: any, index: any) => (
                                        <div className="roles-name mt-3" key={index}>
                                            <small className="ps-2 py-2 pe-3" onClick={() => setFeaturesPart(roles.features, index)}>{roles?.name}</small>
                                            {(featuresIdx === index && openFeatures) &&
                                                <div>
                                                    {features?.map((val: any, idx: any) => (
                                                        <div className="features-area ps-1 py-2 pe-3 ms-3" key={idx}>
                                                            <input type="checkbox" onChange={e => pushRight(roles?.id, val?.code, e.target.checked ? true : false)} />
                                                            <small className="ps-2">{val?.name}</small>
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    ))} */}

                                    <button
                                        className="btn btn-deep-green py-2 mt-4"
                                        onClick={createRole}>
                                        {createRoleState.isLoading ? (
                                            <div>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="sr-only"> Creating Role...</span>
                                            </div>
                                        ) : (
                                            'Save'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editModal && (
                <div className="main-modal" onClick={closeEditModal}>
                    <div
                        className="main-modal-content card col-md-5 col-lg-4 mx-auto"
                        onClick={(e) => e.stopPropagation()}>
                        <span onClick={closeEditModal}>
                            <i className="ri-close-line close-modal"></i>
                        </span>
                        <div className="card-body">
                            <div className="main-modal-body">
                                <div className="main-modal-header col-md-8 col-lg-5">
                                    <h5>Edit a User Role</h5>
                                </div>

                                <div>
                                    <div className="">
                                        <label htmlFor="name">Role Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            className="form-control"
                                            placeholder="Admin"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="main-modal-header col-md-8 col-lg-3 mt-4">
                                        <h5>Permissions</h5>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p className="pb-0 mb-0 mt-3">Full Access</p>
                                        <label className="switch ms-3">
                                            {/* <input type="checkbox" /> */}
                                            <input
                                                type="checkbox"
                                                checked={fullAccess}
                                                onChange={(e) =>
                                                    pushFullAccess(
                                                        e.target.checked ? true : false,
                                                        'EDIT'
                                                    )
                                                }
                                            />
                                            <span className="slider" />
                                        </label>
                                    </div>

                                    {allModules?.map((roles: any, index: any) => (
                                        <div className="roles-name mt-3" key={index}>
                                            <small
                                                className={`py-2 pe-3 ${
                                                    rolesIdx === index ? 'ps-2 active' : ''
                                                }`}
                                                onClick={() => {
                                                    setFeaturesPart(roles.features, index)
                                                    setRolesIdx(index)
                                                    // checkEnabledRight(roles.features)
                                                }}>
                                                {roles?.name}
                                            </small>
                                            {featuresIdx === index && (
                                                <div className="features-area">
                                                    {features?.map((val: any, idx: any) => {
                                                        return (
                                                            <div
                                                                className="ps-1 py-2 pe-3 ms-3"
                                                                key={idx}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={enabledRightCodes?.includes(
                                                                        val?.code
                                                                    )}
                                                                    onChange={(e) =>
                                                                        pushRight(
                                                                            roles?.id,
                                                                            val?.code,
                                                                            e.target.checked
                                                                                ? true
                                                                                : false
                                                                        )
                                                                    }
                                                                />
                                                                <small className="ps-2">
                                                                    {val?.name}
                                                                </small>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        className="btn btn-deep-green py-2 mt-4"
                                        onClick={editRole}>
                                        {editRoleState.isLoading ? (
                                            <div>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                                <span className="sr-only"> Loading...</span>
                                            </div>
                                        ) : (
                                            'Save'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {(!orgRoleModuleState?.isLoading || !orgRoleState?.isLoading) && (
                <>
                    <div className="main-table-area mt-5">
                        <div className="table-header">
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="col-md-6">
                                    <h5>Roles and Permissions</h5>
                                    <p>Create and manage roles here</p>
                                </div>

                                <div
                                    className={`settingsRoles col-md-6 text-end d-flex align-items-center justify-content-md-end${
                                        tourGuide.currentStep === 56 ? 'tour-guide-add-role' : ''
                                    }`}>
                                    <div>
                                        <button
                                            className="btn btn-deep-green ms-auto"
                                            onClick={openCreateModal}>
                                            Add New Role
                                        </button>
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
                                            <th scope="col">Role</th>
                                            <th scope="col">Role ID</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRolePermissionList?.map(
                                            (val: any, index: number) => (
                                            <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{val?.name}</td>
                                                    <td>{val?.id}</td>
                                                    <td>
                                                        {val?.predefined && 'Not Allowed'}
                                                        {!val?.predefined && (
                                                            <button
                                                                className="btn btn-edit"
                                                                onClick={() => {
                                                                    setRoleId(val?.id)
                                                                    setName(val?.name)
                                                                    openEditModal(val)
                                                                    setUserEnabledRights(
                                                                        val?.access_rights
                                                                    )
                                                                }}>
                                                                Edit
                                                            </button>
                                                        )}
                                                        {/* <button className='btn btn-deactivate'
                                                        onClick={() => {
                                                            ""
                                                        }}
                                                    >
                                                        Delete
                                                    </button> */}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* {filteredModal && (
                            <div className="filterMainModal">
                                <form onSubmit={handleFilters} className="main-modal">
                                    <div
                                        className="main-modal-content card col-md-5 col-lg-4 mx-auto"
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
                                                        {rolePermissionList?.map(
                                                            (permission: any) => (
                                                                <option value={permission.name}>
                                                                    {permission.name}
                                                                </option>
                                                            )
                                                        )}
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
                        )} */}
                </div>
                </>
            )}
        </div>
    )
}
