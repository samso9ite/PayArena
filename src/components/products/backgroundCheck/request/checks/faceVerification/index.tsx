import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { EmptyStateComp } from '../../../../../utils';

export default function BackgroundCheckFaceVerificationComp(props: any) {

    const webcamRef = useRef<any>()
    const [faceData, setFaceData] = useState({})
    const [faceImg, setFaceImg] = useState("")
    const [cameraError, setCameraError] = useState(false)

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();

            let faceDataValues = {
                face: [
                    {
                        title: "face",
                        form_value: "facial_verification",
                        endpoint: "facial_verification",
                        form_data: imageSrc,
                        form_id: "faceID-ad91b55a-2b1a-4d24-adea-886cf7280f471"
                    }
                ]
            }

            setFaceData( faceDataValues)
            setFaceImg(imageSrc)
        },
        [webcamRef]
    );

    let retakeImage = ()=>{
        setFaceData({})
        setFaceImg("")
        
    }

    let proceedToNext = ()=>{
        props?.proceedFromFaceVerification(faceData)
        
    }

    const videoConstraints = {
        width: 320,
        height: 300,
        facingMode: "user"
    };

    return (
        <div>
            <div className="container">
                <button className='btn btn-green mb-5' onClick={() => props?.goToFormPage(1)}>
                    Back to form
                </button>
                <h3>Facial Verification</h3>
                <p>This form requires your face to proceed; Please capture your face here.</p>
            </div>

            <div className='col-md-6 mx-auto text-center'>
                {cameraError &&
                    <div className="">
                        <div className="my-5 py">
                            <EmptyStateComp
                                title={'Camera Error'}
                                ctaAction={() => { }}
                                desc={"This error is mostly caused by disabled camera, kindly enable your camera"}
                                // desc={"To enable your camera, click the canceled video icon in your address bar, allow this url to access your camera, then reload the page."}
                                ctaValue={''}
                            />
                        </div>
                    </div>
                }

                {!faceImg &&
                    <>
                        <Webcam
                            audio={false}
                            height={300}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={320}
                            videoConstraints={videoConstraints}
                            onUserMediaError={()=>setCameraError(true)}
                            onUserMedia={()=>setCameraError(false)}
                            
                        />

                        {!cameraError &&
                            <div>
                                <button className='btn btn-deep-green mt-3' onClick={capture}>Capture photo</button>
                            </div>
                        }
                    </>
                }

                {faceImg &&
                    <>
                        <img src={faceImg} style={{borderRadius:"50%",width:"300px", height:"300px"}} alt="" />

                        <div className='mt-3'>
                            <button className='btn btn-deep-green-outline me-3' onClick={retakeImage}>Retake</button>
                            <button className='btn btn-deep-green' onClick={proceedToNext}>Proceed</button>
                        </div>
                    </>
                }


            </div>


        </div>
    )
}