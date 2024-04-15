import { useEffect, useState } from "react"
import { faqsRequest, faqsFailure, faqsSuccess } from "../../redux/actions/faqs"
import { useDispatch, useSelector } from "react-redux"
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import Cookies from 'js-cookie'
import { authorizationRedirect, serverCodes } from '../../redux/constants/api'
import { RootState } from "../../redux/reducers";
import Mainloader from "../../components/utils";

export default function FaqsPage(){
    const dispatch = useDispatch()
    const [notifVal, setNotifVal] = useState(false)
    const [notif, setNotif] = useState('')
    const [notifTitle, setNotifTitle] = useState('')
    const [faqData, setFaqData] = useState({
        next: '',
        previous: '',
        results: [],
    })
    const [pageNumber, setPageNumber] = useState('1')
    const faqState = useSelector((state: RootState) => state.faqReducer);
    let hostName = Cookies.get('hostName') || ''
    let getFaqs = () => {
        const callback = (data: any) => {
            console.log(data);
            setFaqData(data)
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
    }, [])
    
    const triggerPage = (val: any) => {
        let accessT = Cookies.get('babtbu') || ''
        let orgId = Cookies.get('org') || ''

        let requestOptions = {
            method: 'get',
            url: val?.replace(
                'http',
                'https'
            ),

            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: accessT,
                Organisation: orgId,
            },
        }
        
        axios
            .request(requestOptions)
            .then((response) => {
                
                let page = val?.slice(-6).match(/(\d+)/)

                if (val?.includes('page=')) {
                    if (page) {
                        setPageNumber(page[0])
                    }
                } else {
                    setPageNumber('1')
                }
                setFaqData(response?.data)
            })
            .catch((e: any) => {
                if (
                    serverCodes.includes(e?.response?.request?.status) ||
                    !e?.response?.request?.status
                ) {
                    faqsFailure({
                        error: 'An error occurred, hang on a minute as we work towards fixing this error.',
                    })
                    return
                }
                if (e.response.request.status === 401) {
                    authorizationRedirect()
                } else {
                    faqsFailure({
                        error: e.response.data.detail,
                    })
                }
            })
    }

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
        <div
            className="card mt-5"
            style={{
                backgroundColor: '#fff',
                border:'none',
               padding:"2%"
            }}>
            {faqState?.isLoading ? <Mainloader/>
                :
                 faqData?.results?.length > 0 ? (
                    <>
                        <Accordion className="mt-2">
                            {faqData?.results?.map(
                                (val: any, i: number) => (
                                    <Accordion.Item eventKey={val?.id} style={{marginBottom:"20px"}}>
                                        <Accordion.Header><p style={{color:"#1D2939", fontSize:"17px", fontWeight:"700", marginBottom:0}}>{val?.question}</p></Accordion.Header>
                                            <Accordion.Body>
                                            <div dangerouslySetInnerHTML={{ __html: val?.answer }} />
                                            </Accordion.Body>
                                    </Accordion.Item>
                                ))} 
                        </Accordion>
                        <div className="d-flex justify-content-end align-items-center">
                            {faqData?.previous && (
                                <p
                                    style={{ cursor: 'pointer' }}
                                    className="mb-0 me-3"
                                    onClick={() =>
                                        triggerPage(faqData?.previous)
                                    }>
                                    Prev
                                </p>
                            )}
                            <button className="btn btn-green">{pageNumber}</button>
                            {faqData?.next && (
                                <p
                                    style={{ cursor: 'pointer' }}
                                    className="mb-0 ms-3"
                                    onClick={() => triggerPage(faqData?.next)}>
                                    Next
                                </p>
                            )}
                        </div>
                        <div>
                            <h5>Still have a question?</h5>
                            <p>Our contact team will be happy to help you.</p>
                            {hostName== "Prembly" ? <a href="mailto:team@prembly.com" target="_blank">
                                <button className="btn btn-lg btn-green">Contact Us</button></a> : 
                                <a href="mailto:support@peleza.com" target="_blank">
                                    <button className="btn btn-lg btn-green">Contact Us</button>
                                </a>
                            }
                        </div>
                    </>
                    ): 
               
                    <div className="mt-5">
                        <h5 className="">No Record Found</h5>
                    </div>
            
                    
            
        }
        </div>

        
    </div>
    )
}