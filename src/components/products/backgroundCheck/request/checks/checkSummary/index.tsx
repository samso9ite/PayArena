import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reducers';
import { Player } from '@lottiefiles/react-lottie-player';
import successVerifGif from '../../../../../../assets/successVerif.json'
// import { imgUrl } from '../../../../../utils';


export default function CheckSummaryComp(props: any) {
    
    const backgroundCheckRequestAnswerUploadState = useSelector((state: RootState) => state.backgroundCheckRequestAnswerUploadReducer);

    return (
        <div>
            {props?.successmodal &&
                <div className="main-modal">
                    <div className="main-modal-content card col-md-5 col-lg-4 mx-auto">
                        <span onClick={props?.toggleSuccessModal}><i className="ri-close-line close-modal"></i></span>
                        <div className="card-body">
                            <div className="main-modal-body text-center">
                                <div className="col-md-6 mx-auto mt-4">
                                    <Player
                                        src={successVerifGif}
                                        className="player"
                                        loop
                                        autoplay
                                    />
                                </div>
                                <p className='my-5'>Response successfully sent</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="container">
                <button className='btn btn-green mb-5' onClick={() => props?.goToFormPage(1)}>
                    Back to form
                </button>
                <h3>Summary</h3>
                <p>See all your details here</p>
            </div>

            {(props?.faceEnabled && props?.facialDataValues?.face[0]?.form_data) &&
                <div className="text-center">
                    <img src={props?.facialDataValues?.face[0]?.form_data} style={{borderRadius:"50%",width:"300px", height:"300px"}} alt="" />
                </div>
            }
            {props?.collectedData && Object?.keys(props?.collectedData)?.map((val: any, index: any) => (
                <div className='container mt-5' key={index}>
                    <h4>{val[0]?.toUpperCase() + val?.replaceAll("_", " ")?.slice(1)}</h4>
                    <hr />

                    <div className="table-responsive mt-3">
                        <table className="table">
                            <thead className="">
                                <tr>
                                    {props?.collectedData[val]?.map((formData: any, i: any) => (
                                        <th scope="col" key={i}>{formData?.form_value?.charAt(0)?.toUpperCase() + formData?.form_value?.replaceAll("_", " ")?.slice(1)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {props?.collectedData[val]?.map((formData: any, i: any) => (
                                        <td key={i}> 
                                            { (formData?.form_data?.length > 400) ?  
                                                (formData?.form_value?.charAt(0)?.toUpperCase() + formData?.form_value?.replaceAll("_", " ")?.slice(1)  + " Document")
                                                : formData?.form_data
                                            } 
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            ))}

            <div>
                <div className="col-md-4 mx-auto mb-4">
                    <button className='btn btn-deep-green w-100 mt-3' onClick={props?.submitForm}>
                        {backgroundCheckRequestAnswerUploadState.isLoading ? (
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
                            'Proceed'
                        )}
                    </button>
                </div>
            </div>

        </div>
    )
}