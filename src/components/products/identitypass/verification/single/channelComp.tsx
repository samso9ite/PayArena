import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { all } from 'redux-saga/effects'
import NotificationToast from '../../../../utils/notifToast'
import useTourGuide from '../../../../../hooks/useTourGuide'
import Select from 'react-select'
import { getCountryFlag } from '../../../../utils/flags'

const customStyles = {
    option: (provided: any, state: any) => ({
        ...provided,
        color: state.isSelected ? '#fff' : '',
        backgroundColor: state.isSelected ? '#007DA3' : state.isFocused ? '#DEEBFF' : '',
    }),
}

export default function ChannelComp(props: any) {
    const [tourGuide, _] = useTourGuide()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    const [payloadData, setPayloadData] = useState({})
    const [payloadDataArr, setPayloadDataArr] = useState<any[]>([])
    const [checkDataArr, setCheckDataArr] = useState<any[]>([])
    const [runCheck, setRunCheck] = useState(false)
    const [fileCheck, setFileCheck] = useState('')
    const [selectedFirstLevelCheck, setSelectedFirstLevelCheck] = useState('')
    // const [payloadChange, setPayloadChange] =  useState(false)
    // const [filteredData, setFilteredData] = useState([])
    

    useEffect(() => {
        clearPayload()
    }, [props?.channelPayloads?.[0].input_label])

    useEffect(() => {
        if (runCheck === true) {
            verifyData()
        }
    }, [runCheck])

    let clearPayload = () => {
        setPayloadData({})
        setPayloadDataArr([])
        setCheckDataArr([])
        // setFilteredData([])
    }

    let updateData = (
        val: any,
        keyVal: string,
        pattern: string,
        label: string,
        inputType: string
    ) => {
        let keyData: any = {}
        let keyDataArr: any = payloadDataArr
        let cDataArr: any = checkDataArr

        if (inputType === 'file') {
            var file = val?.target?.files[0]
            let reader = new FileReader()

            if (val?.target?.files?.length > 0) {
                // setPreview_img(URL.createObjectURL(img.target.files[0]));
                reader.readAsDataURL(file)
                reader.onload = () => {
                    let imgBase: any = reader.result
                    let keyDataIndex = payloadDataArr.indexOf(keyVal)
                    setFileCheck(imgBase)
                    if (keyDataIndex !== -1) {
                        keyDataArr.splice(keyDataIndex, 1)
                        keyDataArr.push([
                            keyVal,
                            imgBase
                                .replaceAll('data:image/jpeg;base64,', '')
                                .replaceAll('data:image/png;base64', ''),
                        ])
                    } else {
                        keyDataArr.push([
                            keyVal,
                            imgBase
                                .replaceAll('data:image/jpeg;base64,', '')
                                .replaceAll('data:image/png;base64', ''),
                        ])
                    }

                    let cDataIndex = checkDataArr.indexOf(keyVal)
                    if (cDataIndex !== -1) {
                        cDataArr.splice(cDataIndex, 1)
                        cDataArr.push({
                            key: keyVal,
                            val: imgBase
                                .replaceAll('data:image/jpeg;base64,', '')
                                .replaceAll('data:image/png;base64', ''),
                            pattern: pattern,
                            label: label,
                        })
                    } else {
                        cDataArr.push({
                            key: keyVal,
                            val: imgBase
                                .replaceAll('data:image/jpeg;base64,', '')
                                .replaceAll('data:image/png;base64', ''),
                            pattern: pattern,
                            label: label,
                        })
                    }

                    setPayloadDataArr(keyDataArr)
                    setCheckDataArr(cDataArr)

                    keyData = Object?.fromEntries(payloadDataArr)

                    setPayloadData(keyData)
                }
            } else {
                let keyDataIndex = payloadDataArr.indexOf(keyVal)
                setFileCheck('')
                if (keyDataIndex !== -1) {
                    keyDataArr.splice(keyDataIndex, 1)
                    keyDataArr.push([keyVal, ''])
                } else {
                    keyDataArr.push([keyVal, ''])
                }

                let cDataIndex = checkDataArr.indexOf(keyVal)
                if (cDataIndex !== -1) {
                    cDataArr.splice(cDataIndex, 1)
                    cDataArr.push({
                        key: keyVal,
                        val: '',
                        pattern: pattern,
                        label: label,
                    })
                } else {
                    cDataArr.push({
                        key: keyVal,
                        val: '',
                        pattern: pattern,
                        label: label,
                    })
                }
                setPayloadDataArr(keyDataArr)
                setCheckDataArr(cDataArr)

                keyData = Object?.fromEntries(payloadDataArr)

                setPayloadData(keyData)
            }
        } else {
           
            let keyDataIndex = payloadDataArr.indexOf(keyVal)
            
            if (keyDataIndex !== -1) {
                keyDataArr.splice(keyDataIndex, 1)
                keyDataArr.push([keyVal, val?.replaceAll('+', '')])
            } else {
                keyDataArr.push([keyVal, val?.replaceAll('+', '')])
            }
            
            let cDataIndex = checkDataArr.indexOf(keyVal)
            if (cDataIndex !== -1) {
                cDataArr.splice(cDataIndex, 1)
                cDataArr.push({
                    key: keyVal,
                    val: val?.replaceAll('+', ''),
                    pattern: pattern,
                    label: label,
                })
            } else {
                cDataArr.push({
                    key: keyVal,
                    val: val?.replaceAll('+', ''),
                    pattern: pattern,
                    label: label,
                })
            }
            setPayloadDataArr(keyDataArr)
            setCheckDataArr(cDataArr)

            keyData = Object?.fromEntries(payloadDataArr)
            
            setPayloadData(keyData)
        }
    }

    let verifyData = () => {
        let filteredData = []
        const valuesArray = Object.values(payloadData);
        const firstValue = valuesArray.length > 0 ? valuesArray[0] : undefined;
        
        // filteredData = props?.channelPayloads.filter((item:any) => item.parent_value == firstValue || 
        //     (!item.has_parent && !item.skip_required))   
            
        filteredData = props?.channelPayloads.filter((item:any) => item.parent_value == firstValue || !item.has_parent)   
        if (
                Object?.keys(payloadData)?.length < 1 || (Object?.keys(payloadData)?.length !== filteredData?.length)
            // (props?.channelPayloads?.[0]?.is_required &&
            //     Object?.keys(payloadData)?.length !== props?.channelPayloads?.length
            //     )
            ) 
        {
            setNotifTitle('Error')
            setNotif('Please fill in all required fields')
            setNotifVal(true)
            return
        } else {
            
            if (!runCheck) {
                filteredData?.forEach((allKey: any, i: number) => {
                    if (
                        (allKey?.is_required === true &&
                            Object?.keys(payloadData)?.includes(allKey?.request_key) === false) ||
                        (allKey?.is_required === true &&
                            !payloadData[allKey?.request_key as keyof typeof payloadData])
                    ) {
                        setNotifTitle('Error')
                        setNotif(`${allKey.input_label} cannot be empty`)
                        setNotifVal(true)
                        return
                    } else {
                        let patternRegExp: any
                        if(allKey?.validation_pattern !== null){
                            patternRegExp = new RegExp(allKey?.validation_pattern.replaceAll('/', '')) || '' 
                        }
                        if(
                            allKey?.is_required === true && patternRegExp !== undefined &&
                            patternRegExp.test(
                                payloadData[allKey?.request_key as keyof typeof payloadData]
                            ) === false
                        ) {
                            setNotifTitle('Error')
                            setNotif(` Invalid ${allKey?.input_label} format`)
                            setNotifVal(true)
                        }
                        // else if (allKey?.validation_pattern) {
                        //     // setNotifVal(false)
                        //     setRunCheck(true)
                        // }
                        else if (i === Object?.keys(payloadData)?.length - 1) {
                            setRunCheck(true)
                        }
                    }
                })
                // Object?.keys(payloadData)?.forEach((newVal,i) => {
                //     if (!payloadData[newVal as keyof typeof payloadData]) {
                //         checkDataArr.map((cVal) => {
                //             if (cVal.key === newVal) {
                //                 setNotifTitle("Error")
                //                 setNotif(`${cVal.label} cannot be empty`)
                //                 setNotifVal(true)
                //             }
                //         })
                //     }
                //     else {
                //         checkDataArr.forEach((cVal) => {
                //             let patternRegExp = cVal?.pattern && new RegExp(cVal?.pattern.replaceAll("/", ""))
                //             if (cVal?.pattern && patternRegExp?.test(payloadData[newVal as keyof typeof payloadData]) === false) {
                //                 setNotifTitle("Error")
                //                 setNotif(` Invalid ${cVal.label} format`)
                //                 setNotifVal(true)
                //             }
                //             else if(newVal === Object?.keys(payloadData)[Object?.keys(payloadData)?.length - 1]){
                //                 setRunCheck(true)
                //             }
                //             // else {
                //             //     setRunCheck(true)
                //             // }
                //         })
                //     }
                // })
                return
            } else {
                props?.verify(payloadData)
                    setRunCheck(false)
            }
        }
    }
    return (
        <div>
            {notif && notifVal && (
                <NotificationToast
                    title={notifTitle}
                    message={notif}
                    closeNotif={() => setNotifVal(!notifVal)}
                />
            )}

            {props?.channelPayloads?.map((payload: any, i: number) => (
                <div
                    className={`${
                        tourGuide.currentStep === 14
                            ? 'tour-guide-element-verification-name'
                            : tourGuide.currentStep === 15
                            ? 'tour-guide-element-verification-country'
                            : tourGuide.currentStep === 18
                            ? 'tour-guide-element-verification-image'
                            : tourGuide.currentStep === 19
                            ? 'tour-guide-element-verification-type'
                            : tourGuide.currentStep === 20
                            ? 'tour-guide-element-verification-document-country'
                            : ''
                    }`}
                    key={i}>
                    {!payload.has_mutiple_legs &&
                        !payload.has_parent &&
                        !payload.parent_value &&
                        payload.input_type !== 'select' && (
                            <>
                                <label htmlFor={payload?.input_label}>
                                    {payload?.input_label}{' '}
                                    {payload?.is_required && (
                                        <span style={{ color: 'red' }}> *</span>
                                    )}
                                </label>
                                <input
                                    type={payload?.input_type}
                                    className="form-control"
                                    placeholder={payload?.input_placeholder}
                                    defaultValue={''}
                                    onChange={(e) =>{
                                    // setPayloadChange(true)
                                     return updateData(
                                            payload?.input_type === 'file' ? e : e.target.value,
                                            payload?.request_key,
                                            payload?.validation_pattern,
                                            payload?.input_label,
                                            payload?.input_type
                                        )
                                     } 
                                    }
                                />
                                {payload?.input_label === 'Virtual National Identity Number' && (
                                    <p style={{ color: '#a1aec5' }}>
                                        Dial *346*3*customerNIN*696739#
                                    </p>
                                )}
                            </>
                        )}
                    {!payload.has_mutiple_legs &&
                        !payload.has_parent &&
                        !payload.parent_value &&
                        payload.input_type === 'select' && (
                            <>
                                <label htmlFor={payload?.input_label}>
                                    {payload?.input_label}{' '}
                                    {payload?.is_required && (
                                        <span style={{ color: 'red' }}> *</span>
                                    )}
                                </label>
                                <Select
                                    placeholder={<>{payload?.input_placeholder}</>}
                                    onChange={(e: any) => {
                                        setSelectedFirstLevelCheck(e.value)
                                        return updateData(
                                            e?.value,
                                            payload?.request_key,
                                            payload?.validation_pattern,
                                            payload?.input_label,
                                            payload?.input_type
                                        )
                                    }}
                                    // options={payload?.select_options?.map((opt: any, k: number) => {
                                    //     return { value: opt?.value, label: opt.name }
                                    // })}
                                    options={payload?.select_options?.map((opt: any, k: number) => {
                                        if (
                                            payload?.request_key === 'doc_country' ||
                                            payload?.request_key === 'country_code'
                                        ) {
                                            return {
                                                value: opt?.value,
                                                label: `${getCountryFlag(opt?.value)} ${opt?.name}`,
                                            }
                                        } else {
                                            return {
                                                value: opt?.value,
                                                label: opt.name,
                                            }
                                        }
                                    })}
                                    styles={customStyles}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#ddd',
                                        },
                                    })}
                                />
                            </>
                        )}
                    {payload.has_mutiple_legs && !payload.has_parent && (
                        <>
                            <label htmlFor={payload?.input_label}>
                                {payload?.input_label}{' '}
                                {payload?.is_required && <span style={{ color: 'red' }}> *</span>}
                            </label>
                            <Select
                                placeholder={<>{payload?.input_placeholder}</>}
                                onChange={(e: any) => {
                                    
                                    setSelectedFirstLevelCheck(e.value)
                                    return updateData(
                                        e?.value,
                                        payload?.request_key,
                                        payload?.validation_pattern,
                                        payload?.input_label,
                                        payload?.input_type
                                    )
                                }}
                                options={payload?.select_options?.map((opt: any, k: number) => {
                                    return { value: opt?.value, label: opt.name }
                                })}
                                styles={customStyles}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: '#ddd',
                                    },
                                })}
                            />
                        </>
                    )}
                    {payload.has_parent &&
                        payload.parent_value === selectedFirstLevelCheck &&
                        payload.input_type === 'select' && (
                            <>
                                <label htmlFor={payload?.input_label}>
                                    {payload?.input_label}{' '}
                                    {payload?.is_required && (
                                        <span style={{ color: 'red' }}> *</span>
                                    )}
                                </label>
                                <Select
                                    placeholder={<>{payload?.input_placeholder}</>}
                                    onChange={(e: any) =>
                                        updateData(
                                            e?.value,
                                            payload?.request_key,
                                            payload?.validation_pattern,
                                            payload?.input_label,
                                            payload?.input_type
                                        )
                                    }
                                    options={payload?.select_options?.map((opt: any, k: number) => {
                                        return { value: opt?.value, label: opt.name }
                                    })}
                                    styles={customStyles}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: '#ddd',
                                        },
                                    })}
                                />
                            </>
                        )}
                    {payload.has_parent &&
                        payload.parent_value === selectedFirstLevelCheck &&
                        payload.input_type !== 'select' && (
                            <>
                                <label htmlFor={payload?.input_label}>
                                    {payload?.input_label}{' '}
                                    {payload?.is_required && (
                                        <span style={{ color: 'red' }}> *</span>
                                    )}
                                </label>
                                <input
                                    type={payload?.input_type}
                                    className="form-control"
                                    placeholder={payload?.input_placeholder}
                                    defaultValue={''}
                                    onChange={(e) =>
                                        updateData(
                                            payload?.input_type === 'file' ? e : e.target.value,
                                            payload?.request_key,
                                            payload?.validation_pattern,
                                            payload?.input_label,
                                            payload?.input_type
                                        )
                                    }
                                />
                                {payload?.input_label === 'Virtual National Identity Number' && (
                                    <p style={{ color: '#a1aec5' }}>
                                        Dial *346*3*customerNIN*696739#
                                    </p>
                                )}
                            </>
                        )}
                    {/* <label htmlFor={payload?.input_label}>
                        {payload?.input_label}{' '}
                        {payload?.is_required && <span style={{ color: 'red' }}> *</span>}
                    </label>
                    {payload?.input_type === 'select' ? (
                        <Select
                            onChange={(e:any) =>
                                updateData(
                                    e?.value,
                                    payload?.request_key,
                                    payload?.validation_pattern,
                                    payload?.input_label,
                                    payload?.input_type
                                )
                            }
                            options={payload?.select_options?.map((opt: any, k: number) => {
                                return (
                                    { value: opt?.value, label: opt.name }
                                )
                            })}
                            styles={customStyles}
                            theme={theme => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: '#ddd',
                                },
                            })}
                        />
                        // <select
                        //     className="form-select"
                        //     onChange={(e) =>
                        //         updateData(
                        //             payload?.input_type === 'file' ? e : e.target.value,
                        //             payload?.request_key,
                        //             payload?.validation_pattern,
                        //             payload?.input_label,
                        //             payload?.input_type
                        //         )
                        //     }>
                        //     <option value=""> {payload?.input_placeholder}</option>
                        //     {payload?.select_options?.map((opt: any, k: number) => (
                        //         <option value={opt?.value}> {opt?.name}</option>
                        //     ))}
                        // </select>
                    ) :
                        payload?.input_type === 'file' ? (
                            <>
                                {!fileCheck ?
                                    <div className="file-input-area p-2">
                                        <div className="">
                                            <input type="file"
                                                accept="image/png, image/jpg, image/jpeg"
                                                onChange={(e) =>
                                                    updateData(
                                                        e,
                                                        payload?.request_key,
                                                        payload?.validation_pattern,
                                                        payload?.input_label,
                                                        payload?.input_type
                                                    )
                                                }
                                            />
                                            <small>Maximum file size: 3MB</small>
                                            <small>Supported file types: (.png, .jpg, .jpeg).</small>
                                        </div>
                                    </div>
                                    :
                                    <div className="card">
                                        <div className="card-body py-1 mt-3">
                                            <div className="row justify-content-between ">
                                                <div className="col-md-7">
                                                    <p className='p-0'>Document Uploaded</p>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='d-flex justify-content-end'>
                                                        <i className=' ri-delete-bin-6-line ri-lg' style={{ cursor: "pointer",marginTop:"5px", color:"#E95470"}}
                                                            onClick={() => { 
                                                                updateData(
                                                                    "",
                                                                    payload?.request_key,
                                                                    payload?.validation_pattern,
                                                                    payload?.input_label,
                                                                    payload?.input_type
                                                                )
                                                            }} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        ) : (
                            <>
                                <input
                                    type={payload?.input_type}
                                    className="form-control"
                                    placeholder={payload?.input_placeholder}
                                    defaultValue={''}
                                    onChange={(e) =>
                                        updateData(
                                            payload?.input_type === 'file' ? e : e.target.value,
                                            payload?.request_key,
                                            payload?.validation_pattern,
                                            payload?.input_label,
                                            payload?.input_type
                                        )
                                    }
                                />
                                {payload?.input_label === 'Virtual National Identity Number' && (
                                    <p style={{ color: '#a1aec5' }}>Dial *346*3*customerNIN*696739#</p>
                                )}
                            </>
                        )} */}
                </div>
            ))}
            <div className={`${tourGuide.currentStep === 10 ? 'tour-guide-element-preview' : ''}`}>
                <button className="btn btn-deep-green w-100 py-3 mt-5" onClick={verifyData} disabled={props?.verifIsLoading}>
                    {props?.verifIsLoading ? (
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
                        'Verify'
                    )}
                </button>
            </div>
        </div>
    )
}
