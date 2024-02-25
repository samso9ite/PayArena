import { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { PaginatedList } from 'react-paginated-list'
import global from '../../../../redux/constants/global'

const sanctionListUrl = [
    {
        url: 'https://icpc.gov.ng/wanted-persons/',
        logo: 'https://icpc.gov.ng/wp-content/uploads/2021/04/icpc-logo.png',
        caption: 'Wanted Persons',
    },
    {
        url: 'https://www.opensanctions.org/datasets/us_fbi_most_wanted/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'FBI Most Wanted',
    },
    {
        url: 'https://www.secretservice.gov/investigation/mostwanted',
        logo: '	https://www.secretservice.gov/sites/default/files/2023-02/2023-star-flag.png',
        caption: 'United States Secret Service',
    },
    {
        url: 'https://www.opensanctions.org/datasets/adb_sanctions/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'Asian Development Bank Sanctions',
    },
    {
        url: 'https://www.nationalcrimeagency.gov.uk/most-wanted-search',
        logo: '',
        caption: 'National Crime Agency',
    },
    {
        url: 'https://www.opensanctions.org/datasets/worldbank_debarred/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'WorldBank Debarred Providers',
    },
    {
        url: 'https://www.usmarshals.gov/what-we-do/fugitive-investigations/15-most-wanted-fugitive',
        logo: '	https://www.usmarshals.gov/themes/custom/usms/logo.svg',
        caption: 'U.S. Marshals Service',
    },
    {
        url: 'https://www.opensanctions.org/datasets/ch_seco_sanctions/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'Swiss SECO Sanctions/Embargoes',
    },
    {
        url: 'https://www.justice.gov/actioncenter/identify-our-most-wanted-fugitives',
        logo: 'https://www.justice.gov/themes/custom/usdoj_uswds/images/doj-main-header-logo.svg',
        caption: 'U.S. Department of Justice',
    },
    {
        url: 'https://www.opensanctions.org/datasets/ua_sfms_blacklist/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'Ukraine SFMS Blacklist',
    },
    {
        url: 'https://www.opensanctions.org/datasets/eu_europol_wanted/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: "Europe's most wanted fugitives",
    },
    {
        url: 'https://www.dea.gov/fugitives/all',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'United States Drug Enforcement Administration',
    },
    {
        url: 'https://www.opensanctions.org/datasets/afdb_sanctions/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'African Development Bank Debarred Entities',
    },
    {
        url: 'http://www.eumostwanted.eu/',
        logo: '	https://eumostwanted.eu/themes/custom/eumwfoundationtheme/enfast_page/enfast.png',
        caption: "Europe's Most anted Fugitives",
    },
    {
        url: 'https://www.ice.gov/most-wanted',
        logo: 'https://www.ice.gov/sites/default/files/ICE_RGB_Hor_Blue_at20.png',
        caption: 'U.S. Immigration and Customs Enforcement',
    },
    {
        url: 'https://www.opensanctions.org/datasets/gb_coh_disqualified/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'UK Companies House Disqualified Directors',
    },
    {
        url: 'https://www.oig.dot.gov/wanted-fugitives',
        logo: 'https://www.oig.dot.gov/sites/default/files/dot-oig-logo-2021.png',
        caption: 'U.S. Department Of Transportation (Office Of Inspector General)',
    },
    {
        url: 'https://www.npa.go.jp/english/bureau/criminal_affairs/wanted_eng.html',
        logo: 'https://www.npa.go.jp/common2/img/logo_en.svg',
        caption: 'National Police Agency',
    },
    {
        url: 'https://www.opensanctions.org/datasets/interpol_red_notices/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'INTERPOL Red Notices',
    },
    {
        url: 'https://www.usmarshals.gov/what-we-do/fugitive-investigations',
        logo: '	https://www.usmarshals.gov/themes/custom/usms/logo.svg',
        caption: 'U.S. Marshals Service',
    },
    {
        url: 'https://www.opensanctions.org/datasets/ca_dfatd_sema_sanctions/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'Canadian Special Economic Measures Act Sanctions',
    },
    {
        url: 'https://mpdc.dc.gov/page/most-wanted',
        logo: 'https://mpdc.dc.gov/sites/default/files/dc/sites/mpdc/Logo.png',
        caption: 'Metropolitan Police',
    },
    {
        url: 'https://www.tarrantcountytx.gov/en/sheriff/operations-bureau/criminal-investigations/most-wanted.html',
        logo: '	https://www.tarrantcountytx.gov/content/dam/styleassets/TCseal300.png',
        caption: 'Tarrant County Texas',
    },
    {
        url: 'https://www.opensanctions.org/datasets/gb_nca_most_wanted/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'NCA Most Wanted',
    },
    {
        url: 'https://www.cityofsacramento.org/Police/Crime/Most-Wanted',
        logo: 'https://www.cityofsacramento.gov/content/dam/portal/site-assets/header/logo.png',
        caption: 'Sacramento Police Department',
    },
    {
        url: 'https://www.opensanctions.org/datasets/ca_listed_terrorists/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'Canadian Listed Terrorist Entities',
    },
    {
        url: 'https://www.kent.police.uk/news/kent/latest/?newsCategory=Most+Wanted',
        logo: 'https://www.kent.police.uk/SysSiteAssets/media/images/brand/kent/crest/kent-police-logo---two-line-colour-transparent-white-text.png',
        caption: 'Kent Police',
    },
    {
        url: 'https://www.rcmp-grc.gc.ca/en/wanted',
        logo: '',
        caption: 'Royal Canadian Mounted Police',
    },
    {
        url: 'https://www.opensanctions.org/datasets/za_fic_sanctions/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'South African Targeted Financial Sanctions',
    },
    {
        url: 'https://nj.gov/njsp/wanted/',
        logo: 'https://nj.gov/njsp/images/header-nj-oag-left.png',
        caption: 'New Jersey State Police',
    },
    {
        url: 'https://www.opensanctions.org/datasets/fr_tresor_gels_avoir/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'French Freezing of Assets',
    },
    {
        url: 'https://www.edmontonpolice.ca/CrimeFiles/EdmontonsMostWanted',
        logo: 'https://www.edmontonpolice.ca/img/edmonton-police-service-logo@2x.png',
        caption: 'Edmonton Police Service',
    },
    {
        url: 'https://www.opensanctions.org/datasets/eu_sanctions_map/',
        logo: 'https://assets.opensanctions.org/images/ura/logo_text.svg',
        caption: 'EU Sanctions Map',
    },
]

export default function NameIntelligenceResponseComp(props: any) {
    const [ofacData, setOfacData] = useState([])
    const [pepData, setPepData] = useState([])
    const [sanctionData, setSanctionData] = useState([])
    const [criminalData, setCriminalData] = useState([])
    const [status, setStatus] = useState('')
    const [adverseMedia, setAdverseMedia] = useState([])

    useEffect(() => {
        if (props?.data?.ofac && typeof props?.data?.ofac !== 'string') {
            setOfacData(props?.data?.ofac)
        }
        if (props?.data?.sanction[1]) {
            setSanctionData(props?.data?.sanction[1])
        }
        if (props?.data?.pep[1]?.data) {
            setPepData(props?.data?.pep[1]?.data)
        }
        if (props?.data?.adverse_media) {
            setAdverseMedia(props?.data?.adverse_media)
        }
        // if (props?.data?.pep[1]?.data){
        //     setCriminalData(props?.data?.pep[1]?.data)
        // }
    }, [])

    useEffect(() => {
        if (props?.request?.checkType?.includes('ofac') && props?.data?.ofac) {
            setOfacData(props?.data?.ofac)
        }
        if (props?.request?.checkType?.includes('sanction') && props?.data?.sanction) {
            setSanctionData(props?.data?.sanction)
        }
        if (props?.request?.checkType?.includes('pep') && props?.data?.pep[1]?.data) {
            setPepData(props?.data?.pep[1]?.data)
        }
        // if (props?.data?.pep[1]?.data){
        //     setCriminalData(props?.data?.pep[1]?.data)
        // }

        if (props?.request?.checkType?.length === 3) {
            validateAllData()
        }
        if (props?.request?.checkType?.length === 2) {
            validateTwoData()
        }
        if (props?.request?.checkType?.length === 1) {
            validateOneData()
        }
    }, [])

    let validateAllData = () => {
        if (
            props?.request?.checkType?.includes('ofac') &&
            props?.data?.ofac?.length < 1 &&
            props?.request?.checkType?.includes('sanction') &&
            props?.data?.sanction?.length < 1 &&
            props?.request?.checkType?.includes('pep') &&
            props?.data?.pep[1]?.data?.length < 1
        ) {
            setStatus('cleared')
        } else {
            setStatus('not_cleared')
        }
    }

    let validateTwoData = () => {
        if (
            (props?.request?.checkType?.includes('ofac') &&
                props?.data?.ofac?.length < 1 &&
                props?.request?.checkType?.includes('sanction') &&
                props?.data?.sanction?.length < 1) ||
            (props?.request?.checkType?.includes('ofac') &&
                props?.data?.ofac?.length < 1 &&
                props?.request?.checkType?.includes('pep') &&
                props?.data?.pep[1]?.data?.length < 1) ||
            (props?.request?.checkType?.includes('sanction') &&
                props?.data?.sanction?.length < 1 &&
                props?.request?.checkType?.includes('pep') &&
                props?.data?.pep[1]?.data?.length < 1)
        ) {
            setStatus('cleared')
        } else {
            setStatus('not_cleared')
        }
    }

    let validateOneData = () => {
        if (
            (props?.request?.checkType?.includes('ofac') && props?.data?.ofac?.length < 1) ||
            (props?.request?.checkType?.includes('sanction') &&
                props?.data?.sanction?.length < 1) ||
            (props?.request?.checkType?.includes('pep') && props?.data?.pep[1]?.data?.length < 1)
        ) {
            setStatus('cleared')
        } else {
            setStatus('not_cleared')
        }
    }

    let getKeyLabel = (val: any) => {
        var formattedText = ''
        for (var i = 0, len = val.length; i < len; i++) {
            if (i === 0) {
                formattedText += val.charAt(0).toUpperCase()
                continue
            }
            if (i !== 0 && val.charAt(i) === val.charAt(i).toUpperCase()) {
                formattedText += ' ' + val.charAt(i).toUpperCase()
                continue
            }
            formattedText += val.charAt(i)
        }
        return formattedText
    }

    return (
        <div className="radar-response-area mb-5">
            {window.location.href === `${global.appBaseUrl}Identityradar/Radar-Check` && (
                <>
                    <button
                        className="btn btn-back my-4 d-flex align-items-center"
                        onClick={() => {
                            props.goBack()
                            props.pushShowSelect()
                        }}>
                        <i className="ri-arrow-left-line me-2 ri-xl" />
                        Back
                    </button>

                    <div className="card response-request">
                        <div className="card-body">
                            <h5>Your Manual Checker result is ready</h5>
                            <small>
                                Data input : "{' '}
                                {`${props?.request?.name} ${props?.request?.dob && ','} ${
                                    props?.request?.dob
                                } ${props?.request?.gender && ','} ${props?.request?.gender}`}{' '}
                                ”
                            </small>
                        </div>
                    </div>
                </>
            )}

            <div
                className={`card border-0 shadow-sm mt-4 ${
                    status === 'cleared' ? 'bg-success text-white' : 'bg-danger text-white '
                } `}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-8 mt-1">
                            <div className="d-flex">
                                {/* <i className="ri-information-line ri-xl me-3"/> */}
                                <h6 className="p-0 m-0">AML / PEP Screening check</h6>
                            </div>
                        </div>
                        <div className="col-md-4 mt-1">
                            <div className="d-flex justify-content-md-end">
                                {status === 'cleared' ? (
                                    <>
                                        <p className="p-0 m-0">Cleared</p>
                                        <i className="ri-shield-check-fill ri-xl ms-2 mt-1 " />
                                    </>
                                ) : (
                                    <>
                                        <p className="p-0 m-0">Not Cleared</p>
                                        <i className="ri-shield-fill ri-xl ms-2 mt-1 " />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow-sm mt-4 pt-0 pb-0" style={{ backgroundColor: '#fff' }}>
                {props?.request?.checkType?.includes('sanction') && (
                    <>
                        {/* <div className={`px-3`}>
                            <div className="d-flex align-items-center">
                                <p className="p-0 m-0"> Sanction List:</p>
                                {props?.data?.sanction?.length < 1 ? (
                                    <p className="p-0 m-0 text-success">
                                        <i className="ri-information-line ms-2 me-2" />
                                        {props?.request?.name} is not on Sanction List
                                    </p>
                                ) : (
                                    <p className="p-0 m-0 text-danger">
                                        <i className="ri-information-line ms-2 me-2" />
                                        {props?.request?.name} is on Sanction List
                                    </p>
                                )}
                            </div>
                        </div> */}
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <p className="p-0 m-0"> Sanction List:</p>
                                    {props?.data?.sanction?.length < 1 ? (
                                        <p className="p-0 m-0 text-success">
                                            <i className="ri-information-line ms-2 me-2" />
                                            {props?.request?.name} is not on Sanction List
                                        </p>
                                    ) : (
                                        <p className="p-0 m-0 text-danger">
                                            <i className="ri-information-line ms-2 me-2" />
                                            {props?.request?.name} is on Sanction List
                                        </p>
                                    )}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {sanctionListUrl.map((item) => (
                                            <div className="col-md-6">
                                                <li className="pb-3">
                                                    {item.logo && (
                                                        <img
                                                            src={item.logo}
                                                            alt="logo"
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                                marginRight: '10px',
                                                                objectFit: 'contain',
                                                            }}
                                                        />
                                                    )}
                                                    <a
                                                        href={item.url}
                                                        className="ml-4"
                                                        target="_blank"
                                                        rel="noreferrer">
                                                        {item.caption}
                                                    </a>
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </>
                )}

                {props?.request?.checkType?.includes('ofac') && (
                    <>
                        {/* <hr />
                        <div className={`px-3 `}>
                            <div className="d-flex align-items-center">
                                <p className="p-0 m-0"> OFAC List:</p>
                                {props?.data?.ofac?.length < 1 ||
                                typeof props?.data?.ofac === 'string' ? (
                                    <p className="p-0 m-0 text-success">
                                        <i className="ri-information-line ms-2 me-2" />
                                        {props?.request?.name} is not on OFAC List
                                    </p>
                                ) : (
                                    <p className="p-0 m-0 text-danger">
                                        <i className="ri-information-line ms-2 me-2" />
                                        {props?.request?.name} is on OFAC List
                                    </p>
                                )}
                            </div>
                        </div> */}
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <p className="p-0 m-0"> OFAC List:</p>
                                    {props?.data?.ofac?.length < 1 ||
                                    typeof props?.data?.ofac === 'string' ? (
                                        <p className="p-0 m-0 text-success">
                                            <i className="ri-information-line ms-2 me-2" />
                                            {props?.request?.name} is not on OFAC List
                                        </p>
                                    ) : (
                                        <p className="p-0 m-0 text-danger">
                                            <i className="ri-information-line ms-2 me-2" />
                                            {props?.request?.name} is on OFAC List
                                        </p>
                                    )}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {/* <ul>
                                        {sanctionListUrl.map((item) => (
                                            <li className="pb-3">
                                                {item.logo && (
                                                    <img
                                                        src={item.logo}
                                                        alt="logo"
                                                        style={{
                                                            width: '50px !important',
                                                            height: '50px !important',
                                                            marginRight: '10px',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                )}
                                                <a
                                                    href={item.url}
                                                    className="ml-4"
                                                    target="_blank"
                                                    rel="noreferrer">
                                                    {item.caption}
                                                </a>
                                            </li>
                                        ))}
                                    </ul> */}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </>
                )}

                {props?.request?.checkType?.includes('pep') && (
                    <>
                        {/* <hr />
                        <div className={`px-3 pb-3`}>
                            <div className="d-flex align-items-center">
                                <p className="p-0 m-0"> PEP (Politically exposed person):</p>

                                {props?.data?.pep[1]?.data?.length < 1 ? (
                                    <p className="p-0 m-0 text-success">
                                        <i className="ri-information-line ms-2 me-2" />
                                        {props?.request?.name} is not a politically exposed person
                                    </p>
                                ) : (
                                    <p className="p-0 m-0 text-danger">
                                        <i className="ri-information-line ms-2 me-2" />
                                        {props?.request?.name} is a politically exposed person
                                    </p>
                                )}
                            </div>
                        </div> */}
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <p className="p-0 m-0"> PEP (Politically exposed person):</p>
                                    {props?.data?.pep[1]?.data?.length < 1 ? (
                                        <p className="p-0 m-0 text-success">
                                            <i className="ri-information-line ms-2 me-2" />
                                            {props?.request?.name} is not a politically exposed
                                            person
                                        </p>
                                    ) : (
                                        <p className="p-0 m-0 text-danger">
                                            <i className="ri-information-line ms-2 me-2" />
                                            {props?.request?.name} is a politically exposed person
                                        </p>
                                    )}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {/* <ul>
                                        {sanctionListUrl.map((item) => (
                                            <li className="pb-3">
                                                {item.logo && (
                                                    <img
                                                        src={item.logo}
                                                        alt="logo"
                                                        style={{
                                                            width: '50px !important',
                                                            height: '50px !important',
                                                            marginRight: '10px',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                )}
                                                <a
                                                    href={item.url}
                                                    className="ml-4"
                                                    target="_blank"
                                                    rel="noreferrer">
                                                    {item.caption}
                                                </a>
                                            </li>
                                        ))}
                                    </ul> */}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </>
                )}
            </div>

            <div className="row">
                {sanctionData?.length > 0 && (
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>Sanction Result</h6>
                                <hr />
                                <div className="row justify-content-between mt-2">
                                    {sanctionData?.map((item: any, i: number) => (
                                        <span
                                            className={
                                                (i + 1) % 2 === 1
                                                    ? 'col-md-6 py-1'
                                                    : 'col-md-6 text-md-end'
                                            }
                                            key={i}>
                                            <>
                                                <small>Name</small>
                                                <p>{item?.name || 'Not Available'}</p>
                                            </>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {pepData?.length > 0 && (
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>PEP Data Result</h6>
                                <hr />
                                {pepData?.map((item: any, i: number) => (
                                    <div key={i}>
                                        <div className="row justify-content-between mt-2">
                                            <span className="col-md-6">
                                                <small>Caption</small>
                                                <p>{item?.caption || 'Not Available'}</p>
                                            </span>
                                            <span className="col-md-6 text-md-end">
                                                <small>Schema</small>
                                                <p>{item?.schema || 'Not Available'}</p>
                                            </span>
                                        </div>

                                        {item?.properties && (
                                            <div className="row justify-content-between mt-2">
                                                {Object.keys(item?.properties)?.map(
                                                    (val: any, k: number) => (
                                                        <span
                                                            className={
                                                                (k + 1) % 2 === 1
                                                                    ? 'col-md-6 py-1'
                                                                    : 'col-md-6 text-md-end'
                                                            }
                                                            key={k}>
                                                            {val !== 'wikidataId' && (
                                                                <>
                                                                    <small>
                                                                        {getKeyLabel(val)?.replace(
                                                                            /_/g,
                                                                            ' '
                                                                        )}
                                                                    </small>
                                                                    {item?.properties[val]?.length >
                                                                        0 && (
                                                                        <>
                                                                            {item?.properties[
                                                                                val
                                                                            ]?.map(
                                                                                (
                                                                                    pVal: any,
                                                                                    pIndex: number
                                                                                ) => (
                                                                                    <p key={pIndex}>
                                                                                        {pVal ||
                                                                                            'Not Available'}
                                                                                    </p>
                                                                                )
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </>
                                                            )}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {typeof ofacData !== 'string' && ofacData?.length > 0 && (
                    <div className="col-md-6 mt-4">
                        <div className="card endpoint-response">
                            <div className="card-body">
                                <h6>OFAC Data Result</h6>
                                <hr />
                                <PaginatedList
                                    list={ofacData}
                                    itemsPerPage={1}
                                    useMinimalControls={true}
                                    leftMargin={1}
                                    rightMargin={1}
                                    nextText={'Next'}
                                    prevText={'Previous'}
                                    displayRange={2}
                                    breakText={'...'}
                                    breakClass={'pagination-break'}
                                    renderList={(list) => (
                                        <>
                                            {list?.map((item: any, index: number) => (
                                                <div key={index}>
                                                    <div className="row justify-content-between mt-2">
                                                        <span className="col-md-6">
                                                            <small>Name</small>
                                                            <p>
                                                                {item?.entity_name ||
                                                                    'Not Available'}
                                                            </p>
                                                        </span>
                                                        <span className="col-md-6 text-md-end">
                                                            <small>Program</small>
                                                            <p>
                                                                {item?.program || 'Not Available'}
                                                            </p>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-md-6 mt-4">
                    <div className="card endpoint-response">
                        <div className="card-body">
                            <h6>Adverse Media Result</h6>
                            <hr />
                            {adverseMedia
                                ?.filter((item) => Array.isArray(item))
                                ?.map((item: any, i: number) => (
                                    <div key={i}>
                                        {item?.map((it: any, itemIndex: number) => (
                                            <div
                                                key={itemIndex}
                                                className="row justify-content-between mt-2">
                                                {Object.entries(it).map(
                                                    (
                                                        [key, value]: [string, any],
                                                        entryIndex: number
                                                    ) =>
                                                        key !== null && (
                                                            <span
                                                                className={
                                                                    (entryIndex + 1) % 2 === 1
                                                                        ? 'col-md-6 py-1 my-2'
                                                                        : 'col-md-6 text-md-end my-2'
                                                                }
                                                                key={entryIndex}>
                                                                {typeof value === 'object' &&
                                                                value !== null ? (
                                                                    <>
                                                                        {Object.entries(value).map(
                                                                            (
                                                                                [
                                                                                    nestedKey,
                                                                                    nestedValue,
                                                                                ]: [string, any],
                                                                                i: number
                                                                            ) => (
                                                                                <span key={i}>
                                                                                    <p>
                                                                                        <small>
                                                                                            {
                                                                                                nestedKey
                                                                                            }
                                                                                        </small>
                                                                                    </p>
                                                                                    {nestedValue.endsWith(
                                                                                        'png'
                                                                                    ) ? (
                                                                                        <img
                                                                                            src={
                                                                                                nestedValue
                                                                                            }
                                                                                            alt="preview"
                                                                                            style={{
                                                                                                width: '100px',
                                                                                                height: '100px',
                                                                                                objectFit:
                                                                                                    'contain',
                                                                                                objectPosition:
                                                                                                    'top',
                                                                                            }}
                                                                                        />
                                                                                    ) : (
                                                                                        <p>
                                                                                            {
                                                                                                nestedValue
                                                                                            }
                                                                                        </p>
                                                                                    )}
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </>
                                                                ) : key === 'thumbnail' ||
                                                                  key === 'source_logo' ? (
                                                                    <>
                                                                        <p>
                                                                            <small>
                                                                                {key?.replace(
                                                                                    /_/g,
                                                                                    ' '
                                                                                )}
                                                                            </small>
                                                                        </p>
                                                                        <img
                                                                            src={value}
                                                                            alt="preview"
                                                                            style={{
                                                                                width:
                                                                                    key ===
                                                                                    'source_logo'
                                                                                        ? '50px'
                                                                                        : '100px',
                                                                                height:
                                                                                    key ===
                                                                                    'source_logo'
                                                                                        ? '50px'
                                                                                        : '100px',
                                                                                objectFit:
                                                                                    'contain',
                                                                                objectPosition:
                                                                                    'top',
                                                                            }}
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <p>
                                                                            <small>
                                                                                {key?.replace(
                                                                                    /_/g,
                                                                                    ' '
                                                                                )}
                                                                            </small>
                                                                        </p>
                                                                        {value &&
                                                                        value
                                                                            ?.toString()
                                                                            ?.startsWith(
                                                                                'https://'
                                                                            ) ? (
                                                                            <a
                                                                                href={value}
                                                                                target="_blank"
                                                                                rel="noreferrer">
                                                                                {value}
                                                                            </a>
                                                                        ) : (
                                                                            <p>{value}</p>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </span>
                                                        )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// export default function NameIntelligenceResponseComp(props: any) {
//     const [ofacData, setOfacData] = useState([])
//     const [pepData, setPepData] = useState([])
//     const [sanctionData, setSanctionData] = useState([])
//     const [criminalData, setCriminalData] = useState([])
//     const [status, setStatus] = useState('')

//     useEffect(() => {
//         if (props?.request?.checkType?.includes('ofac') && props?.data?.ofac) {
//             setOfacData(props?.data?.ofac)
//         }
//         if (props?.request?.checkType?.includes('sanction') && props?.data?.sanction) {
//             setSanctionData(props?.data?.sanction)
//         }
//         if (props?.request?.checkType?.includes('pep') && props?.data?.pep[1]?.data) {
//             setPepData(props?.data?.pep[1]?.data)
//         }
//         // if (props?.data?.pep[1]?.data){
//         //     setCriminalData(props?.data?.pep[1]?.data)
//         // }

//         if (props?.request?.checkType?.length === 3) {
//             validateAllData()
//         }
//         if (props?.request?.checkType?.length === 2) {
//             validateTwoData()
//         }
//         if (props?.request?.checkType?.length === 1) {
//             validateOneData()
//         }
//     }, [])

//     let validateAllData = () => {
//         if (
//             props?.request?.checkType?.includes('ofac') &&
//             props?.data?.ofac?.length < 1 &&
//             props?.request?.checkType?.includes('sanction') &&
//             props?.data?.sanction?.length < 1 &&
//             props?.request?.checkType?.includes('pep') &&
//             props?.data?.pep[1]?.data?.length < 1
//         ) {
//             setStatus('cleared')
//         } else {
//             setStatus('not_cleared')
//         }
//     }
//     let validateTwoData = () => {
//         if (
//             (props?.request?.checkType?.includes('ofac') &&
//                 props?.data?.ofac?.length < 1 &&
//                 props?.request?.checkType?.includes('sanction') &&
//                 props?.data?.sanction?.length < 1) ||
//             (props?.request?.checkType?.includes('ofac') &&
//                 props?.data?.ofac?.length < 1 &&
//                 props?.request?.checkType?.includes('pep') &&
//                 props?.data?.pep[1]?.data?.length < 1) ||
//             (props?.request?.checkType?.includes('sanction') &&
//                 props?.data?.sanction?.length < 1 &&
//                 props?.request?.checkType?.includes('pep') &&
//                 props?.data?.pep[1]?.data?.length < 1)
//         ) {
//             setStatus('cleared')
//         } else {
//             setStatus('not_cleared')
//         }
//     }
//     let validateOneData = () => {
//         if (
//             (props?.request?.checkType?.includes('ofac') && props?.data?.ofac?.length < 1) ||
//             (props?.request?.checkType?.includes('sanction') &&
//                 props?.data?.sanction?.length < 1) ||
//             (props?.request?.checkType?.includes('pep') && props?.data?.pep[1]?.data?.length < 1)
//         ) {
//             setStatus('cleared')
//         } else {
//             setStatus('not_cleared')
//         }
//     }

//     let getKeyLabel = (val: any) => {
//         var formattedText = ''
//         for (var i = 0, len = val.length; i < len; i++) {
//             if (i === 0) {
//                 formattedText += val.charAt(0).toUpperCase()
//                 continue
//             }
//             if (i !== 0 && val.charAt(i) === val.charAt(i).toUpperCase()) {
//                 formattedText += ' ' + val.charAt(i).toUpperCase()
//                 continue
//             }
//             formattedText += val.charAt(i)
//         }
//         return formattedText
//     }

//     return (
//         <div className="radar-response-area mb-5">
//             {window.location.href === `${global.appBaseUrl}Identityradar/Radar-Check` && (
//                 <>
//                     <button
//                         className="btn btn-back my-4 d-flex align-items-center"
//                         onClick={() => {
//                             props.goBack()
//                             props.pushShowSelect()
//                         }}>
//                         <i className="ri-arrow-left-line me-2 ri-xl" />
//                         Back
//                     </button>

//                     <div className="card response-request">
//                         <div className="card-body">
//                             <h5>Your Manual Checker result is ready</h5>
//                             <small>
//                                 Data input : "{' '}
//                                 {`${props?.request?.name} ${props?.request?.dob && ','} ${
//                                     props?.request?.dob
//                                 } ${props?.request?.gender && ','} ${props?.request?.gender}`}{' '}
//                                 ”
//                             </small>
//                         </div>
//                     </div>
//                 </>
//             )}

//             <div
//                 className={`card border-0 shadow-sm mt-4 ${
//                     status === 'cleared' ? 'bg-success text-white' : 'bg-danger text-white '
//                 } `}>
//                 <div className="card-body">
//                     <div className="row">
//                         <div className="col-md-8 mt-1">
//                             <div className="d-flex">
//                                 <h6 className="p-0 m-0">AML/Sanction Intelligence</h6>
//                             </div>
//                         </div>
//                         <div className="col-md-4 mt-1">
//                             <div className="d-flex justify-content-md-end">
//                                 {status === 'cleared' ? (
//                                     <>
//                                         <p className="p-0 m-0">Cleared</p>
//                                         <i className="ri-shield-check-fill ri-xl ms-2 mt-1 " />
//                                     </>
//                                 ) : (
//                                     <>
//                                         <p className="p-0 m-0">Not Cleared</p>
//                                         <i className="ri-shield-fill ri-xl ms-2 mt-1 " />
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="shadow-sm mt-4 pt-3 pb-3" style={{ backgroundColor: '#fff' }}>
//                 {props?.request?.checkType?.includes('sanction') && (
//                     <>
//                         <div className={`px-3`}>
//                             <div className="d-flex align-items-center">
//                                 <p className="p-0 m-0"> Sanction List:</p>
//                                 {props?.data?.sanction?.length < 1 ? (
//                                     <p className="p-0 m-0 text-success">
//                                         <i className="ri-information-line ms-2 me-2" />
//                                         {props?.request?.name} is not on Sanction List
//                                     </p>
//                                 ) : (
//                                     <p className="p-0 m-0 text-danger">
//                                         <i className="ri-information-line ms-2 me-2" />
//                                         {props?.request?.name} is on Sanction List
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     </>
//                 )}

//                 {props?.request?.checkType?.includes('ofac') && (
//                     <>
//                         <hr />
//                         <div className={`px-3 `}>
//                             <div className="d-flex align-items-center">
//                                 <p className="p-0 m-0"> OFAC List:</p>
//                                 {(props?.data?.ofac?.length < 1 ||  typeof props?.data?.ofac === "string") ? (
//                                     <p className="p-0 m-0 text-success">
//                                         <i className="ri-information-line ms-2 me-2" />
//                                         {props?.request?.name} is not on OFAC List
//                                     </p>
//                                 ) : (
//                                     <p className="p-0 m-0 text-danger">
//                                         <i className="ri-information-line ms-2 me-2" />
//                                         {props?.request?.name} is on OFAC List
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     </>
//                 )}

//                 {props?.request?.checkType?.includes('pep') && (
//                     <>
//                         <hr />
//                         <div className={`px-3 pb-3`}>
//                             <div className="d-flex align-items-center">
//                                 <p className="p-0 m-0"> PEP (Politically exposed person):</p>

//                                 {props?.data?.pep[1]?.data?.length < 1 ? (
//                                     <p className="p-0 m-0 text-success">
//                                         <i className="ri-information-line ms-2 me-2" />
//                                         {props?.request?.name} is not a politically exposed person
//                                     </p>
//                                 ) : (
//                                     <p className="p-0 m-0 text-danger">
//                                         <i className="ri-information-line ms-2 me-2" />
//                                         {props?.request?.name} is a politically exposed person
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>

//             <div className="row">
//                 {sanctionData?.length > 0 && (
//                     <div className="col-md-6 mt-4">
//                         <div className="card endpoint-response">
//                             <div className="card-body">
//                                 <h6>Sanction Result</h6>
//                                 <hr />
//                                 <>
//                                     {sanctionData.map((item: any, i: number) => (
//                                         <div key={i}>
//                                             <div className="row justify-content-between mt-2">
//                                                 <span className="col-md-6">
//                                                     <small>Fullname</small>
//                                                     <p>{item?.name || 'Not Available'}</p>
//                                                 </span>
//                                                 <span className="col-md-6 text-md-end">
//                                                     <small>Gender</small>
//                                                     <p>{item?.gender || 'Not Available'}</p>
//                                                 </span>
//                                             </div>
//                                             <div className="row justify-content-between mt-2">
//                                                 <span className="col-md-6">
//                                                     <small>Title</small>
//                                                     <p>{item?.title || 'Not Available'}</p>
//                                                 </span>
//                                                 <span className="col-md-6 text-md-end">
//                                                     <small>Nationality</small>
//                                                     <p>{item?.nationality || 'Not Available'}</p>
//                                                 </span>
//                                             </div>
//                                             <div className="row justify-content-between mt-2">
//                                                 <span className="col-md-6">
//                                                     <small>Citizenship</small>
//                                                     <p>{item?.citizenship || 'Not Available'}</p>
//                                                 </span>
//                                             </div>
//                                             <div className="row justify-content-between mt-2">
//                                                 <span className="col-md-12">
//                                                     <small>Summary</small>
//                                                     <p>{item?.summary || 'Not Available'}</p>
//                                                 </span>
//                                             </div>
//                                             <div className="row justify-content-between mt-2">
//                                                 {item?.references?.map((item: any, i: number) => (
//                                                     <span
//                                                         className={
//                                                             (i + 1) % 2 === 1
//                                                                 ? 'col-md-6 py-1'
//                                                                 : 'col-md-6 text-md-end'
//                                                         }
//                                                         key={i}>
//                                                         <>
//                                                             <small>Reference</small>
//                                                             <p>{item?.name || 'Not Available'}</p>
//                                                         </>
//                                                     </span>
//                                                 ))}
//                                             </div>

//                                             {item?.properties && (
//                                                 <div className="row justify-content-between mt-2">
//                                                     {Object.keys(item?.properties)?.map(
//                                                         (val: any, k: number) => (
//                                                             <span
//                                                                 className={
//                                                                     (k + 1) % 2 === 1
//                                                                         ? 'col-md-6 py-1'
//                                                                         : 'col-md-6 text-md-end'
//                                                                 }
//                                                                 key={k}>
//                                                                 {val !== 'wikidataId' && (
//                                                                     <>
//                                                                         <small>
//                                                                             {getKeyLabel(
//                                                                                 val
//                                                                             )?.replace(/_/g, ' ')}
//                                                                         </small>
//                                                                         {item?.properties[val]
//                                                                             .length > 0 && (
//                                                                             <>
//                                                                                 {item?.properties[
//                                                                                     val
//                                                                                 ]?.map(
//                                                                                     (
//                                                                                         pVal: any,
//                                                                                         pIndex: number
//                                                                                     ) => (
//                                                                                         <p
//                                                                                             key={
//                                                                                                 pIndex
//                                                                                             }>
//                                                                                             {pVal ||
//                                                                                                 'Not Available'}
//                                                                                         </p>
//                                                                                     )
//                                                                                 )}
//                                                                             </>
//                                                                         )}
//                                                                     </>
//                                                                 )}
//                                                              </span>
//                                                         )
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </>
//                                 {/* )}
//                                 /> */}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {pepData?.length > 0 && (
//                     <div className="col-md-6 mt-4">
//                         <div className="card endpoint-response">
//                             <div className="card-body">
//                                 <h6>PEP Data Result</h6>
//                                 <hr />

//                                 <>
//                                     {pepData?.map((item: any, i: number) => (
//                                         <div key={i}>
//                                             <div className="row justify-content-between mt-2">
//                                                 <span className="col-md-6">
//                                                     <small>Caption</small>
//                                                     <p>{item.caption || 'Not Available'}</p>
//                                                 </span>
//                                                 <span className="col-md-6 text-md-end">
//                                                     <small>Schema</small>
//                                                     <p>{item.schema || 'Not Available'}</p>
//                                                 </span>
//                                             </div>

//                                             {item?.properties && (
//                                                 <div className="row justify-content-between mt-2">
//                                                     {Object.keys(item?.properties)?.map(
//                                                         (val: any, k: number) => (
//                                                             <span
//                                                                 className={
//                                                                     (k + 1) % 2 === 1
//                                                                         ? 'col-md-6 py-1'
//                                                                         : 'col-md-6 text-md-end'
//                                                                 }
//                                                                 key={k}>
//                                                                 {val !== 'wikidataId' && (
//                                                                     <>
//                                                                         <small>
//                                                                             {getKeyLabel(
//                                                                                 val
//                                                                             )?.replace(/_/g, ' ')}
//                                                                         </small>
//                                                                         {item?.properties[val]
//                                                                             .length > 0 && (
//                                                                             <>
//                                                                                 {item?.properties[
//                                                                                     val
//                                                                                 ]?.map(
//                                                                                     (
//                                                                                         pVal: any,
//                                                                                         pIndex: number
//                                                                                     ) => (
//                                                                                         <p
//                                                                                             key={
//                                                                                                 pIndex
//                                                                                             }>
//                                                                                             {pVal ||
//                                                                                                 'Not Available'}
//                                                                                         </p>
//                                                                                     )
//                                                                                 )}
//                                                                             </>
//                                                                         )}
//                                                                     </>
//                                                                 )}
//                                                             </span>
//                                                         )
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {ofacData?.length > 0 && typeof ofacData !== 'string' && (
//                     <div className="col-md-6 mt-4">
//                         <div className="card endpoint-response">
//                             <div className="card-body">
//                                 <h6>OFAC Data Result</h6>
//                                 <hr />
//                                 <PaginatedList
//                                     list={ofacData}
//                                     itemsPerPage={1}
//                                     useMinimalControls={true}
//                                     leftMargin={1}
//                                     rightMargin={1}
//                                     nextText={'Next'}
//                                     prevText={'Previous'}
//                                     displayRange={2}
//                                     breakText={'...'}
//                                     breakClass={'pagination-break'}
//                                     renderList={(list) => (
//                                         <>
//                                             {list.map((item: any, index: number) => (
//                                                 <div key={index}>
//                                                     <div className="row justify-content-between mt-2">
//                                                         <span className="col-md-6">
//                                                             <small>Name</small>
//                                                             <p>
//                                                                 {item?.entity_name ||
//                                                                     'Not Available'}
//                                                             </p>
//                                                         </span>
//                                                         <span className="col-md-6 text-md-end">
//                                                             <small>Program</small>
//                                                             <p>{item?.program || 'Not Available'}</p>
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </>
//                                     )}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }
