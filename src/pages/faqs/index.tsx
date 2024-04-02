import { useEffect, useState } from "react"
import { faqsRequest } from "../../redux/actions/faqs"
import { useDispatch } from "react-redux"

export default function FaqsPage(){
    const dispatch = useDispatch()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')

    let getFaqs = () => {
        const callback = (data: any) => {
            if (!data.status) {
                setNotifTitle('Error')
                setNotif(data.detail)
                setNotifVal(true)
            }
        }
        let data: any = {
            values: {},
            callback,
        }
        dispatch(faqsRequest(data))
    }

    useEffect(() => {
        getFaqs()
    })

    return(
        <div className='container-fluid px-md-4'>
      
        <div className="table-header mt-5">
            <div className="row">
                <div className="col-md-5">
                    <h5>Frequently Asked Question</h5>
                    <p>Here are answers to some of the questions you may have </p>
                </div>
            </div>
        </div>
    </div>
    )
}