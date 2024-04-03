import { useEffect, useState } from "react"
import { faqsRequest } from "../../redux/actions/faqs"
import { useDispatch } from "react-redux"
import Accordion from 'react-bootstrap/Accordion';

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

        <Accordion defaultActiveKey="0" className="mt-2">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" style={{marginTop:"2%", border:"2px solid black", borderRadius:"10px"}}>
                <Accordion.Header style={{backgroundColor:"#0000"}}>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
    </div>
    )
}