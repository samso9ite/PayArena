import React, { useEffect, useState } from 'react'
import { AvailableTag, PartialTag } from '../../utils'
import { RootState } from '../../../redux/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { subPricingRequest } from '../../../redux/actions/subscription'

export default function SubPricingComp(props: any) {
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [filterValue, setFilterValue] = useState('NG')
    const [priceCountries, setPriceCountries] = useState<any[]>([])


    const subPricingState = useSelector((state: RootState) => state.subPricingReducer)
    
    const dispatch = useDispatch()

    useEffect(() => {
        getPricing()
    }, [])

    let getPricing = () => {
        const callback = (data: any) => {
            
            if (data.status) {
                getPricingCountries(data?.detail)
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
        dispatch(subPricingRequest(data))
    }


    let getPricingCountries = (data:any) => {
        let uniqueCountries: any = [];

        for (const val of data) {
            var countryIdx = uniqueCountries?.findIndex((typ: any) => typ?.country === val?.country)
            if (countryIdx === -1) {
                uniqueCountries?.push({ "country": val?.country, "country_name": val?.country_name });
            }
        }
        setPriceCountries([...uniqueCountries])

    }

    return (
        <div>
            <div className="table-header mt-5">
                <div className="row">
                    <div className="col-md-7">
                        <h5> Pricing</h5>
                        <p> View the prices of all endpoints. </p>
                    </div>
                    {/* <div className="col-md-5">
                        <div className="col-md-7 ms-md-auto">
                            <select className='form-select' value={filterValue} onChange={(e)=>setFilterValue(e?.target?.value)}>
                                <option value="">All Countries</option>
                                {priceCountries?.map((val:any, i:number) =>(
                                    <option value={val?.country} key={i}>{val?.country_name}</option>
                                ))}
                            </select>
                        </div>
                    </div> */}
                </div>
            </div>


            <div className="table-responsive mt-5">
                <table className="table">
                    <thead className="">
                        <tr>
                            <th scope="col">SN</th>
                            <th scope="col">CHECK NAME</th>
                            <th scope="col">COUNTRY</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {subPricingState?.resp?.detail?.filter((data:any)=> data?.country === filterValue).map((val: any, index: number) => ( */}
                        {subPricingState?.resp?.pricings?.map((val: any, index: number) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{val?.endpoint?.name.replaceAll("_", " ")}</td>
                                <td>{val?.endpoint?.country}</td>
                                <td>{subPricingState?.resp?.currency?.currency_code} {val?.price}</td>
                                <td>
                                    <AvailableTag />
                                    {/* {val?.status === "UNAVAILABLE" && <PartialTag />} */}
                                    {/* {val?.status === "AVAILABLE" && <AvailableTag />} */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
